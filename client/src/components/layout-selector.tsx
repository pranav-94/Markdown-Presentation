"use client"

import type React from "react"
import LayoutThumbnail from "./layout-thumbnails"

type LayoutSelectorProps = {
  selectedLayout: string
  onChange: (layout: string) => void
}

const LayoutSelector: React.FC<LayoutSelectorProps> = ({ selectedLayout, onChange }) => {
  const layouts = [
    "default",
    "title",
    "blank",
    "quote"
  ]

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4">
      <h3 className="text-sm font-medium mb-3">Select Layout</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {layouts.map((layout) => (
          <LayoutThumbnail
            key={layout}
            layout={layout}
            selected={selectedLayout === layout}
            onClick={() => onChange(layout)}
          />
        ))}
      </div>
    </div>
  )
}

export default LayoutSelector
