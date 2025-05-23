// Navbar.js
import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { CartContext } from '../../context/CartContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../context/AuthContext';

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  const cart_true = cart.length ? "dot-div" : null;

  const handleSignOut = () => {
    // toast.success('Logout successful.', {
    //   autoClose: 2000
    // });
    logout();
    navigate('/');
  };

  return (
    <>
      <div className='navbar'>
        <div className='nav-logo' onClick={() => !isAuthenticated && navigate('/')}>Foodie</div>
        <div>
          <nav className='nav-menu'>
            <div className='nav-item'>
              {isAuthenticated ? (
                <>
                  {/* Elements to show when user is authenticated */}
                  {user.role === 'customer' && (
                    <>
                      <NavLink className='nav-link inline-div' to='/search' end>Search</NavLink>
                      <NavLink className='nav-link inline-div' to='/cart' end><div className={cart_true}></div>Cart</NavLink>
                      <NavLink className='nav-link inline-div' to='/order' end>Order</NavLink>
                    </>
                  )}
                  <div className='nav-link inline-div' onClick={handleSignOut}>
                    <button>Sign out</button>
                  </div>
                </>
              ) : (
                <>
                  {/* Elements to show when user is not authenticated */}
                  <div
                    className={`nav-link inline-div ${isDropdownOpen ? 'active' : ''}`}
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    Partner with us
                  </div>
                  {isDropdownOpen && (
                    <div
                      className='dropdown'
                      onMouseEnter={() => setIsDropdownOpen(true)}
                      onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                      <NavLink className='dropdown-link' to='/partner-with-us/restaurant-owner'>As Restaurant Owner</NavLink>
                      <NavLink className='dropdown-link' to='/partner-with-us/delivery-partner'>As Delivery Partner</NavLink>
                    </div>
                  )}
                  <NavLink className='nav-link inline-div' to='/login' end>Log in</NavLink>
                  <NavLink className='nav-link inline-div' to='/signup' end>Sign up</NavLink>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
