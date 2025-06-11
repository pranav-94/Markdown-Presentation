"use client"

import { Link } from "react-router-dom"
import SlideViewer from "./SlideViewer"
import type { Slide } from "../types"

type SlideCardProps = {
  slide: Slide
  onDelete?: (id: number) => void
  onDuplicate?: (slide: Slide) => void
  isSelected?: boolean
  onSelect?: (id: number) => void
}

const SlideCard = ({ slide, isSelected }: SlideCardProps) => {

  const layoutIcons: Record<string, string> = {
    default: "📝",
    title: "🎯",
    "two-column": "📊",
    "image-text": "🖼️",
    quote: "💬",
    center: "🎪",
    section: "🎨",
    blank: "⬜",
  }

  const layoutNames: Record<string, string> = {
    default: "Default",
    title: "Title Slide",
    "two-column": "Two Column",
    "image-text": "Image & Text",
    quote: "Quote",
    center: "Centered",
    section: "Section",
    blank: "Blank",
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border transition-all duration-200 group hover:shadow-md ${
        isSelected ? "ring-2 ring-blue-500 border-blue-200" : "border-gray-200 hover:border-gray-300"
      }`}
 
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              
              <h3 className="text-lg font-medium text-gray-900 truncate">{slide.title}</h3>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                {layoutIcons[slide.layout || "default"]}
                {layoutNames[slide.layout || "default"]}
              </span>
              <span>•</span>
            </div>
          </div>

         
        </div>
      </div>

      <div className="bg-gray-50 aspect-video p-4 flex items-center justify-center overflow-hidden">
        <div className="transform scale-[0.7] w-full h-full origin-center">
          <SlideViewer markdown={slide.markdown} layout={slide.layout || "default"} title={slide.title} />
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex border-t border-gray-100">
        <Link
          to={`/edit/${slide.id}`}
          className="flex-1 py-3 text-center text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors border-r border-gray-100"
        >
          Edit
        </Link>
        <Link
          to={`/present/${slide.id}`}
          className="flex-1 py-3 text-center text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Present
        </Link>
      </div>
    </div>
  )
}

export default SlideCard
