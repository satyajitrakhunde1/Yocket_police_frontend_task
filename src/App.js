

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CitySelectionPage from './components/CitySelectionPage';
import VehicleSelectionPage from './components/VehicleSelectionPage';
import ResultPage from './components/ResultPage';
import './App.css'

function App() {
  const [copSelections, setCopSelections] = useState([
    { cop: 'Cop1', city: '', vehicle: '' },
    { cop: 'Cop2', city: '', vehicle: '' },
    { cop: 'Cop3', city: '', vehicle: '' }
  ]);

  const initialVehicleCounts = {
    'EV Bike': 2,
    'EV Car': 1,
    'EV SUV': 1
  };

  const [availableCounts, setAvailableCounts] = useState(initialVehicleCounts);

  const resetVehicleCounts = () => {
    setAvailableCounts(initialVehicleCounts);
    setCopSelections([
      { cop: 'Cop1', city: '', vehicle: '' },
      { cop: 'Cop2', city: '', vehicle: '' },
      { cop: 'Cop3', city: '', vehicle: '' }
    ]);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={
              <CitySelectionPage 
                copSelections={copSelections} 
                setCopSelections={setCopSelections} 
                resetVehicleCounts={resetVehicleCounts}
              />
            } 
          />
          <Route 
            path="/vehicles" 
            element={
              <VehicleSelectionPage 
                copSelections={copSelections} 
                setCopSelections={setCopSelections} 
                availableCounts={availableCounts}
                setAvailableCounts={setAvailableCounts}
              />
            } 
          />
          <Route 
            path="/result" 
            element={
              <ResultPage 
                copSelections={copSelections}
                resetVehicleCounts={resetVehicleCounts}
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
