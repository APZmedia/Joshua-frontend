// src/pages/Formats/FormatStep.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const formatsData = {
  contentCreation: {
    name: "Content Creation",
    steps: [
      { id: 1, name: "Input Text", description: "Enter the text for analysis." },
      { id: 2, name: "Analyze Text", description: "Analyze the input text." },
    ],
  },
};

const FormatStep = () => {
  const { formatName, stepId } = useParams(); // Get dynamic params
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(null);
  const [input, setInput] = useState('');

  useEffect(() => {
    const format = formatsData[formatName];
    if (format) {
      const step = format.steps.find(s => s.id === parseInt(stepId));
      setCurrentStep(step);
    }
  }, [formatName, stepId]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleNext = () => {
    localStorage.setItem(`formatStep${stepId}Input`, input); // Save to localStorage
    const nextStepId = parseInt(stepId) + 1;
    const format = formatsData[formatName];
    if (nextStepId <= format.steps.length) {
      navigate(`/format/${formatName}/step/${nextStepId}`);
    } else {
      navigate(`/format/${formatName}/summary`);
    }
  };

  if (!currentStep) return <div className="text-center">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{currentStep.name}</h2>
        <p className="text-gray-600 mb-6">{currentStep.description}</p>
        
        <textarea
          value={input}
          onChange={handleInputChange}
          className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          placeholder="Enter your input here..."
        ></textarea>
        
        <button
          onClick={handleNext}
          className="mt-6 w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition"
        >
          {parseInt(stepId) === formatsData[formatName].steps.length ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default FormatStep;
