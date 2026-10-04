import type { RefObject } from 'react'
import { createChip } from './mentionChip'

export interface MentionAnchor {
  textNode: Text
  atIndex: number
}

/** Replaces the "@query" text at the anchor with chips for each selected label. */
export function insertMentionAtAnchor(
  anchor: MentionAnchor,
  editorRef: RefObject<HTMLDivElement | null>,
  emitChange: () => void,
  labels: string[],
) {
  if (!editorRef.current || labels.length === 0) return
  const { textNode, atIndex } = anchor
  const fullText = textNode.textContent ?? ''
  const queryMatch = fullText.slice(atIndex).match(/^@[^\s@]*/)
  const consumedLength = queryMatch ? queryMatch[0].length : 1

  const beforeText = fullText.slice(0, atIndex)
  const afterText = fullText.slice(atIndex + consumedLength)
  const parent = textNode.parentNode
  if (!parent) return

  const afterNode = document.createTextNode(afterText)
  const frag = document.createDocumentFragment()
  frag.appendChild(document.createTextNode(beforeText))
  labels.forEach((label) => {
    frag.appendChild(createChip(label, emitChange))
    frag.appendChild(document.createTextNode(' '))
  })
  frag.appendChild(afterNode)
  parent.replaceChild(frag, textNode)

  const selection = window.getSelection()
  const newRange = document.createRange()
  newRange.setStart(afterNode, 0)
  newRange.collapse(true)
  selection?.removeAllRanges()
  selection?.addRange(newRange)

  emitChange()
  editorRef.current.focus()
}
