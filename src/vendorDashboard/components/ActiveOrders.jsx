import React, { useState, useEffect } from 'react';
import { API_URL } from '../data/apiPath';

const ActiveOrders = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
 
    useEffect(() => {
        const fetchOrders = async () => {
          const {firmId}=localStorage.getItem('firmId')
            try {
                const response = await fetch(`${API_URL}/order/current/${firmId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
               
                setOrders(data);
            } catch (error) {
                console.error('Error fetching current orders', error);
                setError(error.message);
                setOrders([]);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div>
            {error && <p>Error: {error}</p>}
        
               { orders.map((order) => (
                    <div key={order._id}>
                        <h3>Order ID: {order._id}</h3>
                        <p>Total: {order.total}</p>
                    </div>
                ))
            
              }
        </div>
    );
};

export default ActiveOrders;
