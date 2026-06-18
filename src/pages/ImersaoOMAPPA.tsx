import { useState } from 'react'
import { Calendar, CheckCircle, ShieldCheck, HelpCircle, ChevronDown, Award, Users, BookOpen } from 'lucide-react'
import { useDynamicContent } from '../hooks/useDynamicContent'
import SEO from '../components/SEO'
import EditableText from '../admin/inline/EditableText'
import { StaticContent } from '../admin/inline/StaticContent'
import EditableStatic from '../admin/inline/EditableStatic'

interface Testimony {
  author: string
  role: string
  company: string
  avatar?: string
  text: string
  videoUrl: string
  embedId: string
}

interface FaqItem {
  question: string
  answer: string
}

export default function ImersaoOMAPPA() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  const defaultHero = {
    badge: 'Imersão Exclusiva para Empresários',
    title: 'Imersão OMAPPA',
    content: 'Venha viver a experiência prática que vai Nortear o seu Negócio! Se você precisa aumentar o lucro, definir processos, reduzir desperdícios, ganhar produtividade, alcançar metas com planos de ação e motivar sua equipe através de indicadores eficientes.'
  }

  const defaultPillars = [
    {
      letter: 'O',
      title: 'Oportunidades',
      description: 'Identificação de melhorias internas (margem de lucro, desperdícios, vendas) and externas (novos canais, nichos inexplorados). A crise está na mentalidade; a oportunidade está na ação.'
    },
    {
      letter: 'M',
      title: 'Metas',
      description: 'Desdobramento de Metas Macros, Táticas e Operacionais. Um mapa de sucesso exige um destino final claro para alinhar o dono e toda a equipe.'
    },
    {
      letter: 'A',
      title: 'Acesso',
      description: 'O planejamento do trajeto real para atingir as metas. Mapeamento de recursos necessários, investimentos, cronogramas de implantação e controle de riscos.'
    },
    {
      letter: 'P',
      title: 'Pessoas',
      description: 'Como recrutar, capacitar e motivar o time. Uma liderança forte engaja os colaboradores certos para que a empresa cresça de forma sustentável.'
    },
    {
      letter: 'P',
      title: 'Processos',
      description: 'Padronização e melhoria contínua (PDCA, Kaizen, 5S). Processos estruturados garantem produtividade e previsibilidade, reduzindo a dependência da presença do dono.'
    },
    {
      letter: 'A',
      title: 'Avaliação',
      description: 'Composição de custos, precificação adequada (mark-up e mark-down), acompanhamento de KPI\'s e sistemas de meritocracia para consolidar a evolução.'
    }
  ]

  const defaultTestimonies: Testimony[] = [
    {
      author: 'Alexandre Pereira',
      role: 'Diretor',
      company: 'Emblemax Indústria (São Paulo/SP)',
      avatar: '/assets/logo-emblemax-1.png',
      text: 'Vim participar da imersão OMAPPA e realmente achei que foi um evento que valeu cada centavo. Saio totalmente renovado, com a cabeça fervendo de ideias para aplicar na minha indústria. Recomendo fortemente, o Antonio é excelente!',
      videoUrl: 'https://youtube.com/shorts/4JMejMJVGf0',
      embedId: '4JMejMJVGf0'
    },
    {
      author: 'Major Castro',
      role: 'Presidente',
      company: 'Rotary Suzano / Advocacia Treinamentos',
      text: 'Um dia excelente de imersão OMAPPA. Tivemos conhecimentos gerenciais e administrativos fundamentais para melhorar a qualidade de qualquer investimento. Todo empresário que queira crescer precisa disso.',
      videoUrl: 'https://youtube.com/shorts/0hgfurSM8oU',
      embedId: '0hgfurSM8oU'
    },
    {
      author: 'Ramon Alonso',
      role: 'Diretor',
      company: 'Aquazul Piscinas e Lagos (Mogi das Cruzes/SP)',
      avatar: '/assets/logo-aquazul.jpeg',
      text: 'Participei da Imersão OMAPPA do Antonio Geraldes e quero deixar meu sincero agradecimento. Foi um evento fantástico, muito rico em insights práticos e com grande aprendizado para nosso negócio de piscinas.',
      videoUrl: 'https://youtube.com/shorts/pxVjJUgZI2o',
      embedId: 'pxVjJUgZI2o'
    }
  ]

  const defaultFaqs: FaqItem[] = [
    {
      question: 'Não tenho tempo para fazer essa imersão!',
      answer: 'A falta de tempo é o sintoma mais claro de que sua empresa está desorganizada e operando no caos. Se você passa o dia apagando incêndios no operacional, é justamente porque não tem processos e pessoas treinadas. Investir um dia na imersão OMAPPA vai te dar as ferramentas para estruturar o tático e o operacional, fazendo o seu time entregar mais e te liberando para focar na estratégia e no crescimento do negócio.'
    },
    {
      question: 'Não tenho dinheiro para investir agora!',
      answer: 'O ingresso pode ser parcelado em até 10 vezes no cartão de crédito. Se sua empresa não está gerando caixa para cobrir um investimento em conhecimento de um dia, isso significa que seu modelo de vendas ou de custos está falho. É exatamente por isso que você precisa vir: para aprender a formar custos, preços, aumentar a margem e impulsionar o seu faturamento de forma imediata.'
    },
    {
      question: 'Para quem é indicada esta imersão?',
      answer: 'A imersão OMAPPA é exclusiva para donos de empresas, diretores, sócios e gestores de pequenas e médias empresas (indústrias, comércios, prestadoras de serviços e startups) que buscam maior lucratividade, profissionalização da equipe e a estruturação de planos de ação práticos.'
    },
    {
      question: 'O que está incluso no ingresso da imersão?',
      answer: 'O ingresso garante sua vaga no evento 100% presencial, material didático impresso e em formato digital (PDF), ferramentas exclusivas de diagnóstico prático, atividades de mão na massa para aplicar no seu negócio e acesso a uma rede de networking qualificada com dezenas de outros empresários.'
    }
  ]

  const {
    hero,
    pillars,
    testimonies,
    faqs
  } = useDynamicContent('imersao-omappa', {
    hero: defaultHero,
    pillars: defaultPillars,
    testimonies: defaultTestimonies,
    faqs: defaultFaqs
  })

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  return (
    <StaticContent pageKey="imersao-omappa">
    <div className="bg-primary-dark pt-24 min-h-screen text-slate-300 font-sans">
      <SEO
        title="Imersão OMAPPA da Empresa Lucrativa | Treinamento Presencial" 
        description="Participe do nosso treinamento presencial de alto impacto focado em reestruturação, processos, metas, pessoas e lucro para sua empresa." 
      />
      {/* Hero section */}
      <section className="relative bg-[#070F1E] py-20 border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <EditableText
            as="span"
            sectionKey="imersao-omappa_hero"
            path={['metadata', 'badge']}
            value={hero.badge}
            className="text-[10px] font-bold text-gold-primary uppercase tracking-widest bg-gold-primary/10 py-1.5 px-4 rounded-full border border-gold-primary/20 inline-block"
          />
          <EditableText
            as="h1"
            sectionKey="imersao-omappa_hero"
            field="title"
            value={hero.title}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white tracking-tight uppercase leading-tight"
          />
          <EditableText
            as="p"
            sectionKey="imersao-omappa_hero"
            field="content"
            value={hero.content}
            className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed"
          />
          <div className="pt-4">
            <a
              href="https://www.sympla.com.br/evento/imersao-o-mappa-um-mapa-que-vai-nortear-voce-e-o-seu-negocio/1965990?d=PROMO50"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 font-bold text-base uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-lg shadow-emerald-600/20 hover:scale-102 active:scale-100 transition-all gap-2"
            >
              <Calendar className="w-5 h-5" />
              <EditableStatic k="hero_cta" value="Garantir Vaga com 50% de Desconto" as="span" />
            </a>
          </div>
        </div>
      </section>

      {/* Main Video Presentation */}
      <section className="py-16 bg-[#091120] border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white uppercase">
              Vem Comigo <span className="text-gold-primary">Agora!</span>
            </h2>
            <EditableStatic
              k="video_subtitle"
              value="Assista à apresentação do mentor Antonio Geraldes sobre o método OMAPPA."
              as="p"
              className="text-xs sm:text-sm text-slate-400"
            />
          </div>
          <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative bg-black">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/XF7PT1oTvHY"
              title="Apresentação OMAPPA"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase">
            A Jornada <span className="text-gold-primary">OMAPPA</span>
          </h2>
          <EditableStatic
            k="pillars_subtitle"
            value="O método estruturado em 6 etapas cruciais que compõem o mapa estratégico de crescimento para sua empresa:"
            as="p"
            className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar: any, idx: number) => (
            <div
              key={pillar.title}
              className="bg-[#091120] border border-white/5 rounded-xl p-6 hover:border-gold-primary/20 transition-all duration-300 relative group"
            >
              <div className="absolute -top-6 left-6 w-12 h-12 rounded-lg bg-gradient-to-br from-gold-primary to-gold-dark flex items-center justify-center font-display font-black text-primary-dark text-xl shadow-lg shadow-gold-primary/20">
                {pillar.letter}
              </div>
              <div className="pt-6 space-y-3">
                <EditableText
                  as="h3"
                  sectionKey="imersao-omappa_pillars"
                  path={['metadata', 'pillars', idx, 'title']}
                  value={pillar.title}
                  className="text-lg font-display font-bold text-white group-hover:text-gold-primary transition-colors"
                />
                <EditableText
                  as="p"
                  sectionKey="imersao-omappa_pillars"
                  path={['metadata', 'pillars', idx, 'description']}
                  value={pillar.description}
                  className="text-xs sm:text-sm text-slate-400 leading-relaxed"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Meet the Mentor Callout */}
      <section className="py-20 bg-[#060D19] border-t border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Bio Photo */}
            <div className="w-full lg:w-1/3 flex justify-center">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden border-2 border-gold-primary/20 shadow-2xl">
                <img
                  src="/assets/Ola-sou-Antonio-Geraldes-copia-scaled.jpg"
                  alt="Antonio Geraldes"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-transparent"></div>
              </div>
            </div>
            {/* Bio Text */}
            <div className="w-full lg:w-2/3 space-y-6">
              <EditableStatic
                k="mentor_badge"
                value="Fundador e Mentor"
                as="span"
                className="text-[10px] font-bold text-gold-primary uppercase tracking-widest bg-gold-primary/10 py-1 px-3 rounded-full inline-block"
              />
              <EditableStatic
                k="mentor_name"
                value="Antonio Geraldes"
                as="h2"
                className="text-3xl font-display font-black text-white uppercase tracking-tight leading-none"
              />
              <EditableStatic
                k="mentor_role"
                value="Empresário, Mentor de Gestão Estratégica e especialista em Diagnósticos Corporativos."
                as="p"
                className="text-xs sm:text-sm text-slate-400 font-semibold leading-relaxed"
              />
              <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                <EditableStatic
                  k="mentor_bio_1"
                  value="“Desenvolvi esta Imersão para Empresários para ser 100% dinâmica, intuitiva e proporcionar um evento único que de fato contribui para a sua estratégia. Entrego cases reais, matrizes de mercado e as ferramentas que utilizo no dia a dia da minha consultoria.”"
                  as="p"
                />
                <EditableStatic
                  k="mentor_bio_2"
                  value="Há 30 anos gerencio empresas. Tendo fundado 6 negócios próprios e orientado pessoalmente a reestruturação comercial, financeira e fabril de dezenas de clientes, conheço detalhadamente as dores da liderança familiar e executiva."
                  as="p"
                />
              </div>
              <div className="border-t border-white/5 pt-4">
                <EditableStatic
                  k="mentor_quote"
                  value="“Obtenha resultados diferentes agindo de forma consistente agora.”"
                  as="span"
                  className="text-xs italic text-gold-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials (Shorts Embeds) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase">
            Depoimentos de <span className="text-gold-primary">Empresários</span>
          </h2>
          <EditableStatic
            k="testimonials_subtitle"
            value="Veja o que outros diretores e fundadores que participaram da imersão OMAPPA dizem sobre os resultados obtidos:"
            as="p"
            className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonies.map((test: any, idx: number) => (
            <div
              key={test.author}
              className="bg-[#091120] border border-white/5 rounded-xl p-5 flex flex-col justify-between hover:border-gold-primary/20 transition-all duration-300 shadow-md"
            >
              <div className="space-y-4">
                {/* Testimony Video Short Embed */}
                <div className="aspect-[9/16] w-full max-w-[240px] mx-auto rounded-lg overflow-hidden border border-white/10 shadow-lg bg-black relative">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${test.embedId}`}
                    title={`Depoimento de ${test.author}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                {/* Text */}
                <p className="text-xs sm:text-sm leading-relaxed text-slate-400 italic text-center">
                  &ldquo;{test.text}&rdquo;
                </p>
              </div>
              {/* Footer Author */}
              <div className="border-t border-white/5 pt-4 mt-4 text-center">
                <EditableText
                  as="h4"
                  sectionKey="imersao-omappa_testimonies"
                  path={['metadata', 'testimonies', idx, 'author']}
                  value={test.author}
                  className="text-sm font-display font-bold text-white leading-tight"
                />
                <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-1">
                  {test.role} — {test.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Event Details Grid */}
      <section className="py-16 bg-[#091120] border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold-primary/10 flex items-center justify-center text-gold-primary flex-shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <EditableStatic k="detail_1_title" value="Presencial" as="h4" className="text-sm font-bold text-white uppercase tracking-wider" />
                <EditableStatic k="detail_1_desc" value="Excelente networking presencial de alto nível com empresários." as="p" className="text-xs text-slate-400" />
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold-primary/10 flex items-center justify-center text-gold-primary flex-shrink-0">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <EditableStatic k="detail_2_title" value="Ferramentas" as="h4" className="text-sm font-bold text-white uppercase tracking-wider" />
                <EditableStatic k="detail_2_desc" value="Matrizes e planos de ação estruturados para aplicação imediata." as="p" className="text-xs text-slate-400" />
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold-primary/10 flex items-center justify-center text-gold-primary flex-shrink-0">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <EditableStatic k="detail_3_title" value="Material Didático" as="h4" className="text-sm font-bold text-white uppercase tracking-wider" />
                <EditableStatic k="detail_3_desc" value="Apostila completa digital em PDF e material de acompanhamento." as="p" className="text-xs text-slate-400" />
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold-primary/10 flex items-center justify-center text-gold-primary flex-shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <EditableStatic k="detail_4_title" value="Atividade Prática" as="h4" className="text-sm font-bold text-white uppercase tracking-wider" />
                <EditableStatic k="detail_4_desc" value="Atividades de mão na massa garantindo a vivência real do método." as="p" className="text-xs text-slate-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white uppercase flex items-center justify-center gap-2">
            <HelpCircle className="w-6 h-6 text-gold-primary" />
            Dúvidas? <span className="text-gold-primary">Confira aqui</span>
          </h2>
          <EditableStatic
            k="faq_subtitle"
            value="Ficou com alguma dúvida sobre a dinâmica do workshop presencial? Veja as respostas abaixo:"
            as="p"
            className="text-xs sm:text-sm text-slate-400"
          />
        </div>

        <div className="space-y-4">
          {faqs.map((faq: any, index: number) => {
            const isOpen = activeFaq === index
            return (
              <div
                key={index}
                className="bg-[#091120] border border-white/5 rounded-xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left text-white hover:text-gold-primary transition-colors focus:outline-none"
                >
                  <EditableText
                    as="span"
                    sectionKey="imersao-omappa_faqs"
                    path={['metadata', 'faqs', index, 'question']}
                    value={faq.question}
                    className="font-display font-semibold text-sm sm:text-base pr-4"
                  />
                  <ChevronDown
                    className={`w-4 h-4 text-gold-primary flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
                </button>
                {isOpen && (
                  <EditableText
                    as="div"
                    sectionKey="imersao-omappa_faqs"
                    path={['metadata', 'faqs', index, 'answer']}
                    value={faq.answer}
                    className="px-6 pb-6 pt-1 text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-white/5"
                  />
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Bottom CTA Block with guarantee badge */}
      <section className="py-20 bg-[#060D19] border-t border-white/5 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gold-primary/5"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 bg-[#091120] px-4 py-3 rounded-2xl border border-gold-primary/30 shadow-lg">
              <ShieldCheck className="w-8 h-8 text-gold-primary" />
              <div className="text-left">
                <EditableStatic
                  k="badge_line_1"
                  value="Inscrição Protegida"
                  as="span"
                  className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none"
                />
                <EditableStatic
                  k="badge_line_2"
                  value="Compra Segura & Selo Comprovado"
                  as="span"
                  className="block text-xs font-bold text-white mt-1"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase">
              Transforme a trajetória do seu <span className="text-gold-primary">Negócio</span>
            </h2>
            <EditableStatic
              k="bottom_cta_subtitle"
              value="Junte-se a dezenas de outros empresários e garanta sua vaga agora mesmo na próxima edição da Imersão OMAPPA."
              as="p"
              className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed"
            />
          </div>

          <div className="pt-2">
            <a
              href="https://www.sympla.com.br/evento/imersao-o-mappa-um-mapa-que-vai-nortear-voce-e-o-seu-negocio/1965990?d=PROMO50"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 font-bold text-base uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-lg hover:scale-102 transition-all gap-2"
            >
              <EditableStatic k="bottom_cta_button" value="Sim, quero minha vaga com 50% de Desconto!" as="span" />
            </a>
          </div>

          <EditableStatic
            k="bottom_footnote"
            value="*Ingressos geridos via plataforma Sympla. Ambientes criptografados e 100% seguros."
            as="div"
            className="text-xs text-slate-500 pt-2"
          />
        </div>
      </section>
    </div>
    </StaticContent>
  )
}
