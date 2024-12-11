// src/pages/Formats/StepTwo.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StepTwo = () => {
  const [analysisText] = useState(localStorage.getItem('step1AnalysisText') || '');
  const [isGenerating, setIsGenerating] = useState(false); // Simulating workflow process
  const navigate = useNavigate();

  const [prompt, setPrompt] = useState('');

  const generatePostTexts = () => {
    setIsGenerating(true);

    // Simulate a delay for the workflow process
    setTimeout(() => {
      // Store the generated data directly in localStorage
      localStorage.setItem('step2Title', 'Generated Title from Analysis');
      localStorage.setItem('step2Subtitle', 'Generated Subtitle');
      localStorage.setItem('step2Text01', 'Generated text for section 1');
      localStorage.setItem('step2Text02', 'Generated text for section 2');
      localStorage.setItem('step2Text03', 'Generated text for section 3');
      localStorage.setItem('step2CallToAction', 'Generated call to action');
      localStorage.setItem('step2PostCaption', 'Generated post caption');
      localStorage.setItem('step2ImageDescription01', 'Generated description for image 1');
      localStorage.setItem('step2ImageDescription02', 'Generated description for image 2');
      localStorage.setItem('step2ImageDescription03', 'Generated description for image 3');

      setIsGenerating(false);

      // Move to the next step
      navigate('/format/carousel/step/3');
    }, 2000); // Simulating a 2-second workflow
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Step 2: Generate Post Texts</h2>
      
      <textarea
        // value={analysisText}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Analysis from Step 1"
        className="border p-2 w-full h-40 mb-4"
      />

      <button
        onClick={generatePostTexts}
        className={`bg-blue-500 text-white py-2 px-4 mt-4 ${isGenerating ? 'opacity-50' : ''}`}
        disabled={isGenerating}
      >
        {isGenerating ? 'Generating...' : 'Generate Post Texts'}
      </button>
    </div>
  );
};

export default StepTwo;
