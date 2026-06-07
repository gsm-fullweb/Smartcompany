# PROMPT — Editor Universal de Páginas (SmartCompany Admin)

## PROBLEMA ATUAL

O Dashboard tenta criar um editor específico para cada seção (mvv, hero, timeline, etc.)
com código customizado para cada campo. Isso resulta num arquivo gigante, frágil e impossível
de manter — e ainda assim não cobre todas as seções.

## SOLUÇÃO: Editor Genérico Baseado em JSON

Não crie editors específicos por seção.
Em vez disso, crie **um único editor universal** que funciona para QUALQUER seção
porque o conteúdo de todas elas já está armazenado como JSON no campo `content` do Supabase.

---

## ARQUITETURA DA SOLUÇÃO

### Como o conteúdo está armazenado (tabela `site_sections` no Supabase):

```
id | page_slug    | section_key          | title              | content (JSON text)
---|--------------|----------------------|--------------------|-----------------------
 1 | home         | hero                 | Hero Principal     | {"h1":"...", "paragraph":"..."}
 2 | home         | journeys             | Nossa Expertise    | [{"title":"...", "desc":"..."},...]
 3 | quem-somos   | timeline             | Nossa História     | [{"year":"2001","title":"..."},...]
 4 | quem-somos   | values               | Nossos Valores     | [{"title":"...", "desc":"..."},...]
```

O campo `content` é **sempre uma string JSON** que pode ser:
- Um **objeto** `{ chave: valor, chave2: valor2 }`
- Um **array de objetos** `[{ title, desc, link, ... }, ...]`

---

## O QUE CONSTRUIR

### 1. Componente `SectionEditor` (novo arquivo: `src/admin/SectionEditor.tsx`)

Este componente recebe uma seção (`CmsSection`) e renderiza automaticamente
um formulário baseado no tipo de JSON detectado.

```typescript
// src/admin/SectionEditor.tsx

import { useState } from 'react'
import type { CmsSection } from '../lib/cmsApi'

interface Props {
  section: CmsSection
  onSave: (updated: CmsSection) => Promise<void>
}

export default function SectionEditor({ section, onSave }: Props) {
  // Parsear o content JSON
  const parsedContent = (() => {
    try { return JSON.parse(section.content ?? '{}') }
    catch { return {} }
  })()

  const isArray = Array.isArray(parsedContent)

  // Estado local do conteúdo editável
  const [data, setData] = useState(parsedContent)
  const [saving, setSaving] = useState(false)

  // ─── CASO 1: content é um ARRAY de objetos ─────────────────────────────
  // Ex: journeys, pillars, values, timeline, members, ebooks, faqs...
  if (isArray) {
    return (
      <ArrayEditor
        sectionKey={section.sectionKey}
        items={data}
        onChange={setData}
        onSave={async () => {
          setSaving(true)
          await onSave({ ...section, content: JSON.stringify(data) })
          setSaving(false)
        }}
        saving={saving}
      />
    )
  }

  // ─── CASO 2: content é um OBJETO simples ───────────────────────────────
  // Ex: hero, mentor, agir_vs_reagir, mvv...
  return (
    <ObjectEditor
      sectionKey={section.sectionKey}
      data={data}
      onChange={setData}
      onSave={async () => {
        setSaving(true)
        await onSave({ ...section, content: JSON.stringify(data) })
        setSaving(false)
      }}
      saving={saving}
    />
  )
}
```

---

### 2. Componente `ObjectEditor` — para seções tipo `{ chave: valor }`

```typescript
// Dentro do mesmo arquivo SectionEditor.tsx

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
```

---

### 3. Componente `ArrayEditor` — para seções tipo `[{ ... }, { ... }]`

```typescript
interface ArrayEditorProps {
  sectionKey: string
  items: Record<string, unknown>[]
  onChange: (items: Record<string, unknown>[]) => void
  onSave: () => void
  saving: boolean
}

function ArrayEditor({ items, onChange, onSave, saving }: ArrayEditorProps) {
  const updateItem = (index: number, updated: Record<string, unknown>) => {
    const newItems = [...items]
    newItems[index] = updated
    onChange(newItems)
  }

  const addItem = () => {
    // Clonar a estrutura do último item com campos vazios
    const template = items.length > 0
      ? Object.fromEntries(Object.keys(items[items.length - 1]).map(k => [k, '']))
      : { title: '', desc: '' }
    onChange([...items, template])
  }

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      {items.map((item, index) => (
        <div key={index} className="border border-white/10 rounded-xl p-4 relative">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-gold-primary uppercase">
              Item {index + 1}
            </span>
            <button
              onClick={() => removeItem(index)}
              className="text-xs text-red-400 hover:text-red-300"
            >
              Remover
            </button>
          </div>
          <div className="space-y-3">
            {Object.entries(item).map(([key, value]) => (
              <FieldEditor
                key={key}
                fieldKey={key}
                value={value}
                onChange={(newValue) => updateItem(index, { ...item, [key]: newValue })}
              />
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={addItem}
        className="w-full py-2 border border-dashed border-white/20 rounded-lg text-sm text-slate-400 hover:border-gold-primary/40 hover:text-gold-primary transition-colors"
      >
        + Adicionar item
      </button>

      <SaveButton onClick={onSave} saving={saving} />
    </div>
  )
}
```

