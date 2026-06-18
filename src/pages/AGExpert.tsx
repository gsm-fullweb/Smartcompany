import { useState } from 'react'
import { ArrowRight, ShieldCheck, Award, ChevronDown, HelpCircle } from 'lucide-react'
import { useDynamicContent } from '../hooks/useDynamicContent'
import SEO from '../components/SEO'
import EditableText from '../admin/inline/EditableText'
import { StaticContent } from '../admin/inline/StaticContent'
import EditableStatic from '../admin/inline/EditableStatic'

export default function AGExpert() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  const defaultHero = {
    badge: 'Auto Gestão Empresarial (10 a 500 colaboradores)',
    title: '+ LUCRO - INCÊNDIO com Plano de 22 dias',
    content: 'Sua empresa NÃO pode depender totalmente de você. Obtenha mais resultados, menos problemas operacionais, mais organização e tempo livre para a família.'
  }

  const defaultFaqs = [
    {
      q: 'Para quem é recomendado este programa?',
      a: 'É ideal para donos de empresas que faturam e têm acima de 5 colaboradores. Serve tanto para comércio, quanto para serviços e indústrias que buscam autonomia.'
    },
    {
      q: 'Como funciona o acesso?',
      a: 'O curso é 100% online via plataforma Hotmart (ambiente de alta segurança). Logo após a aprovação da compra, o link de acesso com vídeo-aulas e apostilas é enviado no seu e-mail.'
    },
    {
      q: 'Por quanto tempo tenho acesso ao curso?',
      a: 'O acesso é garantido por 1 ano completo. Você pode assistir às 45 video-aulas e fazer downloads das matrizes e planilhas quantas vezes quiser no seu ritmo.'
    },
    {
      q: 'E se eu tiver dúvidas durante a implementação?',
      a: 'Você poderá enviar e-mails diretamente para o nosso suporte técnico em suporte@smartcompany.com.br para tirar dúvidas sobre ferramentas.'
    }
  ]

  const defaultPainPoints = [
    'Não gera o lucro ideal esperado para o volume de esforço.',
    'Prende o Dono em rotinas operacionais (apagando incêndios diários).',
    'Falta de processos definidos e equipe com baixo comprometimento.',
    'Consome todo o seu tempo livre, gerando stress e desgaste familiar.',
    'Ausência de indicadores claros de performance por departamento.'
  ]

  const defaultModules = [
    {
      num: '1',
      title: 'Mindset e Alinhamento de Sócios',
      desc: 'Reformatação da mentalidade empresarial. Instalação do APP (Aplicativo Positivo e Produtivo) e resolução de conflitos de visão societária que barram o crescimento.'
    },
    {
      num: '2',
      title: 'Auto-Diagnóstico & 5 Pilares',
      desc: 'Avaliação profunda nas áreas de Estratégia, Financeiro, Comercial, Estrutura e Operações para obter o Termômetro Empresarial e laudo técnico orientativo.'
    },
    {
      num: '3',
      title: 'Como Mapear e Atingir Metas',
      desc: 'Aplicação da "Lei da Estratégia" e o "Mapa das Metas". Desdobramento de alvos numéricos e organizacionais para cada colaborador de forma pragmática.'
    },
    {
      num: '4',
      title: 'Equipes Capacitadas e Matriz P.O.T.E.',
      desc: 'Como contratar profissionais ideais usando testes de perfil comportamental e fit cultural. Aplicação da "Temperatura do CHA" (Conhecimento, Habilidade, Atitude).'
    },
    {
      num: '5',
      title: 'Planos de Ação Eficazes',
      desc: 'Uso de ferramentas exclusivas para tirar metas do papel, envolvendo a equipe para monitorar prazos e custos sem demandar supervisão exaustiva do Dono.'
    },
    {
      num: '6',
      title: 'Receita de Gestão Setorial',
      desc: 'Modelos de reuniões de acompanhamento focadas. Listagem dos principais KPIs por departamento para embasar tomadas de decisão baseadas em números reais.'
    }
  ]

  const defaultBonuses = [
    {
      title: 'BÔNUS 1: Missão, Visão e Valores na Prática',
      value: 'R$ 380,00',
      desc: 'Aprenda a definir e envolver a equipe de modo a injetar estes pilares diretamente na cultura da empresa (e não apenas em um quadro decorativo).'
    },
    {
      title: 'BÔNUS 2: Técnicas de Retenção de Conhecimento',
      value: 'R$ 330,00',
      desc: 'Métodos para consolidar o aprendizado dos gestores de forma contínua, permitindo que eles disseminem o conhecimento para o time abaixo deles.'
    },
    {
      title: 'BÔNUS 3: Mapa Mental do AG Expert',
      value: 'R$ 238,00',
      desc: 'Uma compilação gráfica e visual de toda a engrenagem do curso para que você consiga explanar a Auto Gestão de forma didática na sua empresa.'
    }
  ]

  const {
    hero,
    faqs: faqsList,
    painPoints,
    modules,
    bonuses
  } = useDynamicContent('agexpert', {
    hero: defaultHero,
    faqs: defaultFaqs,
    painPoints: defaultPainPoints,
    modules: defaultModules,
    bonuses: defaultBonuses
  })

  return (
    <StaticContent pageKey="agexpert">
    <div className="bg-primary-dark pt-24 min-h-screen text-slate-300 font-sans">
      <SEO 
        title="Auto Gestão Empresarial (AG Expert) | Treinamento para Sócios" 
        description="Aprenda o método de Auto Gestão Empresarial para montar um time autogerenciável e liberar o dono do operacional em 22 dias." 
      />
      {/* Hero Banner */}
      <section className="relative bg-[#001221] py-20 border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <EditableText
              as="span"
              sectionKey="agexpert_hero"
              path={['metadata', 'badge']}
              value={hero.badge}
              className="text-[10px] font-bold text-gold-primary uppercase tracking-widest bg-gold-primary/10 py-1.5 px-4 rounded-full border border-gold-primary/20 inline-block"
            />
            <EditableText
              as="h1"
              sectionKey="agexpert_hero"
              field="title"
              value={hero.title}
              className="text-4xl sm:text-5xl font-display font-black text-white tracking-tight leading-tight uppercase"
            />
            <EditableText
              as="p"
              sectionKey="agexpert_hero"
              field="content"
              value={hero.content}
              className="text-base sm:text-lg text-slate-300"
            />
          </div>
        </div>
      </section>

      {/* Target Points Checklist */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <EditableStatic
              k="target_heading"
              value="Prezado(a) Empresário(a), sua empresa passa por isso?"
              as="h2"
              className="text-2xl sm:text-3xl font-display font-bold text-white uppercase tracking-tight"
            />
            <div className="space-y-4">
              {painPoints.map((point: string, idx: number) => (
                <div key={point} className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0 border border-red-500/25">
                    <span className="font-bold text-xs">!</span>
                  </div>
                  <EditableText
                    as="p"
                    sectionKey="agexpert_painPoints"
                    path={['metadata', 'painPoints', idx]}
                    value={point}
                    className="text-sm sm:text-base text-slate-400 leading-relaxed"
                  />
                </div>
              ))}
            </div>
            <div className="p-4 bg-gold-primary/10 border border-gold-primary/20 rounded-xl">
              <EditableStatic
                k="target_callout"
                value="Certamente há algo errado no seu formato de gestão atual, e eu posso te ajudar a reverter este cenário agora mesmo!"
                as="p"
                className="text-sm font-semibold text-gold-primary"
              />
            </div>
          </div>
          
          {/* Video Preview */}
          <div className="space-y-4">
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/iqjN1Xpyfdo"
                title="Apresentação AG Expert"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <EditableStatic
              k="video_caption"
              value="Assista ao vídeo e veja como iniciar o plano de ação imediato."
              as="div"
              className="text-center text-xs text-slate-500"
            />
          </div>
        </div>
      </section>

      {/* Course deliverables */}
      <section className="py-20 bg-[#091120] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16">
            <EditableStatic k="deliverables_eyebrow" value="Conteúdo Programático" as="span" className="text-xs font-bold text-gold-primary uppercase tracking-widest" />
            <EditableStatic k="deliverables_heading" value="O que você vai aprender na prática" as="h2" className="text-3xl font-display font-bold text-white uppercase tracking-wider" />
            <EditableStatic
              k="deliverables_subtitle"
              value="45 videoaulas práticas acompanhadas de ferramentas de gestão para download imediato."
              as="p"
              className="text-slate-400 max-w-xl mx-auto text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((m: any, idx: number) => (
              <div key={m.num} className="glass p-6 rounded-xl border border-white/5 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-gold-primary text-primary-dark font-display font-black flex items-center justify-center">
                  {m.num}
                </div>
                <EditableText
                  as="h3"
                  sectionKey="agexpert_modules"
                  path={['metadata', 'modules', idx, 'title']}
                  value={m.title}
                  className="text-lg font-display font-bold text-white uppercase"
                />
                <EditableText
                  as="p"
                  sectionKey="agexpert_modules"
                  path={['metadata', 'modules', idx, 'desc']}
                  value={m.desc}
                  className="text-xs sm:text-sm text-slate-400 leading-relaxed"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bonuses Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <EditableStatic k="bonuses_eyebrow" value="Ação Imediata" as="span" className="text-xs font-bold text-gold-primary uppercase tracking-widest" />
          <EditableStatic k="bonuses_heading" value="Garantido: 3 Bônus Exclusivos" as="h2" className="text-3xl font-display font-bold text-white uppercase tracking-wider" />
          <EditableStatic
            k="bonuses_subtitle"
            value="Somando R$ 948,00 em conteúdos extras liberados gratuitamente após a inscrição."
            as="p"
            className="text-slate-400 max-w-xl mx-auto text-sm"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {bonuses.map((b: any, idx: number) => (
            <div key={b.title} className="glass p-8 rounded-xl border border-gold-primary/10 flex flex-col justify-between relative overflow-hidden">
              <EditableStatic
                k="bonus_badge_free"
                value="Grátis"
                as="div"
                className="absolute top-0 right-0 px-3 py-1 bg-gold-primary text-primary-dark font-bold text-[10px] uppercase rounded-bl-lg"
              />
              <div className="space-y-4">
                <EditableText
                  as="h3"
                  sectionKey="agexpert_bonuses"
                  path={['metadata', 'bonuses', idx, 'title']}
                  value={b.title}
                  className="text-lg font-display font-bold text-white pr-8"
                />
                <EditableText
                  as="p"
                  sectionKey="agexpert_bonuses"
                  path={['metadata', 'bonuses', idx, 'desc']}
                  value={b.desc}
                  className="text-xs text-slate-400 leading-relaxed"
                />
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-xs">
                <span className="text-slate-500"><EditableStatic k="bonus_value_label" value="Valor Original:" as="span" /> <EditableText
                  as="span"
                  sectionKey="agexpert_bonuses"
                  path={['metadata', 'bonuses', idx, 'value']}
                  value={b.value}
                  className="line-through"
                /></span>
                <EditableStatic k="bonus_value_free" value="R$ 0,00" as="span" className="text-gold-primary font-bold" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Checkout details / Offer */}
      <section className="py-20 bg-gradient-to-b from-[#091120] to-primary-dark border-t border-white/5 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-3">
            <EditableStatic k="offer_eyebrow" value="Investimento Promocional" as="span" className="text-xs font-bold text-gold-primary uppercase tracking-widest" />
            <EditableStatic k="offer_heading" value="Sua Inscrição no AG Expert" as="h2" className="text-3xl sm:text-4xl font-display font-extrabold text-white uppercase" />
            <EditableStatic
              k="offer_subtitle"
              value="Garanta acesso a todo o material de Auto Gestão, planilhas e pacotes de bônus por tempo limitado."
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
              <p><EditableStatic k="price_course_label" value="Investimento no Curso:" as="span" /> <span className="line-through"><EditableStatic k="price_course_value" value="R$ 4.780,00" as="span" /></span></p>
              <p><EditableStatic k="price_bonus_label" value="Valor dos Bônus:" as="span" /> <span className="line-through"><EditableStatic k="price_bonus_value" value="R$ 948,00" as="span" /></span></p>
              <p className="font-semibold text-slate-400"><EditableStatic k="price_total_label" value="Total Original:" as="span" /> <span className="line-through"><EditableStatic k="price_total_value" value="R$ 5.728,00" as="span" /></span></p>
            </div>

            <div className="space-y-2 mb-8">
              <EditableStatic k="price_callout" value="Por apenas" as="span" className="text-slate-400 text-xs uppercase tracking-widest font-bold" />
              <EditableStatic k="price_installment" value="10x R$ 257,00" as="div" className="text-5xl font-display font-black text-white" />
              <EditableStatic k="price_cash" value="ou com desconto à vista por R$ 2.150,00" as="p" className="text-gold-primary text-sm font-semibold" />
            </div>

            <a
              href="https://hotmart.com"
              target="_blank"
              rel="noreferrer"
              className="w-full inline-flex items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-wider text-primary-dark bg-gold-primary hover:bg-gold-light rounded-lg shadow-xl shadow-gold-primary/20 transition-all"
            >
              <EditableStatic k="checkout_button" value="Matricular-se via Hotmart" as="span" />
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>

            <div className="flex items-center justify-center gap-2 mt-6 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-gold-primary" />
              <EditableStatic k="checkout_secure" value="Checkout Seguro & Criptografado" as="span" />
            </div>
          </div>

          {/* Guarantee stamp */}
          <div className="p-6 bg-white/5 rounded-xl border border-white/5 max-w-lg mx-auto flex items-start gap-4 text-left">
            <div className="w-12 h-12 rounded-full bg-gold-primary/10 text-gold-primary flex items-center justify-center flex-shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <EditableStatic k="guarantee_heading" value="Garantia Incondicional de 14 Dias" as="h4" className="text-white font-display font-bold text-sm uppercase" />
              <EditableStatic
                k="guarantee_body"
                value="Fique 100% satisfeito ou peça seu dinheiro de volta. Você terá 14 dias para acessar o curso, baixar as matrizes e, se achar que o programa não serve para você, devolvemos 100% do valor investido sem questionamentos."
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
              value="Perguntas Frequentes do Curso"
              as="h2"
              className="text-2xl sm:text-3xl font-display font-bold text-white uppercase tracking-wider"
            />
            <EditableStatic
              k="faq_subtitle"
              value="Respostas rápidas sobre o funcionamento do treinamento online."
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
                      sectionKey="agexpert_faqs"
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
                      sectionKey="agexpert_faqs"
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
