import { useState } from "react"
import { TECHNIQUES } from "../data/techniques"
import {
  getTodayKey,
  formatDate,
  loadAllPractice,
  saveAllPractice,
} from "../utils/practiceLog"
import { trackerStyles as s } from "../styles/trackerStyles"

function getMessage(pct) {
  if (pct === 100) return { text: "🎸 오늘 모든 주법 완료! 훌륭해요!", color: "#1A7A62" }
  if (pct >= 75) return { text: "💪 거의 다 왔어요! 조금만 더!", color: "#3B6D11" }
  if (pct >= 50) return { text: "🎵 절반 이상 완료했어요!", color: "#BA7517" }
  if (pct >= 25) return { text: "✨ 좋은 시작이에요, 계속 해봐요!", color: "#378ADD" }
  if (pct > 0) return { text: "🎼 연습 시작! 화이팅!", color: "#534AB7" }
  return { text: "오늘 연습할 주법을 체크해보세요", color: "var(--color-text-secondary, #73726c)" }
}

const CHECKED_COLOR = "#378ADD"

export default function PracticeTracker({ onSelectTech }) {
  const todayKey = getTodayKey()
  const [log, setLog] = useState(() => loadAllPractice())
  const [showHistory, setShowHistory] = useState(false)

  const validTechIds = TECHNIQUES.map(t => t.id)
  const todayChecked = (log[todayKey] || []).filter(id => validTechIds.includes(id))
  const total = TECHNIQUES.length
  const done = todayChecked.length
  const pct = Math.round((done / total) * 100) || 0
  const msg = getMessage(pct)

  const toggle = (id) => {
    const prev = (log[todayKey] || []).filter(validId => validTechIds.includes(validId))
    const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    const newLog = { ...log, [todayKey]: next }
    setLog(newLog)
    saveAllPractice(newLog)
  }

  const resetToday = () => {
    const newLog = { ...log, [todayKey]: [] }
    setLog(newLog)
    saveAllPractice(newLog)
  }

  const historyDays = Object.keys(log)
    .filter((k) => k !== todayKey && (log[k] || []).filter(id => validTechIds.includes(id)).length > 0)
    .sort((a, b) => b.localeCompare(a))
    .slice(0, 7)

  return (
    <div style={s.tracker}>
      <div style={s.trackerHeader}>
        <div>
          <div style={s.trackerTitle}>
            <span>오늘의 연습 체크리스트</span>
            <span style={s.trackerDate}>
              {new Date().toLocaleDateString("ko-KR", {
                month: "long",
                day: "numeric",
                weekday: "short",
              })}
            </span>
          </div>
          <div style={{ ...s.trackerMsg, color: msg.color }}>{msg.text}</div>
        </div>
        <div style={s.trackerActions}>
          <button
            type="button"
            onClick={() => setShowHistory((v) => !v)}
            style={s.ghostBtn}
            title="이전 기록 보기"
          >
            {showHistory ? "닫기" : "기록"}
          </button>
          {done > 0 && (
            <button type="button" onClick={resetToday} style={s.ghostBtn} title="오늘 초기화">
              초기화
            </button>
          )}
        </div>
      </div>

      <div style={s.progressWrap}>
        <div style={s.progressBar}>
          <div
            style={{
              ...s.progressBarFill,
              width: `${pct}%`,
              background:
                pct === 100
                  ? "linear-gradient(90deg, #1A7A62, #3B6D11)"
                  : "linear-gradient(90deg, #378ADD, #534AB7)",
            }}
          />
        </div>
        <span style={s.progressLabel}>
          {done} / {total}
        </span>
      </div>

      {showHistory && historyDays.length > 0 && (
        <div style={s.historyPanel}>
          <div style={s.historyTitle}>최근 연습 기록</div>
          {historyDays.map((day) => {
            const ids = (log[day] || []).filter(id => validTechIds.includes(id))
            const ratio = Math.round((ids.length / total) * 100)
            return (
              <div key={day} style={s.historyRow}>
                <span style={s.historyDate}>{formatDate(day)}</span>
                <div style={s.historyBar}>
                  <div style={{ ...s.historyBarFill, width: `${ratio}%` }} />
                </div>
                <span style={s.historyCount}>
                  {ids.length}/{total}
                </span>
              </div>
            )
          })}
        </div>
      )}
      {showHistory && historyDays.length === 0 && (
        <div style={s.historyEmpty}>아직 이전 연습 기록이 없습니다.</div>
      )}

      <div style={s.checkGrid}>
        {TECHNIQUES.map((tech) => {
          const checked = todayChecked.includes(tech.id)
          return (
            <div
              key={tech.id}
              style={{
                ...s.checkItem,
                ...(checked ? s.checkItemDone : {}),
                borderColor: checked ? CHECKED_COLOR : undefined,
                background: checked ? `${CHECKED_COLOR}0f` : undefined,
              }}
            >
              <button
                type="button"
                onClick={() => toggle(tech.id)}
                style={{
                  ...s.checkbox,
                  borderColor: checked
                    ? CHECKED_COLOR
                    : "var(--color-border-secondary, rgba(61,61,58,0.3))",
                  background: checked ? CHECKED_COLOR : "transparent",
                }}
                aria-label={checked ? "체크 해제" : "체크"}
              >
                {checked && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
              <button type="button" onClick={() => onSelectTech(tech)} style={s.checkLabel}>
                <span
                  style={{
                    ...s.checkSymbol,
                    color: checked ? CHECKED_COLOR : "var(--color-text-info, #185fa5)",
                  }}
                >
                  {tech.symbol}
                </span>
                <span
                  style={{
                    ...s.checkName,
                    textDecoration: checked ? "line-through" : "none",
                    opacity: checked ? 0.55 : 1,
                  }}
                >
                  {tech.name}
                </span>
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
