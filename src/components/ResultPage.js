

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Import images
import Cop1Image from '../image/Cop 1.png';
import Cop2Image from '../image/Cop 2.png';
import Cop3Image from '../image/Cop 3.png';
import CriminalImage from '../image/Criminal.png';
import Chain from '../image/chain.png'

const ResultPage = ({ copSelections, resetVehicleCounts }) => {
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await axios.post('http://localhost:5000/result', { copSelections });
        setResult(response.data);
      } catch (error) {
        console.error('Error fetching result:', error);
      }
    };

    fetchResult();
  }, [copSelections]);

  const handleRestart = () => {
    resetVehicleCounts();
    navigate('/');
  };

  const renderCopImage = (copName) => {
    switch (copName) {
      case 'Cop1':
        return <img src={Cop1Image} alt="Cop 1" style={{ maxWidth: '170px', margin: '10px' }} />;
      case 'Cop2':
        return <img src={Cop2Image} alt="Cop 2" style={{ maxWidth: '170px', margin: '10px' }} />;
      case 'Cop3':
        return <img src={Cop3Image} alt="Cop 3" style={{ maxWidth: '170px', margin: '10px' }} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h2>Result Page</h2>
      {result ? (
        result.captured ? (
          <div>
            <p style={{color:"greenyellow",display:"flex",justifyContent:"center",alignItems:"center"}}>{result.cop} successfully captured the fugitive!</p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {renderCopImage(result.cop)}
             
              <img src={Chain} alt="Chain" style={{ maxWidth: '90px', margin: '10px' }} />
              <img src={CriminalImage} alt="Criminal" style={{ maxWidth: '170px', margin: '10px' }} />
            </div>
          </div>
        ) : (
          <p>No cop was able to capture the fugitive.</p>
        )
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={handleRestart} >Restart Game</button>
    </div>
  );
};

export default ResultPage;
