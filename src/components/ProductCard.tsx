import { motion } from 'framer-motion';
import { Heart, MessageCircle } from 'lucide-react';
import { Link } from 'wouter';
import { Product } from '@workspace/api-client-react/src/generated/api.schemas';
import { useWishlist } from '@/hooks/use-wishlist';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const whatsappUrl = `https://wa.me/919465091977?text=Hi%2C%20I%20am%20interested%20in%20${encodeURIComponent(product.name)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex flex-col relative bg-card border border-border rounded-sm overflow-hidden"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted/30">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 uppercase tracking-wider rounded-sm shadow-md">
              New
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-background/80 backdrop-blur-sm text-foreground text-xs font-bold px-2 py-1 uppercase tracking-wider border border-border rounded-sm shadow-md">
              Bestseller
            </span>
          )}
        </div>

        {/* Wishlist Toggle */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isWishlisted ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'bg-background/50 text-foreground backdrop-blur-md hover:bg-background'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        <Link href={`/products/${product.id}`} className="block h-full w-full">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Quick View / Hover Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-20 flex justify-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-sm font-medium w-full justify-center hover:bg-primary/90 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Order on WhatsApp
          </a>
        </div>
      </div>

      <Link href={`/products/${product.id}`} className="p-4 flex flex-col flex-1">
        <span className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
          {product.category}
        </span>
        <h3 className="font-serif text-lg leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {product.name}
        </h3>
        <div className="mt-auto flex items-end gap-2">
          <span className="font-sans font-medium text-lg text-primary">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through decoration-muted-foreground/50">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
