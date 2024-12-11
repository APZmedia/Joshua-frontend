// src/pages/Formats/FormatStep2.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FormatStep2 = () => {
  const [outputText, setOutputText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const step1Input = localStorage.getItem('formatStep1Input'); // Updated key
    if (step1Input) {
      const generatedOutput = `Generated output from: ${step1Input}`;
      setOutputText(generatedOutput);
      localStorage.setItem('formatStep2Output', generatedOutput); // Updated key
    }
  }, []);

  const handleNext = () => {
    navigate('/format/summary');
  };

  return (
    <div>
      <h2>Format Step 2: Generated Output</h2>
      <textarea
        value={outputText}
        readOnly
        rows="6"
        cols="50"
      />
      <br />
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default FormatStep2;
