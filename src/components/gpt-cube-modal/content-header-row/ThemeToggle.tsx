import { useAppTheme } from '../../../theme/ThemeContext'
import styles from './ThemeToggle.module.css'

export function ThemeToggle() {
  const { mode, toggleMode } = useAppTheme()

  return (
    <div className={styles.track}>
      <button
        type="button"
        className={mode === 'light' ? styles.segmentActive : styles.segment}
        onClick={() => mode !== 'light' && toggleMode()}
      >
        <img src="/figma/icon-sun.svg" alt="בהיר" width={16} height={16} />
      </button>
      <button
        type="button"
        className={mode === 'dark' ? styles.segmentActive : styles.segment}
        onClick={() => mode !== 'dark' && toggleMode()}
      >
        <img
          src="/figma/icon-moon.svg"
          alt="כהה"
          width={16}
          height={16}
          className={mode === 'dark' ? styles.invert : undefined}
        />
      </button>
    </div>
  )
}
