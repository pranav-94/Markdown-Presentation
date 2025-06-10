"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import type { Slide } from "../types"
import Editor from "../components/Editor"
import SlideViewer from "../components/SlideViewer"
import LayoutSelector from "../components/layout-selector"
// import LayoutPreview from "../components/layout-preview"

export default function EditSlide() {
  const { id } = useParams<{ id: string }>()
  const [slide, setSlide] = useState<Slide | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showLayoutSelector, setShowLayoutSelector] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      axios.get(`https://markdown-presentation.onrender.com/api/slides/${id}`).then((res) => {
        setSlide(res.data)
        setLoading(false)
      })
    }
  }, [id])

  const handleSave = async () => {
    if (!slide) return
    setSaving(true)
    await axios.put(`https://markdown-presentation.onrender.com/api/slides/${slide.id}`, {
      title: slide.title,
      markdown: slide.markdown,
      layout: slide.layout,
    })
    setSaving(false)
    alert("Slide saved!")
  }

  if (loading || !slide) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold mb-8">Edit Slide</h1>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={slide.title}
                  onChange={(e) => setSlide({ ...slide, title: e.target.value })}
                  className="w-full px-4 py-3 bg-white text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>

              <div>
          

                <button
                  onClick={() => setShowLayoutSelector(!showLayoutSelector)}
                  className="w-full px-4 py-3 bg-white text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-left flex justify-between items-center"
                >
                  <span className="capitalize">{slide.layout.replace(/-/g, " ")}</span>
                  <span className="text-gray-500">{showLayoutSelector ? "▲" : "▼"}</span>
                </button>

                {showLayoutSelector && (
                  <div className="mt-2">
                    <LayoutSelector
                      selectedLayout={slide.layout}
                      onChange={(newLayout) => {
                        setSlide({ ...slide, layout: newLayout })
                        setShowLayoutSelector(false)
                      }}
                    />
                  </div>
                )}

        
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Markdown</label>
                <Editor value={slide.markdown} onChange={(value) => setSlide({ ...slide, markdown: value })} />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => navigate("/")}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
                >
                  Back
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Live Preview</h2>
            <div className="bg-white text-black rounded-lg p-6 min-h-96 border">
              <SlideViewer markdown={slide.markdown} layout={slide.layout} title={slide.title} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
