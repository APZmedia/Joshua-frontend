// src/App.js or src/pages/Formats/FormatStep.jsx
import React, { useState, useEffect } from 'react';
import formatData from '../data/formats/carouselPostFormat.json'; // Adjust the path based on the location

const App = () => {
  const [format, setFormat] = useState(null);

  useEffect(() => {
    setFormat(formatData); // Load the format data from the imported JSON
  }, []);

  if (!format) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Render your steps and format based on the loaded JSON */}
      <h1>{format.formatName}</h1>
      <p>{format.description}</p>
      {/* Render other steps, metadata, and actions */}
    </div>
  );
};

export default App;
