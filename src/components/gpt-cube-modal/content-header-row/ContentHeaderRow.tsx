import { useState } from 'react'
import { Divider, Select } from 'antd'
import { modelName } from '../../../data/mockData'
import { ThemeToggle } from './ThemeToggle'
import styles from './ContentHeaderRow.module.css'

export function ContentHeaderRow() {
  const [model, setModel] = useState(modelName)

  return (
    <div className={styles.row}>
      <img src="/figma/icon-ai-light.svg" alt="" width={24} height={24} />
      <ThemeToggle />
      <Divider type="vertical" className={styles.divider} />
      <Select
        value={model}
        onChange={setModel}
        className={styles.select}
        options={[{ value: modelName, label: modelName }]}
      />
    </div>
  )
}
