import { TECHNIQUES } from "../data/techniques"
import { styles } from "../styles/appStyles"

export default function TechniqueGrid({ selected, onSelect }) {
  return (
    <div style={styles.grid}>
      {TECHNIQUES.map((tech) => (
        <button
          key={tech.id}
          type="button"
          onClick={() => onSelect(tech)}
          style={{
            ...styles.techBtn,
            ...(selected?.id === tech.id
              ? {
                  ...styles.techBtnActive,
                  borderColor: selected.color,
                  background: `${selected.color}10`,
                }
              : {}),
          }}
        >
          <span
            style={{
              ...styles.techSymbol,
              color:
                selected?.id === tech.id
                  ? tech.color
                  : "var(--color-text-info, #185fa5)",
            }}
          >
            {tech.symbol}
          </span>
          <span style={styles.techName}>{tech.name}</span>
          <span style={styles.techShort}>{tech.short}</span>
        </button>
      ))}
    </div>
  )
}
