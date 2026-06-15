import { useRef, useEffect, useCallback } from "react"
import { drawBase } from "../canvas/drawBase"
import { drawers } from "../canvas/drawers"

export default function TabCanvas({ techId, progress }) {
  const canvasRef = useRef(null)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    const W = canvas.offsetWidth
    const H = 172
    canvas.width = W * dpr
    canvas.height = H * dpr
    const ctx = canvas.getContext("2d")
    ctx.scale(dpr, dpr)
    if (techId && drawers[techId]) {
      drawers[techId](ctx, W, H, progress)
    } else {
      drawBase(ctx, W, H)
    }
  }, [techId, progress])

  useEffect(() => {
    draw()
  }, [draw])

  useEffect(() => {
    const ro = new ResizeObserver(draw)
    if (canvasRef.current) ro.observe(canvasRef.current)
    return () => ro.disconnect()
  }, [draw])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: 172, display: "block" }}
    />
  )
}
