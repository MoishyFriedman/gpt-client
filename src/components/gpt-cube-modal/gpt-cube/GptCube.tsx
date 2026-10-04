import { useState } from 'react'
import { PromptPanel, defaultPromptState, type PromptState } from '../prompt-panel/PromptPanel'
import styles from './GptCube.module.css'

export function GptCube() {
  const [prompt, setPrompt] = useState<PromptState>(defaultPromptState)

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <PromptPanel value={prompt} onChange={setPrompt} />
      </div>
    </div>
  )
}
