import { useState } from 'react'
import { Check, ArrowRight, ShieldCheck, Award, HelpCircle, ChevronDown, BookOpen } from 'lucide-react'
import { useDynamicContent } from '../hooks/useDynamicContent'
import SEO from '../components/SEO'
import EditableText from '../admin/inline/EditableText'
import { StaticContent } from '../admin/inline/StaticContent'
import EditableStatic from '../admin/inline/EditableStatic'

export default function CursoCIA() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  const defaultHero = {
    badge: 'Comercial Inteligente e Ativo',
    title: 'Alavanque as vendas estruturando seu Comercial',
    content: 'Venda de forma inteligente e com margem real. Descubra como estruturar sua força de vendas de ponta a ponta e bater metas mesmo em mercados competitivos.'
  }

  const defaultFaqs = [
    {
      q: 'Para quem é recomendado o Programa CIA?',
      a: 'É indicado para gestores de vendas, diretores comerciais, empresários e líderes de equipes que atuam no segmento de indústria, comércio ou prestação de serviços.'
    },
    {
      q: 'O curso é gravado?',
      a: 'Sim, as 11 video-aulas são totalmente gravadas e de caráter brutalmente prático. Você pode assistir no computador, celular ou tablet de onde quiser e aplicar na hora.'
    },
    {
      q: 'Qual o formato do material didático?',
      a: 'Além das aulas, você recebe apostilas de apoio didático em PDF para leitura ou impressão, e modelos práticos de matrizes de vendas em Excel.'
    },
    {
      q: 'Como funciona o reembolso?',
      a: 'O curso oferece 15 dias de garantia incondicional. Se por qualquer motivo você não gostar das táticas, basta solicitar o estorno e devolveremos 100% do seu dinheiro.'
    }
  ]

  const defaultTargets = [
    'Como dobrar ou triplicar o volume de vendas do seu time.',
    'Como mapear e conquistar novos clientes qualificados.',
    'Vender com margem técnica e manter o lucro em cada pedido.',
    'Onde encontrar o seu cliente ideal (ICP) de forma ativa.',
    'Como organizar e gerenciar a rotina do setor comercial.',
    'Como desdobrar metas de forma justa e superá-las com recorrência.'
  ]

  const defaultModules = [
    {
      title: 'Módulo 1: Comercial Inteligente',
      desc: 'Trata de decisões estratégicas e estruturais essenciais. Foca em Inteligência Comercial e Planejamento.',
      steps: [
        'Benchmarking Comercial e Análise de Mercado.',
        'Criação de Tabela de Preços e Alçadas de Descontos nas negociações.',
        'Política de Comissionamento e prazos de pagamento de comissão.',
        'Mapeamento de indicadores de prospecção e Funil de Negócios (Pipeline).',
        'Modelos de reuniões de fechamento e acompanhamento de propostas.'
      ]
    },
    {
      title: 'Módulo 2: Comercial Ativo',
      desc: 'Focado em atitudes operacionais para prospecção acelerada e atração qualificada.',
      steps: [
        'Arroz com feijão bem feito: Capricho no atendimento inicial.',
        'Design de Campanhas sincronizadas com o setor operacional.',
        'Diferenciação entre o que o cliente quer vs o que ele realmente precisa.',
        'Matriz de Melhoria da Experiência do Cliente.',
        'Como contratar, recrutar e entrevistar vendedores (Scripts & Perfil comportamental).'
      ]
    }
  ]

  const defaultBonuses = [
    {
      title: 'BÔNUS 1: 50 Dicas Essenciais aos Vendedores',
      value: 'R$ 88,00',
      desc: 'Dicas práticas elaboradas por Antonio Geraldes para treinamentos rápidos de equipes de vendas.'
    },
    {
      title: 'BÔNUS 2: Como Tratar Objeções de Clientes',
      value: 'R$ 55,00',
      desc: 'Manual completo para contornar desculpas frequentes de compradores e aumentar taxas de conversão.'
    },
    {
      title: 'BÔNUS 3: Persuasão & Gatilhos Mentais',
      value: 'R$ 44,00',
      desc: 'Guia de aplicação imediata de gatilhos psicológicos para fechamento rápido de propostas.'
    }
  ]

  const {
    hero,
    faqs: faqsList,
    targets,
    modules,
    bonuses
  } = useDynamicContent('cursocia', {
    hero: defaultHero,
    faqs: defaultFaqs,
    targets: defaultTargets,
    modules: defaultModules,
    bonuses: defaultBonuses
  })

  return (
    <StaticContent pageKey="cursocia">
    <div className="bg-primary-dark pt-24 min-h-screen text-slate-300 font-sans">
      <SEO 
        title="Comercial Inteligente e Ativo (CIA) | Treinamento de Vendas" 
        description="Acelere suas vendas estruturando um setor comercial de alto desempenho e previsibilidade com o método CIA." 
      />
      {/* Hero Banner */}
      <section className="relative bg-[#0b1528] py-20 border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <EditableText
              as="span"
              sectionKey="cursocia_hero"
              path={['metadata', 'badge']}
              value={hero.badge}
              className="text-[10px] font-bold text-gold-primary uppercase tracking-widest bg-gold-primary/10 py-1.5 px-4 rounded-full border border-gold-primary/20 inline-block"
            />
            <EditableText
              as="h1"
              sectionKey="cursocia_hero"
              field="title"
              value={hero.title}
              className="text-4xl sm:text-5xl font-display font-black text-white tracking-tight leading-tight uppercase"
            />
            <EditableText
              as="p"
              sectionKey="cursocia_hero"
              field="content"
              value={hero.content}
              className="text-base sm:text-lg text-slate-300"
            />
          </div>
        </div>
      </section>

      {/* Target Points Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <EditableStatic
              k="target_heading"
              value="A Máquina de Vendas Comercial que sua Empresa Precisa"
              as="h2"
              className="text-2xl sm:text-3xl font-display font-bold text-white uppercase tracking-tight"
            />
            <EditableStatic
              k="target_paragraph"
              value="Você sabe que, neste exato momento, há concorrentes faturando alto. Se você não estruturar o seu setor comercial de forma ativa, sua empresa ficará estagnada. O Curso CIA traz táticas simples, didáticas e aplicáveis."
              as="p"
              className="text-sm text-slate-400 leading-relaxed"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {targets.map((t: string, idx: number) => (
                <div key={t} className="flex items-start">
                  <Check className="w-5 h-5 text-gold-primary mr-2.5 mt-0.5 flex-shrink-0" />
                  <EditableText
                    as="span"
                    sectionKey="cursocia_targets"
                    path={['metadata', 'targets', idx]}
                    value={t}
                    className="text-xs sm:text-sm text-slate-300 leading-relaxed"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-secondary-dark/60 border border-white/10 rounded-2xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gold-primary/10 flex items-center justify-center text-gold-primary">
                <BookOpen className="w-5 h-5" />
              </div>
              <EditableStatic k="resources_heading" value="Recursos do Curso" as="h3" className="text-lg font-display font-bold text-white uppercase" />
            </div>
            <ul className="space-y-4 text-xs sm:text-sm">
              <li className="flex items-start"><Check className="w-4 h-4 text-gold-primary mr-3 mt-1 flex-shrink-0" /> <EditableStatic k="resource_1" value="11 video-aulas objetivas sem enrolação." as="span" /></li>
              <li className="flex items-start"><Check className="w-4 h-4 text-gold-primary mr-3 mt-1 flex-shrink-0" /> <EditableStatic k="resource_2" value="Matrizes em Excel para controle de pipeline comercial." as="span" /></li>
              <li className="flex items-start"><Check className="w-4 h-4 text-gold-primary mr-3 mt-1 flex-shrink-0" /> <EditableStatic k="resource_3" value="Apostila didática em PDF de suporte." as="span" /></li>
              <li className="flex items-start"><Check className="w-4 h-4 text-gold-primary mr-3 mt-1 flex-shrink-0" /> <EditableStatic k="resource_4" value="Certificado de Conclusão após conclusão do material." as="span" /></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="py-20 bg-[#091120] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16">
            <EditableStatic k="modules_eyebrow" value="Atributos do Programa" as="span" className="text-xs font-bold text-gold-primary uppercase tracking-widest" />
            <EditableStatic k="modules_heading" value="Estrutura de Ensino do CIA" as="h2" className="text-3xl font-display font-bold text-white uppercase tracking-wider" />
            <EditableStatic
              k="modules_paragraph"
              value="Dois grandes módulos para atuar na inteligência de planejamento e na atitude operacional de prospecção."
              as="p"
              className="text-slate-400 max-w-xl mx-auto text-sm"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {modules.map((m: any, idx: number) => (
              <div key={m.title} className="glass rounded-xl p-8 border border-white/5 space-y-6">
                <div>
                  <EditableText
                    as="h3"
                    sectionKey="cursocia_modules"
                    path={['metadata', 'modules', idx, 'title']}
                    value={m.title}
                    className="text-xl font-display font-bold text-white uppercase tracking-wide border-b border-white/10 pb-3"
                  />
                  <EditableText
                    as="p"
                    sectionKey="cursocia_modules"
                    path={['metadata', 'modules', idx, 'desc']}
                    value={m.desc}
                    className="text-xs sm:text-sm text-slate-400 mt-3 leading-relaxed"
                  />
                </div>
                <div className="space-y-3">
                  {m.steps.map((step: string) => (
                    <div key={step} className="flex items-start text-xs sm:text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-primary mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-slate-300 leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bonus grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <EditableStatic k="bonus_eyebrow" value="Bônus Inclusos" as="span" className="text-xs font-bold text-gold-primary uppercase tracking-widest" />
          <EditableStatic k="bonus_heading" value="Pacote de Bônus de Vendas" as="h2" className="text-3xl font-display font-bold text-white uppercase tracking-wider" />
          <EditableStatic
            k="bonus_paragraph"
            value="São R$ 187,00 em bônus adicionais liberados imediatamente na Hotmart."
            as="p"
            className="text-slate-400 max-w-xl mx-auto text-sm"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {bonuses.map((b: any, idx: number) => (
            <div key={b.title} className="glass p-8 rounded-xl border border-gold-primary/10 flex flex-col justify-between relative overflow-hidden">
              <EditableStatic
                k="bonus_free_badge"
                value="Grátis"
                as="div"
                className="absolute top-0 right-0 px-3 py-1 bg-gold-primary text-primary-dark font-bold text-[10px] uppercase rounded-bl-lg"
              />
              <div className="space-y-4">
                <EditableText
                  as="h3"
                  sectionKey="cursocia_bonuses"
                  path={['metadata', 'bonuses', idx, 'title']}
                  value={b.title}
                  className="text-lg font-display font-bold text-white pr-8"
                />
                <EditableText
                  as="p"
                  sectionKey="cursocia_bonuses"
                  path={['metadata', 'bonuses', idx, 'desc']}
                  value={b.desc}
                  className="text-xs text-slate-400 leading-relaxed"
                />
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-xs">
                <span className="text-slate-500"><EditableStatic k="bonus_original_label" value="Valor Original:" as="span" /> <EditableText
                  as="span"
                  sectionKey="cursocia_bonuses"
                  path={['metadata', 'bonuses', idx, 'value']}
                  value={b.value}
                  className="line-through"
                /></span>
                <EditableStatic k="bonus_final_price" value="R$ 0,00" as="span" className="text-gold-primary font-bold" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Offer */}
      <section className="py-20 bg-gradient-to-b from-[#091120] to-primary-dark border-t border-white/5 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-3">
            <EditableStatic k="offer_eyebrow" value="Investimento Promocional" as="span" className="text-xs font-bold text-gold-primary uppercase tracking-widest" />
            <EditableStatic k="offer_heading" value="Garanta Seu Acesso ao CIA" as="h2" className="text-3xl sm:text-4xl font-display font-extrabold text-white uppercase" />
            <EditableStatic
              k="offer_paragraph"
              value="Acelere o faturamento da sua empresa com as ferramentas e videoaulas comerciais de Antonio Geraldes."
              as="p"
              className="text-slate-400 text-sm max-w-md mx-auto"
            />
          </div>

          <div className="glass-gold p-8 md:p-12 rounded-2xl border border-gold-primary/20 max-w-lg mx-auto shadow-2xl relative">
            <EditableStatic
              k="offer_discount_badge"
              value="Grande Desconto"
              as="div"
              className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-red-500 text-white font-bold text-xs uppercase tracking-wider rounded-full"
            />
            
            <div className="text-slate-500 text-sm space-y-1 mb-6">
              <p><EditableStatic k="offer_course_label" value="Investimento no Curso:" as="span" /> <EditableStatic k="offer_course_price" value="R$ 1.280,00" as="span" className="line-through" /></p>
              <p><EditableStatic k="offer_bonus_label" value="Valor dos Bônus:" as="span" /> <EditableStatic k="offer_bonus_price" value="R$ 187,00" as="span" className="line-through" /></p>
              <p className="font-semibold text-slate-400"><EditableStatic k="offer_total_label" value="Total Original:" as="span" /> <EditableStatic k="offer_total_price" value="R$ 1.467,00" as="span" className="line-through" /></p>
            </div>

            <div className="space-y-2 mb-8">
              <EditableStatic k="offer_price_prefix" value="Por apenas" as="span" className="text-slate-400 text-xs uppercase tracking-widest font-bold" />
              <EditableStatic k="offer_installment_price" value="10x R$ 33,00" as="div" className="text-5xl font-display font-black text-white" />
              <EditableStatic k="offer_cash_price" value="ou com desconto à vista por R$ 297,00" as="p" className="text-gold-primary text-sm font-semibold" />
            </div>

            <a
              href="https://hotmart.com"
              target="_blank"
              rel="noreferrer"
              className="w-full inline-flex items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-wider text-primary-dark bg-gold-primary hover:bg-gold-light rounded-lg shadow-xl shadow-gold-primary/20 transition-all"
            >
              <EditableStatic k="offer_cta_label" value="Matricular-se no Curso CIA" as="span" />
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>

            <div className="flex items-center justify-center gap-2 mt-6 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-gold-primary" />
              <EditableStatic k="offer_checkout_safe" value="Checkout 100% Protegido" as="span" />
            </div>
          </div>

          {/* Guarantee stamp */}
          <div className="p-6 bg-white/5 rounded-xl border border-white/5 max-w-lg mx-auto flex items-start gap-4 text-left">
            <div className="w-12 h-12 rounded-full bg-gold-primary/10 text-gold-primary flex items-center justify-center flex-shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <EditableStatic k="guarantee_heading" value="Garantia Incondicional de 15 Dias" as="h4" className="text-white font-display font-bold text-sm uppercase" />
              <EditableStatic
                k="guarantee_paragraph"
                value="Fique 100% satisfeito ou solicite o reembolso. Damos 15 dias de prazo para você testar as aulas e ferramentas do comercial inteligente e ativo. Risco totalmente garantido pela Smart Company."
                as="p"
                className="text-xs text-slate-400 leading-relaxed"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section className="py-20 bg-secondary-dark/30 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <HelpCircle className="w-8 h-8 text-gold-primary mx-auto" />
            <EditableStatic
              k="faq_heading"
              value="Perguntas Frequentes do Comercial"
              as="h2"
              className="text-2xl sm:text-3xl font-display font-bold text-white uppercase tracking-wider"
            />
            <EditableStatic
              k="faq_paragraph"
              value="Dúvidas frequentes de compradores do treinamento CIA."
              as="p"
              className="text-slate-400 text-sm"
            />
          </div>

          <div className="space-y-4">
            {faqsList.map((faq: any, idx: number) => {
              const isOpen = activeFaq === idx
              return (
                <div key={faq.q} className="bg-white/5 rounded-xl border border-white/5 overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
                  >
                    <EditableText
                      as="span"
                      sectionKey="cursocia_faqs"
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
                      sectionKey="cursocia_faqs"
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
    </div>
    </StaticContent>
  )
}
