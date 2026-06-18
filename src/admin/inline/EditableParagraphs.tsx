import { useInlineEdit } from './InlineEditContext'

// ─────────────────────────────────────────────────────────────────────────────
// EditableParagraphs
//
// Para textos longos guardados como UMA string única (separada por \n\n) e
// renderizados como vários <p>. Fora do modo edição renderiza os parágrafos
// IGUAL ao original. No modo edição mostra um único <textarea> com o texto
// completo, salvando de volta na string única (field "content" por padrão).
// ─────────────────────────────────────────────────────────────────────────────

interface EditableParagraphsProps {
  sectionKey: string
  field?: string
  path?: (string | number)[]
  value: string
  /** Classes aplicadas a CADA <p> no modo de leitura (idênticas ao original) */
  className?: string
}

export default function EditableParagraphs({ sectionKey, field = 'content', path, value, className }: EditableParagraphsProps) {
  const { isAdmin, editing, getValue, setField } = useInlineEdit()
  const targetPath = path ?? [field]
  const display = getValue(sectionKey, targetPath, value ?? '')

  if (!isAdmin || !editing) {
    return (
      <>
        {String(display).split('\n\n').map((para, i) => (
          <p key={i} className={className}>{para}</p>
        ))}
      </>
    )
  }

  return (
    <textarea
      defaultValue={String(display)}
      onClick={(e) => e.stopPropagation()}
      onBlur={(e) => {
        if (e.target.value !== display) setField(sectionKey, targetPath, e.target.value)
      }}
      rows={Math.max(6, String(display).split('\n').length + 1)}
      className="w-full bg-[#070F1E] border border-gold-primary/50 rounded-lg px-3 py-2 text-sm text-white leading-relaxed focus:outline-none focus:border-gold-primary resize-y"
      style={{ minHeight: '160px' }}
    />
  )
}
