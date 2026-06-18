import { type ElementType } from 'react'
import EditableText from './EditableText'
import { useStaticContent } from './StaticContent'

// ─────────────────────────────────────────────────────────────────────────────
// EditableStatic
//
// Torna editável um texto que antes era ESTÁTICO (hardcoded). Lê o valor salvo
// do contexto StaticContent (com fallback no texto original) e delega para o
// EditableText, gravando em `<pageKey>_static` → metadata[k].
//
// Para rótulos de botão: embrulhe apenas o TEXTO dentro do botão/Link/<a>.
// NÃO altere o elemento de botão (onClick/to/href permanecem intactos); o
// EditableText já bloqueia a propagação do clique ao editar.
// ─────────────────────────────────────────────────────────────────────────────

interface EditableStaticProps {
  /** Chave única dentro da página (snake_case, ex: 'hero_cta_primary') */
  k: string
  /** Texto original (fallback caso ainda não tenha sido editado) */
  value: string
  as?: ElementType
  className?: string
}

export default function EditableStatic({ k, value, as = 'span', className }: EditableStaticProps) {
  const { pageKey, get } = useStaticContent()
  const saved = get(k, value)
  return (
    <EditableText
      as={as}
      className={className}
      sectionKey={`${pageKey}_static`}
      path={['metadata', k]}
      value={saved}
    />
  )
}
