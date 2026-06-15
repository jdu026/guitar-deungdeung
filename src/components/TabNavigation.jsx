import { styles } from "../styles/appStyles"

const TABS = [
  { key: "learn", label: "📖 주법 배우기" },
  { key: "practice", label: "✅ 연습 체크리스트" },
]

export default function TabNavigation({ activeTab, onTabChange }) {
  return (
    <div style={styles.tabRow}>
      {TABS.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          onClick={() => onTabChange(key)}
          style={{
            ...styles.tabBtn,
            ...(activeTab === key ? styles.tabBtnActive : {}),
          }}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
