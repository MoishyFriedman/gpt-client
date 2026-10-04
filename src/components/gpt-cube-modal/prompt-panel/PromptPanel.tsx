import { Collapse } from 'antd'
import { modalSectionLabels as L, outputFormats, jsonOutputSample } from '../../../data/mockData'
import { AdvancedSection } from '../advanced-section/AdvancedSection'
import { ContentHeaderRow } from '../content-header-row/ContentHeaderRow'
import { DisplaySettings } from '../display-settings/DisplaySettings'
import { InputChips } from '../input-chips/InputChips'
import { TemplatesRow } from '../templates-row/TemplatesRow'
import styles from './PromptPanel.module.css'

export interface PromptState {
  prompt: string
  selectedQuestions: string[]
  maxLength: number
  retrievalInstructions: string
  outputFormat: (typeof outputFormats)[number]
  regexPattern: string
  jsonOutput: string
  closedListItems: string[]
}

export const defaultPromptState: PromptState = {
  prompt: '',
  selectedQuestions: [],
  maxLength: 600,
  retrievalInstructions: '',
  outputFormat: 'JSON',
  regexPattern: '',
  jsonOutput: jsonOutputSample,
  closedListItems: [],
}

export function PromptPanel({
  value,
  onChange,
}: {
  value: PromptState
  onChange: (next: PromptState) => void
}) {
  const set = <K extends keyof PromptState>(key: K, v: PromptState[K]) =>
    onChange({ ...value, [key]: v })

  return (
    <div className={styles.panel}>
      <ContentHeaderRow />

      <InputChips
        selectedQuestions={value.selectedQuestions}
        onRemoveQuestion={(q) =>
          set(
            'selectedQuestions',
            value.selectedQuestions.filter((s) => s !== q),
          )
        }
        onPromptChange={(text) => set('prompt', text)}
      />

      <TemplatesRow
        selected={value.selectedQuestions}
        onSelect={(template) => set('selectedQuestions', [...value.selectedQuestions, template])}
      />

      <Collapse
        ghost
        items={[
          {
            key: 'advanced',
            label: L.advancedInstructions,
            children: (
              <AdvancedSection
                maxLength={value.maxLength}
                retrievalInstructions={value.retrievalInstructions}
                onMaxLengthChange={(v) => set('maxLength', v)}
                onRetrievalInstructionsChange={(v) => set('retrievalInstructions', v)}
              />
            ),
          },
          {
            key: 'display',
            label: L.displaySettings,
            children: (
              <DisplaySettings
                outputFormat={value.outputFormat}
                regexPattern={value.regexPattern}
                jsonOutput={value.jsonOutput}
                closedListItems={value.closedListItems}
                onOutputFormatChange={(v) => set('outputFormat', v)}
                onRegexPatternChange={(v) => set('regexPattern', v)}
                onJsonOutputChange={(v) => set('jsonOutput', v)}
                onClosedListItemsChange={(v) => set('closedListItems', v)}
              />
            ),
          },
        ]}
      />
    </div>
  )
}
