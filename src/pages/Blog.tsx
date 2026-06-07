import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Calendar, Clock, ChevronRight, ChevronLeft, BookOpen, AlertCircle } from 'lucide-react'
import { blogPosts } from '../data/posts'
import type { BlogPost } from '../data/posts'
import { supabase } from '../lib/supabase'
import SEO from '../components/SEO'

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos')
  const [currentPage, setCurrentPage] = useState(1)
  const [posts, setPosts] = useState<BlogPost[]>(blogPosts)
  const postsPerPage = 9

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('site_slug', 'smartcompany')
          .eq('status', 'published')
          .order('published_at', { ascending: false })

        if (error) throw error

        if (data && data.length > 0) {
          const mapped: BlogPost[] = data.map((d: any) => ({
            id: String(d.id),
            slug: d.slug,
            title: d.title,
            excerpt: d.excerpt || (d.body ? d.body.replace(/<[^>]*>/g, '').slice(0, 150) + '...' : ''),
            content: d.body,
            date: d.published_at ? d.published_at.slice(0, 10) : new Date().toISOString().slice(0, 10),
            readTime: d.read_time || '5 min de leitura',
            category: d.category || 'Gestão Empresarial'
          }))
          setPosts(mapped)
        }
      } catch (err) {
        console.error('Erro ao buscar posts do Supabase, utilizando backup local:', err)
      }
    }
    fetchPosts()
  }, [])

  const getFeaturedImage = (content: string) => {
    if (!content) return '/assets/logo_fundo_escuro.png';
    const match = content.match(/<img[^>]+src="([^"]+)"/);
    return match ? match[1] : '/assets/logo_fundo_escuro.png';
  }

  const categories = ['Todos', 'Vendas & Comercial', 'Liderança & Equipes', 'Gestão Financeira', 'Estratégia & Planejamento', 'Gestão Empresarial']

  // Filter posts based on search query and category
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCategory =
        selectedCategory === 'Todos' || post.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [posts, searchQuery, selectedCategory])

  // Reset page when filter changes
  useMemo(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory])

  // Pagination calculation
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-')
    return `${day}/${month}/${year}`
  }

  return (
    <div className="bg-primary-dark pt-24 min-h-screen text-slate-300 font-sans">
      <SEO 
        title="Blog | Dicas de Gestão, Liderança e Vendas" 
        description="Artigos e insights práticos sobre finanças corporativas, vendas ativas, liderança e reestruturação operacional de empresas." 
      />
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
          {/* Categories Tab Scroll */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                  selectedCategory === cat
                    ? 'bg-gold-primary text-primary-dark shadow-lg shadow-gold-primary/10'
                    : 'bg-white/5 text-slate-400 border border-white/5 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80 flex-shrink-0">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar artigos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#070F1E] border border-white/10 rounded-lg py-2 pl-10 pr-4 text-slate-200 text-sm focus:outline-none focus:border-gold-primary transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Feed Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {currentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts.map((post) => {
              const imageUrl = getFeaturedImage(post.content)
              return (
                <div
                  key={post.id}
                  className="glass rounded-xl overflow-hidden border border-white/5 hover:border-gold-primary/15 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                    <img
                      src={imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                      {formatDate(post.date)}
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
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16 space-y-3">
            <AlertCircle className="w-12 h-12 text-slate-500 mx-auto" />
            <h3 className="text-lg font-display font-bold text-white uppercase">Nenhum artigo encontrado</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Experimente limpar o campo de busca ou selecionar outra categoria para explorar nossos conteúdos.
            </p>
          </div>
        )}

        {/* Pagination Controls */}
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
