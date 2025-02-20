

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const CitySelectionPage = ({ copSelections, setCopSelections, resetVehicleCounts }) => {
  const [cities, setCities] = useState([]);
  const [selectedCities, setSelectedCities] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://yocket-police-backend-task.onrender.com/cities')
      .then(response => {
        setCities(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false); // Even if there's an error, we stop the loading state
      });

    // Reset vehicle counts when the component mounts
    resetVehicleCounts();
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleSubmit = () => {
    const selectedCityNames = Object.values(selectedCities);
    const uniqueCities = new Set(selectedCityNames);

    if (uniqueCities.size !== selectedCityNames.length) {
      setValidationErrors({ general: 'Each cop must select a unique city' });
      return;
    }

    if (selectedCityNames.length < copSelections.length || selectedCityNames.includes('')) {
      setValidationErrors({ general: 'Each cop must select a city' });
      return;
    }

    const updatedSelections = copSelections.map((selection, index) => ({
      ...selection,
      city: selectedCities[index]
    }));

    setCopSelections(updatedSelections);
    navigate('/vehicles');
  };

  return (
    <div>
      <h2 style={{color:"royalblue", display:"flex", justifyContent:"center", alignItems:"center"}}>Select City for Each Cop</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        copSelections && copSelections.length > 0 ? (
          copSelections.map((selection, index) => (
            <div key={index}>
              <h3>{selection.cop}</h3>
              <label style={{color:"royalblue", display:"flex", justifyContent:"left"}}>City: </label>
              <select 
                value={selectedCities[index] || ''} 
                onChange={e => setSelectedCities({ ...selectedCities, [index]: e.target.value })}
              >
                <option value="" disabled>Select city</option>
                {cities.map(city => (
                  <option key={city.name} value={city.name}>
                    {city.name} - {city.distance} KM
                  </option>
                ))}
              </select>
            </div>
          ))
        ) : (
          <p>Loading cops...</p>
        )
      )}
      {validationErrors.general && <p style={{ color: 'red' }}>{validationErrors.general}</p>}
      <button onClick={handleSubmit}>Select Vehicles</button>
    </div>
  );
};

export default CitySelectionPage;
