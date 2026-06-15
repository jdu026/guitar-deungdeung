import {
  STRING_COUNT,
  STRING_GAP,
  START_Y,
  LEFT_X,
  STRING_NAMES,
} from "../data/techniques"
import { getThemeColors } from "./theme"

export function drawBase(ctx, W, H, highlightStr = -1, waveAmp = 0) {
  const c = getThemeColors()
  ctx.clearRect(0, 0, W, H)
  for (let i = 0; i < STRING_COUNT; i++) {
    const y = START_Y + i * STRING_GAP
    ctx.save()
    ctx.font = "11px monospace"
    ctx.fillStyle = c.secondary
    ctx.textAlign = "right"
    ctx.fillText(STRING_NAMES[i], LEFT_X - 8, y + 4)
    ctx.restore()

    const isHi = i === highlightStr
    ctx.beginPath()
    ctx.strokeStyle = isHi ? c.blue : c.lineColor
    ctx.lineWidth = isHi ? 1.6 : 0.75
    if (isHi && waveAmp > 0) {
      ctx.moveTo(LEFT_X, y)
      for (let x = LEFT_X; x <= W - 20; x += 2) {
        ctx.lineTo(x, y + waveAmp * Math.sin((x - LEFT_X) * 0.09 + waveAmp * 10))
      }
    } else {
      ctx.moveTo(LEFT_X, y)
      ctx.lineTo(W - 20, y)
    }
    ctx.stroke()
  }
  return c
}

export function drawCaption(ctx, W, H, text, color) {
  ctx.save()
  ctx.font = "bold 15px monospace"
  ctx.fillStyle = color
  ctx.textAlign = "center"
  ctx.fillText(text, W / 2, H - 22)
  ctx.restore()
}
