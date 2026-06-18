import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppWidget from './components/WhatsAppWidget'
import Home from './pages/Home'
import ComoTransformamos from './pages/ComoTransformamos'
import QuemSomos from './pages/QuemSomos'
import AGExpert from './pages/AGExpert'
import CursoCIA from './pages/CursoCIA'
import Valuation from './pages/Valuation'
import Depoimentos from './pages/Depoimentos'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contato from './pages/Contato'
import Recomendacoes from './pages/Recomendacoes'
import NossaEquipe from './pages/NossaEquipe'
import ImersaoOMAPPA from './pages/ImersaoOMAPPA'
import Materiais from './pages/Materiais'
import NossaTrajetoria from './pages/NossaTrajetoria'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import { InlineEditProvider } from './admin/inline/InlineEditContext'
import InlineEditToolbar from './admin/inline/InlineEditToolbar'
import DynamicPage from './pages/DynamicPage'

// ScrollToTop helper: scrolls page back to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  if (isAdminRoute) {
    return <div className="min-h-screen bg-primary-dark">{children}</div>
  }

  return (
    <div className="flex flex-col min-h-screen bg-primary-dark">
      {/* Scroll Helper */}
      <ScrollToTop />

      {/* Global Navigation */}
      <Header />

      {/* Dynamic Route Pages */}
      <main className="flex-grow">{children}</main>

      {/* Global Footer */}
      <Footer />

      {/* Interactive Floating Chat Widget */}
      <WhatsAppWidget />
    </div>
  )
}

function App() {
  return (
    <Router>
      <InlineEditProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/smart-company" element={<Home />} />
            
            {/* Consulting */}
            <Route path="/como-transformamos-empresas" element={<ComoTransformamos />} />
            <Route path="/programas" element={<ComoTransformamos />} />
            
            {/* Institutional / About */}
            <Route path="/quem-somos" element={<QuemSomos />} />
            <Route path="/smart-company-consultoria" element={<QuemSomos />} />
            <Route path="/fundador-e-mentor-antonio-geraldes" element={<QuemSomos />} />
            <Route path="/nossa-trajetoria" element={<NossaTrajetoria />} />
            <Route path="/nossa-equipe" element={<NossaEquipe />} />
            <Route path="/nossa-equipe-2" element={<NossaEquipe />} />
            
            {/* Courses / Programs */}
            <Route path="/auto-gestao-empresarial-para-donos-de-empresas" element={<AGExpert />} />
            <Route path="/ag-expert-auto-gestao-para-o-crescimento-da-sua-empresa-mon" element={<AGExpert />} />
            <Route path="/curso-cia" element={<CursoCIA />} />
            <Route path="/imersao-omappa-da-empresa-lucrativa" element={<ImersaoOMAPPA />} />
            <Route path="/imersao-omappa-da-empresa-lucrativa-2" element={<ImersaoOMAPPA />} />
            <Route path="/formacoes-online" element={<Home />} />
            
            {/* Valuation & M&A */}
            <Route path="/valuation-avaliacao-compra-e-venda-de-empresas" element={<Valuation />} />
            
            {/* Testimonials */}
            <Route path="/depoimentos" element={<Depoimentos />} />
            <Route path="/consultoria-clientes" element={<Depoimentos />} />
            
            {/* Recommended Books & Movies */}
            <Route path="/recomendacoes" element={<Recomendacoes />} />
            <Route path="/livros-recomendados-para-empresarios" element={<Recomendacoes />} />
            <Route path="/filmes-recomendados" element={<Recomendacoes />} />
            
            {/* Materials & Ebooks */}
            <Route path="/materiais" element={<Materiais />} />
            <Route path="/e-book-tecnicas-de-gestao" element={<Materiais />} />
            <Route path="/e-book-funil-de-negocios-e-conversao" element={<Materiais />} />
            <Route path="/e-book-metodo-cumbuca" element={<Materiais />} />
            <Route path="/e-book-jeff-bezos" element={<Materiais />} />
            <Route path="/inteligencia-emocional" element={<Materiais />} />
            <Route path="/ebook-gatilhos-mentais-manual-completo" element={<Materiais />} />
            <Route path="/estrategias-marketing-online-mon" element={<Materiais />} />
            <Route path="/ebook-estrategias-de-marketing-online" element={<Materiais />} />
            <Route path="/estrategias-de-marketing-online-eduzz" element={<Materiais />} />
            <Route path="/pag-vendas-funil-de-conversao-e-vendas" element={<Materiais />} />
            
            {/* Blog Articles */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog-o-caminho-para-o-sucesso" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            
            {/* Contact */}
            <Route path="/contato" element={<Contato />} />
            <Route path="/formulario-programas-smart" element={<Contato />} />
            <Route path="/gestao" element={<Home />} />

            {/* Admin Dashboard */}
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/:siteSlug" element={<Dashboard />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/:siteSlug/login" element={<Login />} />

            {/* Custom dynamic pages (page builder) — single segment slugs */}
            <Route path="/:slug" element={<DynamicPage />} />

            {/* Fallback Catch-All */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout>
        <InlineEditToolbar />
      </InlineEditProvider>
    </Router>
  )
}

export default App
