import React from 'react';
import Country from './Country';
import './Countries.css';

const Countries = ({ countries, setFilter }) => {
  // SHOW COUNTRIES BASED ON HOW MANY MATCH THE FILTER

  // None  or All of them - we are at the beginning state
  if (countries.length === 0 || countries.length > 240) {
    return null;
  }

  // More than 10 countries - too many matches
  else if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  // 1-10 countries - only country names are shown
  else if (countries.length > 1) {
    return (
      <div className="countries-list">
        <ul>
          {countries.map((country) => (
            <li key={country.name}>
              {country.name}
              <button
                className="search-btn"
                onClick={() => setFilter(country.name)}
              >
                &#127757;
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  // Exactly 1 match - basic data of the country is shown
  else {
    return <Country country={countries[0]} />;
  }
};

export default Countries;
