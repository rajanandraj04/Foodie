import React, { useState ,useContext} from 'react'
import Restaurant from '../Restaurant/Restaurant'
import RestaurantForm from '../RestaurantForm/RestaurantForm';
import './RestaurantDashboard.css'
import Search from '../Search/Search';
import { AuthContext } from '../../context/AuthContext';

export default function RestaurantDashboard() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const {user} = useContext(AuthContext);
  const restaurantOwnerId = user.userId;

  const [restaurantAdded, setRestaurantAdded] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setRestaurantAdded(prevState => !prevState);
  };

  const getRestroID = `http://localhost:5049/api/Restaurant/GetRestaurantsbyUserId/${restaurantOwnerId}`

  return (
    <div className='Restaurant-Owner-Dashboard'>
      {isModalOpen && <div className="modal-backdrop" />}
      <button className='restaurantDashboard-btn' onClick={handleOpenModal}>Add Restaurant</button>
      {isModalOpen && (
        <div className="modal">
          <RestaurantForm closeModal={handleCloseModal} />
        </div>
      )}
      <Restaurant url={getRestroID} restaurantOwnerId={restaurantOwnerId} restaurantAdded={restaurantAdded} setRestaurantAdded={setRestaurantAdded} />
      {/* <Search url={getRestroID} restaurantOwnerId={restaurantOwnerId}/> */}
    </div>
  )
}
