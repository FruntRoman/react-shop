import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export type Props = {
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
};

export const Header = ({ setCartOpen, isCartOpen }: Props) => {
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((s, it) => s + it.qty, 0);
  return (
    <header className="max-w-7xl mx-auto mb-6 flex items-center justify-between">
      <h1 className="text-2xl font-semibold">Product Carousel</h1>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setCartOpen(!isCartOpen)}
          className="relative inline-flex items-center gap-2 px-4 py-2 bg-white border rounded shadow-sm hover:shadow"
        >
          Cart
          <span className="ml-1 inline-block rounded-full bg-indigo-600 text-white text-xs w-6 h-6 flex items-center justify-center">
            {totalItems}
          </span>
        </button>
        <Link to="/cart" className="px-4 py-2 text-indigo-600 hover:underline">
          Full Cart
        </Link>
      </div>
    </header>
  );
};
