import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Search from './components/Search/Search';
import Login from './components/Login/Login';
import Signup from './components/Signup/ClientSignup';
import Home from './components/Home/Home';
import RestaurantDashboard from './components/RestaurantDashboard/RestaurantDashboard';
import DeliveryDashboard from './components/DeliveryDashboard/DeliveryDashboard';
import Menu from './components/Menu/Menu';
import RestaurantOwnerMenu from './components/RestaurantOwnerMenu/RestaurantOwnerMenu';
import Cart from './components/Cart/Cart';
import { CartProvider } from './context/CartContext';
import Footer from './components/Footer/Footer';
import { AuthProvider } from './context/AuthContext';
import RoleBasedWrapper from './wrapper/RoleBasedWrapper';
import Order from './components/Order/Order';
import RestaurantOrder from './components/RestaurantOrder/RestaurantOrder';

// export default function App() {
//   return (
//     <>

//       <AuthProvider>
//         <CartProvider>
//           <Navbar />
//           <Routes>
//             <Route path='/' element={<Home />}></Route>
//             <Route path='/partner-with-us'>
//               <Route path='/partner-with-us/restaurant-dashboard' element={<RoleBasedWrapper roles={'owner'}> <RestaurantDashboard /></RoleBasedWrapper>}></Route>
//               <Route path='/partner-with-us/delivery-dashboard' element={<RoleBasedWrapper roles={'delivery'}> <DeliveryDashboard /></RoleBasedWrapper>}></Route>
//               <Route path='/partner-with-us/restaurant-owner' element={<Signup />}></Route>
//               <Route path='/partner-with-us/delivery-partner' element={<Signup />}></Route>
//             </Route>
//             <Route path='/restaurant-dashboard/menu/:restaurantId' element={<RestaurantOwnerMenu />} ></Route>
//             <Route path='/search' element={<RoleBasedWrapper roles={'customer'}> <Search /></RoleBasedWrapper>}></Route>
//             <Route path='/cart' element={<RoleBasedWrapper roles={'customer'}> <Cart /></RoleBasedWrapper>}></Route>
//             {/* <Route path='/users/form/:id?' element={<UserForm/>}></Route> */}
//             <Route path='/menu/:restaurantId' element={<RoleBasedWrapper roles={'customer'}> <Menu /></RoleBasedWrapper>}></Route>
//             <Route path='/login' element={<Login />}></Route>
//             <Route path='/signup' element={<Signup />}></Route>
//           </Routes>
//           <Footer />
//         </CartProvider>
//       </AuthProvider>
//     </>

//   );
// }

export default function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/search' element={<RoleBasedWrapper roles={'customer'}> <Search /></RoleBasedWrapper>} />
            <Route path='/order' element={<RoleBasedWrapper roles={'customer'}> <Order /></RoleBasedWrapper>} />
            <Route path='/cart' element={<RoleBasedWrapper roles={'customer'}> <Cart /></RoleBasedWrapper>} />
            <Route path='/menu/:restaurantId' element={<RoleBasedWrapper roles={'customer'}> <Menu /></RoleBasedWrapper>} />
            <Route path='/partner-with-us'>
              <Route path='/partner-with-us/restaurant-owner' element={<Signup />} />
              <Route path='/partner-with-us/delivery-partner' element={<Signup />} />
              <Route path='/partner-with-us/restaurant-dashboard' element={<RoleBasedWrapper roles={'owner'}> <RestaurantDashboard /></RoleBasedWrapper>} />
              <Route path='/partner-with-us/restaurant-orders' element={<RoleBasedWrapper roles={'owner'}> <RestaurantOrder /></RoleBasedWrapper>} />
              <Route path='/partner-with-us/delivery-dashboard' element={<RoleBasedWrapper roles={'delivery'}> <DeliveryDashboard /></RoleBasedWrapper>} />
             
            </Route>
            {/* <Route path='/restaurant-dashboard/menu/:restaurantId' element={<RestaurantOwnerMenu />} /> */}
            <Route path='/restaurant-dashboard/menu/:restaurantId' element={<RoleBasedWrapper roles={'owner'}> <RestaurantOwnerMenu /></RoleBasedWrapper>} />
            <Route path='/partner-with-us/delivery-dashboard/order' element={<RoleBasedWrapper roles={'delivery'}> <RestaurantOrder /></RoleBasedWrapper>} />
          </Routes>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </>
  );
}


