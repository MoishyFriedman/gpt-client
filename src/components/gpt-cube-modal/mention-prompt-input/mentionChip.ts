import styles from './mentionChip.module.css'

export function createChip(label: string, onRemove: () => void) {
  const chip = document.createElement('span')
  chip.contentEditable = 'false'
  chip.textContent = label
  chip.className = styles.chip

  const remove = document.createElement('span')
  remove.textContent = '×'
  remove.className = styles.remove
  remove.addEventListener('mousedown', (ev) => {
    ev.preventDefault()
    chip.remove()
    onRemove()
  })
  chip.appendChild(remove)
  return chip
}
