// Scripts / Seed Sections in database
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Read .env file
const dotenvPath = path.join(__dirname, '../.env');
if (fs.existsSync(dotenvPath)) {
  const envContent = fs.readFileSync(dotenvPath, 'utf8');
  envContent.split(/\r?\n/).forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const parts = trimmed.split('=');
      const key = parts[0].trim();
      let value = parts.slice(1).join('=').trim();
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      } else if (value.startsWith("'") && value.endsWith("'")) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  });
}

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Erro: VITE_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY não configurados no arquivo .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const sectionsData = [
  {
    site_slug: 'smartcompany',
    section_key: 'quemsomos_hero',
    title: 'QUEM SOMOS & PROPÓSITO',
    content: 'Mais de 20 anos de atuação dedicados a entregar lucro, organização operacional e tranquilidade de tempo para empresários de todo o Brasil.',
    metadata: {
      badge: 'Institucional & História'
    }
  },
  {
    site_slug: 'smartcompany',
    section_key: 'quemsomos_mvv',
    title: 'Missão, Visão e Propósito',
    content: '',
    metadata: {
      mission: 'Transformar positivamente empresas, empresários e seu time, contribuindo para o lucro e produtividade com menos stress, valorizando e estruturando o negócio para o longo prazo.',
      vision: 'Ser referência no Alto Tietê em Consultoria de Gestão conquistando, em 3 anos, autoridade e reconhecimento dos clientes pela transformação das empresas e pessoas através de Diagnósticos e formação de mais de 100 alunos nos Cursos de Auto Gestão.',
      purpose_o_que: 'Transformar empresas e pessoas de forma definitiva.',
      purpose_como: 'Entendendo a fundo o negócio (como se fosse nosso) através de diagnósticos minuciosos e planos de ação assertivos.',
      purpose_por_que: 'Obter lucro e melhores resultados criando um ambiente saudável, sustentável e estruturado para sócios e colaboradores.'
    }
  },
  {
    site_slug: 'smartcompany',
    section_key: 'quemsomos_values',
    title: 'Nossos Valores Inegociáveis',
    content: 'Nossa conduta diária é ditada por princípios que priorizam a segurança corporativa do cliente.',
    metadata: {
      values: [
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
    }
  },
  {
    site_slug: 'smartcompany',
    section_key: 'quemsomos_founder',
    title: 'Empreendedorismo na Prática desde 1989',
    content: 'Abri meu primeiro CNPJ aos 18 anos em 1989. Obtive experiências importantes nas multinacionais Fuji Film e Kodak, e na sequência atuei na agência publicitária Photo Art Studio atendendo contas industriais de renome nacional.\n\nEm 1994, fundei a Express Center Cópias, a maior gráfica rápida do Alto Tietê, alcançando picos mensais de 860.000 impressões. Posteriormente, atuei como comerciante no varejo de shopping e hipermercados (Balinhas & Balões, Marcia Modas), adquirindo expertise direta nas operações e desafios comerciais.\n\nEm 2001, decidi registrar a Smart Company para focar no design e manufatura de cubas de quartzo e resinas polimerizadas. Após alcançar sucesso na mídia nacional com destaque na revista Arquitetura & Construção, a empresa pivotou a manufatura para focar exclusivamente no setor de Consultoria de Gestão e Business Plan a partir de 2004.\n\nNa década de 2000, fui convidado a integrar uma grande consultoria, realizando dezenas de diagnósticos e reestruturações em empresas com faturamentos anuais de até R$ 250 milhões. Paralelamente, agreguei conhecimentos de M&A, formatação de holdings e estruturação de franquias em uma prestigiada Boutique Jurídica em São Paulo.',
    metadata: {
      founder_name: 'Antonio Geraldes',
      founder_title: 'Especialista em Diagnóstico & M&A',
      image_url: '/assets/Ola-sou-Antonio-Geraldes-copia-scaled.jpg',
      quote: 'Excelência em Estratégia e Gestão Eficiente é o conjunto de Resultados Positivos que melhoram constantemente: Lucro, Qualidade, Vendas Crescentes, Prazos de Entrega e o posicionamento de mercado.',
      experience_summary: 'Mais de 30 anos como empresário investidor. Fundou 6 negócios nos ramos de indústria, comércio, serviços e consultoria de reestruturação.'
    }
  },
  {
    site_slug: 'smartcompany',
    section_key: 'quemsomos_timeline',
    title: 'Nossa Linha do Tempo',
    content: 'Acompanhe a trajetória de marcos históricos e conquistas da Smart Company.',
    metadata: {
      events: [
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
    }
  }
];

async function seed() {
  console.log('Iniciando o seed das seções de páginas no Supabase...');
  try {
    for (const section of sectionsData) {
      console.log(`Inserindo seção: "${section.section_key}"...`);
      const { error } = await supabase
        .from('site_sections')
        .upsert(section, { onConflict: 'site_slug,section_key' });
        
      if (error) {
        console.error(`Erro ao inserir seção ${section.section_key}:`, error.message);
      } else {
        console.log(`Sucesso: Seção ${section.section_key} inserida/atualizada.`);
      }
    }
    console.log('Processo de seed de seções finalizado com sucesso!');
  } catch (err) {
    console.error('Erro catastrófico no seed das seções:', err);
    process.exit(1);
  }
}

seed();
