import { motion } from 'framer-motion'
import { Eye, Award, Compass, UserCheck, Milestone, Check } from 'lucide-react'
import { useDynamicContent } from '../hooks/useDynamicContent'
import SEO from '../components/SEO'
import EditableText from '../admin/inline/EditableText'
import EditableImage from '../admin/inline/EditableImage'
import EditableParagraphs from '../admin/inline/EditableParagraphs'
import { StaticContent } from '../admin/inline/StaticContent'
import EditableStatic from '../admin/inline/EditableStatic'

export default function QuemSomos() {
  // 1. Initial/Static Content definitions for fallbacks
  const defaultHero = {
    title: 'QUEM SOMOS & PROPÓSITO',
    content: 'Mais de 20 anos de atuação dedicados a entregar lucro, organização operacional e tranquilidade de tempo para empresários de todo o Brasil.',
    badge: 'Institucional & História'
  }

  const defaultMvv = {
    mission: 'Transformar positivamente empresas, empresários e seu time, contribuindo para o lucro e produtividade com menos stress, valorizando e estruturando o negócio para o longo prazo.',
    vision: 'Ser referência no Alto Tietê em Consultoria de Gestão conquistando, em 3 anos, autoridade e reconhecimento dos clientes pela transformação das empresas e pessoas através de Diagnósticos e formação de mais de 100 alunos nos Cursos de Auto Gestão.',
    purpose_o_que: 'Transformar empresas e pessoas de forma definitiva.',
    purpose_como: 'Entendendo a fundo o negócio (como se fosse nosso) através de diagnósticos minuciosos e planos de ação assertivos.',
    purpose_por_que: 'Obter lucro e melhores resultados criando um ambiente saudável, sustentável e estruturado para sócios e colaboradores.'
  }

  const defaultValues = [
    {
      title: 'Transparência e Ética',
      desc: 'Transparência total e ética inabalável na condução de todos os diagnósticos e planos de reestruturação.'
    },
    {
      title: 'Profissionalismo & Resultados',
      desc: 'Foco total no compromisso de gerar lucro e crescimento sadio para a empresa do cliente.'
    },
    {
      title: 'Atitude Empreendedora',
      desc: 'Atitude positiva, responsável, autossuficiente e resiliente diante de desafios do mercado.'
    },
    {
      title: 'Respeito e Sinceridade',
      desc: 'Relações de respeito mútuo, sinceridade em diagnósticos e gentileza no tratamento com os times.'
    }
  ]

  const defaultFounder = {
    founder_name: 'Antonio Geraldes',
    founder_title: 'Especialista em Diagnóstico & M&A',
    image_url: '/assets/Ola-sou-Antonio-Geraldes-copia-scaled.jpg',
    quote: 'Excelência em Estratégia e Gestão Eficiente é o conjunto de Resultados Positivos que melhoram constantemente: Lucro, Qualidade, Vendas Crescentes, Prazos de Entrega e o posicionamento de mercado.',
    experience_summary: 'Mais de 30 anos como empresário investidor. Fundou 6 negócios nos ramos de indústria, comércio, serviços e consultoria de reestruturação.',
    biography: 'Abri meu primeiro CNPJ aos 18 anos em 1989. Obtive experiências importantes nas multinacionais Fuji Film e Kodak, e na sequência atuei na agência publicitária Photo Art Studio atendendo contas industriais de renome nacional.\n\nEm 1994, fundei a Express Center Cópias, a maior gráfica rápida do Alto Tietê, alcançando picos mensais de 860.000 impressões. Posteriormente, atuei como comerciante no varejo de shopping e hipermercados (Balinhas & Balões, Marcia Modas), adquirindo expertise direta nas operações e desafios comerciais.\n\nEm 2001, decidi registrar a Smart Company para focar no design e manufatura de cubas de quartzo e resinas polimerizadas. Após alcançar sucesso na mídia nacional com destaque na revista Arquitetura & Construção, a empresa pivotou a manufatura para focar exclusivamente no setor de Consultoria de Gestão e Business Plan a partir de 2004.\n\nNa década de 2000, fui convidado a integrar uma grande consultoria, realizando dezenas de diagnósticos e reestruturações em empresas com faturamentos anuais de até R$ 250 milhões. Paralelamente, agreguei conhecimentos de M&A, formatação de holdings e estruturação de franquias em uma prestigiada Boutique Jurídica em São Paulo.'
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

  // 2. States initialized with fallbacks
  const defaultClients = [
    { name: "AÇÃO IMEDIATA", sector: "Assessoria em seguros" },
    { name: "ADHKON", sector: "Engenharia Civil & Projetos" },
    { name: "AUTÊNTICA", sector: "Higiene e Beleza" },
    { name: "BAQ", sector: "Utilidades Domésticas" },
    { name: "COLOR MAKE", sector: "Indústria de Cosméticos" },
    { name: "CORINTHIANS", sector: "Clube Esportivo" },
    { name: "FONTÁGUA", sector: "Captação de Água Mineral" },
    { name: "GK ABRASIVOS", sector: "Indústria de Abrasivos" },
    { name: "GUIMARÃES E PRISCO", sector: "Boutique Jurídica e Advocacia" },
    { name: "GMP MARCATTO", sector: "Corte a Laser e Usinagem" },
    { name: "GRAND HOUSE", sector: "Reabilitação e Tratamentos" },
    { name: "LESTE REMOÇÕES", sector: "Remoções Interhospitalares" },
    { name: "MARCATTO", sector: "Indústria Mecânica" },
    { name: "MASTER", sector: "Administração de Imóveis" },
    { name: "METROBYTE", sector: "TI e Infraestrutura de Rede" },
    { name: "MULTIPLIC", sector: "Corretora de Seguros" },
    { name: "NR CONSTRUTORA", sector: "Construção e Incorporação" },
    { name: "NUCLEAR MOGI", sector: "Exames de Cintilografia Nuclear" },
    { name: "ÓCSSO", sector: "Propaganda e Publicidade" },
    { name: "PETROSOL", sector: "Comércio de Embalagens" },
    { name: "PLACTERM", sector: "Embalagens & Estruturas Térmicas" },
    { name: "RP ENGENHARIA", sector: "Terceirização de Mão de Obra" },
    { name: "SH MATIC", sector: "Sistemas de Direção Hidráulica" },
    { name: "TINTAS REAL", sector: "Indústria de Tintas" },
    { name: "SUBWAY", sector: "Franquia de Fast Food" },
    { name: "WHITE HALL", sector: "Grife e Alta Costura" },
    { name: "YUR COSMÉTICOS", sector: "Indústria de Cosméticos" }
  ]

  const {
    hero,
    mvv,
    values: valuesList,
    founder,
    timeline: timelineEvents,
    clientsTitle,
    clientsDesc,
    clients: clientsList
  } = useDynamicContent('quemsomos', {
    hero: defaultHero,
    mvv: defaultMvv,
    values: defaultValues,
    founder: defaultFounder,
    timeline: defaultTimeline,
    clientsTitle: 'Casos de Sucesso & Segmentos Atendidos',
    clientsDesc: 'Ensinamos nossos clientes, mas também aprendemos com cada um. Nossa base de conhecimento é refinada diariamente através de desafios reais nos mais variados setores da economia.',
    clients: defaultClients
  })

  return (
    <StaticContent pageKey="quemsomos">
    <div className="bg-primary-dark pt-24 min-h-screen text-slate-300 font-sans">
      <SEO
        title="Quem Somos | Trajetória e Mentoria de Antonio Geraldes" 
        description="Mais de 20 anos de atuação dedicados a entregar lucro, organização operacional e tranquilidade de tempo para empresários de todo o Brasil." 
      />
      {/* Hero Header */}
      <section className="relative bg-[#070F1E] py-20 border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <EditableText
            as="span"
            sectionKey="quemsomos_hero"
            path={['metadata', 'badge']}
            value={hero.badge}
            className="text-[10px] font-bold text-gold-primary uppercase tracking-widest bg-gold-primary/10 py-1.5 px-4 rounded-full border border-gold-primary/20 inline-block"
          />
          <EditableText
            as="h1"
            sectionKey="quemsomos_hero"
            field="title"
            value={hero.title}
            className="text-4xl sm:text-5xl font-display font-black text-white tracking-tight leading-tight uppercase"
          />
          <EditableText
            as="p"
            sectionKey="quemsomos_hero"
            field="content"
            value={hero.content}
            className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed"
          />
        </div>
      </section>

      {/* MVV section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          {/* Missão */}
          <div className="p-8 bg-[#091120] rounded-xl border border-white/5 space-y-4 hover:border-gold-primary/10 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-gold-primary/10 flex items-center justify-center">
              <Compass className="w-6 h-6 text-gold-primary" />
            </div>
            <EditableStatic k="mvv_mission_heading" value="Missão" as="h3" className="text-xl font-display font-bold text-white uppercase tracking-wide" />
            <EditableText
              as="p"
              sectionKey="quemsomos_mvv"
              path={['metadata', 'mission']}
              value={mvv.mission}
              className="text-sm leading-relaxed text-slate-400"
            />
          </div>

          {/* Visão */}
          <div className="p-8 bg-[#091120] rounded-xl border border-white/5 space-y-4 hover:border-gold-primary/10 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-gold-primary/10 flex items-center justify-center">
              <Eye className="w-6 h-6 text-gold-primary" />
            </div>
            <EditableStatic k="mvv_vision_heading" value="Visão" as="h3" className="text-xl font-display font-bold text-white uppercase tracking-wide" />
            <EditableText
              as="p"
              sectionKey="quemsomos_mvv"
              path={['metadata', 'vision']}
              value={mvv.vision}
              className="text-sm leading-relaxed text-slate-400"
            />
          </div>

          {/* O que, Como, Por que */}
          <div className="p-8 bg-[#091120] rounded-xl border border-white/5 space-y-4 hover:border-gold-primary/10 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-gold-primary/10 flex items-center justify-center">
              <Award className="w-6 h-6 text-gold-primary" />
            </div>
            <EditableStatic k="mvv_purpose_heading" value="Propósito Real" as="h3" className="text-xl font-display font-bold text-white uppercase tracking-wide" />
            <div className="text-xs space-y-2 text-slate-400">
              <p><strong>O quê?</strong> <EditableText as="span" sectionKey="quemsomos_mvv" path={['metadata', 'purpose_o_que']} value={mvv.purpose_o_que} /></p>
              <p><strong>Como?</strong> <EditableText as="span" sectionKey="quemsomos_mvv" path={['metadata', 'purpose_como']} value={mvv.purpose_como} /></p>
              <p><strong>Por quê?</strong> <EditableText as="span" sectionKey="quemsomos_mvv" path={['metadata', 'purpose_por_que']} value={mvv.purpose_por_que} /></p>
            </div>
          </div>
        </div>

        {/* Valores Grid */}
        <div className="space-y-12">
          <div className="text-center space-y-3">
            <EditableStatic
              k="values_section_title"
              value="Nossos Valores Inegociáveis"
              as="h2"
              className="text-2xl sm:text-3xl font-display font-bold text-white uppercase tracking-wider"
            />
            <EditableStatic
              k="values_section_desc"
              value="Nossa conduta diária é ditada por princípios que priorizam a segurança corporativa do cliente."
              as="p"
              className="text-slate-400 text-sm max-w-xl mx-auto"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valuesList.map((v: any, idx: number) => (
              <div key={v.title} className="p-6 bg-white/5 rounded-xl border border-white/5 space-y-3">
                <div className="w-8 h-8 rounded-full bg-gold-primary/15 flex items-center justify-center text-gold-primary">
                  <Check className="w-4 h-4" />
                </div>
                <EditableText
                  as="h4"
                  sectionKey="quemsomos_values"
                  path={['metadata', 'values', idx, 'title']}
                  value={v.title}
                  className="text-white font-display font-bold text-sm uppercase"
                />
                <EditableText
                  as="p"
                  sectionKey="quemsomos_values"
                  path={['metadata', 'values', idx, 'desc']}
                  value={v.desc}
                  className="text-xs leading-relaxed text-slate-400"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Biography */}
      <section className="py-20 bg-[#091120] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Biography Image & Summary */}
            <div className="lg:col-span-5 relative space-y-6">
              <div className="relative max-w-sm mx-auto">
                <div className="absolute inset-0 bg-gradient-to-tr from-gold-primary/20 to-transparent rounded-2xl -m-2 -z-10 blur-sm"></div>
                <EditableImage
                  sectionKey="quemsomos_founder"
                  path={['metadata', 'image_url']}
                  value={founder.image_url}
                  alt={`${founder.founder_name} - Mentor & Fundador`}
                  className="w-full rounded-2xl border border-white/10 shadow-2xl hover:scale-[1.01] transition-transform duration-300"
                />
                <div className="absolute bottom-4 left-4 right-4 glass p-3.5 rounded-xl border border-white/10 text-center sm:text-left">
                  <EditableText
                    as="p"
                    sectionKey="quemsomos_founder"
                    path={['metadata', 'founder_name']}
                    value={founder.founder_name}
                    className="text-white font-display font-bold text-base leading-none"
                  />
                  <EditableText
                    as="p"
                    sectionKey="quemsomos_founder"
                    path={['metadata', 'founder_title']}
                    value={founder.founder_title}
                    className="text-gold-primary text-xs font-semibold mt-1"
                  />
                </div>
              </div>
              
              <div className="bg-primary-dark/80 p-6 rounded-xl border border-white/5 space-y-3 text-center sm:text-left">
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <UserCheck className="w-5 h-5 text-gold-primary" />
                  <EditableStatic k="founder_experience_label" value="Experiência Setorial" as="span" className="text-white font-display font-bold text-sm uppercase" />
                </div>
                <EditableText
                  as="p"
                  sectionKey="quemsomos_founder"
                  path={['metadata', 'experience_summary']}
                  value={founder.experience_summary}
                  className="text-xs text-slate-400 leading-relaxed"
                />
              </div>
            </div>

            {/* Biography Detailed Text */}
            <div className="lg:col-span-7 space-y-6">
              <EditableStatic k="founder_journey_badge" value="A Trajetória do Fundador" as="span" className="text-[10px] font-bold text-gold-primary uppercase tracking-widest" />
              <EditableStatic
                k="founder_journey_title"
                value="Empreendedorismo na Prática desde 1989"
                as="h2"
                className="text-3xl sm:text-4xl font-display font-bold text-white uppercase tracking-tight"
              />
              
              <div className="space-y-4 text-xs sm:text-sm text-slate-400 leading-relaxed text-justify">
                <EditableParagraphs
                  sectionKey="quemsomos_founder"
                  field="content"
                  value={founder.biography}
                />
                <p className="italic text-slate-200 border-l-2 border-gold-primary pl-4 py-1">
                  &ldquo;<EditableText as="span" sectionKey="quemsomos_founder" path={['metadata', 'quote']} value={founder.quote} />&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Historical Timeline Section */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <Milestone className="w-8 h-8 text-gold-primary mx-auto" />
          <EditableStatic
            k="timeline_section_title"
            value="Nossa Linha do Tempo"
            as="h2"
            className="text-3xl font-display font-bold text-white uppercase tracking-wider"
          />
          <EditableStatic
            k="timeline_section_desc"
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
              <div className="bg-[#091120] p-6 rounded-xl border border-white/5 hover:border-gold-primary/10 transition-colors space-y-2">
                <EditableText
                  as="span"
                  sectionKey="quemsomos_timeline"
                  path={['metadata', 'events', idx, 'year']}
                  value={event.year}
                  className="text-sm font-display font-black text-gold-primary"
                />
                <EditableText
                  as="h3"
                  sectionKey="quemsomos_timeline"
                  path={['metadata', 'events', idx, 'title']}
                  value={event.title}
                  className="text-base font-display font-bold text-white uppercase"
                />
                <EditableText
                  as="p"
                  sectionKey="quemsomos_timeline"
                  path={['metadata', 'events', idx, 'desc']}
                  value={event.desc}
                  className="text-xs sm:text-sm text-slate-400 leading-relaxed"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Sectors Served Grid */}
      <section className="py-20 bg-[#091120] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16">
            <EditableStatic
              k="clients_badge"
              value="Nossos Clientes"
              as="span"
              className="text-xs font-bold text-gold-primary uppercase tracking-widest"
            />
            <EditableText
              as="h2"
              sectionKey="quemsomos_clients"
              field="title"
              value={clientsTitle}
              className="text-3xl font-display font-bold text-white uppercase tracking-wider"
            />
            <EditableText
              as="p"
              sectionKey="quemsomos_clients"
              field="content"
              value={clientsDesc}
              className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {clientsList.map((client: any, idx: number) => (
              <div
                key={`${client.name}-${idx}`}
                className="p-4 bg-primary-dark rounded-lg border border-white/5 hover:border-gold-primary/10 hover:-translate-y-0.5 transition-all duration-200"
              >
                <EditableText
                  as="h4"
                  sectionKey="quemsomos_clients"
                  path={['metadata', 'clients', idx, 'name']}
                  value={client.name}
                  className="text-white font-display font-extrabold text-xs tracking-wide uppercase"
                />
                <EditableText
                  as="p"
                  sectionKey="quemsomos_clients"
                  path={['metadata', 'clients', idx, 'sector']}
                  value={client.sector}
                  className="text-[10px] text-slate-500 font-semibold mt-1"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
    </StaticContent>
  )
}
