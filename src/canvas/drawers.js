import { STRING_COUNT, STRING_GAP, START_Y, LEFT_X } from "../data/techniques.js"
import { getThemeColors } from "./theme.js"
import { drawBase, drawCaption } from "./drawBase.js"

export const drawers = {
  gliss_up(ctx, W, H, t) {
    const c = drawBase(ctx, W, H, 2);
    const sy = START_Y + 2 * STRING_GAP;
    const sx = LEFT_X + 55, ex = LEFT_X + 200;
    const prog = Math.min(t, 1);
    // ghost region
    ctx.fillStyle = c.blueLight;
    ctx.fillRect(sx - 8, sy - 14, 28, 26);
    // slash
    ctx.beginPath();
    ctx.strokeStyle = c.blue;
    ctx.lineWidth = 2;
    ctx.moveTo(sx, sy + 9);
    ctx.lineTo(sx + (ex - sx) * prog, sy - 9);
    ctx.stroke();
    // target
    if (t > 0.7) {
      ctx.save();
      ctx.globalAlpha = Math.min((t - 0.7) / 0.3, 1);
      ctx.font = "bold 14px monospace";
      ctx.fillStyle = c.blue;
      ctx.textAlign = "center";
      ctx.fillText("5", ex + 16, sy + 5);
      ctx.restore();
    }
    drawCaption(ctx, W, H, "/5", c.blue);
  },
  gliss_down(ctx, W, H, t) {
    const c = drawBase(ctx, W, H, 2);
    const sy = START_Y + 2 * STRING_GAP;
    const sx = LEFT_X + 70, ex = sx + 160;
    ctx.font = "bold 14px monospace";
    ctx.fillStyle = c.blue;
    ctx.textAlign = "center";
    ctx.fillText("5", sx, sy + 5);
    const prog = Math.min(t, 1);
    ctx.beginPath();
    ctx.strokeStyle = c.coral;
    ctx.lineWidth = 2;
    ctx.moveTo(sx + 14, sy - 8);
    ctx.lineTo(sx + 14 + (ex - sx) * prog, sy + 8);
    ctx.stroke();
    if (t > 0.5) {
      ctx.save();
      ctx.globalAlpha = 1 - Math.min((t - 0.5) / 0.5, 1) * 0.75;
      ctx.font = "12px monospace";
      ctx.fillStyle = c.secondary;
      ctx.textAlign = "center";
      ctx.fillText("?", sx + 14 + (ex - sx) * prog + 12, sy + 5);
      ctx.restore();
    }
    drawCaption(ctx, W, H, "5\\", c.coral);
  },
  slide_up(ctx, W, H, t) {
    const c = drawBase(ctx, W, H, 2);
    const sy = START_Y + 2 * STRING_GAP;
    const sx = LEFT_X + 60, ex = LEFT_X + 210;
    ctx.font = "bold 14px monospace";
    ctx.fillStyle = c.blue;
    ctx.textAlign = "center";
    ctx.fillText("5", sx, sy + 5);
    const prog = Math.min(t, 1);
    ctx.beginPath();
    ctx.strokeStyle = c.blue;
    ctx.lineWidth = 2;
    ctx.moveTo(sx + 10, sy + 7);
    ctx.lineTo(sx + 10 + (ex - sx - 10) * prog, sy - 7);
    ctx.stroke();
    if (t > 0.8) {
      ctx.save();
      ctx.globalAlpha = Math.min((t - 0.8) / 0.2, 1);
      ctx.font = "bold 14px monospace";
      ctx.fillStyle = c.green;
      ctx.textAlign = "center";
      ctx.fillText("7", ex + 12, sy + 5);
      ctx.restore();
    }
    drawCaption(ctx, W, H, "5/7", c.blue);
  },
  slide_down(ctx, W, H, t) {
    const c = drawBase(ctx, W, H, 2);
    const sy = START_Y + 2 * STRING_GAP;
    const sx = LEFT_X + 70, ex = LEFT_X + 220;
    ctx.font = "bold 14px monospace";
    ctx.fillStyle = c.blue;
    ctx.textAlign = "center";
    ctx.fillText("7", sx, sy + 5);
    const prog = Math.min(t, 1);
    ctx.beginPath();
    ctx.strokeStyle = c.coral;
    ctx.lineWidth = 2;
    ctx.moveTo(sx + 12, sy - 7);
    ctx.lineTo(sx + 12 + (ex - sx) * prog, sy + 7);
    ctx.stroke();
    if (t > 0.8) {
      ctx.save();
      ctx.globalAlpha = Math.min((t - 0.8) / 0.2, 1);
      ctx.font = "bold 14px monospace";
      ctx.fillStyle = c.green;
      ctx.textAlign = "center";
      ctx.fillText("5", ex + 14, sy + 5);
      ctx.restore();
    }
    drawCaption(ctx, W, H, "7\\5", c.coral);
  },
  vibrato(ctx, W, H, t) {
    const wave = Math.sin(t * Math.PI * 7) * Math.min(t * 2, 1);
    const c = drawBase(ctx, W, H, 2, wave * 0.6);
    const sy = START_Y + 2 * STRING_GAP;
    const cx = LEFT_X + 90;
    ctx.font = "bold 14px monospace";
    ctx.fillStyle = c.blue;
    ctx.textAlign = "center";
    ctx.fillText("5", cx, sy + 5);
    // tilde
    ctx.beginPath();
    ctx.strokeStyle = c.amber;
    ctx.lineWidth = 2;
    const wobble = Math.sin(t * Math.PI * 9) * 4;
    for (let i = 0; i <= 44; i++) {
      const x = cx + 14 + i * 1.5;
      const y = sy + wobble * Math.sin(i * 0.45);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    // up arrow
    if (t > 0.25) {
      const arrY = sy - 10 - Math.abs(Math.sin(t * Math.PI * 7)) * 7;
      ctx.beginPath();
      ctx.strokeStyle = c.amber;
      ctx.lineWidth = 1.5;
      ctx.moveTo(cx, sy - 7);
      ctx.lineTo(cx, arrY);
      ctx.stroke();
      ctx.beginPath();
      ctx.fillStyle = c.amber;
      ctx.moveTo(cx - 4, arrY + 5);
      ctx.lineTo(cx + 4, arrY + 5);
      ctx.lineTo(cx, arrY - 1);
      ctx.closePath();
      ctx.fill();
    }
    drawCaption(ctx, W, H, "5~", c.amber);
  },
  full_bend(ctx, W, H, t) {
    const c = drawBase(ctx, W, H, 2);
    const sy = START_Y + 2 * STRING_GAP;
    const bx = LEFT_X + 90;
    const bh = 24 * Math.min(t * 1.6, 1);
    ctx.font = "bold 14px monospace";
    ctx.fillStyle = c.blue;
    ctx.textAlign = "center";
    ctx.fillText("5", bx, sy + 5);
    ctx.beginPath();
    ctx.strokeStyle = c.amber;
    ctx.lineWidth = 2.2;
    ctx.moveTo(bx + 7, sy - 4);
    ctx.quadraticCurveTo(bx + 24, sy - bh - 2, bx + 24, sy - bh - 10);
    ctx.stroke();
    if (t > 0.3) {
      ctx.save();
      ctx.fillStyle = c.amber;
      ctx.beginPath();
      ctx.moveTo(bx + 19, sy - bh - 8);
      ctx.lineTo(bx + 29, sy - bh - 8);
      ctx.lineTo(bx + 24, sy - bh - 15);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
    if (t > 0.65) {
      ctx.save();
      ctx.globalAlpha = Math.min((t - 0.65) / 0.35, 1);
      ctx.font = "11px monospace";
      ctx.fillStyle = c.green;
      ctx.textAlign = "center";
      ctx.fillText("(7)", bx + 24, sy - bh - 18);
      ctx.restore();
    }
    drawCaption(ctx, W, H, "5b7  (Full Bend)", c.amber);
  },
  half_bend(ctx, W, H, t) {
    const c = drawBase(ctx, W, H, 2);
    const sy = START_Y + 2 * STRING_GAP;
    const bx = LEFT_X + 90;
    const bh = 13 * Math.min(t * 1.6, 1);
    ctx.font = "bold 14px monospace";
    ctx.fillStyle = c.blue;
    ctx.textAlign = "center";
    ctx.fillText("5", bx, sy + 5);
    ctx.beginPath();
    ctx.strokeStyle = c.amber;
    ctx.lineWidth = 2.2;
    ctx.moveTo(bx + 7, sy - 4);
    ctx.quadraticCurveTo(bx + 22, sy - bh - 2, bx + 22, sy - bh - 8);
    ctx.stroke();
    if (t > 0.3) {
      ctx.save();
      ctx.fillStyle = c.amber;
      ctx.beginPath();
      ctx.moveTo(bx + 17, sy - bh - 6);
      ctx.lineTo(bx + 27, sy - bh - 6);
      ctx.lineTo(bx + 22, sy - bh - 13);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
    if (t > 0.65) {
      ctx.save();
      ctx.globalAlpha = Math.min((t - 0.65) / 0.35, 1);
      ctx.font = "11px monospace";
      ctx.fillStyle = c.green;
      ctx.textAlign = "center";
      ctx.fillText("(6)", bx + 22, sy - bh - 16);
      ctx.font = "bold 11px monospace";
      ctx.fillStyle = c.amber;
      ctx.fillText("½", bx + 38, sy - bh - 4);
      ctx.restore();
    }
    drawCaption(ctx, W, H, "5b6  (½ Bend)", c.amber);
  },
  let_ring(ctx, W, H, t) {
    const c = drawBase(ctx, W, H);
    const frets = ["0", "1", "0", "2", "2", "0"];
    const noteX = LEFT_X + 65;
    const lineLen = 165 * Math.min(t * 1.3, 1);
    for (let i = 0; i < STRING_COUNT; i++) {
      const y = START_Y + i * STRING_GAP;
      ctx.font = "bold 13px monospace";
      ctx.fillStyle = c.blue;
      ctx.textAlign = "center";
      ctx.fillText(frets[i], noteX, y + 5);
      // dashed ring line
      ctx.save();
      ctx.globalAlpha = 0.55 + i * 0.06;
      ctx.beginPath();
      ctx.strokeStyle = c.green;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 3]);
      ctx.moveTo(noteX + 10, y);
      ctx.lineTo(noteX + 10 + lineLen, y);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    }
    drawCaption(ctx, W, H, "let ring ──────", c.green);
  },
  palm_mute(ctx, W, H, t) {
    const purple = "#534AB7";
    const purpleLight = "rgba(83,74,183,0.10)";
    drawBase(ctx, W, H);

    const frets = ["5", "5", "5", "7", "7", "5"];
    const noteX = LEFT_X + 60;
    const pmStart = noteX - 4;
    const pmEnd = W - 48;
    const lineLen = (pmEnd - pmStart) * Math.min(t * 1.2, 1);

    // animated shaded region
    ctx.save();
    ctx.fillStyle = purpleLight;
    ctx.fillRect(pmStart, START_Y - 14, lineLen, STRING_GAP * 5 + 24);
    ctx.restore();

    // fret numbers
    for (let i = 0; i < STRING_COUNT; i++) {
      const y = START_Y + i * STRING_GAP;
      ctx.save();
      ctx.font = "bold 13px monospace";
      ctx.fillStyle = purple;
      ctx.textAlign = "center";
      ctx.fillText(frets[i], noteX, y + 5);
      ctx.restore();
    }

    // P.M. label + dashed bracket line above
    if (t > 0.15) {
      const labelAlpha = Math.min((t - 0.15) / 0.25, 1);
      ctx.save();
      ctx.globalAlpha = labelAlpha;
      ctx.font = "bold 12px monospace";
      ctx.fillStyle = purple;
      ctx.textAlign = "left";
      ctx.fillText("P.M.", pmStart, START_Y - 18);
      ctx.beginPath();
      ctx.strokeStyle = purple;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 3]);
      ctx.moveTo(pmStart + 30, START_Y - 22);
      ctx.lineTo(pmStart + lineLen, START_Y - 22);
      ctx.stroke();
      ctx.setLineDash([]);
      // right tick
      if (t > 0.5) {
        ctx.beginPath();
        ctx.strokeStyle = purple;
        ctx.lineWidth = 1.5;
        ctx.moveTo(pmStart + lineLen, START_Y - 22);
        ctx.lineTo(pmStart + lineLen, START_Y - 12);
        ctx.stroke();
      }
      ctx.restore();
    }

    // dampened wave on strings
    if (t > 0.3) {
      const wavePhase = (t - 0.3) / 0.7;
      for (let i = 0; i < STRING_COUNT; i++) {
        const y = START_Y + i * STRING_GAP;
        const amp = 1.8 * Math.sin(wavePhase * Math.PI) * (1 - wavePhase * 0.55);
        ctx.beginPath();
        ctx.strokeStyle = purple;
        ctx.lineWidth = 0.9;
        ctx.globalAlpha = 0.4;
        ctx.moveTo(noteX + 8, y);
        for (let x = noteX + 8; x <= pmStart + lineLen - 4; x += 2) {
          ctx.lineTo(x, y + amp * Math.sin((x - noteX) * 0.22 + t * 18));
        }
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }

    drawCaption(ctx, W, H, "P.M.────  ←  팜 뮤트: 브리지에 손바닥을 살짝 올려 음 억제", purple);
  },

  mute_stroke(ctx, W, H, t) {
    const red = "#B53A3A";
    const redLight = "rgba(181,58,58,0.08)";
    const c = getThemeColors();
    drawBase(ctx, W, H);

    // All 6 strings get X marks
    const positions = [LEFT_X + 65, LEFT_X + 105, LEFT_X + 145, LEFT_X + 185, LEFT_X + 225, LEFT_X + 265];
    const visibleCount = Math.floor(positions.length * Math.min(t * 2.5, 1));

    // Strum line (downstroke arrow)
    if (t > 0.2) {
      const strokeAlpha = Math.min((t - 0.2) / 0.3, 1);
      const strokeProg = Math.min((t - 0.2) / 0.5, 1);
      const strikeX = LEFT_X + 55 + (W - LEFT_X - 80) * 0.3;
      const strikeTop = START_Y - 10;
      const strikeBot = START_Y + STRING_GAP * 5 + 10;
      const strikeY = strikeTop + (strikeBot - strikeTop) * strokeProg;

      ctx.save();
      ctx.globalAlpha = strokeAlpha * 0.18;
      ctx.fillStyle = red;
      ctx.fillRect(strikeX - 14, strikeTop, 28, strikeY - strikeTop);
      ctx.restore();

      // arrow head at bottom
      if (strokeProg > 0.8) {
        ctx.save();
        ctx.globalAlpha = strokeAlpha;
        ctx.fillStyle = red;
        ctx.beginPath();
        ctx.moveTo(strikeX - 7, strikeBot - 12);
        ctx.lineTo(strikeX + 7, strikeBot - 12);
        ctx.lineTo(strikeX, strikeBot);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    }

    // X marks per string
    for (let i = 0; i < STRING_COUNT; i++) {
      const y = START_Y + i * STRING_GAP;
      const alpha = i < visibleCount ? 1 : 0;
      if (alpha === 0) continue;
      const xPos = positions[0]; // same column, stacked vertically

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.font = "bold 14px monospace";
      ctx.fillStyle = red;
      ctx.textAlign = "center";
      ctx.fillText("X", xPos, y + 5);
      ctx.restore();
    }

    // ripple effect after strum
    if (t > 0.6) {
      const rp = (t - 0.6) / 0.4;
      for (let i = 0; i < STRING_COUNT; i++) {
        const y = START_Y + i * STRING_GAP;
        const amp = 1.5 * Math.sin(rp * Math.PI) * (1 - rp);
        ctx.beginPath();
        ctx.strokeStyle = red;
        ctx.lineWidth = 0.8;
        ctx.globalAlpha = 0.3 * (1 - rp);
        ctx.moveTo(positions[0] + 10, y);
        for (let x = positions[0] + 10; x <= W - 40; x += 2) {
          ctx.lineTo(x, y + amp * Math.sin((x - positions[0]) * 0.18 + t * 20));
        }
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }

    drawCaption(ctx, W, H, "X  ←  뮤트 스트로크(컷팅): 음정 없이 퍼커시브한 소리", red);
  },

  mute_picking(ctx, W, H, t) {
    const red = "#B53A3A";
    const c = getThemeColors();
    drawBase(ctx, W, H, 2); // highlight G string

    const sy = START_Y + 2 * STRING_GAP;
    // sequence of x picks: positions
    const picks = [
      { x: LEFT_X + 70,  str: 2 },
      { x: LEFT_X + 110, str: 2 },
      { x: LEFT_X + 150, str: 3 },
      { x: LEFT_X + 190, str: 2 },
    ];
    const visibleCount = Math.floor(picks.length * Math.min(t * 3, 1));

    picks.slice(0, visibleCount).forEach((p, idx) => {
      const y = START_Y + p.str * STRING_GAP;
      const alpha = idx === visibleCount - 1 ? Math.min(t * 4 - idx * 0.8, 1) : 1;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.font = "bold 14px monospace";
      ctx.fillStyle = red;
      ctx.textAlign = "center";
      ctx.fillText("x", p.x, y + 5);

      // pick impact flash on last visible
      if (idx === visibleCount - 1 && alpha > 0.5) {
        ctx.globalAlpha = (1 - alpha) * 0.4;
        ctx.fillStyle = red;
        ctx.beginPath();
        ctx.arc(p.x, y, 10, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });

    // dampened string ripple
    if (t > 0.25) {
      const rp = Math.sin((t - 0.25) * Math.PI * 3) * Math.max(0, 1 - t);
      ctx.beginPath();
      ctx.strokeStyle = red;
      ctx.lineWidth = 0.9;
      ctx.globalAlpha = 0.3;
      ctx.moveTo(LEFT_X, sy);
      for (let x = LEFT_X; x <= W - 20; x += 2) {
        ctx.lineTo(x, sy + rp * 2.2 * Math.sin((x - LEFT_X) * 0.14 + t * 15));
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    drawCaption(ctx, W, H, "x  ←  뮤트 피킹: 단음으로 뮤트 피킹", red);
  },

  hammer_pull(ctx, W, H, t) {
    const teal = "#1A7A62";
    const tealLight = "rgba(26,122,98,0.10)";
    const c = getThemeColors();
    drawBase(ctx, W, H, 2);

    const sy = START_Y + 2 * STRING_GAP;
    const x1 = LEFT_X + 70;   // fret 5 (start)
    const x2 = LEFT_X + 130;  // fret 7 (hammer)
    const x3 = LEFT_X + 190;  // fret 5 (pull)

    // Phase: 0-0.33 = show 5, 0.33-0.66 = hammer to 7, 0.66-1 = pull to 5
    const phase = t * 3; // 0..3

    // ── Note 1: fret 5 ──
    ctx.save();
    ctx.font = "bold 14px monospace";
    ctx.fillStyle = teal;
    ctx.textAlign = "center";
    ctx.fillText("5", x1, sy + 5);
    ctx.restore();

    // "h" label between 5 and 7
    if (phase > 0.5) {
      const a = Math.min((phase - 0.5) / 0.5, 1);
      ctx.save();
      ctx.globalAlpha = a;
      ctx.font = "12px monospace";
      ctx.fillStyle = c.secondary;
      ctx.textAlign = "center";
      ctx.fillText("h", (x1 + x2) / 2, sy - 10);
      ctx.restore();
    }

    // ── Hammer arc 5→7 ──
    if (phase > 0.8) {
      const arcProg = Math.min((phase - 0.8) / 0.8, 1);
      ctx.save();
      ctx.strokeStyle = teal;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc((x1 + x2) / 2, sy + 2, (x2 - x1) / 2, Math.PI, Math.PI + Math.PI * arcProg, false);
      ctx.stroke();

      // hammer "impact" dot
      if (arcProg > 0.85) {
        const impAlpha = Math.min((arcProg - 0.85) / 0.15, 1);
        ctx.globalAlpha = impAlpha;
        ctx.fillStyle = teal;
        ctx.beginPath();
        ctx.arc(x2, sy - 8, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    // ── Note 2: fret 7 (hammer destination) ──
    if (phase > 1.3) {
      const a = Math.min((phase - 1.3) / 0.4, 1);
      ctx.save();
      ctx.globalAlpha = a;
      ctx.font = "bold 14px monospace";
      ctx.fillStyle = teal;
      ctx.textAlign = "center";
      ctx.fillText("7", x2, sy + 5);
      ctx.restore();
    }

    // "p" label between 7 and 5
    if (phase > 1.7) {
      const a = Math.min((phase - 1.7) / 0.4, 1);
      ctx.save();
      ctx.globalAlpha = a;
      ctx.font = "12px monospace";
      ctx.fillStyle = c.secondary;
      ctx.textAlign = "center";
      ctx.fillText("p", (x2 + x3) / 2, sy - 10);
      ctx.restore();
    }

    // ── Pull arc 7→5 ──
    if (phase > 1.9) {
      const arcProg = Math.min((phase - 1.9) / 0.8, 1);
      ctx.save();
      ctx.strokeStyle = c.amber;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc((x2 + x3) / 2, sy + 2, (x3 - x2) / 2, Math.PI, Math.PI + Math.PI * arcProg, false);
      ctx.stroke();

      // pull "flick" arrow
      if (arcProg > 0.85) {
        const flAlpha = Math.min((arcProg - 0.85) / 0.15, 1);
        ctx.globalAlpha = flAlpha;
        ctx.fillStyle = c.amber;
        ctx.beginPath();
        ctx.arc(x3, sy - 8, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    // ── Note 3: fret 5 again ──
    if (phase > 2.5) {
      const a = Math.min((phase - 2.5) / 0.4, 1);
      ctx.save();
      ctx.globalAlpha = a;
      ctx.font = "bold 14px monospace";
      ctx.fillStyle = teal;
      ctx.textAlign = "center";
      ctx.fillText("5", x3, sy + 5);
      ctx.restore();
    }

    // string vibration
    if (phase > 1.2 && phase < 2.8) {
      const vp = ((phase - 1.2) % 0.8) / 0.8;
      const amp = 2 * Math.sin(vp * Math.PI);
      ctx.save();
      ctx.strokeStyle = teal;
      ctx.lineWidth = 0.9;
      ctx.globalAlpha = 0.25;
      ctx.beginPath();
      ctx.moveTo(LEFT_X, sy);
      for (let x = LEFT_X; x <= W - 20; x += 2) {
        ctx.lineTo(x, sy + amp * Math.sin((x - LEFT_X) * 0.12 + t * 16));
      }
      ctx.stroke();
      ctx.restore();
    }

    drawCaption(ctx, W, H, "5h7p5  ←  해머링(h) & 풀오프(p): 픽킹 없이 레가토 연주", teal);
  },
};