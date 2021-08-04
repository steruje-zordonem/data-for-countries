import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Country.css';
require('dotenv').config();

const Country = ({ country }) => {
  const [weather, setWeather] = useState([]);

  // Fetch weather data and save it into state variable
  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHERSTACK_API_KEY}&query=${country.capital}`
      )
      .then((response) => {
        /* When there is an issue fetching data from 
        'api.weatherstack.com, site does not return an error, but
        object with variable "success: false", so axios.catch() does
        not catch it, and it had to be implemented in this way: */
        if (response.data.success !== false) {
          setWeather(response.data);
        }
      })
      .catch((error) => {
        console.log(
          `Unable to fetch weather data for ${country.name}: `,
          error.message
        );
      });
  }, [country.capital, country.name]);

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
      <Weather country={country} weather={weather} />
    </div>
  );
};

const Weather = ({ country, weather }) => {
  if (weather.length === 0) {
    return null;
  }
  return (
    <div>
      <h3>Weather in {country.capital}</h3>
      <p>
        <strong>temperature: </strong>
        {weather.current.temperature} Celcius
      </p>
      {weather.current.weather_icons.map((icon, index) => (
        <img key={index} alt="weather icon" src={icon} />
      ))}
      <p>
        <strong>wind: </strong> {weather.current.wind_speed} direction{' '}
        {weather.current.wind_dir}{' '}
      </p>
    </div>
  );
};

export default Country;
