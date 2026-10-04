import { Input } from 'antd'
import styles from './RegexInput.module.css'

const EXAMPLE_PATTERN = '^\\d{3}-\\d{2}-\\d{4}$'

export function RegexInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={EXAMPLE_PATTERN}
      className={styles.input}
    />
  )
}
