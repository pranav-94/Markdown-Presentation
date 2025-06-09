"use client"

import { useEffect, useState, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import SlideViewer from "../components/SlideViewer"
import type { Slide } from "../types"

const PresentSlide = () => {
  const { id } = useParams<{ id: string }>()
  const [slides, setSlides] = useState<Slide[]>([])
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get("http://localhost:3000/api/slides").then((res) => {
      const sortedSlides = res.data.sort((a: Slide, b: Slide) => a.id - b.id)
      setSlides(sortedSlides)
      const initialIndex = sortedSlides.findIndex((s: Slide) => s.id === Number(id))
      setCurrentIndex(initialIndex >= 0 ? initialIndex : 0)
    })
  }, [id])

  const goToNext = useCallback(() => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    }
  }, [currentIndex, slides.length])

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }, [currentIndex])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goToNext()
      if (e.key === "ArrowLeft") goToPrevious()
      if (e.key === "Escape") navigate("/")
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goToNext, goToPrevious, navigate])

  const slide = slides[currentIndex]

  if (!slide) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  const progress = ((currentIndex + 1) / slides.length) * 100

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this slide?");
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:3000/api/slides/${slide.id}`);
      const updatedSlides = slides.filter((s) => s.id !== slide.id);
      setSlides(updatedSlides);

      if (updatedSlides.length === 0) {
        navigate("/");
      } else {
        const nextIndex = Math.min(currentIndex, updatedSlides.length - 1);
        setCurrentIndex(nextIndex);
      }
    } catch (err) {
      alert("Failed to delete the slide.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Main Slide Area */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-4xl bg-slate-600 text-white rounded-lg p-6 sm:p-12 min-h-96">
          <SlideViewer markdown={slide.markdown} />
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gray-100 p-4">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              disabled={currentIndex === 0}
              onClick={goToPrevious}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Prev
            </button>
            <button
              disabled={currentIndex === slides.length - 1}
              onClick={goToNext}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next →
            </button>
            <button onClick={handleDelete}>
          🗑 Delete
        </button>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700">
              {currentIndex + 1} / {slides.length}
            </span>
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
            >
              Exit
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-300 rounded-full h-2">
            <div className="bg-slate-500 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PresentSlide
