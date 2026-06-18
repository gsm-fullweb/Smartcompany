import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowRight, ShieldCheck, ChevronDown } from 'lucide-react'
import { supabase } from '../lib/supabase'

interface CustomNavItem { name: string; href: string }

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [customPages, setCustomPages] = useState<CustomNavItem[]>([])
  const location = useLocation()

  // Carrega páginas personalizadas publicadas marcadas para o menu
  useEffect(() => {
    let active = true
    supabase
      .from('site_sections')
      .select('section_key, title, metadata')
      .eq('site_slug', 'smartcompany')
      .like('section_key', 'cpage_%')
      .then(({ data }) => {
        if (!active || !data) return
        const items = data
          .filter((r: any) => r.metadata?.status === 'published' && r.metadata?.show_in_menu)
          .sort((a: any, b: any) => (a.metadata?.menu_order ?? 100) - (b.metadata?.menu_order ?? 100))
          .map((r: any) => ({ name: r.title || 'Página', href: `/${r.section_key.slice('cpage_'.length)}` }))
        setCustomPages(items)
      })
    return () => { active = false }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  // Institutional items
  const institutionalItems = [
    { name: 'Nossa Trajetória', href: '/nossa-trajetoria' },
    { name: 'Nossa Equipe', href: '/nossa-equipe' },
    { name: 'Depoimentos', href: '/depoimentos' },
  ]

  // Consultoria items
  const consultoriaItems = [
    { name: 'Como Transformamos', href: '/como-transformamos-empresas' },
    { name: 'Valuation & M&A', href: '/valuation-avaliacao-compra-e-venda-de-empresas' },
  ]

  // Cursos/Treinamentos items
  const treinamentosItems = [
    { name: 'AG Expert (Sócios)', href: '/auto-gestao-empresarial-para-donos-de-empresas' },
    { name: 'Curso CIA (Comercial)', href: '/curso-cia' },
    { name: 'Imersão OMAPPA (Presencial)', href: '/imersao-omappa-da-empresa-lucrativa' },
  ]

  // Recursos items
  const recursosItems = [
    { name: 'E-books Grátis', href: '/materiais' },
    { name: 'Livros & Filmes', href: '/recomendacoes' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-primary-dark/95 backdrop-blur-md py-4 border-b border-white/10 shadow-lg shadow-black/20'
          : 'bg-transparent py-6 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src="/assets/logo_fundo_escuro.png"
              alt="Smart Company Logo"
              className="h-16 md:h-20 lg:h-24 w-auto object-contain transform group-hover:scale-102 transition-transform"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {/* Home */}
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                location.pathname === '/'
                  ? 'text-gold-primary bg-gold-primary/10 border-b-2 border-gold-primary'
                  : 'text-slate-300 hover:text-white hover:bg-white/5 border-b-2 border-transparent'
              }`}
            >
              Início
            </Link>

            {/* Institucional Dropdown */}
            <div className="relative group py-2">
              <button
                className={`px-3 py-2 rounded-md text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-1 transition-colors ${
                  institutionalItems.some(i => isActive(i.href)) ? 'text-gold-primary font-extrabold' : ''
                }`}
              >
                <span>Institucional</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="absolute left-0 mt-1 w-52 bg-[#091120] border border-white/10 rounded-xl shadow-2xl invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 py-2 z-50">
                {institutionalItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-4 py-2.5 text-xs font-bold text-slate-300 hover:text-gold-primary hover:bg-white/5 transition-colors uppercase tracking-wider ${
                      isActive(item.href) ? 'text-gold-primary bg-white/5' : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Consultoria Dropdown */}
            <div className="relative group py-2">
              <button
                className={`px-3 py-2 rounded-md text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-1 transition-colors ${
                  consultoriaItems.some(i => isActive(i.href)) ? 'text-gold-primary font-extrabold' : ''
                }`}
              >
                <span>Consultoria</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="absolute left-0 mt-1 w-64 bg-[#091120] border border-white/10 rounded-xl shadow-2xl invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 py-2 z-50">
                {consultoriaItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-4 py-2.5 text-xs font-bold text-slate-300 hover:text-gold-primary hover:bg-white/5 transition-colors uppercase tracking-wider ${
                      isActive(item.href) ? 'text-gold-primary bg-white/5' : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Treinamentos Dropdown */}
            <div className="relative group py-2">
              <button
                className={`px-3 py-2 rounded-md text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-1 transition-colors ${
                  treinamentosItems.some(i => isActive(i.href)) ? 'text-gold-primary font-extrabold' : ''
                }`}
              >
                <span>Programas</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="absolute left-0 mt-1 w-64 bg-[#091120] border border-white/10 rounded-xl shadow-2xl invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 py-2 z-50">
                {treinamentosItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-4 py-2.5 text-xs font-bold text-slate-300 hover:text-gold-primary hover:bg-white/5 transition-colors uppercase tracking-wider ${
                      isActive(item.href) ? 'text-gold-primary bg-white/5' : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Recursos Dropdown */}
            <div className="relative group py-2">
              <button
                className={`px-3 py-2 rounded-md text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-1 transition-colors ${
                  recursosItems.some(i => isActive(i.href)) ? 'text-gold-primary font-extrabold' : ''
                }`}
              >
                <span>Recursos</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="absolute left-0 mt-1 w-52 bg-[#091120] border border-white/10 rounded-xl shadow-2xl invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 py-2 z-50">
                {recursosItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-4 py-2.5 text-xs font-bold text-slate-300 hover:text-gold-primary hover:bg-white/5 transition-colors uppercase tracking-wider ${
                      isActive(item.href) ? 'text-gold-primary bg-white/5' : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Blog */}
            <Link
              to="/blog"
              className={`px-3 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                isActive('/blog')
                  ? 'text-gold-primary bg-gold-primary/10 border-b-2 border-gold-primary'
                  : 'text-slate-300 hover:text-white hover:bg-white/5 border-b-2 border-transparent'
              }`}
            >
              Blog
            </Link>

            {/* Contato */}
            <Link
              to="/contato"
              className={`px-3 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                isActive('/contato')
                  ? 'text-gold-primary bg-gold-primary/10 border-b-2 border-gold-primary'
                  : 'text-slate-300 hover:text-white hover:bg-white/5 border-b-2 border-transparent'
              }`}
            >
              Contato
            </Link>

            {/* Páginas personalizadas (construtor de páginas) */}
            {customPages.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`px-3 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  isActive(item.href)
                    ? 'text-gold-primary bg-gold-primary/10 border-b-2 border-gold-primary'
                    : 'text-slate-300 hover:text-white hover:bg-white/5 border-b-2 border-transparent'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden xl:flex items-center">
            <Link
              to="/como-transformamos-empresas#diagnostico"
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary-dark bg-gold-primary hover:bg-gold-light rounded-md shadow-lg shadow-gold-primary/10 hover:shadow-gold-primary/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150"
            >
              <span>Auto Diagnóstico</span>
              <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-white/5 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-x-0 top-[73px] bottom-0 z-40 bg-primary-dark/98 backdrop-blur-lg border-t border-white/10 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        id="mobile-menu"
      >
        <div className="px-4 pt-4 pb-6 space-y-2 h-full overflow-y-auto">
          <Link
            to="/"
            className="block px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-wide text-slate-300 hover:text-white hover:bg-white/5"
          >
            Início
          </Link>

          {/* Institutional Heading */}
          <div className="pt-2">
            <div className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-l border-white/10">Institucional</div>
            {institutionalItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all mt-1 ${
                  isActive(item.href) ? 'text-gold-primary bg-gold-primary/5' : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Consultoria Heading */}
          <div className="pt-2">
            <div className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-l border-white/10">Consultoria</div>
            {consultoriaItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all mt-1 ${
                  isActive(item.href) ? 'text-gold-primary bg-gold-primary/5' : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Treinamentos Heading */}
          <div className="pt-2">
            <div className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-l border-white/10">Programas</div>
            {treinamentosItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all mt-1 ${
                  isActive(item.href) ? 'text-gold-primary bg-gold-primary/5' : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Recursos Heading */}
          <div className="pt-2">
            <div className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-l border-white/10">Recursos</div>
            {recursosItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all mt-1 ${
                  isActive(item.href) ? 'text-gold-primary bg-gold-primary/5' : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <Link
            to="/blog"
            className={`block px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-wide transition-all mt-2 ${
              isActive('/blog') ? 'text-gold-primary bg-gold-primary/5' : 'text-slate-300 hover:text-white'
            }`}
          >
            Blog
          </Link>

          <Link
            to="/contato"
            className={`block px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-wide transition-all mt-1 ${
              isActive('/contato') ? 'text-gold-primary bg-gold-primary/5' : 'text-slate-300 hover:text-white'
            }`}
          >
            Contato
          </Link>

          {customPages.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`block px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-wide transition-all mt-1 ${
                isActive(item.href) ? 'text-gold-primary bg-gold-primary/5' : 'text-slate-300 hover:text-white'
              }`}
            >
              {item.name}
            </Link>
          ))}

          <div className="pt-4 border-t border-white/10 mt-4 px-4">
            <Link
              to="/como-transformamos-empresas#diagnostico"
              className="flex w-full items-center justify-center px-4 py-3 text-sm font-bold uppercase tracking-wide text-primary-dark bg-gold-primary hover:bg-gold-light rounded-lg shadow-lg"
            >
              <span>Fazer Auto Diagnóstico</span>
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <div className="flex items-center justify-center space-x-2 mt-6 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-gold-primary" />
              <span>Ambiente de Navegação Seguro</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
