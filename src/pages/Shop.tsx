import React from 'react';
import { useListProducts, useListCategories } from '@workspace/api-client-react';
import { useLocation } from 'wouter';
import { ProductCard } from '@/components/ProductCard';
import { Search, Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Shop() {
  const [location] = useLocation();

  // Read initial values from URL params
  const getParam = (key: string) => {
    if (typeof window === 'undefined') return '';
    return new URLSearchParams(window.location.search).get(key) || '';
  };

  const [categoryName, setCategoryName] = React.useState<string>(() => getParam('category'));
  const [search, setSearch] = React.useState<string>(() => getParam('search'));
  const [minPrice, setMinPrice] = React.useState<number | undefined>();
  const [maxPrice, setMaxPrice] = React.useState<number | undefined>();
  const [showFilters, setShowFilters] = React.useState(false);

  const { data: categories } = useListCategories();

  // Filter using category NAME (matches DB column) — not slug
  const { data: products, isLoading } = useListProducts({
    category: categoryName || undefined,
    search: search || undefined,
    minPrice,
    maxPrice,
  });

  // Sync URL → state when navigating from outside (e.g. navbar category link)
  React.useEffect(() => {
    const cat = getParam('category');
    if (cat) setCategoryName(cat);
  }, [location]);

  const clearAll = () => {
    setCategoryName('');
    setSearch('');
    setMinPrice(undefined);
    setMaxPrice(undefined);
  };

  const hasFilters = !!(categoryName || search || minPrice || maxPrice);

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      {/* Header */}
      <div className="bg-card border-b border-border py-12 mb-8">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            The <span className="text-primary italic">Collection</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our curated selection of fine Indian wear, from everyday elegance to bridal masterpieces.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row gap-8">

        {/* Mobile: Search + Filter Toggle */}
        <div className="md:hidden flex items-center gap-3 mb-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-testid="input-search-mobile"
              className="w-full bg-transparent border border-border pl-10 pr-4 py-2 text-sm focus:border-primary focus:outline-none transition-colors"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 border border-border px-4 py-2 text-sm uppercase tracking-wider shrink-0"
          >
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>

        {/* Sidebar */}
        <AnimatePresence initial={false}>
          {(showFilters || (typeof window !== 'undefined' && window.innerWidth >= 768)) && (
            <motion.aside
              key="sidebar"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="w-full md:w-64 shrink-0 space-y-8 md:block overflow-hidden md:overflow-visible"
            >
              {/* Desktop Search */}
              <div className="hidden md:block relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  data-testid="input-search-desktop"
                  className="w-full bg-transparent border border-border pl-10 pr-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-serif text-xl border-b border-border pb-2 mb-4">Categories</h3>
                <ul className="space-y-3">
                  <li>
                    <button
                      data-testid="filter-category-all"
                      onClick={() => setCategoryName('')}
                      className={`text-sm tracking-wide transition-colors text-left ${
                        !categoryName ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      All Collections
                    </button>
                  </li>
                  {categories?.map((c) => (
                    <li key={c.id}>
                      <button
                        data-testid={`filter-category-${c.slug}`}
                        onClick={() => setCategoryName(categoryName === c.name ? '' : c.name)}
                        className={`text-sm tracking-wide transition-colors text-left ${
                          categoryName === c.name ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {c.name} <span className="text-xs opacity-50 ml-1">({c.productCount})</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-serif text-xl border-b border-border pb-2 mb-4">Price Range</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min ₹"
                    data-testid="input-min-price"
                    value={minPrice ?? ''}
                    onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full bg-transparent border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none transition-colors"
                  />
                  <span className="text-muted-foreground shrink-0">—</span>
                  <input
                    type="number"
                    placeholder="Max ₹"
                    data-testid="input-max-price"
                    value={maxPrice ?? ''}
                    onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full bg-transparent border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {hasFilters && (
                <button
                  onClick={clearAll}
                  data-testid="button-clear-filters"
                  className="flex items-center gap-2 text-sm text-destructive hover:text-destructive/80 transition-colors uppercase tracking-wider font-semibold"
                >
                  <X className="w-4 h-4" /> Clear All Filters
                </button>
              )}
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        <main className="flex-1 min-w-0">
          {/* Active Filter Tags */}
          {hasFilters && (
            <div className="mb-6 flex flex-wrap gap-2">
              {categoryName && (
                <span className="inline-flex items-center gap-1 bg-secondary text-secondary-foreground px-3 py-1 text-xs rounded-full">
                  {categoryName}
                  <button onClick={() => setCategoryName('')} aria-label="Remove category filter">
                    <X className="w-3 h-3 hover:text-destructive" />
                  </button>
                </span>
              )}
              {search && (
                <span className="inline-flex items-center gap-1 bg-secondary text-secondary-foreground px-3 py-1 text-xs rounded-full">
                  "{search}"
                  <button onClick={() => setSearch('')} aria-label="Remove search filter">
                    <X className="w-3 h-3 hover:text-destructive" />
                  </button>
                </span>
              )}
              {(minPrice || maxPrice) && (
                <span className="inline-flex items-center gap-1 bg-secondary text-secondary-foreground px-3 py-1 text-xs rounded-full">
                  ₹{minPrice ?? 0} – ₹{maxPrice ?? '∞'}
                  <button onClick={() => { setMinPrice(undefined); setMaxPrice(undefined); }} aria-label="Remove price filter">
                    <X className="w-3 h-3 hover:text-destructive" />
                  </button>
                </span>
              )}
            </div>
          )}

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-[3/4] bg-muted animate-pulse rounded-sm"></div>
              ))}
            </div>
          ) : products && products.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-border rounded-sm">
              <h3 className="font-serif text-2xl mb-2">
                {categoryName ? `No products in "${categoryName}"` : 'No products found'}
              </h3>
              <p className="text-muted-foreground mb-6">
                {categoryName
                  ? 'This category has no products available at the moment.'
                  : 'Try adjusting your search or filters.'}
              </p>
              {hasFilters && (
                <button
                  onClick={clearAll}
                  className="bg-primary text-primary-foreground px-6 py-2 uppercase tracking-widest text-xs font-semibold hover:bg-primary/90 transition-colors"
                >
                  View All Products
                </button>
              )}
            </div>
          ) : (
            <>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-6">
                {products?.length} {products?.length === 1 ? 'piece' : 'pieces'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products?.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
