import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Order {
  id: string;
  productName: string;
  amount: string;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  paymentMethod: string;
  paymentId?: string;
  createdAt: Date;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'createdAt'>) => string;
  updateOrderStatus: (id: string, status: Order['status'], paymentId?: string) => void;
  getOrder: (id: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = (orderData: Omit<Order, 'id' | 'createdAt'>) => {
    const id = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newOrder: Order = {
      ...orderData,
      id,
      createdAt: new Date(),
    };
    
    setOrders((prevOrders) => [...prevOrders, newOrder]);
    return id;
  };

  const updateOrderStatus = (id: string, status: Order['status'], paymentId?: string) => {
    setOrders((prevOrders) => 
      prevOrders.map((order) => 
        order.id === id ? { ...order, status, paymentId: paymentId || order.paymentId } : order
      )
    );
  };

  const getOrder = (id: string) => {
    return orders.find((order) => order.id === id);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus, getOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}; 