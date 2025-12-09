import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ChangeEvent } from "react";
import { currency } from "../utils/utils";

export type Props = {
  setCartOpen: (open: boolean) => void;
};

export const CartPopup = ({ setCartOpen }: Props) => {
  const { clearCart, cartItems, setQuantity, subtotal, total, totalDiscount } =
    useCart();
  return (
    <aside className="fixed right-4 bottom-4 w-96 max-w-[92%] z-50 bg-white rounded-2xl shadow-lg p-4">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold">Shopping Cart</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={clearCart}
            className="text-sm px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
          >
            Clear
          </button>
          <button
            onClick={() => setCartOpen(false)}
            className="text-sm px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>

      <div className="max-h-64 overflow-auto">
        {cartItems.length === 0 ? (
          <p className="text-sm text-gray-500">Your cart is empty.</p>
        ) : (
          cartItems.map((it) => (
            <div
              key={it.product.id}
              className="flex items-center gap-3 py-3 border-b last:border-b-0"
            >
              <img
                src={it.product.image}
                alt=""
                className="w-16 h-12 object-cover rounded"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">
                      {it.product.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      {currency(it.product.price)} each
                    </div>
                  </div>
                  <div className="text-sm font-medium">
                    {currency(
                      it.qty > 5
                        ? it.product.price * it.qty * 0.9
                        : it.product.price * it.qty
                    )}
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(it.product.id, it.qty - 1)}
                    className="px-2 py-1 bg-gray-100 rounded"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={it.qty}
                    min={0}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setQuantity(
                        it.product.id,
                        Math.max(0, Number(e.target.value) || 0)
                      )
                    }
                    className="w-16 text-center border rounded px-2 py-1"
                  />
                  <button
                    onClick={() => setQuantity(it.product.id, it.qty + 1)}
                    className="px-2 py-1 bg-gray-100 rounded"
                  >
                    +
                  </button>
                  {it.qty > 5 && (
                    <div className="ml-2 text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded">
                      -10% applied
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 border-t pt-3">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div>Subtotal</div>
          <div>{currency(subtotal)}</div>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-600 mt-1">
          <div>Discount</div>
          <div>-{currency(totalDiscount)}</div>
        </div>
        <div className="flex items-center justify-between text-lg font-semibold mt-3">
          <div>Total</div>
          <div>{currency(total)}</div>
        </div>

        <div className="mt-4 flex gap-2">
          <Link
            to="/cart"
            className="flex-1 px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 text-center"
          >
            Go to Full Cart
          </Link>
        </div>
      </div>
    </aside>
  );
};
