import React, { useState } from 'react';

const FormatSummary = () => {
  const postCaption = localStorage.getItem('step2PostCaption') || '';
  const postImages = JSON.parse(localStorage.getItem('step4PostImages') || '[]'); // Assuming final images are stored in step4PostImages

  // State to track the current image in the carousel
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to handle carousel navigation
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % postImages.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? postImages.length - 1 : prevIndex - 1
    );
  };

  // Function to download all images
  const downloadImages = () => {
    postImages.forEach((imageURL, index) => {
      const link = document.createElement('a');
      link.href = imageURL;
      link.download = `image_${index + 1}.jpg`; // Filename for each image
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Clean up the DOM after the download
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white border rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-bold mb-4">Post Summary</h2>
      
      {/* Carousel of 5 images */}
      <div className="bg-gray-100 border rounded-md overflow-hidden mb-4">
        <div className="relative">
          {/* Display the current image */}
          <img
            src={postImages[currentImageIndex] || 'https://via.placeholder.com/1080x1350'}
            alt={`Carousel visual ${currentImageIndex + 1}`}
            className="w-full h-auto"
          />

          {/* Carousel Navigation */}
          {postImages.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
              >
                &#8249;
              </button>
              <button
                onClick={handleNextImage}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
              >
                &#8250;
              </button>
            </>
          )}
        </div>

        {/* Caption */}
        <div className="p-4">
          <p>{postCaption}</p>
        </div>
      </div>

      {/* Download Images Button */}
      <div className="mt-6">
        <button
          onClick={downloadImages}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Download Images
        </button>
      </div>

      <p className="text-green-500 mt-4">The post has been successfully created!</p>
    </div>
  );
};

export default FormatSummary;
