import { MessageSquare, Quote, Award } from 'lucide-react'
import { useDynamicContent } from '../hooks/useDynamicContent'
import SEO from '../components/SEO'
import EditableText from '../admin/inline/EditableText'
import { StaticContent } from '../admin/inline/StaticContent'
import EditableStatic from '../admin/inline/EditableStatic'

export default function Depoimentos() {
  const defaultHero = {
    badge: 'Depoimentos & Casos',
    title: 'O que dizem os nossos clientes',
    content: 'Histórias reais de empresários e gestores que alcançaram a Auto Gestão e transformaram seus lucros.'
  }
  const defaultItems = [
    {
      text: "A Smart Company nos ajudou a desenhar um DRE e BUDGET fácil de analisar. Como resultado, nos permite acompanhar de fato a performance real da empresa, bem como planejar investimentos estruturados. Recomendo!",
      name: "Karina Dourado",
      role: "Gestora Financeira",
      company: "Metrobyte",
      initial: "K"
    },
    {
      text: "A equipe Smart Company está de parabéns. Eu agradeço por terem devolvido a minha motivação. A implantação de melhorias foi muito mais do que criar ferramentas e métodos de trabalho — me devolveram o prazer em trabalhar. Em cada reunião e treinamento eu me sentia segura e motivada. Hoje sei exatamente o que é cumprir uma agenda, tenho foco e ferramentas adequadas. Vale a pena passar por essa experiência.",
      name: "Aline Lima Rocha de Jesus",
      role: "Gestora Administrativa",
      company: "Grand House",
      initial: "A"
    },
    {
      text: "A SMART COMPANY melhorou nossa gestão de vendas e consequentemente os nossos resultados. Profissionais dedicados e altamente capacitados em entender os processos atuais e conduzir as mudanças necessárias de forma construtiva e sem desmotivar a equipe.",
      name: "Flávio F. Mattos",
      role: "Diretor Geral",
      company: "Multiplic Seguros",
      initial: "F"
    },
    {
      text: "A Smart Company mostrou-se absolutamente eficiente, apoiando e inovando nos procedimentos internos de nossa fábrica, tornando-a mais produtiva. Sempre estando presente quando se apresentava algum desafio, agilizando soluções e dando suporte.",
      name: "Maria de Lourdes Braga",
      role: "Diretora Financeira",
      company: "MRSUL",
      initial: "M"
    },
    {
      text: "Obtivemos uma visão mais clara dos problemas cotidianos da empresa e pudemos fazer as modificações necessárias para uma melhora nítida nos índices dos resultados financeiro e operacional.",
      name: "Jamil Marques Figueira",
      role: "Sócio-Diretor",
      company: "BAQ",
      initial: "J"
    },
    {
      text: "A iniciativa de contratar a Smart Company se mostrou acertadíssima. Mergulharam nos números da empresa, gerando um extenso e detalhado relatório. Sempre se mostraram solícitos e disponíveis durante todo o trabalho. Hoje posso dizer que conheço minha empresa muito melhor.",
      name: "Sergio Fonseca",
      role: "Diretor",
      company: "Franquia de Fast Food",
      initial: "S"
    },
    {
      text: "Contratamos a consultoria Smart Company através de indicação. Hoje somos gratos pelo alto nível dos trabalhos prestados nos campos de organização financeira, comercial, almoxarifado e toda a burocracia de acompanhamento da empresa. Esta é uma empresa que tenho o prazer de recomendar.",
      name: "Protasio Pivetta",
      role: "Diretor",
      company: "MRSUL",
      initial: "P"
    },
    {
      text: "Conseguimos perceber exatamente onde estavam as falhas e os gaps operacionais para nos estruturarmos melhor, aprimorando a comunicação interna, desenhando processos eficientes e crescendo de maneira saudável.",
      name: "Lívia Colucci",
      role: "Diretora Criativa",
      company: "White Hall",
      initial: "L"
    },
    {
      text: "A Smart Company agregou muito em nossa empresa, pois atuou em um momento crítico de transição e organização de informações. O suporte atencioso, comprometido e organizado nos deu a tranquilidade que precisávamos na gestão financeira.",
      name: "João Henrique Santo",
      role: "Diretor Executivo",
      company: "OCSSO",
      initial: "J"
    }
  ]

  const { hero, items } = useDynamicContent('depoimentos', { 
    hero: defaultHero, 
    items: defaultItems 
  })

  return (
    <StaticContent pageKey="depoimentos">
    <div className="bg-primary-dark pt-24 min-h-screen text-slate-300 font-sans">
      <SEO 
        title="Depoimentos de Sucesso e Casos Reais" 
        description="Veja os relatos de empresários e gestores que alcançaram resultados históricos em lucro e organização empresarial." 
      />
      {/* Header Banner */}
      <section className="relative bg-[#091120] py-20 border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <MessageSquare className="w-8 h-8 text-gold-primary mx-auto" />
          <EditableText
            as="h1"
            sectionKey="depoimentos_hero"
            field="title"
            value={hero.title}
            className="text-4xl sm:text-5xl font-display font-black text-white tracking-tight uppercase"
          />
          <EditableText
            as="p"
            sectionKey="depoimentos_hero"
            field="content"
            value={hero.content}
            className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed"
          />
        </div>
      </section>

      {/* Grid of Testimonials */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((t: any, idx: number) => (
            <div
              key={t.name}
              className="glass p-8 rounded-xl border border-white/5 flex flex-col justify-between relative hover:border-gold-primary/15 transition-all duration-300 group"
            >
              {/* Quote icon background */}
              <div className="absolute top-4 right-4 text-white/5 group-hover:text-gold-primary/5 transition-colors">
                <Quote className="w-12 h-12" />
              </div>

              <div className="space-y-4">
                <p className="text-sm leading-relaxed text-slate-400 font-medium italic relative z-10">
                  &ldquo;<EditableText
                    as="span"
                    sectionKey="depoimentos_items"
                    path={['metadata', 'items', idx, 'text']}
                    value={t.text}
                  />&rdquo;
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-3">
                {/* Avatar Initial circle */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-primary to-gold-dark flex items-center justify-center text-primary-dark font-display font-extrabold text-sm shadow shadow-gold-primary/10">
                  {t.initial || t.name.charAt(0)}
                </div>
                <div>
                  <EditableText
                    as="h4"
                    sectionKey="depoimentos_items"
                    path={['metadata', 'items', idx, 'name']}
                    value={t.name}
                    className="text-white font-display font-bold text-sm leading-none"
                  />
                  <p className="text-slate-500 text-xs mt-1.5 leading-none">
                    <EditableText
                      as="span"
                      sectionKey="depoimentos_items"
                      path={['metadata', 'items', idx, 'role']}
                      value={t.role}
                    /> &bull; <EditableText
                      as="span"
                      sectionKey="depoimentos_items"
                      path={['metadata', 'items', idx, 'company']}
                      value={t.company}
                      className="text-gold-primary font-semibold"
                    />
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Corporate trust badge bottom */}
      <section className="py-16 bg-[#091120] border-t border-white/5 text-center">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Award className="w-10 h-10 text-gold-primary mx-auto" />
          <EditableStatic
            k="trust_title"
            value="Compromisso com o Sucesso"
            as="h3"
            className="text-xl font-display font-bold text-white uppercase tracking-wider"
          />
          <EditableStatic
            k="trust_description"
            value="Mais de 100 empresas reestruturadas presencialmente. Nossos índices de satisfação refletem a qualidade das entregas e o esmero com os dados de cada cliente."
            as="p"
            className="text-sm text-slate-400 leading-relaxed"
          />
        </div>
      </section>
    </div>
    </StaticContent>
  )
}
