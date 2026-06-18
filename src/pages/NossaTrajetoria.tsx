import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Milestone, ZoomIn, X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { useDynamicContent } from '../hooks/useDynamicContent'
import SEO from '../components/SEO'
import EditableText from '../admin/inline/EditableText'
import EditableImage from '../admin/inline/EditableImage'
import EditableButton from '../admin/inline/EditableButton'
import { StaticContent } from '../admin/inline/StaticContent'
import EditableStatic from '../admin/inline/EditableStatic'

export default function NossaTrajetoria() {
  const defaultHero = {
    badge: 'História & Evolução',
    title: 'NOSSA TRAJETÓRIA',
    content: 'De startup pioneira em cubas de quartzo à referência consolidada em consultoria empresarial de alto impacto e auto diagnóstico de gestão.'
  }

  const defaultTimeline = [
    {
      year: '2001',
      title: 'Nascemos como Fábrica',
      desc: 'Abertura do CNPJ Smart Company. Start Up focada em projetar e fabricar cubas especiais de quartzo e resinas polimerizadas com tecnologia inédita no Brasil, instalando peças lindas em residências de alto padrão (Tamboré e Alphaville).'
    },
    {
      year: '2003',
      title: 'Foco e Transição',
      desc: 'Após mudanças do mercado e sucesso de destaque na mídia (matéria de 1/2 página na revista Arquitetura & Construção), decidimos colocar a produção em stand-by e direcionar a expertise para consultoria e planejamento.'
    },
    {
      year: '2004',
      title: 'Consultoria de Estratégia',
      desc: 'Início oficial da prestação de serviços de Consultoria em Estratégia, Gestão e Planos de Negócios (Business Plan), atuando diretamente na recuperação e aceleração operacional de parceiros.'
    },
    {
      year: '2006',
      title: 'Boutique Jurídica',
      desc: 'Afiliação a uma Boutique Jurídica em São Paulo com foco em Fusões & Aquisições (M&A), reorganizações societárias complexas, blindagem patrimonial e holding.'
    },
    {
      year: '2007',
      title: 'Formatação de Franquias',
      desc: 'Estruturação de know-how e expansão de mercado com foco em formatação técnica de redes de franquias de diversos segmentos.'
    },
    {
      year: '2011',
      title: 'Projeto Amazzone',
      desc: 'Desenvolvimento do plano de negócios (Business Plan) para a Amazzone Cosméticos, projetando atração internacional de investimentos.'
    },
    {
      year: '2012',
      title: 'Registro de Marca & CIESP',
      desc: 'Registro formal da logomarca Smart Company no INPI e afiliação oficial ao CIESP para estreitar laços com o ecossistema industrial.'
    },
    {
      year: '2018',
      title: 'Smart On-Line',
      desc: 'Início do planejamento da plataforma Smart On-Line, viabilizando consultorias à distância e treinamentos digitais escaláveis.'
    },
    {
      year: '2019',
      title: 'Maioridade & Check Up',
      desc: 'A Smart Company completa 18 anos de história e lança o "Check Up Empresas" — o primeiro diagnóstico empresarial 100% estruturado de forma online.'
    },
    {
      year: '2020',
      title: 'Lançamento de Info-Produtos',
      desc: 'Lançamento nacional das formações proprietárias online: Curso AG Expert (Auto Gestão para Sócios) e Curso C.I.A. (Comercial Inteligente e Ativo).'
    },
    {
      year: '2023',
      title: 'Auto Diagnóstico',
      desc: 'Implantação do Termômetro e Auto Diagnóstico interativo de 5 pilares com a meta de liderar as ferramentas de performance orientativa no Brasil.'
    }
  ]

  const defaultGallery = [
    {
      title: 'Busca de Inovação',
      image_url: '/assets/trajetoria/viagem_eua.jpg',
      desc: 'Viagem aos EUA em busca de novos produtos e tecnologias para o mercado brasileiro.'
    },
    {
      title: 'Engenharia Reversa',
      image_url: '/assets/trajetoria/engenharia_reversa.jpg',
      desc: 'Engenharia reversa no produto Americano e nosso primeiro protótipo sendo preparado manualmente.'
    },
    {
      title: 'Primeira Cuba Instalada',
      image_url: '/assets/trajetoria/cuba_instalada.jpg',
      desc: 'Cuba remodelada para o modelo Smart Company e devidamente instalada.'
    },
    {
      title: 'Homologação de Fornecedores',
      image_url: '/assets/trajetoria/homologacao_fornecedor.jpg',
      desc: 'Decisão de terceirizar em grande escala. Sr. Santiago à esquerda e o pai do fundador, Sr. Francisco Geraldes, à direita.'
    },
    {
      title: 'Desenvolvimento de Design',
      image_url: '/assets/trajetoria/remodelagem_cuba.jpg',
      desc: 'Remodelagem para um dos designs proprietários desenvolvidos.'
    },
    {
      title: 'Contra-Molde',
      image_url: '/assets/trajetoria/contra_molde.jpg',
      desc: 'Preparando os ajustes e acabamento do contra-molde de laminação.'
    },
    {
      title: 'Catálogo de Produtos',
      image_url: '/assets/trajetoria/folder_modelos.jpg',
      desc: 'Folder original apresentando os 6 modelos de cubas desenvolvidos.'
    },
    {
      title: 'Acessórios Exclusivos',
      image_url: '/assets/trajetoria/escorredor_aramado.png',
      desc: 'Escorredor aramado com pintura eletrostática, projetado sob medida para legumes e frutas.'
    },
    {
      title: 'Exposição Comercial (2001)',
      image_url: '/assets/trajetoria/display_mogi.jpg',
      desc: 'Display de exposição das Cubas Smart no Mogi Shopping.'
    },
    {
      title: 'Sucesso na Mídia (Julho/2003)',
      image_url: '/assets/trajetoria/revista_capa.jpg',
      desc: 'Nossas peças ganharam destaque gratuito espontâneo na prestigiada revista Arquitetura & Construção.'
    },
    {
      title: 'Destaque Editorial',
      image_url: '/assets/trajetoria/revista_pagina.jpg',
      desc: 'Destaque de 1/2 página dedicado ao nosso produto inovador na revista. Emoção indescritível na época!'
    },
    {
      title: 'Residência de Alto Padrão',
      image_url: '/assets/trajetoria/revista_close.jpg',
      desc: 'Instalação de 3 cubas Smart em uma residência de luxo no Condomínio Tamboré (SP).'
    }
  ]

  const defaultCta = {
    label: 'Conheça Nossos Serviços',
    link: '/como-transformamos-empresas'
  }

  // Fetch dynamic content from CMS (site_slug='smartcompany', section_key prefix='trajetoria_')
  const {
    hero,
    timeline: timelineEvents,
    gallery: galleryItems,
    cta
  } = useDynamicContent('trajetoria', {
    hero: defaultHero,
    timeline: defaultTimeline,
    gallery: defaultGallery,
    cta: defaultCta
  })

  // Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // Handle keyboard events for lightbox navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, galleryItems])

  const handleNext = () => {
    if (lightboxIndex === null) return
    setLightboxIndex((prev) => (prev !== null && prev < galleryItems.length - 1 ? prev + 1 : 0))
  }

  const handlePrev = () => {
    if (lightboxIndex === null) return
    setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : galleryItems.length - 1))
  }

  return (
    <StaticContent pageKey="trajetoria">
    <div className="bg-primary-dark pt-24 min-h-screen text-slate-300 font-sans">
      <SEO 
        title="Nossa Trajetória | Smart Company" 
        description="Conheça a história e a linha do tempo da Smart Company. De startup fabricante de cubas a líder em auto diagnóstico empresarial." 
      />

      {/* Hero Header */}
      <section className="relative bg-[#070F1E] py-24 border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-900/10 rounded-full blur-3xl -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <EditableText
            as="span"
            sectionKey="trajetoria_hero"
            path={['metadata', 'badge']}
            value={hero.badge}
            className="text-[10px] font-bold text-gold-primary uppercase tracking-widest bg-gold-primary/10 py-1.5 px-4 rounded-full border border-gold-primary/20 inline-block"
          />
          <EditableText
            as="h1"
            sectionKey="trajetoria_hero"
            field="title"
            value={hero.title}
            className="text-4xl sm:text-5xl font-display font-black text-white tracking-tight leading-tight uppercase"
          />
          <EditableText
            as="p"
            sectionKey="trajetoria_hero"
            field="content"
            value={hero.content}
            className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed"
          />
        </div>
      </section>

      {/* Historical Timeline Section */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <Milestone className="w-8 h-8 text-gold-primary mx-auto" />
          <EditableStatic
            k="timeline_heading"
            value="Nossa Linha do Tempo"
            as="h2"
            className="text-3xl font-display font-bold text-white uppercase tracking-wider"
          />
          <EditableStatic
            k="timeline_subtitle"
            value="Acompanhe a trajetória de marcos históricos e conquistas da Smart Company."
            as="p"
            className="text-slate-400 text-sm max-w-md mx-auto"
          />
        </div>

        <div className="relative border-l border-white/10 pl-6 sm:pl-10 space-y-12 ml-4">
          {timelineEvents.map((event: any, idx: number) => (
            <motion.div
              key={event.year}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="relative group"
            >
              {/* Timeline Node Point */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-primary-dark border-2 border-gold-primary group-hover:bg-gold-primary transition-colors flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white scale-0 group-hover:scale-100 transition-transform"></div>
              </div>

              {/* Event Content card */}
              <div className="bg-[#091120] p-6 rounded-xl border border-white/5 hover:border-gold-primary/15 transition-all duration-300 space-y-2 group-hover:shadow-lg group-hover:shadow-black/20">
                <EditableText
                  as="span"
                  sectionKey="trajetoria_timeline"
                  path={['metadata', 'events', idx, 'year']}
                  value={event.year}
                  className="text-sm font-display font-black text-gold-primary"
                />
                <EditableText
                  as="h3"
                  sectionKey="trajetoria_timeline"
                  path={['metadata', 'events', idx, 'title']}
                  value={event.title}
                  className="text-base font-display font-bold text-white uppercase"
                />
                <EditableText
                  as="p"
                  sectionKey="trajetoria_timeline"
                  path={['metadata', 'events', idx, 'desc']}
                  value={event.desc}
                  className="text-xs sm:text-sm text-slate-400 leading-relaxed"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gallery Section: "Como a Smart Company começou" */}
      <section className="py-24 bg-[#091120] border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050B14] opacity-50 -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <EditableStatic
              k="gallery_badge"
              value="A Origem em 2001"
              as="span"
              className="text-xs font-bold text-gold-primary uppercase tracking-widest"
            />
            <EditableStatic
              k="gallery_heading"
              value="Como a Smart Company Começou"
              as="h2"
              className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tight"
            />
            <EditableStatic
              k="gallery_subtitle"
              value="Veja o registro fotográfico histórico dos primeiros passos da Smart Company, de startup fabricante de cubas residenciais de alta qualidade a empresa de mentoria estratégica."
              as="p"
              className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed"
            />
          </div>

          {/* Grid of 12 images */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (idx % 3) * 0.1 }}
                onClick={() => setLightboxIndex(idx)}
                className="group cursor-pointer bg-primary-dark/40 rounded-2xl border border-white/5 overflow-hidden hover:border-gold-primary/30 transition-all duration-300 flex flex-col h-full shadow-lg hover:shadow-gold-primary/5"
              >
                {/* Image Wrapper */}
                <div className="relative overflow-hidden aspect-[4/3] bg-black/40">
                  <EditableImage
                    sectionKey="trajetoria_gallery"
                    path={['metadata', 'gallery', idx, 'image_url']}
                    value={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-gold-primary text-primary-dark flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-xl">
                      <ZoomIn className="w-5 h-5 font-bold" />
                    </div>
                  </div>
                </div>

                {/* Content info */}
                <div className="p-6 flex flex-col flex-grow space-y-2 border-t border-white/5 bg-primary-dark/20">
                  <span className="text-[10px] font-bold text-gold-primary uppercase tracking-wider">Passo {idx + 1}</span>
                  <EditableText
                    as="h3"
                    sectionKey="trajetoria_gallery"
                    path={['metadata', 'gallery', idx, 'title']}
                    value={item.title}
                    className="text-white font-display font-bold text-base group-hover:text-gold-primary transition-colors"
                  />
                  <EditableText
                    as="p"
                    sectionKey="trajetoria_gallery"
                    path={['metadata', 'gallery', idx, 'desc']}
                    value={item.desc}
                    className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Concluding block text */}
          <div className="mt-16 max-w-3xl mx-auto bg-primary-dark/40 border border-white/5 rounded-2xl p-8 relative">
            <EditableStatic
              k="historical_note_badge"
              value="Nota Histórica"
              as="div"
              className="absolute -top-3 left-6 bg-gold-primary/10 border border-gold-primary/20 px-3 py-1 rounded text-[10px] font-bold text-gold-primary uppercase tracking-wide"
            />
            <p className="italic text-slate-300 leading-relaxed text-sm text-center">
              &ldquo;<EditableStatic
                k="historical_note_text"
                value="Apesar da matéria (surpresa) na revista ter gerado um ânimo muito grande, já tínhamos decidido que a fabricação ficaria em stand by e já tínhamos iniciado a Consultoria em Gestão e Business Plan. Quem sabe, um dia reativaremos o projeto inicial..."
                as="span"
              />&rdquo;
            </p>
            <div className="flex justify-center mt-6">
              <EditableButton
                sectionKey="trajetoria_cta"
                label={cta.label}
                link={cta.link}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold-primary hover:bg-gold-light text-primary-dark font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-gold-primary/5"
              >
                <ArrowRight className="w-4 h-4" />
              </EditableButton>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Slideshow Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex flex-col justify-between p-4 sm:p-8"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Header controls */}
            <div className="flex justify-between items-center w-full z-10">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Galeria Smart Company • {lightboxIndex + 1} de {galleryItems.length}
              </span>
              <button
                onClick={() => setLightboxIndex(null)}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors shadow-lg"
                aria-label="Fechar galeria"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Slide Content */}
            <div className="flex items-center justify-between flex-grow max-h-[75vh] relative py-4">
              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handlePrev()
                }}
                className="absolute left-2 sm:left-4 z-10 w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-xl"
                aria-label="Imagem anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Central Image Container */}
              <div 
                className="mx-auto max-w-[85vw] max-h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.img
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  src={galleryItems[lightboxIndex].image_url}
                  alt={galleryItems[lightboxIndex].title}
                  className="max-w-full max-h-[70vh] object-contain rounded-lg border border-white/10 shadow-2xl select-none"
                />
              </div>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleNext()
                }}
                className="absolute right-2 sm:right-4 z-10 w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-xl"
                aria-label="Próxima imagem"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Footer Captions */}
            <div 
              className="max-w-2xl mx-auto w-full text-center space-y-2 pb-4 sm:pb-8 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <h4 className="text-white font-display font-extrabold text-lg uppercase tracking-wide">
                {galleryItems[lightboxIndex].title}
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                {galleryItems[lightboxIndex].desc}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </StaticContent>
  )
}
