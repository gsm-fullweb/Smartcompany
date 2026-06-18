import { useState } from 'react'
import { Check, ArrowRight, DollarSign, Landmark } from 'lucide-react'
import { useDynamicContent } from '../hooks/useDynamicContent'
import SEO from '../components/SEO'
import EditableText from '../admin/inline/EditableText'
import { StaticContent } from '../admin/inline/StaticContent'
import EditableStatic from '../admin/inline/EditableStatic'

interface Phase {
  name: string
  desc: string
}

interface Opportunity {
  title: string
  tag: string
  location: string
  desc: string
  features: string[]
}

const defaultPhases: Phase[] = [
  { name: 'Valuation', desc: 'Conclusão técnica do valor justo do negócio sem contaminação emocional.' },
  { name: 'Teaser Comercial', desc: 'Elaboração de documento resumido sem identificação (preservando o sigilo).' },
  { name: 'NDA (Confidencialidade)', desc: 'Assinatura de termo legal antes de abrir qualquer dado estratégico.' },
  { name: 'Apresentação do Negócio', desc: 'Reunião qualificada para apresentação do plano financeiro e operacional.' },
  { name: 'Carta de Intenções', desc: 'Formalização do interesse de compra e alinhamento de termos básicos (LOI).' },
  { name: 'Estudos de Viabilidade', desc: 'Mapeamento de sinergias operacionais e projeções pós-aquisição.' },
  { name: 'Acompanhamento de Due Diligence', desc: 'Apoio técnico na entrega de certidões, contabilidade e auditoria interna.' },
  { name: 'Formalização Jurídica', desc: 'Suporte na elaboração dos contratos definitivos de compra e venda (SPA).' }
]

const defaultOpportunities: Opportunity[] = [
  {
    title: 'Indústria Alimentícia & Cosmética',
    tag: 'Indústria',
    location: 'São Paulo - SP',
    desc: 'Empresa consolidada há mais de 20 anos no mercado. Possui sede própria com instalações amplas que suportam triplicar o faturamento atual. Atende grandes players e redes nacionais, além de exportação.',
    features: ['Sede Própria', 'Triplicar Receita', 'Exportadora']
  },
  {
    title: 'Franquia de Fast Food em Shopping',
    tag: 'Franquia',
    location: 'Alto Tietê - SP',
    desc: 'Unidade franqueada estabelecida há mais de 7 anos em shopping de grande circulação. Operação consolidada com faturamento estável e capacidade para expansão sem grandes aportes adicionais.',
    features: ['Shopping Center', '7 Anos de Operação', 'Retorno Rápido']
  },
  {
    title: 'Start Up Química/Cosméticos ANVISA',
    tag: 'Start Up',
    location: 'Grande São Paulo - SP',
    desc: 'Instalação moderna de 500m² certificada pela ANVISA e CETESB para fabricação. Maquinários quitados e licenças de fabricação e exportação ativas. Motivo: Dono aposentando-se sem sucessão.',
    features: ['ANVISA Ativa', 'Maquinário Quitado', '500m² de Área']
  },
  {
    title: 'Academia Premium Climatizada',
    tag: 'Serviços',
    location: 'Bairro Nobre - Rio de Janeiro - RJ',
    desc: 'Estrutura premium climatizada em ponto nobre e de alto poder aquisitivo. Capacidade de atendimento activa de até 1.500 alunos matriculados, com marca reconhecida regionalmente.',
    features: ['Ponto Nobre', 'Capacidade 1500 Alunos', 'Equipamentos Modernos']
  },
  {
    title: 'Restaurante Destaque Vale do Paraíba',
    tag: 'Alimentação',
    location: 'São José dos Campos - SP',
    desc: 'Consolidado há mais de 5 anos com mix variado de culinária e premiações renomadas (Destaque Veja Vale e Montanha). Certificado ISO Quality ativo. Motivo: Proprietário focando em outro segmento.',
    features: ['ISO Quality', 'Destaque Veja', '5 Anos de Sucesso']
  }
]

