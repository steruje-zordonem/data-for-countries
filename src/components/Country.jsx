import React from 'react';
import './Country.css';
import Weather from './Weather';

const Country = ({ country }) => {
  return (
    <div className="countries-list">
      <h2>{country.name}</h2>
      <p>{country.capital}</p>
      <p>population {country.population}</p>
      <h3>Spoken languages</h3>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img className="flag" alt="country flag" src={country.flag} />
      <Weather country={country} />
    </div>
  );
};

export default Country;
