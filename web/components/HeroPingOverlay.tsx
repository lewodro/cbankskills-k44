'use client'

import { useEffect, useRef, useState } from 'react'

const TILE_W  = 52
const TILE_H  = 28
const DX      = 18   // diamond half-width
const DY      = 10   // diamond half-height
const CDEPTH  = 11   // mini-crystal cube depth — DY*1.16 matches large cube proportions

const STEP_MS  = 440  // cinematic pace — each tile step
const MERGE_MS = 4200 // crystal hold duration
const PAUSE_MS = 1300 // gap after crystal fades
const MAX_AGE  = 2    // trail decay levels after head departs

const TILE_DARK = 'rgba(13,31,20,0.34)'  // matches --text token at 34% opacity

interface GridPt    { r: number; c: number; x: number; y: number }
interface ActiveTile { id: number; x: number; y: number; age: number }
interface Crystal    { id: number; x: number; y: number }

let uid = 0

function buildGrid(cols: number, rows: number): GridPt[][] {
  return Array.from({ length: rows + 2 }, (_, r) =>
    Array.from({ length: cols + 2 }, (_, c) => ({
      r, c,
      x: 26 + c * TILE_W,
      y: 14 + r * TILE_H,
    }))
  )
}

// Cube panel: right:0, width:55%, viewBox "0 0 540 500"
// Block cells that overlap the green 3D cubes so crystal never spawns there
const CUBE_DEFS: [number, number, number, number][] = [
  [300,  55, 130, 120],
  [360, 220,  92,  86],
  [210, 320,  72,  66],
  [454, 140,  56,  52],
  [165, 175,  80,  72],
]

function computeBlocked(
  vpW: number, vpH: number,
  gridRows: number, gridCols: number
): Set<string> {
  const panelLeft = vpW * 0.45
  const scaleX    = (vpW * 0.55) / 540
  const scaleY    = (vpH - 60) / 500
  const b = new Set<string>()

  for (const [vx, vy, vw, vh] of CUBE_DEFS) {
    const c1 = Math.floor((panelLeft + vx * scaleX - 26) / TILE_W) - 1
    const c2 = Math.ceil( (panelLeft + (vx + vw) * scaleX - 26) / TILE_W) + 1
    const r1 = Math.floor((vy * scaleY - 14) / TILE_H) - 1
    const r2 = Math.ceil( ((vy + vh) * scaleY - 14) / TILE_H) + 1
    for (let r = Math.max(0, r1); r <= Math.min(gridRows - 1, r2); r++)
      for (let c = Math.max(0, c1); c <= Math.min(gridCols - 1, c2); c++)
        b.add(`${r},${c}`)
  }
  return b
}

