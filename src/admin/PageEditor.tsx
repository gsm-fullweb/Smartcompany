import { useState, useEffect, useCallback, useRef } from 'react'
import { ChevronDown, ChevronUp, Loader2, RefreshCw } from 'lucide-react'
import { supabase } from '../lib/supabase'
import SectionEditor, { type SiteSection } from './SectionEditor'

// ─── Mapa de páginas ─────────────────────────────────────────────────────────
// prefixes: prefixos reais dos section_keys no banco
// Ex: "home_hero", "home_journeys" → prefixo "home"
// ATENÇÃO: "nossa_equipe_members" e "nossa-equipe_hero" têm prefixos diferentes

const PAGES = [
  { id: 'home',               label: 'Página Inicial',      prefixes: ['home'] },
  { id: 'nossa-trajetoria',   label: 'Nossa Trajetória',    prefixes: ['trajetoria'] },
  { id: 'quem-somos',         label: 'Quem Somos',          prefixes: ['quemsomos'] },
  { id: 'como-transformamos', label: 'Como Transformamos',  prefixes: ['comotransformamos'] },
  { id: 'ag-expert',          label: 'AG Expert',           prefixes: ['agexpert'] },
  { id: 'curso-cia',          label: 'Curso CIA',           prefixes: ['cursocia'] },
  { id: 'valuation',          label: 'Valuation',           prefixes: ['valuation'] },
  { id: 'imersao-omappa',     label: 'Imersão O MAPPA',     prefixes: ['imersao-omappa'] },
  { id: 'nossa-equipe',       label: 'Nossa Equipe',        prefixes: ['nossa-equipe', 'nossa_equipe'] },
  { id: 'recomendacoes',      label: 'Recomendações',       prefixes: ['recomendacoes'] },
  { id: 'materiais',          label: 'Materiais',           prefixes: ['materiais'] },
  { id: 'contato',            label: 'Contato',             prefixes: ['contato'] },
  { id: 'depoimentos',        label: 'Depoimentos',         prefixes: ['depoimentos'] },
] as const

interface PageEditorProps {
  selectedPageId: string
  onPageChange: (id: string) => void
}

// ─── PageEditor ───────────────────────────────────────────────────────────────

