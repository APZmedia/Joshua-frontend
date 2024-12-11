// src/components/DynamicStep.js
import React, { useState } from 'react';
import { updateStepResult, getFormatRun } from '../services/formatRunService';

const DynamicStep = ({ formatData, stepId, formatInstanceId }) => {
  const [inputs, setInputs] = useState({});

  const currentStep = formatData.steps.find(step => step.id === stepId);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleNextStep = () => {
    updateStepResult(formatInstanceId, stepId, { inputs });
    // Logic to navigate to the next step goes here...
  };

  if (!currentStep) return <div>Step not found</div>;

  return (
    <div>
      <h2>{currentStep.name}</h2>
      <p>{currentStep.description}</p>

      {currentStep.inputs.map((input) => (
        <div key={input.name} className="mb-4">
          <label>{input.label}</label>
          <textarea
            name={input.name}
            placeholder={input.placeholder}
            value={inputs[input.name] || ''}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>
      ))}

      <button onClick={handleNextStep} className="bg-blue-500 text-white py-2 px-4">
        Next
      </button>
    </div>
  );
};

export default DynamicStep;
