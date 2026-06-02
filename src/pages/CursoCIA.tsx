import { useState } from 'react'
import { Check, ArrowRight, ShieldCheck, Award, HelpCircle, ChevronDown, BookOpen } from 'lucide-react'

export default function CursoCIA() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  const targets = [
    'Como dobrar ou triplicar o volume de vendas do seu time.',
    'Como mapear e conquistar novos clientes qualificados.',
    'Vender com margem técnica e manter o lucro em cada pedido.',
    'Onde encontrar o seu cliente ideal (ICP) de forma ativa.',
    'Como organizar e gerenciar a rotina do setor comercial.',
    'Como desdobrar metas de forma justa e superá-las com recorrência.'
  ]

  const modules = [
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

  const bonuses = [
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

  const faqs = [
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

  return (
    <div className="bg-primary-dark pt-24 min-h-screen text-slate-300 font-sans">
      {/* Hero Banner */}
      <section className="relative bg-[#0b1528] py-20 border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-bold text-gold-primary uppercase tracking-widest bg-gold-primary/10 py-1.5 px-4 rounded-full border border-gold-primary/20 inline-block">
              Comercial Inteligente e Ativo
            </span>
            <h1 className="text-4xl sm:text-5xl font-display font-black text-white tracking-tight leading-tight uppercase">
              Alavanque as vendas estruturando seu <span className="text-gold-primary">Comercial</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300">
              Venda de forma inteligente e com margem real. Descubra como estruturar sua força de vendas de ponta a ponta e bater metas mesmo em mercados competitivos.
            </p>
          </div>
        </div>
      </section>

      {/* Target Points Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white uppercase tracking-tight">
              A Máquina de Vendas Comercial que sua Empresa Precisa
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Você sabe que, neste exato momento, há concorrentes faturando alto. Se você não estruturar o seu setor comercial de forma ativa, sua empresa ficará estagnada. O Curso CIA traz táticas simples, didáticas e aplicáveis.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {targets.map((t) => (
                <div key={t} className="flex items-start">
                  <Check className="w-5 h-5 text-gold-primary mr-2.5 mt-0.5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-300 leading-relaxed">{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-secondary-dark/60 border border-white/10 rounded-2xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gold-primary/10 flex items-center justify-center text-gold-primary">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-display font-bold text-white uppercase">Recursos do Curso</h3>
            </div>
            <ul className="space-y-4 text-xs sm:text-sm">
              <li className="flex items-start"><Check className="w-4 h-4 text-gold-primary mr-3 mt-1 flex-shrink-0" /> <span>11 video-aulas objetivas sem enrolação.</span></li>
              <li className="flex items-start"><Check className="w-4 h-4 text-gold-primary mr-3 mt-1 flex-shrink-0" /> <span>Matrizes em Excel para controle de pipeline comercial.</span></li>
              <li className="flex items-start"><Check className="w-4 h-4 text-gold-primary mr-3 mt-1 flex-shrink-0" /> <span>Apostila didática em PDF de suporte.</span></li>
              <li className="flex items-start"><Check className="w-4 h-4 text-gold-primary mr-3 mt-1 flex-shrink-0" /> <span>Certificado de Conclusão após conclusão do material.</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="py-20 bg-[#091120] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs font-bold text-gold-primary uppercase tracking-widest">Atributos do Programa</span>
            <h2 className="text-3xl font-display font-bold text-white uppercase tracking-wider">Estrutura de Ensino do CIA</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm">
              Dois grandes módulos para atuar na inteligência de planejamento e na atitude operacional de prospecção.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {modules.map((m) => (
              <div key={m.title} className="glass rounded-xl p-8 border border-white/5 space-y-6">
                <div>
                  <h3 className="text-xl font-display font-bold text-white uppercase tracking-wide border-b border-white/10 pb-3">{m.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-3 leading-relaxed">{m.desc}</p>
                </div>
                <div className="space-y-3">
                  {m.steps.map((step) => (
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
          <span className="text-xs font-bold text-gold-primary uppercase tracking-widest">Bônus Inclusos</span>
          <h2 className="text-3xl font-display font-bold text-white uppercase tracking-wider">Pacote de Bônus de Vendas</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm">
            São R$ 187,00 em bônus adicionais liberados imediatamente na Hotmart.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {bonuses.map((b) => (
            <div key={b.title} className="glass p-8 rounded-xl border border-gold-primary/10 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 px-3 py-1 bg-gold-primary text-primary-dark font-bold text-[10px] uppercase rounded-bl-lg">
                Grátis
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-display font-bold text-white pr-8">{b.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{b.desc}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-xs">
                <span className="text-slate-500">Valor Original: <span className="line-through">{b.value}</span></span>
                <span className="text-gold-primary font-bold">R$ 0,00</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Offer */}
      <section className="py-20 bg-gradient-to-b from-[#091120] to-primary-dark border-t border-white/5 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-bold text-gold-primary uppercase tracking-widest">Investimento Promocional</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white uppercase">Garanta Seu Acesso ao CIA</h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              Acelere o faturamento da sua empresa com as ferramentas e videoaulas comerciais de Antonio Geraldes.
            </p>
          </div>

          <div className="glass-gold p-8 md:p-12 rounded-2xl border border-gold-primary/20 max-w-lg mx-auto shadow-2xl relative">
            <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-red-500 text-white font-bold text-xs uppercase tracking-wider rounded-full">
              Grande Desconto
            </div>
            
            <div className="text-slate-500 text-sm space-y-1 mb-6">
              <p>Investimento no Curso: <span className="line-through">R$ 1.280,00</span></p>
              <p>Valor dos Bônus: <span className="line-through">R$ 187,00</span></p>
              <p className="font-semibold text-slate-400">Total Original: <span className="line-through">R$ 1.467,00</span></p>
            </div>

            <div className="space-y-2 mb-8">
              <span className="text-slate-400 text-xs uppercase tracking-widest font-bold">Por apenas</span>
              <div className="text-5xl font-display font-black text-white">10x R$ 33,00</div>
              <p className="text-gold-primary text-sm font-semibold">ou com desconto à vista por R$ 297,00</p>
            </div>

            <a
              href="https://hotmart.com"
              target="_blank"
              rel="noreferrer"
              className="w-full inline-flex items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-wider text-primary-dark bg-gold-primary hover:bg-gold-light rounded-lg shadow-xl shadow-gold-primary/20 transition-all"
            >
              <span>Matricular-se no Curso CIA</span>
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>

            <div className="flex items-center justify-center gap-2 mt-6 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-gold-primary" />
              <span>Checkout 100% Protegido</span>
            </div>
          </div>

          {/* Guarantee stamp */}
          <div className="p-6 bg-white/5 rounded-xl border border-white/5 max-w-lg mx-auto flex items-start gap-4 text-left">
            <div className="w-12 h-12 rounded-full bg-gold-primary/10 text-gold-primary flex items-center justify-center flex-shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-white font-display font-bold text-sm uppercase">Garantia Incondicional de 15 Dias</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Fique 100% satisfeito ou solicite o reembolso. Damos 15 dias de prazo para você testar as aulas e ferramentas do comercial inteligente e ativo. Risco totalmente garantido pela Smart Company.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section className="py-20 bg-secondary-dark/30 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <HelpCircle className="w-8 h-8 text-gold-primary mx-auto" />
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white uppercase tracking-wider">
              Perguntas Frequentes do Comercial
            </h2>
            <p className="text-slate-400 text-sm">
              Dúvidas frequentes de compradores do treinamento CIA.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx
              return (
                <div key={faq.q} className="bg-white/5 rounded-xl border border-white/5 overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="font-display font-bold text-white text-sm sm:text-base">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-gold-primary transition-transform duration-350 ${isOpen ? 'transform rotate-180' : ''}`} />
                  </button>
                  <div
                    className={`transition-all duration-300 ${
                      isOpen ? 'max-h-48 border-t border-white/5 p-6' : 'max-h-0'
                    } overflow-hidden`}
                  >
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-400">{faq.a}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
