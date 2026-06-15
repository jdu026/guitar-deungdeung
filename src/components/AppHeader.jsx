import { STRING_BADGES } from "../data/techniques"
import { styles } from "../styles/appStyles"

export default function AppHeader() {
  return (
    <div style={styles.header}>
      <div style={styles.headerInner}>
        <span style={styles.headerEyebrow}>Guitar Tablature</span>
        <h1 style={styles.headerTitle}>기타 탭 기보법</h1>
        <p style={styles.headerSub}>
          탭은 6줄로 구성됩니다. 위가 1번 줄(가장 가는 줄·e), 아래가 6번
          줄(가장 굵은 줄·E)이며 숫자는 프렛 번호입니다.
        </p>
      </div>
      <div style={styles.stringBadges}>
        {STRING_BADGES.map((label) => (
          <span key={label} style={styles.badge}>
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}
