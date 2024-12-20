// VendorOrderHistory.js
import React, { useEffect, useState } from 'react';
import { API_URL } from '../data/apiPath';

const VendorOrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const firmId = localStorage.getItem('firmId')
        const response = await fetch(`${API_URL}/order/${firmId}`);
        const data=response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching order history', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="order-history-container">
     
    <div className="order-list">
      {orders.map((order) => (
        <div className="order-card" key={order.orderId}>
          <h4 className="order-id">Order ID: {order.orderId}</h4>
          <p className="order-total">Total: ₹{order.total}</p>
          <p className="order-date">Date: {new Date(order.orderDate).toLocaleString()}</p>
          <div className="order-items">
            <ul>
              {order.items.map((item, index) => (
                <li className="order-item" key={index}>
                  <p className="product-name">Product: {item.productName}</p>
                  <p className="product-quantity">Quantity: {item.quantity}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default VendorOrderHistory;
