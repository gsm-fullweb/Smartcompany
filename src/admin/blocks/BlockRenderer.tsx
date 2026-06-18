import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { Block } from './blockTypes'

// ─────────────────────────────────────────────────────────────────────────────
// BlockRenderer — renderiza um bloco de página dinâmica no site público,
// usando a identidade visual do site (tema escuro + dourado).
// ─────────────────────────────────────────────────────────────────────────────

function isExternal(link: string) {
  return /^(https?:)?\/\//.test(link) || link.startsWith('mailto:') || link.startsWith('tel:')
}

export default function BlockRenderer({ block }: { block: Block }) {
  const d = block.data || {}

  switch (block.type) {
    case 'hero':
      return (
        <section className="relative bg-[#070F1E] py-24 border-b border-white/5 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-primary/5 rounded-full blur-3xl -z-10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            {d.badge && (
              <span className="text-[10px] font-bold text-gold-primary uppercase tracking-widest bg-gold-primary/10 py-1.5 px-4 rounded-full border border-gold-primary/20 inline-block">
                {d.badge}
              </span>
            )}
            <h1 className="text-4xl sm:text-5xl font-display font-black text-white tracking-tight leading-tight uppercase">
              {d.title}
            </h1>
            {d.content && (
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                {d.content}
              </p>
            )}
          </div>
        </section>
      )

    case 'text':
      return (
        <section className="py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {d.heading && (
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white uppercase tracking-tight">
              {d.heading}
            </h2>
          )}
          {d.body && (
            <div className="space-y-4 text-sm sm:text-base text-slate-400 leading-relaxed">
              {String(d.body).split('\n\n').map((p: string, i: number) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}
        </section>
      )

    case 'image':
      return (
        <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {d.url ? (
            <figure className="space-y-3">
              <img src={d.url} alt={d.alt || ''} className="w-full rounded-2xl border border-white/10 shadow-2xl" />
              {d.caption && (
                <figcaption className="text-center text-xs text-slate-500 italic">{d.caption}</figcaption>
              )}
            </figure>
          ) : (
            <div className="w-full aspect-[16/9] rounded-2xl border border-dashed border-white/15 flex items-center justify-center text-slate-600 text-sm">
              (imagem não definida)
            </div>
          )}
        </section>
      )

    case 'cards':
      return (
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {d.heading && (
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white uppercase tracking-tight text-center mb-12">
              {d.heading}
            </h2>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(d.items || []).map((item: any, i: number) => (
              <div key={i} className="p-6 bg-[#091120] rounded-xl border border-white/5 space-y-3 hover:border-gold-primary/20 transition-colors">
                <div className="text-2xl font-display font-black text-gold-primary">0{i + 1}</div>
                <h3 className="text-lg font-display font-bold text-white">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )

    case 'cta':
      return (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto bg-primary-dark/40 border border-white/5 rounded-2xl p-10 text-center space-y-5">
            {d.heading && (
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white uppercase tracking-tight">{d.heading}</h2>
            )}
            {d.text && <p className="text-sm text-slate-400 leading-relaxed max-w-xl mx-auto">{d.text}</p>}
            {d.label && (
              isExternal(d.link || '') ? (
                <a
                  href={d.link || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gold-primary hover:bg-gold-light text-primary-dark font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-gold-primary/10"
                >
                  <span>{d.label}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              ) : (
                <Link
                  to={d.link || '#'}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gold-primary hover:bg-gold-light text-primary-dark font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-gold-primary/10"
                >
                  <span>{d.label}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )
            )}
          </div>
        </section>
      )

    default:
      return null
  }
}
