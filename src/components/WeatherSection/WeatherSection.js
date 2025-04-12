import React from 'react';
import { Segment, Icon } from 'semantic-ui-react';
import './WeatherSection.css';

const WeatherSection = () => {
  return (
    <Segment className="weather-section">
      <h3>
        <Icon name="cloud" color="blue" /> Current Weather
      </h3>
      <p>Temperature: 25°C</p>
      <p>Humidity: 60%</p>
      <p>Wind Speed: 15 km/h</p>
    </Segment>
  );
};

export default WeatherSection;