import { useState } from 'react'
import { Loader2, Plus, Trash2, Save, ChevronDown, ChevronUp } from 'lucide-react'

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface SiteSection {
  id?: number
  site_slug: string
  section_key: string
  title: string | null
  content: string | null
  metadata: Record<string, unknown> | null
  updated_at?: string
}

interface SectionEditorProps {
  section: SiteSection
  onSave: (updated: SiteSection) => Promise<void>
}

// ─── Detecção de tipo de campo ────────────────────────────────────────────────

const LONG_TEXT_KEYS = [
  'desc', 'body', 'paragraph', 'bio', 'text', 'content', 'excerpt',
  'subtitle', 'summary', 'missao', 'visao', 'proposito', 'intro',
  'detail', 'review', 'quote', 'experience_summary', 'biography',
  'mission', 'vision', 'purpose', 'a' // FAQ answer
]

const URL_KEYS = ['link', 'href', 'url', 'image_url', 'imageUrl', 'image', 'src', 'avatar']

function isLongTextField(key: string): boolean {
  return LONG_TEXT_KEYS.some(k => key.toLowerCase().includes(k))
}

function isUrlField(key: string): boolean {
  return URL_KEYS.some(k => key.toLowerCase() === k || key.toLowerCase().includes(k))
}

function formatLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/^\w/, c => c.toUpperCase())
    .trim()
}

// ─── FieldEditor ─────────────────────────────────────────────────────────────

interface FieldEditorProps {
  fieldKey: string
  value: unknown
  onChange: (v: unknown) => void
  depth?: number
}

function FieldEditor({ fieldKey, value, onChange, depth = 0 }: FieldEditorProps) {
  const label = formatLabel(fieldKey)

  // Array aninhado — renderiza sub-ArrayEditor
  if (Array.isArray(value)) {
    if (depth > 0) {
      return (
        <div className="text-[10px] text-slate-600 italic py-1">
          [{fieldKey}] — array aninhado (não editável aqui)
        </div>
      )
    }
    return (
      <div className="space-y-2">
        <label className="block text-[10px] font-bold uppercase text-slate-500 tracking-wider">
          {label}
        </label>
        <ArrayEditor
          sectionKey={fieldKey}
          items={value as Record<string, unknown>[]}
          onChange={(items) => onChange(items)}
          onSave={() => {}}
          saving={false}
          embedded
        />
      </div>
    )
  }

  // Objeto aninhado
  if (typeof value === 'object' && value !== null) {
    if (depth > 0) {
      return (
        <div className="text-[10px] text-slate-600 italic py-1">
          [{fieldKey}] — objeto aninhado
        </div>
      )
    }
    return (
      <div className="space-y-3 border border-white/5 rounded-lg p-3 bg-white/2">
        <label className="block text-[10px] font-bold uppercase text-slate-500 tracking-wider">
          {label}
        </label>
        {Object.entries(value as Record<string, unknown>).map(([k, v]) => (
          <FieldEditor
            key={k}
            fieldKey={k}
            value={v}
            onChange={(newV) => onChange({ ...(value as Record<string, unknown>), [k]: newV })}
            depth={depth + 1}
          />
        ))}
      </div>
    )
  }

  // Booleano
  if (typeof value === 'boolean') {
    return (
      <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
        <input
          type="checkbox"
          checked={value}
          onChange={e => onChange(e.target.checked)}
          className="rounded border-white/20 bg-white/5"
        />
        <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">{label}</span>
      </label>
    )
  }

  const isLong = isLongTextField(fieldKey)
  const isUrl = isUrlField(fieldKey)

  return (
    <div className="space-y-1.5">
      <label className="block text-[10px] font-bold uppercase text-slate-500 tracking-wider">
        {label}
      </label>
      {isLong ? (
        <textarea
          value={String(value ?? '')}
          onChange={e => onChange(e.target.value)}
          rows={4}
          className="w-full bg-[#070F1E] border border-white/10 rounded-lg px-3 py-2 text-sm text-white
                     focus:outline-none focus:border-gold-primary/50 focus:ring-1 focus:ring-gold-primary/20
                     resize-y transition-colors"
        />
      ) : (
        <input
          type={isUrl ? 'text' : 'text'}
          value={String(value ?? '')}
          onChange={e => onChange(e.target.value)}
          placeholder={isUrl ? 'https://... ou /assets/...' : ''}
          className="w-full bg-[#070F1E] border border-white/10 rounded-lg px-3 py-2 text-sm text-white
                     focus:outline-none focus:border-gold-primary/50 focus:ring-1 focus:ring-gold-primary/20
                     transition-colors"
        />
      )}
    </div>
  )
}

