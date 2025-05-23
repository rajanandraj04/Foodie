
import React, { useState } from 'react';
import './Search.css';
import Restaurant from '../Restaurant/Restaurant';

export default function Search({url,restaurantOwnerId}) {
  const [searchTerm, setSearchTerm] = useState('');
  const getRestro = 'http://localhost:5049/api/Restaurant/Getall'

  return (
    <>
      <div className='search-page'>
        <form className="search-container">
          <input type="text" id="search-bar" placeholder="Search for restaurant and food" onChange={event => setSearchTerm(event.target.value)} />
          <a href="#">
            <img className="search-icon" src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png" alt="Search" />
          </a>
        </form>
      </div>
      <div className='search-restaurant'>
        <Restaurant url={getRestro} searchTerm={searchTerm} />
      </div>
    </>
  );
}
