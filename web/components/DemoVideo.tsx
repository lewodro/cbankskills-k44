'use client'

import { useEffect, useRef, useState } from 'react'
import { getEmbedUrl } from '@/content/demos'

interface DemoVideoProps {
  videoId: string
  label?: string
}

export function DemoVideo({ videoId, label }: DemoVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const iframeRef    = useRef<HTMLIFrameElement>(null)
  const [hasPlayed,  setHasPlayed] = useState(false)
  const [hovered,    setHovered]   = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed) setHasPlayed(true)
      },
      { threshold: 0.4 }
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [hasPlayed])

  function handleFullscreen() {
    const el = iframeRef.current ?? containerRef.current
    el?.requestFullscreen?.()
  }

  return (
    <div ref={containerRef} className="w-full">
      <div
        className="relative w-full aspect-video rounded-xl overflow-hidden border border-border bg-surface-alt"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {hasPlayed ? (
          <iframe
            ref={iframeRef}
            src={getEmbedUrl(videoId)}
            className="absolute inset-0 w-full h-full"
            allow="autoplay; fullscreen"
            allowFullScreen
            title="Skill demo"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-surface-alt">
            <div className="flex flex-col items-center gap-2 text-text-subtle">
              <svg className="w-10 h-10 opacity-30" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span className="text-xs">Loading demo...</span>
            </div>
          </div>
        )}

        {/* Fullscreen button — appears on hover once video is loaded */}
        {hasPlayed && (
          <button
            onClick={handleFullscreen}
            aria-label="Fullscreen"
            style={{
              position: 'absolute',
              bottom: 10,
              right: 10,
              width: 30,
              height: 30,
              borderRadius: 6,
              background: 'rgba(0,0,0,0.55)',
              border: '1px solid rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.15s ease',
              backdropFilter: 'blur(4px)',
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 3 21 3 21 9" />
              <polyline points="9 21 3 21 3 15" />
              <line x1="21" y1="3" x2="14" y2="10" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
          </button>
        )}
      </div>
      <p className="mt-2 text-xs text-text-subtle">
        {label ?? 'Live demo — recorded in Claude'}
      </p>
    </div>
  )
}