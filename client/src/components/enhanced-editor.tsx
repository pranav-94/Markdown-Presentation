"use client"

import { useRef } from "react"

type Props = {
  value: string
  onChange: (value: string) => void
}

const EnhancedEditor = ({ value, onChange }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  return (
    <div className="flex flex-col h-full bg-white border border-gray-200 rounded-lg overflow-hidden">
      <textarea
        ref={textareaRef}
        className="flex-1 p-3 sm:p-4 text-sm font-mono text-gray-800 resize-none focus:outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="# Slide Title

Your slide content goes here...

Use **markdown** to format your text."
      />
    </div>
  )
}

export default EnhancedEditor
