import React, { useState } from 'react';

const TextAnalyzer = () => {
  const [inputText, setInputText] = useState('');

  const handleTextChange = (e) => {
    setInputText(e.target.value);
  };

  const analyzeText = () => {
    // You can add the logic for analyzing the text here.
    console.log("Analyzing text:", inputText);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Analizza Testo</h1>
      <input
        type="text"
        value={inputText}
        onChange={handleTextChange}
        placeholder="Inserisci il testo da analizzare"
        className="p-2 border border-gray-300 rounded mb-4 w-80"
      />
      <button
        onClick={analyzeText}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Analizza testo
      </button>
    </div>
  );
};

export default TextAnalyzer;
