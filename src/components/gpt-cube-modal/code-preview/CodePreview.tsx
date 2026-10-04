import { Input } from 'antd'
import styles from './CodePreview.module.css'

const { TextArea } = Input

export function CodePreview({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <TextArea value={value} onChange={(e) => onChange(e.target.value)} className={styles.textarea} />
  )
}
