import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Target, TrendingUp, DollarSign, Award, ChevronRight, Check, Flame, BookOpen, Newspaper, Zap } from 'lucide-react'
import AssessmentQuiz from '../components/AssessmentQuiz'
import { blogPosts } from '../data/posts'
import { useDynamicContent } from '../hooks/useDynamicContent'
import SEO from '../components/SEO'
import EditableText from '../admin/inline/EditableText'
import EditableImage from '../admin/inline/EditableImage'
import EditableStaticImage from '../admin/inline/EditableStaticImage'
import EditableParagraphs from '../admin/inline/EditableParagraphs'
import { StaticContent } from '../admin/inline/StaticContent'
import EditableStatic from '../admin/inline/EditableStatic'

export default function Home() {
  const defaultJourneys = [
    {
      title: 'DIAGNÓSTICO COMPLETO + IMPLANTAÇÕES',
      desc: 'Análise aprofundada dos 5 pilares do seu negócio seguido de cronograma macro taylor-made para reestruturação financeira e comercial.',
      link: '/como-transformamos-empresas',
      tag: 'Consultoria'
    },
    {
      title: 'PLANOS DE NEGÓCIOS | PRÉ-FRANQUIAS',
      desc: 'Estruturação completa do modelo de negócios para expansão, replicabilidade e preparação para franquias com análise de viabilidade.',
      link: '/como-transformamos-empresas',
      tag: 'Expansão'
    },
    {
      title: 'VALUATION & COMPRA E VENDA DE EMPRESAS',
      desc: 'Avaliação técnica e confidencial para fusões, aquisições, compra e venda de empresas com filtros rigorosos para qualificar investidores.',
      link: '/valuation-avaliacao-compra-e-venda-de-empresas',
      tag: 'Fusões & Aquisições'
    },
    {
      title: 'FORMAÇÃO DE SÓCIOS, SUCESSORES E GESTORES',
      desc: 'Formação para donos de empresas com método de 22 dias para alcançar a Auto Gestão, liberar o dono do operacional e montar equipe autogerenciável.',
      link: '/auto-gestao-empresarial-para-donos-de-empresas',
      tag: 'Formação Online'
    }
  ]

  const defaultPillars = [
    {
      title: 'Comercial',
      desc: 'A implantação de Área Comercial completa e “ativa” com a criação de Política Comercial, campanha de incentivos, recrutamento, seleção e treinamento de canais de vendas potencializa os resultados de vendas. Além disso, certamente, essa estratégia contribui para o crescimento e a eficiência do negócio.'
    },
    {
      title: 'Financeiro',
      desc: 'Reengenharia financeira visa através de ferramentas para redução de custo e gestão. Assim, inclui a elaboração de DRE, composição de custo e formação do preço de venda, bem como análise dos centros de custo. Por conseguinte, busca-se a criação de KPIs financeiros com foco em rentabilidade.'
    },
    {
      title: 'Industrial / Operacional',
      desc: 'Portanto, é essencial realizar o mapeamento dos processos e elaborar fluxogramas. Como resultado, podemos identificar gargalos e perdas. Assim, consequentemente, podemos implantar controles por etapas da produção. Ou seja, mesmo em empresas onde não há fabricação direta, existe um setor produtivo onde as operações ocorrem. Esclarecer que esses procedimentos podem ser aprimorados através do método PDCA é fundamental.'
    }
  ]

  const defaultReasons = [
    {
      title: 'Aumentamos as Vendas',
      desc: 'Nosso formato de Gestão Comercial, já testado e comprovado em diversos segmentos, garante aumentar as vendas da sua empresa. Portanto, com Gestão Diária, semanal e mensal, contribuindo para o atingimento das Metas. Assim, você terá resultados positivos.'
    },
    {
      title: 'Geramos Caixa',
      desc: 'Usamos um conjunto de ferramentas para melhorar seu caixa; consequentemente, através da Gestão do estoque, Redução de custo, Alavancagem de vendas e Controle de despesas. Sobrar dinheiro na sua empresa é sempre um desafio que gostamos de enfrentar.'
    },
    {
      title: 'Empresa Lucrativa com Gestão de forma simples e prática',
      desc: 'Nosso atendimento personalizado, portanto, com as melhores práticas de gestão, torna sua rotina mais fácil e permite que você entenda os dados da sua empresa para tomar decisões assertivas e lucrar mais!'
    }
  ]

  const defaultHero = {
    badge: 'Liderança, Lucratividade e Autonomia',
    title: 'TRANSFORME JÁ SEU LUCRO, VENDAS, PRODUTIVIDADE E EQUIPE.',
    content: 'Consultoria e gestão personalizadas, gerando resultados excepcionais para Empresários e Gestores que buscam crescimento sólido e liberdade de tempo.'
  }

  const defaultAutoGestaoChecklist = [
    'Ter segurança financeira',
    'Montar um time Capacitado e Motivado',
    'Diminuir o stress e ter mais tranquilidade',
    'Aumentar seu Pro-labore sem sangrar o caixa',
    'Concretizar seus sonhos',
    'Impulsionar a empresa ao crescimento',
    'Liderar com inteligência'
  ]

  const defaultMentor = {
    name: 'Antonio Geraldes',
    bio: 'Empresário há mais de 30 anos, investidor e mentor empresarial. Entre as empresas que fundei, está a Smart Company – Estratégia, Gestão e Resultados e criei o AG Expert – Auto Gestão Empresarial; C.I.A.: Comercial Inteligente e Ativo e outros Programas para Gestão. Portanto, prestei Consultoria presencialmente em mais de 100 empresas sempre motivado por gerar resultados positivos. Como resultado, realizei Diagnósticos, Planos de Ação e deixei um legado de equipes extraordinárias, contribuindo para o sucesso destas empresas.\n\nO resultado da nossa metodologia é um formato de Gestão onde o Dono e os Gestores podem focar na Estratégia e no Crescimento do Negócio.',
    title: 'Consultoria e gestão - Smart Company - Antonio Geraldes Gestor',
    imageUrl: '/assets/Ola-sou-Antonio-Geraldes-copia-scaled.jpg',
    heading: '30 Anos de Experiência e Mais de 100 Consultorias'
  }

  const defaultCursos = [
    {
      tag: 'PARA EMPRESÁRIOS',
      title: 'Smart Company - AG Expert',
      subtitle: 'APRENDA COMO FAZER SEU TIME MELHORAR TODOS OS RESULTADOS',
      desc: 'É muito mais que um Curso; portanto, vou te passar o método de Auto Gestão Empresarial para que sua empresa seja menos dependente de você, tendo mais tempo para estratégia. Assim, montando um time que vai entregar resultados em todos os setores através de planos de ação que funcionam de verdade. Definir metas e atingi-las fará parte da cultura do time; consequentemente, o resultado será aumento das vendas, lucro e produtividade. O Programa Empresarial que Alavanca e multiplica sua força de líder!',
      ctaText: 'COMO MONTAR UM TIME AUTO GERENCIÁVEL',
      link: '/auto-gestao-empresarial-para-donos-de-empresas'
    },
    {
      tag: 'PARA GESTORES E LIDERES COMERCIAIS',
      title: 'Smart Company - AG Expert',
      subtitle: 'ESTRUTURAÇÃO DO COMERCIAL E ACELERADOR DE VENDAS',
      desc: 'Você vai aumentar as vendas, de repente dobrar ou até triplicar, e fazer parte de um grupo seleto de pessoas que tem vendas crescentes! Portanto, o Comercial deve ser inteligente em criar as estratégias e ser ativo na busca de clientes. Usando nossas técnicas extraordinárias, simples e práticas, o método que vou te ensinar mudará a reality do seu comercial. Como resultado, sua empresa se destacará no mercado e alcançará um novo patamar de sucesso.',
      ctaText: 'COMO ESTRUTURAR UM COMERCIAL COMPLETO',
      link: '/curso-cia'
    }
  ]

  const defaultAgirVsReagir = {
    quote: 'EMPRESÁRIO DEVE AGIR ANTES DE REAGIR',
    agir: 'AGIR: É tomar providências, atuar, fazer, realizar, produzir;',
    reagir: 'REAGIR: É exercer reação contra. Opor a uma reação que lhe é contrária.',
    body: 'Percebe que se trata de uma Atitude, que vem antes da reação? Isso quer dizer que agindo você está sempre um passo a frente. Um passo antes de os problemas ocorrerem (ou piorarem) ou um passo a frente do seu concorrente. Sabe aquele velha e boa frase, é melhor prevenir do que remediar, se aplica exatamente aqui, você toma atitude antes e de forma preventiva. Portanto, seguindo a Metodologia, você vai ganhar liberdade financeira e liberdade de tempo para cuidar do crescimento do seu negócio e terá tempo para sua família e viagens, porque afinal de contas, a verdade é que você não quer só dinheiro, quer as suas liberdades.',
    cta: 'Quero agir On Line com o Programa de Auto Gestão'
  }

  const defaultCoragem = {
    h2: 'é preciso coragem para ser empresário,\nmais que isso,\né preciso ser EXPERT EM AUTO GESTÃO.',
    paragraph: 'Você escolheu ser empresário por um motivo, porque o seu espírito empreendedor não se acomoda com qualquer situação. E com o AG Expert você não está mais sozinho na batalha, terá nossas técnicas e ferramentas de combate e tornará seu time + capacitado e comprometido.',
    auto_gestao: [
      {
        title: 'Auto Gestão',
        desc: 'Aqui as coisas acontecem como deveriam, portanto, há um ciclo de monitoramento onde o seu time está capacitado para dar soluções. Como resultado, os setores vão se tornando menos dependentes de você, o que, consequentemente, esclarece que há uma autonomia maior sendo desenvolvida.'
      },
      {
        title: 'Inspirada em Resultados',
        desc: 'A Cultura da Auto-Gestão faz com que as Metas fiquem claras, portanto, seu time absorve um formato de Gestão eficiente e se motiva a buscar resultados positivos tanto para eles quanto para sua empresa.'
      }
    ],
    urgency: 'Enquanto você apaga incêndio todos os dias, seu concorrente pode estar neste momento, conquistando a Auto-Gestão e fazendo a empresa dele crescer. Tome uma atitude agora!'
  }

  const defaultTransformacao = {
    intro: 'O AG EXPERT é um programa completo que orienta de forma objetiva e clara os passos essenciais para o empresário conduzir o negócio dele de forma mais assertiva, com mais clareza, tranquilidade e sempre envolvendo sua equipe na busca de melhoria dos resultados da empresa, sejam eles no aumento das vendas, lucro ou performance de entrega.',
    foco_dono: {
      title: 'O Foco do Dono',
      desc: 'A Smart Company foca no Crescimento Estratégico e geração de Lucro. Portanto, tem a tranquilidade de saber que seu time vai entregar os resultados, o que permite pensar na estratégia da empresa. Em primeiro lugar, a empresa prioriza a eficiência operacional, certamente, com a convicção de que isso impulsionará seu sucesso. Além disso, está sempre em busca de inovação e melhoria contínua. Em conclusão, a Smart Company é uma referência no mercado, resumindo, pela sua abordagem focada e eficaz.'
    },
    foco_equipe: {
      title: 'O Foco da Equipe',
      desc: 'A Smart é comprometida com os processos, organização e entregas. Assim, foca na solução dos problemas, liberando o empresário para pensar na estratégia da empresa. Consequentemente, permite que o gestor direcione seus esforços para áreas mais estratégicas. Além disso, ao otimizar esses processos, a Smart garante uma maior eficiência operacional. Enquanto isso, o empresário pode se dedicar a questões de maior importância.'
    },
    livro: {
      title: 'O curso de Auto Gestão Expert é como uma Alavanca e multiplica sua força',
      desc: 'O curso de Auto Gestão Expert é como uma Alavanca e multiplica sua força. Traz um pacote completo de soluções que orienta o empresário a envolver equipe na busca de melhoria dos resultados da empresa, sejam eles no aumento das vendas, lucro ou performance de entrega. A equipe passa a focar na solução dos problemas e o Dono na geração de Lucro. Com o tempo vai liberando o empresário para pensar na estratégia da empresa.',
      quote: 'O AG EXPERT (AUTO GESTÃO EXPERT) da Smart Company é um programa completo que orienta de forma muito objetiva e clara os passos essenciais para o empresário conseguir conduzir o negócio dele de forma mais assertiva, com mais clareza, tranquilidade e sempre envolvendo sua equipe na busca de melhoria dos resultados da empresa, sejam eles no aumento das vendas, lucro ou performance de entrega.',
      footnote: 'A proposta é que o Dono tenha a “Gestão na Mão” com ferramentas eficazes, montar um time capacitado e conduzir de forma motivadora, medindo o desempenho dela, para que atinja os objectives do negócio.'
    }
  }

  const defaultEbooks = [
    {
      title: 'A Regra da Amazon',
      subtitle: 'Jeff Bezos',
      desc: 'Como a mentalidade do cliente em primeiro lugar transformou a maior empresa do mundo. Lições aplicáveis ao seu negócio.',
      link: 'http://www-programaagir-com-br.rds.land/regra-amazon',
      badge: 'Grátis',
      image: '/assets/ebook-amazon.png'
    },
    {
      title: 'Os Segredos de Steve Jobs',
      subtitle: 'Apple & Inovação',
      desc: 'Os princípios de liderança, inovação e execução que tornaram a Apple a empresa mais valiosa do planeta.',
      link: 'http://www-programaagir-com-br.rds.land/steve-jobs',
      badge: 'Grátis',
      image: '/assets/ebook-apple.png'
    }
  ]

  const {
    hero,
    reasons: reasonsList,
    journeys,
    pillars,
    auto_gestao_checklist,
    mentor,
    cursos,
    agir_vs_reagir,
    coragem,
    transformacao,
    ebooks
  } = useDynamicContent('home', {
    hero: defaultHero,
    reasons: defaultReasons,
    journeys: defaultJourneys,
    pillars: defaultPillars,
    auto_gestao_checklist: defaultAutoGestaoChecklist,
    mentor: defaultMentor,
    cursos: defaultCursos,
    agir_vs_reagir: defaultAgirVsReagir,
    coragem: defaultCoragem,
    transformacao: defaultTransformacao,
    ebooks: defaultEbooks
  })

  // Pega os 3 posts mais recentes para o preview do blog
  const recentPosts = blogPosts.slice(0, 3)

  const getPillarIcon = (title: string) => {
    if (title.toLowerCase().includes('comercial')) return <TrendingUp className="w-6 h-6 text-gold-primary" />
    if (title.toLowerCase().includes('financeiro')) return <DollarSign className="w-6 h-6 text-gold-primary" />
    return <Target className="w-6 h-6 text-gold-primary" />
  }

  return (
    <StaticContent pageKey="home">
    <div className="bg-primary-dark pt-16 min-h-screen text-slate-300 font-sans">
      <SEO
        title="Consultoria e Gestão de Excelência para Empresas" 
        description="Consultoria e gestão personalizadas para donos de empresas e gestores que buscam reestruturação financeira, aumento de vendas, valuation e auto gestão empresarial." 
      />

      {/* ── Hero Section ─────────────────────────────────── */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-32 border-b border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-gold-primary bg-gold-primary/10 border border-gold-primary/20">
              <Award className="w-3.5 h-3.5" />
              <EditableText
                as="span"
                sectionKey="home_hero"
                path={['metadata', 'badge']}
                value={hero.badge}
              />
            </span>

            <EditableText
              as="h1"
              sectionKey="home_hero"
              field="title"
              value={hero.title}
              className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight leading-tight"
            />

            <EditableText
              as="p"
              sectionKey="home_hero"
              field="content"
              value={hero.content}
              className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto"
            />

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#diagnostico"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-wider text-primary-dark bg-gold-primary hover:bg-gold-light rounded-lg shadow-xl shadow-gold-primary/10 transition-all duration-200"
              >
                <EditableStatic k="hero_cta_diagnostico" value="Fazer Auto Diagnóstico Gratuito" as="span" />
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
              <Link
                to="/como-transformamos-empresas"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-wider text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
              >
                <EditableStatic k="hero_cta_consultoria" value="Conhecer Consultoria" as="span" />
              </Link>
            </div>

            <div className="flex items-center justify-center gap-2 pt-6 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-gold-primary" />
              <EditableStatic k="hero_trust_line" value="Metodologia taylor-made testada em mais de 100 empresas" as="span" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 4 Jornadas ───────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <EditableStatic k="jornadas_title" value="Nossa Expertise nas Suas Mãos" as="h2" className="text-3xl font-display font-bold text-white uppercase tracking-wider" />
          <EditableStatic k="jornadas_subtitle" value="Temos expertise comprovada nestas 4 jornadas, clique na solução que você precisa neste momento:" as="p" className="text-slate-400 max-w-2xl mx-auto text-sm" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {journeys.map((j: any, idx: number) => (
            <Link
              key={j.title}
              to={j.link}
              className="flex items-center justify-center text-center px-6 py-8 bg-gold-primary hover:bg-gold-light text-primary-dark font-display font-black text-sm uppercase tracking-wider rounded-lg shadow-lg hover:shadow-gold-primary/20 hover:-translate-y-1 transition-all duration-300 min-h-[110px]"
            >
              <EditableText
                as="span"
                sectionKey="home_journeys"
                path={['metadata', 'journeys', idx, 'title']}
                value={j.title}
              />
            </Link>
          ))}
        </div>
      </section>

      {/* ── 3 Pilares ────────────────────────────────────── */}
      <section className="py-20 bg-secondary-dark/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <EditableStatic k="pilares_title" value="DOMINE SUA EMPRESA, POTENCIALIZE SEU TIME E ATINJA O SUCESSO." as="h2" className="text-3xl font-display font-bold text-white uppercase tracking-wider" />
            <EditableStatic k="pilares_subtitle" value="ACELERE COM NOSSA CONSULTORIA OU FAÇA AGORA NOSSOS CURSOS DE AUTO GESTÃO EMPRESARIAL." as="p" className="text-slate-400 max-w-3xl mx-auto text-sm leading-relaxed" />
          </div>

          <div className="max-w-3xl mx-auto glass rounded-xl p-8 border border-white/5 mb-16 space-y-6">
            <EditableStatic k="pilares_checklist_heading" value="A nossa consultoria e gestão são personalizadas para você e para a sua empresa, trazendo soluções de Auto Gestão Empresarial que você vai aprender a:" as="h3" className="text-base font-display font-bold text-white text-center leading-relaxed" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
              {auto_gestao_checklist.slice(0, 6).map((item: string, idx: number) => (
                <div key={item} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-gold-primary" />
                  <EditableText
                    as="span"
                    sectionKey="home_auto_gestao_checklist"
                    path={['metadata', 'auto_gestao_checklist', idx]}
                    value={item}
                  />
                </div>
              ))}
              {auto_gestao_checklist[6] && (
                <div className="flex items-center gap-2 md:col-span-2 justify-center">
                  <Check className="w-4 h-4 text-gold-primary" />
                  <EditableText
                    as="span"
                    sectionKey="home_auto_gestao_checklist"
                    path={['metadata', 'auto_gestao_checklist', 6]}
                    value={auto_gestao_checklist[6]}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="text-center space-y-3 mb-10">
            <EditableStatic k="pilares_reestruturacao_title" value="CONSULTORIA E GESTÃO COM REESTRUTURAÇÃO DE EMPRESAS" as="h3" className="text-xl font-display font-bold text-white uppercase tracking-wider" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pillars.map((p: any, idx: number) => (
              <div key={p.title} className="bg-[#091120] rounded-xl p-8 border border-white/5 hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-gold-primary/10 flex items-center justify-center mb-6">
                  {getPillarIcon(p.title)}
                </div>
                <EditableText
                  as="h3"
                  sectionKey="home_pillars"
                  path={['metadata', 'pillars', idx, 'title']}
                  value={p.title}
                  className="text-lg font-display font-bold text-white mb-3"
                />
                <EditableText
                  as="p"
                  sectionKey="home_pillars"
                  path={['metadata', 'pillars', idx, 'desc']}
                  value={p.desc}
                  className="text-xs sm:text-sm leading-relaxed text-slate-400"
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/como-transformamos-empresas"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-wider text-primary-dark bg-gold-primary hover:bg-gold-light rounded-lg shadow-xl shadow-gold-primary/10 transition-all duration-200"
            >
              <EditableStatic k="pilares_cta" value="PRECISO SOLUÇÕES DE CONSULTORIA" as="span" />
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Quiz Auto Diagnóstico ─────────────────────────── */}
      <section id="diagnostico" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center space-y-3 mb-8">
          <EditableStatic k="quiz_title" value="Faça seu Auto Diagnóstico Gratuito" as="h2" className="text-3xl font-display font-bold text-white uppercase tracking-wider" />
          <EditableStatic k="quiz_subtitle" value="Responda as questões abaixo elaboradas por nossos consultores e veja o seu laudo orientativo de performance em tempo real." as="p" className="text-slate-400 max-w-xl mx-auto text-sm" />
        </div>
        <AssessmentQuiz />
      </section>
      {/* ── Mentor Section ───────────────────────────────── */}
      <section className="py-20 bg-secondary-dark/40 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-gold-primary/20 to-transparent rounded-2xl -m-2 -z-10 blur-sm"></div>
              <EditableImage
                sectionKey="home_mentor"
                path={['metadata', 'imageUrl']}
                value={mentor.imageUrl}
                alt={`${mentor.name} - Mentor Smart Company`}
                className="w-full max-w-md mx-auto rounded-2xl border border-white/10 shadow-2xl hover:scale-[1.01] transition-transform duration-300"
              />
              <div className="absolute bottom-6 left-6 right-6 glass p-4 rounded-xl border border-white/10 text-center sm:text-left">
                <EditableText
                  as="p"
                  sectionKey="home_mentor"
                  path={['metadata', 'name']}
                  value={mentor.name}
                  className="text-white font-display font-bold text-base leading-none"
                />
                <EditableText
                  as="p"
                  sectionKey="home_mentor"
                  path={['metadata', 'title']}
                  value={mentor.title}
                  className="text-gold-primary text-xs font-semibold mt-1"
                />
              </div>
            </div>

            <div className="space-y-6">
              <span className="text-[10px] font-bold text-gold-primary uppercase tracking-widest">
                <EditableStatic k="mentor_eyebrow_prefix" value="Seu Mentor" as="span" /> {mentor.name}
              </span>
              <EditableText
                as="h2"
                sectionKey="home_mentor"
                path={['metadata', 'heading']}
                value={mentor.heading}
                className="text-3xl sm:text-4xl font-display font-bold text-white uppercase tracking-tight"
              />
              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-400">
                <EditableParagraphs
                  sectionKey="home_mentor"
                  path={['metadata', 'bio']}
                  value={mentor.bio}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Por que escolher ─────────────────────────────── */}
      <section className="py-20 bg-[#091120] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="space-y-4">
              <EditableStatic k="porque_badge" value="Compromisso" as="span" className="text-[10px] font-bold text-gold-primary uppercase tracking-widest" />
              <EditableStatic k="porque_title" value="Por que os empresários escolhem a Smart Company?" as="h2" className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight leading-tight uppercase" />
              <EditableStatic k="porque_subtitle" value="Nosso formato de atendimento e metodologia são construídos sob medida (Taylor Made) para atuar na raiz das dificuldades empresariais." as="p" className="text-sm text-slate-400 leading-relaxed pr-4" />
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {reasonsList.map((r: any, i: number) => (
                <div key={r.title} className="p-6 bg-primary-dark/80 rounded-xl border border-white/5 space-y-3">
                  <div className="text-2xl font-display font-black text-gold-primary">0{i + 1}</div>
                  <EditableText
                    as="h3"
                    sectionKey="home_reasons"
                    path={['metadata', 'reasons', i, 'title']}
                    value={r.title}
                    className="text-lg font-display font-bold text-white"
                  />
                  <EditableText
                    as="p"
                    sectionKey="home_reasons"
                    path={['metadata', 'reasons', i, 'desc']}
                    value={r.desc}
                    className="text-xs sm:text-sm text-slate-400 leading-relaxed"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Cursos Online ────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <EditableStatic k="cursos_title" value="NOSSAS FORMAÇÕES ON LINE" as="h2" className="text-3xl font-display font-bold text-white uppercase tracking-wider" />
          <EditableStatic k="cursos_subtitle" value="Treinamentos práticos com as mesmas táticas aplicadas em nossas consultorias corporativas." as="p" className="text-slate-400 max-w-xl mx-auto text-sm" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {cursos.map((curso: any, idx: number) => (
            <div key={idx} className="glass rounded-2xl border border-white/10 p-8 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-primary/5 rounded-full blur-2xl"></div>
              <div>
                <EditableText
                  as="span"
                  sectionKey="home_cursos"
                  path={['metadata', 'cursos', idx, 'tag']}
                  value={curso.tag}
                  className="text-[10px] font-bold text-gold-primary uppercase tracking-widest"
                />
                <EditableText
                  as="h3"
                  sectionKey="home_cursos"
                  path={['metadata', 'cursos', idx, 'title']}
                  value={curso.title}
                  className="text-2xl font-display font-extrabold text-white mt-3 mb-4"
                />
                <EditableText
                  as="p"
                  sectionKey="home_cursos"
                  path={['metadata', 'cursos', idx, 'subtitle']}
                  value={curso.subtitle}
                  className="text-xs font-semibold text-gold-primary mb-4 uppercase tracking-wider"
                />
                <EditableText
                  as="p"
                  sectionKey="home_cursos"
                  path={['metadata', 'cursos', idx, 'desc']}
                  value={curso.desc}
                  className="text-sm text-slate-400 leading-relaxed mb-6"
                />
              </div>
              <Link
                to={curso.link}
                className="w-full inline-flex items-center justify-center px-6 py-3 text-xs font-bold uppercase tracking-wider text-primary-dark bg-gold-primary hover:bg-gold-light rounded-lg transition-colors"
              >
                <EditableText
                  as="span"
                  sectionKey="home_cursos"
                  path={['metadata', 'cursos', idx, 'ctaText']}
                  value={curso.ctaText}
                />
                <ArrowRight className="ml-1.5 w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>


      {/* ── AGIR VS REAGIR ───────────────────────────────── */}
      <section className="py-20 bg-[#091120] border-y border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white uppercase tracking-wider">
            &ldquo;<EditableText
              as="span"
              sectionKey="home_agir_vs_reagir"
              path={['metadata', 'quote']}
              value={agir_vs_reagir.quote}
            />&rdquo;
          </h2>
          <EditableStatic k="agir_subtitle" value="AGIR É BEM DIFERENTE DE REAGIR." as="p" className="text-gold-primary font-display font-extrabold text-lg uppercase tracking-wider" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-2 text-left">
            <div className="p-6 bg-primary-dark/80 rounded-xl border border-gold-primary/20 space-y-2">
              <EditableStatic k="agir_label" value="AGIR" as="h3" className="text-gold-primary font-display font-extrabold text-lg uppercase tracking-wide" />
              <EditableText
                as="p"
                sectionKey="home_agir_vs_reagir"
                path={['metadata', 'agir']}
                value={agir_vs_reagir.agir}
                className="text-xs sm:text-sm text-slate-400 leading-relaxed"
              />
            </div>
            <div className="p-6 bg-primary-dark/80 rounded-xl border border-white/5 space-y-2">
              <EditableStatic k="reagir_label" value="REAGIR" as="h3" className="text-slate-500 font-display font-extrabold text-lg uppercase tracking-wide" />
              <EditableText
                as="p"
                sectionKey="home_agir_vs_reagir"
                path={['metadata', 'reagir']}
                value={agir_vs_reagir.reagir}
                className="text-xs sm:text-sm text-slate-500 leading-relaxed"
              />
            </div>
          </div>

          <EditableText
            as="p"
            sectionKey="home_agir_vs_reagir"
            path={['metadata', 'body']}
            value={agir_vs_reagir.body}
            className="text-sm sm:text-base leading-relaxed text-slate-400 max-w-3xl mx-auto pt-4"
          />

          <div className="pt-2">
            <Link
              to="/auto-gestao-empresarial-para-donos-de-empresas"
              className="inline-flex items-center justify-center px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-gold-primary/10 border border-gold-primary/30 hover:bg-gold-primary/20 rounded-lg transition-colors"
            >
              <EditableText
                as="span"
                sectionKey="home_agir_vs_reagir"
                path={['metadata', 'cta']}
                value={agir_vs_reagir.cta}
              />
              <ArrowRight className="ml-1.5 w-4 h-4 text-gold-primary" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── É preciso CORAGEM ────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-14">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white leading-tight">
            {coragem.h2.split('\n').map((line: string, idx: number) => (
              <span key={idx}>
                {line}
                {idx === 0 && <br className="hidden sm:block" />}
                {idx === 1 && <br className="hidden sm:block" />}
              </span>
            ))}
          </h2>
          <EditableText
            as="p"
            sectionKey="home_coragem"
            path={['metadata', 'paragraph']}
            value={coragem.paragraph}
            className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed"
          />
        </div>

        {/* Auto Gestão blurbs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {coragem.auto_gestao.map((item: any, idx: number) => (
            <div key={idx} className="glass rounded-xl p-8 border border-white/5 hover:border-gold-primary/20 transition-all duration-300 space-y-4">
              <div className="w-14 h-14 rounded-xl bg-gold-primary/10 flex items-center justify-center">
                {idx === 0 ? <Zap className="w-7 h-7 text-gold-primary" /> : <Award className="w-7 h-7 text-gold-primary" />}
              </div>
              <EditableText
                as="h3"
                sectionKey="home_coragem"
                path={['metadata', 'auto_gestao', idx, 'title']}
                value={item.title}
                className="text-xl font-display font-bold text-white"
              />
              <EditableText
                as="p"
                sectionKey="home_coragem"
                path={['metadata', 'auto_gestao', idx, 'desc']}
                value={item.desc}
                className="text-sm text-slate-400 leading-relaxed"
              />
            </div>
          ))}
        </div>

        {/* Urgency callout */}
        <div className="relative bg-gradient-to-r from-gold-primary/10 via-gold-primary/5 to-transparent rounded-2xl border border-gold-primary/20 p-8 sm:p-10 text-center overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-primary/10 rounded-full blur-3xl -z-10"></div>
          <Flame className="w-8 h-8 text-gold-primary mx-auto mb-4" />
          <EditableText
            as="p"
            sectionKey="home_coragem"
            path={['metadata', 'urgency']}
            value={coragem.urgency}
            className="text-lg sm:text-xl font-display font-bold text-gold-primary leading-snug max-w-3xl mx-auto"
          />
          <EditableStatic k="coragem_urgency_cta_text" value="Tome uma atitude agora!" as="p" className="text-sm text-slate-400 mt-3 mb-6" />
          <Link
            to="/auto-gestao-empresarial-para-donos-de-empresas"
            className="inline-flex items-center justify-center px-8 py-3 text-sm font-bold uppercase tracking-wider text-primary-dark bg-gold-primary hover:bg-gold-light rounded-lg transition-colors shadow-lg shadow-gold-primary/20"
          >
            <EditableStatic k="coragem_cta" value="Quero me tornar um expert em gestão" as="span" />
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Foco Dono vs Foco Equipe & Smart Company Transformação ─────────────────────── */}
      <section className="py-20 bg-secondary-dark/40 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-3">
            <EditableStatic k="transformacao_title" value="Smart Company — Transformação!" as="h2" className="text-3xl font-display font-bold text-white uppercase tracking-wider" />
            <EditableText
              as="p"
              sectionKey="home_transformacao"
              path={['metadata', 'intro']}
              value={transformacao.intro}
              className="text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="glass rounded-xl p-8 border border-white/5 space-y-4">
              <EditableStatic k="transformacao_dono_badge" value="Dono Estrategista" as="span" className="text-[10px] font-bold text-gold-primary uppercase tracking-widest" />
              <EditableText
                as="h3"
                sectionKey="home_transformacao"
                path={['metadata', 'foco_dono', 'title']}
                value={transformacao.foco_dono.title}
                className="text-xl font-display font-bold text-white"
              />
              <EditableText
                as="p"
                sectionKey="home_transformacao"
                path={['metadata', 'foco_dono', 'desc']}
                value={transformacao.foco_dono.desc}
                className="text-sm text-slate-400 leading-relaxed"
              />
              <EditableStatic k="transformacao_dono_legenda" value="Consultoria e gestão - Smart Company - Imagem ilustrativa" as="span" className="text-[10px] text-slate-500 block pt-2" />
            </div>

            <div className="glass rounded-xl p-8 border border-white/5 space-y-4">
              <EditableStatic k="transformacao_equipe_badge" value="Time Autogerenciável" as="span" className="text-[10px] font-bold text-gold-primary uppercase tracking-widest" />
              <EditableText
                as="h3"
                sectionKey="home_transformacao"
                path={['metadata', 'foco_equipe', 'title']}
                value={transformacao.foco_equipe.title}
                className="text-xl font-display font-bold text-white"
              />
              <EditableText
                as="p"
                sectionKey="home_transformacao"
                path={['metadata', 'foco_equipe', 'desc']}
                value={transformacao.foco_equipe.desc}
                className="text-sm text-slate-400 leading-relaxed"
              />
              <EditableStatic k="transformacao_equipe_legenda" value="Consultoria e gestão - Smart Company - Imagem ilustrativa" as="span" className="text-[10px] text-slate-500 block pt-2" />
            </div>
          </div>

          {/* Livro AG Expert sub-section */}
          <div className="border-t border-white/5 pt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <EditableStatic k="transformacao_livro_badge" value="Alavancagem Empresarial" as="span" className="text-[10px] font-bold text-gold-primary uppercase tracking-widest" />
              <EditableText
                as="h3"
                sectionKey="home_transformacao"
                path={['metadata', 'livro', 'title']}
                value={transformacao.livro.title}
                className="text-2xl sm:text-3xl font-display font-bold text-white uppercase leading-tight"
              />
              <EditableText
                as="p"
                sectionKey="home_transformacao"
                path={['metadata', 'livro', 'desc']}
                value={transformacao.livro.desc}
                className="text-sm sm:text-base text-slate-400 leading-relaxed"
              />
              <EditableText
                as="p"
                sectionKey="home_transformacao"
                path={['metadata', 'livro', 'quote']}
                value={transformacao.livro.quote}
                className="text-sm sm:text-base text-slate-400 leading-relaxed font-semibold border-l-2 border-gold-primary pl-4"
              />
              <EditableText
                as="p"
                sectionKey="home_transformacao"
                path={['metadata', 'livro', 'footnote']}
                value={transformacao.livro.footnote}
                className="text-xs sm:text-sm text-slate-500 leading-relaxed"
              />
              <div className="pt-2">
                <Link
                  to="/auto-gestao-empresarial-para-donos-de-empresas"
                  className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-wider text-primary-dark bg-gold-primary hover:bg-gold-light rounded-lg shadow-xl shadow-gold-primary/10 transition-all duration-200"
                >
                  <EditableStatic k="transformacao_livro_cta" value="Quero me tornar um expert em gestão" as="span" />
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="relative flex flex-col items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-gold-primary/20 to-transparent rounded-2xl -m-4 -z-10 blur-xl"></div>
              <EditableStaticImage
                k="livro_ag_image"
                value="/assets/Livro-AG.png"
                alt="Livro Auto Gestão Expert"
                className="w-full max-w-sm rounded-xl border border-white/10 shadow-2xl hover:scale-[1.03] transition-transform duration-300"
              />
              <EditableStatic k="transformacao_livro_legenda" value="Consultoria e gestão - Smart Company - Ebook AG Expert" as="span" className="text-[10px] text-slate-500 mt-4 block" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Conteúdos CORTESIA ───────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-gold-primary bg-gold-primary/10 border border-gold-primary/20">
            <BookOpen className="w-3.5 h-3.5" />
            <EditableStatic k="cortesia_badge" value="100% Gratuito" as="span" />
          </span>
          <EditableStatic k="cortesia_title" value="Conteúdos Cortesia" as="h2" className="text-3xl font-display font-bold text-white uppercase tracking-wider" />
          <EditableStatic k="cortesia_subtitle" value="Temos e-books gratuitos para ajudar você a comandar a sua empresa e melhorar seu rendimento como empresário." as="p" className="text-slate-400 max-w-xl mx-auto text-sm" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {ebooks.map((book: any, idx: number) => (
            <a
              key={book.title}
              href={book.link}
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-xl p-6 border border-white/5 hover:border-gold-primary/20 transition-all duration-300 group flex flex-col sm:flex-row gap-6 justify-between items-center"
            >
              <div className="w-32 h-44 flex-shrink-0 relative flex flex-col items-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-gold-primary/10 to-transparent rounded-lg -m-1 -z-10 blur-sm"></div>
                <EditableImage
                  sectionKey="home_ebooks"
                  path={['metadata', 'ebooks', idx, 'image']}
                  value={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover rounded-lg border border-white/10 shadow-lg group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <span className="text-[8px] text-slate-500 mt-2 text-center leading-none">
                  {idx === 0 ? "Smart Company - imagem (conteúdo cortesia)" : "Smart Company - Ebook (cortesia)"}
                </span>
              </div>

              <div className="flex-1 flex flex-col justify-between h-full space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <EditableText
                      as="span"
                      sectionKey="home_ebooks"
                      path={['metadata', 'ebooks', idx, 'badge']}
                      value={book.badge}
                      className="text-[10px] font-bold text-gold-primary uppercase tracking-widest bg-gold-primary/10 py-1 px-3 rounded-full border border-gold-primary/15"
                    />
                    <BookOpen className="w-5 h-5 text-gold-primary opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <EditableText
                    as="h3"
                    sectionKey="home_ebooks"
                    path={['metadata', 'ebooks', idx, 'title']}
                    value={book.title}
                    className="text-lg font-display font-bold text-white group-hover:text-gold-primary transition-colors mb-1"
                  />
                  <EditableText
                    as="p"
                    sectionKey="home_ebooks"
                    path={['metadata', 'ebooks', idx, 'subtitle']}
                    value={book.subtitle}
                    className="text-[10px] font-semibold text-gold-primary mb-2 uppercase tracking-wider"
                  />
                  <EditableText
                    as="p"
                    sectionKey="home_ebooks"
                    path={['metadata', 'ebooks', idx, 'desc']}
                    value={book.desc}
                    className="text-xs text-slate-400 leading-relaxed line-clamp-3"
                  />
                </div>
                <div className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-white group-hover:text-gold-primary transition-colors">
                  <EditableStatic k="cortesia_baixar_ebook" value="Baixar E-book" as="span" />
                  <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/materiais"
            className="inline-flex items-center justify-center px-8 py-3 text-sm font-bold uppercase tracking-wider text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-gold-primary/20 rounded-lg transition-all"
          >
            <EditableStatic k="cortesia_cta" value="Baixe nossos E-books" as="span" />
            <ChevronRight className="ml-1.5 w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Notícias (Blog Preview) ──────────────────────── */}
      <section className="py-20 bg-[#091120] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-14">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-gold-primary uppercase tracking-widest">
              <Newspaper className="w-3.5 h-3.5" />
              <EditableStatic k="blog_badge" value="Blog" as="span" />
            </span>
            <EditableStatic k="blog_title" value="Notícias" as="h2" className="text-3xl font-display font-bold text-white uppercase tracking-wider" />
            <EditableStatic k="blog_subtitle" value="Dicas práticas de estratégia, finanças corporativas, vendas e liderança empresarial." as="p" className="text-slate-400 max-w-xl mx-auto text-sm" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {recentPosts.map((post: any) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="glass rounded-xl p-6 border border-white/5 hover:border-gold-primary/20 transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-gold-primary uppercase tracking-widest">
                    {post.category}
                  </span>
                  <h3 className="text-base font-display font-bold text-white group-hover:text-gold-primary transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-[10px] text-slate-500 font-semibold uppercase">
                  <span>{post.date}</span>
                  <span className="inline-flex items-center text-gold-primary group-hover:translate-x-1 transition-transform">
                    Ler mais <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/blog"
              className="inline-flex items-center justify-center px-8 py-3 text-sm font-bold uppercase tracking-wider text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-gold-primary/20 rounded-lg transition-all"
            >
              <EditableStatic k="blog_cta" value="Acesse mais notícias" as="span" />
              <ChevronRight className="ml-1.5 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
    </StaticContent>
  )
}
