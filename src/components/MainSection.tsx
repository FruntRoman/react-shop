import { PRODUCTS, useCart } from "../context/CartContext";

function currency(n: number) {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD" });
}

export const MainSection = () => {
  const { addToCart } = useCart();

  return (
    <main
      className="
        max-w-7xl mx-auto pb-40
        grid gap-6
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        transition-all duration-500 ease-in-out
        motion-safe:animate-[fadeIn_0.4s_ease-in-out]
      "
    >
      {PRODUCTS.map((p) => (
        <article
          key={p.id}
          className="
            bg-white rounded-2xl shadow p-4 flex flex-col
            hover:-translate-y-1
            hover:shadow-lg

            transition-all duration-300 ease-out
          "
        >
          <div
            className="
              aspect-[4/3]
              overflow-hidden rounded-lg bg-gray-100
              flex items-center justify-center
              transition-all duration-300
            "
          >
            <img
              src={p.image}
              alt={p.title}
              className="
                object-cover w-full h-full
                transition-all duration-500
                hover:scale-110
              "
            />
          </div>

          <div className="mt-4 flex-1 flex flex-col">
            <h2 className="text-lg font-medium">{p.title}</h2>
            <p className="text-sm text-gray-600 mt-1 flex-1">{p.description}</p>

            <div className="mt-4 flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Price</div>
                <div className="text-xl font-semibold">{currency(p.price)}</div>
              </div>

              <button
                onClick={() => addToCart(p)}
                className="
                  px-4 py-2 bg-indigo-600 text-white rounded
                  hover:bg-indigo-700
                  active:scale-95

                  transition-all duration-200
                "
              >
                Add to cart
              </button>
            </div>
          </div>
        </article>
      ))}
    </main>
  );
};
