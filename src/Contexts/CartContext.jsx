import React, { createContext, useState, useEffect, useContext } from "react";

// Sepet Context'i oluştur
const CartContext = createContext();

// Local Storage'dan sepet verilerini alma
const getLocalStorageCart = () => {
   const cart = localStorage.getItem("cart");
   return cart ? JSON.parse(cart) : [];
};

// Sepet Provider bileşeni
export const CartProvider = ({ children }) => {
   const [cartItems, setCartItems] = useState(getLocalStorageCart);

   // Local Storage'a sepet verilerini kaydetme
   useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cartItems));
   }, [cartItems]);

   const addToCart = (product) => {
      console.log("Ürün sepete ekleniyor:", product);
      setCartItems((prevItems) => {
         const existingItem = prevItems.find((item) => item.id === product.id);
         if (existingItem) {
            return prevItems.map((item) =>
               item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
            );
         } else {
            return [...prevItems, { ...product, quantity: 1 }];
         }
      });
   };

   const removeFromCart = (productId) => {
      setCartItems((prevItems) =>
         prevItems.filter((item) => item.id !== productId)
      );
   };

   const clearCart = () => {
      setCartItems([]);
   };

   const handleQuantityChange = (itemId, newQuantity) => {
      setCartItems((prevItems) =>
         prevItems.map((item) =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
         )
      );
   };

   return (
      <CartContext.Provider
         value={{
            cartItems,
            addToCart,
            removeFromCart,
            clearCart,
            handleQuantityChange,
         }}
      >
         {children}
      </CartContext.Provider>
   );
};

// Sepet Context'i kullanma kancası
export const useCart = () => useContext(CartContext);
