"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import EnhancedEditor from "../components/enhanced-editor"
import SlideViewer from "../components/SlideViewer"
import MobileTabs from "../components/mobile-tabs"
import LayoutSelector from "../components/layout-selector"

export default function AddSlide() {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [layout, setLayout] = useState("default")
  const [markdown, setMarkdown] = useState(
    "# Introducing *Markdown Slides*\n\n---\n\nMarkdown is a lightweight markup language that allows you to format plain text documents. It is easy to learn and widely used for creating documents and web pages.\n\nNow you can make **presentations** in markdown. This web application transforms the markup language into simple slide decks to draft, share, or present.",
  )
  const [saving, setSaving] = useState(false)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [activeTab, setActiveTab] = useState("preview") // For mobile tabs

  // Mock slides for demonstration
  const mockSlides = [
    { id: 1, title: "Introducing Markdown Slides", content: markdown, layout: layout },
    {
      id: 2,
      title: "Creating Presentations",
      content: "# Creating Presentations\n\nEasy and fast...",
      layout: "two-column",
    },
    { id: 3, title: "Basic Syntax", content: "# Basic Syntax\n\nLearn the basics...", layout: "default" },
    { id: 4, title: "Making Lists", content: "# Making Lists\n\n- Item 1\n- Item 2", layout: "center" },
    { id: 5, title: "Using Images", content: "# Using Images\n\n![Example](image.jpg)", layout: "image-text" },
  ]

  const tabs = [
    { id: "preview", label: "Preview", icon: "👁" },
    { id: "editor", label: "Edit", icon: "✏️" },
    { id: "layout", label: "Layout", icon: "🎨" },
  ]

  const handleSubmit = async () => {
    if (!title.trim() || !markdown.trim()) {
      alert("Title and markdown are required.")
      return
    }

    setSaving(true)
    try {
      await axios.post("https://markdown-presentation.onrender.com/api/slides", {
        title,
        layout,
        markdown,
      })
      navigate("/")
    } catch (error) {
      console.error("Error saving slide:", error)
      alert("Failed to save slide")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-3 sm:px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-black rounded flex items-center justify-center">
            <span className="text-white font-bold text-xs sm:text-sm">M</span>
          </div>
          <span className="font-medium text-gray-700 text-sm sm:text-base hidden sm:block">Markdown Slides</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => navigate("/")}
            className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
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
         
        </div>

        {/* Mobile Slides List */}
        {activeTab === "slides" && (
          <div className="flex-1 bg-white md:hidden overflow-y-auto">
            
          </div>
        )}

        {/* Mobile Layout Selector */}
        {activeTab === "layout" && (
          <div className="flex-1 bg-gray-50 md:hidden p-4">
            <LayoutSelector selectedLayout={layout} onChange={setLayout} isMobile={true} />
          </div>
        )}

        {/* Center - Slide Preview */}
        {(activeTab === "preview" || window.innerWidth >= 768) && (
          <div className={`${activeTab === "preview" ? "flex-1" : "hidden"} md:flex md:flex-1 flex-col bg-white`}>
            
            <div className="flex-1 p-3 sm:p-4 lg:p-8 flex items-center justify-center bg-gray-50">
              <div className="w-full max-w-4xl aspect-video bg-white rounded-lg shadow-lg overflow-hidden">
                <SlideViewer
                  markdown={currentSlideIndex === 0 ? markdown : mockSlides[currentSlideIndex].content}
                  layout={currentSlideIndex === 0 ? layout : mockSlides[currentSlideIndex].layout}
                  title={currentSlideIndex === 0 ? title : mockSlides[currentSlideIndex].title}
                />
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Slide title..."
              />
            </div>
            <div className="flex-1 p-3">
              <EnhancedEditor value={markdown} onChange={setMarkdown} />
            </div>
          </div>
        )}

        {/* Right Sidebar - Editor & Layout (Desktop) */}
        <div className="hidden md:flex w-80 lg:w-96 bg-white border-l border-gray-200 flex-col">
          <div className="p-3 border-b border-gray-200">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 mb-3"
              placeholder="Slide title..."
            />
            <LayoutSelector selectedLayout={layout} onChange={setLayout} />
          </div>
          <div className="flex-1 p-3">
            <EnhancedEditor value={markdown} onChange={setMarkdown} />
          </div>
        </div>
      </div>
    </div>
  )
}