export default function HeroPingOverlay() {
  const [grid,    setGrid]    = useState<GridPt[][]>([])
  const [blocked, setBlocked] = useState<Set<string>>(new Set())
  const [tiles,   setTiles]   = useState<ActiveTile[]>([])
  const [crystal, setCrystal] = useState<Crystal | null>(null)

  const alive  = useRef(true)
  const stepIv = useRef<ReturnType<typeof setInterval> | null>(null)
  const schedT = useRef<ReturnType<typeof setTimeout>  | null>(null)

  useEffect(() => {
    const cols = Math.ceil(window.innerWidth  / TILE_W) + 1
    const rows = Math.ceil((window.innerHeight - 60) / TILE_H) + 1
    setGrid(buildGrid(cols, rows))
    setBlocked(computeBlocked(window.innerWidth, window.innerHeight, rows + 2, cols + 2))
  }, [])

  useEffect(() => {
    if (!grid.length || !grid[0].length) return
    alive.current = true

    const later = (fn: () => void, ms: number) => { schedT.current = setTimeout(fn, ms) }

    const spawnEvent = () => {
      if (!alive.current) return
      const rows = grid.length
      const cols = grid[0].length

      // Wider column zone: cubes are handled by blocked-cell check, not lo/hi alone
      const lo = Math.floor(cols * 0.36)
      const hi = Math.max(lo + 14, cols - 2)

      // n (arm length) derived from available column room so cMin < cMax always holds
      const maxArm = Math.max(3, Math.floor((hi - lo) / 2) - 1)
      const n = 3 + Math.floor(Math.random() * Math.min(4, maxArm - 2))

      // Randomly pick V (converge from above) or ^ (converge from below)
      const fromBelow = Math.random() < 0.45

      let meetR = 0, meetC = 0, valid = false
      for (let a = 0; a < 50; a++) {
        const rMin = fromBelow ? 2 : n + 1
        const rMax = fromBelow ? rows - n - 1 : Math.floor(rows * 0.78)
        if (rMin >= rMax) continue

        meetR = rMin + Math.floor(Math.random() * (rMax - rMin))

        const cMin = lo + n
        const cMax = hi - n
        if (cMin > cMax) continue

        meetC = cMin + Math.floor(Math.random() * Math.max(1, cMax - cMin))

        if (!blocked.has(`${meetR},${meetC}`)) { valid = true; break }
      }
      if (!valid) return

      // Build symmetric V-paths along the two diagonal axes of the isometric grid
      // Signal A: left arm  — col decreases away from meet, converges right  (+col each step)
      // Signal B: right arm — col increases away from meet, converges left   (-col each step)
      const pathA: GridPt[] = []
      const pathB: GridPt[] = []

      for (let i = 0; i <= n; i++) {
        // Row: approach meeting row from above (V) or below (^)
        const r = fromBelow
          ? Math.max(0,        meetR + n - i)  // starts low, moves up
          : Math.min(rows - 1, meetR - n + i)  // starts high, moves down

        const cA = Math.max(0,        meetC - n + i)
        const cB = Math.min(cols - 1, meetC + n - i)

        pathA.push(grid[r][cA])
        pathB.push(grid[r][cB])
      }

      // Activate first tiles immediately
      setTiles([
        { id: uid++, x: pathA[0].x, y: pathA[0].y, age: 0 },
        { id: uid++, x: pathB[0].x, y: pathB[0].y, age: 0 },
      ])

      let step = 0

      stepIv.current = setInterval(() => {
        if (!alive.current) { clearInterval(stepIv.current!); return }
        step++

        if (step >= n) {
          // Signals converge — crystallize
          clearInterval(stepIv.current!); stepIv.current = null
          setTiles([])

          const meet = grid[meetR][meetC]
          const cid  = uid++
          setCrystal({ id: cid, x: meet.x, y: meet.y })

          later(() => {
            if (!alive.current) return
            setCrystal(null)
            later(spawnEvent, PAUSE_MS)
          }, MERGE_MS)

        } else {
          setTiles(prev => {
            // Age existing tiles; remove those past trail limit
            const aged = prev
              .map(t => ({ ...t, age: t.age + 1 }))
              .filter(t => t.age <= MAX_AGE)
            // Activate new tiles at current signal positions
            return [
              ...aged,
              { id: uid++, x: pathA[step].x, y: pathA[step].y, age: 0 },
              { id: uid++, x: pathB[step].x, y: pathB[step].y, age: 0 },
            ]
          })
        }
      }, STEP_MS)
    }

    later(spawnEvent, 900)

    return () => {
      alive.current = false
      if (stepIv.current) clearInterval(stepIv.current)
      if (schedT.current)  clearTimeout(schedT.current)
    }
  }, [grid, blocked])

  return (
    <svg
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        overflow: 'visible',
        zIndex: 0,
        // Pan in lock-step with .hero-bg diamondPan — same duration/easing
        animation: 'overlayPan 30s linear infinite',
      }}
    >
      <defs>
        {/* Green gradients matching the hero 3D cubes exactly */}
        <linearGradient id="mc-top"  x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#dceee4" />
          <stop offset="100%" stopColor="#c0dccb" />
        </linearGradient>
        <linearGradient id="mc-left" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#a8d4be" />
          <stop offset="100%" stopColor="#7bbf9e" />
        </linearGradient>
        <linearGradient id="mc-rite" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#c0dccb" />
          <stop offset="100%" stopColor="#96c8ae" />
        </linearGradient>
        <filter id="mc-ds" x="-80%" y="-80%" width="260%" height="260%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(46,139,87,0.35)" />
        </filter>
      </defs>

      {/* Dark activation tiles — each mounts fresh with tilePop, decays via opacity transition */}
      {tiles.map(t => {
        const op = t.age === 0 ? 0.34 : t.age === 1 ? 0.17 : 0.07
        return (
          <g key={t.id} transform={`translate(${t.x},${t.y})`}>
            <polygon
              points={`0,${-DY} ${DX},0 0,${DY} ${-DX},0`}
              fill={TILE_DARK}
              stroke={TILE_DARK}
              strokeWidth="0.4"
              style={{
                opacity: op,
                transition: 'opacity 300ms ease',
                animation: t.age === 0 ? 'tilePop 200ms ease-out' : 'none',
              }}
            />
          </g>
        )
      })}

      {/* Mini 3D green crystal — same visual language as hero cubes, fits one grid tile */}
      {crystal && (
        <g key={crystal.id} transform={`translate(${crystal.x},${crystal.y})`}>
          {/* Animation wrapper — scales from the crystal's own center (0,0) */}
          <g
            filter="url(#mc-ds)"
            style={{
              animation: `crystalEmerge ${MERGE_MS}ms ease-in-out forwards`,
              transformOrigin: '0px 0px',
            }}
          >
            {/* Top face — same footprint as grid diamond tile */}
            <polygon
              points={`0,${-DY} ${DX},0 0,${DY} ${-DX},0`}
              fill="url(#mc-top)"
              opacity="0.94"
            />
            {/* Left face */}
            <polygon
              points={`${-DX},0 0,${DY} 0,${DY + CDEPTH} ${-DX},${CDEPTH}`}
              fill="url(#mc-left)"
              opacity="0.94"
            />
            {/* Right face */}
            <polygon
              points={`0,${DY} ${DX},0 ${DX},${CDEPTH} 0,${DY + CDEPTH}`}
              fill="url(#mc-rite)"
              opacity="0.94"
            />
          </g>
        </g>
      )}

      <style>{`
        /* Dark tile rises from the grid surface as signal passes through */
        @keyframes tilePop {
          0%   { opacity: 0;    transform: scale(0.25); }
          52%  { opacity: 0.44; transform: scale(1.08); }
          100% { opacity: 0.34; transform: scale(1.00); }
        }

        /* Mini crystal: emerges from tile, holds, sinks back */
        @keyframes crystalEmerge {
          0%   { opacity: 0;    transform: scale(0.10) translateY(8px);  }
          9%   { opacity: 1.00; transform: scale(1.20) translateY(-4px); }
          17%  { opacity: 0.96; transform: scale(1.00) translateY(0);    }
          70%  { opacity: 0.92; transform: scale(1.00) translateY(0);    }
          87%  { opacity: 0;    transform: scale(0.45) translateY(5px);  }
          100% { opacity: 0;    transform: scale(0.15) translateY(10px); }
        }
      `}</style>
    </svg>
  )
}
