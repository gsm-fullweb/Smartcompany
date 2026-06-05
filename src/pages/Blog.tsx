import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Search, Calendar, Clock, ChevronRight, ChevronLeft, BookOpen, AlertCircle, Loader2 } from 'lucide-react'
import { fetchPosts, fetchCategories, type CmsPost } from '../lib/cmsApi'

const POSTS_PER_PAGE = 9

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos')
  const [currentPage, setCurrentPage] = useState(1)
  const [categories, setCategories] = useState<string[]>(['Todos'])
  const [posts, setPosts] = useState<CmsPost[]>([])
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState('')
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchQuery), 400)
    return () => clearTimeout(t)
  }, [searchQuery])

  // Load categories once
  useEffect(() => {
    fetchCategories()
      .then((cats) => setCategories(['Todos', ...cats]))
      .catch(() => {})
  }, [])

  // Load posts whenever filters change
  const loadPosts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await fetchPosts({
        category: selectedCategory !== 'Todos' ? selectedCategory : undefined,
        search: debouncedSearch || undefined,
        page: currentPage,
        limit: POSTS_PER_PAGE,
      })
      setPosts(result.posts)
      setTotal(result.total)
      setTotalPages(result.totalPages)
    } catch (err) {
      setError('Não foi possível carregar os artigos. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }, [selectedCategory, debouncedSearch, currentPage])

  useEffect(() => {
    loadPosts()
  }, [loadPosts])

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, debouncedSearch])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('pt-BR')
  }

  return (
    <div className="bg-primary-dark pt-24 min-h-screen text-slate-300 font-sans">
      {/* Hero Banner */}
      <section className="relative bg-[#091120] py-16 border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <BookOpen className="w-8 h-8 text-gold-primary mx-auto" />
          <h1 className="text-4xl sm:text-5xl font-display font-black text-white tracking-tight uppercase">
            Blog Smart Company
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
            Dicas práticas de estratégia, finanças corporativas, vendas e liderança empresarial escritas por quem vive a rotina do mercado.
          </p>
        </div>
      </section>

      {/* Feed Filters */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                  selectedCategory === cat
                    ? 'bg-gold-primary text-primary-dark'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          {/* Search */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Buscar artigos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:border-gold-primary/50 focus:ring-1 focus:ring-gold-primary/30 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Results count */}
        {!loading && !error && (
          <p className="text-xs text-slate-500 mb-8 font-semibold uppercase tracking-widest">
            {total} {total === 1 ? 'artigo encontrado' : 'artigos encontrados'}
          </p>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 text-gold-primary animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-16 space-y-3">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto" />
            <h3 className="text-lg font-display font-bold text-white uppercase">Erro ao carregar</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">{error}</p>
            <button
              onClick={loadPosts}
              className="mt-4 px-6 py-2 bg-gold-primary text-primary-dark text-xs font-bold uppercase rounded-lg"
            >
              Tentar novamente
            </button>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <AlertCircle className="w-12 h-12 text-slate-500 mx-auto" />
            <h3 className="text-lg font-display font-bold text-white uppercase">Nenhum artigo encontrado</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Experimente limpar o campo de busca ou selecionar outra categoria para explorar nossos conteúdos.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div
                key={post.id}
                className="glass rounded-xl overflow-hidden border border-white/5 hover:border-gold-primary/15 transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                  <img
                    src={post.imageUrl || '/assets/logo_fundo_escuro.png'}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/assets/logo_fundo_escuro.png'
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-gold-primary/95 text-primary-dark rounded-md text-[10px] font-bold uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 space-y-4 flex-grow">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-display font-bold text-white group-hover:text-gold-primary transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
                <div className="px-6 pb-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-semibold uppercase flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(post.publishedAt)}
                  </span>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-white group-hover:text-gold-primary transition-colors"
                  >
                    <span>Ler Artigo</span>
                    <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 mt-16">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors border border-white/5"
              aria-label="Página anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNum = idx + 1
              if (totalPages > 7 && Math.abs(pageNum - currentPage) > 2 && pageNum !== 1 && pageNum !== totalPages) {
                if (pageNum === 2 || pageNum === totalPages - 1) return <span key={pageNum} className="text-slate-500">…</span>
                return null
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border ${
                    currentPage === pageNum
                      ? 'bg-gold-primary text-primary-dark border-gold-primary shadow-lg shadow-gold-primary/10'
                      : 'bg-white/5 text-slate-400 border-white/5 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {pageNum}
                </button>
              )
            })}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors border border-white/5"
              aria-label="Próxima página"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </section>
    </div>
  )
}
