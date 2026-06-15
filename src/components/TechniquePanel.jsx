import TabCanvas from "./TabCanvas"
import { styles } from "../styles/appStyles"

export default function TechniquePanel({
  technique,
  progress,
  playing,
  onTogglePlay,
  onGoToPractice,
}) {
  if (!technique) {
    return (
      <div style={{ ...styles.panel, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px', color: 'var(--color-text-secondary, #73726c)' }}>
        위에서 알아보고 싶은 주법을 선택해주세요.
      </div>
    )
  }

  return (
    <div style={styles.panel}>
      <div style={styles.panelHeader}>
        <span style={{ ...styles.panelSymbol, color: technique.color }}>
          {technique.symbol}
        </span>
        <div style={{ flex: 1 }}>
          <div style={styles.panelTitle}>{technique.name}</div>
          <div style={styles.panelShort}>{technique.short}</div>
        </div>
        <button
          type="button"
          onClick={onGoToPractice}
          style={styles.goCheckBtn}
          title="체크리스트에서 확인"
        >
          ✅ 체크하러 가기
        </button>
      </div>

      <div style={styles.canvasWrap}>
        <TabCanvas techId={technique.id} progress={progress} />
      </div>

      <div style={styles.playbackRow}>
        <button
          type="button"
          onClick={onTogglePlay}
          style={{
            ...styles.playBtn,
            ...(playing
              ? {
                  ...styles.playBtnActive,
                  borderColor: technique.color,
                  color: technique.color,
                  background: `${technique.color}10`,
                }
              : {}),
          }}
        >
          {playing ? "⏸ 일시정지" : "▶ 애니메이션 재생"}
        </button>
        <div style={styles.progressTrack}>
          <div
            style={{
              ...styles.progressFill,
              width: `${progress * 100}%`,
              background: technique.color,
            }}
          />
        </div>
      </div>

      <p style={styles.explanation}>{technique.explanation}</p>

      <div
        style={{
          ...styles.tipBox,
          borderColor: technique.color,
          background: `${technique.color}11`,
        }}
      >
        <span style={{ ...styles.tipLabel, color: technique.color }}>
          연주 팁
        </span>
        <span style={styles.tipText}>{technique.tip}</span>
      </div>
    </div>
  )
}
