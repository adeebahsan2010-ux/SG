import React from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Ruler, Truck, ShieldAlert } from "lucide-react";
import { useWishlist } from "@/hooks/use-wishlist";
import { ProductCard } from "@/components/ProductCard";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

const COLORS = [
  { name: "Royal Crimson", hex: "#9B1C1C" },
  { name: "Midnight Blue", hex: "#1E3A5F" },
  { name: "Emerald", hex: "#065F46" },
  { name: "Champagne", hex: "#C9A84C" },
  { name: "Ivory", hex: "#F5F0E8" },
];

const demoProduct = {
  id: 1,
  name: "Designer Bridal Collection",
  category: "Lehenga",
  price: 24999,
  originalPrice: 29999,
  imageUrl:
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=900",
  imageUrls: [],
  description:
    "Premium designer outfit crafted with traditional Indian craftsmanship.",
  fabric: "Premium Silk",
  occasion: "Wedding",
  isNew: true,
  isBestSeller: true,
  inStock: true,
};

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();

  const product = demoProduct;

  const { toggleWishlist, isInWishlist } = useWishlist();

  const [activeImage, setActiveImage] = React.useState(product.imageUrl);
  const [selectedSize, setSelectedSize] = React.useState("");
  const [selectedColor, setSelectedColor] = React.useState("");

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const allImages = [
    product.imageUrl,
    ...product.imageUrls,
  ];

  const buildWhatsAppUrl = () => {
    let text = `Hi, I am interested in ${product.name}`;

    if (selectedSize) {
      text += ` Size: ${selectedSize}`;
    }

    if (selectedColor) {
      text += ` Colour: ${selectedColor}`;
    }

    return `https://wa.me/919465091977?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">

      <div className="container mx-auto px-4 md:px-6">

        <div className="flex gap-2 text-sm mb-8">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/shop">Shop</Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>


        <div className="grid lg:grid-cols-2 gap-12">

          <div>

            <motion.img
              src={activeImage}
              alt={product.name}
              className="w-full aspect-[3/4] object-cover rounded"
              initial={{opacity:0}}
              animate={{opacity:1}}
            />

            <div className="flex gap-3 mt-4">
              {allImages.map((img,index)=>(
                <button
                  key={index}
                  onClick={()=>setActiveImage(img)}
                  className="w-16 h-20"
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

          </div>


          <div>

            <p className="text-primary uppercase tracking-widest text-sm">
              {product.category}
            </p>

            <h1 className="font-serif text-4xl mt-3">
              {product.name}
            </h1>

            <div className="mt-5">
              <span className="text-primary text-3xl font-semibold">
                ₹{product.price.toLocaleString()}
              </span>
            </div>
            <p className="text-muted-foreground mt-6 leading-relaxed">
              {product.description}
            </p>


            {/* Colour */}
            <div className="mt-8">
              <h3 className="text-sm uppercase tracking-widest mb-3">
                Colour {selectedColor && `- ${selectedColor}`}
              </h3>

              <div className="flex gap-3 flex-wrap">
                {COLORS.map((color) => (
                  <button
                    key={color.name}
                    onClick={() =>
                      setSelectedColor(
                        selectedColor === color.name ? "" : color.name
                      )
                    }
                    className={`w-9 h-9 rounded-full border-2 ${
                      selectedColor === color.name
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                    style={{
                      backgroundColor: color.hex,
                    }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>


            {/* Size */}
            <div className="mt-8">

              <div className="flex justify-between mb-3">
                <h3 className="text-sm uppercase tracking-widest">
                  Size
                </h3>

                <a
                  href="https://wa.me/919465091977"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary text-sm flex items-center gap-1"
                >
                  <Ruler className="w-4 h-4"/>
                  Size Guide
                </a>
              </div>


              <div className="flex flex-wrap gap-3">
                {SIZES.map((size)=>(
                  <button
                    key={size}
                    onClick={() =>
                      setSelectedSize(
                        selectedSize === size ? "" : size
                      )
                    }
                    className={`px-4 py-2 border rounded ${
                      selectedSize === size
                      ? "border-primary text-primary"
                      : "border-border"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

            </div>


            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10">

              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 uppercase tracking-widest"
              >
                <MessageCircle className="w-5 h-5"/>
                Order on WhatsApp
              </a>


              <button
                onClick={()=>toggleWishlist(product)}
                className="flex items-center justify-center gap-2 border py-4 px-6"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isInWishlist(product.id)
                    ? "fill-current text-primary"
                    : ""
                  }`}
                />

                Wishlist
              </button>

            </div>


            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mt-10 border-t pt-8">

              <div className="text-center">
                <Ruler className="mx-auto text-primary mb-2"/>
                <p className="text-xs">
                  Custom Fit
                </p>
              </div>


              <div className="text-center">
                <Truck className="mx-auto text-primary mb-2"/>
                <p className="text-xs">
                  Fast Delivery
                </p>
              </div>


              <div className="text-center">
                <ShieldAlert className="mx-auto text-primary mb-2"/>
                <p className="text-xs">
                  Authentic
                </p>
              </div>

            </div>
            </div>

        </div>


        {/* Related Products */}
        <section className="mt-20 border-t pt-12">

          <h2 className="font-serif text-3xl text-center mb-10">
            You May Also <span className="text-primary italic">Love</span>
          </h2>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {[1,2,3,4].map((item)=>(
              <div
                key={item}
                className="border p-4"
              >

                <img
                  src={product.imageUrl}
                  alt="Related Product"
                  className="w-full aspect-[3/4] object-cover"
                />

                <h3 className="font-serif mt-4">
                  Designer Collection
                </h3>

                <p className="text-primary mt-2">
                  ₹24,999
                </p>

              </div>
            ))}

          </div>

        </section>


      </div>

    </div>
  );
}
