import { useState } from 'react'
import { BookOpen, Download, X, Mail, Phone, User, CheckCircle, ShieldCheck } from 'lucide-react'
import { useDynamicContent } from '../hooks/useDynamicContent'
import SEO from '../components/SEO'
import EditableText from '../admin/inline/EditableText'
import EditableImage from '../admin/inline/EditableImage'
import { StaticContent } from '../admin/inline/StaticContent'
import EditableStatic from '../admin/inline/EditableStatic'

interface EBook {
  id: string
  title: string
  subtitle: string
  description: string
  price: string
  isFree: boolean
  coverColor: string
  accentColor: string
  bullets: string[]
  downloadUrl?: string
  image?: string
}

export default function Materiais() {
  const defaultHero = {
    badge: 'Materiais de Apoio',
    title: 'Materiais Educativos',
    content: 'Baixe e-books exclusivos elaborados por Antonio Geraldes e sua equipe para aprimorar a gestão comercial, financeira e a liderança do seu negócio.'
  }

  const defaultEbooks: EBook[] = [
    {
      id: 'funil-negocios',
      title: 'Funil de Negócios & Conversão',
      subtitle: 'Técnicas de Gestão Comercial',
      description: 'Existem 2 tipos de funis comerciais fundamentais para o crescimento das vendas e talvez você não saiba. Aprenda a estruturar cada um deles.',
      price: 'Gratuito',
      isFree: true,
      coverColor: 'from-[#144F61] to-[#206F85]',
      accentColor: 'text-[#206F85]',
      bullets: [
        'Diferença prática entre Funil de Prospecção e Funil de Vendas.',
        'Como calcular taxas de conversão por etapa do funil.',
        'Estratégias para evitar gargalos e perdas no processo comercial.'
      ],
      downloadUrl: '#',
      image: '/assets/Capa-Funil-de-negocios.png'
    },
    {
      id: 'metodo-cumbuca',
      title: 'O Método Cumbuca de Estudo',
      subtitle: 'Incentivando sua equipe a adquirir conhecimento',
      description: 'Conheça o método clássico popularizado por Vicente Falconi que promove aprendizado e interação da equipe de forma simples, contínua e divertida.',
      price: 'Gratuito',
      isFree: true,
      coverColor: 'from-amber-600 to-yellow-600',
      accentColor: 'text-amber-500',
      bullets: [
        'Como organizar reuniões semanais de cumbuca sem consumir tempo produtivo.',
        'Engajamento ativo dos colaboradores na leitura de livros estratégicos.',
        'Construção de uma cultura de aprendizado contínuo dentro da empresa.'
      ],
      downloadUrl: '#',
      image: '/assets/metodo-cumbuca.png'
    },
    {
      id: 'inteligencia-emocional',
      title: 'Inteligência Emocional na Liderança',
      subtitle: 'Desperte o líder que existe em você',
      description: 'Aprenda a reconhecer e gerenciar emoções — tanto as suas quanto as dos outros — para liderar equipes com maior equilíbrio, empatia e resiliência.',
      price: 'Gratuito',
      isFree: true,
      coverColor: 'from-[#0F2A4A] to-[#1E4D80]',
      accentColor: 'text-[#1E4D80]',
      bullets: [
        'As 5 habilidades essenciais da inteligência emocional segundo Daniel Goleman.',
        'Técnicas práticas para autocontrole sob estresse e pressão.',
        'Como motivar e engajar colaboradores em momentos de crise.'
      ],
      downloadUrl: '#',
      image: '/assets/inteligencia-emocional.jpg'
    },
    {
      id: 'jeff-bezos',
      title: 'E-book Jeff Bezos: A Regra de 1 Dia',
      subtitle: 'Melhore o rendimento da sua equipe com lições da Amazon',
      description: 'Aprenda a otimizar processos de decisão e manter a mentalidade ágil de uma startup mesmo em corporações em pleno crescimento.',
      price: 'Gratuito',
      isFree: true,
      coverColor: 'from-purple-700 to-violet-500',
      accentColor: 'text-violet-400',
      bullets: [
        'O conceito de "Dia 1" de Jeff Bezos para evitar a burocracia.',
        'Como delegar e acelerar a tomada de decisões na empresa.',
        'Técnicas de liderança focadas em foco absoluto no cliente.'
      ],
      downloadUrl: '#',
      image: '/assets/ebook-amazon.png'
    },
    {
      id: 'gatilhos-mentais',
      title: 'Gatilhos Mentais: Manual Completo',
      subtitle: 'Desbravando a mente do consumidor para vendas',
      description: 'Descubra as táticas psicológicas comprovadas para aumentar sua conversão, quebrar objeções e fechar mais negócios de forma ética.',
      price: 'R$ 9,90',
      isFree: false,
      coverColor: 'from-emerald-700 to-teal-600',
      accentColor: 'text-emerald-500',
      bullets: [
        'Estudo detalhado de 14 gatilhos mentais aplicados ao marketing online.',
        'Como gerar escassez, urgência e prova social para acelerar compras.',
        'Exemplos de roteiros de vendas com alta taxa de conversão.'
      ],
      image: '/assets/gatilhos-mentais.png'
    }
  ]

  const { hero, ebooks } = useDynamicContent('materiais', {
    hero: defaultHero,
    ebooks: defaultEbooks
  })

  const [selectedBook, setSelectedBook] = useState<EBook | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '', company: '' })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleOpenModal = (book: EBook) => {
    setSelectedBook(book)
    setIsSubmitted(false)
    setFormData({ name: '', email: '', whatsapp: '', company: '' })
  }

  const handleCloseModal = () => {
    setSelectedBook(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API lead recording
    setTimeout(() => {
      setLoading(false)
      setIsSubmitted(true)
    }, 1200)
  }

  return (
    <StaticContent pageKey="materiais">
    <div className="bg-primary-dark pt-24 min-h-screen text-slate-300 font-sans">
      <SEO 
        title="Materiais Educativos e E-books de Gestão Gratuitos" 
        description="Baixe e-books de gestão corporativa e empresarial gratuitos focados em funil de negócios, marketing, liderança e vendas." 
      />
      {/* Page Header */}
      <section className="relative bg-[#070F1E] py-20 border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <EditableText
            as="span"
            sectionKey="materiais_hero"
            path={['metadata', 'badge']}
            value={hero.badge}
            className="text-[10px] font-bold text-gold-primary uppercase tracking-widest bg-gold-primary/10 py-1.5 px-4 rounded-full border border-gold-primary/20 inline-block"
          />
          <EditableText
            as="h1"
            sectionKey="materiais_hero"
            field="title"
            value={hero.title}
            className="text-4xl sm:text-5xl font-display font-black text-white tracking-tight uppercase"
          />
          <EditableText
            as="p"
            sectionKey="materiais_hero"
            field="content"
            value={hero.content}
            className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed"
          />
        </div>
      </section>

      {/* Grid of Materials */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ebooks.map((book: any, idx: number) => (
            <div
              key={book.id}
              className="bg-[#091120] border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-gold-primary/20 transition-all duration-300 shadow-xl group"
            >
              {/* Cover Showcase Container */}
              <div className="relative h-72 overflow-hidden bg-[#050b14] flex items-center justify-center p-6 border-b border-white/5">
                <EditableText
                  as="div"
                  sectionKey="materiais_ebooks"
                  path={['metadata', 'ebooks', idx, 'price']}
                  value={book.price}
                  className="absolute top-4 right-4 bg-primary-dark/85 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-bold text-gold-primary uppercase tracking-wider z-10 shadow-lg"
                />
                {book.image ? (
                  <div className="relative w-40 h-56 shadow-[0_15px_30px_rgba(0,0,0,0.6)] rounded-md overflow-hidden transform group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-300">
                    <EditableImage
                      sectionKey="materiais_ebooks"
                      path={['metadata', 'ebooks', idx, 'image']}
                      value={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className={`w-40 h-56 rounded-md bg-gradient-to-br ${book.coverColor} flex flex-col justify-between p-4 shadow-lg`}>
                    <BookOpen className="w-6 h-6 text-gold-primary" />
                    <div className="space-y-1">
                      <span className="text-[8px] text-gold-primary/80 uppercase font-semibold">E-book</span>
                      <h4 className="text-xs font-bold text-white leading-tight line-clamp-3">{book.title}</h4>
                    </div>
                  </div>
                )}
              </div>

              {/* Description & Action */}
              <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <EditableStatic
                      k="card_badge"
                      value="E-book Corporativo"
                      as="span"
                      className="text-[9px] text-gold-primary uppercase tracking-widest font-bold"
                    />
                    <EditableText
                      as="h3"
                      sectionKey="materiais_ebooks"
                      path={['metadata', 'ebooks', idx, 'title']}
                      value={book.title}
                      className="text-lg font-display font-extrabold text-white leading-tight group-hover:text-gold-primary transition-colors"
                    />
                    <EditableText
                      as="p"
                      sectionKey="materiais_ebooks"
                      path={['metadata', 'ebooks', idx, 'subtitle']}
                      value={book.subtitle}
                      className="text-xs text-slate-400 font-medium italic"
                    />
                  </div>

                  <EditableText
                    as="p"
                    sectionKey="materiais_ebooks"
                    path={['metadata', 'ebooks', idx, 'description']}
                    value={book.description}
                    className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3"
                  />
                  
                  <div className="space-y-2 pt-2">
                    <EditableStatic
                      k="card_topics_label"
                      value="Tópicos Abordados"
                      as="span"
                      className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block"
                    />
                    <ul className="space-y-1 text-xs text-slate-400">
                      {book.bullets.slice(0, 2).map((b: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="text-gold-primary">•</span>
                          <span className="truncate">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  {book.isFree ? (
                    <button
                      onClick={() => handleOpenModal(book)}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gold-primary hover:bg-gold-light text-primary-dark text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-gold-primary/10 transition-all"
                    >
                      <Download className="w-4 h-4" />
                      <EditableStatic k="card_btn_download_free" value="Baixar E-book Grátis" as="span" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleOpenModal(book)}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-emerald-600/10 transition-all"
                    >
                      <span><EditableStatic k="card_btn_buy_prefix" value="Adquirir por" as="span" /> {book.price}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal dialog overlay */}
      {selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-dark/80 backdrop-blur-md">
          <div className="bg-[#091120] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-gold-primary" />
                <h3 className="font-display font-bold text-white text-sm sm:text-base">
                  {selectedBook.isFree
                    ? <EditableStatic k="modal_title_free" value="Solicitar E-book Gratuito" as="span" />
                    : <EditableStatic k="modal_title_paid" value="Adquirir Material Exclusivo" as="span" />}
                </h3>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-1 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="text-xs text-slate-400 bg-white/5 p-4 rounded-xl border border-white/5 mb-4">
                    <EditableStatic k="modal_intro_prefix" value="Você está solicitando o download de:" as="span" /> <strong className="text-white">{selectedBook.title}</strong>.
                    {' '}<EditableStatic k="modal_intro_suffix" value="Preencha as informações básicas para receber o link de acesso." as="span" />
                  </div>

                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label htmlFor="modal-name" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <EditableStatic k="modal_label_name" value="Seu Nome Completo *" as="span" />
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        id="modal-name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ex: João da Silva"
                        className="w-full bg-[#070F1E] border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white text-xs sm:text-sm focus:outline-none focus:border-gold-primary transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label htmlFor="modal-email" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <EditableStatic k="modal_label_email" value="Seu E-mail Corporativo *" as="span" />
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                      <input
                        type="email"
                        id="modal-email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Ex: joao@suaempresa.com.br"
                        className="w-full bg-[#070F1E] border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white text-xs sm:text-sm focus:outline-none focus:border-gold-primary transition-colors"
                      />
                    </div>
                  </div>

                  {/* WhatsApp field */}
                  <div className="space-y-1.5">
                    <label htmlFor="modal-whatsapp" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <EditableStatic k="modal_label_whatsapp" value="Seu WhatsApp / Telefone *" as="span" />
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                      <input
                        type="tel"
                        id="modal-whatsapp"
                        required
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        placeholder="Ex: (11) 99999-9999"
                        className="w-full bg-[#070F1E] border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white text-xs sm:text-sm focus:outline-none focus:border-gold-primary transition-colors"
                      />
                    </div>
                  </div>

                  {/* Company name */}
                  <div className="space-y-1.5">
                    <label htmlFor="modal-company" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <EditableStatic k="modal_label_company" value="Nome da sua Empresa (Opcional)" as="span" />
                    </label>
                    <input
                      type="text"
                      id="modal-company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Ex: Smart Tech Ltda"
                      className="w-full bg-[#070F1E] border border-white/10 rounded-lg py-2.5 px-4 text-white text-xs sm:text-sm focus:outline-none focus:border-gold-primary transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gold-primary hover:bg-gold-light text-primary-dark text-xs font-bold uppercase tracking-wider shadow-md transition-all"
                    >
                      {loading ? (
                        <EditableStatic k="modal_submit_loading" value="Processando..." as="span" />
                      ) : selectedBook.isFree ? (
                        <>
                          <Download className="w-4 h-4" />
                          <EditableStatic k="modal_submit_free" value="Liberar Meu Download Grátis" as="span" />
                        </>
                      ) : (
                        <>
                          <span><EditableStatic k="modal_submit_checkout_prefix" value="Ir para Checkout" as="span" /> ({selectedBook.price})</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-6 space-y-6 animate-in fade-in zoom-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-600/10 border-2 border-emerald-500 text-emerald-500 flex items-center justify-center mx-auto shadow-lg shadow-emerald-600/5">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <EditableStatic
                      k="success_title"
                      value="Solicitação Concluída!"
                      as="h4"
                      className="text-lg font-display font-bold text-white uppercase"
                    />
                    <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
                      <EditableStatic k="success_greeting" value="Olá" as="span" /> <strong className="text-white">{formData.name}</strong><EditableStatic k="success_registered" value=", registramos seu e-mail corporativo." as="span" />{' '}
                      {selectedBook.isFree
                        ? <EditableStatic k="success_msg_free" value="O link para baixar o eBook foi liberado abaixo:" as="span" />
                        : <EditableStatic k="success_msg_paid" value="Nosso consultor entrará em contato via WhatsApp para liberar o checkout do material." as="span" />}
                    </p>
                  </div>
                  
                  {selectedBook.isFree ? (
                    <div className="pt-4">
                      <a
                        href="/assets/Capa-Funil-de-negocios.png" // Fallback link
                        target="_blank"
                        rel="noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all"
                      >
                        <Download className="w-4 h-4" />
                        <EditableStatic k="success_btn_download" value="Baixar E-book Agora" as="span" />
                      </a>
                    </div>
                  ) : (
                    <div className="pt-4">
                      <a
                        href={`https://wa.me/5511999999999?text=Olá,%20tenho%20interesse%20em%20adquirir%20o%20eBook%20Gatilhos%20Mentais%20pelo%20site%20da%20Smart%20Company.%20Meu%20nome%20é%20${encodeURIComponent(formData.name)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all"
                      >
                        <EditableStatic k="success_btn_whatsapp" value="Finalizar pelo WhatsApp (R$ 9,90)" as="span" />
                      </a>
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 uppercase tracking-widest pt-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-gold-primary" />
                    <EditableStatic k="success_privacy_note" value="Seus dados estão protegidos" as="span" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
    </StaticContent>
  )
}
