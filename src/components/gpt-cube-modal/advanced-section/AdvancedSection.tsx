import { Input, InputNumber, Typography } from 'antd'
import { modalSectionLabels as L } from '../../../data/mockData'
import styles from './AdvancedSection.module.css'

const { Text } = Typography
const { TextArea } = Input

export function AdvancedSection({
  maxLength,
  retrievalInstructions,
  onMaxLengthChange,
  onRetrievalInstructionsChange,
}: {
  maxLength: number
  retrievalInstructions: string
  onMaxLengthChange: (value: number) => void
  onRetrievalInstructionsChange: (value: string) => void
}) {
  return (
    <div className={styles.section}>
      <div className={styles.row}>
        <Text className={styles.label}>{L.maxAnswerLength}</Text>
        <InputNumber
          min={0}
          value={maxLength}
          onChange={(v) => onMaxLengthChange(v ?? 0)}
          className={styles.stepper}
        />
      </div>
      <div className={styles.textareaRow}>
        <Text className={styles.label}>{L.systemPrompt}</Text>
        <TextArea
          value={retrievalInstructions}
          onChange={(e) => onRetrievalInstructionsChange(e.target.value)}
          placeholder={L.retrievalInstructions}
          autoSize={{ minRows: 2, maxRows: 4 }}
          className={styles.textarea}
        />
      </div>
    </div>
  )
}
