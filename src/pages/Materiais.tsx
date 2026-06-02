import { useState } from 'react'
import { BookOpen, Download, X, Mail, Phone, User, CheckCircle, ShieldCheck } from 'lucide-react'

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
  const [selectedBook, setSelectedBook] = useState<EBook | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '', company: '' })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const ebooks: EBook[] = [
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
      description: 'Descubra as técnicas psicológicas comprovadas para aumentar sua conversão, quebrar objeções e fechar mais negócios de forma ética.',
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
    <div className="bg-primary-dark pt-24 min-h-screen text-slate-300 font-sans">
      {/* Page Header */}
      <section className="relative bg-[#070F1E] py-20 border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-[10px] font-bold text-gold-primary uppercase tracking-widest bg-gold-primary/10 py-1.5 px-4 rounded-full border border-gold-primary/20 inline-block">
            Materiais de Apoio
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-black text-white tracking-tight uppercase">
            Materiais <span className="text-gold-primary">Educativos</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Baixe e-books exclusivos elaborados por Antonio Geraldes e sua equipe para aprimorar a gestão comercial, financeira e a liderança do seu negócio.
          </p>
        </div>
      </section>

      {/* Grid of Materials */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ebooks.map((book) => (
            <div
              key={book.id}
              className="bg-[#091120] border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-gold-primary/20 transition-all duration-300 shadow-xl group"
            >
              {/* Cover Showcase Container */}
              <div className="relative h-72 overflow-hidden bg-[#050b14] flex items-center justify-center p-6 border-b border-white/5">
                <div className="absolute top-4 right-4 bg-primary-dark/85 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-bold text-gold-primary uppercase tracking-wider z-10 shadow-lg">
                  {book.price}
                </div>
                {book.image ? (
                  <div className="relative w-40 h-56 shadow-[0_15px_30px_rgba(0,0,0,0.6)] rounded-md overflow-hidden transform group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-300">
                    <img
                      src={book.image}
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
                    <span className="text-[9px] text-gold-primary uppercase tracking-widest font-bold">
                      E-book Corporativo
                    </span>
                    <h3 className="text-lg font-display font-extrabold text-white leading-tight group-hover:text-gold-primary transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium italic">
                      {book.subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3">
                    {book.description}
                  </p>
                  
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                      Tópicos Abordados
                    </span>
                    <ul className="space-y-1 text-xs text-slate-400">
                      {book.bullets.slice(0, 2).map((b, idx) => (
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
                      <span>Baixar E-book Grátis</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleOpenModal(book)}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-emerald-600/10 transition-all"
                    >
                      <span>Adquirir por {book.price}</span>
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
                  {selectedBook.isFree ? 'Solicitar E-book Gratuito' : 'Adquirir Material Exclusivo'}
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
                    Você está solicitando o download de: <strong className="text-white">{selectedBook.title}</strong>.
                    Preencha as informações básicas para receber o link de acesso.
                  </div>

                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label htmlFor="modal-name" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Seu Nome Completo *
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
                      Seu E-mail Corporativo *
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
                      Seu WhatsApp / Telefone *
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
                      Nome da sua Empresa (Opcional)
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
                        <span>Processando...</span>
                      ) : selectedBook.isFree ? (
                        <>
                          <Download className="w-4 h-4" />
                          <span>Liberar Meu Download Grátis</span>
                        </>
                      ) : (
                        <>
                          <span>Ir para Checkout ({selectedBook.price})</span>
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
                    <h4 className="text-lg font-display font-bold text-white uppercase">
                      Solicitação Concluída!
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
                      Olá <strong className="text-white">{formData.name}</strong>, registramos seu e-mail corporativo. 
                      {selectedBook.isFree 
                        ? ' O link para baixar o eBook foi liberado abaixo:' 
                        : ' Nosso consultor entrará em contato via WhatsApp para liberar o checkout do material.'}
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
                        <span>Baixar E-book Agora</span>
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
                        <span>Finalizar pelo WhatsApp (R$ 9,90)</span>
                      </a>
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 uppercase tracking-widest pt-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-gold-primary" />
                    <span>Seus dados estão protegidos</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
