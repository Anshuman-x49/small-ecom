import React from 'react';
import ProductCard from './ProductCard';
import { PackageOpen, AlertTriangle, RefreshCw } from 'lucide-react';
import ClayButton from '../../../../components/ui/ClayButton';

const ProductGridSkeleton = () => (
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
      <div
        key={i}
        className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm animate-pulse space-y-4"
      >
        <div className="aspect-square w-full rounded-2xl bg-slate-100" />
        <div className="space-y-2">
          <div className="h-4 bg-slate-100 rounded-md w-3/4" />
          <div className="h-3 bg-slate-100 rounded-md w-full" />
          <div className="h-3 bg-slate-100 rounded-md w-1/2" />
        </div>
        <div className="pt-3 border-t border-slate-50 flex items-center justify-between">
          <div className="h-5 bg-slate-100 rounded-md w-1/3" />
          <div className="h-7 bg-slate-100 rounded-xl w-16" />
        </div>
      </div>
    ))}
  </div>
);

const ProductGrid = ({ products, status, error, onRetry }) => {
  if (status === 'loading') {
    return <ProductGridSkeleton />;
  }

  if (status === 'failed') {
    return (
      <div className="bg-white rounded-3xl p-12 text-center max-w-md mx-auto border border-red-100 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle size={28} />
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-1">Failed to load products</h3>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
          {error?.message || 'Something went wrong while fetching products from the server.'}
        </p>
        {onRetry && (
          <ClayButton
            variant="primary"
            size="sm"
            icon={RefreshCw}
            onClick={onRetry}
            className="mx-auto"
          >
            Try Again
          </ClayButton>
        )}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-16 text-center max-w-lg mx-auto border border-slate-100 shadow-sm">
        <div className="w-16 h-16 rounded-3xl bg-blue-50 text-blue-500 flex items-center justify-center mx-auto mb-4 shadow-inner">
          <PackageOpen size={32} />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">No Products Available</h3>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
          We couldn't find any products in the catalog right now. Check back soon for exciting new arrivals!
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            <RefreshCw size={14} /> Refresh Catalog
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
