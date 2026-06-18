import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, ChevronDown, MessageSquare, ArrowRight, HelpCircle } from 'lucide-react'
import { useDynamicContent } from '../hooks/useDynamicContent'
import SEO from '../components/SEO'
import EditableText from '../admin/inline/EditableText'
import { StaticContent } from '../admin/inline/StaticContent'
import EditableStatic from '../admin/inline/EditableStatic'

export default function ComoTransformamos() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', segment: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const defaultHero = {
    badge: 'Metodologia Taylor-Made',
    title: 'Como Transformamos Empresas?',
    subtitle: 'Diagnosticamos • Planejamos • Executamos',
    content: 'Amamos o que fazemos! A nossa consultoria e gestão são personalizadas para a realidade do seu negócio, identificando gargalos e construindo soluções com payback real.'
  }

  const defaultStats = [
    { number: '70+', label: 'Diagnósticos Realizados' },
    { number: '100%', label: 'Clientes Satisfeitos' },
    { number: '95%', label: 'Conversão em Projeto' },
    { number: '100%', label: 'Entregues no Prazo e Custo' }
  ]

  const defaultFaqs = [
    {
      q: 'Quanto tempo leva para realizar um Diagnóstico?',
      a: 'Em média leva de 3 a 4 semanas, podendo variar conforme a complexidade operacional da empresa e a velocidade de disponibilização de dados pelo cliente.'
    },
    {
      q: 'O diagnóstico atrapalha a rotina da empresa?',
      a: 'Não, de forma alguma. Por já termos realizado este procedimento mais de 70 vezes, aprimoramos o cronograma de coletas e entrevistas de modo que seja executado de forma fluida sem paralisar a rotina.'
    },
    {
      q: 'Em quanto tempo deve ser realizada a Fase 2 (Implantação)?',
      a: 'Depende diretamente das carências e prioridades detectadas na Fase de Diagnóstico. Pode levar desde poucos meses para ajustes focados, até pouco mais de 1 ano para reestruturações totais.'
    },
    {
      q: 'Qual será o valor investido?',
      a: 'O valor é ponderado conforme o perfil dos consultores seniores alocados e a carga horária de dedicação exigida. Tomamos o cuidado de desenhar propostas viáveis, ajustadas à realidade financeira da empresa.'
    },
    {
      q: 'O projeto se paga? Há payback?',
      a: 'Sim. Durante a apresentação do laudo do Diagnóstico, apresentamos o cálculo do Payback projetado (relação entre honorários e o retorno financeiro gerado em até 24 meses pelas melhorias implatadas).'
    }
  ]

  const {
    hero,
    stats: statsList,
    faqs: faqsList
  } = useDynamicContent('comotransformamos', {
    hero: defaultHero,
    stats: defaultStats,
    faqs: defaultFaqs
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  return (
    <StaticContent pageKey="comotransformamos">
    <div className="bg-primary-dark pt-24 min-h-screen text-slate-300 font-sans">
      <SEO 
        title="Como Transformamos Empresas | Método de Gestão e Lucro" 
        description="Descubra o nosso método prático de transformação empresarial para acelerar seu lucro, equipe e performance operacional." 
      />
      {/* Hero Section */}
      <section className="relative bg-[#091120] py-20 border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <EditableText
                as="span"
                sectionKey="comotransformamos_hero"
                path={['metadata', 'badge']}
                value={hero.badge}
                className="text-[10px] font-bold text-gold-primary uppercase tracking-widest bg-gold-primary/10 py-1 px-3.5 rounded-full border border-gold-primary/25 inline-block"
              />
              <EditableText
                as="h1"
                sectionKey="comotransformamos_hero"
                field="title"
                value={hero.title}
                className="text-4xl sm:text-5xl font-display font-black text-white tracking-tight leading-tight uppercase"
              />
              <EditableText
                as="p"
                sectionKey="comotransformamos_hero"
                path={['metadata', 'subtitle']}
                value={hero.subtitle}
                className="text-3xl font-display font-bold text-gold-primary"
              />
              <EditableText
                as="p"
                sectionKey="comotransformamos_hero"
                field="content"
                value={hero.content}
                className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl"
              />
            </div>
            
            {/* Geometric visual */}
            <div className="relative flex justify-center items-center py-10">
              <div className="w-80 h-80 rounded-full border border-gold-primary/10 absolute animate-spin duration-[20s] -z-10"></div>
              <div className="w-64 h-64 rounded-full border border-dashed border-gold-primary/20 absolute animate-spin duration-[10s] -z-10"></div>
              <div className="glass-gold p-8 rounded-2xl border border-gold-primary/20 text-center max-w-sm shadow-2xl">
                <EditableStatic k="foco_total_label" value="Foco Total" as="span" className="text-[10px] font-bold text-gold-primary uppercase tracking-wider block" />
                <p className="text-white font-display font-bold text-lg mt-2 mb-4 leading-snug">
                  "<EditableStatic k="foco_total_quote" value="Gestão é fazer tudo bem feito, gerando resultados, extraindo o melhor de cada área, seja qual for o negócio." as="span" />"
                </p>
                <div className="w-8 h-1 bg-gold-primary mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Intro */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <EditableStatic k="overview_eyebrow" value="O que fazemos" as="span" className="text-[10px] font-bold text-gold-primary uppercase tracking-widest" />
            <EditableStatic k="overview_title" value="Especialistas em Reestruturação" as="h2" className="text-3xl font-display font-extrabold text-white uppercase" />
            <EditableStatic k="overview_paragraph" value="Somos especialistas em diagnosticar dificuldades que atrapalham o desempenho e em identificar oportunidades de crescimento. O tamanho da empresa cliente não interfere no nosso trabalho: atendemos desde pequenas e médias com faturamento de R$ 3 milhões, até grandes corporações com receitas acima de R$ 200 milhões." as="p" className="text-sm sm:text-base text-slate-400 leading-relaxed" />
          </div>
          <div className="p-6 bg-white/5 rounded-xl border border-white/5 flex flex-col justify-center">
            <p className="text-slate-300 italic text-base leading-relaxed">
              &ldquo;<EditableStatic k="overview_quote" value="Um bom Check-Up (diagnóstico) da situação aumenta significativamente o índice de assertividade das implantações propostas. Evitamos achismos e trabalhamos em cima de dados precisos." as="span" />&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Phase 1: Diagnostico */}
      <section className="py-20 bg-[#091120] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16">
            <EditableStatic k="phase1_eyebrow" value="Fase Inicial" as="span" className="text-xs font-bold text-gold-primary uppercase tracking-widest" />
            <EditableStatic k="phase1_title" value="Fase 1: Diagnóstico Empresarial" as="h2" className="text-3xl font-display font-bold text-white uppercase tracking-wider" />
            <EditableStatic k="phase1_subtitle" value="Um mapeamento completo de 3 a 4 semanas para identificar onde estão as perdas do seu negócio." as="p" className="text-slate-400 max-w-xl mx-auto text-sm" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="glass rounded-xl p-8 border border-white/5 space-y-4">
              <div className="w-10 h-10 rounded-full bg-gold-primary/10 text-gold-primary flex items-center justify-center font-display font-bold">1</div>
              <EditableStatic k="phase1_card1_title" value="Alinhamento de Expectativas" as="h3" className="text-lg font-display font-bold text-white uppercase" />
              <EditableStatic k="phase1_card1_text" value="Antes de iniciar, coletamos um formulário com suas metas e dores. Alinhamos o que você espera com o que de fato identificamos ser crítico para a empresa decolar, gerando uma Proposta Consistente." as="p" className="text-xs sm:text-sm text-slate-400 leading-relaxed" />
            </div>

            <div className="glass rounded-xl p-8 border border-white/5 space-y-4">
              <div className="w-10 h-10 rounded-full bg-gold-primary/10 text-gold-primary flex items-center justify-center font-display font-bold">2</div>
              <EditableStatic k="phase1_card2_title" value="Análise Estrutural & KPIs" as="h3" className="text-lg font-display font-bold text-white uppercase" />
              <EditableStatic k="phase1_card2_text" value="Realizamos entrevistas estruturadas com a diretoria e lideranças, auditamos processos internos, fluxo de caixa, precificação, CRM comercial e compilamos dados reais em relatórios de desempenho." as="p" className="text-xs sm:text-sm text-slate-400 leading-relaxed" />
            </div>

            <div className="glass rounded-xl p-8 border border-white/5 space-y-4">
              <div className="w-10 h-10 rounded-full bg-gold-primary/10 text-gold-primary flex items-center justify-center font-display font-bold">3</div>
              <EditableStatic k="phase1_card3_title" value="Apresentação & Payback" as="h3" className="text-lg font-display font-bold text-white uppercase" />
              <EditableStatic k="phase1_card3_text" value="Apresentamos um cronograma macro por setor aos sócios, detalhando o Potencial de Resultados, valor dos honorários e o Payback esperado (retorno sobre o investimento da consultoria)." as="p" className="text-xs sm:text-sm text-slate-400 leading-relaxed" />
            </div>
          </div>
        </div>
      </section>

      {/* Phase 2: Implantacao */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <EditableStatic k="phase2_eyebrow" value="Execução Prática" as="span" className="text-xs font-bold text-gold-primary uppercase tracking-widest" />
          <EditableStatic k="phase2_title" value="Fase 2: Implantação Sob Medida" as="h2" className="text-3xl font-display font-bold text-white uppercase tracking-wider" />
          <EditableStatic k="phase2_subtitle" value="Colocando o planejamento em ação, redesenhando processos e acompanhando resultados semanais." as="p" className="text-slate-400 max-w-xl mx-auto text-sm" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="glass rounded-xl p-8 border border-white/5 space-y-4">
            <div className="w-10 h-10 rounded-full bg-gold-primary/10 text-gold-primary flex items-center justify-center font-display font-bold">A</div>
            <EditableStatic k="phase2_card1_title" value="Estratégia no Workshop" as="h3" className="text-lg font-display font-bold text-white uppercase" />
            <EditableStatic k="phase2_card1_text" value="Validamos o cronograma em conjunto com a equipe da empresa no Workshop de início do projeto. A partir desse momento, as melhorias passam a contar com o comprometimento do time (co-autores)." as="p" className="text-xs sm:text-sm text-slate-400 leading-relaxed" />
          </div>

          <div className="glass rounded-xl p-8 border border-white/5 space-y-4">
            <div className="w-10 h-10 rounded-full bg-gold-primary/10 text-gold-primary flex items-center justify-center font-display font-bold">B</div>
            <EditableStatic k="phase2_card2_title" value="Cronograma Mestre" as="h3" className="text-lg font-display font-bold text-white uppercase" />
            <EditableStatic k="phase2_card2_text" value={'Reestruturamos de fato as áreas comerciais, financeiras e produtivas. Seguimos a regra rígida de "Prazo combinado é prazo cumprido", garantindo disciplina operacional e relatórios técnicos.'} as="p" className="text-xs sm:text-sm text-slate-400 leading-relaxed" />
          </div>

          <div className="glass rounded-xl p-8 border border-white/5 space-y-4">
            <div className="w-10 h-10 rounded-full bg-gold-primary/10 text-gold-primary flex items-center justify-center font-display font-bold">C</div>
            <EditableStatic k="phase2_card3_title" value="Reuniões de Co-Gestão" as="h3" className="text-lg font-display font-bold text-white uppercase" />
            <EditableStatic k="phase2_card3_text" value="Prestamos contas constantes via reuniões de co-gestão. Transferimos as ferramentas para o time do cliente de modo a não gerar qualquer dependência da consultoria após o término do projeto." as="p" className="text-xs sm:text-sm text-slate-400 leading-relaxed" />
          </div>
        </div>
      </section>

      {/* Fun Facts Statistics Grid */}
      <section className="py-16 bg-gold-primary text-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {statsList.map((s: any, idx: number) => (
              <div key={s.label} className="space-y-1">
                <EditableText
                  as="span"
                  sectionKey="comotransformamos_stats"
                  path={['metadata', 'stats', idx, 'number']}
                  value={s.number}
                  className="text-4xl sm:text-5xl font-display font-black tracking-tight block"
                />
                <EditableText
                  as="span"
                  sectionKey="comotransformamos_stats"
                  path={['metadata', 'stats', idx, 'label']}
                  value={s.label}
                  className="text-xs font-bold uppercase tracking-wider block opacity-85"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Question M&A link & Video Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <EditableStatic k="decision_eyebrow" value="Tomada de Decisão" as="span" className="text-xs font-bold text-gold-primary uppercase tracking-widest" />
            <EditableStatic k="decision_title" value="Compensa continuar com o negócio ou é melhor fechar?" as="h2" className="text-3xl font-display font-extrabold text-white uppercase leading-tight" />
            <EditableStatic k="decision_paragraph" value={'Esta é a "pergunta de um milhão". Já vivenciamos vários cenários complexos: empresas que geravam lucro, mas não tinham fluxo de caixa real devido a estoques inflados ou conflito de sócios. Um diagnóstico empresarial técnico e assertivo pode ser o farol para decidir o melhor caminho a seguir.'} as="p" className="text-sm sm:text-base text-slate-400 leading-relaxed" />
            <div className="pt-2">
              <Link
                to="/valuation-avaliacao-compra-e-venda-de-empresas"
                className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-gold-primary hover:text-gold-light transition-colors"
              >
                <EditableStatic k="decision_cta" value="Entender Valuation & M&A da sua empresa" as="span" />
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
          
          {/* YouTube Video Player Embed */}
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/Yr23YGGu_jo"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQS Section */}
      <section className="py-20 bg-secondary-dark/30 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <HelpCircle className="w-8 h-8 text-gold-primary mx-auto" />
            <EditableStatic k="faq_title" value="Perguntas Frequentes" as="h2" className="text-2xl sm:text-3xl font-display font-bold text-white uppercase tracking-wider" />
            <EditableStatic k="faq_subtitle" value="Tire suas principais dúvidas sobre o Diagnóstico e Consultoria Smart Company." as="p" className="text-slate-400 text-sm" />
          </div>

          <div className="space-y-4">
            {faqsList.map((faq: any, idx: number) => {
              const isOpen = activeFaq === idx
              return (
                <div key={faq.q} className="bg-white/5 rounded-xl border border-white/5 overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
                  >
                    <EditableText
                      as="span"
                      sectionKey="comotransformamos_faqs"
                      path={['metadata', 'faqs', idx, 'q']}
                      value={faq.q}
                      className="font-display font-bold text-white text-sm sm:text-base"
                    />
                    <ChevronDown className={`w-5 h-5 text-gold-primary transition-transform duration-350 ${isOpen ? 'transform rotate-180' : ''}`} />
                  </button>
                  <div
                    className={`transition-all duration-300 ${
                      isOpen ? 'max-h-48 border-t border-white/5 p-6' : 'max-h-0'
                    } overflow-hidden`}
                  >
                    <EditableText
                      as="p"
                      sectionKey="comotransformamos_faqs"
                      path={['metadata', 'faqs', idx, 'a']}
                      value={faq.a}
                      className="text-xs sm:text-sm leading-relaxed text-slate-400"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Lead/Contact Form Section */}
      <section className="py-20 bg-gradient-to-t from-secondary-dark/60 to-transparent border-t border-white/5">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-3">
            <MessageSquare className="w-8 h-8 text-gold-primary mx-auto" />
            <EditableStatic k="contact_title" value="Que tal um café virtual?" as="h2" className="text-2xl sm:text-3xl font-display font-bold text-white uppercase tracking-wider" />
            <EditableStatic k="contact_subtitle" value="Preencha os dados abaixo e entraremos em contato para alinhar nossas agendas e agendar uma cortesia presencial ou virtual." as="p" className="text-slate-400 text-sm max-w-md mx-auto" />
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="text-left space-y-4 bg-white/5 p-8 rounded-xl border border-white/10 shadow-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1" htmlFor="name">
                    Seu Nome
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#070F1E] border border-white/10 rounded-lg py-2.5 px-4 text-white text-sm focus:outline-none focus:border-gold-primary transition-colors"
                    placeholder="João Silva"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1" htmlFor="email">
                    Email Corporativo
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#070F1E] border border-white/10 rounded-lg py-2.5 px-4 text-white text-sm focus:outline-none focus:border-gold-primary transition-colors"
                    placeholder="joao@empresa.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1" htmlFor="phone">
                    WhatsApp
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#070F1E] border border-white/10 rounded-lg py-2.5 px-4 text-white text-sm focus:outline-none focus:border-gold-primary transition-colors"
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1" htmlFor="segment">
                    Segmento da Empresa
                  </label>
                  <input
                    id="segment"
                    type="text"
                    required
                    value={formData.segment}
                    onChange={(e) => setFormData({ ...formData, segment: e.target.value })}
                    className="w-full bg-[#070F1E] border border-white/10 rounded-lg py-2.5 px-4 text-white text-sm focus:outline-none focus:border-gold-primary transition-colors"
                    placeholder="Ex: Indústria, Serviços, Comércio"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1" htmlFor="message">
                  Mensagem (Opcional)
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full bg-[#070F1E] border border-white/10 rounded-lg py-2.5 px-4 text-white text-sm focus:outline-none focus:border-gold-primary transition-colors resize-none"
                  placeholder="Conte um pouco sobre as principais dores da sua empresa..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-primary-dark bg-gold-primary hover:bg-gold-light rounded-lg shadow-lg shadow-gold-primary/10 transition-colors"
              >
                <span>Solicitar Café Virtual</span>
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="bg-white/5 border border-green-500/20 p-8 rounded-xl max-w-md mx-auto space-y-4">
              <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h3 className="text-xl font-display font-bold text-white">Solicitação Recebida!</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Agradecemos o contato, <strong>{formData.name}</strong>. Nas próximas horas, nossa assessoria entrará em contato via WhatsApp <strong>{formData.phone}</strong> para agendar o nosso café.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
    </StaticContent>
  )
}
