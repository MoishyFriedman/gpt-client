import { useRef, useState } from 'react'
import { Button, Tag } from 'antd'
import { useOnClickOutside } from 'usehooks-ts'
import { AddCubeFieldPopover } from '../add-cube-field-popover/AddCubeFieldPopover'
import styles from './ChipsRow.module.css'

export function ChipsRow({
  selectedQuestions,
  onRemoveQuestion,
  onAddFields,
}: {
  selectedQuestions: string[]
  onRemoveQuestion: (q: string) => void
  onAddFields: (labels: string[]) => void
}) {
  const [popoverOpen, setPopoverOpen] = useState(false)
  const addButtonRef = useRef<HTMLDivElement>(null!)
  const popoverRef = useRef<HTMLDivElement>(null!)
  const hasChips = selectedQuestions.length > 0

  useOnClickOutside([addButtonRef, popoverRef], () => setPopoverOpen(false))
  const buttonRect = popoverOpen ? addButtonRef.current.getBoundingClientRect() : null

  return (
    <div className={hasChips ? styles.rowWithChips : styles.row}>
      {selectedQuestions.map((q) => (
        <Tag key={q} closable variant="filled" className={styles.chip} onClose={() => onRemoveQuestion(q)}>
          {q}
        </Tag>
      ))}
      <div className={styles.addButtonWrap} ref={addButtonRef}>
        <Button
          className={styles.addButton}
          onClick={() => setPopoverOpen((open) => !open)}
          icon={<img src="/figma/icon-plus.svg" alt="" width={16} height={16} />}
        />
        {popoverOpen && buttonRect && (
          <AddCubeFieldPopover
            ref={popoverRef}
            style={{ top: buttonRect.bottom + 4, left: buttonRect.left }}
            onCancel={() => setPopoverOpen(false)}
            onConfirm={(labels) => {
              onAddFields(labels)
              setPopoverOpen(false)
            }}
          />
        )}
      </div>
    </div>
  )
}
