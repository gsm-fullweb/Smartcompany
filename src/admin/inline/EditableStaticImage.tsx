import EditableImage from './EditableImage'
import { useStaticContent } from './StaticContent'

// ─────────────────────────────────────────────────────────────────────────────
// EditableStaticImage
//
// Versão "estática" do EditableImage para imagens que antes eram fixas no código
// (não vinham do CMS). Lê a URL salva do contexto StaticContent (fallback na URL
// original) e grava em `<pageKey>_static` → metadata[k]. Igual ao EditableStatic,
// mas para imagens (upload/troca).
// ─────────────────────────────────────────────────────────────────────────────

interface EditableStaticImageProps {
  k: string
  value: string
  alt?: string
  className?: string
  loading?: 'lazy' | 'eager'
}

export default function EditableStaticImage({ k, value, alt, className, loading }: EditableStaticImageProps) {
  const { pageKey, get } = useStaticContent()
  const saved = get(k, value)
  return (
    <EditableImage
      sectionKey={`${pageKey}_static`}
      path={['metadata', k]}
      value={saved}
      alt={alt}
      className={className}
      loading={loading}
    />
  )
}
