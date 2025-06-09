"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import type { Slide } from "../types"
import { Link } from "react-router-dom"

export default function SlideList() {
  const [slides, setSlides] = useState<Slide[]>([])

  useEffect(() => {
    axios.get("http://localhost:3000/api/slides").then((res) => {
      setSlides(res.data)
      console.log(res)
    })
  }, [])

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">All Slides</h1>

          {slides.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg mb-6">No slides created yet</p>
              <Link
                to="/create"
                className="inline-block px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium"
              >
                + Create Your First Slide
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {slides.map((slide) => (
                  <div
                    key={slide.id}
                    className="bg-white text-black rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
                  >
                    <h3 className="text-xl font-semibold mb-4 truncate">{slide.title}</h3>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        to={`/edit/${slide.id}`}
                        className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium text-center"
                      >
                        Edit
                      </Link>
                      <Link
                        to={`/present/${slide.id}`}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium text-center"
                      >
                        Present
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Link
                  to="/create"
                  className="inline-block px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium"
                >
                  + New Slide
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
