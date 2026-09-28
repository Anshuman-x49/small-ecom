import React, { useEffect, useState, useMemo } from 'react';
import useProducts from '../../hooks/useProducts';
import ProductGrid from '../components/ProductGrid';
import {
  Sparkles,
  SlidersHorizontal,
  ArrowUpDown,
  Tag,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
} from 'lucide-react';

const CATEGORIES = ['All', 'Clothing', 'Footwear', 'Accessories', 'Electronics'];

const ProductListPage = () => {
  const { items, status, error, fetchProducts } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = useMemo(() => {
    let list = [...(items || [])];

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === 'price-low') {
      list.sort((a, b) => (a.price?.amount || 0) - (b.price?.amount || 0));
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => (b.price?.amount || 0) - (a.price?.amount || 0));
    } else if (sortBy === 'newest') {
      list.sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );
    }

    return list;
  }, [items, searchQuery, sortBy]);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Hero Banner with refined 3D claymorphic elevation and compact mobile layout */}
      <section
        aria-label="Welcome Banner"
        className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 text-white p-4 sm:p-8 md:p-10 border border-white/25 shadow-[8px_8px_24px_rgba(37,99,235,0.35),-4px_-4px_16px_rgba(255,255,255,0.7),inset_3px_3px_6px_rgba(255,255,255,0.35),inset_-3px_-3px_8px_rgba(15,23,42,0.3)]"
      >
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute -left-12 -top-12 w-64 h-64 rounded-full bg-pink-500/20 blur-3xl pointer-events-none" />

        <div className="relative max-w-2xl space-y-2 sm:space-y-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] sm:text-xs font-semibold text-blue-100 border border-white/30 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.6),1px_1px_4px_rgba(0,0,0,0.1)]">
            <Sparkles size={13} className="text-amber-300" />
            <span>Curated Tactile Essentials</span>
          </div>

          <h1 className="text-xl sm:text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Elevate Your Everyday Style.
          </h1>

          <p className="text-blue-100 text-xs sm:text-sm md:text-base leading-snug sm:leading-relaxed max-w-xl line-clamp-2 sm:line-clamp-none">
            Explore our curated catalog of apparel, footwear, and accessories.
            Built with modern architecture and silky-smooth micro-interactions.
          </p>
        </div>

        {/* Feature badges row with claymorphic chips */}
        <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 mt-3 border-t border-white/15 sm:gap-3 sm:pt-6 sm:mt-6">
          <div className="flex items-center gap-2 p-1.5 sm:p-2.5 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 text-[10px] sm:text-xs text-white shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4),1px_1px_4px_rgba(0,0,0,0.08)]">
            <Truck size={14} className="text-white shrink-0 sm:w-4 sm:h-4" />
            <span className="truncate">Free Express Delivery</span>
          </div>
          <div className="flex items-center gap-2 p-1.5 sm:p-2.5 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 text-[10px] sm:text-xs text-white shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4),1px_1px_4px_rgba(0,0,0,0.08)]">
            <ShieldCheck size={14} className="text-white shrink-0 sm:w-4 sm:h-4" />
            <span className="truncate">100% Authentic Quality</span>
          </div>
          <div className="flex items-center gap-2 p-1.5 sm:p-2.5 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 text-[10px] sm:text-xs text-white shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4),1px_1px_4px_rgba(0,0,0,0.08)]">
            <RotateCcw size={14} className="text-white shrink-0 sm:w-4 sm:h-4" />
            <span className="truncate">7-Day Easy Returns</span>
          </div>
          <div className="flex items-center gap-2 p-1.5 sm:p-2.5 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 text-[10px] sm:text-xs text-white shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4),1px_1px_4px_rgba(0,0,0,0.08)]">
            <ShoppingBag size={14} className="text-white shrink-0 sm:w-4 sm:h-4" />
            <span className="truncate">Direct from Top Sellers</span>
          </div>
        </div>
      </section>

      {/* Control Bar: Categories & Sorting */}
      <nav aria-label="Catalog Filters" className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-100 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-[0_4px_12px_rgba(37,99,235,0.25)]'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative flex-1 sm:w-56">
            <input
              type="text"
              placeholder="Filter by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 sm:py-2 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
            />
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <ArrowUpDown size={14} className="text-slate-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 sm:py-2 text-slate-700 font-semibold focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </nav>

      {/* Featured Products Section */}
      <section aria-labelledby="featured-products-heading" className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 id="featured-products-heading" className="text-xl font-bold text-slate-900">
              Featured Products
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Showing {filteredProducts.length} items available
            </p>
          </div>
        </div>

        {/* Product Grid */}
        <ProductGrid
          products={filteredProducts}
          status={status}
          error={error}
          onRetry={fetchProducts}
        />
      </section>
    </div>
  );
};

export default ProductListPage;
