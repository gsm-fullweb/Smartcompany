import { createElement, type ElementType } from 'react'
import { useInlineEdit } from './InlineEditContext'

// ─────────────────────────────────────────────────────────────────────────────
// EditableText
//
// Fora do modo edição (e para visitantes) renderiza EXATAMENTE a mesma tag e as
// mesmas classes de antes — zero diferença visual. Apenas quando o admin ativa o
// modo edição o texto vira editável inline (contentEditable).
// ─────────────────────────────────────────────────────────────────────────────

interface EditableTextProps {
  sectionKey: string
  /** Campo simples no topo da linha: 'title' | 'content' */
  field?: string
  /** Caminho completo, ex: ['metadata', 'badge'] ou ['metadata', 'events', 0, 'desc'] */
  path?: (string | number)[]
  value: string
  as?: ElementType
  className?: string
}

const EDIT_STYLE: React.CSSProperties = {
  outline: '1px dashed rgba(223, 183, 88, 0.7)', // gold-primary #DFB758
  outlineOffset: '2px',
  borderRadius: '2px',
  cursor: 'text',
}

export default function EditableText({ sectionKey, field, path, value, as = 'span', className }: EditableTextProps) {
  const { isAdmin, editing, getValue, setField } = useInlineEdit()
  const targetPath = path ?? [field as string]
  const display = getValue(sectionKey, targetPath, value ?? '')

  // Render idêntico ao original quando não está editando
  if (!isAdmin || !editing) {
    return createElement(as, { className }, display)
  }

  return createElement(
    as,
    {
      className,
      contentEditable: true,
      suppressContentEditableWarning: true,
      spellCheck: false,
      style: EDIT_STYLE,
      // Evita que o clique para editar acione handlers do elemento pai
      // (ex: abrir lightbox, navegar) enquanto o admin edita o texto.
      onClick: (e: React.MouseEvent) => e.stopPropagation(),
      onMouseDown: (e: React.MouseEvent) => e.stopPropagation(),
      onBlur: (e: React.FocusEvent<HTMLElement>) => {
        const text = e.currentTarget.textContent ?? ''
        if (text !== display) setField(sectionKey, targetPath, text)
      },
    },
    display,
  )
}
