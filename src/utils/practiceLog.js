export function getTodayKey() {
  const d = new Date()
  return `practice_${d.getFullYear()}_${d.getMonth() + 1}_${d.getDate()}`
}

export function formatDate(dateStr) {
  const parts = dateStr.replace("practice_", "").split("_")
  if (parts.length !== 3) return dateStr
  const [y, m, d] = parts
  return `${y}년 ${m}월 ${d}일`
}

export function loadAllPractice() {
  try {
    const raw = localStorage.getItem("guitar_practice_log")
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function saveAllPractice(log) {
  try {
    localStorage.setItem("guitar_practice_log", JSON.stringify(log))
  } catch {
    // ignore storage errors
  }
}
