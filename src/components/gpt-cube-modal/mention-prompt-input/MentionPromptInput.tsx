import { forwardRef, useImperativeHandle, useRef, useState, type KeyboardEvent } from 'react'
import { AddCubeFieldPopover } from '../add-cube-field-popover/AddCubeFieldPopover'
import { insertChipsAtCursor } from './insertChipsAtCursor'
import { insertMentionAtAnchor } from './insertMentionAtAnchor'
import { useMentionMenu } from './useMentionMenu'
import styles from './MentionPromptInput.module.css'

export interface MentionPromptInputHandle {
  /** Inserts chips at the current caret, or appended to the end if the editor isn't focused. */
  insertChips: (labels: string[]) => void
}

export const MentionPromptInput = forwardRef<
  MentionPromptInputHandle,
  {
    placeholder: string
    onChange: (text: string) => void
  }
>(function MentionPromptInput({ placeholder, onChange }, ref) {
  const editorRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null!)
  const [isEmpty, setIsEmpty] = useState(true)

  const emitChange = () => {
    const text = editorRef.current?.textContent ?? ''
    onChange(text)
    setIsEmpty(text.length === 0)
  }

  const { menu, popoverRef, closeMenu, checkForMention } = useMentionMenu({ editorRef, containerRef })

  useImperativeHandle(ref, () => ({
    insertChips: (labels) => insertChipsAtCursor(editorRef, emitChange, labels),
  }))

  const handleConfirmMention = (labels: string[]) => {
    if (menu.anchor) insertMentionAtAnchor(menu.anchor, editorRef, emitChange, labels)
    closeMenu()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (menu.open && e.key === 'Escape') {
      e.preventDefault()
      closeMenu()
      return
    }
    if (e.key === 'Backspace') {
      const selection = window.getSelection()
      if (selection?.isCollapsed && selection.anchorNode?.nodeType === Node.TEXT_NODE) {
        const anchorText = selection.anchorNode as Text
        if (selection.anchorOffset === 0) {
          const prev = anchorText.previousSibling
          if (prev instanceof HTMLElement) {
            e.preventDefault()
            prev.remove()
            emitChange()
          }
        }
      }
    }
  }

  return (
    <div ref={containerRef} className={styles.container}>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={() => {
          emitChange()
          checkForMention()
        }}
        onKeyUp={checkForMention}
        onClick={checkForMention}
        onKeyDown={handleKeyDown}
        className={styles.editor}
      />
      {isEmpty && <div className={styles.placeholder}>{placeholder}</div>}
      {menu.open && (
        <AddCubeFieldPopover
          ref={popoverRef}
          style={{ top: menu.top, left: menu.left }}
          onCancel={closeMenu}
          onConfirm={handleConfirmMention}
        />
      )}
    </div>
  )
})
