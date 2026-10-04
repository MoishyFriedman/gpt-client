import { useState, type KeyboardEvent } from 'react'
import { Input, Tag } from 'antd'
import { modalSectionLabels as L } from '../../../data/mockData'
import styles from './ClosedListInput.module.css'

export function ClosedListInput({
  items,
  onChange,
}: {
  items: string[]
  onChange: (items: string[]) => void
}) {
  const [draft, setDraft] = useState('')

  const addItem = () => {
    const trimmed = draft.trim()
    if (!trimmed) return
    onChange([...items, trimmed])
    setDraft('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addItem()
    }
  }

  return (
    <div className={styles.box}>
      {items.map((item, i) => (
        <Tag key={item + i} closable onClose={() => onChange(items.filter((_, idx) => idx !== i))}>
          {item}
        </Tag>
      ))}
      <Input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={addItem}
        placeholder={L.closedListPlaceholder}
        variant="borderless"
        className={styles.draftInput}
      />
    </div>
  )
}
