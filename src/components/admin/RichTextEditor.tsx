"use client"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Youtube from "@tiptap/extension-youtube"
import TextAlign from "@tiptap/extension-text-align"
import Underline from "@tiptap/extension-underline"
import { useState, useEffect } from "react"
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Image as ImageIcon, 
  Video,
  Undo,
  Redo
} from "lucide-react"

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

export default function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
  const [showImageModal, setShowImageModal] = useState(false)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const [uploading, setUploading] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Fix SSR hydration issues
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto',
        },
      }),
      Youtube.configure({
        width: 640,
        height: 480,
        HTMLAttributes: {
          class: 'rounded-lg',
        },
      }),
    ],
    content,
    immediatelyRender: false, // Fix SSR issues
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4',
      },
    },
  })

  // Update editor content when prop changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  const uploadImage = async (file: File) => {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()
      if (result.success) {
        editor?.chain().focus().setImage({ src: result.data.url }).run()
      } else {
        alert('Error al subir imagen')
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Error al subir imagen')
    } finally {
      setUploading(false)
    }
  }

  const addImage = () => {
    if (imageUrl) {
      editor?.chain().focus().setImage({ src: imageUrl }).run()
      setImageUrl("")
      setShowImageModal(false)
    }
  }

  const addYouTubeVideo = () => {
    if (videoUrl) {
      editor?.chain().focus().setYoutubeVideo({ src: videoUrl }).run()
      setVideoUrl("")
      setShowVideoModal(false)
    }
  }

  // Don't render until mounted to avoid hydration issues
  if (!isMounted || !editor) {
    return (
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <div className="border-b border-gray-300 p-2 flex flex-wrap gap-1 bg-gray-50">
          <div className="animate-pulse bg-gray-200 h-8 w-8 rounded"></div>
          <div className="animate-pulse bg-gray-200 h-8 w-8 rounded"></div>
          <div className="animate-pulse bg-gray-200 h-8 w-8 rounded"></div>
        </div>
        <div className="min-h-[200px] p-4 flex items-center justify-center">
          <div className="text-gray-500">Cargando editor...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="border-b border-gray-300 p-2 flex flex-wrap gap-1 bg-gray-50">
        {/* Text formatting */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${
            editor.isActive('bold') ? 'bg-gray-300' : ''
          }`}
          title="Negrita"
        >
          <Bold className="w-4 h-4" />
        </button>
        
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${
            editor.isActive('italic') ? 'bg-gray-300' : ''
          }`}
          title="Cursiva"
        >
          <Italic className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${
            editor.isActive('underline') ? 'bg-gray-300' : ''
          }`}
          title="Subrayado"
        >
          <UnderlineIcon className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        {/* Text alignment */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${
            editor.isActive({ textAlign: 'left' }) ? 'bg-gray-300' : ''
          }`}
          title="Alinear izquierda"
        >
          <AlignLeft className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${
            editor.isActive({ textAlign: 'center' }) ? 'bg-gray-300' : ''
          }`}
          title="Centrar"
        >
          <AlignCenter className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${
            editor.isActive({ textAlign: 'right' }) ? 'bg-gray-300' : ''
          }`}
          title="Alinear derecha"
        >
          <AlignRight className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        {/* Media */}
        <button
          type="button"
          onClick={() => setShowImageModal(true)}
          className="p-2 rounded hover:bg-gray-200 transition-colors"
          title="Insertar imagen"
        >
          <ImageIcon className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => setShowVideoModal(true)}
          className="p-2 rounded hover:bg-gray-200 transition-colors"
          title="Insertar video de YouTube"
        >
          <Video className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1"></div>

        {/* Undo/Redo */}
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 transition-colors"
          title="Deshacer"
        >
          <Undo className="w-4 h-4" />
        </button>

          <button
            type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 transition-colors"
          title="Rehacer"
        >
          <Redo className="w-4 h-4" />
          </button>
      </div>

      {/* Editor content */}
      <div className="min-h-[200px] max-h-[500px] overflow-y-auto">
        <EditorContent 
          editor={editor}
          className="prose prose-sm max-w-none"
        />
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Insertar Imagen</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subir archivo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      uploadImage(file)
                      setShowImageModal(false)
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  disabled={uploading}
                />
              </div>

              <div className="text-center text-gray-500">o</div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL de imagen
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <button
                type="button"
                onClick={() => {
                  setShowImageModal(false)
                  setImageUrl("")
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={addImage}
                disabled={!imageUrl || uploading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {uploading ? "Subiendo..." : "Insertar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Insertar Video de YouTube</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL del video
              </label>
              <input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <p className="text-sm text-gray-500 mt-1">
                Pega la URL completa del video de YouTube
              </p>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <button
                type="button"
                onClick={() => {
                  setShowVideoModal(false)
                  setVideoUrl("")
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={addYouTubeVideo}
                disabled={!videoUrl}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                Insertar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
