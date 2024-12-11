import React, { useState } from "react";

const TextAnalysis = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  const handleProcessText = () => {
    // Placeholder for text processing logic
    const processedText = inputText.toUpperCase(); // Example: convert text to uppercase
    setOutputText(processedText);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left column: input and button */}
        <div>
          <h1 className="text-3xl font-bold mb-4">Text Analysis</h1>
          <textarea
            className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter your text here..."
          />
          <button
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleProcessText}
          >
            Process Text
          </button>
        </div>

        {/* Right column: output display */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Processed Output</h2>
          <div className="w-full h-64 p-4 border border-gray-300 rounded-lg bg-white">
            {outputText || "The processed text will appear here..."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextAnalysis;
