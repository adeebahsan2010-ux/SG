import React from "react";
import { Link, useLocation } from "wouter";
import {
  Search,
  Heart,
  Menu,
  X,
  MessageCircle
} from "lucide-react";
import {
  motion,
  AnimatePresence
} from "framer-motion";
import { useWishlist } from "@/hooks/use-wishlist";


const categories = [
  { id: 1, name: "Lehenga" },
  { id: 2, name: "Suits" },
  { id: 3, name: "Anarkali" },
  { id: 4, name: "Bridal Wear" }
];


const products = [
  {
    id: 1,
    name: "Designer Bridal Collection",
    category: "Lehenga",
    price: 24999,
    imageUrl:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500"
  },
  {
    id: 2,
    name: "Premium Party Suit",
    category: "Suits",
    price: 9999,
    imageUrl:
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500"
  }
];


export function Navbar() {

  const [isScrolled, setIsScrolled] =
    React.useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] =
    React.useState(false);

  const [searchOpen, setSearchOpen] =
    React.useState(false);

  const [searchQuery, setSearchQuery] =
    React.useState("");

  const [, setLocation] = useLocation();
  const [location] = useLocation();

  const { count } = useWishlist();

  const searchInputRef =
    React.useRef<HTMLInputElement>(null);


  React.useEffect(() => {

    const handleScroll = () =>
      setIsScrolled(window.scrollY > 50);

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );

  }, []);


  React.useEffect(() => {

    if(searchOpen){

      setTimeout(()=>{
        searchInputRef.current?.focus();
      },100);

    } else {

      setSearchQuery("");

    }

  },[searchOpen]);


  const navLinks = [
    {
      name:"Home",
      href:"/"
    },
    {
      name:"Shop",
      href:"/shop"
    },
    {
      name:"Categories",
      href:"/categories"
    },
    {
      name:"About",
      href:"/about"
    }
  ];


  const searchResults =
    searchQuery.length >= 2
    ?
    products.filter((p)=>
      p.name
      .toLowerCase()
      .includes(
        searchQuery.toLowerCase()
      )
    )
    :
    [];


  const matchingCategories =
    categories.filter((c)=>
      c.name
      .toLowerCase()
      .includes(
        searchQuery.toLowerCase()
      )
    );


  const handleSearchSubmit =
  (e:React.FormEvent)=>{

    e.preventDefault();

    if(!searchQuery.trim())
      return;

    setSearchOpen(false);

    setLocation(
      `/shop?search=${encodeURIComponent(searchQuery)}`
    );

  };
  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || location !== "/"
            ? "bg-background/95 backdrop-blur-md border-b border-border py-3"
            : "bg-transparent py-5"
        }`}
      >

        <div className="container mx-auto px-4 md:px-6">

          <div className="flex items-center justify-between">


            {/* Mobile Button */}
            <div className="md:hidden">

              <button
                onClick={() =>
                  setMobileMenuOpen(true)
                }
                className="text-foreground"
              >
                <Menu className="w-6 h-6"/>
              </button>

            </div>



            {/* Logo */}
            <Link
              href="/"
              className="flex flex-col items-center"
            >

              <span className="font-serif text-3xl font-bold text-primary">
                SG
              </span>

              <span className="text-[10px] uppercase tracking-widest">
                Shree Ganesh Arts
              </span>

            </Link>



            {/* Desktop Links */}
            <nav className="hidden md:flex gap-8">

              {navLinks.map((link)=>(

                <Link
                  key={link.name}
                  href={link.href}
                  className={`uppercase text-sm ${
                    location === link.href
                    ? "text-primary"
                    : "text-foreground"
                  }`}
                >
                  {link.name}
                </Link>

              ))}

            </nav>



            {/* Actions */}
            <div className="flex items-center gap-5">


              <button
                onClick={()=>
                  setSearchOpen(true)
                }
              >
                <Search className="w-5 h-5"/>
              </button>



              <Link
                href="/shop"
                className="relative"
              >

                <Heart className="w-5 h-5"/>

                {count > 0 && (

                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">

                    {count}

                  </span>

                )}

              </Link>


            </div>


          </div>

        </div>


        {/* Mobile Menu */}

        <AnimatePresence>

          {mobileMenuOpen && (

            <>

              <motion.div

                initial={{
                  opacity:0
                }}

                animate={{
                  opacity:1
                }}

                exit={{
                  opacity:0
                }}

                onClick={()=>
                  setMobileMenuOpen(false)
                }

                className="fixed inset-0 bg-background/80 z-40"

              />


              <motion.div

                initial={{
                  x:"-100%"
                }}

                animate={{
                  x:0
                }}

                exit={{
                  x:"-100%"
                }}

                className="fixed top-0 left-0 bottom-0 w-3/4 bg-card z-50 p-6"

              >

                <div className="flex justify-between mb-10">

                  <span className="text-primary text-2xl font-bold">
                    SG
                  </span>


                  <button
                    onClick={()=>
                      setMobileMenuOpen(false)
                    }
                  >
                    <X/>
                  </button>


                </div>



                <div className="flex flex-col gap-6">

                  {navLinks.map((link)=>(

                    <Link

                      key={link.name}

                      href={link.href}

                      onClick={()=>
                        setMobileMenuOpen(false)
                      }

                      className="text-lg"

                    >

                      {link.name}

                    </Link>

                  ))}


                </div>



                <a

                  href="https://wa.me/919465091977"

                  target="_blank"

                  rel="noreferrer"

                  className="flex items-center mt-10"

                >

                  <MessageCircle className="mr-2"/>

                  WhatsApp Us

                </a>


              </motion.div>

            </>

          )}

        </AnimatePresence>


      </header>
      {/* Search Overlay */}

      <AnimatePresence>

        {searchOpen && (

          <motion.div

            initial={{
              opacity:0
            }}

            animate={{
              opacity:1
            }}

            exit={{
              opacity:0
            }}

            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-md"

          >

            <div className="container mx-auto px-4 py-8">


              <div className="flex items-center gap-4 border-b pb-4">


                <Search className="w-5 h-5"/>


                <form
                  onSubmit={handleSearchSubmit}
                  className="flex-1"
                >

                  <input

                    ref={searchInputRef}

                    value={searchQuery}

                    onChange={(e)=>
                      setSearchQuery(e.target.value)
                    }

                    placeholder="Search products..."

                    className="w-full bg-transparent outline-none text-xl"

                  />

                </form>


                <button
                  onClick={()=>
                    setSearchOpen(false)
                  }
                >

                  <X className="w-6 h-6"/>

                </button>


              </div>



              <div className="mt-8">


                {searchQuery.length < 2 ? (

                  <div>

                    <h3 className="text-sm uppercase mb-4">
                      Browse Categories
                    </h3>


                    <div className="flex flex-wrap gap-3">

                      {categories.map((c)=>(

                        <button

                          key={c.id}

                          onClick={()=>{
                            setSearchOpen(false);
                            setLocation(
                              `/shop?category=${c.name}`
                            );
                          }}

                          className="border px-4 py-2"

                        >

                          {c.name}

                        </button>

                      ))}

                    </div>


                  </div>


                ) : (


                  <div>


                    <h3 className="text-sm uppercase mb-4">
                      Results
                    </h3>


                    {searchResults.length > 0 ? (

                      <div className="grid gap-4">


                        {searchResults.map((p)=>(

                          <button

                            key={p.id}

                            onClick={()=>{

                              setSearchOpen(false);

                              setLocation(
                                `/products/${p.id}`
                              );

                            }}

                            className="flex gap-4 text-left"

                          >

                            <img

                              src={p.imageUrl}

                              className="w-16 h-16 object-cover"

                            />


                            <div>

                              <p className="font-medium">
                                {p.name}
                              </p>

                              <p className="text-primary">
                                ₹{p.price.toLocaleString()}
                              </p>

                            </div>


                          </button>


                        ))}


                      </div>


                    ) : (


                      <p className="text-muted-foreground">
                        No products found
                      </p>


                    )}


                  </div>


                )}


              </div>


            </div>


          </motion.div>

        )}

      </AnimatePresence>


    </>
  );
}
