import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useInlineEdit } from './InlineEditContext'

// ─────────────────────────────────────────────────────────────────────────────
// EditableButton
//
// Fora do modo edição renderiza um <Link> idêntico ao original (mesmo destino,
// mesmas classes). No modo edição permite editar o rótulo (inline) e o destino
// (link) do botão. Rótulo e link são gravados em metadata.{label,link} da seção.
// ─────────────────────────────────────────────────────────────────────────────

interface EditableButtonProps {
  sectionKey: string
  label: string
  link: string
  labelPath?: (string | number)[]
  linkPath?: (string | number)[]
  className?: string
  /** Ícone/elemento ao lado do rótulo (ex: seta) */
  children?: ReactNode
}

const LABEL_EDIT_STYLE: React.CSSProperties = {
  outline: '1px dashed rgba(7, 15, 30, 0.6)',
  outlineOffset: '2px',
  borderRadius: '2px',
  cursor: 'text',
}

export default function EditableButton({
  sectionKey,
  label,
  link,
  labelPath = ['metadata', 'label'],
  linkPath = ['metadata', 'link'],
  className,
  children,
}: EditableButtonProps) {
  const { isAdmin, editing, getValue, setField } = useInlineEdit()
  const labelVal = getValue(sectionKey, labelPath, label ?? '')
  const linkVal = getValue(sectionKey, linkPath, link ?? '')

  // Render idêntico ao original quando não está editando
  if (!isAdmin || !editing) {
    return (
      <Link to={linkVal || '#'} className={className}>
        <span>{labelVal}</span>
        {children}
      </Link>
    )
  }

  return (
    <span className="inline-flex flex-col items-center gap-1.5">
      <span className={className}>
        <span
          contentEditable
          suppressContentEditableWarning
          spellCheck={false}
          style={LABEL_EDIT_STYLE}
          onBlur={(e) => {
            const text = e.currentTarget.textContent ?? ''
            if (text !== labelVal) setField(sectionKey, labelPath, text)
          }}
        >
          {labelVal}
        </span>
        {children}
      </span>
      <input
        type="text"
        value={linkVal}
        onChange={(e) => setField(sectionKey, linkPath, e.target.value)}
        placeholder="Destino do botão (ex: /contato)"
        className="bg-black/50 border border-gold-primary/50 rounded px-2 py-1 text-[10px] text-white w-56 max-w-full focus:outline-none focus:border-gold-primary"
      />
    </span>
  )
}
