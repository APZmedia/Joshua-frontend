import React, { useState } from 'react'
import { motion } from 'framer-motion'

const FileUploadButton = ({ label, onFileSelect }) => (
  <motion.div
    className="mb-2 inline-block"
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
  >
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type="file"
      className="hidden"
      onChange={onFileSelect}
      id={`file-${label}`}
    />
    <label
      htmlFor={`file-${label}`}
      className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Choose File
    </label>
  </motion.div>
)

const ColorPicker = ({ label, color, setColor }) => (
  <motion.div
    className="mb-2"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="flex items-center">
      <motion.input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="h-8 w-8 border border-gray-300 rounded-md mr-2"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      />
      <motion.input
        type="text"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="p-1 text-sm border border-gray-300 rounded-md"
        whileHover={{ scale: 1.05 }}
        whileFocus={{ scale: 1.05, borderColor: '#4f46e5' }}
      />
    </div>
  </motion.div>
)

const Thumbnail = ({ src, alt, className }) => (
  <motion.div
    className={`border border-gray-300 rounded-md p-2 ${className}`}
    whileHover={{ scale: 1.05 }}
  >
    {src ? (
      <img src={src} alt={alt} className="max-w-full h-auto" />
    ) : (
      <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-500">
        No file selected
      </div>
    )}
  </motion.div>
)

const ActionButton = ({ children, onClick, bgColor }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`${bgColor} text-white px-4 py-2 rounded-md shadow-md transition duration-300 ease-in-out`}
    onClick={onClick}
  >
    {children}
  </motion.button>
)

const Container = ({ title, description, onEdit, onDelete }) => (
  <motion.div
    className="bg-white p-4 rounded-lg shadow-md"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
  >
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <div className="flex space-x-2">
      <ActionButton onClick={onEdit} bgColor="bg-blue-500 hover:bg-blue-600">
        Edit
      </ActionButton>
      <ActionButton onClick={onDelete} bgColor="bg-red-500 hover:bg-red-600">
        Delete
      </ActionButton>
    </div>
  </motion.div>
)

const AddContainer = ({ onFileSelect }) => (
  <motion.div
    className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center cursor-pointer"
    whileHover={{ scale: 1.05, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
    whileTap={{ scale: 0.95 }}
  >
    <input
      type="file"
      className="hidden"
      onChange={onFileSelect}
      id="add-file"
    />
    <label htmlFor="add-file" className="cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    </label>
  </motion.div>
)

export default function Settings() {
  const [brandLogos, setBrandLogos] = useState({
    logoWhite: null,
    logoBlack: null,
    logoColor: null,
    squareFormat: null,
    horizontalFormat: null
  })

  const [colors, setColors] = useState({
    color1: '#000000',
    color2: '#ffffff',
    color3: '#ff0000',
    color4: '#00ff00',
    color5: '#0000ff'
  })

  const [fonts, setFonts] = useState({
    headingFont: null,
    paragraphFont: null
  })

  const handleLogoUpload = (key, file) => {
    setBrandLogos(prev => ({ ...prev, [key]: file }))
  }

  const handleFontUpload = (key, file) => {
    setFonts(prev => ({ ...prev, [key]: file }))
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <motion.h1
        className="text-3xl font-bold mb-6"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Settings
      </motion.h1>

      <motion.section
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Brand</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(brandLogos).map(([key, value]) => (
            <div key={key}>
              <FileUploadButton
                label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                onFileSelect={(e) => handleLogoUpload(key, e.target.files[0])}
              />
              <Thumbnail
                src={value ? URL.createObjectURL(value) : null}
                alt={key}
                className="w-32 h-32 mt-2"
              />
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Color Palette</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(colors).map(([key, value]) => (
            <ColorPicker
              key={key}
              label={`Color ${key.slice(-1)}`}
              color={value}
              setColor={(newColor) => setColors(prev => ({ ...prev, [key]: newColor }))}
            />
          ))}
        </div>
      </motion.section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Typefaces</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(fonts).map(([key, value]) => (
            <div key={key}>
              <FileUploadButton
                label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                onFileSelect={(e) => handleFontUpload(key, e.target.files[0])}
              />
            </div>
          ))}
        </div>
      </section>

      <motion.section
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Loras</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Container
            title="Lora 1"
            description="Description for Lora 1"
            onEdit={() => console.log('Edit Lora 1')}
            onDelete={() => console.log('Delete Lora 1')}
          />
          <Container
            title="Lora 2"
            description="Description for Lora 2"
            onEdit={() => console.log('Edit Lora 2')}
            onDelete={() => console.log('Delete Lora 2')}
          />
          <AddContainer onFileSelect={(e) => console.log('File selected:', e.target.files[0])} />
        </div>
      </motion.section>

      <motion.section
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Models</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Container
            title="Model 1"
            description="Description for Model 1"
            onEdit={() => console.log('Edit Model 1')}
            onDelete={() => console.log('Delete Model 1')}
          />
          <Container
            title="Model 2"
            description="Description for Model 2"
            onEdit={() => console.log('Edit Model 2')}
            onDelete={() => console.log('Delete Model 2')}
          />
          <AddContainer onFileSelect={(e) => console.log('File selected:', e.target.files[0])} />
        </div>
      </motion.section>
    </motion.div>
  )
}