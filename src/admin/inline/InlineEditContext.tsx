import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { supabase } from '../../lib/supabase'

// ─────────────────────────────────────────────────────────────────────────────
// Contexto do Editor Visual Inline.
//
// Camada ADITIVA: não substitui o painel admin nem altera o site público.
// Grava na MESMA tabela `site_sections` (mesmo formato, mesmo onConflict) usada
// pelo painel e lida pelo hook useDynamicContent.
// ─────────────────────────────────────────────────────────────────────────────

type Path = (string | number)[]
interface Change { path: Path; value: unknown }
type ChangeMap = Record<string, Change[]>

interface InlineEditValue {
  isAdmin: boolean
  editing: boolean
  setEditing: (v: boolean) => void
  dirty: boolean
  saving: boolean
  getValue: <T>(sectionKey: string, path: Path, fallback: T) => T
  setField: (sectionKey: string, path: Path, value: unknown) => void
  save: () => Promise<boolean>
  discard: () => void
  slug: string
}

const defaultValue: InlineEditValue = {
  isAdmin: false,
  editing: false,
  setEditing: () => {},
  dirty: false,
  saving: false,
  getValue: (_s, _p, fallback) => fallback,
  setField: () => {},
  save: async () => false,
  discard: () => {},
  slug: 'smartcompany',
}

const InlineEditContext = createContext<InlineEditValue>(defaultValue)

export const useInlineEdit = () => useContext(InlineEditContext)

// ─── Helpers ──────────────────────────────────────────────────────────────────

function samePath(a: Path, b: Path): boolean {
  return a.length === b.length && a.every((v, i) => v === b[i])
}

function deepClone<T>(v: T): T {
  return v == null ? v : JSON.parse(JSON.stringify(v))
}

// Define um valor em obj seguindo o caminho, criando estruturas intermediárias.
function setPath(obj: any, path: Path, value: unknown) {
  let cur = obj
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i]
    const nextKey = path[i + 1]
    if (cur[key] == null) cur[key] = typeof nextKey === 'number' ? [] : {}
    cur = cur[key]
  }
  cur[path[path.length - 1]] = value
}

// ─── Provider ───────────────────────────────────────────────────────────────

export function InlineEditProvider({ children, slug = 'smartcompany' }: { children: ReactNode; slug?: string }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  // Alterações ainda não salvas (contam como "dirty")
  const [pending, setPending] = useState<ChangeMap>({})
  // Alterações já salvas nesta sessão (mantêm a tela coerente sem recarregar)
  const [committed, setCommitted] = useState<ChangeMap>({})

  // Detecta sessão de administrador (mesma auth do painel)
  useEffect(() => {
    let active = true
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (active) setIsAdmin(!!session)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdmin(!!session)
    })
    return () => {
      active = false
      sub.subscription.unsubscribe()
    }
  }, [])

  // Sai do modo edição e limpa rascunhos se o admin deslogar
  useEffect(() => {
    if (!isAdmin) {
      setEditing(false)
      setPending({})
      setCommitted({})
    }
  }, [isAdmin])

  const setField = useCallback((sectionKey: string, path: Path, value: unknown) => {
    setPending(prev => {
      const list = prev[sectionKey] ? [...prev[sectionKey]] : []
      const idx = list.findIndex(c => samePath(c.path, path))
      if (idx >= 0) list[idx] = { path, value }
      else list.push({ path, value })
      return { ...prev, [sectionKey]: list }
    })
  }, [])

  const getValue = useCallback(<T,>(sectionKey: string, path: Path, fallback: T): T => {
    const inPending = pending[sectionKey]?.find(c => samePath(c.path, path))
    if (inPending) return inPending.value as T
    const inCommitted = committed[sectionKey]?.find(c => samePath(c.path, path))
    if (inCommitted) return inCommitted.value as T
    return fallback
  }, [pending, committed])

  const dirty = useMemo(() => Object.values(pending).some(list => list.length > 0), [pending])

  const discard = useCallback(() => setPending({}), [])

  const save = useCallback(async (): Promise<boolean> => {
    setSaving(true)
    try {
      for (const [sectionKey, changes] of Object.entries(pending)) {
        if (!changes.length) continue

        // Re-busca a linha atual para preservar campos não editados
        const { data: rows, error: fetchErr } = await supabase
          .from('site_sections')
          .select('*')
          .eq('site_slug', slug)
          .eq('section_key', sectionKey)
          .limit(1)
        if (fetchErr) throw fetchErr

        const base = rows && rows[0] ? rows[0] : null
        const row: any = {
          title: base?.title ?? null,
          content: base?.content ?? null,
          metadata: deepClone(base?.metadata) ?? {},
        }
        for (const ch of changes) setPath(row, ch.path, ch.value)

        const { error } = await supabase.from('site_sections').upsert({
          site_slug: slug,
          section_key: sectionKey,
          title: row.title,
          content: row.content,
          metadata: row.metadata,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'site_slug,section_key' })
        if (error) throw error
      }

      // Move pending → committed para manter a tela coerente sem recarregar
      setCommitted(prev => {
        const next: ChangeMap = { ...prev }
        for (const [sectionKey, changes] of Object.entries(pending)) {
          const list = next[sectionKey] ? [...next[sectionKey]] : []
          for (const ch of changes) {
            const idx = list.findIndex(c => samePath(c.path, ch.path))
            if (idx >= 0) list[idx] = ch
            else list.push(ch)
          }
          next[sectionKey] = list
        }
        return next
      })
      setPending({})
      return true
    } catch (err) {
      console.error('Erro ao salvar alterações inline:', err)
      return false
    } finally {
      setSaving(false)
    }
  }, [pending, slug])

  const value = useMemo<InlineEditValue>(() => ({
    isAdmin, editing, setEditing, dirty, saving, getValue, setField, save, discard, slug,
  }), [isAdmin, editing, dirty, saving, getValue, setField, save, discard, slug])

  return <InlineEditContext.Provider value={value}>{children}</InlineEditContext.Provider>
}
