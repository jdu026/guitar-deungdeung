import { useState, useRef, useEffect, useCallback } from "react"
import { TECHNIQUES } from "./data/techniques"
import { styles } from "./styles/appStyles"
import AppHeader from "./components/AppHeader"
import TabNavigation from "./components/TabNavigation"
import TechniqueGrid from "./components/TechniqueGrid"
import TechniquePanel from "./components/TechniquePanel"
import PracticeTracker from "./components/PracticeTracker"

const DURATION = 2000

export default function App() {
  // 메인 App 컴포넌트 시작
  const [selected, setSelected] = useState(null)
  const [progress, setProgress] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [tab, setTab] = useState("learn")
  const rafRef = useRef(null)
  const startRef = useRef(null)

  const stopAnim = useCallback(() => {
    setPlaying(false)
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
  }, [])

  const startAnim = useCallback(() => {
    setPlaying(true)
    startRef.current = null
    const loop = (now) => {
      if (!startRef.current) startRef.current = now
      const elapsed = now - startRef.current
      const p = Math.min(elapsed / DURATION, 1)
      setProgress(p)
      if (p < 1) {
        rafRef.current = requestAnimationFrame(loop)
      } else {
        setTimeout(() => {
          startRef.current = null
          rafRef.current = requestAnimationFrame(loop)
        }, 500)
      }
    }
    rafRef.current = requestAnimationFrame(loop)
  }, [])

  const togglePlay = () => {
    if (playing) {
      stopAnim()
      setProgress(0)
    } else {
      startAnim()
    }
  }

  const handleSelect = (tech) => {
    stopAnim()
    setProgress(0)
    setSelected(tech)
    setTab("learn")
  }

  useEffect(() => () => stopAnim(), [stopAnim])

  return (
    <div style={styles.root}>
      <AppHeader />
      <TabNavigation activeTab={tab} onTabChange={setTab} />

      {tab === "learn" && (
        <>
          <TechniqueGrid selected={selected} onSelect={handleSelect} />
          <TechniquePanel
            technique={selected}
            progress={progress}
            playing={playing}
            onTogglePlay={togglePlay}
            onGoToPractice={() => setTab("practice")}
          />
        </>
      )}

      {tab === "practice" && <PracticeTracker onSelectTech={handleSelect} />}
    </div>
  )
}
