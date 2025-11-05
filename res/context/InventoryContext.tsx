// context/InventoryContext.js
import React, { createContext, useState, useContext } from 'react';

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Burger', quantity: 10 },
    { id: 2, name: 'Pizza', quantity: 5 },
    { id: 3, name: 'Pasta', quantity: 7 },
    { id: 4, name: 'Sandwich', quantity: 8 },
    { id: 5, name: 'Fries', quantity: 12 },
  ]);

  const increment = (id) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrement = (id) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <InventoryContext.Provider value={{ inventory, increment, decrement }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => useContext(InventoryContext);
