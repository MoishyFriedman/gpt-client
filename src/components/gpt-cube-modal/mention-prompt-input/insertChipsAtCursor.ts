import type { RefObject } from 'react'
import { createChip } from './mentionChip'

/** Inserts chips at the live caret inside the editor, or appends them to the end if it isn't focused. */
export function insertChipsAtCursor(
  editorRef: RefObject<HTMLDivElement | null>,
  emitChange: () => void,
  labels: string[],
) {
  if (!editorRef.current || labels.length === 0) return
  const selection = window.getSelection()
  const liveRange =
    selection && selection.rangeCount > 0 && editorRef.current.contains(selection.getRangeAt(0).commonAncestorContainer)
      ? selection.getRangeAt(0)
      : null

  const frag = document.createDocumentFragment()
  labels.forEach((label) => {
    frag.appendChild(createChip(label, emitChange))
    frag.appendChild(document.createTextNode(' '))
  })

  if (liveRange) {
    liveRange.deleteContents()
    liveRange.insertNode(frag)
    liveRange.collapse(false)
  } else {
    editorRef.current.appendChild(frag)
  }

  emitChange()
  editorRef.current.focus()
}
