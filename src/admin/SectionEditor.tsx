import { useState, useCallback } from 'react'
import { Loader2, Plus, Trash2, Save, ChevronDown, ChevronUp } from 'lucide-react'
import { supabase } from '../lib/supabase'

// ─── Types ──────────────────────────────────────────────────────────────────

export interface SiteSection {
  id: string
  site_slug: string
  section_key: string
  title: string | null
  content: string | null
  metadata: Record<string, unknown> | null
  updated_at: string
}

type SectionPattern =
  | 'simple-text'     // title + content (texto), metadata com campos extras escalares
  | 'content-array'   // content é JSON array stringificado, metadata null
  | 'metadata-array'  // metadata tem exatamente UMA chave cujo valor é array
  | 'metadata-object' // metadata tem múltiplos campos escalares diretos

// ─── detectPattern ──────────────────────────────────────────────────────────

function detectPattern(section: SiteSection): SectionPattern {
  const { content, metadata } = section

  // 1. content é JSON array válido?
  if (content && content.trim().startsWith('[')) {
    try {
      const parsed = JSON.parse(content)
      if (Array.isArray(parsed)) return 'content-array'
    } catch { /* não é JSON válido, continua */ }
  }

  // 2. metadata existe e não está vazio?
  if (metadata && typeof metadata === 'object') {
    const entries = Object.entries(metadata)
    // 2a. exatamente uma chave cujo valor é array → 'metadata-array'
    if (entries.length === 1 && Array.isArray(entries[0][1])) {
      return 'metadata-array'
    }
    // 2b. tem chaves com valores → 'metadata-object'
    if (entries.length > 0) {
      return 'metadata-object'
    }
  }

  // 3. fallback → texto simples
  return 'simple-text'
}

// ─── saveSectionByPattern ────────────────────────────────────────────────────

async function saveSectionByPattern(
  section: SiteSection,
  pattern: SectionPattern,
  title: string,
  editedContent: string,
  editedMetadata: Record<string, unknown>,
  editedArray: unknown[],
  arrayKey: string,
): Promise<string | null> {
  let payload: Record<string, unknown>

  switch (pattern) {
    case 'simple-text':
      payload = { title, content: editedContent, metadata: editedMetadata }
      break
    case 'content-array':
      payload = { title, content: JSON.stringify(editedArray) }
      break
    case 'metadata-array':
      payload = { title, metadata: { [arrayKey]: editedArray } }
      break
    case 'metadata-object':
      payload = { title, metadata: editedMetadata }
      break
  }

  const { error } = await supabase
    .from('site_sections')
    .update(payload)
    .eq('id', section.id)

  return error ? error.message : null
}

// ─── Field helpers ───────────────────────────────────────────────────────────

// Campos somente-leitura (nunca renderizar como input)
const READONLY_FIELDS = new Set([
  'id', 'site_slug', 'updated_at', 'section_key',
])

// Palavras-chave que indicam texto longo → textarea
const LONG_TEXT_MARKERS = [
  'desc', 'body', 'paragraph', 'bio', 'text', 'excerpt',
  'subtitle', 'summary', 'missao', 'visao', 'proposito',
  'intro', 'detail', 'review', 'quote', 'experience',
  'biography', 'mission', 'vision', 'purpose', 'answer',
  'content', 'observation', 'note',
]

// Palavras-chave que indicam URL → placeholder diferente
const URL_MARKERS = ['url', 'link', 'href', 'src', 'image', 'avatar', 'photo']

function isLongTextField(key: string): boolean {
  const k = key.toLowerCase()
  return LONG_TEXT_MARKERS.some(m => k === m || k.includes(m))
}

function isUrlField(key: string): boolean {
  const k = key.toLowerCase()
  return URL_MARKERS.some(m => k === m || k.endsWith(m) || k.startsWith(m))
}

function formatLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .trim()
    .replace(/^\w/, c => c.toUpperCase())
}

// ─── FieldEditor ─────────────────────────────────────────────────────────────

