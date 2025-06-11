"use client"

import { useRef } from "react"

type Props = {
  value: string
  onChange: (value: string) => void
}

const EnhancedEditor = ({ value, onChange }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

//   const handleInsert = (text: string) => {
//     if (!textareaRef.current) return

//     const textarea = textareaRef.current
//     const start = textarea.selectionStart
//     const end = textarea.selectionEnd
//     const newValue = value.substring(0, start) + text + value.substring(end)

//     onChange(newValue)

//     // Set cursor position after inserted text
//     setTimeout(() => {
//       textarea.focus()
//       textarea.setSelectionRange(start + text.length, start + text.length)
//     }, 0)
//   }

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
