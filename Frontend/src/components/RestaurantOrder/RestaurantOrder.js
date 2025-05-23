import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import './RestaurantOrder.css'

export default function RestaurantOrder() {
    const location = useLocation();
    const { orders: initialOrders } = location.state;
    const [orders, setOrders] = useState(initialOrders);
    const { user } = useContext(AuthContext);

    const handlePickup = async (orderId) => {
        if (user.role === 'delivery') {
            const response = await axios.put(`http://localhost:5049/api/Order/StatusChange_InTransit?orderId=${orderId}`);
            console.log(response);
            setOrders(prevOrders => prevOrders.map(orderArray => orderArray.map(order => order.orderId === orderId ? { ...order, status: 'In-Transit' } : order)));
        }
    };

    const handleDelivered = async (orderId) => {
        if (user.role === 'delivery') {
            const response = await axios.put(`http://localhost:5049/api/Order/StatusChange_Delivered?orderId=${orderId}`);
            console.log(response);
            setOrders(prevOrders => prevOrders.map(orderArray => orderArray.map(order => order.orderId === orderId ? { ...order, status: 'Delivered' } : order)));
        }
    };

    return (
        <div className='order-container'>
            {orders.map((orders, index) => (
                orders.map((order, i) => (
                    <div className='order-detail'>
                        <div className='order-container-item' key={i}>
                            <div className='delivered-butn'>
                                <h2 className='order-h2'>Order ID: {order.orderId}</h2>
                                <div>
                                    {user.role === 'delivery' && order.status === 'Ordered' && <button onClick={() => handlePickup(order.orderId)}>Pick-up</button>}
                                    {user.role === 'delivery' && order.status === 'In-Transit' && <button onClick={() => handleDelivered(order.orderId)}>Delivered</button>}
                                </div>
                            </div>
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
