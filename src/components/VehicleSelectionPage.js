

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css'

const VehicleSelectionPage = ({ copSelections, setCopSelections, availableCounts, setAvailableCounts }) => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicles, setSelectedVehicles] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/vehicles')
      .then(response => setVehicles(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleSubmit = async () => {
    const updatedSelections = copSelections.map((selection, index) => ({
      ...selection,
      vehicle: selectedVehicles[index]
    }));

    setCopSelections(updatedSelections);
    navigate('/result');
  };

  const handleVehicleSelection = (index, selectedVehicle) => {
    if (availableCounts[selectedVehicle] > 0) {
      setSelectedVehicles({ ...selectedVehicles, [index]: selectedVehicle });
      setValidationErrors({ ...validationErrors, [index]: '' });

      setAvailableCounts(prevCounts => ({
        ...prevCounts,
        [selectedVehicle]: prevCounts[selectedVehicle] - 1
      }));
    } else {
      setValidationErrors({ ...validationErrors, [index]: `No ${selectedVehicle} available` });
    }
  };

  return (
    <div>
      <h2 style={{color:"royalblue",display:"flex",justifyContent:"center",alignItems:"center"}}>Select Vehicle for Each Cop</h2>
      {copSelections && copSelections.length > 0 ? (
        copSelections.map((selection, index) => (
          <div key={index}>
            <h3>{selection.cop}</h3>
            <p style={{color:"lightgreen",display:"flex",justifyContent:"center",alignItems:"center"}}>Selected City: {selection.city}</p>
            <label style={{color:"royalblue"}}>Vehicle: </label>
            <select
              value={selectedVehicles[index] || ''}
              onChange={e => handleVehicleSelection(index, e.target.value)}
            >
              <option value="" disabled>Select vehicle</option>
              {vehicles.map(vehicle => (
                <option
                  key={vehicle.kind}
                  value={vehicle.kind}
                  disabled={availableCounts[vehicle.kind] <= 0}
                >
                  {vehicle.kind} - Range: {vehicle.range} KM - Available: {availableCounts[vehicle.kind]}
                </option>
              ))}
            </select>
            {validationErrors[index] && <p style={{ color: 'red' }}>{validationErrors[index]}</p>}
          </div>
        ))
      ) : (
        <p>Loading cops...</p>
      )}
      <button onClick={handleSubmit}>See Results</button>
    </div>
  );
};

export default VehicleSelectionPage;
