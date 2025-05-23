import React, { useState } from 'react'
import Menu from '../Menu/Menu';
import MenuForm from '../MenuForm/MenuForm';
import './RestaurantOwnerMenu.css'

export default function RestaurantOwnerMenu() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuAdded, setMenuAdded] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setMenuAdded(prevState => !prevState);
  };

  return (
    <div className='Restaurant-Owner-Menu'>
      {isModalOpen && <div className="modal-backdrop" />}
      <div className='Add-menu-btn-div'>
      <button className='Add-Menu-btn' onClick={handleOpenModal}>Add Menu Item</button>
      </div>
      {isModalOpen && (
        <div className="modal">
          <MenuForm closeModal={handleCloseModal}  />
        </div>
      )}
      <Menu menuAdded= {menuAdded} setMenuAdded={setMenuAdded}/>
    </div>
  )
}
