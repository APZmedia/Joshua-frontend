// src/pages/Formats/StepFour.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StepFour = () => {
  // Precompiled inputs from Step 2 and Step 3
  const [title, setTitle] = useState(localStorage.getItem('step2Title') || '');
  const [subtitle, setSubtitle] = useState(localStorage.getItem('step2Subtitle') || '');
  const [text01, setText01] = useState(localStorage.getItem('step2Text01') || '');
  const [text02, setText02] = useState(localStorage.getItem('step2Text02') || '');
  const [text03, setText03] = useState(localStorage.getItem('step2Text03') || '');
  const [callToAction, setCallToAction] = useState(localStorage.getItem('step2CallToAction') || '');
  const [postCaption, setPostCaption] = useState(localStorage.getItem('step2PostCaption') || '');
  const [imageDescriptions, setImageDescriptions] = useState(JSON.parse(localStorage.getItem('step3ImageDescriptions') || '[]'));
  const [postImages, setPostImages] = useState(['', '', '', '', '']);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const navigate = useNavigate();

  // Simulate regenerating images (runs workflow)
  const regenerateImages = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setPostImages([
        '/path/to/generated/postimg01.jpg',
        '/path/to/generated/postimg02.jpg',
        '/path/to/generated/postimg03.jpg',
        '/path/to/generated/postimg04.jpg',
        '/path/to/generated/postimg05.jpg'
      ]);
      setIsRegenerating(false);
    }, 2000); // Simulate a 2-second delay for workflow
  };

  const createPost = () => {
    const finalPostData = {
      title,
      subtitle,
      text01,
      text02,
      text03,
      callToAction,
      postCaption,
      imageDescriptions,
      postImages
    };
    
    // Simulate sending the final post data to the backend or API
    console.log('Post Created:', finalPostData);

    // Navigate to summary page
    navigate('/format/carousel/summary');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Step 4: Finalize Post</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Title and Subtitle */}
        <div>
          <label className="block text-sm font-medium">Title</label>
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full mb-4"
          />

          <label className="block text-sm font-medium">Subtitle</label>
          <textarea
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="border p-2 w-full mb-4"
          />
        </div>

        {/* Texts and Call to Action */}
        <div>
          <label className="block text-sm font-medium">Text 01</label>
          <textarea
            value={text01}
            onChange={(e) => setText01(e.target.value)}
            className="border p-2 w-full mb-4"
          />

          <label className="block text-sm font-medium">Text 02</label>
          <textarea
            value={text02}
            onChange={(e) => setText02(e.target.value)}
            className="border p-2 w-full mb-4"
          />

          <label className="block text-sm font-medium">Text 03</label>
          <textarea
            value={text03}
            onChange={(e) => setText03(e.target.value)}
            className="border p-2 w-full mb-4"
          />

          <label className="block text-sm font-medium">Call to Action</label>
          <textarea
            value={callToAction}
            onChange={(e) => setCallToAction(e.target.value)}
            className="border p-2 w-full mb-4"
          />
        </div>
      </div>

      {/* Post Caption */}
      <div className="mb-6">
        <label className="block text-sm font-medium">Post Caption</label>
        <textarea
          value={postCaption}
          onChange={(e) => setPostCaption(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      {/* Image Descriptions */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {imageDescriptions.map((desc, index) => (
          <div key={index}>
            <label className="block text-sm font-medium">{`Image Description ${index + 1}`}</label>
            <textarea
              value={desc}
              onChange={(e) => {
                const newDescriptions = [...imageDescriptions];
                newDescriptions[index] = e.target.value;
                setImageDescriptions(newDescriptions);
              }}
              className="border p-2 w-full mb-4"
            />
          </div>
        ))}
      </div>

      {/* Regenerate Images Button */}
      <div className="mb-6">
        <button
          onClick={regenerateImages}
          className={`bg-blue-500 text-white py-2 px-4 ${isRegenerating ? 'opacity-50' : ''}`}
          disabled={isRegenerating}
        >
          {isRegenerating ? 'Regenerating Images...' : 'Regenerate Images'}
        </button>
      </div>

      {/* Display Generated Images */}
      {postImages[0] && (
        <div className="grid grid-cols-5 gap-4 mt-6">
          {postImages.map((path, index) => (
            <div key={index}>
              <img
                src={path || 'https://via.placeholder.com/1080x1350'}
                alt={`Carousel visual ${index + 1}`}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>
      )}

      {/* Create Post Button */}
      <button onClick={createPost} className="bg-green-500 text-white py-2 px-4 mt-4">
        Create Post
      </button>
    </div>
  );
};

export default StepFour;
