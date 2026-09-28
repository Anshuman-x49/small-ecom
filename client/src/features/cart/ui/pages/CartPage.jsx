import React from 'react';
import { Link, useNavigate } from 'react-router';
import useCart from '../../hooks/useCart';
import {
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import ClayButton from '../../../../components/ui/ClayButton';

/**
 * CartPage Component
 * Displays the items currently in the user's cart and provides an order summary.
 * This route is protected, so only authenticated users can access it.
 */
const CartPage = () => {
  const { items, totalAmount, totalItems, updateQty, removeItem, clear } = useCart();
  const navigate = useNavigate();

  if (!items || items.length === 0) {
    return (
      <div className="max-w-md mx-auto py-16 text-center bg-white rounded-3xl p-8 border border-slate-100 shadow-sm animate-fadeIn">
        <div className="w-16 h-16 rounded-3xl bg-blue-50 text-blue-500 flex items-center justify-center mx-auto mb-4">
          <ShoppingBag size={32} />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Your Bag is Empty</h2>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
          Looks like you haven't added anything to your cart yet. Explore our latest collection and discover great deals.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-2xl transition-all shadow-md"
        >
          <ArrowLeft size={16} /> Start Shopping
        </Link>
      </div>
    );
  }

  const shipping = totalAmount > 999 ? 0 : 99;
  const grandTotal = totalAmount + shipping;

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn pb-12">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Shopping Cart
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {totalItems} {totalItems === 1 ? 'item' : 'items'} in your bag
          </p>
        </div>

        <button
          onClick={clear}
          className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors cursor-pointer"
        >
          Clear Bag
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Cart Item List */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const { product, size, quantity } = item;
            const itemImage =
              product.images && product.images.length > 0
                ? product.images[0]
                : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80';
            const price = product.price?.amount || 0;
            const currencySymbol = product.price?.currency === 'USD' ? '$' : '₹';

            return (
              <div
                key={`${product._id}-${size}`}
                className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-100 shadow-sm flex gap-4 items-center justify-between"
              >
                {/* Image */}
                <div className="w-20 h-20 rounded-2xl bg-slate-50 overflow-hidden shrink-0 border border-slate-100">
                  <img
                    src={itemImage}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-1">
                  <Link
                    to={`/products/${product._id}`}
                    className="font-bold text-sm text-slate-800 hover:text-blue-600 transition-colors line-clamp-1"
                  >
                    {product.title}
                  </Link>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>Size: <strong className="text-slate-700">{size}</strong></span>
                    <span>•</span>
                    <span>{currencySymbol}{price} each</span>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl p-1">
                  <button
                    onClick={() => updateQty(product._id, size, quantity - 1)}
                    className="w-6 h-6 rounded-lg bg-white text-slate-600 hover:bg-slate-100 flex items-center justify-center cursor-pointer shadow-sm"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="w-6 text-center text-xs font-bold text-slate-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => updateQty(product._id, size, quantity + 1)}
                    className="w-6 h-6 rounded-lg bg-white text-slate-600 hover:bg-slate-100 flex items-center justify-center cursor-pointer shadow-sm"
                  >
                    <Plus size={12} />
                  </button>
                </div>

                {/* Total & Remove */}
                <div className="text-right pl-2">
                  <span className="font-extrabold text-sm text-slate-900 block">
                    {currencySymbol}{price * quantity}
                  </span>
                  <button
                    onClick={() => removeItem(product._id, size)}
                    className="text-slate-400 hover:text-red-500 transition-colors mt-1 cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-5">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            Order Summary
          </h2>

          <div className="space-y-3 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal ({totalItems} items)</span>
              <span className="font-bold text-slate-800">₹{totalAmount}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Shipping</span>
              <span>
                {shipping === 0 ? (
                  <span className="font-bold text-emerald-600">FREE</span>
                ) : (
                  `₹${shipping}`
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Tax (GST Included)</span>
              <span className="font-bold text-slate-800">₹0</span>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 flex justify-between items-baseline">
            <span className="text-sm font-bold text-slate-900">Total</span>
            <span className="text-2xl font-black text-slate-900">
              ₹{grandTotal}
            </span>
          </div>

          <ClayButton
            variant="primary"
            size="lg"
            className="w-full flex items-center justify-center gap-2"
            icon={ArrowRight}
            onClick={() => alert('Checkout simulation: Order placed successfully!')}
          >
            Proceed to Checkout
          </ClayButton>

          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-medium">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span>Secure 256-bit Encrypted Checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
