
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  // let user = JSON.parse(sessionStorage.getItem('user'));
  // console.log(user);

  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
   
    const existingItem = cart.find((cartItem) => cartItem.menuItemId === item.menuItemId);
    if (existingItem) {
    
      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem.menuItemId === item.menuItemId ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
      );
    } else {
    
      setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.menuItemId !== itemId));
  };

  const incrementQuantity = (itemId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.menuItemId === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // const decrementQuantity = (itemId) => {
  //   // if(cart.itemId.quantity===1)
  //   //     removeFromCart(itemId);
  
  //   console.log(cart);
  //   setCart((prevCart) =>
  //     prevCart.map((item) =>
  //       item.menuItemId === itemId ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
  //     )
  //   );
  // };
  const decrementQuantity = (itemId) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.menuItemId === itemId) {
          const newQuantity = item.quantity - 1;
          if (newQuantity < 1) {
          
            return null;
          } else {
       
            return { ...item, quantity: newQuantity };
          }
        }
        return item;
      }).filter(item => item !== null) 
    );
  };
  

  return (
    <CartContext.Provider value={{  setCart, cart, addToCart, removeFromCart, incrementQuantity, decrementQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
