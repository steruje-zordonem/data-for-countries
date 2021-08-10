import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import Countries from './components/Countries';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [showAll, setShowAll] = useState(true);

  const countriesToShow = showAll
    ? countries
    : countries.filter((country) =>
        country.name.toLowerCase().includes(filter.toLowerCase())
      );

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((countries2) => setCountries(countries2.data))
      .catch((error) => {
        console.log(`error while fetching countries data: `, error.message);
      });
  }, []);

  const handleInputChange = (e) => {
    setShowAll(false);
    setFilter(e.target.value);
  };

  return (
    <div className="container">
      <div className="application">
        <div className="form">
          <p>Find countries:</p>
          <input onChange={(e) => handleInputChange(e)} />
        </div>
        <Countries
          countries={countriesToShow}
          filter={filter}
          setFilter={setFilter}
        />
      </div>
    </div>
  );
};

export default App;
