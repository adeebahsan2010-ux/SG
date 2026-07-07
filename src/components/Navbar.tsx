import React from 'react';
import { Link, useLocation } from 'wouter';
import { Search, Heart, Menu, X, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishlist } from '@/hooks/use-wishlist';
import { useListProducts, useListCategories } from '@workspace/api-client-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [, setLocation] = useLocation();
  const [location] = useLocation();
  const { count } = useWishlist();
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      setSearchQuery('');
    }
  }, [searchOpen]);

  // Close search on Escape
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Fetch suggestions when user types
  const { data: searchResults } = useListProducts(
    { search: searchQuery },
    { query: { enabled: searchQuery.length >= 2 } }
  );
  const { data: categories } = useListCategories();

  // Filter categories matching query
  const matchingCategories = React.useMemo(() => {
    if (!searchQuery || searchQuery.length < 2 || !categories) return [];
    const q = searchQuery.toLowerCase();
    return categories.filter(c => c.name.toLowerCase().includes(q));
  }, [searchQuery, categories]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchOpen(false);
    setLocation(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleResultClick = (path: string) => {
    setSearchOpen(false);
    setLocation(path);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Categories', href: '/categories' },
    { name: 'About', href: '/about' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || location !== '/'
            ? 'bg-background/95 backdrop-blur-md border-b border-border/50 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
                className="text-foreground hover:text-primary transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex flex-col items-center group relative z-10">
              <span className="font-serif text-3xl font-bold tracking-widest text-primary drop-shadow-[0_2px_10px_rgba(212,175,110,0.3)]">
                SG
              </span>
              <span className={`text-[0.6rem] uppercase tracking-[0.2em] font-sans mt-1 transition-colors ${
                isScrolled || location !== '/' ? 'text-muted-foreground group-hover:text-primary' : 'text-white/80 group-hover:text-white'
              }`}>
                Shree Ganesh Arts
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center justify-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-primary ${
                    location === link.href ? 'text-primary' : 'text-foreground/80'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4 md:space-x-6 relative z-10">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Open search"
                data-testid="button-search-open"
                className="text-foreground hover:text-primary transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
              <Link href="/shop" className="text-foreground hover:text-primary transition-colors relative" aria-label="Wishlist">
                <Heart className="w-5 h-5" />
                {count > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[0.6rem] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {count > 9 ? '9+' : count}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                className="fixed top-0 left-0 bottom-0 w-3/4 max-w-sm bg-card border-r border-border z-50 flex flex-col p-6"
              >
                <div className="flex justify-between items-center mb-10">
                  <span className="font-serif text-2xl font-bold text-primary">SG</span>
                  <button onClick={() => setMobileMenuOpen(false)} className="text-muted-foreground hover:text-foreground" aria-label="Close menu">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <nav className="flex flex-col space-y-6 flex-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-lg font-serif tracking-wide hover:text-primary transition-colors border-b border-border/50 pb-2 ${
                        location === link.href ? 'text-primary' : ''
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto pt-6 border-t border-border flex items-center space-x-4">
                  <a
                    href="https://wa.me/919465091977"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp Us
                  </a>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* ─── Search Overlay ─── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/98 backdrop-blur-md flex flex-col"
          >
            {/* Search Bar */}
            <div className="container mx-auto px-4 md:px-6 pt-8 pb-4">
              <div className="flex items-center gap-4 border-b border-border pb-4">
                <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                <form onSubmit={handleSearchSubmit} className="flex-1">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search for products, categories, occasions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    data-testid="input-search-overlay"
                    className="w-full bg-transparent text-lg md:text-2xl font-light text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
                  />
                </form>
                <button
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                  className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Results */}
            <div className="container mx-auto px-4 md:px-6 flex-1 overflow-y-auto py-6">
              {searchQuery.length < 2 ? (
                /* Suggestions when no query */
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Browse Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories?.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => handleResultClick(`/shop?category=${encodeURIComponent(c.name)}`)}
                        className="border border-border px-4 py-2 text-sm hover:border-primary hover:text-primary transition-colors rounded-sm"
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Category matches */}
                  {matchingCategories.length > 0 && (
                    <div>
                      <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Categories</h3>
                      <div className="flex flex-wrap gap-2">
                        {matchingCategories.map((c) => (
                          <button
                            key={c.id}
                            onClick={() => handleResultClick(`/shop?category=${encodeURIComponent(c.name)}`)}
                            className="border border-primary/40 bg-primary/5 text-primary px-4 py-2 text-sm hover:bg-primary/10 transition-colors rounded-sm"
                          >
                            {c.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Product matches */}
                  {searchResults && searchResults.length > 0 ? (
                    <div>
                      <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                        Products ({searchResults.length})
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {searchResults.slice(0, 8).map((p) => (
                          <button
                            key={p.id}
                            onClick={() => handleResultClick(`/products/${p.id}`)}
                            className="flex items-center gap-3 text-left group hover:bg-muted/30 p-2 rounded-sm transition-colors"
                            data-testid={`search-result-${p.id}`}
                          >
                            <div className="w-14 h-14 shrink-0 overflow-hidden rounded-sm bg-muted">
                              <img
                                src={p.imageUrl}
                                alt={p.name}
                                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                                {p.name}
                              </p>
                              <p className="text-xs text-muted-foreground">{p.category}</p>
                              <p className="text-sm text-primary font-medium mt-0.5">
                                ₹{p.price.toLocaleString('en-IN')}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* No results — show similar suggestions */
                    <div>
                      <p className="text-muted-foreground mb-6">
                        No exact matches for "<span className="text-foreground">{searchQuery}</span>". Browse our collections instead:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {categories?.slice(0, 6).map((c) => (
                          <button
                            key={c.id}
                            onClick={() => handleResultClick(`/shop?category=${encodeURIComponent(c.name)}`)}
                            className="border border-border px-4 py-2 text-sm hover:border-primary hover:text-primary transition-colors rounded-sm"
                          >
                            {c.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* View all results */}
                  {searchResults && searchResults.length > 0 && (
                    <button
                      onClick={() => handleResultClick(`/shop?search=${encodeURIComponent(searchQuery)}`)}
                      className="text-sm text-primary uppercase tracking-widest hover:text-primary/80 transition-colors border-b border-primary/30 hover:border-primary pb-0.5"
                    >
                      View all {searchResults.length} results
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
