import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { supabase } from '../../lib/supabase'

// ─────────────────────────────────────────────────────────────────────────────
// StaticContent
//
// Provê, por página, os textos ESTÁTICOS (antes hardcoded) que foram tornados
// editáveis. Cada página carrega uma seção `<pageKey>_static` cujo metadata é um
// mapa chave→valor. Componentes <EditableStatic> leem desse mapa (com fallback no
// texto original) e salvam de volta via o InlineEditContext (mesma tabela).
//
// A seção `<pageKey>_static` é criada automaticamente no primeiro "Salvar".
// ─────────────────────────────────────────────────────────────────────────────

interface StaticCtx {
  pageKey: string
  get: (k: string, fallback: string) => string
}

const StaticContentContext = createContext<StaticCtx>({ pageKey: '', get: (_k, fb) => fb })

export const useStaticContent = () => useContext(StaticContentContext)

export function StaticContent({
  pageKey,
  slug = 'smartcompany',
  children,
}: {
  pageKey: string
  slug?: string
  children: ReactNode
}) {
  const [map, setMap] = useState<Record<string, string>>({})

  useEffect(() => {
    let active = true
    supabase
      .from('site_sections')
      .select('metadata')
      .eq('site_slug', slug)
      .eq('section_key', `${pageKey}_static`)
      .maybeSingle()
      .then(({ data }) => {
        if (active && data?.metadata && typeof data.metadata === 'object') {
          setMap(data.metadata as Record<string, string>)
        }
      })
    return () => { active = false }
  }, [pageKey, slug])

  const get = useCallback(
    (k: string, fallback: string) => (map && k in map ? map[k] : fallback),
    [map],
  )

  return <StaticContentContext.Provider value={{ pageKey, get }}>{children}</StaticContentContext.Provider>
}
