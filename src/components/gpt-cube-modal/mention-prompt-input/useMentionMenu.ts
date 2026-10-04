import { useRef, useState, type RefObject } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import type { MentionAnchor } from './insertMentionAtAnchor'

interface MenuState {
  open: boolean
  top: number
  left: number
  anchor: MentionAnchor | null
}

const POPOVER_WIDTH = 280
const POPOVER_GAP = 4

/** Detects "@word" as the user types and positions the popover next to it. */
export function useMentionMenu({
  editorRef,
  containerRef,
}: {
  editorRef: RefObject<HTMLDivElement | null>
  containerRef: RefObject<HTMLDivElement>
}) {
  const popoverRef = useRef<HTMLDivElement>(null!)
  const [menu, setMenu] = useState<MenuState>({ open: false, top: 0, left: 0, anchor: null })

  const closeMenu = () => setMenu((m) => ({ ...m, open: false, anchor: null }))
  // Anything other than the popover itself — including clicking back into
  // the editor's own text — should close the mention menu.
  useOnClickOutside(popoverRef, closeMenu)

  const checkForMention = () => {
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0 || !editorRef.current) return
    const range = selection.getRangeAt(0)
    if (!range.collapsed || range.startContainer.nodeType !== Node.TEXT_NODE) {
      if (menu.open) closeMenu()
      return
    }

    const textNode = range.startContainer as Text
    const textBeforeCaret = textNode.textContent?.slice(0, range.startOffset) ?? ''
    // A space (or anything else that breaks the "@word" pattern) ends the
    // mention query and closes the popover.
    const match = textBeforeCaret.match(/@([^\s@]*)$/)
    if (!match) {
      if (menu.open) closeMenu()
      return
    }

    const atIndex = range.startOffset - match[0].length
    // Position a temporary range right at the "@" character for accurate placement.
    const atRange = document.createRange()
    atRange.setStart(textNode, atIndex)
    atRange.setEnd(textNode, atIndex + 1)
    const rect = atRange.getBoundingClientRect()
    const containerRect = containerRef.current.getBoundingClientRect()

    // Popover appears to the left of "@", clamped so it never overflows the
    // input's own bounds (matches AddCubeFieldPopover's fixed 280px width).
    // Coordinates are viewport-relative since the popover portals to
    // document.body (so it isn't clipped by the input's own scroll area).
    const left = Math.min(
      Math.max(rect.left - POPOVER_WIDTH - POPOVER_GAP, containerRect.left),
      Math.max(containerRect.right - POPOVER_WIDTH, containerRect.left),
    )

    setMenu({ open: true, top: rect.top, left, anchor: { textNode, atIndex } })
  }

  return { menu, popoverRef, closeMenu, checkForMention }
}
