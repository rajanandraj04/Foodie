// Cart.js
import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import './Cart.css';
import { AuthContext } from '../../context/AuthContext';

export default function Cart() {
  const { cart,setCart, removeFromCart, incrementQuantity, decrementQuantity } = useContext(CartContext);
  const grandTotal = Math.round(cart.reduce((total, item) => total + item.price * item.quantity, 0));
  const {user} = useContext(AuthContext);

console.log(cart);
  // -------------------------------------------------------------------------

  async function createOrder(userId, restaurantId, totalAmount, cart) {

    const items = cart.map(item => ({
      menuItemId: item.menuItemId,
      quantity: item.quantity,
      price: item.price
    }));
   
    // Log the items array
    console.log(items);
   
    const response = await fetch(`http://localhost:5049/api/Order/CreateOrder?userId=${userId}&restaurantId=${restaurantId}&TotalAmount=${totalAmount}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(items)
    });
   
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response}`);
    }
    console.log("ordered");
   
    return await response.json();
  }





  // ---------------------------------------------------------------------------


  const handleSubmit = (e) => {
    e.preventDefault();
    const shipping_address = {

      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };
    var options = {
      key: "rzp_test_vv1FCZvuDRF6lQ",
      key_secret: "P4JAUwn4VdE6xDLJ6p2Zy8RQ",
      amount: Math.round(grandTotal * 100),
      currency: "INR",
      name: "Foddie",
      description: "for testing purpose",
      handler: function (response) {
        // console.log(response);
        const paymentId = response.razorpay_payment_id;
        console.log("paymant id", paymentId, shipping_address);
        createOrder(user.userId,cart[0].restaurantId,grandTotal,cart);
        setCart([]);

      },
      theme: {
        color: "#07a291db",
      },
    };
    var pay = new window.Razorpay(options);
    pay.open();
  };



  return (
    <>
      
      <div className="cart-container">
        <div className="cart-heading">
          <h1 className="cart-heading-title">Cart</h1>
        </div>

        <div className="cart-header">
          <div className="card-item-values">
            <h2 className="cart-item-heading">Name</h2>
          </div>
          <div className="card-item-values">
            <h2 className="cart-item-heading">Price</h2>
          </div>
          <div className="card-item-values">
            <h2 className="cart-item-heading">Quantity</h2>
          </div>
          <div className="card-item-values">
            <h2 className="cart-item-heading">Total</h2>
          </div>
        </div>

        {cart && cart.map((item) => (
          <div key={item.menuItemId} className="cart-items">
            <div className='cart-sub-column'>
              <div className="cart-item-image">
                <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/t6av3q7weumzdozcmowp" alt={item.dishName} />
              </div>
              <div className="card-item-values">
                <h2 className="cart-item-heading">{item.dishName}</h2>
                {/* <p className="cart-paragraph">Rating: {item.rating}</p> */}
              </div>
              </div>
            
            <div className="card-item-values">
              <p className="cart-paragraph">₹ {item.price}</p>
            </div>

            <div className="card-item-values">
              <div className="cart-item-button-section">
                <button  onClick={() => incrementQuantity(item.menuItemId)} className="cart-item-button">+</button>
              <h2 className="cart-item-heading">{item.quantity}</h2>
                <button onClick={() => decrementQuantity(item.menuItemId)} className="cart-item-button">-</button>
                {/* <button onClick={() => removeFromCart(item.menuItemId)} className="cart-item-button">Remove</button> */}
              </div>  
            </div>
            
         
              <div className="card-item-values">
                <p className="cart-paragraph">₹ {item.price * item.quantity}</p>
              </div>
              {/* <button onClick={() => incrementQuantity(item.menuItemId)}>+</button>
              <button onClick={() => decrementQuantity(item.menuItemId)}>-</button>
              <button onClick={() => removeFromCart(item.menuItemId)}>Remove</button> */}

                
          
          </div>
          
        ))}

        <div className="cart-total">
          <div className="card-item-footer">
            <h2 className="cart-item-heading">Grand Total</h2>
          </div>
          <div className="card-item-footer">
            <h2 className="cart-item-heading">₹ {grandTotal}</h2>
          </div>
        </div>
          <div className="cart-checkout">
          <button className="cart-checkout-button" onClick={handleSubmit}>Checkout</button>
        </div>
      </div>
    </>
  );
}
