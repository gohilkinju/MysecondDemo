// src/context/orderContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { ToastAndroid } from "react-native";

type Order = {
  orderId: number;
  customerName: string;
  itemName: string;
  quantity: number;
  price: number;
  totalPrice: number;
  category: string;
  orderStatus: string;
  description: string;
  image: string;
};
type Item = {
  orderId: number;
  itemName: string;
  quantity: number;
  price: number;
  totalPrice: number;
  category: string;
  orderStatus: string;
  description: string;
  image: string;
};

type OrderContextType = {
  orders: Order[];
  items: Item[];
  fetchItems: () => Promise<void>;
  fetchOrders: () => Promise<void>;
  updateOrderStatus: (orderId: number) => Promise<void>;
};

const OrderContext = createContext<OrderContextType>({
  orders: [],
  items: [],
  fetchItems: async () => { },
  fetchOrders: async () => { },
  updateOrderStatus: async () => { },
});

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const API_URL = "http://10.0.2.2:3000/orders";
  const API_URL_ITEM = "http://10.0.2.2:4000/items";

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:3000/orders`);
      console.log("response orders",response.data);
      setOrders(response.data);
    } catch (error) {
      console.error("❌ Error fetching orders:", error);
      ToastAndroid.show("Failed to fetch orders", ToastAndroid.SHORT);
    }
  };

  const fetchItems = async () => {
    try {
      const response = await axios.get(API_URL_ITEM);
      console.log("response items",response.data);
      setItems(response.data);
    } catch (error) {
      console.error("❌ Error fetching orders:", error);
      ToastAndroid.show("Failed to fetch orders", ToastAndroid.SHORT);
    }
  };
  const updateOrderStatus = async (orderId: number) => {
    try {
      const order = orders.find((o) => o.orderId === orderId);

      if (!order) {
        console.log("Order not found");
        return;
      }

      let newStatus = "Pending";
      if (order.orderStatus === "Pending") newStatus = "Preparing";
      else if (order.orderStatus === "Preparing") newStatus = "Delivered";

      const response = await axios.patch(
        `${API_URL}/${order?.id}`, // ✅ Use internal id
        { orderStatus: newStatus }
      );

      const updatedOrders = orders.map((o) =>
        o.orderId === orderId ? { ...o, orderStatus: newStatus } : o
      );
      setOrders(updatedOrders);
      console.log("✅ Order status updated successfully");
    } catch (error) {
      console.error("❌ Error updating status:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <OrderContext.Provider value={{ orders, items,fetchOrders, updateOrderStatus,fetchItems }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => useContext(OrderContext);
