import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Star, MapPin, Phone } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const MAPS_URL = "https://maps.app.goo.gl/eCF2muDGMH5bz3BQ9";

const products = [
  {
    id: 1,
    name: "Designer Suit Collection",
    image:
      "https://images.unsplash.com/photo-1583391733981-849c5d5b8c66?w=600",
  },
  {
    id: 2,
    name: "Bridal Lehenga",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600",
  },
  {
    id: 3,
    name: "Premium Anarkali",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600",
  },
];

export default function Home() {
  const [contactForm, setContactForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [contactSuccess, setContactSuccess] = React.useState(false);

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSuccess(true);
    setContactForm({
      name: "",
      email: "",
      phone: "",
      message: "",
    });

    setTimeout(() => setContactSuccess(false), 4000);
  };

  return (
    <div className="flex flex-col min-h-screen">

      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1800"
          alt="Fashion"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />

        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-primary tracking-[0.3em] uppercase">
              Pappu Di Hatti
            </p>

            <h1 className="font-serif text-5xl md:text-7xl mt-6">
              Draped in Tradition.
              <br />
              <span className="italic text-primary">
                Designed for Today.
              </span>
            </h1>

            <p className="max-w-xl mx-auto mt-6 text-muted-foreground text-lg">
              Discover premium designer suits, bridal lehengas and
              elegant Indian fashion collections.
            </p>

            <Link
              href="/shop"
              className="inline-flex items-center gap-2 mt-8 bg-primary px-8 py-4 text-primary-foreground"
            >
              Explore Collection
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="font-serif text-4xl text-center mb-12">
            Featured <span className="text-primary italic">Collection</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="border border-border p-4"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-[3/4] object-cover"
                />
                <h3 className="font-serif text-xl mt-4">
                  {product.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-secondary/30 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl">
              Our <span className="text-primary italic">Legacy</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <p className="text-muted-foreground text-lg leading-relaxed">
              Since generations, SHREE GANESH ARTS has been creating
              timeless Indian fashion with premium craftsmanship.
              Every outfit reflects elegance, tradition and modern style.
            </p>

            <p className="text-muted-foreground text-lg leading-relaxed mt-6">
              Visit our boutique in Jalandhar Cantt and explore our
              exclusive collection of designer suits, lehengas and
              custom outfits.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="font-serif text-4xl text-center mb-12">
            Client <span className="text-primary italic">Love</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {[1,2,3].map((item) => (
              <div
                key={item}
                className="border border-border p-8"
              >
                <div className="flex text-primary mb-5">
                  {[1,2,3,4,5].map((star)=>(
                    <Star
                      key={star}
                      size={16}
                      fill="currentColor"
                    />
                  ))}
                </div>

                <p className="italic text-muted-foreground">
                  "Beautiful collection and amazing quality.
                  Loved the traditional designs."
                </p>

                <h4 className="mt-5 font-serif">
                  Happy Customer
                </h4>
              </div>
            ))}

          </div>
        </div>
      </section>

      <section className="py-20 bg-background px-4">
        <div className="container mx-auto grid md:grid-cols-2 gap-12">

          <div>
            <h2 className="font-serif text-4xl mb-8">
              Visit <span className="text-primary italic">Us</span>
            </h2>

            <div className="flex gap-4 mb-6">
              <MapPin className="text-primary"/>
              <p>
                18, Gurudwara Road,
                <br/>
                Sadar Bazar,
                <br/>
                Jalandhar Cantt, Punjab
              </p>
            </div>

            <div className="flex gap-4">
              <Phone className="text-primary"/>
              <p>
                +91 94650 91977
              </p>
            </div>
          </div>


          <form
            onSubmit={handleContact}
            className="space-y-4"
          >

            <input
              className="w-full border p-3 bg-transparent"
              placeholder="Name"
              value={contactForm.name}
              onChange={(e)=>setContactForm({
                ...contactForm,
                name:e.target.value
              })}
            />

            <input
              className="w-full border p-3 bg-transparent"
              placeholder="Email"
              value={contactForm.email}
              onChange={(e)=>setContactForm({
                ...contactForm,
                email:e.target.value
              })}
            />

            <textarea
              className="w-full border p-3 bg-transparent"
              placeholder="Message"
              rows={4}
              value={contactForm.message}
              onChange={(e)=>setContactForm({
                ...contactForm,
                message:e.target.value
              })}
            />

            <button
              className="bg-primary px-8 py-3 text-primary-foreground"
            >
              Send Message
            </button>

            {contactSuccess && (
              <p className="text-green-500">
                Thank you! We will contact you soon.
              </p>
            )}

          </form>

        </div>
      </section>
      <section className="py-20 bg-secondary/30 px-4">
        <div className="container mx-auto">

          <h2 className="font-serif text-3xl md:text-4xl text-center mb-10">
            Frequently Asked <span className="text-primary italic">Questions</span>
          </h2>

          <Accordion type="single" collapsible className="max-w-3xl mx-auto">

            <AccordionItem value="one">
              <AccordionTrigger>
                Do you offer custom fittings?
              </AccordionTrigger>
              <AccordionContent>
                Yes, we provide custom fittings and alterations
                according to your requirements.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="two">
              <AccordionTrigger>
                How can I place an order?
              </AccordionTrigger>
              <AccordionContent>
                You can contact us directly on WhatsApp or visit
                our boutique for orders.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="three">
              <AccordionTrigger>
                Where is your store located?
              </AccordionTrigger>
              <AccordionContent>
                Our boutique is located in Jalandhar Cantt, Punjab.
              </AccordionContent>
            </AccordionItem>

          </Accordion>

        </div>
      </section>


      <section className="py-16 bg-primary text-primary-foreground px-4">
        <div className="container mx-auto text-center">

          <h2 className="font-serif text-4xl mb-4">
            Follow Us on Instagram
          </h2>

          <p className="mb-6">
            Stay updated with latest collections and offers.
          </p>

          <a
            href="https://instagram.com/shreeganesh1317"
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-background text-foreground px-8 py-3"
          >
            Follow @shreeganesh1317
          </a>

        </div>
      </section>


    </div>
  );
}
