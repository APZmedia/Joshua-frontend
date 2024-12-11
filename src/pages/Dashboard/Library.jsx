'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

// Sample image data - replace with your own image URLs
const imageData = [
  { id: 1, src: "/images/lib/01.png", alt: "Image 1" },
  { id: 2, src: "/images/lib/02.png", alt: "Image 2" },
  { id: 3, src: "/images/lib/03.png", alt: "Image 3" },
  { id: 4, src: "/images/lib/04.png", alt: "Image 4" },
  { id: 5, src: "/images/lib/05.png", alt: "Image 5" },
  { id: 6, src: "/images/lib/06.png", alt: "Image 6" },
  { id: 7, src: "/images/lib/07.png", alt: "Image 7" },
  { id: 8, src: "/images/lib/08.png", alt: "Image 8" },
  { id: 9, src: "/images/lib/09.png", alt: "Image 9" },
  { id: 10, src: "/images/lib/10.png", alt: "Image 10" },
  { id: 11, src: "/images/lib/11.png", alt: "Image 11" },
  { id: 12, src: "/images/lib/12.png", alt: "Image 12" },
  { id: 13, src: "/images/lib/13.png", alt: "Image 13" },
  { id: 14, src: "/images/lib/14.png", alt: "Image 14" },
  { id: 15, src: "/images/lib/15.png", alt: "Image 15" },
  { id: 16, src: "/images/lib/16.png", alt: "Image 16" },
  { id: 17, src: "/images/lib/17.png", alt: "Image 17" },
  { id: 18, src: "/images/lib/18.png", alt: "Image 18" },
  { id: 19, src: "/images/lib/19.png", alt: "Image 19" },
  { id: 20, src: "/images/lib/20.png", alt: "Image 20" },
  { id: 21, src: "/images/lib/21.png", alt: "Image 21" },
  { id: 22, src: "/images/lib/22.png", alt: "Image 22" },
  { id: 23, src: "/images/lib/23.png", alt: "Image 23" },
  { id: 24, src: "/images/lib/24.png", alt: "Image 24" },
  { id: 25, src: "/images/lib/25.png", alt: "Image 25" },
  { id: 26, src: "/images/lib/26.png", alt: "Image 26" },
  { id: 27, src: "/images/lib/27.png", alt: "Image 27" },
  { id: 28, src: "/images/lib/28.png", alt: "Image 28" },
  { id: 29, src: "/images/lib/29.png", alt: "Image 29" },
  { id: 30, src: "/images/lib/30.png", alt: "Image 30" },
  { id: 31, src: "/images/lib/31.png", alt: "Image 31" },
  { id: 32, src: "/images/lib/32.png", alt: "Image 32" },
  { id: 33, src: "/images/lib/33.png", alt: "Image 33" },
  { id: 34, src: "/images/lib/34.png", alt: "Image 34" },
  { id: 35, src: "/images/lib/35.png", alt: "Image 35" },
  { id: 36, src: "/images/lib/36.png", alt: "Image 36" },
  { id: 37, src: "/images/lib/37.png", alt: "Image 37" },
  { id: 38, src: "/images/lib/38.png", alt: "Image 38" },
  { id: 39, src: "/images/lib/39.png", alt: "Image 39" },
  { id: 40, src: "/images/lib/40.png", alt: "Image 40" },
  { id: 41, src: "/images/lib/41.png", alt: "Image 41" },
  { id: 42, src: "/images/lib/42.png", alt: "Image 42" },
  { id: 43, src: "/images/lib/43.png", alt: "Image 43" },
  // Add more image objects as needed
]

const itemsPerPage = 15
const visiblePageButtons = 5

const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
)

const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
)

export default function Library({ images = imageData }) {
  const [currentPage, setCurrentPage] = useState(1)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentImages = images.slice(indexOfFirstItem, indexOfLastItem)

  const totalPages = Math.ceil(images.length / itemsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const renderPageButtons = () => {
    const pageButtons = []
    const leftEllipsis = currentPage > 3
    const rightEllipsis = currentPage < totalPages - 2

    if (leftEllipsis) {
      pageButtons.push(
        <motion.button
          key="left-ellipsis"
          className="px-3 py-1 rounded-md bg-secondary text-secondary-foreground"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ...
        </motion.button>
      )
    }

    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
      pageButtons.push(
        <motion.button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded-md ${
            currentPage === i ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {i}
        </motion.button>
      )
    }

    if (rightEllipsis) {
      pageButtons.push(
        <motion.button
          key="right-ellipsis"
          className="px-3 py-1 rounded-md bg-secondary text-secondary-foreground"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ...
        </motion.button>
      )
    }

    return pageButtons
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {currentImages.map((image) => (
          <motion.div
            key={image.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative aspect-square overflow-hidden rounded-lg shadow-md"
          >
            <motion.img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </div>
      <div className="mt-8 flex justify-center items-center space-x-2">
        <motion.button
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          className="px-3 py-1 rounded-md bg-secondary text-secondary-foreground"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={currentPage === 1}
        >
          <ChevronLeft />
        </motion.button>
        {renderPageButtons()}
        <motion.button
          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
          className="px-3 py-1 rounded-md bg-secondary text-secondary-foreground"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={currentPage === totalPages}
        >
          <ChevronRight />
        </motion.button>
      </div>
    </div>
  )
}