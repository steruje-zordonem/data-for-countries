import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Country.css';
import removeDiatrics from '../utils/removeDiatrics';
require('dotenv').config();

const Country = ({ country }) => {
  const [weather, setWeather] = useState([]);

  // Fetch weather data and save it into state variable
  useEffect(() => {
    // remove diatrics from capitals
    const capital = removeDiatrics(country.capital);
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHERSTACK_API_KEY}&query=${capital}`
      )
      .then((response) => {
        /* When there is an issue fetching data from 
        'api.weatherstack.com, site doesn't return an error, but
        object with variable "success: false", so error has to be thrown
        in order to allow axios.catch() to catch it. */
        if (response.data.success === false) {
          throw new Error(response.data.error.info);
        } else {
          setWeather(response.data);
        }
      })
      .catch((error) => {
        console.log(
          `Unable to fetch weather data for ${country.name}, reason: "${error.message}"`
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
