import { PRODUCTS, useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

function currency(n: number) {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD" });
}

export const MainSection = () => {
  const { addToCart } = useCart();

  // breakpoint-based items per slide
  const [itemsPerSlide, setItemsPerSlide] = useState(1);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setItemsPerSlide(3);
      else if (window.innerWidth >= 768) setItemsPerSlide(2);
      else setItemsPerSlide(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const [index, setIndex] = useState(0);

  const totalSlides = Math.ceil(PRODUCTS.length / itemsPerSlide);

  const next = () => setIndex((prev) => (prev + 1) % totalSlides);
  const prev = () => setIndex((prev) => (prev - 1 + totalSlides) % totalSlides);

  const start = index * itemsPerSlide;
  const visibleProducts = PRODUCTS.slice(start, start + itemsPerSlide);

  return (
    <main className="max-w-4xl mx-auto pb-40 relative select-none">
      {/* Slider container */}
      <div className="overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
            className="grid gap-6"
            style={{
              gridTemplateColumns: `repeat(${itemsPerSlide}, minmax(0, 1fr))`,
            }}
          >
            {visibleProducts.map((p) => (
              <article
                key={p.id}
                className="
                  bg-white rounded-2xl shadow p-4 flex flex-col
                  hover:-translate-y-1 hover:shadow-lg
                  transition-all duration-300
                "
              >
                <div className="aspect-[4/3] overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="object-cover w-full h-full transition-all duration-500 hover:scale-110"
                  />
                </div>

                <div className="mt-4 flex-1 flex flex-col">
                  <h2 className="text-lg font-medium">{p.title}</h2>
                  <p className="text-sm text-gray-600 mt-1 flex-1">
                    {p.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-500">Price</div>
                      <div className="text-xl font-semibold">
                        {currency(p.price)}
                      </div>
                    </div>

                    <button
                      onClick={() => addToCart(p)}
                      className="
                        px-4 py-2 bg-indigo-600 text-white rounded
                        hover:bg-indigo-700 active:scale-95
                        transition-all duration-200
                      "
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Prev button */}
      <button
        onClick={prev}
        className="
          absolute top-1/2 -translate-y-1/2 left-0
          bg-white shadow rounded-full w-10 h-10 flex items-center justify-center
          hover:bg-gray-100 transition
        "
      >
        ←
      </button>

      {/* Next button */}
      <button
        onClick={next}
        className="
          absolute top-1/2 -translate-y-1/2 right-0
          bg-white shadow rounded-full w-10 h-10 flex items-center justify-center
          hover:bg-gray-100 transition
        "
      >
        →
      </button>
    </main>
  );
};
