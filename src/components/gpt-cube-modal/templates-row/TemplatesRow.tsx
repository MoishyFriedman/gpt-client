import { Button, Tag } from 'antd'
import { modalSectionLabels as L, templates } from '../../../data/mockData'
import styles from './TemplatesRow.module.css'

export function TemplatesRow({
  selected,
  onSelect,
}: {
  selected: string[]
  onSelect: (template: string) => void
}) {
  return (
    <div className={styles.section}>
      <span className={styles.label}>{L.templatesLabel}</span>
      <div className={styles.row}>
        {templates.map((template) => (
          <Button
            key={template}
            size="small"
            disabled={selected.includes(template)}
            iconPosition="end"
            icon={<img src="/figma/icon-plus.svg" alt="" width={14} height={14} />}
            onClick={() => onSelect(template)}
          >
            {template}
          </Button>
        ))}
        <Tag variant="filled" className={styles.overflowChip}>
          +5
        </Tag>
      </div>
    </div>
  )
}
