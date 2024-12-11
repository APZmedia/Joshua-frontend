// src/pages/Formats/StepThree.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StepThree = () => {
  // Precompiled inputs from Step 2
  const [title] = useState(localStorage.getItem('step2Title') || '');
  const [subtitle] = useState(localStorage.getItem('step2Subtitle') || '');
  const [text01] = useState(localStorage.getItem('step2Text01') || '');
  const [text02] = useState(localStorage.getItem('step2Text02') || '');
  const [text03] = useState(localStorage.getItem('step2Text03') || '');
  const [callToAction] = useState(localStorage.getItem('step2CallToAction') || '');
  const [imageDescriptions, setImageDescriptions] = useState([
    localStorage.getItem('step2ImageDescription01') || '',
    localStorage.getItem('step2ImageDescription02') || '',
    localStorage.getItem('step2ImageDescription03') || ''
  ]);

  const [showLibraryImages, setShowLibraryImages] = useState(false);

  // Output image paths after generation
  const [imagePaths, setImagePaths] = useState(['', '', '']);
  const [isGenerating, setIsGenerating] = useState(false); // Simulating workflow process
  const navigate = useNavigate();

  // Simulate image generation workflow
  const generateImages = () => {
    setIsGenerating(true);
    // Simulating a workflow process delay
    setTimeout(() => {
      setImagePaths([
        '/images/lib/11.png',
        '/images/lib/26.png',
        '/images/lib/23.png'
      ]);
      setIsGenerating(false);
    }, 2000); // 2 seconds delay for the workflow simulation
  };

  // Simulate choosing images from a library
  const chooseFromLibrary = () => {
    // Simulate selecting images from a library
    setImagePaths([
      '/images/lib/06.png',
      '/images/lib/13.png',
      '/images/lib/20.png'
    ]);

    setShowLibraryImages(true);
  };

  const handleNext = () => {
    // Save the image paths and navigate to the next step
    localStorage.setItem('step3ImagePaths', JSON.stringify(imagePaths));
    navigate('/format/carousel/step/4');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Step 3: Generate or Choose Images</h2>
      
      <div className="grid grid-cols-5 gap-4 mb-6">
        {/* Column 1: Title and Subtitle */}
        <div>
          <h3 className="text-xl font-semibold">Title and Subtitle</h3>
          <p><strong>Title:</strong> {title}</p>
          <p><strong>Subtitle:</strong> {subtitle}</p>
        </div>

        {/* Column 2: Text 01 */}
        <div>
          <h3 className="text-xl font-semibold">Text 01</h3>
          <p>{text01}</p>
        </div>

        {/* Column 3: Text 02 */}
        <div>
          <h3 className="text-xl font-semibold">Text 02</h3>
          <p>{text02}</p>
        </div>

        {/* Column 4: Text 03 */}
        <div>
          <h3 className="text-xl font-semibold">Text 03</h3>
          <p>{text03}</p>
        </div>

        {/* Column 5: Call to Action */}
        <div>
          <h3 className="text-xl font-semibold">Call to Action</h3>
          <p>{callToAction}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {imageDescriptions.map((desc, index) => (
          <div key={index}>
            <input
              type="text"
              value={desc}
              onChange={(e) => {
                const newDescriptions = [...imageDescriptions];
                newDescriptions[index] = e.target.value;
                setImageDescriptions(newDescriptions);
              }}
              placeholder={`Image Description ${index + 1}`}
              className="border p-2 w-full mb-2"
            />
          </div>
        ))}
      </div>

      <div className="mb-6">
        <button
          onClick={generateImages}
          className={`bg-blue-500 text-white py-2 px-4 ${isGenerating ? 'opacity-50' : ''}`}
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating Images...' : 'Generate Images'}
        </button>

        <button
          onClick={chooseFromLibrary}
          className="bg-yellow-500 text-white py-2 px-4 ml-4"
        >
          Choose from Library
        </button>
      </div>

      {/* {imagePaths[0] && (
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div>
            <img
              src={imagePaths[0] || '/images/lib/01.png'}
              alt="First generated visual"
              className="w-full h-auto"
            />
          </div>
          <div>
            <img
              src={imagePaths[1] || '/images/lib/02.png'}
              alt="Second generated visual"
              className="w-full h-auto"
            />
          </div>
          <div>
            <img
              src={imagePaths[2] || '/images/lib/03.png'}
              alt="Third generated visual"
              className="w-full h-auto"
            />
          </div>
        </div>
      )} */}

      {showLibraryImages && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          {imagePaths.map((path, index) => (
            <img key={index} src={path} alt={`Image ${index + 1}`} />
          ))}
        </div>
      )}

      <button
        onClick={handleNext}
        className="bg-green-500 text-white py-2 px-4 mt-4"
        // disabled={!imagePaths[0]}
      >
        Next
      </button>
    </div>
  );
};

export default StepThree;
