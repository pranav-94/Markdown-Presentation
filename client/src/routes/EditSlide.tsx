"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import type { Slide } from "../types"
import EnhancedEditor from "../components/enhanced-editor"
import SlideViewer from "../components/SlideViewer"
import MobileTabs from "../components/mobile-tabs"
import LayoutSelector from "../components/layout-selector"

export default function EditSlide() {
  const { id } = useParams<{ id: string }>()
  const [slide, setSlide] = useState<Slide | null>(null)
  const [allSlides, setAllSlides] = useState<Slide[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [activeTab, setActiveTab] = useState("preview") // For mobile tabs
  const navigate = useNavigate()

  console.log(allSlides,currentSlideIndex)

  const tabs = [
    { id: "slides", label: "Slides", icon: "📄" },
    { id: "preview", label: "Preview", icon: "👁" },
    { id: "editor", label: "Edit", icon: "✏️" },
    { id: "layout", label: "Layout", icon: "🎨" },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all slides
        const slidesResponse = await axios.get("https://markdown-presentation.onrender.com/api/slides")
        setAllSlides(slidesResponse.data)

        // Find current slide
        const currentSlide = slidesResponse.data.find((s: Slide) => s.id === Number(id))
        if (currentSlide) {
          setSlide(currentSlide)
          const index = slidesResponse.data.findIndex((s: Slide) => s.id === Number(id))
          setCurrentSlideIndex(index >= 0 ? index : 0)
        }

        setLoading(false)
      } catch (error) {
        console.error("Error fetching slides:", error)
        setLoading(false)
      }
    }

    if (id) {
      fetchData()
    }
  }, [id])

  const handleSave = async () => {
    if (!slide) return
    setSaving(true)
    try {
      await axios.put(`https://markdown-presentation.onrender.com/api/slides/${slide.id}`, {
        title: slide.title,
        markdown: slide.markdown,
        layout: slide.layout,
      })

      // Update local state
      setAllSlides((prev) => prev.map((s) => (s.id === slide.id ? slide : s)))
    } catch (error) {
      console.error("Error saving slide:", error)
      alert("Failed to save slide")
    } finally {
      setSaving(false)
    }
  }


  if (loading || !slide) {
    return (
      <div className="h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-lg text-gray-500">Loading...</div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-3 sm:px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          
          <span className="font-medium text-gray-700 text-sm sm:text-base hidden sm:block">Markdown Slides</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => navigate("/")}
            className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors"
          >
            Back
          </button>
          <button
            onClick={() => navigate(`/present/${slide.id}`)}
            className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors hidden sm:block"
          >
            Present
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      {/* Mobile Tabs */}
      <MobileTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Slide Thumbnails (Desktop) */}
        <div className="hidden md:block w-48 lg:w-56 bg-gray-50 border-r border-gray-200 p-3 overflow-y-auto">
        <LayoutSelector
              selectedLayout={slide.layout || "default"}
              onChange={(newLayout) => setSlide({ ...slide, layout: newLayout })}
            />
        </div>

        {/* Mobile Slides List */}
        {activeTab === "slides" && (
          <div className="flex-1 bg-white md:hidden overflow-y-auto">
            {/* {allSlides.map((slideItem, index) => (
              <SlideThumbnail
                key={slideItem.id}
                slideNumber={index + 1}
                title={slideItem.title}
                isActive={index === currentSlideIndex}
                onClick={() => {
                  handleSlideSelect(index)
                  setActiveTab("preview")
                }}
                isMobile={true}
              />
            ))} */}
          </div>
        )}

        {/* Mobile Layout Selector */}
        {activeTab === "layout" && (
          <div className="flex-1 bg-gray-50 md:hidden p-4">
            <LayoutSelector
              selectedLayout={slide.layout || "default"}
              onChange={(newLayout) => setSlide({ ...slide, layout: newLayout })}
              isMobile={true}
            />
          </div>
        )}

        {/* Center - Slide Preview */}
        {(activeTab === "preview" || window.innerWidth >= 768) && (
          <div className={`${activeTab === "preview" ? "flex-1" : "hidden"} md:flex md:flex-1 flex-col bg-white`}>
            {/* <SlideToolbar
              onPrevious={() => {
                if (currentSlideIndex > 0) {
                  handleSlideSelect(currentSlideIndex - 1)
                }
              }}
              onNext={() => {
                if (currentSlideIndex < allSlides.length - 1) {
                  handleSlideSelect(currentSlideIndex + 1)
                }
              }}
              onFullscreen={() => navigate(`/present/${slide.id}`)}
              onAdd={() => navigate("/create")}
              onSettings={() => {}}
              canGoPrevious={currentSlideIndex > 0}
              canGoNext={currentSlideIndex < allSlides.length - 1}
            /> */}
            <div className="flex-1 p-3 sm:p-4 lg:p-8 flex items-center justify-center bg-gray-50">
              <div className="w-full max-w-4xl aspect-video bg-white rounded-lg shadow-lg overflow-hidden">
                <SlideViewer markdown={slide.markdown} layout={slide.layout || "default"} title={slide.title} />
              </div>
            </div>
          </div>
        )}

        {/* Mobile Editor */}
        {activeTab === "editor" && (
          <div className="flex-1 bg-white md:hidden flex flex-col">
            <div className="p-3 border-b border-gray-200">
              <input
                type="text"
                value={slide.title}
                onChange={(e) => setSlide({ ...slide, title: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Slide title..."
              />
            </div>
            <div className="flex-1 p-3">
              <EnhancedEditor value={slide.markdown} onChange={(value) => setSlide({ ...slide, markdown: value })} />
            </div>
          </div>
        )}

        {/* Right Sidebar - Editor & Layout (Desktop) */}
        <div className="hidden md:flex w-80 lg:w-96 bg-white border-l border-gray-200 flex-col">
          <div className="p-3 border-b border-gray-200">
            <input
              type="text"
              value={slide.title}
              onChange={(e) => setSlide({ ...slide, title: e.target.value })}
              className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 mb-3"
              placeholder="Slide title..."
            />
          </div>
          <div className="flex-1 p-3">
            <EnhancedEditor value={slide.markdown} onChange={(value) => setSlide({ ...slide, markdown: value })} />
          </div>
        </div>
      </div>
    </div>
  )
}
