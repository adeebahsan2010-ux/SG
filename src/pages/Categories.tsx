import React from 'react';
import { useListCategories } from '@workspace/api-client-react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Categories() {
  const { data: categories, isLoading } = useListCategories();

  return (
    <div className="min-h-screen bg-background pt-24 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h1 className="font-serif text-4xl md:text-6xl text-foreground mb-6">Explore <span className="text-primary italic">Categories</span></h1>
          <p className="text-muted-foreground font-light text-lg">
            From intricate bridal wear to elegant everyday kurtis, discover the diverse world of Indian couture meticulously curated by Shree Ganesh Arts.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="aspect-[4/5] bg-muted animate-pulse rounded-sm"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories?.map((category, i) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative aspect-[4/5] overflow-hidden rounded-sm"
              >
                {/* Fallback image logic since API category images might be null */}
                <div className="absolute inset-0 bg-muted z-0">
                  <img 
                    src={category.imageUrl || `https://images.unsplash.com/photo-${1583391733956 + i}?w=800`} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-10"></div>
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                  <h3 className="font-serif text-3xl text-white mb-2">{category.name}</h3>
                  <p className="text-white/80 font-light mb-6 text-sm">
                    {category.description || `Discover our collection of exclusive ${category.name.toLowerCase()}.`}
                  </p>
                  
                  <Link 
                    href={`/shop?category=${category.slug}`}
                    className="inline-flex items-center gap-2 text-primary uppercase tracking-widest text-xs font-semibold group-hover:text-white transition-colors w-max"
                  >
                    View Collection ({category.productCount}) <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
