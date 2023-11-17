import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Load product array from local storage
  const storedProduct = localStorage.getItem('product');
  const products = storedProduct ? JSON.parse(storedProduct) : [];

  // Calculate the total count of all products
  const totalCount = products.reduce((total, item) => total + (typeof item.count === 'number' ? item.count : 0), 0);

  const [cartItems, setCartItems] = useState(products);
  const [cartCount, setCartCount] = useState(totalCount);


  const addToCart = () => {
    setCartCount((prevCount) => prevCount + 1);
  };
  
  const removeFromCart = () => {
    setCartCount((prevCount) => prevCount - 1);
  };

  // const removeFromCart = (productId) => {
  //   const updatedCartItems = cartItems.filter(item => item.productId !== productId);
  //   setCartItems(updatedCartItems);
  //   setCartCount((prevCount) => prevCount - 1);
  // };

  const clearCart = () => {
    setCartItems([]);
    setCartCount(0);
  };

  useEffect(() => {
    localStorage.setItem('productId', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartCount, cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
