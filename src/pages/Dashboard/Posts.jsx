import React, { useState } from 'react'
import { motion } from 'framer-motion'

const fakePosts = [
  {
    id: 1,
    format: 'Carousel',
    title: "L'inverno più caldo del mondo",
    caption: 'Il mondo sta subendo un aumento di temperatura globale, causato da una serie di ondate di caldo.',
    thumbnail: '/images/oceanchain.png',
    status: 'draft'
  },
  {
    id: 2,
    format: 'Video',
    title: "L'Antartide è colpita da ondate di caldo in inverno.",
    caption: 'Le temperature aumentano di 10°C sopra la norma, suscitando preoccupazioni globali.',
    thumbnail: '/images/antartica.png',
    status: 'scheduled'
  },
  {
    id: 3,
    format: 'Single Post',
    title: 'Amplificazione algoritmica.',
    caption: 'Le piattaforme di social media danno priorità ai contenuti che suscitano indignazione',
    thumbnail: '/images/amplificazione.png',
    status: 'draft'
  },
  {
    id: 4,
    format: 'Carousel',
    title: 'Erosione del Discorso Pubblico',
    caption: "Con lo spostamento della retorica politica verso l'estremismo online, diventa sempre più difficile distinguere il dibattito legittimo dalla propaganda dannosa",
    thumbnail: '/images/erosionediscorsopubblico.png',
    status: 'draft'
  },
  {
    id: 5,
    format: 'Video',
    title: "La fine dell'influenza potrebbe essere alle porte",
    caption: "Il vaccino universale contro l'influenza potrebbe entrare in fase di sperimentazione umana entro 1-3 anni.",
    thumbnail: '/images/modellitestuali.png',
    status: 'scheduled'
  },
  {
    id: 6,
    format: 'Single Post',
    title: 'Echo Chambers & Radicalizzazione',
    caption: 'Piattaforme come Telegram e Parler creano bolle informative, raggruppando individui con idee simili e intensificando le idee estremiste',
    thumbnail: '/images/necessitàregolamentazioni.png',
    status: 'draft'
  },
]

export default function Posts() {
  const [hoveredRow, setHoveredRow] = useState(null)

  return (
    <div className="container mx-auto py-10">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Format</th>
            <th className="py-3 px-6 text-left">Title</th>
            <th className="py-3 px-6 text-left">Caption</th>
            <th className="py-3 px-6 text-left">Thumbnail</th>
            <th className="py-3 px-6 text-left">Status</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {fakePosts.map((post) => (
            <motion.tr
              key={post.id}
              className="border-b border-gray-200 hover:bg-gray-100"
              initial={{ backgroundColor: 'transparent' }}
              whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
              onHoverStart={() => setHoveredRow(post.id)}
              onHoverEnd={() => setHoveredRow(null)}
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">
                <span className="font-medium">{post.format}</span>
              </td>
              <td className="py-3 px-6 text-left">
                {post.title}
              </td>
              <td className="py-3 px-6 text-left">
                {post.caption}
              </td>
              <td className="py-3 px-6 text-left">
                <img src={post.thumbnail} alt={post.title} className="w-12 h-12 object-cover rounded" />
              </td>
              <td className="py-3 px-6 text-left">
                <span className={`flex items-center ${post.status === 'draft' ? 'text-gray-500' : 'text-green-500'}`}>
                  <span className={`w-2 h-2 mr-2 rounded-full ${post.status === 'draft' ? 'bg-gray-500' : 'bg-green-500'}`}></span>
                  {post.status}
                </span>
              </td>
              <td className="py-3 px-6 text-left">
                <div className="flex items-center space-x-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-300">
                    Edit
                  </button>
                  <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-300">
                    Schedule
                  </button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}