---

### 4. Componente `FieldEditor` — detecta o tipo do campo automaticamente

```typescript
interface FieldEditorProps {
  fieldKey: string
  value: unknown
  onChange: (v: unknown) => void
}

// Campos que devem ter textarea (texto longo)
const LONG_TEXT_KEYS = ['desc', 'body', 'paragraph', 'bio', 'text', 'content',
                        'excerpt', 'subtitle', 'summary', 'missao', 'visao',
                        'proposito', 'intro', 'detail']

// Campos que são URLs (não precisam de textarea)
const URL_KEYS = ['link', 'href', 'url', 'imageUrl', 'image', 'src']

function FieldEditor({ fieldKey, value, onChange }: FieldEditorProps) {
  const label = fieldKey
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/^\w/, c => c.toUpperCase())
    .trim()

  // Ignorar campos que são arrays/objetos aninhados (recursividade futura)
  if (typeof value === 'object' && value !== null) {
    return (
      <div className="text-xs text-slate-500 italic">
        [{fieldKey}] — objeto aninhado (edite via JSON bruto abaixo)
      </div>
    )
  }

  const isLong = LONG_TEXT_KEYS.some(k => fieldKey.toLowerCase().includes(k))
  const isUrl  = URL_KEYS.some(k => fieldKey.toLowerCase().includes(k))
  const isBool = typeof value === 'boolean'

  if (isBool) {
    return (
      <label className="flex items-center gap-2 text-sm text-slate-300">
        <input
          type="checkbox"
          checked={value as boolean}
          onChange={e => onChange(e.target.checked)}
          className="rounded border-white/20"
        />
        {label}
      </label>
    )
  }

  return (
    <div className="space-y-1">
      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
        {label}
      </label>
      {isLong ? (
        <textarea
          value={String(value ?? '')}
          onChange={e => onChange(e.target.value)}
          rows={4}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white
                     focus:outline-none focus:border-gold-primary/50 resize-y"
        />
      ) : (
        <input
          type={isUrl ? 'url' : 'text'}
          value={String(value ?? '')}
          onChange={e => onChange(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white
                     focus:outline-none focus:border-gold-primary/50"
        />
      )}
    </div>
  )
}
```

---

### 5. Componente `SaveButton`

```typescript
function SaveButton({ onClick, saving }: { onClick: () => void; saving: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={saving}
      className="w-full py-3 bg-gold-primary hover:bg-gold-light disabled:opacity-50
                 text-primary-dark font-bold text-sm uppercase tracking-wider rounded-lg
                 transition-colors"
    >
      {saving ? 'Salvando...' : '✓ Salvar Seção'}
    </button>
  )
}
```

---

### 6. Componente principal `PageEditor` — substitui o editor atual do Dashboard

