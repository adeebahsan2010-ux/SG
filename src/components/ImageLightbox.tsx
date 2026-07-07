import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

interface ImageLightboxProps {
  images: string[];
  initialIndex?: number;
  alt?: string;
  onClose: () => void;
}

export function ImageLightbox({ images, initialIndex = 0, alt = 'Product image', onClose }: ImageLightboxProps) {
  const [current, setCurrent] = React.useState(initialIndex);
  const [zoom, setZoom] = React.useState(1);
  const [dragOffset, setDragOffset] = React.useState({ x: 0, y: 0 });

  const prev = () => { setZoom(1); setCurrent((c) => (c - 1 + images.length) % images.length); };
  const next = () => { setZoom(1); setCurrent((c) => (c + 1) % images.length); };

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-md"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        {/* Controls Bar */}
        <div className="absolute top-4 right-4 flex items-center gap-3 z-10">
          <button
            onClick={() => setZoom((z) => Math.min(z + 0.5, 3))}
            className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center text-foreground hover:text-primary hover:border-primary transition-colors"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(z - 0.5, 1))}
            className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center text-foreground hover:text-primary hover:border-primary transition-colors"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center text-foreground hover:text-primary hover:border-primary transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Prev */}
        {images.length > 1 && (
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-border bg-card flex items-center justify-center text-foreground hover:text-primary hover:border-primary transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Image */}
        <motion.img
          key={current}
          src={images[current]}
          alt={`${alt} ${current + 1}`}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: zoom }}
          transition={{ duration: 0.25 }}
          className="max-h-[85vh] max-w-[85vw] object-contain select-none"
          style={{ cursor: zoom > 1 ? 'grab' : 'default' }}
          drag={zoom > 1}
          dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
        />

        {/* Next */}
        {images.length > 1 && (
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-border bg-card flex items-center justify-center text-foreground hover:text-primary hover:border-primary transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => { setZoom(1); setCurrent(i); }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${i === current ? 'bg-primary w-6' : 'bg-border'}`}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
