import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Restaurant.css';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

export default function Restaurant({ url, restaurantAdded, setRestaurantAdded, searchTerm = '' }) {
    const [restaurants, setRestaurants] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);

    const [userCity, setUserCity] = useState('');

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`);
                const data = await response.json();
                setUserCity(data.city || '');
            });
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                console.log(data);
                setRestaurants(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching restaurants:', error);
                setLoading(false);
            }
        };

        console.log(userCity);

        fetchData();
    }, [restaurantAdded]);

    const handleViewMenu = (restaurantId) => {
        if (location.pathname.includes('restaurant-dashboard')) {
            navigate(`/restaurant-dashboard/menu/${restaurantId}`);
        } else if (location.pathname.includes('delivery-partner')) {
            navigate(`/`);
        } else {
            navigate(`/menu/${restaurantId}`);
        }
    };

   async function getOrders(restaurantId) {
        try {
            const response = await axios.get(`http://localhost:5049/api/Order/GetAllOrdersByRestaurant?id=${restaurantId}`);
            console.log(response.data);
            navigate('/partner-with-us/restaurant-orders', { state: { orders: response.data } });
        } catch (error) {
            console.error(`Error fetching orders: ${error}`);
        }
    } 

    // const [orders, setOrders] = useState([]);


    async function getOrdersDelivery(restaurantId) {
        try {
            const response = await axios.get(`http://localhost:5049/api/Order/GetAllOrdersByRestaurant?id=${restaurantId}`);
            console.log(response.data);
            navigate('/partner-with-us/delivery-dashboard/order', { state: { orders: response.data } });
        } catch (error) {
            console.error(`Error fetching orders: ${error}`);
        }
    }


    async function handleDelete(restaurantId) {
        const response = await fetch(`http://localhost:5049/api/Restaurant/Delete Restaurant?id=${restaurantId}`, {
            method: 'DELETE',
        });



        if (!response.ok) {
            const message = `An error has occurred: ${response.status}`;
            throw new Error(message);
        }

        console.log("deleted");

        setRestaurantAdded(prevState => !prevState);

        return response;
    }

    return (
        <div className="restaurant-container">
            {loading ? (
                <p>Loading...</p>
            ) : restaurants && restaurants.length > 0 ? (
                restaurants.filter(restaurant => {
                    if (user.role === 'customer') {
                        return restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())  && restaurant.address && userCity && restaurant.address.toLowerCase().includes(userCity.toLowerCase())
                    } else {
                        return true;
                    }
                }).map(restaurant => (
                    <>
                        <div key={restaurant.id} className="restaurant-entry">
                            <div className='restaurant-inner-div'>
                                <div className="restaurant-image">
                                    <img src={restaurant.imageUrl} alt={restaurant.name} />
                                </div>
                                <div className="restaurant-info">
                                    <h1>{restaurant.name}</h1>
                                    <p>Description: {restaurant.description}</p>
                                    <p>Address: {restaurant.address}</p>
                                    <p>Contact: {restaurant.phoneNumber}, {restaurant.email}</p>
                                </div>
                            </div>
                            <div className='restaurant-btn'>
                                <p>Rating: {restaurant.rating}</p>
                                {/* <button onClick={() => handleViewMenu(restaurant.restaurantId)}>View Menu</button>
                                {user.role === 'owner' ?
                                    <><button onClick={() => getOrders(restaurant.restaurantId)}>Show Orders</button>
                                        <button onClick={() => handleDelete(restaurant.restaurantId)}>Delete</button></>
                                    : null
                                } */}

                                {user.role === 'owner' &&
                                    <>
                                        <button onClick={() => handleViewMenu(restaurant.restaurantId)}>View Menu</button>
                                        <button onClick={() => handleDelete(restaurant.restaurantId)}>Delete</button>
                                        <button onClick={() => getOrders(restaurant.restaurantId)}>Show Orders</button>
                                    </>
                                }
                                {user.role === 'customer' &&
                                    <button onClick={() => handleViewMenu(restaurant.restaurantId)}>View Menu</button>
                                }
                                {user.role === 'delivery' &&
                                    <button  onClick={() => getOrdersDelivery(restaurant.restaurantId)} >Orders</button>
                                }

                            </div>
                        </div>
                    </>
                ))
            ) : (
                <p>No restaurants found.</p>
            )}
        </div>
    );
}
