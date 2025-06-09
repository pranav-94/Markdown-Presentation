"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Editor from "../components/Editor"
import SlideViewer from "../components/SlideViewer"

export default function AddSlide() {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [layout, setLayout] = useState("default")
  const [markdown, setMarkdown] = useState("")
  const [saving, setSaving] = useState(false)

  const handleSubmit = async () => {
    if (!title.trim() || !markdown.trim()) {
      alert("Title and markdown are required.")
      return
    }

    setSaving(true)
    await axios.post("http://localhost:3000/api/slides", {
      title,
      layout,
      markdown,
    })

    setSaving(false)
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold mb-8">Create New Slide</h1>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-white text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  placeholder="Enter slide title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Layout</label>
                <select
                  value={layout}
                  onChange={(e) => setLayout(e.target.value)}
                  className="w-full px-4 py-3 bg-white text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                >
                  <option value="default">Default</option>
                  <option value="title">Title Slide</option>
                  <option value="code">Code Layout</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Markdown</label>
                <Editor value={markdown} onChange={setMarkdown} />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => navigate("/")}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={saving}
                  className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? "Saving..." : "Create"}
                </button>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Live Preview</h2>
            <div className="bg-white text-black rounded-lg p-6 min-h-96">
              <SlideViewer markdown={markdown} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
