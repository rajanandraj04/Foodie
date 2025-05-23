import React, { useState , useContext} from 'react';
import { AuthContext } from '../../context/AuthContext';


function MenuForm({ closeModal }) {

const {user} = useContext(AuthContext);

  const restaurantOwnerId= user.userId;

  const [formData, setFormData] = useState({
    // MenuItemID: 0,
    DishName: '',
    Description: '',
    ImageUrl:'',
    // Rating:4.5,
    Price: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  console.log(restaurantOwnerId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`http://localhost:5049/api/MenuItems/${restaurantOwnerId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Form submitted successfully:', result);
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
        name="MenuItemID"
        value={formData.MenuItemID}
        onChange={handleChange}
        placeholder="Menu Item ID"
      /> */}
  <input
        type="text"
        name="DishName"
        value={formData.DishName}
        onChange={handleChange}
        placeholder="Dish Name"
      />
      <input
        type="text"
        name="Description"
        value={formData.Description}
        onChange={handleChange}
        placeholder="Dish Description"
      />
      <input
        type="text"
        name="ImageUrl"
        value={formData.ImageUrl}
        onChange={handleChange}
        placeholder="Dish ImageUrl"
      />
      <input
        type="number"
        name="Price"
        value={formData.Price}
        onChange={handleChange}
        placeholder="Price"
      />
  <button type="submit">Submit</button>
</form>
</div>

  );
}

export default MenuForm;
