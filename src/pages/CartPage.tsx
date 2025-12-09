import React, { ChangeEvent } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function currency(n: number) {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD" });
}

export const CartPage: React.FC = () => {
  const { cartItems, setQuantity, clearCart, subtotal, totalDiscount, total } =
    useCart();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="max-w-4xl mx-auto mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Your Cart</h1>
        <Link to="/" className="text-indigo-600 hover:underline">
          Back to Shop
        </Link>
      </header>

      <main className="max-w-4xl mx-auto bg-white p-4 rounded-2xl shadow">
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {cartItems.map((it) => (
              <div
                key={it.product.id}
                className="flex items-center gap-4 border-b pb-2"
              >
                <img
                  src={it.product.image}
                  className="w-20 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <div className="font-medium">{it.product.title}</div>
                  <div className="text-sm text-gray-500">
                    {currency(it.product.price)} each
                  </div>
                  <div className="flex items-center gap-2 mt-2">
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
                      <span className="ml-2 text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded">
                        -10% applied
                      </span>
                    )}
                  </div>
                </div>
                <div className="font-semibold">
                  {currency(
                    it.qty > 5
                      ? it.product.price * it.qty * 0.9
                      : it.product.price * it.qty
                  )}
                </div>
              </div>
            ))}
            <div className="mt-4 border-t pt-4 flex flex-col gap-2 text-gray-700">
              <div className="flex justify-between">
                Subtotal: {currency(subtotal)}
              </div>
              <div className="flex justify-between">
                Discount: -{currency(totalDiscount)}
              </div>
              <div className="flex justify-between font-semibold text-lg">
                Total: {currency(total)}
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={clearCart}
                  className="px-4 py-2 rounded border bg-gray-100"
                >
                  Clear Cart
                </button>
                <button
                  disabled={cartItems.length === 0}
                  className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 flex-1"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CartPage;