// ─── ObjectEditor ─────────────────────────────────────────────────────────────

interface ObjectEditorProps {
  sectionKey: string
  data: Record<string, unknown>
  onChange: (d: Record<string, unknown>) => void
  onSave: () => void
  saving: boolean
}

function ObjectEditor({ data, onChange, onSave, saving }: ObjectEditorProps) {
  return (
    <div className="space-y-4">
      {Object.entries(data).map(([key, value]) => (
        <FieldEditor
          key={key}
          fieldKey={key}
          value={value}
          onChange={(newValue) => onChange({ ...data, [key]: newValue })}
        />
      ))}
      <SaveButton onClick={onSave} saving={saving} />
    </div>
  )
}

// ─── ArrayEditor ─────────────────────────────────────────────────────────────

interface ArrayEditorProps {
  sectionKey: string
  items: Record<string, unknown>[]
  onChange: (items: Record<string, unknown>[]) => void
  onSave: () => void
  saving: boolean
  embedded?: boolean
}

function ArrayEditor({ items, onChange, onSave, saving, embedded = false }: ArrayEditorProps) {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set([0]))

  const toggleItem = (index: number) => {
    setOpenIndexes(prev => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  const updateItem = (index: number, updated: Record<string, unknown>) => {
    const newItems = [...items]
    newItems[index] = updated
    onChange(newItems)
  }

  const addItem = () => {
    const template = items.length > 0
      ? Object.fromEntries(Object.keys(items[items.length - 1]).map(k => [k, '']))
      : { title: '', desc: '' }
    const newItems = [...items, template]
    onChange(newItems)
    setOpenIndexes(prev => new Set([...prev, newItems.length - 1]))
  }

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index))
    setOpenIndexes(prev => {
      const next = new Set<number>()
      prev.forEach(i => { if (i < index) next.add(i); else if (i > index) next.add(i - 1) })
      return next
    })
  }

  // Helper: get a display title for a list item
  const getItemLabel = (item: Record<string, unknown>, index: number) => {
    const primary = item.title || item.name || item.year || item.q || item.tag
    if (primary) return String(primary)
    return `Item ${index + 1}`
  }

  return (
    <div className={`space-y-2 ${embedded ? '' : ''}`}>
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-white/8 rounded-xl overflow-hidden bg-[#070F1E]/30"
        >
          {/* Item header */}
          <button
            type="button"
            onClick={() => toggleItem(index)}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/3 transition-colors text-left gap-3"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[9px] font-black text-slate-600 uppercase tabular-nums w-5 flex-shrink-0">
                #{index + 1}
              </span>
              <span className="text-xs font-semibold text-slate-300 truncate">
                {getItemLabel(item, index)}
              </span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); removeItem(index) }}
                className="p-1 text-slate-600 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors"
                title="Remover item"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              {openIndexes.has(index)
                ? <ChevronUp className="w-3.5 h-3.5 text-slate-500" />
                : <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              }
            </div>
          </button>

          {/* Item body */}
          {openIndexes.has(index) && (
            <div className="px-4 pb-4 pt-1 border-t border-white/5 space-y-3">
              {Object.entries(item).map(([key, value]) => (
                <FieldEditor
                  key={key}
                  fieldKey={key}
                  value={value}
                  onChange={(newValue) => updateItem(index, { ...item, [key]: newValue })}
                  depth={1}
                />
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Add item button */}
      <button
        type="button"
        onClick={addItem}
        className="w-full py-2.5 border border-dashed border-white/15 rounded-xl text-xs
                   text-slate-500 hover:border-gold-primary/40 hover:text-gold-primary
                   transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-3.5 h-3.5" />
        <span>Adicionar item</span>
      </button>

      {!embedded && <SaveButton onClick={onSave} saving={saving} />}
    </div>
  )
}

// ─── SaveButton ───────────────────────────────────────────────────────────────

function SaveButton({ onClick, saving }: { onClick: () => void; saving: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={saving}
      className="w-full py-3 bg-gold-primary hover:bg-gold-light disabled:opacity-50
                 text-primary-dark font-bold text-sm uppercase tracking-wider rounded-xl
                 transition-colors flex items-center justify-center gap-2"
    >
      {saving ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Salvando...</span>
        </>
      ) : (
        <>
          <Save className="w-4 h-4" />
          <span>Salvar Seção</span>
        </>
      )}
    </button>
  )
}

// ─── SectionEditor (principal — exportado) ────────────────────────────────────

export default function SectionEditor({ section, onSave }: SectionEditorProps) {
  // O dado editável vive em `metadata`. Se `metadata` for null/vazio,
  // tentamos parsear `content` como JSON como fallback.
  const getInitialData = () => {
    if (section.metadata && Object.keys(section.metadata).length > 0) {
      return section.metadata
    }
    if (section.content) {
      try {
        const parsed = JSON.parse(section.content)
        return parsed
      } catch {
        // content é texto simples
        return { content: section.content }
      }
    }
    return {}
  }

  const initialData = getInitialData()
  const isArray = Array.isArray(initialData)

  const [data, setData] = useState<unknown>(initialData)
  const [title, setTitle] = useState(section.title ?? '')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      const updatedSection: SiteSection = {
        ...section,
        title,
        // Salva sempre em metadata (o schema do projeto usa metadata)
        metadata: isArray
          ? { items: data }  // arrays ficam em metadata.items? Não — vamos salvar direto
          : (data as Record<string, unknown>),
        // Para arrays, salva no campo content como JSON string também
        content: typeof data === 'string'
          ? data
          : JSON.stringify(data),
      }

      // Ajuste: se é array, o metadata precisa preservar a estrutura original
      if (isArray) {
        // Detectar qual chave do metadata contém o array
        const metaKeys = Object.keys(section.metadata ?? {})
        if (metaKeys.length === 1) {
          updatedSection.metadata = { [metaKeys[0]]: data }
        } else {
          updatedSection.metadata = section.metadata
          updatedSection.content = JSON.stringify(data)
        }
      }

      await onSave(updatedSection)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-5">
      {/* Campo de título */}
      <div className="space-y-1.5 pb-4 border-b border-white/5">
        <label className="block text-[10px] font-bold uppercase text-slate-500 tracking-wider">
          Título da Seção
        </label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full bg-[#070F1E] border border-white/10 rounded-lg px-3 py-2 text-sm
                     text-white focus:outline-none focus:border-gold-primary/50 transition-colors"
        />
      </div>

      {/* Campos do conteúdo */}
      {isArray ? (
        <ArrayEditor
          sectionKey={section.section_key}
          items={data as Record<string, unknown>[]}
          onChange={(items) => setData(items)}
          onSave={handleSave}
          saving={saving}
        />
      ) : typeof data === 'object' && data !== null ? (
        <ObjectEditor
          sectionKey={section.section_key}
          data={data as Record<string, unknown>}
          onChange={(d) => setData(d)}
          onSave={handleSave}
          saving={saving}
        />
      ) : (
        // Fallback: campo de texto simples
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold uppercase text-slate-500 tracking-wider">
              Conteúdo
            </label>
            <textarea
              value={String(data ?? '')}
              onChange={e => setData(e.target.value)}
              rows={6}
              className="w-full bg-[#070F1E] border border-white/10 rounded-lg px-3 py-2 text-sm
                         text-white focus:outline-none focus:border-gold-primary/50 resize-y transition-colors"
            />
          </div>
          <SaveButton onClick={handleSave} saving={saving} />
        </div>
      )}
    </div>
  )
}
