// import React, { useState, useEffect, useContext } from 'react';
// import { useParams } from 'react-router-dom';
// import './Menu.css';
// import { CartContext } from '../../context/CartContext';

// export default function Menu() {
//  const {addToCart}= useContext(CartContext);

//   const [menuItems, setMenuItems] = useState([]);
//   const [restaurantName, setRestaurantName] = useState('');
//   const { restaurantId } = useParams();

  
//   useEffect(() => {
//     const fetchMenuItems = async () => {
//       try {
//         const response = await fetch(`http://localhost:5049/api/MenuItems/Restaurant/${restaurantId}`);
//         const data = await response.json();
//         console.log(data);
//         setMenuItems(data);
//       } catch (error) {
//         console.error('Error fetching menu:', error);
//       }
//     };

//     const fetchRestaurantName = async () => {
//       try {
//         const response = await fetch(`http://localhost:5049/api/Restaurant/GetRestaurantsbyResId/${restaurantId}`);
//         const data = await response.json();
//         console.log(data);
//         setRestaurantName(data.name);
//       } catch (error) {
//         console.error('Error fetching restaurant:', error);
//       }
//     };

//     fetchMenuItems();
//     fetchRestaurantName();
//   }, [restaurantId]);

//   return (
//     <div className='menu-container'>
//       <h1>{restaurantName}'s Menu<hr></hr></h1>
//       <div className="menu-list">
//         {menuItems.map(item => (
//           <div key={item.id} className="menu-item">
//             <div className="menu-item-image">
//               <img src={item.imageUrl} alt={item.dishName} />
//             </div>
//             <div className="menu-item-info">
//               <h2>{item.dishName}</h2>
//               <p>{item.description}</p>
//               <p>Price: ₹ {item.price}</p>
//             </div>
//             <div className="menu-item-actions">
//               <p>Rating: {item.rating}</p>
//               <button onClick={()=> addToCart(item)}>Add to Cart</button>
//               {/* <button>Delete</button> */}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


///////////////////////////////////////////////////////////////////
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Menu.css';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';

export default function Menu({menuAdded , setMenuAdded}) {
 const {addToCart}= useContext(CartContext);
 const {user} = useContext(AuthContext);

 
//  const navigate = useNavigate();

  const [menuItems, setMenuItems] = useState([]);
  const [restaurantName, setRestaurantName] = useState('');
  const { restaurantId } = useParams();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(`http://localhost:5049/api/MenuItems/Restaurant/${restaurantId}`);
        const data = await response.json();
        console.log(data);
        setMenuItems(data);
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };

    const fetchRestaurantName = async () => {
      try {
        const response = await fetch(`http://localhost:5049/api/Restaurant/GetRestaurantsbyResId/${restaurantId}`);
        const data = await response.json();
        console.log(data);
        setRestaurantName(data.name);
      } catch (error) {
        console.error('Error fetching restaurant:', error);
      }
    };

    fetchMenuItems();
    fetchRestaurantName();
  }, [restaurantId, menuAdded]);

  const handleAddToCart = (item) => {
    // console.log('yo');
    // const sessionId = sessionStorage.getItem('id');
    // if (sessionId>0) {
      addToCart(item);
    // } else {
      // window.alert('Sign in to Add to cart.');
      // navigate('/login');
    // }
  };



  async function handleDelete(item){
    const response = await fetch(`http://localhost:5049/api/MenuItems/DeleteMenuItem?MenuItemId=${item.menuItemId}`, {
        method: 'DELETE', 
    });

    if (!response.ok) { 
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
    }

    console.log("deleted");
    setMenuAdded(prevState => !prevState);

    return response;
}

  return (
    <div className='menu-container'>
      <h1>{restaurantName}'s Menu<hr></hr></h1>
      <div className="menu-list">
        {menuItems.map(item => (
          <div key={item.id} className="menu-item">
            <div className="menu-item-image">
              <img src={item.imageUrl} alt={item.dishName} />
            </div>
            <div className="menu-item-info">
              <h2>{item.dishName}</h2>
              <p>{item.description}</p>
              <p>Price: ₹ {item.price}</p>
            </div>
            <div className="menu-item-actions">
              <p>Rating: {item.rating}</p>

              {user.role==='customer' ?

                <button onClick={()=> handleAddToCart(item)}>Add to Cart</button> : 
                <button onClick={()=> handleDelete(item )}>Delete</button>
                // <button onClick={()=>getOrders(item)}>Show Orders</button>
              }
              {/* <button>Delete</button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
