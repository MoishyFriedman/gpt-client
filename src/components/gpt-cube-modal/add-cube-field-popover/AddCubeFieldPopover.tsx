import { forwardRef, useState, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { Button, Checkbox, Select, Tag, Typography } from 'antd'
import { modalSectionLabels as L, mockCubes, mockFields } from '../../../data/mockData'
import styles from './AddCubeFieldPopover.module.css'

const { Text } = Typography

export const AddCubeFieldPopover = forwardRef<
  HTMLDivElement,
  {
    style?: CSSProperties
    onCancel: () => void
    onConfirm: (labels: string[]) => void
  }
>(function AddCubeFieldPopover({ style, onCancel, onConfirm }, ref) {
  const [applyToAll, setApplyToAll] = useState(false)
  const [cube, setCube] = useState<string>()
  const [field, setField] = useState<string>()
  const [items, setItems] = useState<string[]>([])

  const addItem = () => {
    if (!cube || !field) return
    const label = `${cube} / ${field}${applyToAll ? ` (${L.applyToAllRecords})` : ''}`
    setItems((prev) => [...prev, label])
    setField(undefined)
  }

  return createPortal(
    <div ref={ref} onMouseDown={(e) => e.stopPropagation()} className={styles.popover} style={style}>
      <div className={styles.head}>
        <img
          src="/figma/icon-close.svg"
          alt=""
          width={12}
          height={12}
          className={styles.closeIcon}
          onClick={onCancel}
        />
        <Text strong className={styles.title}>
          {L.addCubeFieldTitle}
        </Text>
      </div>

      <div className={styles.body}>
        <Checkbox checked={applyToAll} onChange={(e) => setApplyToAll(e.target.checked)}>
          {L.applyToAllRecords}
        </Checkbox>
        <Select
          placeholder={L.cube}
          value={cube}
          onChange={setCube}
          className={styles.select}
          options={mockCubes.map((c) => ({ value: c, label: c }))}
        />
        <Select
          placeholder={L.field}
          value={field}
          onChange={setField}
          className={styles.select}
          options={mockFields.map((f) => ({ value: f, label: f }))}
        />
        <Button
          type="link"
          disabled={!cube || !field}
          onClick={addItem}
          className={styles.addLink}
          icon={<img src="/figma/icon-plus.svg" alt="" width={14} height={14} />}
          iconPosition="end"
        >
          {L.add}
        </Button>
        {items.length > 0 && (
          <div className={styles.itemsRow}>
            {items.map((item, i) => (
              <Tag
                key={item}
                closable
                className={styles.itemTag}
                onClose={() => setItems((prev) => prev.filter((_, idx) => idx !== i))}
              >
                {item}
              </Tag>
            ))}
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <Button type="primary" disabled={items.length === 0} onClick={() => onConfirm(items)}>
          {L.add}
        </Button>
        <Button onClick={onCancel}>{L.cancel}</Button>
      </div>
    </div>,
    document.body,
  )
})
