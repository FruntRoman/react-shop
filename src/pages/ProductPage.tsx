// src/pages/ProductPage.tsx
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Header } from "../components/Header";
import { MainSection } from "../components/MainSection";
import { CartPopup } from "../components/CartPopup";

export const ProductPage: React.FC = () => {
  const [isCartOpen, setCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Header setCartOpen={setCartOpen} isCartOpen={isCartOpen} />
      <MainSection />
      {isCartOpen && <CartPopup setCartOpen={setCartOpen} />}
    </div>
  );
};

export default ProductPage;