export default function Valuation() {
  const defaultHero = {
    badge: 'Fusões, Aquisições & Valuation',
    title: 'VOCÊ SABE QUANTO VALE SUA EMPRESA?',
    content: 'Avaliação, compra e venda de empresas é um assunto técnico e sério. Concluímos o valor de mercado (Valuation) através de metodologias consagradas como Fluxo de Caixa Descontado (FCF) e múltiplos de EBITDA.'
  }
  const { hero, opportunities, phases } = useDynamicContent('valuation', {
    hero: defaultHero,
    opportunities: defaultOpportunities,
    phases: defaultPhases
  })

  const [activeTab, setActiveTab] = useState<'vender' | 'comprar'>('vender')
  const [sellForm, setSellForm] = useState({ name: '', email: '', phone: '', companyName: '', revenue: '', message: '' })
  const [buyForm, setBuyForm] = useState({ name: '', email: '', phone: '', sectors: '', budget: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSellSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleBuySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }


  return (
    <StaticContent pageKey="valuation">
    <div className="bg-primary-dark pt-24 min-h-screen text-slate-300 font-sans">
      <SEO
        title="Valuation, Compra e Venda de Empresas | M&A" 
        description="Avaliação de empresas e preparação para processos de fusão e aquisição (M&A) com total sigilo e profissionalismo." 
      />
      {/* Hero Banner */}
      <section className="relative bg-[#070F1E] py-20 border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <EditableText
              as="span"
              sectionKey="valuation_hero"
              path={['metadata', 'badge']}
              value={hero.badge}
              className="text-[10px] font-bold text-gold-primary uppercase tracking-widest bg-gold-primary/10 py-1.5 px-4 rounded-full border border-gold-primary/20 inline-block"
            />
            <EditableText
              as="h1"
              sectionKey="valuation_hero"
              field="title"
              value={hero.title}
              className="text-4xl sm:text-5xl font-display font-black text-white tracking-tight leading-tight uppercase"
            />
            <EditableText
              as="p"
              sectionKey="valuation_hero"
              field="content"
              value={hero.content}
              className="text-base sm:text-lg text-slate-300"
            />
          </div>
        </div>
      </section>

      {/* M&A Overview */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <EditableStatic
              k="overview_title"
              value="M&A com Sigilo e Profissionalismo Absoluto"
              as="h2"
              className="text-2xl sm:text-3xl font-display font-bold text-white uppercase tracking-tight"
            />
            <EditableStatic
              k="overview_desc"
              value="Intermediamos a compra e venda de ativos com total sigilo. Nós qualificamos potenciais investidores para filtrar curiosos e especuladores, e prestamos assessoria total em Due Diligence para formalização da transação."
              as="p"
              className="text-sm text-slate-400 leading-relaxed"
            />
            <div className="space-y-3 font-display font-bold text-sm">
              <div className="flex items-center text-slate-200">
                <Check className="w-5 h-5 text-gold-primary mr-2.5 flex-shrink-0" />
                <EditableStatic k="overview_check_1" value="Conclusão técnica do valor justo da empresa" as="span" />
              </div>
              <div className="flex items-center text-slate-200">
                <Check className="w-5 h-5 text-gold-primary mr-2.5 flex-shrink-0" />
                <EditableStatic k="overview_check_2" value="Identificação de oportunidades qualificadas" as="span" />
              </div>
              <div className="flex items-center text-slate-200">
                <Check className="w-5 h-5 text-gold-primary mr-2.5 flex-shrink-0" />
                <EditableStatic k="overview_check_3" value="Fomento de propostas para efetivação do M&A" as="span" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-white/5 rounded-xl border border-white/5 space-y-2">
              <DollarSign className="w-8 h-8 text-gold-primary" />
              <EditableStatic k="card_valuation_title" value="Valuation Técnico" as="h3" className="text-white font-bold text-base" />
              <EditableStatic k="card_valuation_desc" value="Análise de balanços, goodwill, fluxo de caixa livre e taxas de desconto reais de mercado." as="p" className="text-xs text-slate-400 leading-relaxed" />
            </div>
            <div className="p-5 bg-white/5 rounded-xl border border-white/5 space-y-2">
              <Landmark className="w-8 h-8 text-gold-primary" />
              <EditableStatic k="card_nda_title" value="NDA Rigoroso" as="h3" className="text-white font-bold text-base" />
              <EditableStatic k="card_nda_desc" value="Garantia legal de sigilo sobre marcas, faturamento, processos e funcionários." as="p" className="text-xs text-slate-400 leading-relaxed" />
            </div>
          </div>
        </div>
      </section>

      {/* 8 Phases M&A */}
      <section className="py-20 bg-[#091120] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16">
            <EditableStatic k="phases_eyebrow" value="Etapas Técnicas" as="span" className="text-xs font-bold text-gold-primary uppercase tracking-widest" />
            <EditableStatic k="phases_title" value="Como estruturamos a venda" as="h2" className="text-3xl font-display font-bold text-white uppercase tracking-wider" />
            <EditableStatic
              k="phases_desc"
              value="Conheça as 8 fases cruciais executadas por nossa assessoria para compra e venda segura."
              as="p"
              className="text-slate-400 max-w-xl mx-auto text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {phases.map((phase: Phase, idx: number) => (
              <div key={phase.name} className="p-6 bg-[#070F1E] rounded-xl border border-white/5 space-y-3 hover:border-gold-primary/10 transition-colors">
                <div className="text-xs text-gold-primary font-bold">Fase 0{idx+1}</div>
                <EditableText
                  as="h3"
                  sectionKey="valuation_phases"
                  path={['metadata', 'phases', idx, 'name']}
                  value={phase.name}
                  className="text-base font-display font-bold text-white uppercase"
                />
                <EditableText
                  as="p"
                  sectionKey="valuation_phases"
                  path={['metadata', 'phases', idx, 'desc']}
                  value={phase.desc}
                  className="text-xs text-slate-400 leading-relaxed"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Opportunities Marketplace */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <EditableStatic k="marketplace_eyebrow" value="Marketplace Corporativo" as="span" className="text-xs font-bold text-gold-primary uppercase tracking-widest" />
          <EditableStatic k="marketplace_title" value="Oportunidades de Aquisição" as="h2" className="text-3xl font-display font-bold text-white uppercase tracking-wider" />
          <EditableStatic
            k="marketplace_desc"
            value="Empresas pré-avaliadas, ativas e disponíveis para fusão ou aquisição imediata."
            as="p"
            className="text-slate-400 max-w-xl mx-auto text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {opportunities.map((opp: Opportunity, idx: number) => (
            <div key={opp.title} className="glass rounded-xl p-6 border border-white/5 hover:border-gold-primary/10 transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <EditableText
                    as="span"
                    sectionKey="valuation_opportunities"
                    path={['metadata', 'opportunities', idx, 'tag']}
                    value={opp.tag}
                    className="text-[10px] font-bold text-gold-primary uppercase tracking-wider bg-gold-primary/10 py-1 px-3 rounded-full"
                  />
                  <EditableText
                    as="span"
                    sectionKey="valuation_opportunities"
                    path={['metadata', 'opportunities', idx, 'location']}
                    value={opp.location}
                    className="text-xs text-slate-500 font-semibold"
                  />
                </div>
                <EditableText
                  as="h3"
                  sectionKey="valuation_opportunities"
                  path={['metadata', 'opportunities', idx, 'title']}
                  value={opp.title}
                  className="text-lg font-display font-bold text-white mb-3"
                />
                <EditableText
                  as="p"
                  sectionKey="valuation_opportunities"
                  path={['metadata', 'opportunities', idx, 'desc']}
                  value={opp.desc}
                  className="text-xs sm:text-sm leading-relaxed text-slate-400 mb-6"
                />
              </div>
              <div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {opp.features.map((f: string, fIdx: number) => (
                    <EditableText
                      key={f}
                      as="span"
                      sectionKey="valuation_opportunities"
                      path={['metadata', 'opportunities', idx, 'features', fIdx]}
                      value={f}
                      className="text-[9px] font-bold text-slate-400 bg-white/5 py-1 px-2.5 rounded"
                    />
                  ))}
                </div>
                <button
                  onClick={() => {
                    setActiveTab('comprar')
                    const leadSec = document.getElementById('ma-leads')
                    if (leadSec) leadSec.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="w-full inline-flex items-center justify-center py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
                >
                  <EditableStatic k="opp_cta_button" value="Solicitar Informações" as="span" />
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Client Testimonial Spot */}
      <section className="py-16 bg-[#091120] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <p className="text-slate-300 italic text-base leading-relaxed">
            &ldquo;<EditableStatic k="testimonial_quote" value="A iniciativa de contratar a Smart Company se mostrou acertadíssima. Mergulharam nos números da empresa, gerando um extenso e detalhado relatório. Sempre se mostraram solícitos e disponíveis durante o trabalho. Hoje posso dizer que conheço minha empresa muito melhor e sei exatamente como e onde interferir na busca de melhores resultados." as="span" />&rdquo;
          </p>
          <div>
            <EditableStatic k="testimonial_author" value="Sergio Fonseca" as="h4" className="text-white font-display font-bold text-sm" />
            <EditableStatic k="testimonial_role" value="Diretor - Unidade Franqueada de Fast Food" as="p" className="text-gold-primary text-xs mt-1" />
          </div>
        </div>
      </section>

      {/* Tabs Form M&A Section */}
      <section id="ma-leads" className="py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center space-y-3 mb-10">
          <Landmark className="w-8 h-8 text-gold-primary mx-auto" />
          <EditableStatic k="form_title" value="Fale com Nossos Especialistas" as="h2" className="text-2xl sm:text-3xl font-display font-bold text-white uppercase tracking-wider" />
          <EditableStatic
            k="form_subtitle"
            value="Seja para avaliar e vender sua empresa com sigilo ou cadastrar seu perfil de compra, nosso time está à disposição."
            as="p"
            className="text-slate-400 text-sm"
          />
        </div>

        {/* Tab buttons */}
        <div className="flex border-b border-white/10 mb-8">
          <button
            onClick={() => { setActiveTab('vender'); setSubmitted(false); }}
            className={`w-1/2 py-3 text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${
              activeTab === 'vender' ? 'text-gold-primary border-gold-primary bg-gold-primary/5' : 'text-slate-400 border-transparent hover:text-white'
            }`}
          >
            <EditableStatic k="tab_sell_label" value="Quero Vender Minha Empresa" as="span" />
          </button>
          <button
            onClick={() => { setActiveTab('comprar'); setSubmitted(false); }}
            className={`w-1/2 py-3 text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${
              activeTab === 'comprar' ? 'text-gold-primary border-gold-primary bg-gold-primary/5' : 'text-slate-400 border-transparent hover:text-white'
            }`}
          >
            <EditableStatic k="tab_buy_label" value="Quero Comprar Um Negócio" as="span" />
          </button>
        </div>

        {submitted ? (
          <div className="glass p-8 rounded-2xl border border-green-500/20 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <h3 className="text-xl font-display font-bold text-white">Solicitação Enviada!</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Entraremos em contato com você via WhatsApp nas próximas horas sob total sigilo. Agradecemos o envio das informações preliminares.
            </p>
          </div>
        ) : activeTab === 'vender' ? (
          <form onSubmit={handleSellSubmit} className="glass p-8 rounded-xl border border-white/10 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1" htmlFor="s-name">Nome do Proprietário</label>
                <input
                  id="s-name"
                  type="text"
                  required
                  value={sellForm.name}
                  onChange={(e) => setSellForm({ ...sellForm, name: e.target.value })}
                  className="w-full bg-[#070F1E] border border-white/10 rounded-lg py-2.5 px-4 text-white text-sm focus:outline-none focus:border-gold-primary transition-colors"
                  placeholder="João Silva"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1" htmlFor="s-email">Email Pessoal/Corporativo</label>
                <input
                  id="s-email"
                  type="email"
                  required
                  value={sellForm.email}
                  onChange={(e) => setSellForm({ ...sellForm, email: e.target.value })}
                  className="w-full bg-[#070F1E] border border-white/10 rounded-lg py-2.5 px-4 text-white text-sm focus:outline-none focus:border-gold-primary transition-colors"
                  placeholder="joao@exemplo.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1" htmlFor="s-phone">Telefone / WhatsApp</label>
                <input
                  id="s-phone"
                  type="tel"
                  required
                  value={sellForm.phone}
                  onChange={(e) => setSellForm({ ...sellForm, phone: e.target.value })}
                  className="w-full bg-[#070F1E] border border-white/10 rounded-lg py-2.5 px-4 text-white text-sm focus:outline-none focus:border-gold-primary transition-colors"
                  placeholder="(11) 99999-9999"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1" htmlFor="s-comp">Nome/Ramo da Empresa</label>
                <input
                  id="s-comp"
                  type="text"
                  required
                  value={sellForm.companyName}
                  onChange={(e) => setSellForm({ ...sellForm, companyName: e.target.value })}
                  className="w-full bg-[#070F1E] border border-white/10 rounded-lg py-2.5 px-4 text-white text-sm focus:outline-none focus:border-gold-primary transition-colors"
                  placeholder="Indústria Cosmética Ltda"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1" htmlFor="s-rev">Faturamento Anual Aproximado</label>
              <select
                id="s-rev"
                required
                value={sellForm.revenue}
                onChange={(e) => setSellForm({ ...sellForm, revenue: e.target.value })}
                className="w-full bg-[#070F1E] border border-white/10 rounded-lg py-2.5 px-4 text-white text-sm focus:outline-none focus:border-gold-primary transition-colors"
              >
                <option value="">Selecione a faixa</option>
                <option value="Até 3M">Até R$ 3 Milhões</option>
                <option value="3M a 10M">R$ 3 Milhões a R$ 10 Milhões</option>
                <option value="10M a 50M">R$ 10 Milhões a R$ 50 Milhões</option>
                <option value="Acima de 50M">Acima de R$ 50 Milhões</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1" htmlFor="s-msg">Observações (Opcional)</label>
              <textarea
                id="s-msg"
                value={sellForm.message}
                onChange={(e) => setSellForm({ ...sellForm, message: e.target.value })}
                rows={3}
                className="w-full bg-[#070F1E] border border-white/10 rounded-lg py-2.5 px-4 text-white text-sm focus:outline-none focus:border-gold-primary transition-colors resize-none"
                placeholder="Ex: Tempo de mercado, número de sócios, etc..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center py-3.5 text-sm font-bold uppercase tracking-wider text-primary-dark bg-gold-primary hover:bg-gold-light rounded-lg transition-colors shadow-lg shadow-gold-primary/10"
            >
              <span>Enviar Proposta de Venda (Sigiloso)</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleBuySubmit} className="glass p-8 rounded-xl border border-white/10 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1" htmlFor="b-name">Nome Completo</label>
                <input
                  id="b-name"
                  type="text"
                  required
                  value={buyForm.name}
                  onChange={(e) => setBuyForm({ ...buyForm, name: e.target.value })}
                  className="w-full bg-[#070F1E] border border-white/10 rounded-lg py-2.5 px-4 text-white text-sm focus:outline-none focus:border-gold-primary transition-colors"
                  placeholder="Nome do Comprador"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1" htmlFor="b-email">Email de Contato</label>
                <input
                  id="b-email"
                  type="email"
                  required
                  value={buyForm.email}
                  onChange={(e) => setBuyForm({ ...buyForm, email: e.target.value })}
                  className="w-full bg-[#070F1E] border border-white/10 rounded-lg py-2.5 px-4 text-white text-sm focus:outline-none focus:border-gold-primary transition-colors"
                  placeholder="investidor@exemplo.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1" htmlFor="b-phone">WhatsApp</label>
                <input
                  id="b-phone"
                  type="tel"
                  required
                  value={buyForm.phone}
                  onChange={(e) => setBuyForm({ ...buyForm, phone: e.target.value })}
                  className="w-full bg-[#070F1E] border border-white/10 rounded-lg py-2.5 px-4 text-white text-sm focus:outline-none focus:border-gold-primary transition-colors"
                  placeholder="(11) 99999-9999"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1" htmlFor="b-sect">Setores de Interesse</label>
                <input
                  id="b-sect"
                  type="text"
                  required
                  value={buyForm.sectors}
                  onChange={(e) => setBuyForm({ ...buyForm, sectors: e.target.value })}
                  className="w-full bg-[#070F1E] border border-white/10 rounded-lg py-2.5 px-4 text-white text-sm focus:outline-none focus:border-gold-primary transition-colors"
                  placeholder="Ex: Indústrias, Franquias, Serviços"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1" htmlFor="b-bud">Orçamento Disponível para Aporte</label>
              <select
                id="b-bud"
                required
                value={buyForm.budget}
                onChange={(e) => setBuyForm({ ...buyForm, budget: e.target.value })}
                className="w-full bg-[#070F1E] border border-white/10 rounded-lg py-2.5 px-4 text-white text-sm focus:outline-none focus:border-gold-primary transition-colors"
              >
                <option value="">Selecione a faixa</option>
                <option value="Até 1M">Até R$ 1 Milhão</option>
                <option value="1M a 5M">R$ 1 Milhão a R$ 5 Milhões</option>
                <option value="5M a 20M">R$ 5 Milhões a R$ 20 Milhões</option>
                <option value="Acima de 20M">Acima de R$ 20 Milhões</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1" htmlFor="b-msg">Mensagem (Opcional)</label>
              <textarea
                id="b-msg"
                value={buyForm.message}
                onChange={(e) => setBuyForm({ ...buyForm, message: e.target.value })}
                rows={3}
                className="w-full bg-[#070F1E] border border-white/10 rounded-lg py-2.5 px-4 text-white text-sm focus:outline-none focus:border-gold-primary transition-colors resize-none"
                placeholder="Descreva seu perfil de investimento..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center py-3.5 text-sm font-bold uppercase tracking-wider text-primary-dark bg-gold-primary hover:bg-gold-light rounded-lg transition-colors shadow-lg shadow-gold-primary/10"
            >
              <span>Cadastrar Perfil de Compra</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </form>
        )}
      </section>
    </div>
    </StaticContent>
  )
}
