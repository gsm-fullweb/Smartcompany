import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { supabase } from '../lib/supabase'
import SEO from '../components/SEO'
import BlockRenderer from '../admin/blocks/BlockRenderer'
import { SECTION_KEY_PREFIX, type Block } from '../admin/blocks/blockTypes'
import { useInlineEdit } from '../admin/inline/InlineEditContext'

interface LoadedPage {
  title: string
  seo_description: string
  status: string
  blocks: Block[]
}

export default function DynamicPage() {
  const { slug } = useParams()
  const { isAdmin } = useInlineEdit()
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState<LoadedPage | null>(null)

  useEffect(() => {
    let active = true
    async function load() {
      setLoading(true)
      const { data } = await supabase
        .from('site_sections')
        .select('*')
        .eq('site_slug', 'smartcompany')
        .eq('section_key', `${SECTION_KEY_PREFIX}${slug}`)
        .maybeSingle()

      if (!active) return
      if (data) {
        const meta = (data.metadata || {}) as any
        setPage({
          title: data.title || 'Página',
          seo_description: meta.seo_description || '',
          status: meta.status || 'draft',
          blocks: Array.isArray(meta.blocks) ? meta.blocks : [],
        })
      } else {
        setPage(null)
      }
      setLoading(false)
    }
    load()
    return () => { active = false }
  }, [slug])

  if (loading) {
    return (
      <div className="bg-primary-dark min-h-screen pt-24 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-gold-primary animate-spin" />
      </div>
    )
  }

  // Página inexistente, ou rascunho visível só para administrador
  const notVisible = !page || (page.status !== 'published' && !isAdmin)
  if (notVisible) {
    return (
      <div className="bg-primary-dark min-h-screen pt-24 flex flex-col items-center justify-center text-center px-4 gap-4">
        <SEO title="Página não encontrada | Smart Company" description="" />
        <h1 className="text-3xl font-display font-black text-white uppercase">Página não encontrada</h1>
        <p className="text-sm text-slate-400">O endereço acessado não existe ou ainda não foi publicado.</p>
        <Link to="/" className="text-gold-primary hover:text-gold-light text-xs font-bold uppercase tracking-wider">
          Voltar ao início
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-primary-dark pt-24 min-h-screen text-slate-300 font-sans">
      <SEO title={`${page.title} | Smart Company`} description={page.seo_description} />
      {page.status !== 'published' && isAdmin && (
        <div className="bg-yellow-500/10 border-b border-yellow-500/20 text-yellow-300 text-center text-xs font-bold uppercase tracking-wider py-2">
          Rascunho — visível apenas para administradores
        </div>
      )}
      {page.blocks.length === 0 ? (
        <div className="py-32 text-center text-slate-600 text-sm">Esta página ainda não tem blocos.</div>
      ) : (
        page.blocks.map(block => <BlockRenderer key={block.id} block={block} />)
      )}
    </div>
  )
}
