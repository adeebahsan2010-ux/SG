import React from 'react';
import { useGetProduct, useListProducts, getGetProductQueryKey } from '@workspace/api-client-react';
import { useParams, Link } from 'wouter';
import { ProductCard } from '@/components/ProductCard';
import { ImageLightbox } from '@/components/ImageLightbox';
import { useWishlist } from '@/hooks/use-wishlist';
import { Heart, MessageCircle, Ruler, Truck, ShieldAlert, Expand } from 'lucide-react';
import { motion } from 'framer-motion';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
const COLORS = [
  { name: 'Royal Crimson', hex: '#9B1C1C' },
  { name: 'Midnight Blue', hex: '#1E3A5F' },
  { name: 'Emerald', hex: '#065F46' },
  { name: 'Champagne', hex: '#C9A84C' },
  { name: 'Dusty Rose', hex: '#C2848A' },
  { name: 'Ivory', hex: '#F5F0E8' },
  { name: 'Saffron', hex: '#C97A20' },
  { name: 'Plum', hex: '#5B2D5B' },
];

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const { data: product, isLoading } = useGetProduct(productId, {
    query: { enabled: !!productId, queryKey: getGetProductQueryKey(productId) },
  });

  const { toggleWishlist, isInWishlist } = useWishlist();
  const [activeImage, setActiveImage] = React.useState<string>('');
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [lightboxIndex, setLightboxIndex] = React.useState(0);
  const [selectedSize, setSelectedSize] = React.useState<string>('');
  const [selectedColor, setSelectedColor] = React.useState<string>('');

  React.useEffect(() => {
    if (product?.imageUrl) setActiveImage(product.imageUrl);
  }, [product]);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [productId]);

  const { data: relatedProducts } = useListProducts(
    { category: product?.category },
    { query: { enabled: !!product?.category } }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-6 animate-pulse">
          <div className="h-4 bg-muted w-48 mb-8 rounded-sm"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="flex gap-4">
              <div className="flex flex-col gap-3 w-20">
                {[1, 2, 3].map(i => <div key={i} className="aspect-[3/4] bg-muted rounded-sm"></div>)}
              </div>
              <div className="flex-1 aspect-[3/4] bg-muted rounded-sm"></div>
            </div>
            <div className="space-y-4 pt-4">
              <div className="h-10 bg-muted w-3/4 rounded-sm"></div>
              <div className="h-6 bg-muted w-1/3 rounded-sm"></div>
              <div className="h-4 bg-muted w-full rounded-sm mt-8"></div>
              <div className="h-4 bg-muted w-full rounded-sm"></div>
              <div className="h-4 bg-muted w-2/3 rounded-sm"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl mb-4 font-serif">Product not found</h1>
        <Link href="/shop" className="text-primary hover:underline uppercase tracking-widest text-sm">Return to Shop</Link>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);
  const allImages = [product.imageUrl, ...(product.imageUrls || [])].filter(Boolean);

  const buildWhatsAppUrl = () => {
    let text = `Hi, I am interested in *${product.name}*`;
    if (selectedSize) text += ` — Size: ${selectedSize}`;
    if (selectedColor) text += `, Colour: ${selectedColor}`;
    text += `. Please share availability and price details.`;
    return `https://wa.me/919465091977?text=${encodeURIComponent(text)}`;
  };

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-8 flex-wrap">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <span>/</span>
          <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-primary transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-foreground truncate max-w-[200px]">{product.name}</span>
        </div>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-24">

          {/* ─── Left: Image Gallery ─── */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 lg:sticky lg:top-24 lg:self-start">
            {/* Thumbnails — vertical on desktop, horizontal strip on mobile */}
            {allImages.length > 1 && (
              <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto sm:max-h-[560px] shrink-0 pb-1 sm:pb-0 sm:w-[72px]">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    data-testid={`img-thumb-${idx}`}
                    onClick={() => setActiveImage(img)}
                    className={`relative aspect-[3/4] w-16 sm:w-full shrink-0 border-2 rounded-sm overflow-hidden transition-all duration-200 ${
                      activeImage === img ? 'border-primary opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
                    }`}
                  >
                    <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover object-top" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Image */}
            <div className="flex-1 relative group">
              <div className="aspect-[3/4] overflow-hidden bg-muted/20 rounded-sm">
                <motion.img
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Zoom / expand overlay */}
              <button
                onClick={() => openLightbox(allImages.indexOf(activeImage))}
                data-testid="button-open-lightbox"
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary hover:border-primary"
                aria-label="View full image"
              >
                <Expand className="w-4 h-4" />
              </button>

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {product.isNew && (
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-sm shadow-sm">New</span>
                )}
                {product.isBestSeller && (
                  <span className="bg-background/80 backdrop-blur-sm text-foreground text-xs font-bold px-3 py-1 uppercase tracking-wider border border-border rounded-sm shadow-sm">Bestseller</span>
                )}
              </div>
            </div>
          </div>

          {/* ─── Right: Product Info ─── */}
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-[0.2em] text-primary mb-3 font-sans">{product.category}</span>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 leading-tight">{product.name}</h1>

            {/* Price */}
            <div className="flex items-end gap-4 mb-6 pb-6 border-b border-border">
              <span className="font-sans font-semibold text-3xl text-primary">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through mb-1">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm text-green-500 mb-1 font-medium">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed mb-8 font-light">{product.description}</p>

            {/* Colour Selector */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs uppercase tracking-widest text-muted-foreground font-sans">Colour</span>
                {selectedColor && <span className="text-xs text-foreground font-medium">— {selectedColor}</span>}
              </div>
              <div className="flex flex-wrap gap-2">
                {COLORS.map((c) => (
                  <button
                    key={c.name}
                    data-testid={`button-color-${c.name}`}
                    onClick={() => setSelectedColor(selectedColor === c.name ? '' : c.name)}
                    title={c.name}
                    className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                      selectedColor === c.name ? 'border-primary scale-110 shadow-[0_0_0_2px_hsl(var(--primary)/0.3)]' : 'border-transparent hover:border-border'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    aria-label={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-widest text-muted-foreground font-sans">Size</span>
                <a
                  href="https://wa.me/919465091977?text=Hi%2C%20please%20share%20the%20size%20guide%20for%20your%20products."
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-primary hover:text-primary/80 underline underline-offset-2 transition-colors flex items-center gap-1"
                >
                  <Ruler className="w-3 h-3" /> Size Guide
                </a>
              </div>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    data-testid={`button-size-${s}`}
                    onClick={() => setSelectedSize(selectedSize === s ? '' : s)}
                    className={`px-4 py-2 text-sm font-medium border rounded-sm transition-all ${
                      selectedSize === s
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">Custom sizing available — mention in WhatsApp</p>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-y-4 mb-8 pb-8 border-b border-border text-sm">
              <div>
                <span className="text-muted-foreground uppercase tracking-widest text-xs block mb-1">Fabric</span>
                <span className="font-medium text-foreground">{product.fabric || 'Premium Blend'}</span>
              </div>
              <div>
                <span className="text-muted-foreground uppercase tracking-widest text-xs block mb-1">Occasion</span>
                <span className="font-medium text-foreground">{product.occasion || 'Festive / Wedding'}</span>
              </div>
              <div>
                <span className="text-muted-foreground uppercase tracking-widest text-xs block mb-1">Availability</span>
                <span className={`font-medium ${product.inStock !== false ? 'text-green-500' : 'text-destructive'}`}>
                  {product.inStock !== false ? 'In Stock' : 'Made to Order'}
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                data-testid="button-whatsapp-order"
                className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-4 uppercase tracking-widest text-sm font-semibold hover:bg-[#20bd5a] transition-colors rounded-sm"
              >
                <MessageCircle className="w-5 h-5" /> Order on WhatsApp
              </a>
              <button
                onClick={() => toggleWishlist(product)}
                data-testid="button-wishlist-toggle"
                className={`flex items-center justify-center gap-2 border px-8 py-4 uppercase tracking-widest text-sm font-semibold transition-colors rounded-sm ${
                  isWishlisted
                    ? 'border-primary text-primary bg-primary/10'
                    : 'border-border text-foreground hover:border-foreground'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                {isWishlisted ? 'Saved' : 'Wishlist'}
              </button>
            </div>

            {/* Service Pledges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="flex flex-col items-center text-center">
                <Ruler className="w-5 h-5 text-primary mb-2" />
                <h5 className="font-serif text-xs md:text-sm mb-1">Custom Fit</h5>
                <p className="text-xs text-muted-foreground">Tailored to your measurements</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Truck className="w-5 h-5 text-primary mb-2" />
                <h5 className="font-serif text-xs md:text-sm mb-1">Fast Delivery</h5>
                <p className="text-xs text-muted-foreground">Secure & insured shipping</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <ShieldAlert className="w-5 h-5 text-primary mb-2" />
                <h5 className="font-serif text-xs md:text-sm mb-1">Authentic</h5>
                <p className="text-xs text-muted-foreground">100% genuine craftsmanship</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts && relatedProducts.filter(p => p.id !== product.id).length > 0 && (
          <div className="pt-20 border-t border-border">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl text-foreground mb-4">You May Also <span className="text-primary italic">Love</span></h2>
              <div className="w-16 h-px bg-primary mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.filter(p => p.id !== product.id).slice(0, 4).map((rp, i) => (
                <ProductCard key={rp.id} product={rp} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <ImageLightbox
          images={allImages}
          initialIndex={lightboxIndex}
          alt={product.name}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