interface FieldEditorProps {
  fieldKey: string
  value: unknown
  onChange: (v: unknown) => void
}

function FieldEditor({ fieldKey, value, onChange }: FieldEditorProps) {
  // Nunca renderizar campos somente-leitura
  if (READONLY_FIELDS.has(fieldKey)) return null

  const label = formatLabel(fieldKey)

  // Array aninhado — sub-ArrayEditor embutido
  if (Array.isArray(value)) {
    return (
      <div className="space-y-2">
        <label className="block text-[10px] font-bold uppercase text-slate-500 tracking-wider">
          {label}
        </label>
        <div className="pl-3 border-l border-white/8">
          <ArrayEditor
            items={value as Record<string, unknown>[]}
            onChange={(items) => onChange(items)}
            nested
          />
        </div>
      </div>
    )
  }

  // Objeto aninhado — renderiza campos filhos recursivamente
  if (typeof value === 'object' && value !== null) {
    return (
      <div className="space-y-3 pl-3 border-l border-white/8">
        <label className="block text-[9px] font-bold uppercase text-slate-600 tracking-widest">
          {label}
        </label>
        {Object.entries(value as Record<string, unknown>).map(([k, v]) => (
          <FieldEditor
            key={k}
            fieldKey={k}
            value={v}
            onChange={(newV) =>
              onChange({ ...(value as Record<string, unknown>), [k]: newV })
            }
          />
        ))}
      </div>
    )
  }

  // Booleano — checkbox
  if (typeof value === 'boolean') {
    return (
      <label className="flex items-center gap-2 cursor-pointer py-1">
        <input
          type="checkbox"
          checked={value}
          onChange={e => onChange(e.target.checked)}
          className="w-4 h-4 rounded border-white/20 bg-white/5 accent-gold-primary"
        />
        <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
          {label}
        </span>
      </label>
    )
  }

  // Texto — input ou textarea
  const isLong = isLongTextField(fieldKey)
  const isUrl = isUrlField(fieldKey)

  return (
    <div className="space-y-1">
      <label className="block text-[10px] font-bold uppercase text-slate-500 tracking-wider">
        {label}
      </label>
      {isLong ? (
        <textarea
          value={String(value ?? '')}
          onChange={e => onChange(e.target.value)}
          rows={4}
          className="w-full bg-[#070F1E] border border-white/10 rounded-lg px-3 py-2
                     text-sm text-white focus:outline-none focus:border-gold-primary/50
                     focus:ring-1 focus:ring-gold-primary/20 resize-y transition-colors"
        />
      ) : (
        <input
          type="text"
          value={String(value ?? '')}
          onChange={e => onChange(e.target.value)}
          placeholder={isUrl ? '/assets/... ou https://...' : ''}
          className="w-full bg-[#070F1E] border border-white/10 rounded-lg px-3 py-2
                     text-sm text-white focus:outline-none focus:border-gold-primary/50
                     focus:ring-1 focus:ring-gold-primary/20 transition-colors"
        />
      )}
    </div>
  )
}

// ─── ArrayEditor ─────────────────────────────────────────────────────────────

interface ArrayEditorProps {
  items: Record<string, unknown>[]
  onChange: (items: Record<string, unknown>[]) => void
  nested?: boolean
}

