import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  LayoutDashboard,
  FileText,
  Mail,
  Plus,
  Edit,
  Trash2,
  LogOut,
  ExternalLink,
  Loader2,
  X,
  Search,
  AlertCircle,
  Send,
  User,
  Bot,
  Monitor,
  Smartphone,
  MessageSquare,
  Settings,
  Check,
  XCircle,
  Phone,
  Globe,
  Rocket,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { supabase } from '../../lib/supabase'
import PageEditor from '../../admin/PageEditor'
import PageBuilder from '../../admin/PageBuilder'
import { useFeedback, ToastViewport, ConfirmDialog } from '../../components/admin/Feedback'

type TabType = 'overview' | 'change_requests' | 'leads' | 'pages' | 'ai_assistant' | 'settings'

interface ImageUploaderProps {
  label: string
  value: string
  onChange: (url: string) => void
  currentSlug: string
}

function ImageUploader({ label, value, onChange, currentSlug }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    const file = files[0]

    setUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${currentSlug}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`
      const filePath = `uploads/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('site-assets')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('site-assets')
        .getPublicUrl(filePath)

      onChange(publicUrl)
    } catch (err: any) {
      console.error(err)
      alert("Erro ao fazer upload da imagem: " + err.message)
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteImage = async () => {
    if (!value) return

    const bucketUrlPart = '/storage/v1/object/public/site-assets/'
    const index = value.indexOf(bucketUrlPart)
    
    if (index !== -1) {
      const filePath = value.substring(index + bucketUrlPart.length)
      if (filePath) {
        try {
          const { error } = await supabase.storage
            .from('site-assets')
            .remove([filePath])
          if (error) throw error
        } catch (err: any) {
          console.error("Erro ao deletar arquivo do storage:", err)
        }
      }
    }
    onChange('')
  }

  const triggerSelect = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-2">
      <label className="block text-[10px] font-bold uppercase text-slate-500">{label}</label>
      <div className="flex gap-2 items-center">
        {value ? (
          <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/10 flex-shrink-0 bg-[#070F1E] flex items-center justify-center">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={handleDeleteImage}
              className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 flex items-center justify-center text-red-400 transition-opacity"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="w-12 h-12 rounded-lg border border-dashed border-white/20 flex-shrink-0 flex items-center justify-center bg-[#070F1E] text-slate-600">
            <FileText className="w-5 h-5" />
          </div>
        )}

        <div className="flex-grow flex gap-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-grow bg-[#070F1E] border border-white/10 rounded-lg py-2 px-3 text-xs text-white focus:outline-none"
            placeholder="URL da imagem (ou envie um arquivo)"
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            disabled={uploading}
            onClick={triggerSelect}
            className="px-3 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold rounded-lg border border-white/10 flex items-center gap-1.5 transition-colors disabled:opacity-50"
          >
            {uploading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Plus className="w-3.5 h-3.5" />
            )}
            <span>{uploading ? 'Enviando...' : 'Enviar foto'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [postSearch, setPostSearch] = useState('')
  const { toasts, dismissToast, toast, confirm, confirmState, resolveConfirm } = useFeedback()
  const navigate = useNavigate()
  const { siteSlug } = useParams()
  const currentSlug = siteSlug || 'smartcompany'

  // Custom states for premium UX/UI
  const [showPreview] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [mySiteSubTab, setMySiteSubTab] = useState<'pages' | 'blog' | 'custom'>('pages')
  const isPublishing = false
  const publishingStep = 0
  const setIsDirty = (_val: boolean) => {}
  
  // Notion accordions open state
  /* const [openSectionBlocks, setOpenSectionBlocks] = useState<Record<string, boolean>>({
    hero: true,
    reasons: true,
    mvv: false,
    values: false,
    founder: false,
    timeline: false,
    clients: false,
    stats: false,
    faqs: false,
    members: false,
    books: false,
    movies: false,
    opportunities: false,
    phases: false
  }) */

  /* const toggleSectionBlock = (sectionKey: string) => {
    setOpenSectionBlocks(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }))
  } */

  // State arrays
  const [posts, setPosts] = useState<any[]>([])
  const [leads, setLeads] = useState<any[]>([])
  const [sections, setSections] = useState<any[]>([])
  const [changeRequests, setChangeRequests] = useState<any[]>([])
  const [authorizedPhones, setAuthorizedPhones] = useState<any[]>([])
  const [siteConfig, setSiteConfig] = useState<any | null>(null)
  const [newPhone, setNewPhone] = useState('')

  // Modal / Form state for Posts CRUD
  const [isPostModalOpen, setIsPostModalOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<any | null>(null)
  const [postFormData, setPostFormData] = useState({
    title: '',
    slug: '',
    category: 'Gestão Empresarial',
    excerpt: '',
    body: '',
    read_time: '5 min de leitura',
    image_url: '',
    status: 'draft'
  })



  // Visual Page Builder Live States
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
      desc: 'Início oficial da prestação de serviços de Consultoria em Estratégia, Gestão e Planos de Negócios (Business Plan), atuando diretamente na recuperação e aceitação operacional de parceiros.'
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
      desc: 'Início do planejamento da plataforma Smart On-Line, viabilizando consultorias Ã  distância e treinamentos digitais escaláveis.'
    },
    {
      year: '2019',
      title: 'Maioridade & Check Up',
      desc: 'A Smart Company completa 18 anos de história e lança o "Check Up Empresas" â€” o primeiro diagnóstico empresarial 100% estruturado de forma online.'
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

  // Pages List Definition (Friendly names for business users)
  const pagesList = [
    { id: 'home', name: 'Página Inicial', path: '/' },
    { id: 'nossa-trajetoria', name: 'Nossa Trajetória', path: '/nossa-trajetoria' },
    { id: 'quem-somos', name: 'Quem Somos', path: '/quem-somos' },
    { id: 'ag-expert', name: 'Auto Gestão Empresarial (AG Expert)', path: '/auto-gestao-empresarial-para-donos-de-empresas' },
    { id: 'como-transformamos', name: 'Como Transformamos Empresas', path: '/como-transformamos-empresas' },
    { id: 'curso-cia', name: 'Comercial Inteligente e Ativo (CIA)', path: '/curso-cia' },
    { id: 'valuation', name: 'Avaliação de Empresas (Valuation)', path: '/valuation-avaliacao-compra-e-venda-de-empresas' },
    { id: 'depoimentos', name: 'Depoimentos de Clientes', path: '/depoimentos' },
    { id: 'contato', name: 'Fale Conosco', path: '/contato' },
    { id: 'recomendacoes', name: 'Recomendações de Conteúdo', path: '/recomendacoes' },
    { id: 'nossa-equipe', name: 'Nossa Equipe', path: '/nossa-equipe' },
    { id: 'imersao-omappa', name: 'Imersão OMAPPA', path: '/imersao-omappa-da-empresa-lucrativa' },
    { id: 'materiais', name: 'Materiais Educativos', path: '/materiais' }
  ] as const

  type PageId = typeof pagesList[number]['id']

  // Multi-page Builder Default values
  const defaultHomeHero = {
    badge: 'Liderança, Lucratividade e Autonomia',
    title: 'TRANSFORME JÃ SEU LUCRO, VENDAS, PRODUTIVIDADE E EQUIPE.',
    content: 'Consultoria e gestão personalizadas, gerando resultados excepcionais para Empresários e Gestores que buscam crescimento sólido e liberdade de tempo.'
  }
  const defaultHomeReasons = [
    { title: 'Aumentamos as Vendas', desc: 'Nosso formato de Gestão Comercial, já testado e comprovado em diversos segmentos, garante aumentar as vendas da sua empresa. Portanto, com Gestão Diária, semanal e mensal, contribuindo para o atingimento das Metas. Assim, você terá resultados positivos.' },
    { title: 'Geramos Caixa', desc: 'Usamos um conjunto de ferramentas para melhorar seu caixa; consequentemente, através da Gestão do estoque, Redução de custo, Alavancagem de vendas e Controle de despesas. Sobrar dinheiro na sua empresa é sempre um desafio que gostamos de enfrentar.' },
    { title: 'Empresa Lucrativa com Gestão de forma simples e prática', desc: 'Nosso atendimento personalizado, portanto, com as melhores práticas de gestão, torna sua rotina mais fácil e permite que você entenda os dados da sua empresa para tomar decisões assertivas e lucrar mais!' }
  ]

  const defaultAgHero = {
    badge: 'Auto Gestão Empresarial (10 a 500 colaboradores)',
    title: '+ LUCRO - INCÊNDIO com Plano de 22 dias',
    content: 'Sua empresa NÃƒO pode depender totalmente de você. Obtenha mais resultados, menos problemas operacionais, mais organização e tempo livre para a família.'
  }
  const defaultAgFaqs = [
    { q: 'Para quem é recomendado este programa?', a: 'É ideal para donos de empresas que faturam e têm acima de 5 colaboradores. Serve tanto para comércio, quanto para serviços e indústrias que buscam autonomia.' },
    { q: 'Como funciona o acesso?', a: 'O curso é 100% online via plataforma Hotmart (ambiente de alta segurança). Logo após a aprovação da compra, o link de acesso com vídeo-aulas e apostilas é enviado no seu e-mail.' },
    { q: 'Por quanto tempo tenho acesso ao curso?', a: 'O acesso é garantido por 1 ano completo. Você pode assistir Ã s 45 video-aulas e fazer downloads das matrizes e planilhas quantas vezes quiser no seu ritmo.' },
    { q: 'E se eu tiver dúvidas durante a implementação?', a: 'Você poderá enviar e-mails diretamente para o nosso suporte técnico em suporte@smartcompany.com.br para tirar dúvidas sobre ferramentas.' }
  ]

  const defaultCtHero = {
    badge: 'Metodologia Taylor-Made',
    title: 'Como Transformamos Empresas?',
    subtitle: 'Diagnosticamos â€¢ Planejamos â€¢ Executamos',
    content: 'Amamos o que fazemos! A nossa consultoria e gestão são personalizadas para a realidade do seu negócio, identificando gargalos e construindo soluções com payback real.'
  }
  const defaultCtStats = [
    { number: '70+', label: 'Diagnósticos Realizados' },
    { number: '100%', label: 'Clientes Satisfeitos' },
    { number: '95%', label: 'Conversão em Projeto' },
    { number: '100%', label: 'Entregues no Prazo e Custo' }
  ]
  const defaultCtFaqs = [
    { q: 'Quanto tempo leva para realizar um Diagnóstico?', a: 'Em média leva de 3 a 4 semanas, podendo variar conforme a complexidade operacional da empresa e a velocidade de disponibilização de dados pelo cliente.' },
    { q: 'O diagnóstico atrapalha a rotina da empresa?', a: 'Não, de forma alguma. Por já termos realizado este procedimento mais de 70 vezes, aprimoramos o cronograma de coletas e entrevistas de modo que seja executado de forma fluida sem paralisar a rotina.' },
    { q: 'Em quanto tempo deve ser realizada a Fase 2 (Implantação)?', a: 'Depende diretamente das carências e prioridades detectadas na Fase de Diagnóstico. Pode levar desde poucos meses para ajustes focados, até pouco mais de 1 ano para reestruturações totais.' },
    { q: 'Qual será o valor investido?', a: 'O valor é ponderado conforme o perfil dos consultores seniores alocados e a carga horária de dedicação exigida. Tomamos o cuidado de desenhar propostas viáveis, ajustadas Ã  realidade financeira da empresa.' },
    { q: 'O projeto se paga? Há payback?', a: 'Sim. Durante a apresentação do laudo do Diagnóstico, apresentamos o cálculo do Payback projetado (relação entre honorários e o retorno financeiro gerado em até 24 meses pelas melhorias implatadas).' }
  ]

  const defaultCiaHero = {
    badge: 'Comercial Inteligente e Ativo',
    title: 'Alavanque as vendas estruturando seu Comercial',
    content: 'Venda de forma inteligente e com margem real. Descubra como estruturar sua força de vendas de ponta a ponta e bater metas mesmo em mercados competitivos.'
  }
  const defaultCiaFaqs = [
    { q: 'Para quem é recomendado o Programa CIA?', a: 'É indicado para gestores de vendas, diretores comerciais, empresários e líderes de equipes que atuam no segmento de indústria, comércio ou prestação de serviços.' },
    { q: 'O curso é gravado?', a: 'Sim, as 11 video-aulas são totalmente gravadas e de caráter brutalmente prático. Você pode assistir no computador, celular ou tablet de onde quiser e aplicar na hora.' },
    { q: 'Qual o formato do material didático?', a: 'Além das aulas, você recebe apostilas de apoio didático em PDF para leitura ou impressão, e modelos práticos de matrizes de vendas em Excel.' },
    { q: 'Como funciona o reembolso?', a: 'O curso oferece 15 dias de garantia incondicional. Se por qualquer motivo você não gostar das táticas, basta solicitar o estorno e devolveremos 100% do seu dinheiro.' }
  ]

  const defaultOtherHeros: Record<string, any> = {
    'valuation': { badge: 'Fusões, Aquisições & Valuation', title: 'VOCÊ SABE QUANTO VALE SUA EMPRESA?', content: 'Avaliação, compra e venda de empresas é um assunto técnico e sério. Concluímos o valor de mercado (Valuation) através de metodologias consagradas como Fluxo de Caixa Descontado (FCF) e múltiplos de EBITDA.' },
    'depoimentos': { badge: 'Depoimentos & Casos', title: 'O que dizem os nossos clientes', content: 'Histórias reais de empresários e gestores que alcançaram a Auto Gestão e transformaram seus lucros.' },
    'contato': { badge: 'Fale Conosco', title: 'Entre em contato com nossa equipe', content: 'Tire suas dúvidas ou agende uma reunião para iniciarmos a reestruturação da sua empresa.' },
    'recomendacoes': { badge: 'Recomendações Práticas', title: 'Livros e Filmes Recomendados', content: 'Indicações de leitura e conteúdo de alta qualidade selecionados por Antonio Geraldes para o seu crescimento.' },
    'nossa-equipe': { badge: 'Time de Especialistas', title: 'Nossa Equipe Corporativa', content: 'Profissionais experientes prontos para atuar na reestruturação e no crescimento do seu negócio.' },
    'imersao-omappa': { badge: 'Imersão Presencial', title: 'Imersão OMAPPA da Empresa Lucrativa', content: 'Treinamento intensivo presencial para desenhar o plano de crescimento financeiro e comercial do seu negócio.' },
    'materiais': { badge: 'Materiais Educativos', title: 'Baixe Nossos Ebooks de Gestão', content: 'Conteúdos cortesia e e-books práticos criados para alavancar a performance do seu negócio imediatamente.' }
  }

  const defaultTeamMembers = [
    {
      name: 'Antonio Geraldes',
      role: 'Fundador Smart Company & Mentor de Gestão',
      avatar: '/assets/antonio-geraldes.png',
      initials: 'AG',
      gradient: 'from-amber-500 to-amber-700',
      qualifications: [
        'Experiência em mais de 100 empresas de diversos portes.',
        'Expertise profunda em Diagnóstico Empresarial.',
        'Projetos Estruturados nas áreas Financeira, Comercial e Industrial.',
        'Especialista em Business Plan, Turn Key e Estratégia de Negócios.',
        'Atuação em Fusões e Aquisições (M&A).',
        'Mentor de Liderança, Team Building e Planejamento Estratégico.'
      ]
    },
    {
      name: 'Marina Nastari',
      role: 'Consultora de Gestão Financeira & Controladoria',
      avatar: '/assets/marina-nastari.png',
      initials: 'MN',
      gradient: 'from-blue-600 to-cyan-500',
      qualifications: [
        'MBA em Gestão Financeira, Controladoria e Auditoria pela FGV.',
        'Experiência consolidada em Instituições Financeiras.',
        'Atuação em diversos segmentos nos setores público e privado.',
        'Amplo conhecimento em normas de padronização e ISO.',
        'Especialista em implantação de KPI\'s, processos e sistemas.'
      ]
    },
    {
      name: 'Eudes Martins',
      role: 'Consultor de Finanças & Análise de Crédito',
      avatar: '/assets/eudes-martins.png',
      initials: 'EM',
      gradient: 'from-indigo-600 to-blue-500',
      qualifications: [
        'Mestre Profissional em Administração de Empresas.',
        'Pós-graduado em Administração Contábil e Financeira.',
        '27 anos de experiência no mercado financeiro (Itaú, Boston, Safra).',
        '15 anos lecionando como professor universitário.',
        'Vasta experiência em Avaliação de Contratos e Análise de Créditos.'
      ]
    },
    {
      name: 'José Maria Paz',
      role: 'Consultor de Gestão Industrial & Supply Chain',
      avatar: '/assets/jose-maria-paz.png',
      initials: 'JP',
      gradient: 'from-emerald-600 to-teal-500',
      qualifications: [
        'Engenheiro Mecânico e Gestor de Produção Industrial.',
        'Mais de 20 anos de experiência em multinacional japonesa.',
        'Consultor atuante de Gestão Industrial há mais de 8 anos.',
        'Amplo conhecimento em Gestão de Cadeia de Fornecimento (Supply Chain).',
        'Especialista em metodologias Kaizen, Lean Manufacturing, 5S e ISO.'
      ]
    },
    {
      name: 'Laercio Santos',
      role: 'Consultor de Governança de TI & Infraestrutura',
      avatar: '/assets/laercio-santos.png',
      initials: 'LS',
      gradient: 'from-purple-600 to-indigo-500',
      qualifications: [
        'Engenheiro pela FESP e especialista em Governança de TI pela FGV.',
        'Fundador da Metrobyte, com ampla vivência em arquitetura de redes.',
        'Atuação desde 1996 em grandes empresas (Vale, Avanade, Banco Fator, Banco Votorantim).',
        'Professor certificado Microsoft.'
      ]
    },
    {
      name: 'Eliezer Fernandes',
      role: 'Consultor de Processos Industriais & PCP',
      avatar: '/assets/eliezer-fernandes.png',
      initials: 'EF',
      gradient: 'from-teal-600 to-emerald-500',
      qualifications: [
        'Graduado em Ciências Contábeis pela Anhembi Morumbi.',
        'Especialização em Administração Financeira pela FGV.',
        '12 anos de experiência em Suprimentos e Planejamento e Controle de Produção (PCP).',
        'Atuação em gigantes industriais como Coca-Cola, Valtra e Albéa.'
      ]
    },
    {
      name: 'Jefferson Lara',
      role: 'Consultor de Clima Organizacional & Dinâmicas',
      avatar: '/assets/jefferson-lara.png',
      initials: 'JL',
      gradient: 'from-rose-600 to-pink-500',
      qualifications: [
        'MBA em Gente e Gestão de Pessoas.',
        'Especialista em Gestão de Mudança e Cultura Organizacional.',
        'Fundador da Jeff Jogos Empresariais.',
        '30 anos utilizando metodologia de dinâmicas vivenciais, artes cênicas e jogos de negócios.'
      ]
    },
    {
      name: 'Luana Segato',
      role: 'Consultora de Rotinas Comerciais & Inteligência de Vendas',
      avatar: '/assets/luana-segato.jpg',
      initials: 'LS',
      gradient: 'from-orange-500 to-amber-500',
      qualifications: [
        'MBA em Gestão Empresarial e Bacharel em Administração de Empresas.',
        'Experiência em Supervisão e Gestão de rotinas de equipes de vendas.',
        'Desenvolvimento e implantação de projetos de desempenho e KPI\'s Comerciais.',
        'Facilitadora em treinamentos, workshops e mapeamento de mercado.'
      ]
    },
    {
      name: 'Fátima Rizzo',
      role: 'Terapeuta Corporativa & Team Building',
      avatar: '/assets/fatima-rizzo.png',
      initials: 'FR',
      gradient: 'from-pink-600 to-rose-500',
      qualifications: [
        'Psicóloga Clínica especialista em Saúde Mental.',
        'Pós-graduada em Neuropsicopedagogia e MBA em Gestão de Pessoas pela FGV.',
        '20 anos atuando como docente em entidades industriais como FIESP e CIESP.',
        'Capacitou pessoalmente mais de 23.000 profissionais.',
        'Especialista em treinamentos de Team Building e Programação Neurolinguística (PNL).'
      ]
    },
    {
      name: 'Richard Portela',
      role: 'Consultor de Marketing Digital & Inbound Marketing',
      avatar: '/assets/richard-portela.png',
      initials: 'RP',
      gradient: 'from-cyan-600 to-blue-500',
      qualifications: [
        'Fundador da Fullweb Marketing Digital, com mais de 200 projetos concluídos.',
        'Certificado em Google AdWords, especialista em SEO (otimização de buscas) e SEM.',
        'Expertise em plataformas de e-commerce, sistemas de leilão e e-mail marketing.',
        'Especialista em metodologia de Inbound Marketing e tração digital.'
      ]
    }
  ]

  const defaultBooks = [
    {
      "title": "Você Pode Curar Sua Vida",
      "author": "Louise L. Hay",
      "review": "Eu passei a investir em ideias e vibrações positivas e vi como foi possível viver plenamente e melhorar a minha qualidade de vida. É um método de cura holística e Louise Hay ensina como aplicar em nossas vidas. Acredito que, com o tempo, os resultados serão ainda mais significativos.",
      "image": "https://covers.openlibrary.org/b/id/715608-M.jpg"
    },
    {
      "title": "Pai Rico Pai Pobre",
      "author": "Robert T. Kiyosaki",
      "review": "Pai Rico Pai Pobre ilustra a diferença entre ativos e passivos, o que ajuda a definir onde investir o dinheiro sem agregar ainda mais gastos. Este é um fator fundamental que separa os ricos dos demais.",
      "image": "https://covers.openlibrary.org/b/id/8315603-M.jpg"
    },
    {
      "title": "O Mito do Empreendedor",
      "author": "Michael E. Gerber",
      "review": "Ilustra de maneira clara o motivo de algumas empresas não prosperarem e como isso está ligado à mentalidade dos donos. Vale a pena conhecer o que Gerber tem a ensinar. Muitos empreendedores encontrarão insights valiosos para melhorar seus negócios, agindo de forma preventiva ao entender as armadilhas comuns.",
      "image": "https://covers.openlibrary.org/b/id/684209-M.jpg"
    },
    {
      "title": "Inteligência Positiva",
      "author": "Shirzad Chamine",
      "review": "Esse livro traz conhecimentos fantásticos para aprimorarmos nossa vida e identificarmos os sabotadores de nossa atenção plena, oferecendo insights valiosos sobre como desenvolver uma mentalidade positiva e resiliente.",
      "image": "https://covers.openlibrary.org/b/id/8283526-M.jpg"
    },
    {
      "title": "Um Novo Mundo",
      "author": "Eckhart Tolle",
      "review": "Todos temos um mundo dentro de nós e esse livro me ajudou a mergulhar dentro da minha cabeça, descobrindo sobre o quanto o nosso ego nos prejudica. Para entender melhor a nossa própria mente, é essencial explorar essas profundezas.",
      "image": "https://covers.openlibrary.org/b/id/10858608-M.jpg"
    },
    {
      "title": "Adams Óbvio",
      "author": "Robert R. Updegraff",
      "review": "É um livro curto e que vale a pena ler. A reflexão que nos traz é que quase sempre o sucesso é atrelado a ideias mirabolantes, mas na verdade é muito possível obter sucesso se apoiando apenas em informações claras e no bom senso.",
      "image": "https://covers.openlibrary.org/b/id/5161421-M.jpg"
    },
    {
      "title": "A Coragem de Ser Imperfeito",
      "author": "Brené Brown",
      "review": "Ajudou-me a entender que a vulnerabilidade não é uma fraqueza, mas sim a coragem de se mostrar humano. Traz assuntos importantes como a aceitação e o orgulho de sermos nós mesmos.",
      "image": "https://covers.openlibrary.org/b/id/7367250-M.jpg"
    },
    {
      "title": "O Obstáculo é o Caminho",
      "author": "Ryan Holiday",
      "review": "Introduziu-me ao estoicismo. Este livro traz princípios estoicos práticos por meio de histórias reais de grandes líderes como Steve Jobs e Theodore Roosevelt, mostrando que nas dificuldades encontramos o caminho do sucesso.",
      "image": "https://covers.openlibrary.org/b/id/14428233-M.jpg"
    },
    {
      "title": "A Maestria do Amor",
      "author": "Don Miguel Ruiz",
      "review": "Um livro para quem busca curar feridas emocionais e superar crenças que levam ao sofrimento em todo tipo de relação. Ajudou-me a conquistar o perdão de mim mesmo e dos outros, ensinando a importância da compaixão.",
      "image": "https://covers.openlibrary.org/b/id/924527-M.jpg"
    },
    {
      "title": "Conversas Difíceis",
      "author": "Douglas Stone, Bruce Patton e Sheila Heen",
      "review": "Ensina sobre comunicação estratégica, dando o passo a passo de como ter as conversas que mais tememos de maneira eficiente. Entender o ponto de vista do outro e usar diálogos construtivos facilita a resolução de conflitos corporativos.",
      "image": "https://covers.openlibrary.org/b/id/2555094-M.jpg"
    },
    {
      "title": "Não Diga Sim Quando Quer Dizer Não",
      "author": "Dr. Herbert Fensterheim e Jean Baer",
      "review": "Superou muito as minhas expectativas e foi um grande parceiro para que eu aprendesse de uma vez por todas a dizer não. Passei a ter mais autonomia e liberdade sobre as minhas próprias decisões diárias.",
      "image": "https://covers.openlibrary.org/b/id/4471367-M.jpg"
    },
    {
      "title": "O Motor da Liderança",
      "author": "Noel M. Tichy",
      "review": "Trouxe grandes estratégias que ajudaram a elevar meus projetos de liderança ao caminho certo. Para alcançar resultados sustentáveis, é fundamental aplicar essas práticas com o time no dia a dia.",
      "image": "https://covers.openlibrary.org/b/id/684240-M.jpg"
    },
    {
      "title": "As Vantagens da Adversidade",
      "author": "Paul G. Stoltz e Erik Weihenmayer",
      "review": "Uma ótima indicação para quem está passando por dificuldades na vida profissional. A reflexão sobre como lidar com adversidades e continuar motivado para seguir adiante é essencial para todo empresário.",
      "image": "https://covers.openlibrary.org/b/id/475381-M.jpg"
    },
    {
      "title": "O Verdadeiro Poder",
      "author": "Vicente Falconi",
      "review": "Cita o método Cumbuca de estudo e desenvolvimento de grupos gerenciais. Através de cases reais, o autor me mostrou pontos práticos fundamentais para ajudar uma empresa a se desenvolver de forma altamente saudável.",
      "image": "https://covers.openlibrary.org/b/id/12834730-M.jpg"
    },
    {
      "title": "Execução",
      "author": "Larry Bossidy e Ram Charan",
      "review": "Execução me mostrou como liderar de maneira eficiente e focada em resultados. Pude perceber, na prática, os impactos positivos que processos disciplinados trazem para a rotina da empresa.",
      "image": "https://covers.openlibrary.org/b/id/390814-M.jpg"
    },
    {
      "title": "Desculpability",
      "author": "João Cordeiro",
      "review": "Ressalta o quanto é preciso parar de dar desculpas e eliminar esse hábito corporativo. Mostra a necessidade de uma transformação de atitude e de assumir responsabilidades diretas sobre os resultados.",
      "image": "https://covers.openlibrary.org/b/id/12313165-M.jpg"
    },
    {
      "title": "A Única Coisa",
      "author": "Gary Keller e Jay Papasan",
      "review": "Esse livro me mostrou que o foco absoluto traz resultados extraordinários. Aprendi como identificar a prioridade única e direcionar esforços comerciais e operacionais para ela.",
      "image": "https://covers.openlibrary.org/b/id/10351762-M.jpg"
    },
    {
      "title": "A Startup Enxuta",
      "author": "Eric Ries",
      "review": "Apresenta o conceito \"Construir, Aprender e Mensurar\". O autor explica a metodologia de testes rápidos para diminuir riscos e validar produtos e serviços no mercado antes de investir grandes capitais.",
      "image": "https://covers.openlibrary.org/b/id/7104760-M.jpg"
    },
    {
      "title": "Pequenos Passos Para Mudar Sua Vida",
      "author": "Robert Maurer, PH.D.",
      "review": "Ensina que para alcançarmos objetivos complexos é melhor dar um pequeno passo de cada vez (Kaizen). Mudanças graduais e consistentes evitam a resistência natural do time ao novo.",
      "image": "https://covers.openlibrary.org/b/id/507718-M.jpg"
    }
  ]

  const defaultMovies = [
    {
      "title": "Jerry Maguire (1996)",
      "review": "Um agente de uma empresa internacional de gerenciamento de esportes pede demissão devido ao seu compromisso com suas crenças e honestidade. Ele reestrutura seu setor com um modelo de negócios focado na lealdade aos clientes, o que lhe permite transformar uma pequena operação em um verdadeiro concorrente de peso.",
      "image": "https://upload.wikimedia.org/wikipedia/en/e/ea/Jerry_Maguire_movie_poster.jpg"
    },
    {
      "title": "Joy: O Nome do Sucesso (2015)",
      "review": "Jennifer Lawrence brilha como Joy, uma presumível empreendedora com uma vida pessoal complicada. O filme narra os desafios de uma fundadora que inicia, protege suas patentes e escala uma empresa de manufatura, encontrando parcerias cruciais ao longo da jornada.",
      "image": "https://upload.wikimedia.org/wikipedia/en/d/d3/Joyfilmposter.jpg"
    },
    {
      "title": "Fome de Poder (2017)",
      "review": "Um retrato ousado do empresário Ray Kroc e a expansão internacional do McDonalds. A narrativa foca nas táticas comerciais agressivas e na reestruturação do modelo de franquia que moldou a ascensão da maior marca de fast-food do mundo.",
      "image": "https://upload.wikimedia.org/wikipedia/en/6/68/The_Founder_poster.png"
    },
    {
      "title": "Steve Jobs (2015)",
      "review": "Retrata os bastidores de três grandes lançamentos de produtos que definiram a história da tecnologia. O filme detalha o foco na perfeição do design, a liderança autocrática e os conflitos na gestão de equipes altamente criativas.",
      "image": "https://upload.wikimedia.org/wikipedia/en/a/aa/SteveJobsposter.jpg"
    },
    {
      "title": "O Lobo de Wall Street (2013)",
      "review": "Seguindo o sonho americano, um corretor ambicioso escala um negócio de vendas agressivas nos anos 80. O filme traz lições impactantes sobre o poder de persuasão em vendas, treinamento comercial ativo e a quebra de objeções de clientes.",
      "image": "https://upload.wikimedia.org/wikipedia/en/d/d8/The_Wolf_of_Wall_Street_%282013%29_poster.jpg"
    },
    {
      "title": "A Rede Social (2010)",
      "review": "A história do nascimento do Facebook. Mostra como uma ideia disruptiva ganha escala mundial. Traz o conceito de ser o primeiro a dominar o mercado e a importância de atrair grandes talentos e investidores estratégicos.",
      "image": "https://upload.wikimedia.org/wikipedia/en/8/8c/The_Social_Network_film_poster.png"
    },
    {
      "title": "À Procura da Felicidade (2006)",
      "review": "Um pai solteiro lutando contra a falência extrema consegue um estágio competitivo em uma corretora de valores. Destaca o valor da perseverança inabalável, resiliência comercial e o foco no payback de cada esforço de trabalho.",
      "image": "https://upload.wikimedia.org/wikipedia/en/8/81/Poster-pursuithappyness.jpg"
    },
    {
      "title": "O Poderoso Chefão (1972)",
      "review": "Um clássico absoluto sobre sucessão familiar, negociação, alianças estratégicas e proteção do negócio em mercados altamente competitivos.",
      "image": "https://upload.wikimedia.org/wikipedia/en/1/1c/The_Godfather_key_art.jpg"
    },
    {
      "title": "Coach Carter (2005)",
      "review": "Um técnico de basquete impõe regras rígidas de conduta aos seus atletas. O filme mostra como liderar e motivar equipes com base em respeito mútuo, disciplina e a busca constante por excelência acadêmica e esportiva.",
      "image": "https://upload.wikimedia.org/wikipedia/en/c/c3/Coach_Carter_poster.JPG"
    },
    {
      "title": "Uma Mente Brilhante (2001)",
      "review": "A trajetória de matemático John Nash e sua luta contra a esquizofrenia. Explora a resiliência mental e a busca por padrões e soluções em teoria dos jogos.",
      "image": "https://upload.wikimedia.org/wikipedia/en/b/b8/A_Beautiful_Mind_Poster.jpg"
    },
    {
      "title": "Um Senhor Estagiário (2015)",
      "review": "Um aposentado volta ao mercado por meio de um estágio sênior em uma startup de e-commerce de moda. Mostra as vantagens de locais de trabalho multigeracionais, integridade e troca de experiências de gestão.",
      "image": "https://upload.wikimedia.org/wikipedia/en/c/c9/The_Intern_Poster.jpg"
    },
    {
      "title": "Pegando Fogo (2015)",
      "review": "Um chef de cozinha talentoso reconstrói sua reputação em busca de estrelas Michelin. O filme ensina que a liderança centralizadora e agressiva falha se não for combinada com a valorização e a sintonia do time.",
      "image": "https://upload.wikimedia.org/wikipedia/en/2/21/Burnt_Poster_Updated.jpg"
    },
    {
      "title": "O Jogo da Imitação (2014)",
      "review": "A história de Alan Turing construindo a máquina precursora do computador moderno para decifrar mensagens alemãs na Segunda Guerra. Mostra o poder do trabalho em equipe interdisciplinar e do foco em problemas matemáticos.",
      "image": "https://upload.wikimedia.org/wikipedia/en/5/5e/The_Imitation_Game_poster.jpg"
    },
    {
      "title": "A Teoria de Tudo (2014)",
      "review": "A biografia extraordinária do astrofísico Stephen Hawking. Destaca a superação de limitações físicas extremas e a busca intelectual incessante por respostas sobre a física do universo.",
      "image": "https://upload.wikimedia.org/wikipedia/en/b/b8/The_Theory_of_Everything_poster_2014.jpg"
    },
    {
      "title": "O Diabo Veste Prada (2005)",
      "review": "Retrata os bastidores exigentes de uma grande revista de moda. Serve como case para analisar liderança autoritária, adaptação sob extrema pressão corporativa e dedicação a entregas impecáveis.",
      "image": "https://upload.wikimedia.org/wikipedia/en/e/e7/The_Devil_Wears_Prada_main_poster.jpg"
    },
    {
      "title": "Moneyball: O Homem Que Mudou o Jogo (2011)",
      "review": "O gerente do Oakland Athletics usa estatística e análise de dados (sabermetrics) para contratar jogadores subvalorizados e competir com grandes orçamentos. Revela a importância de quebrar velhos paradigmas industriais através de inteligência analítica.",
      "image": "https://upload.wikimedia.org/wikipedia/en/2/2e/Moneyball_Poster.jpg"
    },
    {
      "title": "Coco Antes de Chanel (2009)",
      "review": "A história real de Coco Chanel e a revolução da alta-costura. Revela a visão comercial disruptiva de simplificar a vestimenta feminina, transformando inovação estética em uma marca multinacional duradoura.",
      "image": "https://upload.wikimedia.org/wikipedia/en/e/ed/Coco_avant_Chanel_poster.png"
    },
    {
      "title": "Walt Antes do Mickey (2015)",
      "review": "Narra os primeiros anos difíceis da carreira de Walt Disney, ilustrando os inúmeros fracassos e falências que enfrentou antes de criar seu maior império de mídia e entretenimento mundial.",
      "image": "https://upload.wikimedia.org/wikipedia/en/8/83/Walt_Before_Mickey.jpg"
    }
  ]

  const defaultOpportunities = [
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

  const defaultValPhases = [
    { name: 'Valuation', desc: 'Conclusão técnica do valor justo do negócio sem contaminação emocional.' },
    { name: 'Teaser Comercial', desc: 'Elaboração de documento resumido sem identificação (preservando o sigilo).' },
    { name: 'NDA (Confidencialidade)', desc: 'Assinatura de termo legal antes de abrir qualquer dado estratégico.' },
    { name: 'Apresentação do Negócio', desc: 'Reunião qualificada para apresentação do plano financeiro e operacional.' },
    { name: 'Carta de Intenções', desc: 'Formalização do interesse de compra e alinhamento de termos básicos (LOI).' },
    { name: 'Estudos de Viabilidade', desc: 'Mapeamento de sinergias operacionais e pós-aquisição.' },
    { name: 'Acompanhamento de Due Diligence', desc: 'Apoio técnico na entrega de certidões, contabilidade e auditoria interna.' },
    { name: 'Formalização Jurídica', desc: 'Suporte na elaboração dos contratos definitivos de compra e venda (SPA).' }
  ]

  // States
  const [selectedPageId, setSelectedPageId] = useState<PageId>('quem-somos')
  const [activeEditorSection, setActiveEditorSection] = useState<string>('hero')
  const [previewViewport, setPreviewViewport] = useState<'desktop' | 'mobile'>('desktop')
  // const [showAdvancedMode, setShowAdvancedMode] = useState(false)

  // New visual builder lists states
  const [liveTeamMembers, setLiveTeamMembers] = useState<any[]>(defaultTeamMembers)
  const [liveBooks, setLiveBooks] = useState<any[]>(defaultBooks)
  const [liveMovies, setLiveMovies] = useState<any[]>(defaultMovies)
  const [liveValOpportunities, setLiveValOpportunities] = useState<any[]>(defaultOpportunities)
  const [liveValPhases, setLiveValPhases] = useState<any[]>(defaultValPhases)
  // Generic page hero images per page (for all pages in simple mode)
  // const [livePageImages, setLivePageImages] = useState<Record<string, string>>({})

  // Quem Somos States
  const [liveHero, setLiveHero] = useState<any>(defaultHero)
  const [liveMvv, setLiveMvv] = useState<any>(defaultMvv)
  const [liveValuesList, setLiveValuesList] = useState<any[]>(defaultValues)
  const [liveFounder, setLiveFounder] = useState<any>(defaultFounder)
  const [liveTimelineEvents, setLiveTimelineEvents] = useState<any[]>(defaultTimeline)
  const [liveClientsTitle, setLiveClientsTitle] = useState('Casos de Sucesso & Segmentos Atendidos')
  const [liveClientsDesc, setLiveClientsDesc] = useState('Ensinamos nossos clientes, mas também aprendemos com cada um. Nossa base de conhecimento é refinada diariamente através de desafios reais nos mais variados setores da economia.')
  const [liveClientsList, setLiveClientsList] = useState<any[]>(defaultClients)

  // Home States
  const [liveHomeHero, setLiveHomeHero] = useState<any>(defaultHomeHero)
  const [liveHomeReasons, setLiveHomeReasons] = useState<any[]>(defaultHomeReasons)

  // AG Expert States
  const [liveAgHero, setLiveAgHero] = useState<any>(defaultAgHero)
  const [liveAgFaqs, setLiveAgFaqs] = useState<any[]>(defaultAgFaqs)

  // Como Transformamos States
  const [liveCtHero, setLiveCtHero] = useState<any>(defaultCtHero)
  const [liveCtStats, setLiveCtStats] = useState<any[]>(defaultCtStats)
  const [liveCtFaqs, setLiveCtFaqs] = useState<any[]>(defaultCtFaqs)

  // Curso CIA States
  const [liveCiaHero, setLiveCiaHero] = useState<any>(defaultCiaHero)
  const [liveCiaFaqs, setLiveCiaFaqs] = useState<any[]>(defaultCiaFaqs)

  // Other Pages Heros State
  const [liveOtherHeros, setLiveOtherHeros] = useState<Record<string, any>>(defaultOtherHeros)

  /* COMMENTED UNUSED:
const updateLiveHeroField = (field: string, val: string) => {
    setIsDirty(true)
    if (selectedPageId === 'quem-somos') {
      setLiveHero((prev: any) => ({ ...prev, [field]: val }))
    } else if (selectedPageId === 'home') {
      setLiveHomeHero((prev: any) => ({ ...prev, [field]: val }))
    } else if (selectedPageId === 'ag-expert') {
      setLiveAgHero((prev: any) => ({ ...prev, [field]: val }))
    } else if (selectedPageId === 'como-transformamos') {
      setLiveCtHero((prev: any) => ({ ...prev, [field]: val }))
    } else if (selectedPageId === 'curso-cia') {
      setLiveCiaHero((prev: any) => ({ ...prev, [field]: val }))
    } else {
      setLiveOtherHeros((prev) => ({
        ...prev,
        [selectedPageId]: { ...prev[selectedPageId], [field]: val }
      }))
    }
  }
*/

  /* COMMENTED UNUSED:
const updateLiveMvvField = (field: string, val: string) => {
    setIsDirty(true)
    setLiveMvv((prev: any) => ({ ...prev, [field]: val }))
  }
*/

  /* COMMENTED UNUSED:
const updateLiveFounderField = (field: string, val: string) => {
    setIsDirty(true)
    setLiveFounder((prev: any) => ({ ...prev, [field]: val }))
  }
*/

  /* COMMENTED UNUSED:
const handleLiveListMetaChange = (section: 'values' | 'timeline' | 'reasons' | 'faqs' | 'stats' | 'cia-faqs' | 'clients', index: number, field: string, value: string) => {
    setIsDirty(true)
    if (section === 'values') {
      const list = [...liveValuesList]
      list[index] = { ...list[index], [field]: value }
      setLiveValuesList(list)
    } else if (section === 'timeline') {
      const list = [...liveTimelineEvents]
      list[index] = { ...list[index], [field]: value }
      setLiveTimelineEvents(list)
    } else if (section === 'reasons') {
      const list = [...liveHomeReasons]
      list[index] = { ...list[index], [field]: value }
      setLiveHomeReasons(list)
    } else if (section === 'faqs') {
      const list = [...liveAgFaqs]
      list[index] = { ...list[index], [field]: value }
      setLiveAgFaqs(list)
    } else if (section === 'stats') {
      const list = [...liveCtStats]
      list[index] = { ...list[index], [field]: value }
      setLiveCtStats(list)
    } else if (section === 'cia-faqs') {
      const list = [...liveCiaFaqs]
      list[index] = { ...list[index], [field]: value }
      setLiveCiaFaqs(list)
    } else if (section === 'clients') {
      const list = [...liveClientsList]
      list[index] = { ...list[index], [field]: value }
      setLiveClientsList(list)
    }
  }
*/

  /* COMMENTED UNUSED:
const addLiveListMetaItem = (section: 'values' | 'timeline' | 'reasons' | 'faqs' | 'stats' | 'cia-faqs' | 'clients') => {
    setIsDirty(true)
    if (section === 'values') {
      setLiveValuesList(prev => [...prev, { title: 'Novo Valor', desc: 'Descrição do valor corporativo...' }])
    } else if (section === 'timeline') {
      setLiveTimelineEvents(prev => [...prev, { year: '2026', title: 'Novo Evento', desc: 'Descrição do marco histórico...' }])
    } else if (section === 'reasons') {
      setLiveHomeReasons(prev => [...prev, { title: 'Nova Razão', desc: 'Descrição da razão...' }])
    } else if (section === 'faqs') {
      setLiveAgFaqs(prev => [...prev, { q: 'Nova Pergunta?', a: 'Nova resposta...' }])
    } else if (section === 'stats') {
      setLiveCtStats(prev => [...prev, { number: '100%', label: 'Nova Estatística' }])
    } else if (section === 'cia-faqs') {
      setLiveCiaFaqs(prev => [...prev, { q: 'Nova Pergunta?', a: 'Nova resposta...' }])
    } else if (section === 'clients') {
      setLiveClientsList(prev => [...prev, { name: 'NOVO CLIENTE', sector: 'Ramo / Setor de atuacão' }])
    }
  }
*/

  /* COMMENTED UNUSED:
const removeLiveListMetaItem = (section: 'values' | 'timeline' | 'reasons' | 'faqs' | 'stats' | 'cia-faqs' | 'clients', index: number) => {
    setIsDirty(true)
    if (section === 'values') {
      const list = [...liveValuesList]
      list.splice(index, 1)
      setLiveValuesList(list)
    } else if (section === 'timeline') {
      const list = [...liveTimelineEvents]
      list.splice(index, 1)
      setLiveTimelineEvents(list)
    } else if (section === 'reasons') {
      const list = [...liveHomeReasons]
      list.splice(index, 1)
      setLiveHomeReasons(list)
    } else if (section === 'faqs') {
      const list = [...liveAgFaqs]
      list.splice(index, 1)
      setLiveAgFaqs(list)
    } else if (section === 'stats') {
      const list = [...liveCtStats]
      list.splice(index, 1)
      setLiveCtStats(list)
    } else if (section === 'cia-faqs') {
      const list = [...liveCiaFaqs]
      list.splice(index, 1)
      setLiveCiaFaqs(list)
    } else if (section === 'clients') {
      const list = [...liveClientsList]
      list.splice(index, 1)
      setLiveClientsList(list)
    }
  }
*/

  // Sincronizar dados buscados com os estados de visualização/edição ao vivo
  useEffect(() => {
    // Reset defaults first
    let updatedHero = defaultHero
    let updatedMvv = defaultMvv
    let updatedValuesList = defaultValues
    let updatedFounder = defaultFounder
    let updatedTimelineEvents = defaultTimeline
    let updatedClientsTitle = 'Casos de Sucesso & Segmentos Atendidos'
    let updatedClientsDesc = 'Ensinamos nossos clientes, mas também aprendemos com cada um. Nossa base de conhecimento é refinada diariamente através de desafios reais nos mais variados setores da economia.'
    let updatedClientsList = defaultClients
    let updatedHomeHero = defaultHomeHero
    let updatedHomeReasons = defaultHomeReasons
    let updatedAgHero = defaultAgHero
    let updatedAgFaqs = defaultAgFaqs
    let updatedCtHero = defaultCtHero
    let updatedCtStats = defaultCtStats
    let updatedCtFaqs = defaultCtFaqs
    let updatedCiaHero = defaultCiaHero
    let updatedCiaFaqs = defaultCiaFaqs
    let updatedOtherHeros = { ...defaultOtherHeros }
    let updatedTeamMembers = defaultTeamMembers
    let updatedBooks = defaultBooks
    let updatedMovies = defaultMovies
    let updatedValOpportunities = defaultOpportunities
    let updatedValPhases = defaultValPhases

    if (sections.length > 0) {
      sections.forEach((sec: any) => {
        // Quem Somos
        if (sec.section_key === 'quemsomos_hero') {
          updatedHero = {
            title: sec.title || defaultHero.title,
            content: sec.content || defaultHero.content,
            badge: sec.metadata?.badge || defaultHero.badge
          }
        } else if (sec.section_key === 'quemsomos_mvv') {
          updatedMvv = {
            mission: sec.metadata?.mission || defaultMvv.mission,
            vision: sec.metadata?.vision || defaultMvv.vision,
            purpose_o_que: sec.metadata?.purpose_o_que || defaultMvv.purpose_o_que,
            purpose_como: sec.metadata?.purpose_como || defaultMvv.purpose_como,
            purpose_por_que: sec.metadata?.purpose_por_que || defaultMvv.purpose_por_que
          }
        } else if (sec.section_key === 'quemsomos_values') {
          updatedValuesList = sec.metadata?.values || defaultValues
        } else if (sec.section_key === 'quemsomos_founder') {
          updatedFounder = {
            founder_name: sec.metadata?.founder_name || defaultFounder.founder_name,
            founder_title: sec.metadata?.founder_title || defaultFounder.founder_title,
            image_url: sec.metadata?.image_url || defaultFounder.image_url,
            quote: sec.metadata?.quote || defaultFounder.quote,
            experience_summary: sec.metadata?.experience_summary || defaultFounder.experience_summary,
            biography: sec.content || defaultFounder.biography
          }
        } else if (sec.section_key === 'quemsomos_timeline') {
          updatedTimelineEvents = sec.metadata?.events || defaultTimeline
        } else if (sec.section_key === 'quemsomos_clients') {
          updatedClientsTitle = sec.title || 'Casos de Sucesso & Segmentos Atendidos'
          updatedClientsDesc = sec.content || ''
          updatedClientsList = sec.metadata?.clients || defaultClients
        }
        
        // Home
        else if (sec.section_key === 'home_hero') {
          updatedHomeHero = {
            title: sec.title || defaultHomeHero.title,
            content: sec.content || defaultHomeHero.content,
            badge: sec.metadata?.badge || defaultHomeHero.badge
          }
        } else if (sec.section_key === 'home_reasons') {
          updatedHomeReasons = sec.metadata?.reasons || defaultHomeReasons
        }

        // AG Expert
        else if (sec.section_key === 'agexpert_hero') {
          updatedAgHero = {
            title: sec.title || defaultAgHero.title,
            content: sec.content || defaultAgHero.content,
            badge: sec.metadata?.badge || defaultAgHero.badge
          }
        } else if (sec.section_key === 'agexpert_faqs') {
          updatedAgFaqs = sec.metadata?.faqs || defaultAgFaqs
        }

        // Como Transformamos
        else if (sec.section_key === 'comotransformamos_hero') {
          updatedCtHero = {
            title: sec.title || defaultCtHero.title,
            content: sec.content || defaultCtHero.content,
            subtitle: sec.metadata?.subtitle || defaultCtHero.subtitle,
            badge: sec.metadata?.badge || defaultCtHero.badge
          }
        } else if (sec.section_key === 'comotransformamos_stats') {
          updatedCtStats = sec.metadata?.stats || defaultCtStats
        } else if (sec.section_key === 'comotransformamos_faqs') {
          updatedCtFaqs = sec.metadata?.faqs || defaultCtFaqs
        }

        // Curso CIA
        else if (sec.section_key === 'cursocia_hero') {
          updatedCiaHero = {
            title: sec.title || defaultCiaHero.title,
            content: sec.content || defaultCiaHero.content,
            badge: sec.metadata?.badge || defaultCiaHero.badge
          }
        } else if (sec.section_key === 'cursocia_faqs') {
          updatedCiaFaqs = sec.metadata?.faqs || defaultCiaFaqs
        } else if (sec.section_key === 'nossa_equipe_members') {
          updatedTeamMembers = sec.metadata?.members || defaultTeamMembers
        } else if (sec.section_key === 'recomendacoes_items') {
          updatedBooks = sec.metadata?.books || defaultBooks
          updatedMovies = sec.metadata?.movies || defaultMovies
        } else if (sec.section_key === 'valuation_opportunities') {
          updatedValOpportunities = sec.metadata?.opportunities || defaultOpportunities
        } else if (sec.section_key === 'valuation_phases') {
          updatedValPhases = sec.metadata?.phases || defaultValPhases
        }

        // Other pages
        else {
          const match = sec.section_key.match(/^([a-z-]+)_hero$/)
          if (match) {
            const otherPageId = match[1]
            updatedOtherHeros[otherPageId] = {
              title: sec.title || defaultOtherHeros[otherPageId]?.title,
              content: sec.content || defaultOtherHeros[otherPageId]?.content,
              badge: sec.metadata?.badge || defaultOtherHeros[otherPageId]?.badge
            }
          }
        }
      })
    }

    // Load draft if exists in LocalStorage
    const draftStr = localStorage.getItem(`smartcompany_draft_${currentSlug}`)
    if (draftStr) {
      try {
        const draft = JSON.parse(draftStr)
        if (draft.liveHero) updatedHero = draft.liveHero
        if (draft.liveMvv) updatedMvv = draft.liveMvv
        if (draft.liveValuesList) updatedValuesList = draft.liveValuesList
        if (draft.liveFounder) updatedFounder = draft.liveFounder
        if (draft.liveTimelineEvents) updatedTimelineEvents = draft.liveTimelineEvents
        if (draft.liveClientsTitle) updatedClientsTitle = draft.liveClientsTitle
        if (draft.liveClientsDesc) updatedClientsDesc = draft.liveClientsDesc
        if (draft.liveClientsList) updatedClientsList = draft.liveClientsList
        if (draft.liveHomeHero) updatedHomeHero = draft.liveHomeHero
        if (draft.liveHomeReasons) updatedHomeReasons = draft.liveHomeReasons
        if (draft.liveAgHero) updatedAgHero = draft.liveAgHero
        if (draft.liveAgFaqs) updatedAgFaqs = draft.liveAgFaqs
        if (draft.liveCtHero) updatedCtHero = draft.liveCtHero
        if (draft.liveCtStats) updatedCtStats = draft.liveCtStats
        if (draft.liveCtFaqs) updatedCtFaqs = draft.liveCtFaqs
        if (draft.liveCiaHero) updatedCiaHero = draft.liveCiaHero
        if (draft.liveCiaFaqs) updatedCiaFaqs = draft.liveCiaFaqs
        if (draft.liveOtherHeros) updatedOtherHeros = draft.liveOtherHeros
        if (draft.liveTeamMembers) updatedTeamMembers = draft.liveTeamMembers
        if (draft.liveBooks) updatedBooks = draft.liveBooks
        if (draft.liveMovies) updatedMovies = draft.liveMovies
        if (draft.liveValOpportunities) updatedValOpportunities = draft.liveValOpportunities
        if (draft.liveValPhases) updatedValPhases = draft.liveValPhases
        setIsDirty(true)
      } catch (e) {
        console.error("Erro ao ler rascunho de LocalStorage:", e)
      }
    } else {
      setIsDirty(false)
    }

    setLiveHero(updatedHero)
    setLiveMvv(updatedMvv)
    setLiveValuesList(updatedValuesList)
    setLiveFounder(updatedFounder)
    setLiveTimelineEvents(updatedTimelineEvents)
    setLiveClientsTitle(updatedClientsTitle)
    setLiveClientsDesc(updatedClientsDesc)
    setLiveClientsList(updatedClientsList)
    setLiveHomeHero(updatedHomeHero)
    setLiveHomeReasons(updatedHomeReasons)
    setLiveAgHero(updatedAgHero)
    setLiveAgFaqs(updatedAgFaqs)
    setLiveCtHero(updatedCtHero)
    setLiveCtStats(updatedCtStats)
    setLiveCtFaqs(updatedCtFaqs)
    setLiveCiaHero(updatedCiaHero)
    setLiveCiaFaqs(updatedCiaFaqs)
    setLiveOtherHeros(updatedOtherHeros)
    setLiveTeamMembers(updatedTeamMembers)
    setLiveBooks(updatedBooks)
    setLiveMovies(updatedMovies)
    setLiveValOpportunities(updatedValOpportunities)
    setLiveValPhases(updatedValPhases)
  }, [sections])

  // AI Assistant Chat States
  const [chatMessages, setChatMessages] = useState<any[]>([
    {
      role: 'assistant',
      content: 'Olá! Sou o seu Assistente IA para o site Smart Company. Posso te ajudar a gerenciar seus artigos de blog, visualizar seus contatos ou atualizar o texto e imagens das páginas do seu site. O que gostaria de fazer hoje?'
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  // Auth Protection
  useEffect(() => {
    async function checkAuth() {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error || !session) {
        navigate(`/admin/${currentSlug}/login`)
      } else {
        setUserEmail(session.user?.email || `admin@${currentSlug}.com.br`)
        fetchData()
        fetchSections()
      }
    }
    checkAuth()
  }, [navigate, currentSlug])

  // Scroll Chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages, aiLoading])

  // Close post modal with the Escape key
  useEffect(() => {
    if (!isPostModalOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !actionLoading) setIsPostModalOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isPostModalOpen, actionLoading])

  // Data Fetching
  async function fetchData() {
    setLoading(true)
    try {
      const { data: dbPosts, error: postsError } = await supabase
        .from('posts')
        .select('*')
        .eq('site_slug', currentSlug)
        .order('id', { ascending: false })

      if (postsError) throw postsError
      setPosts(dbPosts || [])

      const { data: dbLeads, error: leadsError } = await supabase
        .from('leads')
        .select('*')
        .eq('site_slug', currentSlug)
        .order('created_at', { ascending: false })

      if (leadsError) throw leadsError
      setLeads(dbLeads || [])

      // Fetch site config
      const { data: dbSite, error: siteError } = await supabase
        .from('sites')
        .select('*')
        .eq('slug', currentSlug)
        .maybeSingle()

      if (siteError) throw siteError
      setSiteConfig(dbSite)

      // Fetch change requests
      const { data: dbRequests, error: reqError } = await supabase
        .from('change_requests')
        .select('*')
        .eq('site_slug', currentSlug)
        .order('created_at', { ascending: false })

      if (reqError) throw reqError
      setChangeRequests(dbRequests || [])

      // Fetch authorized phones
      const { data: dbPhones, error: phonesError } = await supabase
        .from('phones')
        .select('*')
        .eq('site_slug', currentSlug)
        .order('created_at', { ascending: false })

      if (phonesError) throw phonesError
      setAuthorizedPhones(dbPhones || [])

    } catch (err) {
      console.error('Erro ao buscar dados do painel:', err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch sections for CMS Page Editor
  async function fetchSections() {
    try {
      const { data: dbSections, error } = await supabase
        .from('site_sections')
        .select('*')
        .eq('site_slug', currentSlug)

      if (error) throw error
      setSections(dbSections || [])
    } catch (err) {
      console.error('Erro ao buscar seções:', err)
    }
  }

  // Multi-tenant change request handlers
  const handleApproveRequest = async (req: any) => {
    setActionLoading(true)
    try {
      let executionResult: any = null
      const payload = req.payload

      if (req.action === 'update_section' || req.action === 'update_sections') {
        const { data, error } = await supabase
          .from('site_sections')
          .upsert({
            site_slug: req.site_slug,
            section_key: payload.section_key,
            title: payload.title,
            content: payload.content,
            metadata: payload.metadata,
            updated_at: new Date().toISOString()
          }, { onConflict: 'site_slug,section_key' })
        if (error) throw error
        executionResult = { message: 'Seção atualizada com sucesso', data }
      } else if (req.action === 'update_contact' || req.action === 'update_contacts') {
        const { data, error } = await supabase
          .from('site_contacts')
          .upsert({
            site_slug: req.site_slug,
            key: payload.key,
            value: payload.value,
            type: payload.type,
            updated_at: new Date().toISOString()
          }, { onConflict: 'site_slug,key' })
        if (error) throw error
        executionResult = { message: 'Contato atualizado com sucesso', data }
      } else if (req.action === 'create_post') {
        const maxId = posts.reduce((max, p) => Math.max(max, Number(p.id)), 0)
        const { data, error } = await supabase
          .from('posts')
          .insert([{
            id: maxId + 1,
            site_slug: req.site_slug,
            title: payload.title,
            body: payload.body,
            slug: payload.slug || generateSlug(payload.title),
            category: payload.category || 'Gestão Empresarial',
            status: payload.status || 'published',
            published_at: new Date().toISOString(),
            created_at: new Date().toISOString()
          }])
        if (error) throw error
        executionResult = { message: 'Artigo criado com sucesso', data }
      } else if (req.action === 'update_post') {
        let query = supabase.from('posts').update({
          title: payload.title,
          body: payload.body,
          category: payload.category,
          status: payload.status,
          updated_at: new Date().toISOString()
        }).eq('site_slug', req.site_slug)

        if (payload.id) {
          query = query.eq('id', payload.id)
        } else if (payload.slug) {
          query = query.eq('slug', payload.slug)
        } else {
          throw new Error('Identificador do post não fornecido no payload (id ou slug)')
        }

        const { data, error } = await query
        if (error) throw error
        executionResult = { message: 'Artigo atualizado com sucesso', data }
      } else if (req.action === 'update_site' || req.action === 'update') {
        const { data, error } = await supabase
          .from('sites')
          .update({
            name: payload.name,
            domain: payload.domain,
            owner_name: payload.owner_name,
            owner_phone: payload.owner_phone,
            active: payload.active,
            updated_at: new Date().toISOString()
          })
          .eq('slug', req.site_slug)
        if (error) throw error
        executionResult = { message: 'Configurações do site atualizadas com sucesso', data }
      } else {
        executionResult = { message: `Ação '${req.action}' não possui execução automatizada mapeada no admin, mas foi marcada como aprovada.` }
      }

      // Update the change request status
      const { error: reqError } = await supabase
        .from('change_requests')
        .update({
          status: 'approved',
          pending_review: false,
          approved_at: new Date().toISOString(),
          approved_by: userEmail || 'admin',
          execution_result: executionResult
        })
        .eq('id', req.id)

      if (reqError) throw reqError

      // Log audit
      await supabase.from('audit_logs').insert([{
        site_slug: req.site_slug,
        event: 'change_request_approved',
        details: { request_id: req.id, action: req.action, executionResult },
        actor_phone: 'painel-admin',
        change_request_id: req.id
      }])

      toast('Solicitação aprovada e executada com sucesso!', 'success')
      fetchData()
      fetchSections()
    } catch (err: any) {
      console.error('Erro ao aprovar solicitação:', err)
      toast(`Erro ao aprovar solicitação: ${err.message}`, 'error')
    } finally {
      setActionLoading(false)
    }
  }

  const handleRejectRequest = async (req: any) => {
    const ok = await confirm({
      title: 'Rejeitar solicitação',
      message: 'Deseja realmente rejeitar esta solicitação? Esta ação não poderá ser desfeita.',
      confirmLabel: 'Rejeitar',
      tone: 'danger',
    })
    if (!ok) return
    setActionLoading(true)
    try {
      const { error: reqError } = await supabase
        .from('change_requests')
        .update({
          status: 'rejected',
          pending_review: false,
          updated_at: new Date().toISOString()
        })
        .eq('id', req.id)

      if (reqError) throw reqError

      // Log audit
      await supabase.from('audit_logs').insert([{
        site_slug: req.site_slug,
        event: 'change_request_rejected',
        details: { request_id: req.id, action: req.action },
        actor_phone: 'painel-admin',
        change_request_id: req.id
      }])

      toast('Solicitação rejeitada com sucesso!', 'success')
      fetchData()
    } catch (err: any) {
      console.error('Erro ao rejeitar solicitação:', err)
      toast(`Erro ao rejeitar solicitação: ${err.message}`, 'error')
    } finally {
      setActionLoading(false)
    }
  }

  // Authorized Phone handlers
  const handleAddPhone = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPhone.trim()) return
    setActionLoading(true)
    try {
      const { error } = await supabase
        .from('phones')
        .insert([{
          phone: newPhone.trim(),
          site_slug: currentSlug,
          role: 'admin',
          active: true,
          created_at: new Date().toISOString()
        }])

      if (error) throw error
      setNewPhone('')
      toast('Telefone adicionado com sucesso!', 'success')
      fetchData()
    } catch (err: any) {
      toast(`Erro ao adicionar telefone: ${err.message}`, 'error')
    } finally {
      setActionLoading(false)
    }
  }

  const handleDeletePhone = async (phoneStr: string) => {
    const ok = await confirm({
      title: 'Remover telefone',
      message: `Deseja realmente remover o telefone ${phoneStr} da lista de autorizados?`,
      confirmLabel: 'Remover',
      tone: 'danger',
    })
    if (!ok) return
    setActionLoading(true)
    try {
      const { error } = await supabase
        .from('phones')
        .delete()
        .eq('phone', phoneStr)
        .eq('site_slug', currentSlug)

      if (error) throw error
      toast('Telefone removido com sucesso!', 'success')
      fetchData()
    } catch (err: any) {
      toast(`Erro ao remover telefone: ${err.message}`, 'error')
    } finally {
      setActionLoading(false)
    }
  }

  // Update Site settings
  const handleUpdateSiteConfig = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!siteConfig) return
    setActionLoading(true)
    try {
      const { error } = await supabase
        .from('sites')
        .upsert({
          slug: currentSlug,
          name: siteConfig.name,
          domain: siteConfig.domain,
          owner_name: siteConfig.owner_name,
          owner_phone: siteConfig.owner_phone,
          active: siteConfig.active,
          updated_at: new Date().toISOString()
        }, { onConflict: 'slug' })

      if (error) throw error
      toast('Configurações do site salvas com sucesso!', 'success')
      fetchData()
    } catch (err: any) {
      toast(`Erro ao salvar configurações do site: ${err.message}`, 'error')
    } finally {
      setActionLoading(false)
    }
  }

  // Logout Handler
  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate(`/admin/${currentSlug}/login`)
  }

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const titleVal = e.target.value
    setPostFormData(prev => ({
      ...prev,
      title: titleVal,
      slug: prev.slug === '' || prev.slug === generateSlug(prev.title)
        ? generateSlug(titleVal)
        : prev.slug
    }))
  }

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // remove accents
      .replace(/[^a-z0-9\s-]/g, '')    // remove non-alphanumeric chars
      .replace(/[\s-]+/g, '-')         // replace spaces and multiple dashes with a single dash
      .replace(/^-+|-+$/g, '')         // trim leading/trailing dashes
  }

  // Open creation modal for Posts
  const openCreateModal = () => {
    setEditingPost(null)
    setPostFormData({
      title: '',
      slug: '',
      category: 'Gestão Empresarial',
      excerpt: '',
      body: '',
      read_time: '5 min de leitura',
      image_url: '',
      status: 'draft'
    })
    setIsPostModalOpen(true)
  }

  // Open edit modal for Posts
  const openEditModal = (post: any) => {
    setEditingPost(post)
    setPostFormData({
      title: post.title || '',
      slug: post.slug || '',
      category: post.category || 'Gestão Empresarial',
      excerpt: post.excerpt || '',
      body: post.body || '',
      read_time: post.read_time || '5 min de leitura',
      image_url: post.image_url || '',
      status: post.status || 'draft'
    })
    setIsPostModalOpen(true)
  }

  // Save/Update Post handler
  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault()
    setActionLoading(true)

    try {
      if (editingPost) {
        const { error } = await supabase
          .from('posts')
          .update({
            title: postFormData.title,
            slug: postFormData.slug,
            category: postFormData.category,
            excerpt: postFormData.excerpt,
            body: postFormData.body,
            read_time: postFormData.read_time,
            image_url: postFormData.image_url,
            status: postFormData.status,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingPost.id)

        if (error) throw error
      } else {
        const maxId = posts.reduce((max, p) => Math.max(max, Number(p.id)), 0)
        const newId = maxId + 1

        const { error } = await supabase
          .from('posts')
          .insert([{
            id: newId,
            site_slug: currentSlug,
            title: postFormData.title,
            slug: postFormData.slug,
            category: postFormData.category,
            excerpt: postFormData.excerpt,
            body: postFormData.body,
            read_time: postFormData.read_time,
            image_url: postFormData.image_url,
            status: postFormData.status,
            published_at: postFormData.status === 'published' ? new Date().toISOString() : null
          }])

        if (error) throw error
      }

      setIsPostModalOpen(false)
      toast(editingPost ? 'Artigo atualizado com sucesso!' : 'Artigo criado com sucesso!', 'success')
      fetchData()
    } catch (err: any) {
      toast(`Erro ao salvar artigo: ${err.message}`, 'error')
    } finally {
      setActionLoading(false)
    }
  }

  // Delete Post handler
  const handleDeletePost = async (id: number) => {
    const ok = await confirm({
      title: 'Excluir artigo',
      message: 'Tem certeza de que deseja excluir permanentemente este artigo? Esta ação não poderá ser desfeita.',
      confirmLabel: 'Excluir',
      tone: 'danger',
    })
    if (!ok) return

    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)

      if (error) throw error
      toast('Artigo excluído com sucesso.', 'success')
      fetchData()
    } catch (err: any) {
      toast(`Erro ao deletar artigo: ${err.message}`, 'error')
    }
  }

  // Delete Lead handler
  const handleDeleteLead = async (id: number) => {
    const ok = await confirm({
      title: 'Excluir contato',
      message: 'Tem certeza de que deseja excluir este contato? Esta ação não poderá ser desfeita.',
      confirmLabel: 'Excluir',
      tone: 'danger',
    })
    if (!ok) return

    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', id)

      if (error) throw error
      toast('Contato excluído com sucesso.', 'success')
      fetchData()
    } catch (err: any) {
      toast(`Erro ao deletar lead: ${err.message}`, 'error')
    }
  }

  // Formatting utils
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '-'
    const date = new Date(dateStr)
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }



  const iframeRef = useRef<HTMLIFrameElement>(null)

  // â”€â”€â”€ Simple Mode Helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // Compute current page's main title (hero title)
  /* COMMENTED UNUSED:
const getSimplePageTitle = (): string => {
    if (selectedPageId === 'quem-somos') return liveHero.title || ''
    if (selectedPageId === 'home') return liveHomeHero.title || ''
    if (selectedPageId === 'ag-expert') return liveAgHero.title || ''
    if (selectedPageId === 'como-transformamos') return liveCtHero.title || ''
    if (selectedPageId === 'curso-cia') return liveCiaHero.title || ''
    return liveOtherHeros[selectedPageId]?.title || defaultOtherHeros[selectedPageId]?.title || ''
  }
*/

  // Compute current page's main content (hero content/description)
  /* COMMENTED UNUSED:
const getSimplePageContent = (): string => {
    if (selectedPageId === 'quem-somos') return liveHero.content || ''
    if (selectedPageId === 'home') return liveHomeHero.content || ''
    if (selectedPageId === 'ag-expert') return liveAgHero.content || ''
    if (selectedPageId === 'como-transformamos') return liveCtHero.content || ''
    if (selectedPageId === 'curso-cia') return liveCiaHero.content || ''
    return liveOtherHeros[selectedPageId]?.content || defaultOtherHeros[selectedPageId]?.content || ''
  }
*/

  // Get image for current page in simple mode
  /* COMMENTED UNUSED:
const getSimplePageImage = (): string => {
    // For 'quem-somos', use founder image as the primary image
    if (selectedPageId === 'quem-somos') return liveFounder.image_url || ''
    return livePageImages[selectedPageId] || ''
  }
*/

  // Set image for current page in simple mode
  /* COMMENTED UNUSED:
const setSimplePageImage = (url: string) => {
    setIsDirty(true)
    if (selectedPageId === 'quem-somos') {
      updateLiveFounderField('image_url', url)
    } else {
      setLivePageImages(prev => ({ ...prev, [selectedPageId]: url }))
    }
  }
*/
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  // Determine tabs for the selected page
  const getPageTabs = () => {
    switch (selectedPageId) {
      case 'home':
        return [
          { key: 'hero', label: 'Hero' },
          { key: 'reasons', label: 'Razões' }
        ]
      case 'quem-somos':
        return [
          { key: 'hero', label: 'Hero' },
          { key: 'mvv', label: 'M.V.V.' },
          { key: 'values', label: 'Valores' },
          { key: 'founder', label: 'Fundador' },
          { key: 'timeline', label: 'Timeline' }
        ]
      case 'ag-expert':
        return [
          { key: 'hero', label: 'Hero' },
          { key: 'faqs', label: 'FAQs' }
        ]
      case 'como-transformamos':
        return [
          { key: 'hero', label: 'Hero' },
          { key: 'stats', label: 'Stats' },
          { key: 'faqs', label: 'FAQs' }
        ]
      case 'curso-cia':
        return [
          { key: 'hero', label: 'Hero' },
          { key: 'faqs', label: 'FAQs' }
        ]
      default:
        return [
          { key: 'hero', label: 'Hero Banner' }
        ]
    }
  }

  // Reset active tab section if it doesn't belong to the newly selected page
  useEffect(() => {
    const validTabs = getPageTabs()
    const isCurrentSectionValid = validTabs.some(t => t.key === activeEditorSection)
    if (!isCurrentSectionValid) {
      setActiveEditorSection('hero')
    }
  }, [selectedPageId])

  const sendPreviewUpdate = () => {
    // Edits are now saved directly to the database. The iframe reloads on save to show the updated content.
    // Stale local React states in Dashboard are not used, so we do not send preview updates anymore.
  }

  // Sincronizar alterações locais com o iframe em tempo real
  useEffect(() => {
    sendPreviewUpdate()
    const t = setTimeout(sendPreviewUpdate, 200)
    return () => clearTimeout(t)
  }, [
    selectedPageId,
    liveHero,
    liveMvv,
    liveValuesList,
    liveFounder,
    liveTimelineEvents,
    liveClientsTitle,
    liveClientsDesc,
    liveClientsList,
    liveHomeHero,
    liveHomeReasons,
    liveAgHero,
    liveAgFaqs,
    liveCtHero,
    liveCtStats,
    liveCtFaqs,
    liveCiaHero,
    liveCiaFaqs,
    liveOtherHeros,
    liveTeamMembers,
    liveBooks,
    liveMovies,
    liveValOpportunities,
    liveValPhases
  ])

  // handleSavePage has been consolidated into handlePublishSite and handleSaveAllPagesToDatabase

  // Save private local draft in LocalStorage
  /* COMMENTED UNUSED:
const handleSaveDraft = () => {
    const draftData = {
      liveHero,
      liveMvv,
      liveValuesList,
      liveFounder,
      liveTimelineEvents,
      liveClientsTitle,
      liveClientsDesc,
      liveClientsList,
      liveHomeHero,
      liveHomeReasons,
      liveAgHero,
      liveAgFaqs,
      liveCtHero,
      liveCtStats,
      liveCtFaqs,
      liveCiaHero,
      liveCiaFaqs,
      liveOtherHeros,
      liveTeamMembers,
      liveBooks,
      liveMovies,
      liveValOpportunities,
      liveValPhases
    }
    localStorage.setItem(`smartcompany_draft_${currentSlug}`, JSON.stringify(draftData))
    setIsDirty(true)
    alert("💾 Rascunho salvo com sucesso no seu navegador!")
  }
*/

  // Discard local drafts and reload published DB content
  /* COMMENTED UNUSED:
const handleDiscardDraft = () => {
    if (!window.confirm("Deseja realmente descartar todas as alterações em rascunho e restaurar a versão publicada do site?")) return
    localStorage.removeItem(`smartcompany_draft_${currentSlug}`)
    setIsDirty(false)
    fetchSections()
  }
*/

  // Save all pages content to Database
  /* COMMENTED UNUSED:
const handleSaveAllPagesToDatabase = async () => {
    // 1. Home
    const { error: homeHeroErr } = await supabase.from('site_sections').upsert({
      site_slug: currentSlug,
      section_key: 'home_hero',
      title: liveHomeHero.title,
      content: liveHomeHero.content,
      metadata: { badge: liveHomeHero.badge },
      updated_at: new Date().toISOString()
    }, { onConflict: 'site_slug,section_key' })
    if (homeHeroErr) throw homeHeroErr

    const { error: homeReasonsErr } = await supabase.from('site_sections').upsert({
      site_slug: currentSlug,
      section_key: 'home_reasons',
      title: 'Por Que Escolher a Smart Company',
      content: '',
      metadata: { reasons: liveHomeReasons },
      updated_at: new Date().toISOString()
    }, { onConflict: 'site_slug,section_key' })
    if (homeReasonsErr) throw homeReasonsErr

    // 2. Quem Somos
    const { error: qsHeroErr } = await supabase.from('site_sections').upsert({
      site_slug: currentSlug,
      section_key: 'quemsomos_hero',
      title: liveHero.title,
      content: liveHero.content,
      metadata: { badge: liveHero.badge },
      updated_at: new Date().toISOString()
    }, { onConflict: 'site_slug,section_key' })
    if (qsHeroErr) throw qsHeroErr

    const { error: qsMvvErr } = await supabase.from('site_sections').upsert({
      site_slug: currentSlug,
      section_key: 'quemsomos_mvv',
      title: 'Missão, Visão e Propósito',
      content: '',
      metadata: {
        mission: liveMvv.mission,
        vision: liveMvv.vision,
        purpose_o_que: liveMvv.purpose_o_que,
        purpose_como: liveMvv.purpose_como,
        purpose_por_que: liveMvv.purpose_por_que
      },
      updated_at: new Date().toISOString()
    }, { onConflict: 'site_slug,section_key' })
    if (qsMvvErr) throw qsMvvErr

    const { error: qsValErr } = await supabase.from('site_sections').upsert({
      site_slug: currentSlug,
      section_key: 'quemsomos_values',
      title: 'Nossos Valores Inegociáveis',
      content: 'Nossa conduta diária é ditada por princípios...',
      metadata: { values: liveValuesList },
      updated_at: new Date().toISOString()
    }, { onConflict: 'site_slug,section_key' })
    if (qsValErr) throw qsValErr

    const { error: qsFounderErr } = await supabase.from('site_sections').upsert({
      site_slug: currentSlug,
      section_key: 'quemsomos_founder',
      title: 'Trajetória do Fundador',
      content: liveFounder.biography,
      metadata: {
        founder_name: liveFounder.founder_name,
        founder_title: liveFounder.founder_title,
        image_url: liveFounder.image_url,
        quote: liveFounder.quote,
        experience_summary: liveFounder.experience_summary
      },
      updated_at: new Date().toISOString()
    }, { onConflict: 'site_slug,section_key' })
    if (qsFounderErr) throw qsFounderErr

    const { error: qsTimelineErr } = await supabase.from('site_sections').upsert({
      site_slug: currentSlug,
      section_key: 'quemsomos_timeline',
      title: 'Nossa Linha do Tempo',
      content: 'Acompanhe a trajetória de marcos históricos...',
      metadata: { events: liveTimelineEvents },
      updated_at: new Date().toISOString()
    }, { onConflict: 'site_slug,section_key' })
    if (qsTimelineErr) throw qsTimelineErr

    const { error: qsClientsErr } = await supabase.from('site_sections').upsert({
      site_slug: currentSlug,
      section_key: 'quemsomos_clients',
      title: liveClientsTitle,
      content: liveClientsDesc,
      metadata: { clients: liveClientsList },
      updated_at: new Date().toISOString()
    }, { onConflict: 'site_slug,section_key' })
    if (qsClientsErr) throw qsClientsErr

    // 3. AG Expert
    const { error: agHeroErr } = await supabase.from('site_sections').upsert({
      site_slug: currentSlug,
      section_key: 'agexpert_hero',
      title: liveAgHero.title,
      content: liveAgHero.content,
      metadata: { badge: liveAgHero.badge },
      updated_at: new Date().toISOString()
    }, { onConflict: 'site_slug,section_key' })
    if (agHeroErr) throw agHeroErr

    const { error: agFaqsErr } = await supabase.from('site_sections').upsert({
      site_slug: currentSlug,
      section_key: 'agexpert_faqs',
      title: 'Perguntas Frequentes - AG Expert',
      content: '',
      metadata: { faqs: liveAgFaqs },
      updated_at: new Date().toISOString()
    }, { onConflict: 'site_slug,section_key' })
    if (agFaqsErr) throw agFaqsErr

    // 4. Como Transformamos
    const { error: ctHeroErr } = await supabase.from('site_sections').upsert({
      site_slug: currentSlug,
      section_key: 'comotransformamos_hero',
      title: liveCtHero.title,
      content: liveCtHero.content,
      metadata: { badge: liveCtHero.badge, subtitle: liveCtHero.subtitle },
      updated_at: new Date().toISOString()
    }, { onConflict: 'site_slug,section_key' })
    if (ctHeroErr) throw ctHeroErr

    const { error: ctStatsErr } = await supabase.from('site_sections').upsert({
      site_slug: currentSlug,
      section_key: 'comotransformamos_stats',
      title: 'Estatísticas de Sucesso',
      content: '',
      metadata: { stats: liveCtStats },
      updated_at: new Date().toISOString()
    }, { onConflict: 'site_slug,section_key' })
    if (ctStatsErr) throw ctStatsErr

    const { error: ctFaqsErr } = await supabase.from('site_sections').upsert({
      site_slug: currentSlug,
      section_key: 'comotransformamos_faqs',
      title: 'Perguntas Frequentes - Consultoria',
      content: '',
      metadata: { faqs: liveCtFaqs },
      updated_at: new Date().toISOString()
    }, { onConflict: 'site_slug,section_key' })
    if (ctFaqsErr) throw ctFaqsErr

    // 5. Curso CIA
    const { error: ciaHeroErr } = await supabase.from('site_sections').upsert({
      site_slug: currentSlug,
      section_key: 'cursocia_hero',
      title: liveCiaHero.title,
      content: liveCiaHero.content,
      metadata: { badge: liveCiaHero.badge },
      updated_at: new Date().toISOString()
    }, { onConflict: 'site_slug,section_key' })
    if (ciaHeroErr) throw ciaHeroErr

    const { error: ciaFaqsErr } = await supabase.from('site_sections').upsert({
      site_slug: currentSlug,
      section_key: 'cursocia_faqs',
      title: 'Perguntas Frequentes - Programa CIA',
      content: '',
      metadata: { faqs: liveCiaFaqs },
      updated_at: new Date().toISOString()
    }, { onConflict: 'site_slug,section_key' })
    if (ciaFaqsErr) throw ciaFaqsErr

    // 6. Other Pages
    for (const pageId of Object.keys(liveOtherHeros)) {
      const pageHero = liveOtherHeros[pageId]
      if (pageHero) {
        const { error: otherErr } = await supabase.from('site_sections').upsert({
          site_slug: currentSlug,
          section_key: `${pageId}_hero`,
          title: pageHero.title,
          content: pageHero.content,
          metadata: { badge: pageHero.badge },
          updated_at: new Date().toISOString()
        }, { onConflict: 'site_slug,section_key' })
        if (otherErr) throw otherErr
      }
    }

    // 7. Nossa Equipe Members
    const { error: teamMembersErr } = await supabase.from('site_sections').upsert({
      site_slug: currentSlug,
      section_key: 'nossa_equipe_members',
      title: 'Integrantes da Equipe',
      content: '',
      metadata: { members: liveTeamMembers },
      updated_at: new Date().toISOString()
    }, { onConflict: 'site_slug,section_key' })
    if (teamMembersErr) throw teamMembersErr

    // 8. Recomendações Items
    const { error: recItemsErr } = await supabase.from('site_sections').upsert({
      site_slug: currentSlug,
      section_key: 'recomendacoes_items',
      title: 'Itens Recomendados',
      content: '',
      metadata: { books: liveBooks, movies: liveMovies },
      updated_at: new Date().toISOString()
    }, { onConflict: 'site_slug,section_key' })
    if (recItemsErr) throw recItemsErr

    // 9. Valuation Opportunities
    const { error: valOppErr } = await supabase.from('site_sections').upsert({
      site_slug: currentSlug,
      section_key: 'valuation_opportunities',
      title: 'Oportunidades de Negócios',
      content: '',
      metadata: { opportunities: liveValOpportunities },
      updated_at: new Date().toISOString()
    }, { onConflict: 'site_slug,section_key' })
    if (valOppErr) throw valOppErr

    // 10. Valuation Phases
    const { error: valPhasesErr } = await supabase.from('site_sections').upsert({
      site_slug: currentSlug,
      section_key: 'valuation_phases',
      title: 'Fases da Estruturação de Venda',
      content: '',
      metadata: { phases: liveValPhases },
      updated_at: new Date().toISOString()
    }, { onConflict: 'site_slug,section_key' })
    if (valPhasesErr) throw valPhasesErr

    await fetchSections()
  }
*/

  // Publish Site to Production (Vercel Simulation + DB Sync)
  /* COMMENTED UNUSED:
const handlePublishSite = async () => {
    setIsPublishing(true)
    setPublishingStep(0)
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

    try {
      await delay(900)
      setPublishingStep(1)
      await delay(900)
      setPublishingStep(2)
      await delay(900)
      setPublishingStep(3)
      await delay(600)

      await handleSaveAllPagesToDatabase()
      localStorage.removeItem(`smartcompany_draft_${currentSlug}`)
      setIsDirty(false)
    } catch (err: any) {
      alert("Erro ao publicar: " + err.message)
    } finally {
      setIsPublishing(false)
    }
  }
*/

  // OpenAI copywriter logic to improve fields in real-time
  /* COMMENTED UNUSED:
const handleImproveField = async (fieldKey: string, currentValue: string, updateFn: (val: string) => void) => {
    if (!currentValue || !currentValue.trim()) return
    setImprovingField(fieldKey)
    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY
      if (!apiKey) {
        alert("âš ï¸ Chave OpenAI ausente no arquivo .env do seu projeto.")
        return
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'Você é um redator publicitário de elite especializado em copy para sites corporativos premium de consultoria, valuation e gestão de negócios. Seu objetivo é aprimorar o texto fornecido pelo usuário, tornando-o mais impactante, persuasivo, profissional e atraente para empresários. Mantenha o idioma em português do Brasil. Retorne APENAS o texto aprimorado final, sem aspas, explicações ou introduções.'
            },
            {
              role: 'user',
              content: `Aprimore o seguinte texto para o site: "${currentValue}"`
            }
          ]
        })
      })

      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const data = await response.json()
      const improvedText = data.choices[0]?.message?.content?.trim()
      if (improvedText) {
        updateFn(improvedText)
        setIsDirty(true)
      }
    } catch (err: any) {
      console.error("Erro ao melhorar texto:", err)
      alert("Erro ao melhorar texto com IA: " + err.message)
    } finally {
      setImprovingField(null)
    }
  }
*/

  // --- AI ASSISTANT METHODS (Function Calling/gpt-5-mini with fallback) ---
  const runAITool = async (name: string, args: any) => {
    console.log(`AI executando ação: ${name}`, args)
    
    switch (name) {
      case 'get_blog_posts': {
        const { data } = await supabase.from('posts').select('*').eq('site_slug', currentSlug)
        return data || []
      }
      case 'create_blog_post': {
        const maxId = posts.reduce((max, p) => Math.max(max, Number(p.id)), 0)
        const { error } = await supabase.from('posts').insert([{
          id: maxId + 1,
          site_slug: currentSlug,
          title: args.title,
          slug: args.slug || generateSlug(args.title),
          category: args.category || 'Gestão Empresarial',
          body: args.body,
          read_time: args.read_time || '5 min de leitura',
          excerpt: args.excerpt || '',
          status: args.status || 'draft',
          published_at: args.status === 'published' ? new Date().toISOString() : null
        }])
        if (error) throw error
        await fetchData()
        return { success: true, message: `Post "${args.title}" criado com sucesso!` }
      }
      case 'update_blog_post': {
        const { error } = await supabase.from('posts').update({
          title: args.title,
          slug: args.slug,
          category: args.category,
          body: args.body,
          read_time: args.read_time,
          excerpt: args.excerpt,
          status: args.status,
          updated_at: new Date().toISOString()
        }).eq('id', args.id).eq('site_slug', currentSlug)
        if (error) throw error
        await fetchData()
        return { success: true, message: `Post ID ${args.id} atualizado com sucesso!` }
      }
      case 'delete_blog_post': {
        const { error } = await supabase.from('posts').delete().eq('id', args.id).eq('site_slug', currentSlug)
        if (error) throw error
        await fetchData()
        return { success: true, message: `Post ID ${args.id} excluído.` }
      }
      case 'get_site_sections': {
        const { data } = await supabase.from('site_sections').select('*').eq('site_slug', currentSlug)
        return data || []
      }
      case 'update_site_section': {
        const { error } = await supabase.from('site_sections').upsert({
          site_slug: currentSlug,
          section_key: args.section_key,
          title: args.title,
          content: args.content,
          metadata: args.metadata,
          updated_at: new Date().toISOString()
        }, { onConflict: 'site_slug,section_key' })
        if (error) throw error
        await fetchSections()
        return { success: true, message: `Seção "${args.section_key}" atualizada no banco de dados.` }
      }
      case 'get_leads': {
        const { data } = await supabase.from('leads').select('*').eq('site_slug', currentSlug)
        return data || []
      }
      default:
        throw new Error(`Ação não suportada: ${name}`)
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim() || aiLoading) return

    const userMsg = inputMessage
    setInputMessage('')
    setChatMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setAiLoading(true)

    // Check OpenAI API key
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY
    if (!apiKey) {
      setChatMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'âš ï¸ Chave OpenAI ausente no arquivo .env do seu projeto. Por favor, adicione VITE_OPENAI_API_KEY no arquivo .env para ativar a inteligência do Assistente.'
        }
      ])
      setAiLoading(false)
      return
    }

    // Tools definition for OpenAI
    const tools = [
      {
        type: 'function',
        function: {
          name: 'get_blog_posts',
          description: 'Lista todos os artigos do blog cadastrados no banco.'
        }
      },
      {
        type: 'function',
        function: {
          name: 'create_blog_post',
          description: 'Cria um novo artigo no blog.',
          parameters: {
            type: 'object',
            properties: {
              title: { type: 'string', description: 'Título do post' },
              slug: { type: 'string', description: 'URL amigável opcional (gerada do título se vazia)' },
              category: { type: 'string', enum: ['Vendas & Comercial', 'Liderança & Equipes', 'Gestão Financeira', 'Estratégia & Planejamento', 'Gestão Empresarial'] },
              read_time: { type: 'string', description: 'Tempo estimado de leitura (ex: "5 min de leitura")' },
              excerpt: { type: 'string', description: 'Breve resumo de introdução' },
              body: { type: 'string', description: 'Conteúdo em texto/HTML do artigo' },
              status: { type: 'string', enum: ['draft', 'published'], description: 'Estado: draft para rascunho, published para publicar' }
            },
            required: ['title', 'body']
          }
        }
      },
      {
        type: 'function',
        function: {
          name: 'update_blog_post',
          description: 'Edita um artigo existente pelo ID.',
          parameters: {
            type: 'object',
            properties: {
              id: { type: 'number', description: 'ID numérico do post' },
              title: { type: 'string' },
              slug: { type: 'string' },
              category: { type: 'string' },
              read_time: { type: 'string' },
              excerpt: { type: 'string' },
              body: { type: 'string' },
              status: { type: 'string', enum: ['draft', 'published'] }
            },
            required: ['id']
          }
        }
      },
      {
        type: 'function',
        function: {
          name: 'delete_blog_post',
          description: 'Exclui um artigo pelo ID.',
          parameters: {
            type: 'object',
            properties: {
              id: { type: 'number' }
            },
            required: ['id']
          }
        }
      },
      {
        type: 'function',
        function: {
          name: 'get_site_sections',
          description: 'Lista todas as seções dinâmicas de páginas do site (Hero, Missão, Valores, Linha do Tempo).'
        }
      },
      {
        type: 'function',
        function: {
          name: 'update_site_section',
          description: 'Atualiza o texto, título ou metadata de uma seção específica da página.',
          parameters: {
            type: 'object',
            properties: {
              section_key: { type: 'string', description: 'Chave da seção: quemsomos_hero, quemsomos_mvv, quemsomos_values, quemsomos_founder, quemsomos_timeline' },
              title: { type: 'string', description: 'Título da seção' },
              content: { type: 'string', description: 'Conteúdo textual principal da seção (ex: biografia do fundador)' },
              metadata: { 
                type: 'object', 
                description: 'Metadados JSON estruturados. Hero: {badge}. MVV: {mission, vision, purpose_o_que, purpose_como, purpose_por_que}. Values: {values: [{title, desc}]}. Founder: {founder_name, founder_title, image_url, quote, experience_summary}. Timeline: {events: [{year, title, desc}]}' 
              }
            },
            required: ['section_key']
          }
        }
      },
      {
        type: 'function',
        function: {
          name: 'get_leads',
          description: 'Lista todas as mensagens de contatos recebidas pelo formulário.'
        }
      }
    ]

    // API completion executor with Model Fallback
    async function requestCompletion(model: string, history: any[]): Promise<any> {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: 'system',
              content: 'Você é o Assistente Administrativo Inteligente do site Smart Company. Você tem acesso a ferramentas para listar/criar/editar/excluir artigos do blog, ler mensagens e atualizar o conteúdo de seções da página institucional (Quem Somos). Sempre que alterar o banco com sucesso, confirme ao usuário de forma amigável.'
            },
            ...history.map(m => ({ role: m.role, content: m.content, tool_calls: m.tool_calls, name: m.name, tool_call_id: m.tool_call_id }))
          ],
          tools: tools,
          tool_choice: 'auto'
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error?.message || `HTTP ${response.status}`)
      }

      return await response.json()
    }

    try {
      let history = [...chatMessages, { role: 'user', content: userMsg }]
      let attempts = 0
      let maxAttempts = 3 // prevent infinite loops in tool executions
      let currentModel = 'gpt-5-mini'
      let apiResult: any = null

      // Loop to handle tool call sequences (agent loop)
      while (attempts < maxAttempts) {
        try {
          apiResult = await requestCompletion(currentModel, history)
        } catch (err: any) {
          // If model is not found/supported, fallback to gpt-4o-mini
          if (currentModel === 'gpt-5-mini' && (err.message.includes('model') || err.message.includes('404') || err.message.includes('not found') || err.message.includes('permission'))) {
            console.warn('gpt-5-mini falhou. Executando fallback para gpt-4o-mini...')
            currentModel = 'gpt-4o-mini'
            apiResult = await requestCompletion(currentModel, history)
          } else {
            throw err
          }
        }

        const message = apiResult.choices[0].message
        
        if (message.tool_calls && message.tool_calls.length > 0) {
          // Add assistant message (which contains the tool calls) to the history
          history.push(message)

          // Execute each tool call
          for (const toolCall of message.tool_calls) {
            try {
              const args = JSON.parse(toolCall.function.arguments)
              const toolResult = await runAITool(toolCall.function.name, args)
              
              history.push({
                role: 'tool',
                tool_call_id: toolCall.id,
                name: toolCall.function.name,
                content: JSON.stringify(toolResult)
              })
            } catch (toolErr: any) {
              history.push({
                role: 'tool',
                tool_call_id: toolCall.id,
                name: toolCall.function.name,
                content: JSON.stringify({ error: toolErr.message })
              })
            }
          }
          
          attempts++
        } else {
          // Final text reply from assistant
          setChatMessages(prev => [...prev, { role: 'assistant', content: message.content }])
          break
        }
      }

      if (attempts >= maxAttempts) {
        setChatMessages(prev => [...prev, { role: 'assistant', content: 'Desculpe, a operação exigiu muitos passos e foi interrompida para sua segurança.' }])
      }

    } catch (err: any) {
      console.error('Erro no assistente:', err)
      setChatMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: `âŒ Ocorreu um erro no assistente IA: ${err.message}. Verifique a conexão ou sua chave OpenAI.`
        }
      ])
    } finally {
      setAiLoading(false)
    }
  }

  return (
    <div className="bg-primary-dark min-h-screen text-slate-300 font-sans flex">
      
      {/* Sidebar Navigation */}
      <aside className={`bg-[#091120] border-r border-white/5 flex flex-col justify-between flex-shrink-0 z-20 transition-all duration-300 ${
        isSidebarCollapsed ? 'w-16' : 'w-64'
      }`}>
        <div>
          {/* Logo Header */}
          <div className={`h-24 border-b border-white/5 flex items-center justify-between px-4 gap-2 ${
            isSidebarCollapsed ? 'justify-center' : ''
          }`}>
            {!isSidebarCollapsed && (
              <div className="flex items-center gap-3 overflow-hidden">
                <img
                  src="/assets/logo_fundo_escuro.png"
                  alt="Logo"
                  className="h-10 w-auto object-contain flex-shrink-0"
                />
                <span className="text-[10px] font-bold bg-gold-primary/10 text-gold-primary px-2 py-0.5 rounded uppercase tracking-wider flex-shrink-0">
                  SaaS
                </span>
              </div>
            )}
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors flex-shrink-0"
              title={isSidebarCollapsed ? "Expandir Menu" : "Recolher Menu"}
            >
              {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center transition-colors ${
                isSidebarCollapsed ? 'justify-center p-3' : 'gap-3 px-4 py-3'
              } rounded-lg text-xs font-bold uppercase tracking-wider ${
                activeTab === 'overview'
                  ? 'bg-gold-primary text-primary-dark shadow-lg shadow-gold-primary/10'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
              title="Visão Geral"
            >
              <LayoutDashboard className="w-4.5 h-4.5 flex-shrink-0" />
              {!isSidebarCollapsed && <span className="truncate">Visão Geral</span>}
            </button>

            <button
              onClick={() => { setActiveTab('pages'); fetchSections(); }}
              className={`w-full flex items-center transition-colors ${
                isSidebarCollapsed ? 'justify-center p-3' : 'gap-3 px-4 py-3'
              } rounded-lg text-xs font-bold uppercase tracking-wider ${
                activeTab === 'pages'
                  ? 'bg-gold-primary text-primary-dark shadow-lg shadow-gold-primary/10'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
              title="Meu Site"
            >
              <Globe className="w-4.5 h-4.5 flex-shrink-0" />
              {!isSidebarCollapsed && <span className="truncate">Meu Site</span>}
            </button>

            <button
              onClick={() => setActiveTab('leads')}
              className={`w-full flex items-center transition-colors ${
                isSidebarCollapsed ? 'justify-center p-3' : 'gap-3 px-4 py-3'
              } rounded-lg text-xs font-bold uppercase tracking-wider ${
                activeTab === 'leads'
                  ? 'bg-gold-primary text-primary-dark shadow-lg shadow-gold-primary/10'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
              title="Leads / Mensagens"
            >
              <Mail className="w-4.5 h-4.5 flex-shrink-0" />
              {!isSidebarCollapsed && <span className="truncate">Leads / Mensagens</span>}
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center transition-colors ${
                isSidebarCollapsed ? 'justify-center p-3' : 'gap-3 px-4 py-3'
              } rounded-lg text-xs font-bold uppercase tracking-wider ${
                activeTab === 'settings'
                  ? 'bg-gold-primary text-primary-dark shadow-lg shadow-gold-primary/10'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
              title="Configurações"
            >
              <Settings className="w-4.5 h-4.5 flex-shrink-0" />
              {!isSidebarCollapsed && <span className="truncate">Configurações</span>}
            </button>
          </nav>
        </div>

        {/* User Footer Profile */}
        <div className={`p-4 border-t border-white/5 space-y-3 bg-secondary-dark/40 ${
          isSidebarCollapsed ? 'flex flex-col items-center justify-center' : ''
        }`}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gold-primary/15 flex items-center justify-center text-gold-primary font-bold text-xs uppercase border border-gold-primary/20 flex-shrink-0">
              {userEmail ? userEmail.slice(0, 2) : 'AD'}
            </div>
            {!isSidebarCollapsed && (
              <div className="overflow-hidden">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Operador</p>
                <p className="text-xs text-white font-medium truncate leading-tight">{userEmail}</p>
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className={`flex items-center justify-center transition-colors ${
              isSidebarCollapsed ? 'p-2' : 'w-full gap-2 py-2 px-3'
            } bg-white/5 border border-white/5 hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400 rounded-lg text-xs font-bold uppercase tracking-wider`}
            title="Sair do Painel"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {!isSidebarCollapsed && <span>Sair do Painel</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col min-w-0">
        
        {/* Header bar */}
        <header className="h-24 border-b border-white/5 px-8 flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-xl font-display font-extrabold uppercase text-white tracking-wider">
              {activeTab === 'overview' && 'Visão Geral'}
              {activeTab === 'change_requests' && 'Solicitações WhatsApp'}
              {activeTab === 'leads' && 'Leads / Mensagens'}
              {activeTab === 'pages' && 'Meu Site'}
              {activeTab === 'ai_assistant' && 'Central IA (Conversar com o Site)'}
              {activeTab === 'settings' && 'Configurações'}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <a
              href={siteConfig?.domain ? `https://${siteConfig.domain.replace(/^\s*https?:?\/\/+/i, '').replace(/\/+$/, '')}` : `/smart-company`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <span>Ver Site Público</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </header>

        {/* Dashboard Body wrapper */}
        <main className="p-8 flex-grow overflow-y-auto">
          {loading && activeTab !== 'ai_assistant' && activeTab !== 'pages' ? (
            <div className="h-full flex items-center justify-center flex-col gap-3 py-20">
              <Loader2 className="w-8 h-8 text-gold-primary animate-spin" />
              <p className="text-xs uppercase text-slate-500 tracking-wider">Carregando dados da nuvem...</p>
            </div>
          ) : (
            <div className="space-y-8">
              
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="glass p-6 rounded-xl border border-white/5 flex justify-between items-center">
                      <div className="space-y-2">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Artigos Publicados</span>
                        <p className="text-3xl font-display font-black text-white leading-none">
                          {posts.filter(p => p.status === 'published').length}
                        </p>
                        <p className="text-xs text-slate-400">Total cadastrados: {posts.length}</p>
                      </div>
                      <div className="w-12 h-12 rounded-lg bg-gold-primary/10 text-gold-primary flex items-center justify-center">
                        <FileText className="w-6 h-6" />
                      </div>
                    </div>

                    <div className="glass p-6 rounded-xl border border-white/5 flex justify-between items-center">
                      <div className="space-y-2">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Contatos Recebidos</span>
                        <p className="text-3xl font-display font-black text-white leading-none">{leads.length}</p>
                        <p className="text-xs text-slate-400">Mensagens enviadas pelo formulário</p>
                      </div>
                      <div className="w-12 h-12 rounded-lg bg-accent-cyan/10 text-accent-cyan flex items-center justify-center">
                        <Mail className="w-6 h-6" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
                    <div className="glass rounded-xl border border-white/5 p-6 space-y-4">
                      <div className="flex justify-between items-center border-b border-white/5 pb-3">
                        <h3 className="text-sm font-display font-bold text-white uppercase tracking-wider flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gold-primary" />
                          <span>Contatos Recentes</span>
                        </h3>
                        <button onClick={() => setActiveTab('leads')} className="text-[10px] text-gold-primary hover:text-gold-light font-bold uppercase tracking-wider">Ver Todos</button>
                      </div>

                      {leads.length > 0 ? (
                        <div className="space-y-3 divide-y divide-white/5">
                          {leads.slice(0, 4).map((lead) => (
                            <div key={lead.id} className="pt-3 first:pt-0 space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-white font-semibold">{lead.name}</span>
                                <span className="text-slate-500 text-[10px]">{formatDate(lead.created_at)}</span>
                              </div>
                              <p className="text-xs text-slate-400 font-medium truncate">{lead.email}</p>
                              <p className="text-xs text-slate-400 leading-normal line-clamp-2 italic bg-[#070F1E]/30 p-2 rounded border border-white/5 mt-1">
                                "{lead.message}"
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 space-y-1">
                          <AlertCircle className="w-8 h-8 text-slate-600 mx-auto" />
                          <p className="text-xs text-slate-500 font-bold uppercase">Nenhum contato recente</p>
                        </div>
                      )}
                    </div>

                    <div className="glass rounded-xl border border-white/5 p-6 space-y-4">
                      <div className="flex justify-between items-center border-b border-white/5 pb-3">
                        <h3 className="text-sm font-display font-bold text-white uppercase tracking-wider flex items-center gap-2">
                          <FileText className="w-4 h-4 text-gold-primary" />
                          <span>Últimos Artigos</span>
                        </h3>
                        <button onClick={() => { setActiveTab('pages'); setMySiteSubTab('blog'); }} className="text-[10px] text-gold-primary hover:text-gold-light font-bold uppercase tracking-wider">Gerenciar</button>
                      </div>

                      {posts.length > 0 ? (
                        <div className="space-y-3">
                          {posts.slice(0, 4).map((post) => (
                            <div key={post.id} className="flex justify-between items-center text-xs pb-3 border-b border-white/5 last:border-none last:pb-0">
                              <div className="space-y-1 min-w-0 pr-4">
                                <h4 className="text-white font-bold truncate">{post.title}</h4>
                                <div className="flex items-center gap-2 text-[10px] text-slate-500">
                                  <span className="font-semibold text-gold-primary uppercase tracking-wide">{post.category}</span>
                                  <span>•</span>
                                  <span>{post.read_time}</span>
                                </div>
                              </div>
                              <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide ${
                                post.status === 'published'
                                  ? 'bg-accent-green/10 text-accent-green border border-accent-green/20'
                                  : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                              }`}>
                                {post.status === 'published' ? 'Publicado' : 'Rascunho'}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 space-y-1">
                          <AlertCircle className="w-8 h-8 text-slate-600 mx-auto" />
                          <p className="text-xs text-slate-500 font-bold uppercase">Nenhum artigo recente</p>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* TAB 2: MEU SITE */}
              {activeTab === 'pages' && (
                <div className="space-y-6 flex flex-col h-[calc(100vh-180px)]">
                  {/* Sub-tab navigation */}
                  <div className="flex gap-2 border-b border-white/5 pb-4 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => setMySiteSubTab('pages')}
                      className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 border ${
                        mySiteSubTab === 'pages'
                          ? 'bg-gold-primary text-primary-dark border-gold-primary/20 shadow-md shadow-gold-primary/5'
                          : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5'
                      }`}
                    >
                      <Globe className="w-4 h-4" />
                      <span>Páginas do Site</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setMySiteSubTab('blog')}
                      className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 border ${
                        mySiteSubTab === 'blog'
                          ? 'bg-gold-primary text-primary-dark border-gold-primary/20 shadow-md shadow-gold-primary/5'
                          : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5'
                      }`}
                    >
                      <FileText className="w-4 h-4" />
                      <span>Artigos do Blog</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setMySiteSubTab('custom')}
                      className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 border ${
                        mySiteSubTab === 'custom'
                          ? 'bg-gold-primary text-primary-dark border-gold-primary/20 shadow-md shadow-gold-primary/5'
                          : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5'
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                      <span>Páginas Personalizadas</span>
                    </button>
                  </div>

                  {mySiteSubTab === 'pages' ? (
                    <div className="flex-grow overflow-hidden flex flex-col xl:flex-row gap-6 items-stretch">
                      {/* Left Side: PageEditor */}
                      <div className={`flex-grow overflow-hidden transition-all duration-300 min-w-0 ${showPreview ? 'xl:w-[70%]' : 'w-full'}`}>
                        <PageEditor selectedPageId={selectedPageId} onPageChange={(id) => setSelectedPageId(id as any)} currentSlug={currentSlug} />
                      </div>

                      {/* Right Side: Preview Panel */}
                      {showPreview && (
                        <div className="hidden xl:flex xl:w-[30%] flex-col border border-white/5 bg-[#070F1E]/50 rounded-2xl overflow-hidden select-none flex-shrink-0">
                          {/* Preview Header */}
                          <div className="p-4 border-b border-white/5 flex items-center justify-between bg-secondary-dark/40 flex-shrink-0">
                            <div className="flex items-center gap-2">
                              <Globe className="w-3.5 h-3.5 text-gold-primary animate-pulse" />
                              <span className="text-xs font-bold text-white uppercase tracking-wider">Visualização ao Vivo</span>
                            </div>
                            <div className="flex gap-1">
                              <button
                                type="button"
                                onClick={() => setPreviewViewport('desktop')}
                                className={`p-1.5 rounded-lg transition-colors border ${
                                  previewViewport === 'desktop'
                                    ? 'bg-gold-primary/10 border-gold-primary/25 text-gold-primary'
                                    : 'bg-transparent border-transparent text-slate-500 hover:text-slate-300'
                                }`}
                              >
                                <Monitor className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => setPreviewViewport('mobile')}
                                className={`p-1.5 rounded-lg transition-colors border ${
                                  previewViewport === 'mobile'
                                    ? 'bg-gold-primary/10 border-gold-primary/25 text-gold-primary'
                                    : 'bg-transparent border-transparent text-slate-500 hover:text-slate-300'
                                }`}
                              >
                                <Smartphone className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Preview Screen */}
                          <div className="flex-grow bg-[#070F1E] overflow-hidden flex items-center justify-center p-4 relative">
                            <div
                              className={`transition-all duration-300 shadow-inner h-full flex items-center justify-center relative ${
                                previewViewport === 'mobile'
                                  ? 'w-[320px] max-w-full border-x border-y border-white/10 rounded-[32px] p-4 shadow-2xl ring-1 ring-white/10 bg-[#070F1E]'
                                  : 'w-full'
                              }`}
                            >
                              {previewViewport === 'mobile' && (
                                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-28 h-3.5 bg-black rounded-full z-10 flex items-center justify-center">
                                  <span className="w-1.5 h-1.5 rounded-full bg-slate-900 border border-white/5"></span>
                                </div>
                              )}

                              <iframe
                                ref={iframeRef}
                                id="preview-iframe"
                                src={`${pagesList.find(p => p.id === selectedPageId)?.path || '/'}`}
                                className="w-full h-full border-none rounded bg-[#070F1E]"
                                onLoad={sendPreviewUpdate}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : mySiteSubTab === 'blog' ? (
                    <div className="space-y-6 animate-in fade-in duration-200">
                      <div className="flex justify-between items-center gap-4 flex-wrap">
                        <div className="relative w-80 max-w-full">
                          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={postSearch}
                            onChange={(e) => setPostSearch(e.target.value)}
                            placeholder="Pesquisar artigos por título ou categoria..."
                            aria-label="Pesquisar artigos"
                            className="w-full bg-[#070F1E] border border-white/10 rounded-lg py-2 pl-10 pr-4 text-slate-200 text-xs focus:outline-none focus:border-gold-primary transition-colors"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={openCreateModal}
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-gold-primary hover:bg-gold-light text-primary-dark font-bold uppercase tracking-wider rounded-lg text-xs shadow-lg shadow-gold-primary/10 transition-colors"
                        >
                          <Plus className="w-4 h-4 stroke-[2.5]" />
                          <span>Novo Artigo</span>
                        </button>
                      </div>

                      <div className="glass rounded-xl border border-white/5 overflow-hidden shadow-2xl">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-secondary-dark/60 border-b border-white/5 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                              <th className="px-6 py-4">Título</th>
                              <th className="px-6 py-4">Categoria</th>
                              <th className="px-6 py-4">Leitura</th>
                              <th className="px-6 py-4">Status</th>
                              <th className="px-6 py-4">Data de Publicação</th>
                              <th className="px-6 py-4 text-right">Ações</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5 text-xs">
                            {(() => {
                              const term = postSearch.trim().toLowerCase()
                              const filtered = term
                                ? posts.filter(p =>
                                    (p.title || '').toLowerCase().includes(term) ||
                                    (p.category || '').toLowerCase().includes(term))
                                : posts
                              if (filtered.length === 0) {
                                return (
                                  <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center">
                                      <div className="space-y-2">
                                        <AlertCircle className="w-8 h-8 text-slate-600 mx-auto" />
                                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                                          {term ? 'Nenhum artigo encontrado para a busca' : 'Nenhum artigo cadastrado ainda'}
                                        </p>
                                        {!term && (
                                          <button
                                            type="button"
                                            onClick={openCreateModal}
                                            className="text-[10px] text-gold-primary hover:text-gold-light font-bold uppercase tracking-wider"
                                          >
                                            Criar o primeiro artigo
                                          </button>
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                )
                              }
                              return filtered.map((post) => (
                              <tr key={post.id} className="hover:bg-white/2 transition-colors">
                                <td className="px-6 py-4 font-semibold text-white max-w-xs truncate">{post.title}</td>
                                <td className="px-6 py-4 text-slate-400">{post.category}</td>
                                <td className="px-6 py-4 text-slate-400">{post.read_time}</td>
                                <td className="px-6 py-4">
                                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide ${
                                    post.status === 'published'
                                      ? 'bg-accent-green/10 text-accent-green border border-accent-green/20'
                                      : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                                  }`}>
                                    {post.status === 'published' ? 'Publicado' : 'Rascunho'}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-slate-400">
                                  {post.published_at ? formatDate(post.published_at) : 'Rascunho'}
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                  <button
                                    type="button"
                                    onClick={() => openEditModal(post)}
                                    aria-label={`Editar artigo ${post.title}`}
                                    title="Editar artigo"
                                    className="inline-flex items-center justify-center p-1.5 text-slate-400 hover:text-gold-primary hover:bg-white/5 rounded-md transition-colors"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeletePost(post.id)}
                                    aria-label={`Excluir artigo ${post.title}`}
                                    title="Excluir artigo"
                                    className="inline-flex items-center justify-center p-1.5 text-slate-400 hover:text-accent-red hover:bg-white/5 rounded-md transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </td>
                              </tr>
                              ))
                            })()}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-grow overflow-y-auto">
                      <PageBuilder currentSlug={currentSlug} />
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: CONTACT LEADS */}
              {activeTab === 'leads' && (
                <div className="glass rounded-xl border border-white/5 overflow-hidden shadow-2xl">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-secondary-dark/60 border-b border-white/5 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                        <th className="px-6 py-4">Nome</th>
                        <th className="px-6 py-4">Email</th>
                        <th className="px-6 py-4">Telefone</th>
                        <th className="px-6 py-4">Mensagem</th>
                        <th className="px-6 py-4">Enviado em</th>
                        <th className="px-6 py-4 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-xs">
                      {leads.length === 0 && (
                        <tr>
                          <td colSpan={6} className="px-6 py-12 text-center">
                            <div className="space-y-2">
                              <Mail className="w-8 h-8 text-slate-600 mx-auto" />
                              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                                Nenhum contato recebido ainda
                              </p>
                            </div>
                          </td>
                        </tr>
                      )}
                      {leads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-white/2 transition-colors">
                          <td className="px-6 py-4 font-semibold text-white">{lead.name}</td>
                          <td className="px-6 py-4 text-slate-300">{lead.email}</td>
                          <td className="px-6 py-4 text-slate-300">
                            {lead.phone ? (
                              <a href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="text-gold-primary hover:underline">
                                {lead.phone}
                              </a>
                            ) : '-'}
                          </td>
                          <td className="px-6 py-4 text-slate-400 max-w-sm font-medium leading-relaxed whitespace-pre-wrap">{lead.message}</td>
                          <td className="px-6 py-4 text-slate-400">{formatDate(lead.created_at)}</td>
                          <td className="px-6 py-4 text-right">
                            <button
                              type="button"
                              onClick={() => handleDeleteLead(lead.id)}
                              aria-label={`Excluir contato de ${lead.name}`}
                              title="Excluir contato"
                              className="inline-flex items-center justify-center p-1.5 text-slate-400 hover:text-accent-red hover:bg-white/5 rounded-md transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* TAB 5: CENTRAL IA (Redesigned Conversar com o Site) */}
              {activeTab === 'ai_assistant' && (
                <div className="glass rounded-xl border border-white/5 h-[calc(100vh-220px)] flex flex-col overflow-hidden shadow-2xl relative">
                  
                  {/* Chat Messages */}
                  <div className="flex-grow p-6 overflow-y-auto space-y-4">
                    {chatMessages.length <= 1 && (
                      <div className="max-w-2xl mx-auto text-center space-y-6 py-8">
                        <div className="w-16 h-16 rounded-2xl bg-gold-primary/10 border border-gold-primary/25 flex items-center justify-center text-gold-primary mx-auto shadow-lg shadow-gold-primary/5">
                          <Bot className="w-8 h-8 animate-pulse" />
                        </div>
                        <div className="space-y-2">
                          <h2 className="text-xl font-display font-extrabold text-white uppercase tracking-wider">Site, o que você deseja fazer hoje?</h2>
                          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                            Você pode conversar diretamente com o seu site para alterar textos, adicionar posts no blog, gerenciar contatos ou configurar o domínio.
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 text-left">
                          {[
                            { text: "Adicione depoimentos de clientes na Página Inicial", prompt: "Adicione uma seção de depoimentos na Página Inicial com depoimentos reais de clientes elogiando a consultoria de Antonio Geraldes." },
                            { text: "Atualize o telefone de contato do rodapé", prompt: "Troque o telefone de contato nas configurações e rodapé do site para o número (11) 99999-8888." },
                            { text: "Crie um post sobre Planejamento Estratégico", prompt: "Escreva um novo artigo para o blog com o título 'Planejamento Estratégico para 2026: O Guia Definitivo para Médias Empresas'." },
                            { text: "Deixe a apresentação principal mais corporativa", prompt: "Refine o texto da apresentação principal da Página Inicial para torná-lo mais sério, corporativo e focado em lucro operacional." }
                          ].map((s, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                setInputMessage(s.prompt)
                              }}
                              className="p-4 bg-secondary-dark/60 hover:bg-[#0c192f] border border-white/5 hover:border-gold-primary/30 rounded-xl text-xs text-slate-300 hover:text-white transition-all text-left space-y-1.5 group flex flex-col justify-between"
                            >
                              <span className="font-bold text-gold-primary group-hover:text-gold-light transition-colors">{s.text}</span>
                              <span className="text-[10px] text-slate-500 line-clamp-2 leading-normal">&ldquo;{s.prompt}&rdquo;</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {chatMessages.length > 1 && chatMessages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex gap-3 max-w-3xl ${
                          msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''
                        }`}
                      >
                        {/* Avatar */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border ${
                          msg.role === 'user'
                            ? 'bg-gold-primary/10 border-gold-primary/20 text-gold-primary'
                            : 'bg-accent-blue/15 border-accent-blue/20 text-accent-cyan'
                        }`}>
                          {msg.role === 'user' ? <User className="w-4.5 h-4.5" /> : <Bot className="w-4.5 h-4.5" />}
                        </div>

                        {/* Speech Bubble */}
                        <div className={`p-4 rounded-xl text-xs sm:text-sm leading-relaxed border shadow-md whitespace-pre-wrap ${
                          msg.role === 'user'
                            ? 'bg-gold-primary text-primary-dark border-gold-primary/20 font-medium'
                            : 'bg-[#091120] text-slate-200 border-white/5'
                        }`}>
                          {msg.content}
                        </div>
                      </div>
                    ))}

                    {/* AI Loading bubble */}
                    {aiLoading && (
                      <div className="flex gap-3 max-w-xs">
                        <div className="w-8 h-8 rounded-full bg-accent-blue/15 border border-accent-blue/20 text-accent-cyan flex items-center justify-center flex-shrink-0 animate-pulse">
                          <Bot className="w-4.5 h-4.5" />
                        </div>
                        <div className="bg-[#091120] text-slate-400 border border-white/5 p-4 rounded-xl text-xs flex items-center gap-2 shadow-md">
                          <span>IA está processando e executando alterações...</span>
                          <Loader2 className="w-4 h-4 text-gold-primary animate-spin" />
                        </div>
                      </div>
                    )}
                    
                    <div ref={chatEndRef} />
                  </div>

                  {/* Chat Input bar */}
                  <form onSubmit={handleSendMessage} className="p-4 border-t border-white/5 bg-secondary-dark/40 flex gap-3">
                    <input
                      type="text"
                      required
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Descreva a alteração que deseja fazer no site (ex: 'Altere o título da página inicial para...' ou 'Escreva um artigo de blog sobre valuation'...)"
                      className="flex-grow bg-[#070F1E] border border-white/10 rounded-lg py-3 px-4 text-white text-xs sm:text-sm focus:outline-none focus:border-gold-primary transition-colors"
                      disabled={aiLoading}
                    />
                    <button
                      type="submit"
                      disabled={aiLoading || !inputMessage.trim()}
                      className="px-5 bg-gold-primary hover:bg-gold-light text-primary-dark rounded-lg flex items-center justify-center transition-colors disabled:opacity-50"
                    >
                      <Send className="w-4.5 h-4.5 stroke-[2.5]" />
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 6: CHANGE REQUESTS QUEUE */}
              {activeTab === 'change_requests' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="glass rounded-xl border border-white/5 p-6 space-y-4">
                    <div className="flex justify-between items-center border-b border-white/5 pb-3">
                      <div className="space-y-1">
                        <h3 className="text-sm font-display font-bold text-white uppercase tracking-wider flex items-center gap-2">
                          <MessageSquare className="w-4.5 h-4.5 text-emerald-500" />
                          <span>Fila de Solicitações via WhatsApp</span>
                        </h3>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                          Alterações propostas por usuários autorizados via áudio/texto convertidos por IA
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-emerald-600/10 border border-emerald-600/20 text-emerald-500 text-[10px] font-bold uppercase rounded-full tracking-wider">
                        {changeRequests.filter(r => r.pending_review).length} Pendentes
                      </span>
                    </div>

                    {changeRequests.length > 0 ? (
                      <div className="space-y-4">
                        {changeRequests.map((req) => (
                          <div
                            key={req.id}
                            className={`p-5 rounded-xl border transition-all duration-200 ${
                              req.pending_review
                                ? 'bg-secondary-dark/60 border-gold-primary/20 hover:border-gold-primary/40'
                                : req.status === 'approved'
                                ? 'bg-emerald-950/20 border-emerald-500/10 opacity-75'
                                : 'bg-red-950/20 border-red-500/10 opacity-75'
                            }`}
                          >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div className="space-y-3 flex-grow">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-gold-primary/10 text-gold-primary">
                                    Ação: {req.action}
                                  </span>
                                  <span className="text-[10px] font-medium text-slate-400">
                                    De: {req.from_phone}
                                  </span>
                                  <span className="text-[10px] font-medium text-slate-500">
                                    {formatDate(req.created_at)}
                                  </span>
                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                                    req.status === 'approved'
                                      ? 'bg-emerald-500/15 text-emerald-400'
                                      : req.status === 'rejected'
                                      ? 'bg-red-500/15 text-red-400'
                                      : 'bg-yellow-500/15 text-yellow-400'
                                  }`}>
                                    {req.status === 'approved' ? 'Aprovado' : req.status === 'rejected' ? 'Rejeitado' : 'Pendente'}
                                  </span>
                                  {req.confidence && (
                                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                                      Precisão: <strong className={req.confidence >= 0.85 ? 'text-emerald-400' : 'text-yellow-500'}>{Math.round(req.confidence * 100)}%</strong>
                                    </span>
                                  )}
                                </div>

                                {req.original_message && (
                                  <div className="bg-[#070F1E] p-3 rounded-lg border border-white/5 text-xs text-slate-300 italic">
                                    &ldquo;{req.original_message}&rdquo;
                                  </div>
                                )}

                                <div className="space-y-1">
                                  <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Alteração Proposta (Payload):</span>
                                  <pre className="bg-[#070F1E] p-3 rounded-lg border border-white/5 text-[11px] font-mono text-slate-300 overflow-x-auto max-h-40">
                                    {JSON.stringify(req.payload, null, 2)}
                                  </pre>
                                </div>

                                {req.suggested_command && (
                                  <div className="space-y-1">
                                    <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Comando de execução sugerido:</span>
                                    <code className="block bg-[#070F1E] p-2 rounded border border-white/5 text-[10px] font-mono text-slate-400">
                                      {req.suggested_command}
                                    </code>
                                  </div>
                                )}

                                {req.execution_result && (
                                  <div className="space-y-1">
                                    <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Resultado da Execução:</span>
                                    <pre className="bg-[#070F1E]/50 p-2 rounded text-[10px] font-mono text-emerald-400 max-h-24 overflow-y-auto">
                                      {JSON.stringify(req.execution_result, null, 2)}
                                    </pre>
                                  </div>
                                )}
                              </div>

                              {req.pending_review && (
                                <div className="flex md:flex-col gap-2 justify-end min-w-[120px]">
                                  <button
                                    onClick={() => handleApproveRequest(req)}
                                    disabled={actionLoading}
                                    className="flex-grow flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-wider rounded-lg text-[10px] shadow-lg shadow-emerald-600/10 transition-colors disabled:opacity-50"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                    <span>Aprovar</span>
                                  </button>
                                  <button
                                    onClick={() => handleRejectRequest(req)}
                                    disabled={actionLoading}
                                    className="flex-grow flex items-center justify-center gap-1.5 px-3 py-2 bg-white/5 border border-white/10 hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400 text-slate-300 font-bold uppercase tracking-wider rounded-lg text-[10px] transition-colors disabled:opacity-50"
                                  >
                                    <XCircle className="w-3.5 h-3.5" />
                                    <span>Rejeitar</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-12 text-center text-slate-500 space-y-2 border border-dashed border-white/5 rounded-xl">
                        <MessageSquare className="w-8 h-8 mx-auto stroke-1" />
                        <p className="text-xs">Nenhuma solicitação encontrada para este site.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 7: SETTINGS / CONFIGURAÇÕES */}
              {activeTab === 'settings' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
                  {/* Site Profile Form */}
                  <div className="lg:col-span-2 glass rounded-xl border border-white/5 p-6 space-y-6">
                    <div className="border-b border-white/5 pb-3">
                      <h3 className="text-sm font-display font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <Settings className="w-4.5 h-4.5 text-gold-primary" />
                        <span>Configurações do Site</span>
                      </h3>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">
                        Informações básicas e parâmetros de deploy do tenant
                      </p>
                    </div>

                    <form onSubmit={handleUpdateSiteConfig} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Nome do Site</label>
                          <input
                            type="text"
                            required
                            value={siteConfig?.name || ''}
                            onChange={(e) => setSiteConfig({ ...siteConfig, name: e.target.value })}
                            className="w-full bg-[#070F1E] border border-white/10 rounded-lg py-2 px-3 text-white text-xs focus:outline-none focus:border-gold-primary transition-colors"
                            placeholder="Minha Empresa"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Domínio Personalizado</label>
                          <input
                            type="text"
                            value={siteConfig?.domain || ''}
                            onChange={(e) => setSiteConfig({ ...siteConfig, domain: e.target.value })}
                            className="w-full bg-[#070F1E] border border-white/10 rounded-lg py-2 px-3 text-white text-xs focus:outline-none focus:border-gold-primary transition-colors"
                            placeholder="ex: minhaempresa.com.br"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Nome do Proprietário</label>
                          <input
                            type="text"
                            value={siteConfig?.owner_name || ''}
                            onChange={(e) => setSiteConfig({ ...siteConfig, owner_name: e.target.value })}
                            className="w-full bg-[#070F1E] border border-white/10 rounded-lg py-2 px-3 text-white text-xs focus:outline-none focus:border-gold-primary transition-colors"
                            placeholder="José da Silva"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase text-slate-400 mb-1">WhatsApp do Proprietário</label>
                          <input
                            type="text"
                            value={siteConfig?.owner_phone || ''}
                            onChange={(e) => setSiteConfig({ ...siteConfig, owner_phone: e.target.value })}
                            className="w-full bg-[#070F1E] border border-white/10 rounded-lg py-2 px-3 text-white text-xs focus:outline-none focus:border-gold-primary transition-colors"
                            placeholder="5511999999999"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-3 bg-secondary-dark/20 p-3 rounded-lg border border-white/5">
                        <input
                          type="checkbox"
                          id="site-active"
                          checked={siteConfig?.active || false}
                          onChange={(e) => setSiteConfig({ ...siteConfig, active: e.target.checked })}
                          className="w-4.5 h-4.5 text-gold-primary bg-primary-dark border-white/10 rounded focus:ring-gold-primary focus:ring-2"
                        />
                        <div>
                          <label htmlFor="site-active" className="block text-xs font-bold uppercase text-white cursor-pointer">
                            Site Ativo no SaaS
                          </label>
                          <span className="block text-[10px] text-slate-500 uppercase tracking-wider">
                            Se inativo, o site exibirá uma tela de manutenção para visitantes públicos.
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          type="submit"
                          disabled={actionLoading}
                          className="inline-flex items-center justify-center px-4 py-2 bg-gold-primary hover:bg-gold-light text-primary-dark font-bold uppercase tracking-wider rounded-lg text-xs shadow-lg shadow-gold-primary/10 transition-colors disabled:opacity-50"
                        >
                          {actionLoading ? 'Salvando...' : 'Salvar Alterações'}
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Authorized Phones Card */}
                  <div className="glass rounded-xl border border-white/5 p-6 space-y-6">
                    <div className="border-b border-white/5 pb-3">
                      <h3 className="text-sm font-display font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <Phone className="w-4.5 h-4.5 text-emerald-500" />
                        <span>Telefones Autorizados</span>
                      </h3>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">
                        Números autorizados a propor alterações por voz via WhatsApp
                      </p>
                    </div>

                    <form onSubmit={handleAddPhone} className="flex gap-2">
                      <input
                        type="text"
                        required
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                        placeholder="ex: 5511999999999"
                        className="flex-grow bg-[#070F1E] border border-white/10 rounded-lg py-2 px-3 text-white text-xs focus:outline-none focus:border-gold-primary transition-colors"
                      />
                      <button
                        type="submit"
                        disabled={actionLoading}
                        className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg flex items-center justify-center transition-colors disabled:opacity-50"
                      >
                        <Plus className="w-4.5 h-4.5 stroke-[2.5]" />
                      </button>
                    </form>

                    {authorizedPhones.length > 0 ? (
                      <div className="divide-y divide-white/5">
                        {authorizedPhones.map((ph) => (
                          <div key={ph.phone} className="py-2.5 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                              <span className="font-mono text-slate-300">{ph.phone}</span>
                              <span className="text-[9px] bg-white/5 text-slate-400 px-1 py-0.5 rounded uppercase font-bold tracking-wider">
                                {ph.role || 'user'}
                              </span>
                            </div>
                            <button
                              onClick={() => handleDeletePhone(ph.phone)}
                              aria-label={`Remover telefone ${ph.phone}`}
                              title="Remover telefone"
                              className="text-slate-500 hover:text-red-400 p-1 hover:bg-white/5 rounded transition-all"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-6 text-center text-slate-600 border border-dashed border-white/5 rounded-xl space-y-1">
                        <Phone className="w-5 h-5 mx-auto stroke-1" />
                        <p className="text-[10px] uppercase font-bold tracking-wider">Sem telefones autorizados</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          )}
        </main>
      </div>

      {/* PUBLISHING PROGRESS MODAL (Vercel-style) */}
      {isPublishing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-150">
          <div className="glass w-full max-w-sm p-8 rounded-2xl border border-white/10 shadow-2xl text-center space-y-6 animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 rounded-full bg-gold-primary/10 border border-gold-primary/20 flex items-center justify-center mx-auto text-gold-primary">
              <Rocket className="w-8 h-8 animate-bounce" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-display font-extrabold text-white uppercase tracking-wider">Publicando seu Site</h3>
              <p className="text-xs text-slate-400">Preparando ambiente e atualizando banco de dados no Supabase...</p>
            </div>

            <div className="space-y-3.5 text-left max-w-xs mx-auto">
              {[
                { step: 0, text: "Verificando integridade das seções..." },
                { step: 1, text: "Compilando rascunhos locais..." },
                { step: 2, text: "Sincronizando com o Supabase..." },
                { step: 3, text: "Concluído! Site atualizado." }
              ].map((s) => {
                const isDone = publishingStep > s.step;
                const isCurrent = publishingStep === s.step;
                return (
                  <div key={s.step} className="flex items-center gap-3 text-xs transition-opacity duration-200">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isDone ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                      isCurrent ? 'bg-gold-primary/20 text-gold-primary border border-gold-primary/30 animate-pulse' :
                      'bg-white/5 text-slate-600 border border-white/5'
                    }`}>
                      {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : 
                       isCurrent ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 
                       <span className="font-bold text-[9px]">{s.step + 1}</span>}
                    </div>
                    <span className={`font-semibold ${
                      isDone ? 'text-emerald-400' :
                      isCurrent ? 'text-white' :
                      'text-slate-500'
                    }`}>{s.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* CREATE / EDIT POST MODAL */}
      {isPostModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => !actionLoading && setIsPostModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={editingPost ? 'Editar artigo' : 'Novo artigo'}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass w-full max-w-4xl max-h-[90vh] rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200"
          >
            
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-secondary-dark/60">
              <h2 className="text-base font-display font-bold uppercase text-white tracking-wider">
                {editingPost ? 'Editar Artigo' : 'Novo Artigo'}
              </h2>
              <button
                onClick={() => setIsPostModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 hover:bg-white/5 rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePost} className="p-6 overflow-y-auto space-y-4 flex-grow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1" htmlFor="p-title">
                    Título do Artigo
                  </label>
                  <input
                    id="p-title"
                    type="text"
                    required
                    value={postFormData.title}
                    onChange={handleTitleChange}
                    className="w-full bg-[#070F1E] border border-white/10 rounded-lg py-2 px-3 text-white text-xs focus:outline-none focus:border-gold-primary transition-colors"
                    placeholder="Como aumentar as vendas..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1" htmlFor="p-slug">
                    Slug (URL amigável)
                  </label>
                  <input
                    id="p-slug"
                    type="text"
                    required
                    value={postFormData.slug}
                    onChange={(e) => setPostFormData({ ...postFormData, slug: generateSlug(e.target.value) })}
                    className="w-full bg-[#070F1E] border border-white/10 rounded-lg py-2 px-3 text-white text-xs focus:outline-none focus:border-gold-primary transition-colors"
                    placeholder="como-aumentar-as-vendas"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1" htmlFor="p-category">
                    Categoria
                  </label>
                  <select
                    id="p-category"
                    value={postFormData.category}
                    onChange={(e) => setPostFormData({ ...postFormData, category: e.target.value })}
                    className="w-full bg-[#070F1E] border border-white/10 rounded-lg py-2 px-3 text-white text-xs focus:outline-none focus:border-gold-primary transition-colors"
                  >
                    <option value="Vendas & Comercial">Vendas & Comercial</option>
                    <option value="Liderança & Equipes">Liderança & Equipes</option>
                    <option value="Gestão Financeira">Gestão Financeira</option>
                    <option value="Estratégia & Planejamento">Estratégia & Planejamento</option>
                    <option value="Gestão Empresarial">Gestão Empresarial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1" htmlFor="p-readtime">
                    Tempo de Leitura
                  </label>
                  <input
                    id="p-readtime"
                    type="text"
                    value={postFormData.read_time}
                    onChange={(e) => setPostFormData({ ...postFormData, read_time: e.target.value })}
                    className="w-full bg-[#070F1E] border border-white/10 rounded-lg py-2 px-3 text-white text-xs focus:outline-none focus:border-gold-primary transition-colors"
                    placeholder="5 min de leitura"
                  />
                </div>

                <div className="md:col-span-2">
                  <ImageUploader
                    label="Imagem de Destaque do Artigo"
                    value={postFormData.image_url}
                    onChange={(url) => setPostFormData({ ...postFormData, image_url: url })}
                    currentSlug={currentSlug}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1" htmlFor="p-excerpt">
                    Resumo / Excerpt
                  </label>
                  <textarea
                    id="p-excerpt"
                    rows={2}
                    value={postFormData.excerpt}
                    onChange={(e) => setPostFormData({ ...postFormData, excerpt: e.target.value })}
                    className="w-full bg-[#070F1E] border border-white/10 rounded-lg py-2 px-3 text-white text-xs focus:outline-none focus:border-gold-primary transition-colors resize-none"
                    placeholder="Uma descrição resumida..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1" htmlFor="p-body">
                    Conteúdo do Artigo (HTML)
                  </label>
                  <textarea
                    id="p-body"
                    required
                    rows={12}
                    value={postFormData.body}
                    onChange={(e) => setPostFormData({ ...postFormData, body: e.target.value })}
                    className="w-full bg-[#070F1E] border border-white/10 rounded-lg py-2 px-3 text-white text-xs font-mono focus:outline-none focus:border-gold-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1" htmlFor="p-status">
                    Estado do Artigo
                  </label>
                  <select
                    id="p-status"
                    value={postFormData.status}
                    onChange={(e) => setPostFormData({ ...postFormData, status: e.target.value })}
                    className="w-full bg-[#070F1E] border border-white/10 rounded-lg py-2 px-3 text-white text-xs focus:outline-none focus:border-gold-primary transition-colors"
                  >
                    <option value="draft">Rascunho</option>
                    <option value="published">Publicado</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex justify-end gap-3 bg-secondary-dark/20 -mx-6 -mb-6 p-6">
                <button
                  type="button"
                  onClick={() => setIsPostModalOpen(false)}
                  className="px-4 py-2 border border-white/5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="inline-flex items-center justify-center px-4 py-2 bg-gold-primary hover:bg-gold-light text-primary-dark font-bold uppercase tracking-wider rounded-lg text-xs shadow-lg shadow-gold-primary/10 transition-colors disabled:opacity-50"
                >
                  {actionLoading ? (
                    <>
                      <span>Salvando...</span>
                      <Loader2 className="w-3.5 h-3.5 ml-1.5 animate-spin" />
                    </>
                  ) : (
                    <span>Salvar Artigo</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Global feedback: toasts + confirm dialog */}
      <ToastViewport toasts={toasts} onDismiss={dismissToast} />
      <ConfirmDialog state={confirmState} onResolve={resolveConfirm} busy={actionLoading} />

    </div>
  )
}
