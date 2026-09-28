import React from 'react';
import { Link, useNavigate } from 'react-router';
import { ShoppingCart, Eye, Sparkles } from 'lucide-react';
import useCart from '../../../cart/hooks/useCart';
import useAuth from '../../../auth/hooks/useAuth';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();
  const { _id, title, description, price, images, sizes } = product;

  const defaultImage =
    images && images.length > 0
      ? images[0]
      : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80';

  const totalStock = sizes?.reduce((sum, s) => sum + (s.stock || 0), 0) ?? 0;
  const isOutOfStock = sizes && sizes.length > 0 && totalStock === 0;
  const firstAvailableSize = sizes?.find((s) => s.stock > 0)?.size || (sizes?.[0]?.size ?? 'M');

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/auth/login', { state: { from: '/' } });
      return;
    }
    if (!isOutOfStock) {
      addItem(product, firstAvailableSize, 1);
    }
  };

  const currencySymbol = price?.currency === 'USD' ? '$' : '₹';
  const priceDisplay = price?.amount !== undefined ? `${currencySymbol}${price.amount}` : 'N/A';

  return (
    <article className="group clay-card-interactive p-2.5 sm:p-4 flex flex-col justify-between h-full">
      <div>
        {/* Image Container */}
        <div className="relative aspect-square w-full rounded-xl sm:rounded-2xl overflow-hidden bg-slate-50 mb-2 sm:mb-4">
          <img
            src={defaultImage}
            alt={title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src =
                'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80';
            }}
          />

          {/* Badge overlays */}
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1 sm:gap-1.5">
            {isOutOfStock ? (
              <span className="px-1.5 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[11px] font-bold rounded-full bg-red-500 text-white shadow-sm">
                Out of Stock
              </span>
            ) : totalStock > 0 && totalStock <= 5 ? (
              <span className="px-1.5 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[11px] font-bold rounded-full bg-amber-500 text-white shadow-sm">
                Only {totalStock} left
              </span>
            ) : (
              <span className="px-1.5 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[11px] font-semibold rounded-full bg-white/90 backdrop-blur-md text-blue-600 border border-blue-100 shadow-sm flex items-center gap-1">
                <Sparkles size={10} className="sm:w-3 sm:h-3" /> Featured
              </span>
            )}
          </div>

          {/* Quick Actions Hover Overlay */}
          <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 p-2 sm:p-4">
            <Link
              to={`/products/${_id}`}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white text-slate-700 hover:text-blue-600 flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110"
              title="View Details"
            >
              <Eye size={16} className="sm:w-4.5 sm:h-4.5" />
            </Link>
            {!isOutOfStock && (
              <button
                type="button"
                onClick={handleQuickAdd}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110 cursor-pointer"
                title="Quick Add to Cart"
              >
                <ShoppingCart size={16} className="sm:w-4.5 sm:h-4.5" />
              </button>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-1 sm:space-y-1.5 px-0.5 sm:px-1">
          <h3 className="font-bold text-slate-800 text-xs sm:text-base leading-snug group-hover:text-blue-600 transition-colors line-clamp-1">
            <Link to={`/products/${_id}`} className="block">
              {title}
            </Link>
          </h3>

          <p className="text-[10px] sm:text-xs text-slate-500 line-clamp-1 sm:line-clamp-2 leading-tight sm:leading-relaxed">
            {description}
          </p>

          {/* Available Sizes preview (on tablets and desktops) */}
          {sizes && sizes.length > 0 && (
            <div className="hidden sm:flex items-center gap-1.5 pt-1">
              <span className="text-[11px] text-slate-400 font-medium">Sizes:</span>
              <div className="flex flex-wrap gap-1">
                {sizes.slice(0, 4).map((s, idx) => (
                  <span
                    key={idx}
                    className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold ${
                      s.stock > 0
                        ? 'bg-slate-100 text-slate-600'
                        : 'bg-slate-50 text-slate-300 line-through'
                    }`}
                  >
                    {s.size}
                  </span>
                ))}
                {sizes.length > 4 && (
                  <span className="text-[10px] text-slate-400">+{sizes.length - 4}</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer & Price */}
      <div className="pt-2 sm:pt-4 px-0.5 sm:px-1 flex items-center justify-between mt-1.5 sm:mt-2 border-t border-slate-100">
        <div>
          <span className="text-[8px] sm:text-[10px] text-slate-400 font-medium block uppercase tracking-wider">
            Price
          </span>
          <span className="text-xs sm:text-lg font-extrabold text-slate-900 tracking-tight">
            {priceDisplay}
          </span>
        </div>

        <Link
          to={`/products/${_id}`}
          className="px-2 py-1 sm:px-3.5 sm:py-1.5 text-[10px] sm:text-xs font-bold rounded-lg sm:rounded-xl text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white transition-all shadow-sm flex items-center gap-0.5 sm:gap-1"
        >
          View
        </Link>
      </div>
    </article>
  );
};

export default ProductCard;
