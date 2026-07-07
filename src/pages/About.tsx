import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight, Award, Heart, Scissors, Star } from 'lucide-react';

const values = [
  { icon: Scissors, title: 'Masterful Craftsmanship', description: 'Every piece is born from a deep reverence for traditional Indian artistry. Our artisans are custodians of techniques passed down through generations.' },
  { icon: Star, title: 'Uncompromising Quality', description: 'We source only the finest fabrics — pure silks, premium georgettes, hand-woven chanderi — to ensure each garment is worthy of your most cherished moments.' },
  { icon: Heart, title: 'Celebrating Womanhood', description: 'We design for real women — for the bride, the mother, the working professional, the dreamer. Every silhouette is crafted to make you feel extraordinary.' },
  { icon: Award, title: 'Heritage & Trust', description: 'For generations, families across Punjab have trusted SHREE GANESH ARTS for their most important occasions. That trust is the foundation of everything we do.' },
];

const milestones = [
  { year: 'Legacy', label: 'Decades of heritage in fine Indian fashion' },
  { year: '10,000+', label: 'Brides and families served with love' },
  { year: '500+', label: 'Unique designs in our curated collection' },
  { year: '100%', label: 'Commitment to authentic craftsmanship' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-20">

      {/* Hero */}
      <section className="relative overflow-hidden py-24 border-b border-border">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1800"
            alt="Heritage Indian Fashion"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-primary mb-6 block font-sans">Our Story</span>
            <h1 className="font-serif text-5xl md:text-7xl text-foreground mb-8 leading-tight">
              The Legacy of <br />
              <span className="text-primary italic">Shree Ganesh Arts</span>
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed font-light">
              A story woven in gold thread and silk — of a boutique that became a heritage, and a heritage that became a promise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-8">
                Where Every Thread <span className="text-primary italic">Tells a Story</span>
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed font-light text-lg">
                <p>
                  In the heart of Jalandhar Cantt, on a street lined with the sounds of the city and the fragrance of marigold garlands, stands a boutique that has been dressing the women of Punjab in their finest moments for generations.
                </p>
                <p>
                  SHREE GANESH ARTS — known lovingly across the city as Pappu Di Hatti — began as a dream to bring the finest Indian textiles and craftsmanship to the discerning women of our community. What started as a curation of premium fabrics and hand-embroidered suits grew into something far greater: a trusted companion for every milestone in a woman's life.
                </p>
                <p>
                  We have dressed brides on their wedding day, mothers at their children's engagements, and daughters stepping into their first salwar kameez. Each garment we offer carries not just thread and fabric, but memory, tradition, and love.
                </p>
                <p>
                  Today, SHREE GANESH ARTS stands as a testament to the belief that true luxury is not about price — it is about the feeling of wearing something crafted with intention, for a woman who deserves nothing but the extraordinary.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800"
                  alt="SHREE GANESH ARTS Boutique"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-2/3 aspect-square border border-primary/30 -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 bg-card border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="font-serif text-4xl md:text-5xl text-primary mb-3">{m.year}</div>
                <p className="text-muted-foreground text-sm leading-relaxed">{m.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
              What We <span className="text-primary italic">Stand For</span>
            </h2>
            <div className="w-16 h-px bg-primary mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-6 p-8 border border-border hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center shrink-0 text-primary">
                  <v.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-foreground mb-3">{v.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{v.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit CTA */}
      <section className="py-20 bg-card border-t border-border">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
            Come, <span className="text-primary italic">Meet Us</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10 text-lg font-light">
            Our doors are open. Visit us at 18, Gurudwara Road, Sadar Bazar, Jalandhar Cantt — and let us find the perfect piece for your story.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop"
              className="bg-primary text-primary-foreground px-10 py-4 uppercase tracking-widest text-sm font-medium hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
            >
              Explore Collection <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/919465091977"
              target="_blank"
              rel="noreferrer"
              className="border border-primary text-primary px-10 py-4 uppercase tracking-widest text-sm font-medium hover:bg-primary/10 transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
