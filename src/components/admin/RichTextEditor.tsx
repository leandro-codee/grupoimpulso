"use client"
import { useState, useRef } from "react"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
}

export default function RichTextEditor({
  value,
  onChange,
}: RichTextEditorProps) {
  const [activeButtons, setActiveButtons] = useState<string[]>([])
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const insertText = (before: string, after: string = "") => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)

    const newText =
      value.substring(0, start) +
      before +
      selectedText +
      after +
      value.substring(end)
    onChange(newText)

    // Restore selection
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, end + after.length)
    }, 0)
  }

  const formatButtons = [
    {
      label: "Negrita",
      icon: "B",
      action: () => insertText("**", "**"),
      key: "bold",
    },
    {
      label: "Cursiva",
      icon: "I",
      action: () => insertText("*", "*"),
      key: "italic",
    },
    {
      label: "Título",
      icon: "H1",
      action: () => insertText("\n## ", "\n"),
      key: "heading",
    },
    {
      label: "Lista",
      icon: "•",
      action: () => insertText("\n- ", ""),
      key: "list",
    },
    {
      label: "Enlace",
      icon: "🔗",
      action: () => insertText("[", "](URL)"),
      key: "link",
    },
    {
      label: "Cita",
      icon: '"',
      action: () => insertText("\n> ", "\n"),
      key: "quote",
    },
  ]

  return (
    <div className="border border-gray-300 rounded-md">
      {/* Toolbar */}
      <div className="flex items-center space-x-1 p-2 border-b border-gray-200 bg-gray-50">
        {formatButtons.map((button) => (
          <button
            key={button.key}
            type="button"
            onClick={button.action}
            className="p-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded"
            title={button.label}
          >
            {button.icon}
          </button>
        ))}
      </div>

      {/* Editor */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-64 p-3 border-0 resize-none focus:outline-none"
          placeholder="Escribe el contenido de la noticia aquí..."
        />
      </div>

      {/* Preview */}
      <details className="border-t border-gray-200">
        <summary className="p-2 bg-gray-50 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">
          Vista previa
        </summary>
        <div className="p-4 prose max-w-none">
          <div
            dangerouslySetInnerHTML={{
              __html: value
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                .replace(/\*(.*?)\*/g, "<em>$1</em>")
                .replace(/^## (.*$)/gm, "<h2>$1</h2>")
                .replace(/^- (.*$)/gm, "<li>$1</li>")
                .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
                .replace(/^> (.*$)/gm, "<blockquote>$1</blockquote>")
                .replace(/\n/g, "<br />"),
            }}
          />
        </div>
      </details>
    </div>
  )
}
