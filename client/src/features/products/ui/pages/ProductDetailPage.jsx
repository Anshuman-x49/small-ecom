import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import useProducts from '../../hooks/useProducts';
import useCart from '../../../cart/hooks/useCart';
import useAuth from '../../../auth/hooks/useAuth';
import {
  ArrowLeft,
  ShoppingCart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Plus,
  Minus,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import ClayButton from '../../../../components/ui/ClayButton';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedProduct, detailStatus, detailError, fetchProductById, clearSelected } =
    useProducts();
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
    return () => {
      clearSelected();
    };
  }, [id, fetchProductById, clearSelected]);

  useEffect(() => {
    if (selectedProduct?.sizes && selectedProduct.sizes.length > 0) {
      const firstInStock = selectedProduct.sizes.find((s) => s.stock > 0);
      setSelectedSize(firstInStock ? firstInStock.size : selectedProduct.sizes[0].size);
    }
  }, [selectedProduct]);

  if (detailStatus === 'loading') {
    return (
      <div className="max-w-5xl mx-auto py-8 space-y-8 animate-pulse">
        <div className="h-6 bg-slate-200 rounded w-32" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="aspect-square bg-slate-200 rounded-3xl" />
          <div className="space-y-4">
            <div className="h-8 bg-slate-200 rounded w-3/4" />
            <div className="h-6 bg-slate-200 rounded w-1/3" />
            <div className="h-20 bg-slate-200 rounded w-full" />
            <div className="h-12 bg-slate-200 rounded w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (detailStatus === 'failed' || (!selectedProduct && detailStatus === 'succeeded')) {
    return (
      <div className="max-w-md mx-auto py-16 text-center bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
        <AlertCircle size={40} className="text-red-500 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-slate-800 mb-2">Product Not Found</h2>
        <p className="text-sm text-slate-500 mb-6">
          {detailError?.message || "The product you're looking for does not exist or has been removed."}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 px-4 py-2.5 rounded-xl hover:bg-blue-100 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Catalog
        </Link>
      </div>
    );
  }

  if (!selectedProduct) return null;

  const { title, description, price, images, sizes } = selectedProduct;

  const imageList =
    images && images.length > 0
      ? images
      : ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80'];

  const currentSizeObj = sizes?.find((s) => s.size === selectedSize);
  const currentStock = currentSizeObj ? currentSizeObj.stock : 0;
  const isOutOfStock = currentStock === 0;

  const currencySymbol = price?.currency === 'USD' ? '$' : '₹';
  const priceDisplay = price?.amount !== undefined ? `${currencySymbol}${price.amount}` : 'N/A';

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/auth/login', { state: { from: `/products/${id}` } });
      return;
    }
    
    if (!isOutOfStock && selectedSize) {
      addItem(selectedProduct, selectedSize, quantity);
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 2000);
    }
  };

  return (
    <article className="max-w-6xl mx-auto space-y-8 animate-fadeIn pb-12">
      {/* Breadcrumb navigation */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link to="/" className="hover:text-blue-600 flex items-center gap-1">
          <ArrowLeft size={14} /> Catalog
        </Link>
        <span>/</span>
        <span className="text-slate-800 truncate max-w-xs">{title}</span>
      </nav>

      {/* Main Product Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-sm">
        {/* Left: Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square w-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 relative shadow-inner">
            <img
              src={imageList[selectedImageIndex] || imageList[0]}
              alt={title}
              className="w-full h-full object-cover object-center transition-all duration-300"
              onError={(e) => {
                e.currentTarget.src =
                  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80';
              }}
            />
            {isOutOfStock && (
              <div className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white font-bold text-xs rounded-full shadow-md">
                Sold Out
              </div>
            )}
          </div>

          {/* Thumbnail row */}
          {imageList.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {imageList.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-18 h-18 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    selectedImageIndex === idx
                      ? 'border-blue-600 ring-2 ring-blue-100'
                      : 'border-slate-100 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Purchase Form */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold">
              <Sparkles size={12} /> Authentic Product
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {title}
            </h1>

            {/* Price section */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-slate-900">
                {priceDisplay}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Inclusive of all taxes
              </span>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed pt-2">
              {description}
            </p>

            {/* Size Selector */}
            {sizes && sizes.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Select Size
                  </label>
                  <span className="text-xs text-slate-500 font-medium">
                    {currentStock > 0 ? (
                      <span className="text-emerald-600 font-semibold">
                        {currentStock} in stock
                      </span>
                    ) : (
                      <span className="text-red-500 font-semibold">Out of Stock</span>
                    )}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {sizes.map((s) => {
                    const active = selectedSize === s.size;
                    const disabled = s.stock === 0;

                    return (
                      <button
                        key={s.size}
                        type="button"
                        disabled={disabled}
                        onClick={() => setSelectedSize(s.size)}
                        className={`min-w-12 h-11 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                          active
                            ? 'bg-blue-600 text-white shadow-[0_4px_12px_rgba(37,99,235,0.3)]'
                            : disabled
                            ? 'bg-slate-50 text-slate-300 border border-slate-100 line-through cursor-not-allowed'
                            : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        {s.size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Quantity
              </label>
              <div className="inline-flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-1">
                <button
                  type="button"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-lg bg-white text-slate-600 hover:bg-slate-100 flex items-center justify-center disabled:opacity-40 cursor-pointer shadow-sm"
                >
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center text-sm font-bold text-slate-800">
                  {quantity}
                </span>
                <button
                  type="button"
                  disabled={quantity >= currentStock}
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-lg bg-white text-slate-600 hover:bg-slate-100 flex items-center justify-center disabled:opacity-40 cursor-pointer shadow-sm"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-6 border-t border-slate-100">
            <ClayButton
              variant={addedSuccess ? 'secondary' : 'primary'}
              size="lg"
              disabled={isOutOfStock}
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2"
              icon={addedSuccess ? Check : ShoppingCart}
            >
              {addedSuccess ? 'Added to Cart!' : isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </ClayButton>

            {/* Value Guarantees */}
            <div className="grid grid-cols-3 gap-2 pt-4 text-center">
              <div className="p-3 bg-slate-50 rounded-2xl">
                <Truck size={18} className="mx-auto text-blue-600 mb-1" />
                <span className="text-[11px] font-bold text-slate-700 block">
                  Express Shipping
                </span>
                <span className="text-[10px] text-slate-400">2-4 Days</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl">
                <ShieldCheck size={18} className="mx-auto text-emerald-600 mb-1" />
                <span className="text-[11px] font-bold text-slate-700 block">
                  Secure Checkout
                </span>
                <span className="text-[10px] text-slate-400">SSL Encrypted</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl">
                <RotateCcw size={18} className="mx-auto text-indigo-600 mb-1" />
                <span className="text-[11px] font-bold text-slate-700 block">
                  Easy Returns
                </span>
                <span className="text-[10px] text-slate-400">7 Day Policy</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
};

export default ProductDetailPage;
