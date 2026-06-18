import { useCallback, useEffect, useRef, useState } from 'react'
import { CheckCircle2, AlertTriangle, Info, X, Loader2 } from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// Sistema de feedback do painel: toasts não-bloqueantes + diálogo de confirmação
// acessível, para substituir os alert()/confirm() nativos do navegador.
// ─────────────────────────────────────────────────────────────────────────────

export type ToastTone = 'success' | 'error' | 'info'

export interface ToastItem {
  id: number
  message: string
  tone: ToastTone
}

interface ConfirmOptions {
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  tone?: 'danger' | 'default'
}

interface ConfirmState extends ConfirmOptions {
  resolve: (value: boolean) => void
}

let toastSeq = 0

export function useFeedback() {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const [confirmState, setConfirmState] = useState<ConfirmState | null>(null)

  const dismissToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const toast = useCallback((message: string, tone: ToastTone = 'success') => {
    const id = ++toastSeq
    setToasts(prev => [...prev, { id, message, tone }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 4500)
  }, [])

  const confirm = useCallback((options: ConfirmOptions): Promise<boolean> => {
    return new Promise<boolean>(resolve => {
      setConfirmState({ ...options, resolve })
    })
  }, [])

  const resolveConfirm = useCallback((value: boolean) => {
    setConfirmState(prev => {
      prev?.resolve(value)
      return null
    })
  }, [])

  return { toasts, dismissToast, toast, confirm, confirmState, resolveConfirm }
}

// ─── Toast viewport ──────────────────────────────────────────────────────────

const toneStyles: Record<ToastTone, { icon: typeof CheckCircle2; ring: string; text: string }> = {
  success: { icon: CheckCircle2, ring: 'border-emerald-500/30 bg-emerald-500/10', text: 'text-emerald-300' },
  error: { icon: AlertTriangle, ring: 'border-red-500/30 bg-red-500/10', text: 'text-red-300' },
  info: { icon: Info, ring: 'border-gold-primary/30 bg-gold-primary/10', text: 'text-gold-primary' },
}

export function ToastViewport({ toasts, onDismiss }: { toasts: ToastItem[]; onDismiss: (id: number) => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-3 w-full max-w-sm pointer-events-none">
      {toasts.map(t => {
        const { icon: Icon, ring, text } = toneStyles[t.tone]
        return (
          <div
            key={t.id}
            role="status"
            className={`pointer-events-auto glass border ${ring} rounded-xl shadow-2xl px-4 py-3 flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200`}
          >
            <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${text}`} />
            <p className="flex-grow text-xs font-medium text-slate-200 leading-relaxed">{t.message}</p>
            <button
              type="button"
              onClick={() => onDismiss(t.id)}
              aria-label="Fechar notificação"
              className="text-slate-500 hover:text-white transition-colors flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )
      })}
    </div>
  )
}

// ─── Confirm dialog ──────────────────────────────────────────────────────────

export function ConfirmDialog({
  state,
  onResolve,
  busy = false,
}: {
  state: ConfirmState | null
  onResolve: (value: boolean) => void
  busy?: boolean
}) {
  const confirmRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!state) return
    confirmRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !busy) onResolve(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [state, busy, onResolve])

  if (!state) return null

  const isDanger = state.tone === 'danger'

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-150"
      onClick={() => !busy && onResolve(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="glass w-full max-w-md rounded-2xl border border-white/10 shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in duration-200"
      >
        <div className="flex items-start gap-4">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
              isDanger ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-gold-primary/10 text-gold-primary border border-gold-primary/20'
            }`}
          >
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1.5 pt-0.5">
            <h2 id="confirm-title" className="text-base font-display font-bold text-white tracking-wide">
              {state.title}
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">{state.message}</p>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-1">
          <button
            type="button"
            onClick={() => onResolve(false)}
            disabled={busy}
            className="px-4 py-2 border border-white/5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
          >
            {state.cancelLabel || 'Cancelar'}
          </button>
          <button
            ref={confirmRef}
            type="button"
            onClick={() => onResolve(true)}
            disabled={busy}
            className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50 ${
              isDanger
                ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/10'
                : 'bg-gold-primary hover:bg-gold-light text-primary-dark shadow-lg shadow-gold-primary/10'
            }`}
          >
            {busy && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            <span>{state.confirmLabel || 'Confirmar'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