export default function PageEditor({ selectedPageId, onPageChange }: PageEditorProps) {
  const [sections, setSections] = useState<SiteSection[]>([])
  const [openKey, setOpenKey] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  // saveStatus[sectionKey] = 'ok' enquanto o badge estiver visível
  const [saveStatus, setSaveStatus] = useState<Record<string, 'ok'>>({})
  const timerRefs = useRef<Record<string, ReturnType<typeof setTimeout>>>({})

  const selectedIndex = PAGES.findIndex(p => p.id === selectedPageId)
  const activeIndex = selectedIndex !== -1 ? selectedIndex : 0
  const selectedPage = PAGES[activeIndex]

  // ─── Carregar seções da página selecionada ──────────────────────────────

  const loadSections = useCallback(async () => {
    setLoading(true)
    setOpenKey(null)

    // Filtro: section_key LIKE 'prefixo_%' para cada prefixo da página
    // Não existe campo "page_slug" separado — usamos o prefixo do section_key
    const orFilter = selectedPage.prefixes
      .map(p => `section_key.like.${p}_%`)
      .join(',')

    const { data, error } = await supabase
      .from('site_sections')
      .select('*')
      .eq('site_slug', 'smartcompany')
      .or(orFilter)
      .order('order_index', { ascending: true })

    setLoading(false)

    if (!error && data) {
      setSections(data as SiteSection[])
    }
  }, [selectedPage])

  useEffect(() => {
    loadSections()
  }, [loadSections])

  // ─── Feedback de save: badge verde por 3 segundos ───────────────────────

  const handleSaveSuccess = useCallback((sectionKey: string) => {
    // Cancela timer anterior se houver
    if (timerRefs.current[sectionKey]) {
      clearTimeout(timerRefs.current[sectionKey])
    }
    setSaveStatus(prev => ({ ...prev, [sectionKey]: 'ok' }))
    timerRefs.current[sectionKey] = setTimeout(() => {
      setSaveStatus(prev => {
        const next = { ...prev }
        delete next[sectionKey]
        return next
      })
    }, 3000)

    // Recarrega o iframe de visualização ao vivo
    const iframe = document.getElementById('preview-iframe') as HTMLIFrameElement
    if (iframe) {
      try {
        iframe.src = iframe.src
      } catch (e) {
        console.error('Erro ao recarregar o iframe do preview:', e)
      }
    }
  }, [])

  // ─── Toggle accordion ────────────────────────────────────────────────────

  const toggleSection = (key: string) => {
    setOpenKey(prev => (prev === key ? null : key))
  }

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-3xl mx-auto p-6 space-y-6">

        {/* ── Seletor de Página ── */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold uppercase text-slate-500 tracking-widest">
              Selecionar Página
            </label>
            <button
              type="button"
              onClick={loadSections}
              disabled={loading}
              title="Recarregar seções"
              className="p-1.5 text-slate-500 hover:text-white hover:bg-white/5
                         border border-white/8 rounded-lg transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {PAGES.map((page, index) => (
              <button
                key={page.label}
                type="button"
                onClick={() => onPageChange(page.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border
                             transition-all ${
                  activeIndex === index
                    ? 'bg-gold-primary text-primary-dark border-gold-primary shadow-sm shadow-gold-primary/20'
                    : 'bg-transparent border-white/10 text-slate-400 hover:text-white hover:border-white/20 hover:bg-white/3'
                }`}
              >
                {page.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Lista de Seções ── */}
        {loading ? (
          <div className="flex items-center justify-center py-20 gap-3 text-slate-500">
            <Loader2 className="w-5 h-5 animate-spin text-gold-primary" />
            <span className="text-sm">Carregando seções...</span>
          </div>
        ) : sections.length === 0 ? (
          <div className="text-center py-20 text-slate-600 text-sm">
            Nenhuma seção encontrada para esta página.
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase text-slate-600 tracking-widest">
              {sections.length} seção{sections.length !== 1 ? 'ões' : ''} encontrada{sections.length !== 1 ? 's' : ''}
            </p>

            {sections.map(section => {
              const isOpen = openKey === section.section_key
              const isSaved = section.section_key in saveStatus

              return (
                <div
                  key={section.id}
                  className="border border-white/8 rounded-xl overflow-hidden bg-[#091120]/50"
                >
                  {/* Accordion header */}
                  <button
                    type="button"
                    onClick={() => toggleSection(section.section_key)}
                    className="w-full flex items-center justify-between px-5 py-4
                               hover:bg-white/3 transition-colors text-left gap-4"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Badge com a section_key */}
                      <span className="text-[9px] font-mono font-bold text-gold-primary/70
                                       bg-gold-primary/8 border border-gold-primary/12
                                       px-2 py-0.5 rounded flex-shrink-0">
                        {section.section_key}
                      </span>
                      {/* Título da seção */}
                      <span className="text-sm font-semibold text-white truncate">
                        {section.title ?? section.section_key}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {/* Badge "✓ Salvo" — visível por 3s após save bem-sucedido */}
                      {isSaved && (
                        <span className="text-[10px] font-bold text-emerald-400
                                         bg-emerald-400/10 border border-emerald-400/20
                                         px-2 py-0.5 rounded-md
                                         animate-in fade-in slide-in-from-right-1 duration-200">
                          ✓ Salvo
                        </span>
                      )}
                      {isOpen
                        ? <ChevronUp className="w-4 h-4 text-slate-500" />
                        : <ChevronDown className="w-4 h-4 text-slate-500" />
                      }
                    </div>
                  </button>

                  {/* Accordion body — SectionEditor universal */}
                  {isOpen && (
                    <div className="px-5 pb-6 border-t border-white/5 bg-[#070F1E]/20">
                      {/* key={section.id} garante remount ao trocar de seção */}
                      <SectionEditor
                        key={section.id}
                        section={section}
                        onSaveSuccess={() => handleSaveSuccess(section.section_key)}
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
