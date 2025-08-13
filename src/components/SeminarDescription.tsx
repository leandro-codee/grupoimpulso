"use client"

import { useEffect, useRef } from 'react'

interface SeminarDescriptionProps {
  description: string
}

export default function SeminarDescription({ description }: SeminarDescriptionProps) {
  const descriptionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (descriptionRef.current) {
      // Hacer que todos los iframes de YouTube sean responsivos
      const iframes = descriptionRef.current.querySelectorAll('iframe[src*="youtube.com"], iframe[src*="youtu.be"]')
      
      iframes.forEach((iframe) => {
        const iframeElement = iframe as HTMLIFrameElement
        
        // Verificar si ya tiene un wrapper
        if (iframeElement.parentElement?.classList.contains('video-wrapper')) {
          return // Ya está envuelto
        }
        
        // Crear wrapper responsivo
        const wrapper = document.createElement('div')
        wrapper.className = 'video-wrapper'
        wrapper.style.cssText = `
          position: relative;
          width: 100%;
          max-width: 100%;
          padding-bottom: 56.25%; /* Aspect ratio 16:9 */
          overflow: hidden;
          border-radius: 0.5rem;
          margin: 1rem 0;
        `
        
        // Aplicar estilos al iframe
        iframeElement.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
          border-radius: 0.5rem;
        `
        
        // Insertar wrapper y mover iframe
        iframeElement.parentNode?.insertBefore(wrapper, iframeElement)
        wrapper.appendChild(iframeElement)
      })
    }
  }, [description])

  return (
    <div 
      ref={descriptionRef}
      className="prose prose-lg max-w-none mb-8"
      dangerouslySetInnerHTML={{ __html: description }}
    />
  )
} 