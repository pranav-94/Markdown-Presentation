"use client"

import type React from "react"

type LayoutThumbnailProps = {
  layout: string
  selected: boolean
  onClick: () => void
}

const LayoutThumbnail: React.FC<LayoutThumbnailProps> = ({ layout, selected, onClick }) => {
  const thumbnails: Record<string, React.ReactNode> = {
    default: (
      <div className="flex flex-col h-full">
        <div className="h-2 w-16 bg-slate-400 mb-1"></div>
        <div className="h-1 w-full bg-slate-300 mb-1"></div>
        <div className="h-1 w-full bg-slate-300 mb-1"></div>
        <div className="h-1 w-3/4 bg-slate-300"></div>
      </div>
    ),
    title: (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="h-2 w-16 bg-slate-400 mb-1"></div>
        <div className="h-1 w-12 bg-slate-300"></div>
      </div>
    ),
    quote: (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-lg font-serif text-slate-400">"</div>
        <div className="h-1 w-16 bg-slate-300 mb-1"></div>
        <div className="h-1 w-8 bg-slate-300"></div>
      </div>
    ),
    blank: (
      <div className="h-full border border-dashed border-slate-300 flex items-center justify-center">
        <div className="text-xs text-slate-400">Blank</div>
      </div>
    ),
  }

  const layoutName = layout.charAt(0).toUpperCase() + layout.slice(1).replace(/-/g, " ")

  return (
    <div
      className={`cursor-pointer p-2 rounded-lg ${selected ? "bg-slate-200 ring-2 ring-slate-500" : "hover:bg-slate-100"}`}
      onClick={onClick}
    >
      <div className="h-16 mb-2 border border-slate-300 rounded bg-white p-2">
        {thumbnails[layout] || thumbnails.default}
      </div>
      <div className="text-xs text-center font-medium">{layoutName}</div>
    </div>
  )
}

export default LayoutThumbnail
