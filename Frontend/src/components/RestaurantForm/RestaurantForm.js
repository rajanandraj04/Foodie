import React, { useState,useContext } from 'react';
import './RestaurantForm.css'
import { AuthContext } from '../../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// const restaurantOwnerId = sessionStorage.getItem('id');


function RestaurantForm({ closeModal }) {

  const {user} = useContext(AuthContext);

  const restaurantOwnerId = user.userId;
 
  const [formData, setFormData] = useState({
    // RestaurantId: 0,
    Name: '',
    Address: '',
    PhoneNumber: '',
    Email: user.email,
    OwnerId: restaurantOwnerId,
    Rating: 4.5,
    ImageUrl: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/t6av3q7weumzdozcmowp"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5049/api/Restaurant/AddRestaurant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log(response);
      if (response.ok) {
        const result = await response.json();
        console.log('Form submitted successfully:', result);
      //   toast.success('Restaurant added successfully.', {
      //     autoClose: 2000
      // });
        
   
      } else {
        console.error('Form submission failed:', response);
      }
    } catch (error) {
      console.error('There was an error submitting the form:', error);
    }

    closeModal();
   
  };

  return (
  


<div className="modal-content">

<form onSubmit={handleSubmit}>
  {/* ... form inputs ... */}
  {/* <input
        type="number"
        name="RestaurantId"
        value={formData.name}
        onChange={handleChange}
        placeholder="RestaurantId"
      /> */}
  <input
        type="text"
        name="Name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="text"
        name="Address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Address"
      />
      <input
        type="text"
        name="PhoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        placeholder="Phone Number"
      />
      {/* <input
        type="email"
        name="Email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      /> */}
      {/* <input
        type="number"
        name="OwnerId"
        value={formData.ownerId}
        onChange={handleChange}
        placeholder="Owner ID"
      /> */}
  <button type="submit">Submit</button>
</form>
</div>

  );
}

export default RestaurantForm;
