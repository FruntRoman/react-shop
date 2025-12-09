import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
};

type CartItem = {
  product: Product;
  qty: number;
};

type CartContextType = {
  cart: Record<string, number>;
  addToCart: (product: Product) => void;
  setQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  cartItems: CartItem[];
  subtotal: number;
  totalDiscount: number;
  total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Record<string, number>>({});

  const addToCart = (product: Product) =>
    setCart((c) => ({ ...c, [product.id]: (c[product.id] || 0) + 1 }));

  const setQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      setCart((c) => {
        const next = { ...c };
        delete next[id];
        return next;
      });
      return;
    }
    setCart((c) => ({ ...c, [id]: qty }));
  };

  const clearCart = () => setCart({});

  const cartItems: CartItem[] = useMemo(() => {
    return Object.entries(cart).map(([id, qty]) => {
      const product = PRODUCTS.find((p) => p.id === id)!;
      return { product, qty };
    });
  }, [cart]);

  const subtotal = useMemo(
    () => cartItems.reduce((s, it) => s + it.product.price * it.qty, 0),
    [cartItems]
  );
  const totalDiscount = useMemo(
    () =>
      cartItems.reduce(
        (s, it) => s + (it.qty > 5 ? it.product.price * it.qty * 0.1 : 0),
        0
      ),
    [cartItems]
  );
  const total = subtotal - totalDiscount;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        setQuantity,
        clearCart,
        cartItems,
        subtotal,
        totalDiscount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Dummy products for demo
export const PRODUCTS: Product[] = [
  {
    id: "p1",
    title: "Aurora Headphones",
    description: "Wireless over-ear headphones with ANC and 30h battery.",
    price: 129.99,
    image: "/images/aurora_headphones.jpeg",
  },
  {
    id: "p2",
    title: "Comet Mechanical Keyboard",
    description: "Compact 75% keyboard with hot-swappable switches.",
    price: 99.5,
    image: "/images/comet_keyboard.webp",
  },
  {
    id: "p3",
    title: "Nebula Smart Lamp",
    description: "Voice controlled smart lamp with warm/cool gradients.",
    price: 45.0,
    image: "/images/nebula_lamp.jpeg",
  },
  {
    id: "p4",
    title: "Lunar Gaming Mouse",
    description: "RGB wired gaming mouse with adjustable DPI.",
    price: 59.99,
    image: "/images/mouse.jpg",
  },
  {
    id: "p5",
    title: 'Orion Monitor 27"',
    description: "QHD 144Hz IPS gaming monitor with HDR support.",
    price: 299.99,
    image: "/images/monitor.jpeg",
  },
  {
    id: "p6",
    title: "Solar Backpack",
    description: "Waterproof backpack with built-in solar charger.",
    price: 79.0,
    image: "/images/backpack.jpeg",
  },
  {
    id: "p7",
    title: "Comet Desk Lamp",
    description: "LED desk lamp with color temperature control.",
    price: 35.0,
    image: "/images/desk-lamp.jpeg",
  },
  {
    id: "p8",
    title: "Stellar Smartwatch",
    description: "Fitness smartwatch with heart rate monitor and GPS.",
    price: 149.99,
    image: "/images/smartwatch.jpeg",
  },
  {
    id: "p9",
    title: "Meteor Bluetooth Speaker",
    description: "Portable waterproof speaker with 12h battery.",
    price: 69.99,
    image: "/images/speaker.jpeg",
  },
  {
    id: "p11",
    title: "Galaxy Wireless Charger",
    description: "Fast wireless charger compatible with Qi devices.",
    price: 29.99,
    image: "/images/charger.jpeg",
  },
];
