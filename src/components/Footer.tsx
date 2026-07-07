import { Link } from 'wouter';
import { Instagram, MapPin, MessageCircle, Phone } from 'lucide-react';

const MAPS_URL = 'https://maps.app.goo.gl/eCF2muDGMH5bz3BQ9';
const RETURNS_WA = 'https://wa.me/919465091977?text=' + encodeURIComponent('Hello, I would like to exchange a product purchased from SHREE GANESH ARTS.');

export function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="inline-flex flex-col group">
              <span className="font-serif text-4xl font-bold tracking-widest text-primary">SG</span>
              <span className="text-xs uppercase tracking-[0.2em] font-sans mt-1 text-muted-foreground group-hover:text-primary transition-colors">
                Shree Ganesh Arts
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Draped in Tradition. Designed for Today.<br />Pappu Di Hatti has dressed generations of women in the finest Indian couture.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/shreeganesh1317"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919465091977"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-serif text-lg text-foreground mb-6">Explore</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">Home</Link></li>
              <li><Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors text-sm">Shop</Link></li>
              <li><Link href="/categories" className="text-muted-foreground hover:text-primary transition-colors text-sm">Categories</Link></li>
              <li><Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors text-sm">New Arrivals</Link></li>
              <li><Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors text-sm">Best Sellers</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-serif text-lg text-foreground mb-6">Customer Care</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">About Us</Link></li>
              <li><Link href="/#contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">Contact</Link></li>
              <li><Link href="/#faq" className="text-muted-foreground hover:text-primary transition-colors text-sm">FAQ</Link></li>
              <li>
                <a
                  href={RETURNS_WA}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Returns &amp; Exchanges
                </a>
              </li>
            </ul>
          </div>

          {/* Visit Us */}
          <div>
            <h4 className="font-serif text-lg text-foreground mb-6">Visit Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground text-sm">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <a href={MAPS_URL} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                  18, Gurudwara Road, Near Lovely Sweets,<br />Sadar Bazar, Jalandhar Cantt, Punjab 144005
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+919465091977" className="hover:text-primary transition-colors">+91 94650 91977</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Shree Ganesh Arts (Pappu Di Hatti). All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
