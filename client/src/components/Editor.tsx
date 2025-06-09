"use client"

type Props = {
  value: string
  onChange: (value: string) => void
}

const Editor = ({ value, onChange }: Props) => {
  return (
    <textarea
      className="w-full h-64 sm:h-80 p-4 bg-white text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none font-mono text-sm"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter your markdown here..."
    />
  )
}

export default Editor
