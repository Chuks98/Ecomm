import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(() => {
    var storedProductId = localStorage.getItem('productId');
    var storedData = storedProductId ? JSON.parse(storedProductId) : [];
    return storedData.length;
  });

  const addToCart = () => {
    setCartCount((prevCount) => prevCount + 1);
  };
  const [cartItems, setCartItems] = useState([]);


  

  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter(item => item.productId !== productId);
    setCartItems(updatedCartItems);
    setCartCount(cartCount - 1);
  };

  const clearCart = () => {
    setCartItems([]);
    setCartCount(0);
  };

  return (
    <CartContext.Provider value={{ cartCount, cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
