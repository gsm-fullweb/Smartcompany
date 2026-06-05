import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Calendar, Clock, ArrowLeft, BookOpen, ChevronRight, Award, Loader2, AlertCircle } from 'lucide-react'
import { fetchPostBySlug, fetchPosts, type CmsPostFull, type CmsPost } from '../lib/cmsApi'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<CmsPostFull | null>(null)
  const [related, setRelated] = useState<CmsPost[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    setNotFound(false)

    fetchPostBySlug(slug)
      .then(async (p) => {
        if (!p) {
          setNotFound(true)
          return
        }
        setPost(p)
        // Load related posts (same category)
        try {
          const result = await fetchPosts({ category: p.category, limit: 4 })
          setRelated(result.posts.filter((r) => r.slug !== slug).slice(0, 3))
        } catch {
          // related posts are optional
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [slug])

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR')
  }

  if (loading) {
    return (
      <div className="bg-primary-dark pt-24 min-h-screen text-slate-300 font-sans flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-gold-primary animate-spin" />
      </div>
    )
  }

  if (notFound || !post) {
    return (
      <div className="bg-primary-dark pt-24 min-h-screen text-slate-300 font-sans flex items-center justify-center">
        <div className="text-center space-y-4 max-w-sm px-4">
          <AlertCircle className="w-12 h-12 text-slate-500 mx-auto" />
          <h2 className="text-3xl font-display font-black text-white uppercase">Artigo Não Encontrado</h2>
          <p className="text-sm text-slate-400">O link que você acessou pode estar expirado ou ter sido movido permanentemente.</p>
          <Link
            to="/blog"
            className="inline-flex items-center justify-center px-6 py-3 text-xs font-bold uppercase tracking-wider text-primary-dark bg-gold-primary hover:bg-gold-light rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Voltar ao Blog</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-primary-dark pt-24 min-h-screen text-slate-300 font-sans">
      {/* Article Header */}
      <section className="relative bg-[#091120] py-16 border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Link
            to="/blog"
            className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            <span>Voltar ao Feed</span>
          </Link>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
            <span className="px-3 py-1 bg-gold-primary/10 text-gold-primary rounded-full font-bold uppercase tracking-wider">
              {post.category}
            </span>
            <span className="flex items-center gap-1 font-semibold">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1 font-semibold">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-black text-white leading-tight">
            {post.title}
          </h1>

          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full rounded-xl object-cover max-h-96"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
            />
          )}
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article
          className="blog-content text-slate-300 text-base leading-relaxed space-y-6"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
      </section>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="py-20 bg-[#091120] border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between border-b border-white/5 pb-6 mb-12">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-gold-primary" />
                <span>Artigos Recomendados</span>
              </h2>
              <Link
                to="/blog"
                className="text-xs font-bold uppercase tracking-widest text-gold-primary hover:text-gold-light flex items-center"
              >
                <span>Ver Todos</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((p) => (
                <div
                  key={p.id}
                  className="glass rounded-xl overflow-hidden border border-white/5 hover:border-gold-primary/10 transition-all flex flex-col justify-between"
                >
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span className="font-bold text-gold-primary uppercase tracking-wider">{p.category}</span>
                      <span>{p.readTime}</span>
                    </div>
                    <h3 className="font-display font-bold text-white leading-snug line-clamp-2 hover:text-gold-primary transition-colors">
                      <Link to={`/blog/${p.slug}`}>{p.title}</Link>
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2">{p.excerpt}</p>
                  </div>
                  <div className="px-6 pb-6 pt-4 border-t border-white/5">
                    <Link
                      to={`/blog/${p.slug}`}
                      className="text-xs font-bold uppercase tracking-widest text-white hover:text-gold-primary flex items-center justify-between"
                    >
                      <span>Ler Artigo</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trust Sign */}
      <section className="py-12 border-t border-white/5 text-center text-xs text-slate-500">
        <div className="max-w-md mx-auto flex items-center justify-center gap-2">
          <Award className="w-4 h-4 text-gold-primary flex-shrink-0" />
          <span>Foco no Lucro, Liderança e Crescimento Sadio. Smart Company.</span>
        </div>
      </section>
    </div>
  )
}
