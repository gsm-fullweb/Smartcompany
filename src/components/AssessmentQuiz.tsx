import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ArrowRight, ArrowLeft, RefreshCw, BarChart2, ShieldAlert, Award, FileText } from 'lucide-react'

interface Question {
  id: number
  pillar: string
  pillarLabel: 'Estratégia' | 'Financeiro' | 'Comercial' | 'Estrutura' | 'Operações'
  text: string
  options: {
    label: string
    score: number
  }[]
}

const questions: Question[] = [
  {
    id: 1,
    pillar: 'estrategia',
    pillarLabel: 'Estratégia',
    text: 'Como são definidas e acompanhadas as metas de crescimento da sua empresa?',
    options: [
      { label: 'Não temos metas claras ou o planejamento fica apenas na cabeça do dono.', score: 1 },
      { label: 'Temos metas básicas de faturamento, mas o time não sabe como atingi-las.', score: 2 },
      { label: 'Temos metas definidas e divididas, mas o acompanhamento é irregular.', score: 3 },
      { label: 'Temos metas claras desdobradas por setores, com planos de ação e acompanhamento diário/semanal.', score: 4 },
    ]
  },
  {
    id: 2,
    pillar: 'estrategia',
    pillarLabel: 'Estratégia',
    text: 'Sua empresa possui um posicionamento estratégico e diferencial competitivo claro no mercado?',
    options: [
      { label: 'Competimos por preço e não sabemos qual nosso diferencial real.', score: 1 },
      { label: 'Temos uma ideia de diferencial, mas a equipe de vendas não sabe usá-lo na abordagem.', score: 2 },
      { label: 'Nosso posicionamento é bom, mas o mercado nos enxerga de forma genérica.', score: 3 },
      { label: 'Temos diferencial consolidado, canais de vendas validados e público-alvo mapeado.', score: 4 },
    ]
  },
  {
    id: 3,
    pillar: 'financeiro',
    pillarLabel: 'Financeiro',
    text: 'Como é feita a apuração de lucros, formação de preços e gestão de fluxo de caixa?',
    options: [
      { label: 'Não temos controle de caixa e misturamos contas pessoais com as da empresa.', score: 1 },
      { label: 'Controlamos entradas/saídas básicas, mas não temos DRE ou formação de preço técnica.', score: 2 },
      { label: 'Temos relatórios financeiros, mas não sabemos analisar margens ou centro de custos.', score: 3 },
      { label: 'Temos DRE consolidado, formação de preço baseada em mark-up/mark-down e KPIs de lucratividade ativos.', score: 4 },
    ]
  },
  {
    id: 4,
    pillar: 'financeiro',
    pillarLabel: 'Financeiro',
    text: 'Você sabe exatamente a diferença entre Lucro da empresa e o Saldo de Caixa no final do mês?',
    options: [
      { label: 'Não, se tem saldo na conta achamos que a empresa lucrou.', score: 1 },
      { label: 'Entendemos o conceito, mas não conseguimos separar isso de forma clara nos demonstrativos.', score: 2 },
      { label: 'Conseguimos analisar, mas o estoque desregulado ou inadimplência sempre distorcem os dados.', score: 3 },
      { label: 'Sim, o controle é total e sabemos como gerir a liquidez e capital de giro sem estressar o caixa.', score: 4 },
    ]
  },
  {
    id: 5,
    pillar: 'comercial',
    pillarLabel: 'Comercial',
    text: 'Qual é o nível de estruturação e proatividade do seu setor comercial?',
    options: [
      { label: 'Não temos setor de vendas ativo, dependemos de indicações ou clientes que vêm por conta própria.', score: 1 },
      { label: 'Temos vendedores, mas eles não seguem um processo e vendem no "feeling".', score: 2 },
      { label: 'Temos processo de vendas, mas falta de acompanhamento ativo e política comercial consistente.', score: 3 },
      { label: 'Temos comercial estruturado, funil de prospecção mapeado, scripts de vendas e metas claras batidas com recorrência.', score: 4 },
    ]
  },
  {
    id: 6,
    pillar: 'comercial',
    pillarLabel: 'Comercial',
    text: 'Como sua empresa acompanha as propostas enviadas e gerencia o funil de negócios?',
    options: [
      { label: 'Não temos funil, mandamos a proposta e esperamos o cliente responder.', score: 1 },
      { label: 'O controle é em anotações soltas e perdemos propostas por falta de follow-up.', score: 2 },
      { label: 'Usamos um CRM ou planilha, mas os vendedores não alimentam os dados corretamente.', score: 3 },
      { label: 'Controlamos cada etapa do funil e fazemos reuniões semanais de fechamento focadas em conversão.', score: 4 },
    ]
  },
  {
    id: 7,
    pillar: 'estrutura',
    pillarLabel: 'Estrutura',
    text: 'A operação da empresa depende diretamente da sua presença física ou tomada de decisão diária?',
    options: [
      { label: 'Totalmente. Se eu não estiver no negócio por 2 dias, a empresa para ou ocorrem erros graves.', score: 1 },
      { label: 'Consigo me ausentar brevemente, mas sou acionado constantemente para resolver problemas e apagar incêndios.', score: 2 },
      { label: 'O operacional roda sem mim, mas os gerentes ainda hesitam em tomar decisões estratégicas.', score: 3 },
      { label: 'A empresa é autogerenciável. Tenho líderes treinados que entregam metas sem a minha supervisão direta.', score: 4 },
    ]
  },
  {
    id: 8,
    pillar: 'estrutura',
    pillarLabel: 'Estrutura',
    text: 'Como você avalia o treinamento, capacitação e nível de engajamento do seu time?',
    options: [
      { label: 'Pessoas descomprometidas e alta rotatividade. Sentimento de estar sozinho na batalha.', score: 1 },
      { label: 'Contratamos no desespero e não fazemos avaliação de soft/hard skills ou fit cultural.', score: 2 },
      { label: 'Treinamos a equipe, mas falta meritocracia ou plano de acompanhamento de performance.', score: 3 },
      { label: 'Temos um time de alta performance, processos de feedback constantes e fit cultural alinhado.', score: 4 },
    ]
  },
  {
    id: 9,
    pillar: 'operacoes',
    pillarLabel: 'Operações',
    text: 'Como são organizados os fluxos de trabalho e processos internos da sua empresa?',
    options: [
      { label: 'Caos operacional. Gargalos frequentes, retrabalhos constantes e desperdício de tempo.', score: 1 },
      { label: 'Temos rotinas, mas nada está formalizado ou desenhado. Tudo é transmitido "boca a boca".', score: 2 },
      { label: 'Temos processos documentados, mas a equipe não os segue com disciplina e os gargalos continuam.', score: 3 },
      { label: 'Processos e fluxogramas bem definidos, monitorados e otimizados constantemente.', score: 4 },
    ]
  },
  {
    id: 10,
    pillar: 'operacoes',
    pillarLabel: 'Operações',
    text: 'Sua empresa utiliza métodos estruturados (como o ciclo PDCA ou 5S) para identificar e resolver falhas de processo?',
    options: [
      { label: 'Não sabemos o que são essas metodologias ou focamos apenas em remediar o problema atual.', score: 1 },
      { label: 'Temos boas intenções de melhoria, mas sem reuniões estruturadas ou planos de ação práticos.', score: 2 },
      { label: 'Iniciamos ações de melhoria de tempos em tempos, mas elas se perdem pela falta de acompanhamento.', score: 3 },
      { label: 'Utilizamos o PDCA e Kaizen de forma enraizada na cultura, identificando desvios e agindo preventivamente.', score: 4 },
    ]
  }
]

