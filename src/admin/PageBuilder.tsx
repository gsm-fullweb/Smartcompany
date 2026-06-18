import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Plus, Trash2, ChevronUp, ChevronDown, ArrowLeft, ExternalLink, Loader2,
  Save, Eye, FileText, GripVertical, Upload,
} from 'lucide-react'
import { supabase } from '../lib/supabase'
import {
  BLOCK_DEFS, SECTION_KEY_PREFIX, newBlockId, slugify,
  type Block, type BlockType, type CustomPage,
} from './blocks/blockTypes'

interface PageBuilderProps {
  currentSlug: string
}

interface PageListItem {
  slug: string
  title: string
  status: string
  show_in_menu: boolean
}

const inputCls =
  'w-full bg-[#070F1E] border border-white/10 rounded-lg py-2 px-3 text-white text-xs focus:outline-none focus:border-gold-primary transition-colors'
const labelCls = 'block text-[10px] font-bold uppercase text-slate-500 mb-1 tracking-wider'

export default function PageBuilder({ currentSlug }: PageBuilderProps) {
  const [pages, setPages] = useState<PageListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<CustomPage | null>(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState<{ text: string; tone: 'ok' | 'err' } | null>(null)
  const [newTitle, setNewTitle] = useState('')
  const [showAddBlock, setShowAddBlock] = useState(false)

  const flash = (text: string, tone: 'ok' | 'err' = 'ok') => {
    setMsg({ text, tone })
    setTimeout(() => setMsg(null), 3500)
  }

  const loadPages = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from('site_sections')
      .select('section_key, title, metadata')
      .eq('site_slug', currentSlug)
      .like('section_key', `${SECTION_KEY_PREFIX}%`)
    const list: PageListItem[] = (data || []).map((r: any) => ({
      slug: r.section_key.slice(SECTION_KEY_PREFIX.length),
      title: r.title || '(sem título)',
      status: r.metadata?.status || 'draft',
      show_in_menu: !!r.metadata?.show_in_menu,
    }))
    list.sort((a, b) => a.title.localeCompare(b.title))
    setPages(list)
    setLoading(false)
  }, [currentSlug])

  useEffect(() => { loadPages() }, [loadPages])

  // ── Criar página ──
  const createPage = async () => {
    const title = newTitle.trim()
    if (!title) return
    const slug = slugify(title)
    if (!slug) { flash('Título inválido para gerar o endereço.', 'err'); return }
    if (pages.some(p => p.slug === slug)) { flash('Já existe uma página com esse endereço.', 'err'); return }
    setSaving(true)
    const { error } = await supabase.from('site_sections').insert([{
      site_slug: currentSlug,
      section_key: `${SECTION_KEY_PREFIX}${slug}`,
      title,
      content: '',
      metadata: { seo_description: '', status: 'draft', show_in_menu: false, menu_order: 100, blocks: [] },
    }])
    setSaving(false)
    if (error) { flash('Erro ao criar: ' + error.message, 'err'); return }
    setNewTitle('')
    await loadPages()
    openPage(slug)
  }

  // ── Abrir página para edição ──
  const openPage = async (slug: string) => {
    const { data } = await supabase
      .from('site_sections').select('*')
      .eq('site_slug', currentSlug).eq('section_key', `${SECTION_KEY_PREFIX}${slug}`).maybeSingle()
    if (!data) return
    const m = (data.metadata || {}) as any
    setEditing({
      slug,
      title: data.title || '',
      seo_description: m.seo_description || '',
      status: m.status || 'draft',
      show_in_menu: !!m.show_in_menu,
      menu_order: typeof m.menu_order === 'number' ? m.menu_order : 100,
      blocks: Array.isArray(m.blocks) ? m.blocks : [],
    })
    setShowAddBlock(false)
  }

  // ── Salvar página ──
  const savePage = async () => {
    if (!editing) return
    setSaving(true)
    const { error } = await supabase.from('site_sections').upsert({
      site_slug: currentSlug,
      section_key: `${SECTION_KEY_PREFIX}${editing.slug}`,
      title: editing.title,
      content: '',
      metadata: {
        seo_description: editing.seo_description,
        status: editing.status,
        show_in_menu: editing.show_in_menu,
        menu_order: editing.menu_order,
        blocks: editing.blocks,
      },
      updated_at: new Date().toISOString(),
    }, { onConflict: 'site_slug,section_key' })
    setSaving(false)
    if (error) { flash('Erro ao salvar: ' + error.message, 'err'); return }
    flash('Página salva com sucesso!')
    loadPages()
  }

  const deletePage = async (slug: string) => {
    if (!window.confirm('Excluir esta página permanentemente?')) return
    const { error } = await supabase.from('site_sections').delete()
      .eq('site_slug', currentSlug).eq('section_key', `${SECTION_KEY_PREFIX}${slug}`)
    if (error) { flash('Erro ao excluir: ' + error.message, 'err'); return }
    if (editing?.slug === slug) setEditing(null)
    flash('Página excluída.')
    loadPages()
  }

  // ── Helpers de bloco ──
  const updateBlock = (id: string, data: Record<string, any>) => {
    setEditing(prev => prev && { ...prev, blocks: prev.blocks.map(b => b.id === id ? { ...b, data } : b) })
  }
  const addBlock = (type: BlockType) => {
    const def = BLOCK_DEFS.find(d => d.type === type)!
    const block: Block = { id: newBlockId(), type, data: JSON.parse(JSON.stringify(def.defaultData)) }
    setEditing(prev => prev && { ...prev, blocks: [...prev.blocks, block] })
    setShowAddBlock(false)
  }
  const removeBlock = (id: string) => {
    setEditing(prev => prev && { ...prev, blocks: prev.blocks.filter(b => b.id !== id) })
  }
  const moveBlock = (id: string, dir: -1 | 1) => {
    setEditing(prev => {
      if (!prev) return prev
      const i = prev.blocks.findIndex(b => b.id === id)
      const j = i + dir
      if (i < 0 || j < 0 || j >= prev.blocks.length) return prev
      const blocks = [...prev.blocks]
      ;[blocks[i], blocks[j]] = [blocks[j], blocks[i]]
      return { ...prev, blocks }
    })
  }

  // ─── LISTA ──────────────────────────────────────────────────────────────────
  if (!editing) {
    return (
      <div className="space-y-6 animate-in fade-in duration-200">
        {msg && <Banner msg={msg} />}
        <div className="glass rounded-xl border border-white/5 p-5 space-y-4">
          <label className={labelCls}>Criar nova página</label>
          <div className="flex gap-2">
            <input
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') createPage() }}
              placeholder="Nome da página (ex: Black Friday 2026)"
              className={inputCls}
            />
            <button
              type="button" onClick={createPage} disabled={saving || !newTitle.trim()}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-gold-primary hover:bg-gold-light text-primary-dark font-bold uppercase tracking-wider rounded-lg text-xs disabled:opacity-50 whitespace-nowrap"
            >
              <Plus className="w-4 h-4" /> Nova Página
            </button>
          </div>
          {newTitle.trim() && (
            <p className="text-[10px] text-slate-500">Endereço: <span className="text-gold-primary font-mono">/{slugify(newTitle)}</span></p>
          )}
        </div>

        <div className="glass rounded-xl border border-white/5 overflow-hidden">
          {loading ? (
            <div className="py-12 flex justify-center"><Loader2 className="w-6 h-6 text-gold-primary animate-spin" /></div>
          ) : pages.length === 0 ? (
            <div className="py-12 text-center text-slate-500 space-y-2">
              <FileText className="w-8 h-8 mx-auto stroke-1" />
              <p className="text-xs uppercase font-bold tracking-wider">Nenhuma página personalizada ainda</p>
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-secondary-dark/60 border-b border-white/5 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                  <th className="px-5 py-3">Título</th>
                  <th className="px-5 py-3">Endereço</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Menu</th>
                  <th className="px-5 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {pages.map(p => (
                  <tr key={p.slug} className="hover:bg-white/2 transition-colors">
                    <td className="px-5 py-3 font-semibold text-white">{p.title}</td>
                    <td className="px-5 py-3 text-slate-400 font-mono">/{p.slug}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${p.status === 'published' ? 'bg-accent-green/10 text-accent-green border border-accent-green/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'}`}>
                        {p.status === 'published' ? 'Publicada' : 'Rascunho'}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-slate-400">{p.show_in_menu ? 'Sim' : '—'}</td>
                    <td className="px-5 py-3 text-right space-x-1">
                      <a href={`/${p.slug}`} target="_blank" rel="noreferrer" title="Ver página" className="inline-flex p-1.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-md">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button type="button" onClick={() => openPage(p.slug)} title="Editar" className="inline-flex p-1.5 text-slate-400 hover:text-gold-primary hover:bg-white/5 rounded-md">
                        <FileText className="w-4 h-4" />
                      </button>
                      <button type="button" onClick={() => deletePage(p.slug)} title="Excluir" className="inline-flex p-1.5 text-slate-400 hover:text-accent-red hover:bg-white/5 rounded-md">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    )
  }

  // ─── EDITOR ─────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {msg && <Banner msg={msg} />}

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <button type="button" onClick={() => { setEditing(null); loadPages() }} className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </button>
        <div className="flex items-center gap-2">
          <a href={`/${editing.slug}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-3 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 rounded-lg text-xs font-bold uppercase tracking-wider">
            <Eye className="w-3.5 h-3.5" /> Ver
          </a>
          <button type="button" onClick={savePage} disabled={saving} className="inline-flex items-center gap-1.5 px-4 py-2 bg-gold-primary hover:bg-gold-light text-primary-dark font-bold uppercase tracking-wider rounded-lg text-xs disabled:opacity-50">
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />} Salvar
          </button>
        </div>
      </div>

      {/* Configurações da página */}
      <div className="glass rounded-xl border border-white/5 p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Título da página</label>
          <input value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Endereço (não editável)</label>
          <input value={`/${editing.slug}`} disabled className={`${inputCls} opacity-60 font-mono`} />
        </div>
        <div className="md:col-span-2">
          <label className={labelCls}>Descrição para SEO</label>
          <input value={editing.seo_description} onChange={e => setEditing({ ...editing, seo_description: e.target.value })} className={inputCls} placeholder="Resumo da página para mecanismos de busca" />
        </div>
        <div>
          <label className={labelCls}>Status</label>
          <select value={editing.status} onChange={e => setEditing({ ...editing, status: e.target.value as any })} className={inputCls}>
            <option value="draft">Rascunho</option>
            <option value="published">Publicada</option>
          </select>
        </div>
        <div className="flex items-end gap-4">
          <label className="flex items-center gap-2 cursor-pointer pb-2">
            <input type="checkbox" checked={editing.show_in_menu} onChange={e => setEditing({ ...editing, show_in_menu: e.target.checked })} className="w-4 h-4 accent-gold-primary" />
            <span className="text-xs text-slate-300 font-semibold">Mostrar no menu</span>
          </label>
          <div className="flex-1">
            <label className={labelCls}>Ordem no menu</label>
            <input type="number" value={editing.menu_order} onChange={e => setEditing({ ...editing, menu_order: Number(e.target.value) })} className={inputCls} />
          </div>
        </div>
      </div>

      {/* Blocos */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-display font-bold text-white uppercase tracking-wider">Blocos da página</h3>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider">{editing.blocks.length} bloco(s)</span>
        </div>

        {editing.blocks.map((block, idx) => (
          <div key={block.id} className="glass rounded-xl border border-white/5 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 bg-secondary-dark/40 border-b border-white/5">
              <div className="flex items-center gap-2">
                <GripVertical className="w-3.5 h-3.5 text-slate-600" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold-primary">
                  {BLOCK_DEFS.find(d => d.type === block.type)?.label || block.type}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button type="button" onClick={() => moveBlock(block.id, -1)} disabled={idx === 0} className="p-1 text-slate-500 hover:text-white disabled:opacity-30"><ChevronUp className="w-4 h-4" /></button>
                <button type="button" onClick={() => moveBlock(block.id, 1)} disabled={idx === editing.blocks.length - 1} className="p-1 text-slate-500 hover:text-white disabled:opacity-30"><ChevronDown className="w-4 h-4" /></button>
                <button type="button" onClick={() => removeBlock(block.id)} className="p-1 text-slate-500 hover:text-accent-red"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            <div className="p-4">
              <BlockFields block={block} onChange={data => updateBlock(block.id, data)} currentSlug={currentSlug} />
            </div>
          </div>
        ))}

        {/* Adicionar bloco */}
        {showAddBlock ? (
          <div className="glass rounded-xl border border-gold-primary/20 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Escolha o tipo de bloco</span>
              <button type="button" onClick={() => setShowAddBlock(false)} className="text-[10px] text-slate-500 hover:text-white uppercase font-bold">Cancelar</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {BLOCK_DEFS.map(def => (
                <button key={def.type} type="button" onClick={() => addBlock(def.type)} className="text-left p-3 bg-secondary-dark/60 hover:bg-[#0c192f] border border-white/5 hover:border-gold-primary/30 rounded-lg transition-all">
                  <div className="text-xs font-bold text-white">{def.label}</div>
                  <div className="text-[10px] text-slate-500 leading-tight mt-0.5">{def.description}</div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <button type="button" onClick={() => setShowAddBlock(true)} className="w-full py-3 border border-dashed border-white/15 rounded-xl text-xs text-slate-500 hover:border-gold-primary/40 hover:text-gold-primary transition-colors flex items-center justify-center gap-1.5">
            <Plus className="w-4 h-4" /> Adicionar bloco
          </button>
        )}
      </div>
    </div>
  )
}

function Banner({ msg }: { msg: { text: string; tone: 'ok' | 'err' } }) {
  return (
    <div className={`px-4 py-2.5 rounded-lg text-xs font-semibold border ${msg.tone === 'ok' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' : 'bg-red-500/10 border-red-500/20 text-red-300'}`}>
      {msg.text}
    </div>
  )
}

// ─── Campos por tipo de bloco ────────────────────────────────────────────────
function BlockFields({ block, onChange, currentSlug }: { block: Block; onChange: (data: Record<string, any>) => void; currentSlug: string }) {
  const d = block.data || {}
  const set = (k: string, v: any) => onChange({ ...d, [k]: v })
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const ext = file.name.split('.').pop()
      const fileName = `${currentSlug}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
      const filePath = `uploads/${fileName}`
      const { error } = await supabase.storage
        .from('site-assets')
        .upload(filePath, file, { cacheControl: '3600', upsert: false })
      if (error) throw error
      const { data: { publicUrl } } = supabase.storage.from('site-assets').getPublicUrl(filePath)
      onChange({ ...d, url: publicUrl })
    } catch (err: any) {
      alert('Erro ao enviar a imagem: ' + err.message)
    } finally {
      setUploading(false)
    }
  }

  const field = (k: string, label: string, opts: { area?: boolean; placeholder?: string } = {}) => (
    <div>
      <label className={labelCls}>{label}</label>
      {opts.area ? (
        <textarea value={d[k] ?? ''} onChange={e => set(k, e.target.value)} rows={3} placeholder={opts.placeholder} className={`${inputCls} resize-y`} />
      ) : (
        <input value={d[k] ?? ''} onChange={e => set(k, e.target.value)} placeholder={opts.placeholder} className={inputCls} />
      )}
    </div>
  )

  switch (block.type) {
    case 'hero':
      return <div className="space-y-3">{field('badge', 'Selo')}{field('title', 'Título')}{field('content', 'Texto', { area: true })}</div>
    case 'text':
      return <div className="space-y-3">{field('heading', 'Título da seção')}{field('body', 'Conteúdo', { area: true, placeholder: 'Separe parágrafos com uma linha em branco.' })}</div>
    case 'image':
      return (
        <div className="space-y-3">
          <div>
            <label className={labelCls}>Imagem</label>
            <div className="flex gap-2 items-center">
              {d.url ? (
                <div className="w-14 h-14 rounded-lg overflow-hidden border border-white/10 flex-shrink-0 bg-[#070F1E]">
                  <img src={d.url} alt="" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-14 h-14 rounded-lg border border-dashed border-white/20 flex-shrink-0 flex items-center justify-center bg-[#070F1E] text-slate-600">
                  <FileText className="w-5 h-5" />
                </div>
              )}
              <input value={d.url ?? ''} onChange={e => set('url', e.target.value)} placeholder="https://... ou envie um arquivo" className={inputCls} />
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 disabled:opacity-50 whitespace-nowrap"
              >
                {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                <span>{uploading ? 'Enviando...' : 'Enviar'}</span>
              </button>
            </div>
          </div>
          {field('alt', 'Texto alternativo')}
          {field('caption', 'Legenda (opcional)')}
        </div>
      )
    case 'cta':
      return <div className="space-y-3">{field('heading', 'Título')}{field('text', 'Texto', { area: true })}{field('label', 'Texto do botão')}{field('link', 'Link do botão', { placeholder: '/contato ou https://...' })}</div>
    case 'cards': {
      const items: any[] = Array.isArray(d.items) ? d.items : []
      const setItem = (i: number, kk: string, vv: any) => set('items', items.map((it, idx) => idx === i ? { ...it, [kk]: vv } : it))
      return (
        <div className="space-y-3">
          {field('heading', 'Título da seção')}
          <div className="space-y-2">
            {items.map((it, i) => (
              <div key={i} className="p-3 bg-[#070F1E]/40 border border-white/5 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-500">Card {i + 1}</span>
                  <button type="button" onClick={() => set('items', items.filter((_, idx) => idx !== i))} className="text-slate-600 hover:text-accent-red"><Trash2 className="w-3 h-3" /></button>
                </div>
                <input value={it.title ?? ''} onChange={e => setItem(i, 'title', e.target.value)} placeholder="Título do card" className={inputCls} />
                <textarea value={it.desc ?? ''} onChange={e => setItem(i, 'desc', e.target.value)} rows={2} placeholder="Descrição" className={`${inputCls} resize-y`} />
              </div>
            ))}
            <button type="button" onClick={() => set('items', [...items, { title: '', desc: '' }])} className="w-full py-2 border border-dashed border-white/15 rounded-lg text-[11px] text-slate-500 hover:text-gold-primary hover:border-gold-primary/40 flex items-center justify-center gap-1">
              <Plus className="w-3 h-3" /> Adicionar card
            </button>
          </div>
        </div>
      )
    }
    default:
      return null
  }
}
