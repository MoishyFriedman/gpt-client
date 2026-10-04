import { Radio, Typography } from 'antd'
import { modalSectionLabels as L, outputFormats } from '../../../data/mockData'
import { CodePreview } from '../code-preview/CodePreview'
import { ClosedListInput } from './ClosedListInput'
import { RegexInput } from './RegexInput'
import styles from './DisplaySettings.module.css'

const { Text } = Typography

type OutputFormat = (typeof outputFormats)[number]

export function DisplaySettings({
  outputFormat,
  regexPattern,
  jsonOutput,
  closedListItems,
  onOutputFormatChange,
  onRegexPatternChange,
  onJsonOutputChange,
  onClosedListItemsChange,
}: {
  outputFormat: OutputFormat
  regexPattern: string
  jsonOutput: string
  closedListItems: string[]
  onOutputFormatChange: (value: OutputFormat) => void
  onRegexPatternChange: (value: string) => void
  onJsonOutputChange: (value: string) => void
  onClosedListItemsChange: (items: string[]) => void
}) {
  return (
    <div className={styles.section}>
      <div>
        <Text>{L.outputFormat}</Text>
        <Radio.Group
          value={outputFormat}
          onChange={(e) => onOutputFormatChange(e.target.value)}
          className={styles.radioGroup}
        >
          {outputFormats.map((f) => (
            <Radio key={f} value={f}>
              {f}
            </Radio>
          ))}
        </Radio.Group>
      </div>
      {outputFormat === 'JSON' && <CodePreview value={jsonOutput} onChange={onJsonOutputChange} />}
      {outputFormat === 'REGEX' && <RegexInput value={regexPattern} onChange={onRegexPatternChange} />}
      {outputFormat === 'תשובות מרשימה סגורה' && (
        <ClosedListInput items={closedListItems} onChange={onClosedListItemsChange} />
      )}
    </div>
  )
}
