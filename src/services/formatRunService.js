// src/services/formatRunService.js

// Store a new format run in localStorage
export const startFormatRun = (formatInstanceId, formatData) => {
    localStorage.setItem(formatInstanceId, JSON.stringify(formatData));
  };
  
  // Retrieve the format run data
  export const getFormatRun = (formatInstanceId) => {
    const formatData = localStorage.getItem(formatInstanceId);
    return formatData ? JSON.parse(formatData) : null;
  };
  
  // Update a specific step in the format run
  export const updateStepResult = (formatInstanceId, stepId, stepData) => {
    const formatData = getFormatRun(formatInstanceId);
    if (formatData) {
      if (!formatData.results[`step${stepId}`]) {
        formatData.results[`step${stepId}`] = {};
      }
  
      // Update the inputs and outputs for the step
      formatData.results[`step${stepId}`].inputs = stepData.inputs || formatData.results[`step${stepId}`].inputs;
      formatData.results[`step${stepId}`].outputs = stepData.outputs || formatData.results[`step${stepId}`].outputs;
      formatData.results[`step${stepId}`].completed = true;
  
      // Save the updated format data back to localStorage
      localStorage.setItem(formatInstanceId, JSON.stringify(formatData));
    }
  };
  