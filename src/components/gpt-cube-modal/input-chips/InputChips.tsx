import { useRef } from 'react'
import { Typography } from 'antd'
import { modalSectionLabels as L } from '../../../data/mockData'
import { MentionPromptInput, type MentionPromptInputHandle } from '../mention-prompt-input/MentionPromptInput'
import { ChipsRow } from './ChipsRow'
import styles from './InputChips.module.css'

const { Text } = Typography

export function InputChips({
  selectedQuestions,
  onRemoveQuestion,
  onPromptChange,
}: {
  selectedQuestions: string[]
  onRemoveQuestion: (q: string) => void
  onPromptChange: (text: string) => void
}) {
  // Cube/field references added via the "+" button go straight into the
  // prompt text itself, the same way "@" mentions do.
  const mentionInputRef = useRef<MentionPromptInputHandle>(null)

  return (
    <div>
      <Text strong>{L.modelPrompt}</Text>
      <div className={styles.box}>
        <ChipsRow
          selectedQuestions={selectedQuestions}
          onRemoveQuestion={onRemoveQuestion}
          onAddFields={(labels) => mentionInputRef.current?.insertChips(labels)}
        />
        <MentionPromptInput ref={mentionInputRef} placeholder={L.promptPlaceholder} onChange={onPromptChange} />
      </div>
    </div>
  )
}
