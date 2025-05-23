import React from 'react'
import Restaurant from '../Restaurant/Restaurant'
import './Home.css'
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const imageArray = [
    {
      Name: "Pizza",
      link: "https://media.istockphoto.com/id/1030238980/photo/fresh-tasty-pizza-with-pepperoni-isolated-on-white-background-top-view.webp?b=1&s=170667a&w=0&k=20&c=F4tvPRLU0JQ98zDEyFQg5MmWBNJBvZLLUNnZcLDSj-w=",
    },
    {
      Name: "Burger",
      link: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Burger_King_-_Angus_XT_Burger.tiff/lossless-page1-1200px-Burger_King_-_Angus_XT_Burger.tiff.png",
    },
    {
      Name: "Biryani",
      link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj3bcKb01ocgYbxUUh5lgZdr0dfZIaS6dUIw&s",
    },
    {
      Name: "Pasta",
      link: "https://i.pinimg.com/originals/3a/ec/95/3aec95affcb9713f298fe144be88bd99.jpg",
    },
    {
      Name: "Litti-Chokha",
      link: "https://www.shutterstock.com/image-photo/litti-chokha-complete-meal-originated-600nw-1953612127.jpg",
    },
  ];
 
  const resturantArray = [
    {
      Name: "Burger King",
      link: "https://media-assets.swiggy.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/RX_THUMBNAIL/IMAGES/VENDOR/2024/6/11/7f76a072-c1bc-4d74-ac56-33e0eea20c1e_8784.JPG",
    },
    {
      Name: "KFC",
      link: "https://thumbs.dreamstime.com/b/lots-kfc-chicken-hot-wings-strips-bucket-moscow-russia-july-kentucky-fried-fast-food-isolated-white-background-192188137.jpg",
    },
    {
      Name: "Dominos",
      link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbsbpbamcRIoUnKiIFkC7DqZqNqP-8uaPTpw&s",
    },
    {
      Name: "Briyani Blues",
      link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThPHsR69F7Crt5VTfkKoD-8vV9-qI1YADuVQ&s",
    },
    {
      Name: "India Resturants",
      link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlZbo_OGVmp11qOvqkHekqXMNWZBnBDtErMA&s",
    },
  ];

  return (
    <div className='home-div'>
      <div className="home-first-container">
        <div className="home-outer-text-section">
          <div className="home-inner-text-section">
            <div className="home-title">
              <h1>Welcome</h1>
            </div>
            <div className="home-sub-title">
              <h2>Food Delivery App</h2>
            </div>
            <p className="home-paragraph">
              Experience a variety of cuisines from the comfort of your home.
              Order your favorite dishes from local restaurants and have them
              delivered to your doorstep.
            </p>
            <button className="home-login-button"  onClick={() => navigate('/login')}>Log in</button>
          </div>
        </div>
        <div className="home-image-section">
          <img
            className="home-first-img"
            src="https://img.freepik.com/premium-photo/burger-white-isolated-background_565470-1066.jpg"
            alt="Food-wide-image"
          />
        </div>
      </div>

      <div className="home-second-title">
        <h2>OUR DISHES</h2>
      </div>

      <div className="home-outer-slider">
        <div className="home-inner-slider">
          {imageArray.map((item, i) => (
            <div className="home-food-card" key={i} onClick={() => navigate('/login')} >
              <img className="home-food-card-image" src={item.link} alt="Food" />
              <div className="home-food-card-text">
                <h4>{item.Name}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="home-second-title">
        <h2>OUR RESTAURANTS</h2>
      </div>

      <div className="home-outer-slider">
        <div className="home-inner-slider">
          {resturantArray.map((item, i) => (
            <div className="home-food-card" key={i} onClick={() => navigate('/login')} >
              <img className="home-food-card-image" src={item.link} alt="Food" />
              <div className="home-food-card-text">
                <h4>{item.Name}</h4>
              </div>
            </div>
          ))};
        </div>
      </div>
    </div>
  )
}
