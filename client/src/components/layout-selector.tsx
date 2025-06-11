"use client"

import type React from "react"

import { useState } from "react"

type Layout = {
  id: string
  name: string
  description: string
  preview: React.ReactNode
}

type LayoutSelectorProps = {
  selectedLayout: string
  onChange: (layout: string) => void
  isMobile?: boolean
}

const LayoutSelector = ({ selectedLayout, onChange, isMobile = false }: LayoutSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const layouts: Layout[] = [
    {
      id: "default",
      name: "Default",
      description: "Standard content layout",
      preview: (
        <div className="flex flex-col h-full p-2">
          <div className="h-1 w-8 bg-gray-400 mb-1"></div>
          <div className="h-0.5 w-full bg-gray-300 mb-0.5"></div>
          <div className="h-0.5 w-full bg-gray-300 mb-0.5"></div>
          <div className="h-0.5 w-3/4 bg-gray-300"></div>
        </div>
      ),
    },
    {
      id: "title",
      name: "Title Slide",
      description: "Large centered title",
      preview: (
        <div className="flex flex-col items-center justify-center h-full p-2">
          <div className="h-1.5 w-10 bg-gray-400 mb-1"></div>
          <div className="h-0.5 w-6 bg-gray-300"></div>
        </div>
      ),
    },
    {
      id: "two-column",
      name: "Two Column",
      description: "Side-by-side content",
      preview: (
        <div className="flex h-full p-2 gap-1">
          <div className="flex-1 flex flex-col">
            <div className="h-1 w-6 bg-gray-400 mb-1"></div>
            <div className="h-0.5 w-full bg-gray-300 mb-0.5"></div>
            <div className="h-0.5 w-3/4 bg-gray-300"></div>
          </div>
          <div className="flex-1 flex flex-col">
            <div className="h-1 w-6 bg-gray-400 mb-1"></div>
            <div className="h-0.5 w-full bg-gray-300 mb-0.5"></div>
            <div className="h-0.5 w-3/4 bg-gray-300"></div>
          </div>
        </div>
      ),
    },
    {
      id: "image-text",
      name: "Image & Text",
      description: "Image with text content",
      preview: (
        <div className="flex h-full p-2 gap-1">
          <div className="w-1/3 bg-gray-300 rounded-sm"></div>
          <div className="flex-1 flex flex-col">
            <div className="h-1 w-8 bg-gray-400 mb-1"></div>
            <div className="h-0.5 w-full bg-gray-300 mb-0.5"></div>
            <div className="h-0.5 w-3/4 bg-gray-300"></div>
          </div>
        </div>
      ),
    },
    {
      id: "quote",
      name: "Quote",
      description: "Large quote with attribution",
      preview: (
        <div className="flex flex-col items-center justify-center h-full p-2">
          <div className="text-lg font-serif text-gray-400 mb-1">"</div>
          <div className="h-0.5 w-8 bg-gray-300 mb-1"></div>
          <div className="h-0.5 w-4 bg-gray-300"></div>
        </div>
      ),
    },
    {
      id: "center",
      name: "Centered",
      description: "Centered content layout",
      preview: (
        <div className="flex flex-col items-center justify-center h-full p-2">
          <div className="h-1 w-8 bg-gray-400 mb-1"></div>
          <div className="h-0.5 w-10 bg-gray-300 mb-0.5"></div>
          <div className="h-0.5 w-6 bg-gray-300"></div>
        </div>
      ),
    },
    {
      id: "section",
      name: "Section",
      description: "Section divider slide",
      preview: (
        <div className="flex flex-col items-center justify-center h-full p-2 bg-gray-100">
          <div className="h-1.5 w-8 bg-gray-500 mb-1"></div>
          <div className="h-0.5 w-6 bg-gray-400"></div>
        </div>
      ),
    },
    {
      id: "blank",
      name: "Blank",
      description: "Empty slide",
      preview: (
        <div className="h-full border border-dashed border-gray-300 flex items-center justify-center">
          <div className="text-xs text-gray-400">Blank</div>
        </div>
      ),
    },
  ]

  if (isMobile) {
    return (
      <div className="space-y-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-8 border border-gray-200 rounded bg-white">
              {layouts.find((l) => l.id === selectedLayout)?.preview}
            </div>
            <div className="text-left">
              <div className="font-medium text-sm">{layouts.find((l) => l.id === selectedLayout)?.name}</div>
              <div className="text-xs text-gray-500">{layouts.find((l) => l.id === selectedLayout)?.description}</div>
            </div>
          </div>
          <span className="text-gray-400">{isOpen ? "▲" : "▼"}</span>
        </button>

        {isOpen && (
          <div className="grid grid-cols-2 gap-2 p-3 bg-white border border-gray-200 rounded-lg">
            {layouts.map((layout) => (
              <button
                key={layout.id}
                onClick={() => {
                  onChange(layout.id)
                  setIsOpen(false)
                }}
                className={`p-2 rounded-lg border transition-all ${
                  selectedLayout === layout.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="w-full h-12 border border-gray-200 rounded bg-white mb-2">{layout.preview}</div>
                <div className="text-xs font-medium text-center">{layout.name}</div>
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Layout</h3>
      <div className="grid grid-cols-2 gap-2">
        {layouts.map((layout) => (
          <button
            key={layout.id}
            onClick={() => onChange(layout.id)}
            className={`p-2 rounded-lg border transition-all group ${
              selectedLayout === layout.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
            title={layout.description}
          >
            <div className="w-full h-12 border border-gray-200 rounded bg-white mb-2">{layout.preview}</div>
            <div className="text-xs font-medium text-center">{layout.name}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default LayoutSelector