function ArrayEditor({ items, onChange, nested = false }: ArrayEditorProps) {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set())

  const toggleItem = (index: number) => {
    setOpenIndexes(prev => {
      const next = new Set(prev)
      next.has(index) ? next.delete(index) : next.add(index)
      return next
    })
  }

  const updateItem = (index: number, updated: Record<string, unknown>) => {
    const next = [...items]
    next[index] = updated
    onChange(next)
  }

  const addItem = () => {
    // Clonar as CHAVES do último item com valores vazios
    // Nunca assumir { title, desc } fixo
    const template =
      items.length > 0
        ? Object.fromEntries(Object.keys(items[items.length - 1]).map(k => [k, '']))
        : { title: '', desc: '' }
    const next = [...items, template]
    onChange(next)
    // Abrir o novo item automaticamente
    setOpenIndexes(prev => new Set([...prev, next.length - 1]))
  }

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index))
    setOpenIndexes(prev => {
      const next = new Set<number>()
      prev.forEach(i => {
        if (i < index) next.add(i)
        else if (i > index) next.add(i - 1)
      })
      return next
    })
  }

  // Extrai um label legível do item para o header do accordion
  const getItemLabel = (item: Record<string, unknown>, index: number): string => {
    const candidate =
      item.title ?? item.name ?? item.year ?? item.tag ??
      item.label ?? item.q ?? item.question
    return candidate ? String(candidate) : `Item ${index + 1}`
  }

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div
          key={index}
          className={`border rounded-xl overflow-hidden ${
            nested
              ? 'border-white/5 bg-[#070F1E]/10'
              : 'border-white/8 bg-[#091120]/40'
          }`}
        >
          {/* Item header */}
          <div
            onClick={() => toggleItem(index)}
            className="w-full flex items-center justify-between px-4 py-3
                       hover:bg-white/3 transition-colors text-left gap-3 cursor-pointer"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[9px] font-black text-slate-600 tabular-nums flex-shrink-0 w-5">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-xs font-semibold text-slate-300 truncate">
                {getItemLabel(item, index)}
              </span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={e => { e.stopPropagation(); removeItem(index) }}
                className="p-1 text-slate-600 hover:text-red-400 hover:bg-red-400/10
                           rounded transition-colors"
                title="Remover item"
              >
                <Trash2 className="w-3 h-3" />
              </button>
              {openIndexes.has(index)
                ? <ChevronUp className="w-3.5 h-3.5 text-slate-500" />
                : <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              }
            </div>
          </div>

          {/* Item body */}
          {openIndexes.has(index) && (
            <div className="px-4 py-4 border-t border-white/5 space-y-3 bg-[#070F1E]/20">
              {Object.entries(item).map(([k, v]) => (
                <FieldEditor
                  key={k}
                  fieldKey={k}
                  value={v}
                  onChange={newV => updateItem(index, { ...item, [k]: newV })}
                />
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Botão adicionar — clona chaves do último item */}
      <button
        type="button"
        onClick={addItem}
        className="w-full py-2.5 border border-dashed border-white/15 rounded-xl
                   text-xs text-slate-500 hover:border-gold-primary/40 hover:text-gold-primary
                   transition-colors flex items-center justify-center gap-1.5"
      >
        <Plus className="w-3.5 h-3.5" />
        Adicionar item
      </button>
    </div>
  )
}

// ─── SectionEditor (export principal) ────────────────────────────────────────

interface SectionEditorProps {
  section: SiteSection
  onSaveSuccess: () => void
}

export default function SectionEditor({ section, onSaveSuccess }: SectionEditorProps) {
  const pattern = detectPattern(section)

  // ── Title (sempre editável) ──
  const [title, setTitle] = useState(section.title ?? '')

  // ── simple-text: edita content (texto) + metadata (campos extras) ──
  const [editedContent, setEditedContent] = useState(section.content ?? '')
  const [editedMetadata, setEditedMetadata] = useState<Record<string, unknown>>(
    pattern === 'simple-text' || pattern === 'metadata-object'
      ? (section.metadata as Record<string, unknown>) ?? {}
      : {}
  )

  // ── content-array: edita array que está em content (JSON string) ──
  const [contentArray, setContentArray] = useState<Record<string, unknown>[]>(() => {
    if (pattern !== 'content-array' || !section.content) return []
    try { return JSON.parse(section.content) } catch { return [] }
  })

  // ── metadata-array: detecta a chave e edita o array dentro de metadata ──
  const metaArrayKey = (() => {
    if (!section.metadata) return ''
    const entries = Object.entries(section.metadata)
    return entries.length === 1 && Array.isArray(entries[0][1]) ? entries[0][0] : ''
  })()

  const [metaArray, setMetaArray] = useState<Record<string, unknown>[]>(() => {
    if (pattern !== 'metadata-array' || !section.metadata || !metaArrayKey) return []
    const arr = (section.metadata as Record<string, unknown>)[metaArrayKey]
    return Array.isArray(arr) ? (arr as Record<string, unknown>[]) : []
  })

  // ── Save ──
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  const handleSave = useCallback(async () => {
    setSaving(true)
    setSaveError(null)
    const err = await saveSectionByPattern(
      section,
      pattern,
      title,
      editedContent,
      editedMetadata,
      pattern === 'content-array' ? contentArray : metaArray,
      metaArrayKey,
    )
    setSaving(false)
    if (err) {
      setSaveError(err)
    } else {
      onSaveSuccess()
    }
  }, [
    section, pattern, title,
    editedContent, editedMetadata,
    contentArray, metaArray, metaArrayKey,
    onSaveSuccess,
  ])

  return (
    <div className="space-y-5 pt-3">

      {/* Título da seção */}
      <div className="space-y-1">
        <label className="block text-[10px] font-bold uppercase text-slate-500 tracking-wider">
          Título da Seção
        </label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full bg-[#070F1E] border border-white/10 rounded-lg px-3 py-2
                     text-sm text-white focus:outline-none focus:border-gold-primary/50
                     focus:ring-1 focus:ring-gold-primary/20 transition-colors"
        />
      </div>

      {/* ── Padrão: simple-text ── */}
      {pattern === 'simple-text' && (
        <>
          <div className="space-y-1">
            <label className="block text-[10px] font-bold uppercase text-slate-500 tracking-wider">
              Conteúdo / Descrição
            </label>
            <textarea
              value={editedContent}
              onChange={e => setEditedContent(e.target.value)}
              rows={5}
              className="w-full bg-[#070F1E] border border-white/10 rounded-lg px-3 py-2
                         text-sm text-white focus:outline-none focus:border-gold-primary/50
                         focus:ring-1 focus:ring-gold-primary/20 resize-y transition-colors"
            />
          </div>
          {Object.keys(editedMetadata).length > 0 && (
            <div className="space-y-3 pt-2 border-t border-white/5">
              <span className="block text-[9px] font-bold uppercase text-slate-600 tracking-widest">
                Campos adicionais (metadata)
              </span>
              {Object.entries(editedMetadata).map(([k, v]) => (
                <FieldEditor
                  key={k}
                  fieldKey={k}
                  value={v}
                  onChange={newV =>
                    setEditedMetadata(prev => ({ ...prev, [k]: newV }))
                  }
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* ── Padrão: content-array ── */}
      {pattern === 'content-array' && (
        <ArrayEditor items={contentArray} onChange={setContentArray} />
      )}

      {/* ── Padrão: metadata-array ── */}
      {pattern === 'metadata-array' && (
        <ArrayEditor items={metaArray} onChange={setMetaArray} />
      )}

      {/* ── Padrão: metadata-object ── */}
      {pattern === 'metadata-object' && (
        <div className="space-y-3">
          {Object.entries(editedMetadata).map(([k, v]) => (
            <FieldEditor
              key={k}
              fieldKey={k}
              value={v}
              onChange={newV =>
                setEditedMetadata(prev => ({ ...prev, [k]: newV }))
              }
            />
          ))}
        </div>
      )}

      {/* Mensagem de erro */}
      {saveError && (
        <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
          ✗ Erro ao salvar: {saveError}
        </p>
      )}

      {/* Botão salvar */}
      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="w-full py-3 bg-gold-primary hover:bg-gold-light disabled:opacity-50
                   text-primary-dark font-bold text-sm uppercase tracking-wider rounded-xl
                   transition-colors flex items-center justify-center gap-2"
      >
        {saving ? (
          <><Loader2 className="w-4 h-4 animate-spin" /><span>Salvando...</span></>
        ) : (
          <><Save className="w-4 h-4" /><span>Salvar Seção</span></>
        )}
      </button>
    </div>
  )
}
