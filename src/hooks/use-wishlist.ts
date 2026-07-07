import { useState, useEffect } from 'react';
import { Product } from '@workspace/api-client-react/src/generated/api.schemas';

export function useWishlist() {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('sga_wishlist');
      if (stored) {
        setWishlist(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to parse wishlist from local storage', e);
    }
  }, []);

  const saveWishlist = (newWishlist: Product[]) => {
    setWishlist(newWishlist);
    localStorage.setItem('sga_wishlist', JSON.stringify(newWishlist));
  };

  const toggleWishlist = (product: Product) => {
    const exists = wishlist.some(p => p.id === product.id);
    if (exists) {
      saveWishlist(wishlist.filter(p => p.id !== product.id));
    } else {
      saveWishlist([...wishlist, product]);
    }
  };

  const isInWishlist = (productId: number) => {
    return wishlist.some(p => p.id === productId);
  };

  return { wishlist, toggleWishlist, isInWishlist, count: wishlist.length };
}