```typescript
// src/admin/PageEditor.tsx

import { useState, useEffect } from 'react'
import { fetchSections, type CmsSection } from '../lib/cmsApi'
import SectionEditor from './SectionEditor'

// Mapa de páginas disponíveis
const PAGES = [
  { slug: 'home',              label: 'Página Inicial' },
  { slug: 'quem-somos',        label: 'Quem Somos' },
  { slug: 'como-transformamos',label: 'Como Transformamos' },
  { slug: 'ag-expert',         label: 'AG Expert' },
  { slug: 'curso-cia',         label: 'Curso CIA' },
  { slug: 'valuation',         label: 'Valuation' },
  { slug: 'imersao-omappa',    label: 'Imersão O MAPPA' },
  { slug: 'nossa-equipe',      label: 'Nossa Equipe' },
  { slug: 'recomendacoes',     label: 'Recomendações' },
  { slug: 'materiais',         label: 'Materiais' },
  { slug: 'contato',           label: 'Contato' },
]

export default function PageEditor() {
  const [selectedSlug, setSelectedSlug] = useState('home')
  const [sections, setSections] = useState<CmsSection[]>([])
  const [openSection, setOpenSection] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [saveStatus, setSaveStatus] = useState<Record<string, 'ok' | 'error'>>({})

  // Carregar seções quando a página muda
  useEffect(() => {
    setLoading(true)
    setOpenSection(null)
    fetchSections(selectedSlug)
      .then(setSections)
      .finally(() => setLoading(false))
  }, [selectedSlug])

  // Salvar seção via API admin do Supabase
  const handleSave = async (updated: CmsSection) => {
    const res = await fetch(`/api/admin/sections/${updated.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: updated.title,
        content: updated.content,
        imageUrl: updated.imageUrl,
      })
    })
    setSaveStatus(prev => ({
      ...prev,
      [updated.sectionKey]: res.ok ? 'ok' : 'error'
    }))
    if (res.ok) {
      // Atualizar estado local
      setSections(prev => prev.map(s => s.id === updated.id ? updated : s))
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Seletor de Página */}
      <div>
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
          Página
        </label>
        <select
          value={selectedSlug}
          onChange={e => setSelectedSlug(e.target.value)}
          className="w-full bg-secondary-dark border border-white/10 rounded-lg px-4 py-2.5
                     text-sm text-white focus:outline-none focus:border-gold-primary/50"
        >
          {PAGES.map(p => (
            <option key={p.slug} value={p.slug}>{p.label}</option>
          ))}
        </select>
      </div>

      {/* Lista de Seções como Accordion */}
      {loading ? (
        <div className="text-center py-12 text-slate-400 text-sm">Carregando seções...</div>
      ) : sections.length === 0 ? (
        <div className="text-center py-12 text-slate-500 text-sm">
          Nenhuma seção encontrada para esta página.
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-xs text-slate-500">{sections.length} seções encontradas</p>

          {sections
            .sort((a, b) => a.orderIndex - b.orderIndex)
            .map(section => (
              <div
                key={section.sectionKey}
                className="border border-white/10 rounded-xl overflow-hidden"
              >
                {/* Header do Accordion */}
                <button
                  onClick={() => setOpenSection(
                    openSection === section.sectionKey ? null : section.sectionKey
                  )}
                  className="w-full flex items-center justify-between px-5 py-4
                             hover:bg-white/5 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-gold-primary/70 bg-gold-primary/10
                                     px-2 py-0.5 rounded">
                      {section.sectionKey}
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {section.title ?? section.sectionKey}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {saveStatus[section.sectionKey] === 'ok' && (
                      <span className="text-xs text-green-400">✓ Salvo</span>
                    )}
                    {saveStatus[section.sectionKey] === 'error' && (
                      <span className="text-xs text-red-400">✗ Erro</span>
                    )}
                    <span className="text-slate-400 text-lg">
                      {openSection === section.sectionKey ? '−' : '+'}
                    </span>
                  </div>
                </button>

                {/* Conteúdo do Accordion */}
                {openSection === section.sectionKey && (
                  <div className="px-5 pb-6 pt-2 border-t border-white/5">
                    <SectionEditor
                      section={section}
                      onSave={handleSave}
                    />
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
```

---

## INTEGRAÇÃO NO DASHBOARD EXISTENTE

No arquivo `Dashboard.tsx` (ou onde estiver o editor atual de páginas), **substituir todo o código do editor** por:

```typescript
// Remover: todo o código de editors específicos (hero editor, mvv editor, timeline editor, etc.)
// Substituir por:
import PageEditor from './PageEditor'  // ajustar o caminho

// No JSX, onde aparece o editor de páginas:
<PageEditor />
```

---

## REGRAS IMPORTANTES

1. **NÃO criar campos específicos por seção** — o `FieldEditor` detecta automaticamente o tipo pelo nome da chave
2. **NÃO duplicar lógica** — um `SectionEditor` serve para qualquer página e qualquer seção
3. **NÃO hardcodar labels** — usar a chave JSON como label (com formatação automática)
4. **Sempre salvar como `JSON.stringify()`** — nunca salvar como string plana
5. **Manter o accordion** — não abrir todas as seções de uma vez (seria pesado)
6. **A API de save já existe** — usar o endpoint `/api/admin/sections/:id` com método PUT

---

## RESULTADO ESPERADO

- Painel admin → Meu Site → Selecionar qualquer página → Ver TODAS as seções dela
- Clicar em qualquer seção → Accordion abre → Todos os campos editáveis aparecem
- Para seções de array (journeys, timeline, values) → Itens individuais editáveis + botão de adicionar/remover
- Para seções de objeto (hero, mvv, mentor) → Campos individuais editáveis
- Salvar → Feedback imediato (✓ Salvo / ✗ Erro)

**Este editor cobre 100% das seções automaticamente, sem precisar de código específico para nenhuma delas.**