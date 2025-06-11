"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import type { Slide } from "../types"
import { Link } from "react-router-dom"
import SlideCard from "../components/slide-card"

export default function SlideList() {
  const [allSlides, setAllSlides] = useState<Slide[]>([])
  const [filteredSlides, setFilteredSlides] = useState<Slide[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLayout, setSelectedLayout] = useState("all")
  const [sortBy, setSortBy] = useState("updated")
  const [selectedSlides, setSelectedSlides] = useState<number[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  console.log(setSortBy,setViewMode)

  useEffect(() => {
    fetchSlides()
  }, [])

  useEffect(() => {
    filterAndSortSlides()
  }, [allSlides, searchQuery, selectedLayout, sortBy])

  const fetchSlides = async () => {
    try {
      const response = await axios.get("https://markdown-presentation.onrender.com/api/slides")
      setAllSlides(response.data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching slides:", error)
      setLoading(false)
    }
  }

  const filterAndSortSlides = () => {
    let filtered = [...allSlides]

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (slide) =>
          slide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          slide.markdown.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by layout
    if (selectedLayout !== "all") {
      filtered = filtered.filter((slide) => (slide.layout || "default") === selectedLayout)
    }

    // Sort slides
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title)
        case "layout":
          return (a.layout || "default").localeCompare(b.layout || "default")
        case "created":
        case "updated":
        default:
          return b.id - a.id // Assuming higher ID means more recent
      }
    })

    setFilteredSlides(filtered)
  }

  const handleDeleteSlide = async (id: number) => {
    try {
      await axios.delete(`https://markdown-presentation.onrender.com/api/slides/${id}`)
      setAllSlides((prev) => prev.filter((slide) => slide.id !== id))
      setSelectedSlides((prev) => prev.filter((slideId) => slideId !== id))
    } catch (error) {
      console.error("Error deleting slide:", error)
      throw error
    }
  }

  const handleDuplicateSlide = async (slide: Slide) => {
    try {
      const response = await axios.post("https://markdown-presentation.onrender.com/api/slides", {
        title: `${slide.title} (Copy)`,
        layout: slide.layout,
        markdown: slide.markdown,
      })
      setAllSlides((prev) => [...prev, response.data])
    } catch (error) {
      console.error("Error duplicating slide:", error)
      alert("Failed to duplicate slide")
    }
  }

  const handleSelectSlide = (id: number) => {
    setSelectedSlides((prev) => (prev.includes(id) ? prev.filter((slideId) => slideId !== id) : [...prev, id]))
  }



  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-lg text-gray-500">Loading slides...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div >
        <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white border-b position-absolute border-gray-200 px-3 sm:px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          
          <span className="font-medium text-gray-700 text-sm sm:text-base hidden sm:block">Markdown Slides</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
         
          
        <Link
                to="/create"
                className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-500 transition-colors shadow-sm"
              >
                + New Slide
              </Link>
        </div>
      </div>



          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 mt-3 ml-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">My Slides</h1>
              <p className="text-gray-600">
                {allSlides.length} slide{allSlides.length !== 1 ? "s" : ""} total
              </p>
            </div>
            <div className="flex items-center gap-3 mt-4 sm:mt-0">
              {/* View Mode Toggle */}
             

              
            </div>
          </div>

         

          {/* Slides Grid/List */}
          {filteredSlides.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center ">
              {searchQuery || selectedLayout !== "all" ? (
                <>
                  <div className="text-4xl mb-4">🔍</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No slides found</h3>
                  <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
                  <button
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedLayout("all")
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Clear filters
                  </button>
                </>
              ) : (
                <>
                  <div className="text-4xl mb-4">📄</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No slides yet</h3>
                  <p className="text-gray-500 mb-6">Create your first slide to get started with your presentation</p>
                  <Link
                    to="/create"
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    Create Your First Slide
                  </Link>
                </>
              )}
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {filteredSlides.map((slide) => (
                <SlideCard
                  key={slide.id}
                  slide={slide}
                  onDelete={handleDeleteSlide}
                  onDuplicate={handleDuplicateSlide}
                  isSelected={selectedSlides.includes(slide.id)}
                  onSelect={handleSelectSlide}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