export default function AssessmentQuiz() {
  const [started, setStarted] = useState(false)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)
  
  // Lead form states
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [leadSubmitted, setLeadSubmitted] = useState(false)

  const handleAnswerSelect = (score: number) => {
    setAnswers({ ...answers, [questions[currentIdx].id]: score })
    if (currentIdx < questions.length - 1) {
      setTimeout(() => {
        setCurrentIdx(currentIdx + 1)
      }, 200)
    } else {
      setSubmitted(true)
    }
  }

  const handlePrevious = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1)
    }
  }

  const handleReset = () => {
    setAnswers({})
    setCurrentIdx(0)
    setSubmitted(false)
    setStarted(false)
    setLeadSubmitted(false)
  }

  const calculatePillarScore = (pillarName: string) => {
    const pillarQs = questions.filter(q => q.pillar === pillarName)
    const totalMax = pillarQs.length * 4
    let currentTotal = 0
    pillarQs.forEach(q => {
      currentTotal += answers[q.id] || 1
    })
    return Math.round((currentTotal / totalMax) * 100)
  }

  const getPillarStatus = (score: number) => {
    if (score < 45) return { text: 'Crítico', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' }
    if (score < 75) return { text: 'Instável / Alerta', color: 'text-gold-primary', bg: 'bg-gold-primary/10', border: 'border-gold-primary/20' }
    return { text: 'Excelente / Escalável', color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20' }
  }

  const getPillarFeedback = (pillar: string, score: number) => {
    if (score < 45) {
      switch (pillar) {
        case 'estrategia': return 'Falta direcionamento. Sem objetivos definidos, a empresa roda à deriva. É preciso desenhar um Plano de Negócios e alinhar os sócios imediatamente.'
        case 'financeiro': return 'Falta controle básico. Margens mal calculadas e confusão de caixas sangram a empresa. Necessário implantar DRE e precificação correta.'
        case 'comercial': return 'Comercial inativo. Dependência excessiva de captação passiva. Precisa estruturar canais ativos e treinar a equipe em scripts persuasivos.'
        case 'estrutura': return 'Dono prisioneiro do operacional. Alta dependência da liderança gera cansaço extremo e impede crescimento. Foco em delegação e processos.'
        case 'operacoes': return 'Desperdício e retrabalho. Operação caótica impede a entrega padronizada. Urgente mapear processos e aplicar a disciplina do PDCA.'
        default: return ''
      }
    } else if (score < 75) {
      switch (pillar) {
        case 'estrategia': return 'Planejamento existe, mas falta disciplina para desdobrar metas por setor. Trabalhe a Lei da Estratégia para garantir engajamento do time.'
        case 'financeiro': return 'Controles existem, mas falta sintonia. O fluxo de caixa é vulnerável à sazonalidade e o payback de novos projetos não é calculado de forma exata.'
        case 'comercial': return 'Equipe vende, mas os picos e vales de faturamento geram instabilidade. Necessário estruturar reuniões semanais de pipeline.'
        case 'estrutura': return 'Organizado, mas o Dono ainda atua como bombeiro na solução de crises. Crie uma matriz P.O.T.E. para dar autonomia real aos gestores.'
        case 'operacoes': return 'Processos existem, mas o engajamento é baixo. O Kaizen e ferramentas de qualidade devem ser incorporados à rotina com firmeza.'
        default: return ''
      }
    } else {
      switch (pillar) {
        case 'estrategia': return 'Excelente! A cultura de metas e diretriz estratégica está consolidada. Continue inovando na linha de produtos/serviços.'
        case 'financeiro': return 'Financeiro maduro e voltado a resultados. A análise de liquidez e reinvestimento está garantida para a escalabilidade.'
        case 'comercial': return 'Máquina comercial funcionando! Continue otimizando a comissão e buscando canais adicionais de atração.'
        case 'estrutura': return 'Time autogerenciável e Dono focado na estratégia. Pronto para franquear, expandir filiais ou preparar para fusão (M&A).'
        case 'operacoes': return 'Eficiência operacional alta. Seus processos seguem a melhoria contínua de forma rigorosa.'
        default: return ''
      }
    }
  }

  // Calculate scores
  const scoreEstrategia = calculatePillarScore('estrategia')
  const scoreFinanceiro = calculatePillarScore('financeiro')
  const scoreComercial = calculatePillarScore('comercial')
  const scoreEstrutura = calculatePillarScore('estrutura')
  const scoreOperacoes = calculatePillarScore('operacoes')
  
  const overallScore = Math.round(
    (scoreEstrategia + scoreFinanceiro + scoreComercial + scoreEstrutura + scoreOperacoes) / 5
  )

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLeadSubmitted(true)
  }

  const currentQ = questions[currentIdx]
  const progressPercent = Math.round((currentIdx / questions.length) * 100)

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      {!started && !submitted && (
        <div className="glass-gold rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-primary/5 rounded-full blur-3xl -z-10"></div>
          
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-gold-primary/10 text-gold-primary mb-6 animate-pulse">
            <BarChart2 className="w-8 h-8" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white mb-4">
            Termômetro de Auto Gestão Empresarial
          </h2>
          
          <p className="text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Descubra o estado real da gestão do seu negócio em menos de 3 minutos. Avalie os 5 Pilares de crescimento e receba um laudo orientativo exclusivo com o seu termômetro.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8 text-left">
            {['Estratégia', 'Financeiro', 'Comercial', 'Estrutura', 'Operações'].map((p, i) => (
              <div key={p} className="p-3 bg-secondary-dark/60 rounded-lg border border-white/5 flex flex-col justify-between">
                <span className="text-[10px] text-gold-primary font-bold uppercase tracking-wider">Pilar 0{i+1}</span>
                <span className="text-sm font-semibold text-white mt-1">{p}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setStarted(true)}
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-wider text-primary-dark bg-gold-primary hover:bg-gold-light rounded-lg shadow-xl shadow-gold-primary/20 transition-all duration-200"
          >
            <span>Iniciar Auto Diagnóstico Gratuito</span>
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>

          <p className="text-slate-500 text-xs mt-4">
            *Não coletamos dados sigilosos da sua conta bancária ou faturamento real.
          </p>
        </div>
      )}

      {started && !submitted && (
        <div className="glass rounded-2xl border border-white/10 p-6 md:p-8 relative">
          {/* Progress bar */}
          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mb-8">
            <div
              className="bg-gold-primary h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          {/* Question Header */}
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 bg-gold-primary/10 text-gold-primary rounded-full text-xs font-bold uppercase tracking-wider">
              Pilar: {currentQ.pillarLabel}
            </span>
            <span className="text-xs text-slate-400 font-semibold">
              Pergunta {currentIdx + 1} de {questions.length}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-xl md:text-2xl font-display font-bold text-white leading-snug">
                {currentQ.text}
              </h3>

              <div className="space-y-3">
                {currentQ.options.map((opt) => {
                  const isSelected = answers[currentQ.id] === opt.score
                  return (
                    <button
                      key={opt.label}
                      onClick={() => handleAnswerSelect(opt.score)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 group ${
                        isSelected
                          ? 'bg-gold-primary/10 border-gold-primary text-white'
                          : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10 hover:border-white/10'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        isSelected ? 'border-gold-primary bg-gold-primary text-primary-dark' : 'border-slate-500'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className="text-sm md:text-base leading-relaxed">{opt.label}</span>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation footer */}
          <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentIdx === 0}
              className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ArrowLeft className="mr-1.5 w-4 h-4" />
              <span>Voltar</span>
            </button>
            <span className="text-xs text-slate-500">Auto Diagnóstico Smart Company</span>
          </div>
        </div>
      )}

      {submitted && (
        <div className="space-y-8">
          {/* Result Summary Block */}
          <div className="glass rounded-2xl border border-white/10 p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-gold-primary to-green-500"></div>
            
            <h2 className="text-2xl md:text-3xl font-display font-extrabold text-white mb-2">
              Seu Diagnóstico Está Pronto!
            </h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Abaixo você confere o índice de eficiência de cada Pilar analisado e o seu laudo técnico.
            </p>

            {/* General Thermometer */}
            <div className="max-w-xs mx-auto mb-10 relative flex flex-col items-center justify-center">
              {/* Thermometer Gauge Graphic */}
              <div className="w-48 h-48 relative flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="80"
                    className="stroke-slate-800"
                    strokeWidth="12"
                    fill="transparent"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="80"
                    className="stroke-gold-primary transition-all duration-1000"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 80}
                    strokeDashoffset={2 * Math.PI * 80 * (1 - overallScore / 100)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-4xl font-display font-black text-white">{overallScore}%</span>
                  <span className="text-[10px] uppercase tracking-widest text-gold-primary font-bold mt-1">Eficiência Geral</span>
                </div>
              </div>
              <div className="mt-4">
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                  overallScore < 45 ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 
                  overallScore < 75 ? 'bg-gold-primary/10 text-gold-primary border border-gold-primary/20' : 
                  'bg-green-500/10 text-green-500 border border-green-500/20'
                }`}>
                  Status: {overallScore < 45 ? 'Crítico (Precisa de Gestão)' : overallScore < 75 ? 'Alerta / Estabilização' : 'Excelente (Pronto para Escalar)'}
                </span>
              </div>
            </div>

            {/* 5 Reloginhos (Gauges) Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8 pt-4">
              {[
                { label: 'Estratégia', score: scoreEstrategia, pName: 'estrategia' },
                { label: 'Finanças', score: scoreFinanceiro, pName: 'financeiro' },
                { label: 'Comercial', score: scoreComercial, pName: 'comercial' },
                { label: 'Estrutura', score: scoreEstrutura, pName: 'estrutura' },
                { label: 'Operações', score: scoreOperacoes, pName: 'operacoes' }
              ].map((p) => {
                const status = getPillarStatus(p.score)
                return (
                  <div key={p.label} className="p-4 bg-white/5 rounded-xl border border-white/5 flex flex-col items-center">
                    <span className="text-xs text-slate-400 font-bold mb-3">{p.label}</span>
                    
                    {/* Tiny gauge */}
                    <div className="w-20 h-20 relative flex items-center justify-center mb-2">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="40" cy="40" r="32" className="stroke-slate-800" strokeWidth="6" fill="transparent" />
                        <circle
                          cx="40"
                          cy="40"
                          r="32"
                          className={`${
                            p.score < 45 ? 'stroke-red-500' : p.score < 75 ? 'stroke-gold-primary' : 'stroke-green-500'
                          }`}
                          strokeWidth="6"
                          fill="transparent"
                          strokeDasharray={2 * Math.PI * 32}
                          strokeDashoffset={2 * Math.PI * 32 * (1 - p.score / 100)}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute text-sm font-display font-bold text-white">{p.score}%</span>
                    </div>

                    <span className={`text-[10px] font-extrabold uppercase tracking-wide ${status.color}`}>
                      {status.text}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Detailed Diagnosis Feedbacks */}
          <div className="glass rounded-2xl border border-white/10 p-6 md:p-8 space-y-6">
            <h3 className="text-xl font-display font-bold text-white flex items-center gap-2 border-b border-white/10 pb-4">
              <FileText className="w-5 h-5 text-gold-primary" />
              <span>Laudo Orientativo Detalhado</span>
            </h3>

            <div className="space-y-4">
              {[
                { label: 'Pilar 1: Estratégia', score: scoreEstrategia, pName: 'estrategia' },
                { label: 'Pilar 2: Gestão Financeira', score: scoreFinanceiro, pName: 'financeiro' },
                { label: 'Pilar 3: Setor Comercial', score: scoreComercial, pName: 'comercial' },
                { label: 'Pilar 4: Estrutura & Pessoas', score: scoreEstrutura, pName: 'estrutura' },
                { label: 'Pilar 5: Gestão Operacional', score: scoreOperacoes, pName: 'operacoes' }
              ].map((item) => {
                const status = getPillarStatus(item.score)
                const feedback = getPillarFeedback(item.pName, item.score)
                return (
                  <div key={item.label} className={`p-4 rounded-xl border ${status.bg} ${status.border} flex flex-col md:flex-row gap-4 justify-between items-start`}>
                    <div className="space-y-1 max-w-xl">
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-white text-sm md:text-base">{item.label}</span>
                        <span className={`text-xs font-bold uppercase ${status.color}`}>({item.score}%)</span>
                      </div>
                      <p className="text-xs md:text-sm text-slate-300 leading-relaxed pt-1">{feedback}</p>
                    </div>
                    {item.score < 75 && (
                      <div className="flex-shrink-0 flex items-center gap-1.5 text-xs text-gold-primary font-bold uppercase tracking-wider bg-gold-primary/10 py-1 px-3.5 rounded-full border border-gold-primary/20">
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>Foco Recomendado</span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Overall recommendation action plan */}
            <div className="p-5 bg-gradient-to-br from-gold-primary/10 to-transparent rounded-xl border border-gold-primary/20 mt-8 text-center sm:text-left flex flex-col sm:flex-row items-center gap-4 justify-between">
              <div className="space-y-1">
                <h4 className="text-white font-bold text-base flex items-center justify-center sm:justify-start gap-1.5">
                  <Award className="w-5 h-5 text-gold-primary" />
                  <span>Quer reverter os pontos críticos em faturamento e organização?</span>
                </h4>
                <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                  Agende uma devolutiva de 15 minutos com um dos nossos consultores para desenhar o plano de ação ideal ou conheça o treinamento AG Expert dedicado a donos de empresas.
                </p>
              </div>
              <button
                onClick={() => {
                  const ctaSec = document.getElementById('diagnostico-leads')
                  if (ctaSec) {
                    ctaSec.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="flex-shrink-0 inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-primary-dark bg-gold-primary hover:bg-gold-light rounded-lg transition-all"
              >
                <span>Falar com Consultor</span>
                <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Lead Capture Form Section */}
          <div id="diagnostico-leads" className="glass rounded-2xl border border-white/10 p-8 text-center relative overflow-hidden">
            {!leadSubmitted ? (
              <form onSubmit={handleLeadSubmit} className="max-w-md mx-auto space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-display font-bold text-white">Receba este Laudo por Email</h3>
                  <p className="text-xs text-slate-400">
                    Insira seus dados abaixo para salvar o resultado do seu diagnóstico e agendar uma ligação de cortesia com o nosso time técnico.
                  </p>
                </div>

                <div className="space-y-3 text-left">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1" htmlFor="company">
                      Nome da Sua Empresa
                    </label>
                    <input
                      id="company"
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Ex: Smart Company"
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white text-sm focus:outline-none focus:border-gold-primary transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1" htmlFor="email">
                        Seu Melhor Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="contato@empresa.com"
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white text-sm focus:outline-none focus:border-gold-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1" htmlFor="phone">
                        Celular / WhatsApp
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(11) 99999-9999"
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-white text-sm focus:outline-none focus:border-gold-primary transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary-dark bg-gold-primary hover:bg-gold-light rounded-lg shadow-lg transition-colors"
                >
                  <span>Enviar Laudo & Agendar Contato</span>
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="max-w-md mx-auto space-y-4 py-6">
                <div className="inline-flex items-center justify-center p-3 rounded-full bg-green-500/10 text-green-500 mb-2">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h3 className="text-xl font-display font-bold text-white">Dados Enviados com Sucesso!</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  O laudo técnico foi enviado para <strong>{email}</strong>. Nas próximas horas, um especialista em gestão comercial e financeira da Smart Company entrará em contato com você via WhatsApp <strong>{phone}</strong> para alinhar a cortesia de 15 minutos.
                </p>
                <div className="pt-4 flex items-center justify-center gap-4">
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Fazer Novo Diagnóstico</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
