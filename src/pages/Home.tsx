import React from 'react';
import { useGetFeaturedCatalog, useListTestimonials, useSubmitContact } from '@workspace/api-client-react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ProductCard } from '@/components/ProductCard';
import { ArrowRight, Star, MapPin, Phone } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const MAPS_URL = 'https://maps.app.goo.gl/eCF2muDGMH5bz3BQ9';

export default function Home() {
  const { data: catalog, isLoading: catalogLoading } = useGetFeaturedCatalog();
  const { data: testimonials, isLoading: testimonialsLoading } = useListTestimonials();
  const submitContact = useSubmitContact();

  const [contactForm, setContactForm] = React.useState({ name: '', email: '', phone: '', message: '' });
  const [contactSuccess, setContactSuccess] = React.useState(false);

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    submitContact.mutate({ data: contactForm }, {
      onSuccess: () => {
        setContactForm({ name: '', email: '', phone: '', message: '' });
        setContactSuccess(true);
        setTimeout(() => setContactSuccess(false), 5000);
      },
    });
  };

  return (
    <div className="flex flex-col min-h-screen">

      {/* ─── Hero ─── */}
      <section className="relative h-[90vh] md:h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1800"
            alt="Luxury Indian Fashion"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background"></div>
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-primary mb-6 block">Pappu Di Hatti</span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight max-w-5xl mx-auto">
              Draped in Tradition.<br />
              <span className="italic text-primary">Designed for Today.</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl mb-10 font-light">
              Discover the finest collection of designer suits, bridal lehengas, and anarkalis. Wearable art for the modern woman.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/shop" className="bg-primary text-primary-foreground px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-primary/90 transition-colors w-full sm:w-auto text-center">
                Explore Collection
              </Link>
              <Link href="/categories" className="bg-transparent border border-primary text-primary px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-primary/10 transition-colors w-full sm:w-auto text-center">
                View Categories
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Featured Collections ─── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-12 flex-wrap gap-4">
            <div>
              <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-4">Featured <span className="text-primary italic">Couture</span></h2>
              <p className="text-muted-foreground font-light max-w-md">Curated masterpieces that define our heritage and craftsmanship.</p>
            </div>
            <Link href="/shop" className="hidden md:flex items-center text-primary hover:text-primary/80 uppercase tracking-widest text-xs font-semibold transition-colors">
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
          {catalogLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1,2,3,4].map(i => <div key={i} className="aspect-[3/4] bg-muted animate-pulse rounded-sm"></div>)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {catalog?.featured.slice(0, 4).map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
          <Link href="/shop" className="mt-8 flex md:hidden items-center justify-center text-primary hover:text-primary/80 uppercase tracking-widest text-xs font-semibold transition-colors w-full border border-primary py-4">
            View All Featured <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>

      {/* ─── New Arrivals & Best Sellers ─── */}
      <section className="py-24 bg-secondary/30 border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-4">Latest <span className="text-primary italic">Arrivals</span></h2>
            <div className="w-24 h-px bg-primary mx-auto"></div>
          </div>
          {catalogLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1,2,3].map(i => <div key={i} className="aspect-[3/4] bg-muted animate-pulse rounded-sm"></div>)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
              {catalog?.newArrivals.slice(0, 3).map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-4">Best <span className="text-primary italic">Sellers</span></h2>
            <div className="w-24 h-px bg-primary mx-auto"></div>
          </div>
          {catalogLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[1,2,3,4].map(i => <div key={i} className="aspect-[3/4] bg-muted animate-pulse rounded-sm"></div>)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {catalog?.bestSellers.slice(0, 4).map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── About / Brand Story ─── */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 bg-[url('https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl md:text-6xl text-foreground mb-8">
              The Legacy of <br /><span className="text-primary italic">Pappu Di Hatti</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6 font-light">
              Since generations, SHREE GANESH ARTS has been the trusted name in fine Indian fashion for women across Punjab. We believe that true luxury lies in the details — the intricate zari work, the drape of a pure silk dupatta, the perfect cut of a tailored suit.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10 font-light">
              Our atelier in Jalandhar Cantt brings together heritage craftsmanship and contemporary aesthetics, ensuring every piece you wear is nothing short of wearable art.
            </p>
            <Link href="/about" className="inline-flex items-center text-primary uppercase tracking-widest text-sm font-semibold hover:text-primary/80 transition-colors pb-1 border-b border-primary/30 hover:border-primary">
              Discover Our Story <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-4">Client <span className="text-primary italic">Love</span></h2>
            <p className="text-muted-foreground">Hear from the women who wear our art.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialsLoading
              ? [1,2,3].map(i => <div key={i} className="h-64 bg-muted animate-pulse rounded-sm"></div>)
              : testimonials?.slice(0, 3).map((t, i) => (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-background border border-border p-8 rounded-sm"
                  >
                    <div className="flex items-center gap-1 mb-6 text-primary">
                      {[...Array(Math.round(t.rating ?? 5))].map((_, si) => (
                        <Star key={si} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-foreground/90 italic mb-8 line-clamp-4">"{t.review}"</p>
                    <div>
                      <h4 className="font-serif text-lg text-primary">{t.name}</h4>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">{t.location}</p>
                    </div>
                  </motion.div>
                ))}
          </div>
        </div>
      </section>

      {/* ─── Contact & FAQ ─── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Contact Form */}
            <div>
              <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-8">Visit <span className="text-primary italic">Us</span></h2>
              <div className="flex flex-col space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center shrink-0 text-primary">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl mb-1">Our Boutique</h4>
                    <a
                      href={MAPS_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted-foreground leading-relaxed hover:text-primary transition-colors"
                    >
                      18, Gurudwara Road, Near Lovely Sweets,<br />
                      Sadar Bazar, Jalandhar Cantt,<br />
                      Punjab 144005
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center shrink-0 text-primary">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl mb-1">Call / WhatsApp</h4>
                    <a href="tel:+919465091977" className="text-muted-foreground hover:text-primary transition-colors">
                      +91 94650 91977
                    </a>
                  </div>
                </div>
              </div>

              <form onSubmit={handleContact} className="space-y-4">
                <h4 className="font-serif text-xl mb-4">Send a Message</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    required
                    placeholder="Name"
                    data-testid="input-contact-name"
                    className="bg-transparent border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors"
                    value={contactForm.name}
                    onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    data-testid="input-contact-email"
                    className="bg-transparent border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors"
                    value={contactForm.email}
                    onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                  />
                </div>
                <input
                  placeholder="Phone (Optional)"
                  data-testid="input-contact-phone"
                  className="w-full bg-transparent border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors"
                  value={contactForm.phone}
                  onChange={e => setContactForm({ ...contactForm, phone: e.target.value })}
                />
                <textarea
                  required
                  placeholder="Message"
                  rows={4}
                  data-testid="input-contact-message"
                  className="w-full bg-transparent border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none transition-colors resize-none"
                  value={contactForm.message}
                  onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                />
                {contactSuccess && (
                  <p className="text-green-500 text-sm">Thank you! We will get back to you shortly.</p>
                )}
                <button
                  type="submit"
                  disabled={submitContact.isPending}
                  data-testid="button-contact-submit"
                  className="bg-primary text-primary-foreground px-8 py-3 uppercase tracking-widest text-xs font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {submitContact.isPending ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Map & FAQ */}
            <div className="flex flex-col">
              {/* Clickable map wrapper */}
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="block aspect-[4/3] md:aspect-video w-full mb-12 rounded-sm overflow-hidden border border-border grayscale hover:grayscale-0 transition-all duration-500 relative group"
                aria-label="Open in Google Maps"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3408.847119102434!2d75.61868357530663!3d31.307616174306354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a5a584067a9e5%3A0xe5a3c9e6bbaf2df0!2s18%2C%20Gurudwara%20Rd%2C%20Sadar%20Bazar%2C%20Jalandhar%20Cantt%2C%20Jalandhar%2C%20Punjab%20144005!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, pointerEvents: 'none' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="SHREE GANESH ARTS location"
                />
                <div className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-background/90 text-foreground text-xs px-3 py-1.5 rounded-sm border border-border uppercase tracking-widest">
                    Open in Google Maps
                  </span>
                </div>
              </a>

              {/* FAQ */}
              <div>
                <h4 className="font-serif text-2xl mb-6">Frequently Asked Questions</h4>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-border">
                    <AccordionTrigger className="hover:text-primary font-sans text-left">Do you offer alterations or custom fittings?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      Absolutely. We provide professional alteration services and custom fittings to ensure your garment fits perfectly. Please contact us via WhatsApp or visit our boutique to schedule an appointment with our expert tailors.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className="border-border">
                    <AccordionTrigger className="hover:text-primary font-sans text-left">Can I get a custom tailored outfit?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      Absolutely. We specialize in custom tailoring and bespoke bridal wear. Please contact us via WhatsApp to book a virtual or in-store consultation with our design team.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3" className="border-border">
                    <AccordionTrigger className="hover:text-primary font-sans text-left">How do I place an order?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      You can order directly through WhatsApp. Simply click "Order on WhatsApp" on any product page, and our team will assist you with measurements, colour selection, pricing, and payment details.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Instagram Section (replaces newsletter) ─── */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Follow Us on Instagram</h2>
          <p className="mb-8 max-w-md mx-auto opacity-90">
            Stay updated with our latest collections, styling inspirations, and exclusive offers.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-2">
            <div className="flex-1 bg-background/10 border border-primary-foreground/30 px-4 py-3 text-sm text-primary-foreground/80 text-left select-none">
              @shreeganesh1317
            </div>
            <a
              href="https://instagram.com/shreeganesh1317"
              target="_blank"
              rel="noreferrer"
              data-testid="link-instagram-follow"
              className="bg-primary-foreground text-primary px-8 py-3 uppercase tracking-widest text-xs font-semibold hover:bg-background hover:text-foreground transition-colors whitespace-nowrap text-center"
            >
              Follow
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
