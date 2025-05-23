import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './Order.css';
import { AuthContext } from '../../context/AuthContext';

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5049/api/Order/GetOrderbyUserid/${user.userId}`);
        console.log(response.data);
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (orders.length === 0) {
    return <div>No orders found.</div>;
  }
  return (
    <div className='order-container'>
      {orders.map((orderArray, index) => (
        orderArray.map((order, i) => (
          <div className='order-detail'>
            <div className='order-container-item' key={i}>
              <h2 className='order-h2'>Order ID: {order.orderId}</h2>
              <div className='order-inline'>
              <p className='order-p order-p-highlight'>Date: {new Date(order.orderDate).toLocaleString()}</p>
              <p className='order-p order-p-highlight'>Total Amount: {order.totalAmount}</p>
              <p className='order-p order-p-highlight'>Status: {order.status}</p>
              </div>
              <h3 className='order-h3'>Items:</h3>
              {order.items && order.items.map((item, j) => (
                <div className='order-container-sub-item' key={j}>
                  <img className='order-item-image' src={item.imageUrl} alt={item.dishName} style={{ width: '100px', height: '100px' }} />
                  <p className='order-p'>Dish Name: {item.dishName}</p>
                  <p className='order-p'>Price: {item.price}</p>
                  <p className='order-p'>Quantity: {item.quantity}</p>
                  <p className='order-p'>Dish Total: {item.dishTotal}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      ))}
    </div>
  );
};
