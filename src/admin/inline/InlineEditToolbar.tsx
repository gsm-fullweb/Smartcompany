import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Pencil, Save, X, RotateCcw, Loader2, CheckCircle2 } from 'lucide-react'
import { useInlineEdit } from './InlineEditContext'

// ─────────────────────────────────────────────────────────────────────────────
// InlineEditToolbar
//
// Barra flutuante exibida APENAS para administradores logados, sobre o site
// público. Permite ativar a edição, salvar ou descartar. Não aparece nas rotas
// do painel (/admin). Não interfere em nada para visitantes comuns.
// ─────────────────────────────────────────────────────────────────────────────

export default function InlineEditToolbar() {
  const { isAdmin, editing, setEditing, dirty, saving, save, discard } = useInlineEdit()
  const { pathname } = useLocation()
  const [savedFlash, setSavedFlash] = useState(false)

  useEffect(() => {
    if (!savedFlash) return
    const t = setTimeout(() => setSavedFlash(false), 2500)
    return () => clearTimeout(t)
  }, [savedFlash])

  // Não mostrar no painel admin nem para visitantes
  if (!isAdmin || pathname.startsWith('/admin')) return null

  const handleSave = async () => {
    const ok = await save()
    if (ok) setSavedFlash(true)
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[55] print:hidden">
      <div className="glass border border-white/10 rounded-2xl shadow-2xl px-3 py-2.5 flex items-center gap-2">
        {!editing ? (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gold-primary hover:bg-gold-light text-primary-dark font-bold text-xs uppercase tracking-wider rounded-lg transition-colors shadow-lg shadow-gold-primary/10"
          >
            <Pencil className="w-4 h-4" />
            <span>Editar Página</span>
          </button>
        ) : (
          <>
            <span className="hidden sm:flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gold-primary px-2">
              <span className="w-2 h-2 rounded-full bg-gold-primary animate-pulse" />
              Modo Edição
            </span>

            <button
              type="button"
              onClick={handleSave}
              disabled={!dirty || saving}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gold-primary hover:bg-gold-light text-primary-dark font-bold text-xs uppercase tracking-wider rounded-lg transition-colors shadow-lg shadow-gold-primary/10 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Salvar Alterações</span>
            </button>

            <button
              type="button"
              onClick={discard}
              disabled={!dirty || saving}
              title="Descartar alterações não salvas"
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors disabled:opacity-40"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Descartar</span>
            </button>

            <button
              type="button"
              onClick={() => { discard(); setEditing(false) }}
              disabled={saving}
              title="Sair do modo edição"
              className="inline-flex items-center justify-center p-2 bg-white/5 border border-white/10 hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400 text-slate-300 rounded-lg transition-colors disabled:opacity-40"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        )}

        {savedFlash && (
          <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400 pl-1 pr-2 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4" />
            Salvo
          </span>
        )}
      </div>
    </div>
  )
}
