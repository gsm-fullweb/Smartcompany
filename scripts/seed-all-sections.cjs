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
  // ─── QUEM SOMOS ───────────────────────────────────────────────────────────
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
  },
  {
    site_slug: 'smartcompany',
    section_key: 'quemsomos_clients',
    title: 'Casos de Sucesso & Segmentos Atendidos',
    content: 'Ensinamos nossos clientes, mas também aprendemos com cada um. Nossa base de conhecimento é refinada diariamente através de desafios reais nos mais variados setores da economia.',
    metadata: {
      clients: [
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
    }
  },

  // ─── HOME ─────────────────────────────────────────────────────────────────
  {
    site_slug: 'smartcompany',
    section_key: 'home_hero',
    title: 'TRANSFORME JÁ SEU LUCRO, VENDAS, PRODUTIVIDADE E EQUIPE.',
    content: 'Consultoria e gestão personalizadas, gerando resultados excepcionais para Empresários e Gestores que buscam crescimento sólido e liberdade de tempo.',
    metadata: {
      badge: 'Liderança, Lucratividade e Autonomia'
    }
  },
  {
    site_slug: 'smartcompany',
    section_key: 'home_reasons',
    title: 'Por que escolher a Smart Company?',
    content: '',
    metadata: {
      reasons: [
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
    }
  },
  {
    site_slug: 'smartcompany',
    section_key: 'home_journeys',
    title: 'Nossa Expertise nas Suas Mãos',
    content: JSON.stringify([
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
    ])
  },
  {
    site_slug: 'smartcompany',
    section_key: 'home_pillars',
    title: 'Domine sua Empresa',
    content: JSON.stringify([
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
    ])
  },
  {
    site_slug: 'smartcompany',
    section_key: 'home_auto_gestao_checklist',
    title: 'O que você vai aprender',
    content: JSON.stringify([
      'Ter segurança financeira',
      'Montar um time Capacitado e Motivado',
      'Diminuir o stress e ter mais tranquilidade',
      'Aumentar seu Pro-labore sem sangrar o caixa',
      'Concretizar seus sonhos',
      'Impulsionar a empresa ao crescimento',
      'Liderar com inteligência'
    ])
  },
  {
    site_slug: 'smartcompany',
    section_key: 'home_mentor',
    title: 'Seu Mentor Antonio Geraldes',
    content: JSON.stringify({
      name: 'Antonio Geraldes',
      bio: 'Empresário há mais de 30 anos, investidor e mentor empresarial. Entre as empresas que fundei, está a Smart Company – Estratégia, Gestão e Resultados e criei o AG Expert – Auto Gestão Empresarial; C.I.A.: Comercial Inteligente e Ativo e outros Programas para Gestão. Portanto, prestei Consultoria presencialmente em mais de 100 empresas sempre motivado por gerar resultados positivos. Como resultado, realizei Diagnósticos, Planos de Ação e deixei um legado de equipes extraordinárias, contribuindo para o sucesso destas empresas.\n\nO resultado da nossa metodologia é um formato de Gestão onde o Dono e os Gestores podem focar na Estratégia e no Crescimento do Negócio.',
      title: 'Consultoria e gestão - Smart Company - Antonio Geraldes Gestor',
      imageUrl: '/assets/Ola-sou-Antonio-Geraldes-copia-scaled.jpg',
      heading: '30 Anos de Experiência e Mais de 100 Consultorias'
    })
  },
  {
    site_slug: 'smartcompany',
    section_key: 'home_cursos',
    title: 'Nossas Formações On Line',
    content: JSON.stringify([
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
    ])
  },
  {
    site_slug: 'smartcompany',
    section_key: 'home_agir_vs_reagir',
    title: 'Empresário deve Agir antes de Reagir',
    content: JSON.stringify({
      quote: 'EMPRESÁRIO DEVE AGIR ANTES DE REAGIR',
      agir: 'AGIR: É tomar providências, atuar, fazer, realizar, produzir;',
      reagir: 'REAGIR: É exercer reação contra. Opor a uma reação que lhe é contrária.',
      body: 'Percebe que se trata de uma Atitude, que vem antes da reação? Isso quer dizer que agindo você está sempre um passo a frente. Um passo antes de os problemas ocorrerem (ou piorarem) ou um passo a frente do seu concorrente. Sabe aquele velha e boa frase, é melhor prevenir do que remediar, se aplica exatamente aqui, você toma atitude antes e de forma preventiva. Portanto, seguindo a Metodologia, você vai ganhar liberdade financeira e liberdade de tempo para cuidar do crescimento do seu negócio e terá tempo para sua família e viagens, porque afinal de contas, a verdade é que você não quer só dinheiro, quer as suas liberdades.',
      cta: 'Quero agir On Line com o Programa de Auto Gestão'
    })
  },
  {
    site_slug: 'smartcompany',
    section_key: 'home_coragem',
    title: 'É preciso coragem para ser empresário',
    content: JSON.stringify({
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
    })
  },
  {
    site_slug: 'smartcompany',
    section_key: 'home_transformacao',
    title: 'Smart Company — Transformação!',
    content: JSON.stringify({
      intro: 'O AG EXPERT é um programa completo que orienta de forma objetiva e clara os passos essenciais para o empresário conduzir o negócio dele de forma mais assertiva, com mais clareza, tranquilidade e sempre envolvendo sua equipe na busca de melhoria dos resultados da empresa, sejam eles no aumento das vendas, lucro ou performance de entrega.',
      foco_dono: {
        title: 'O Foco do Dono',
        desc: 'A Smart Company foca no Crescimento Estratégico e geração de Lucro. Portanto, tem a tranquilidade de saber que seu time vai entregar os resultados, o que permite pensar na estratégia da empresa. Em primeiro lugar, a empresa prioriza a eficiência operacional, certamente, com a convicção de que isso impulsionará seu sucesso. Além disso, está sempre em busca de inovação e melhoria contínua. Em conclusão, a Smart Company é uma referência no mercado, resumindo, pela sua abordagem focada e eficaz.'
      },
      foco_equipe: {
        title: 'O Foco da Equipe',
        desc: 'A Smart é comprometida com os processos, organização e entregas. Assim, foca na solução dos problemas, liberando o empresário para pensar na estratégia da empresa. Consequentemente, permite que o gestor direcione seus esforços para áreas mais estratégicas. Além disso, alavancando estes processos, a Smart garante maior eficiência operacional. Enquanto isso, o empresário pode se dedicar a questões de maior importância.'
      },
      livro: {
        title: 'O curso de Auto Gestão Expert é como uma Alavanca e multiplica sua força',
        desc: 'O curso de Auto Gestão Expert é como uma Alavanca e multiplica sua força. Traz um pacote completo de soluções que orienta o empresário a envolver equipe na busca de melhoria dos resultados da empresa, sejam eles no aumento das vendas, lucro ou performance de entrega. A equipe passa a focar na solução dos problemas e o Dono na geração de Lucro. Com o tempo vai liberando o empresário para pensar na estratégia da empresa.',
        quote: 'O AG EXPERT (AUTO GESTÃO EXPERT) da Smart Company é um programa completo que orienta de forma muito objetiva e clara os passos essenciais para o empresário conseguir conduzir o negócio dele de forma mais assertiva, com mais clareza, tranquilidade e sempre envolvendo sua equipe na busca de melhoria dos resultados da empresa, sejam eles no aumento das vendas, lucro ou performance de entrega.',
        footnote: 'A proposta é que o Dono tenha a “Gestão na Mão” com ferramentas eficazes, montar um time capacitado e conduzir de forma motivadora, medindo o desempenho dela, para que atinja os objetivos do negócio.'
      }
    })
  },
  {
    site_slug: 'smartcompany',
    section_key: 'home_ebooks',
    title: 'Conteúdos Cortesia',
    content: JSON.stringify([
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
    ])
  },

  // ─── COMO TRANSFORMAAMOS ──────────────────────────────────────────────────
  {
    site_slug: 'smartcompany',
    section_key: 'comotransformamos_hero',
    title: 'Como Transformamos Empresas?',
    content: 'Amamos o que fazemos! A nossa consultoria e gestão são personalizadas para a realidade do seu negócio, identificando gargalos e construindo soluções com payback real.',
    metadata: {
      badge: 'Metodologia Taylor-Made',
      subtitle: 'Diagnosticamos • Planejamos • Executamos'
    }
  },
  {
    site_slug: 'smartcompany',
    section_key: 'comotransformamos_stats',
    title: 'Estatísticas de Sucesso',
    content: '',
    metadata: {
      stats: [
        { number: '70+', label: 'Diagnósticos Realizados' },
        { number: '100%', label: 'Clientes Satisfeitos' },
        { number: '95%', label: 'Conversão em Projeto' },
        { number: '100%', label: 'Entregues no Prazo e Custo' }
      ]
    }
  },
  {
    site_slug: 'smartcompany',
    section_key: 'comotransformamos_faqs',
    title: 'Perguntas Frequentes',
    content: '',
    metadata: {
      faqs: [
        {
          q: 'Quanto tempo leva para realizar um Diagnóstico?',
          a: 'Em média leva de 3 a 4 semanas, podendo variar conforme a complexidade operacional da empresa e a velocidade de disponibilização de dados pelo cliente.'
        },
        {
          q: 'O diagnóstico atrapalha a rotina da empresa?',
          a: 'Não, de forma alguma. Por já termos realizado este procedimento mais de 70 vezes, aprimoramos o cronograma de coletas e entrevistas de modo que seja executado de forma fluida sem paralisar a rotina.'
        },
        {
          q: 'Em quanto tempo deve ser realizada a Fase 2 (Implantação)?',
          a: 'Depende diretamente das carências e prioridades detectadas na Fase de Diagnóstico. Pode levar desde poucos meses para ajustes focados, até pouco mais de 1 ano para reestruturações totais.'
        },
        {
          q: 'Qual será o valor investido?',
          a: 'O valor é ponderado conforme o perfil dos consultores seniores alocados e a carga horária de dedicação exigida. Tomamos o cuidado de desenhar propostas viáveis, ajustadas à realidade financeira da empresa.'
        },
        {
          q: 'O projeto se paga? Há payback?',
          a: 'Sim. Durante a apresentação do laudo do Diagnóstico, apresentamos o cálculo do Payback projetado (relação entre honorários e o retorno financeiro gerado em até 24 meses pelas melhorias implatadas).'
        }
      ]
    }
  },

  // ─── AG EXPERT ────────────────────────────────────────────────────────────
  {
    site_slug: 'smartcompany',
    section_key: 'agexpert_hero',
    title: '+ LUCRO - INCÊNDIO com Plano de 22 dias',
    content: 'Sua empresa NÃO pode depender totalmente de você. Obtenha mais resultados, menos problemas operacionais, mais organização e tempo livre para a família.',
    metadata: {
      badge: 'Auto Gestão Empresarial (10 a 500 colaboradores)'
    }
  },
  {
    site_slug: 'smartcompany',
    section_key: 'agexpert_faqs',
    title: 'Perguntas Frequentes do Curso',
    content: '',
    metadata: {
      faqs: [
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
    }
  },
  {
    site_slug: 'smartcompany',
    section_key: 'agexpert_painPoints',
    title: 'Dores de Gestão',
    content: JSON.stringify([
      'Não gera o lucro ideal esperado para o volume de esforço.',
      'Prende o Dono em rotinas operacionais (apagando incêndios diários).',
      'Falta de processos definidos e equipe com baixo comprometimento.',
      'Consome todo o seu tempo livre, gerando stress e desgaste familiar.',
      'Ausência de indicadores claros de performance por departamento.'
    ])
  },
  {
    site_slug: 'smartcompany',
    section_key: 'agexpert_modules',
    title: 'O que você vai aprender na prática',
    content: JSON.stringify([
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
    ])
  },
  {
    site_slug: 'smartcompany',
    section_key: 'agexpert_bonuses',
    title: 'Bônus do AG Expert',
    content: JSON.stringify([
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
    ])
  },

  // ─── CURSO CIA ────────────────────────────────────────────────────────────
  {
    site_slug: 'smartcompany',
    section_key: 'cursocia_hero',
    title: 'Alavanque as vendas estruturando seu Comercial',
    content: 'Venda de forma inteligente e com margem real. Descubra como estruturar sua força de vendas de ponta a ponta e bater metas mesmo em mercados competitivos.',
    metadata: {
      badge: 'Comercial Inteligente e Ativo'
    }
  },
  {
    site_slug: 'smartcompany',
    section_key: 'cursocia_faqs',
    title: 'Perguntas Frequentes do Comercial',
    content: '',
    metadata: {
      faqs: [
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
    }
  },
  {
    site_slug: 'smartcompany',
    section_key: 'cursocia_targets',
    title: 'Metas e Alvos Comerciais',
    content: JSON.stringify([
      'Como dobrar ou triplicar o volume de vendas do seu time.',
      'Como mapear e conquistar novos clientes qualificados.',
      'Vender com margem técnica e manter o lucro em cada pedido.',
      'Onde encontrar o seu cliente ideal (ICP) de forma ativa.',
      'Como organizar e gerenciar a rotina do setor comercial.',
      'Como desdobrar metas de forma justa e superá-las com recorrência.'
    ])
  },
  {
    site_slug: 'smartcompany',
    section_key: 'cursocia_modules',
    title: 'Estrutura de Ensino do CIA',
    content: JSON.stringify([
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
    ])
  },
  {
    site_slug: 'smartcompany',
    section_key: 'cursocia_bonuses',
    title: 'Bônus do CIA',
    content: JSON.stringify([
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
    ])
  },

  // ─── VALUATION ────────────────────────────────────────────────────────────
  {
    site_slug: 'smartcompany',
    section_key: 'valuation_hero',
    title: 'VOCÊ SABE QUANTO VALE SUA EMPRESA?',
    content: 'Avaliação, compra e venda de empresas é um assunto técnico e sério. Concluímos o valor de mercado (Valuation) através de metodologias consagradas como Fluxo de Caixa Descontado (FCF) e múltiplos de EBITDA.',
    metadata: {
      badge: 'Fusões, Aquisições & Valuation'
    }
  },
  {
    site_slug: 'smartcompany',
    section_key: 'valuation_opportunities',
    title: 'Oportunidades de Aquisição',
    content: '',
    metadata: {
      opportunities: [
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
    }
  },
  {
    site_slug: 'smartcompany',
    section_key: 'valuation_phases',
    title: 'Como estruturamos a venda',
    content: '',
    metadata: {
      phases: [
        { name: 'Valuation', desc: 'Conclusão técnica do valor justo do negócio sem contaminação emocional.' },
        { name: 'Teaser Comercial', desc: 'Elaboração de documento resumido sem identificação (preservando o sigilo).' },
        { name: 'NDA (Confidencialidade)', desc: 'Assinatura de termo legal antes de abrir qualquer dado estratégico.' },
        { name: 'Apresentação do Negócio', desc: 'Reunião qualificada para apresentação do plano financeiro e operacional.' },
        { name: 'Carta de Intenções', desc: 'Formalização do interesse de compra e alinhamento de termos básicos (LOI).' },
        { name: 'Estudos de Viabilidade', desc: 'Mapeamento de sinergias operacionais e projeções pós-aquisição.' },
        { name: 'Acompanhamento de Due Diligence', desc: 'Apoio técnico na entrega de certidões, contabilidade e auditoria interna.' },
        { name: 'Formalização Jurídica', desc: 'Suporte na elaboração dos contratos definitivos de compra e venda (SPA).' }
      ]
    }
  },

  // ─── IMERSAO OMAPPA ───────────────────────────────────────────────────────
  {
    site_slug: 'smartcompany',
    section_key: 'imersao-omappa_hero',
    title: 'Imersão OMAPPA',
    content: 'Venha viver a experiência prática que vai Nortear o seu Negócio! Se você precisa aumentar o lucro, definir processos, reduzir desperdícios, ganhar produtividade, alcançar metas com planos de ação e motivar sua equipe através de indicadores eficientes.',
    metadata: {
      badge: 'Imersão Exclusiva para Empresários'
    }
  },
  {
    site_slug: 'smartcompany',
    section_key: 'imersao-omappa_pillars',
    title: 'A Jornada OMAPPA',
    content: JSON.stringify([
      {
        letter: 'O',
        title: 'Oportunidades',
        description: 'Identificação de melhorias internas (margem de lucro, desperdícios, vendas) e externas (novos canais, nichos inexplorados). A crise está na mentalidade; a oportunidade está na ação.'
      },
      {
        letter: 'M',
        title: 'Metas',
        description: 'Desdobramento de Metas Macros, Táticas e Operacionais. Um mapa de sucesso exige um destino final claro para alinhar o dono e toda a equipe.'
      },
      {
        letter: 'A',
        title: 'Acesso',
        description: 'O planejamento do trajeto real para atingir as metas. Mapeamento de recursos necessários, investimentos, cronogramas de implantação e controle de riscos.'
      },
      {
        letter: 'P',
        title: 'Pessoas',
        description: 'Como recrutar, capacitar e motivar o time. Uma liderança forte engaja os colaboradores certos para que a empresa cresça de forma sustentável.'
      },
      {
        letter: 'P',
        title: 'Processos',
        description: 'Padronização e melhoria contínua (PDCA, Kaizen, 5S). Processos estruturados garantem produtividade e previsibilidade, reduzindo a dependência da presença do dono.'
      },
      {
        letter: 'A',
        title: 'Avaliação',
        description: 'Composição de custos, precificação adequada (mark-up e mark-down), acompanhamento de KPI\'s e sistemas de meritocracia para consolidar a evolução.'
      }
    ])
  },
  {
    site_slug: 'smartcompany',
    section_key: 'imersao-omappa_testimonies',
    title: 'Depoimentos de Empresários',
    content: JSON.stringify([
      {
        author: 'Alexandre Pereira',
        role: 'Diretor',
        company: 'Emblemax Indústria (São Paulo/SP)',
        avatar: '/assets/logo-emblemax-1.png',
        text: 'Vim participar da imersão OMAPPA e realmente achei que foi um evento que valeu cada centavo. Saio totalmente renovado, com a cabeça fervendo de ideias para aplicar na minha indústria. Recomendo fortemente, o Antonio é excelente!',
        videoUrl: 'https://youtube.com/shorts/4JMejMJVGf0',
        embedId: '4JMejMJVGf0'
      },
      {
        author: 'Major Castro',
        role: 'Presidente',
        company: 'Rotary Suzano / Advocacia Treinamentos',
        text: 'Um dia excelente de imersão OMAPPA. Tivemos conhecimentos gerenciais e administrativos fundamentais para melhorar a qualidade de qualquer investimento. Todo empresário que queira crescer precisa disso.',
        videoUrl: 'https://youtube.com/shorts/0hgfurSM8oU',
        embedId: '0hgfurSM8oU'
      },
      {
        author: 'Ramon Alonso',
        role: 'Diretor',
        company: 'Aquazul Piscinas e Lagos (Mogi das Cruzes/SP)',
        avatar: '/assets/logo-aquazul.jpeg',
        text: 'Participei da Imersão OMAPPA do Antonio Geraldes e quero deixar meu sincero agradecimento. Foi um evento fantástico, muito rico em insights práticos e com grande aprendizado para nosso negócio de piscinas.',
        videoUrl: 'https://youtube.com/shorts/pxVjJUgZI2o',
        embedId: 'pxVjJUgZI2o'
      }
    ])
  },
  {
    site_slug: 'smartcompany',
    section_key: 'imersao-omappa_faqs',
    title: 'Perguntas Frequentes',
    content: JSON.stringify([
      {
        question: 'Não tenho tempo para fazer essa imersão!',
        answer: 'A falta de tempo é o sintoma mais claro de que sua empresa está desorganizada e operando no caos. Se você passa o dia apagando incêndios no operacional, é justamente porque não tem processos e pessoas treinadas. Investir um dia na imersão OMAPPA vai te dar as ferramentas para estruturar o tático e o operacional, fazendo o seu time entregar mais e te liberando para focar na estratégia e no crescimento do negócio.'
      },
      {
        question: 'Não tenho dinheiro para investir agora!',
        answer: 'O ingresso pode ser parcelado em até 10 vezes no cartão de crédito. Se sua empresa não está gerando caixa para cobrir um investimento em conhecimento de um dia, isso significa que seu modelo de vendas ou de custos está falho. É exatamente por isso que você precisa vir: para aprender a formar custos, preços, aumentar a margem e impulsionar o seu faturamento de forma imediata.'
      },
      {
        question: 'Para quem é indicada esta imersão?',
        answer: 'A imersão OMAPPA é exclusiva para donos de empresas, diretores, sócios e gestores de pequenas e médias empresas (indústrias, comércios, prestadoras de serviços e startups) que buscam maior lucratividade, profissionalização da equipe e a estruturação de planos de ação práticos.'
      },
      {
        question: 'O que está incluso no ingresso da imersão?',
        answer: 'O ingresso garante sua vaga no evento 100% presencial, material didático impresso e em formato digital (PDF), ferramentas exclusivas de diagnóstico prático, atividades de mão na massa para aplicar no seu negócio e acesso a uma rede de networking qualificada com dezenas de outros empresários.'
      }
    ])
  },

  // ─── NOSSA EQUIPE ─────────────────────────────────────────────────────────
  {
    site_slug: 'smartcompany',
    section_key: 'nossa-equipe_hero',
    title: 'Nosso Time Smart',
    content: 'Nossa equipe agrega vivências corporativas diversas para entregar resultados de alto nível. Para prover consultoria de excelência, acreditamos que é preciso ser polivalente. Nosso time é formado por administradores, economistas, engenheiros, contadores, psicólogos e tecnólogos.',
    metadata: {
      badge: 'Consultores Multidisciplinares'
    }
  },
  {
    site_slug: 'smartcompany',
    section_key: 'nossa_equipe_members',
    title: 'Membros da Equipe',
    content: '',
    metadata: {
      members: [
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
    }
  },

  // ─── RECOMENDAÇÕES ────────────────────────────────────────────────────────
  {
    site_slug: 'smartcompany',
    section_key: 'recomendacoes_hero',
    title: 'Livros & Filmes Recomendados',
    content: 'Recomendações selecionadas pessoalmente por Antonio Geraldes para inspirar, motivar e instruir empresários e gestores em sua busca por excelência.',
    metadata: {
      badge: 'Acervo de Sucesso'
    }
  },
  {
    site_slug: 'smartcompany',
    section_key: 'recomendacoes_items',
    title: 'Acervo Recomendado',
    content: '',
    metadata: {
      books: [
        {
          "title": "Você Pode Curar Sua Vida",
          "author": "Louise L. Hay",
          "review": "Eu passei a investir em ideias e vibrações positivas e vi como foi possível viver plenamente e melhorar a minha qualidade de vida. É um método de cura holística e Louise Hay ensina como aplicar em nossas vidas. Acredito que, com o tempo, os resultados serão ainda mais significativos.",
          "image": "https://covers.openlibrary.org/b/id/715608-M.jpg"
        },
        {
          "title": "Pai Rico Pai Pobre",
          "author": "Robert T. Kiyosaki",
          "review": "Pai Rico Pai Pobre ilustra a diferença entre ativos e passivos, o que ajuda a definir onde investir o dinheiro sem agregar ainda mais gastos. Este é um factor fundamental que separa os ricos dos demais.",
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
      ],
      movies: [
        {
          "title": "Jerry Maguire (1996)",
          "review": "Um agente de uma empresa internacional de gerenciamento de esportes pede demissão devido ao seu compromisso com suas crenças e honestidade. Ele reestrutura seu setor com um modelo de negócios focado na lealdade aos clientes, o que lhe permite transformar uma pequena operação em um verdadeiro concorrente de peso.",
          "image": "https://upload.wikimedia.org/wikipedia/en/e/ea/Jerry_Maguire_movie_poster.jpg"
        },
        {
          "title": "Joy: O Nome do Sucesso (2015)",
          "review": "Jennifer Lawrence brilha como Joy, uma aspirante a empreendedora com uma vida pessoal complicada. O filme narra os desafios de uma fundadora que inicia, protege suas patentes e escala uma empresa de manufatura, encontrando parcerias cruciais ao longo da jornada.",
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
    }
  },

  // ─── MATERIAIS ────────────────────────────────────────────────────────────
  {
    site_slug: 'smartcompany',
    section_key: 'materiais_hero',
    title: 'Materiais Educativos',
    content: 'Baixe e-books exclusivos elaborados por Antonio Geraldes e sua equipe para aprimorar a gestão comercial, financeira e a liderança do seu negócio.',
    metadata: {
      badge: 'Materiais de Apoio'
    }
  },
  {
    site_slug: 'smartcompany',
    section_key: 'materiais_ebooks',
    title: 'Ebooks Educativos',
    content: JSON.stringify([
      {
        id: 'funil-negocios',
        title: 'Funil de Negócios & Conversão',
        subtitle: 'Técnicas de Gestão Comercial',
        description: 'Existem 2 tipos de funis comerciais fundamentais para o crescimento das vendas e talvez você não saiba. Aprenda a estruturar cada um deles.',
        price: 'Gratuito',
        isFree: true,
        coverColor: 'from-[#144F61] to-[#206F85]',
        accentColor: 'text-[#206F85]',
        bullets: [
          'Diferença prática entre Funil de Prospecção e Funil de Vendas.',
          'Como calcular taxas de conversão por etapa do funil.',
          'Estratégias para evitar gargalos e perdas no processo comercial.'
        ],
        downloadUrl: '#',
        image: '/assets/Capa-Funil-de-negocios.png'
      },
      {
        id: 'metodo-cumbuca',
        title: 'O Método Cumbuca de Estudo',
        subtitle: 'Incentivando sua equipe a adquirir conhecimento',
        description: 'Conheça o método clássico popularizado por Vicente Falconi que promove aprendizado e interação da equipe de forma simples, contínua e divertida.',
        price: 'Gratuito',
        isFree: true,
        coverColor: 'from-amber-600 to-yellow-600',
        accentColor: 'text-amber-500',
        bullets: [
          'Como organizar reuniões semanais de cumbuca sem consumir tempo produtivo.',
          'Engajamento ativo dos colaboradores na leitura de livros estratégicos.',
          'Construção de uma cultura de aprendizado contínuo dentro da empresa.'
        ],
        downloadUrl: '#',
        image: '/assets/metodo-cumbuca.png'
      },
      {
        id: 'inteligencia-emocional',
        title: 'Inteligência Emocional na Liderança',
        subtitle: 'Desperte o líder que existe em você',
        description: 'Aprenda a reconhecer e gerenciar emoções — tanto as suas quanto as dos outros — para liderar equipes com maior equilíbrio, empatia e resiliência.',
        price: 'Gratuito',
        isFree: true,
        coverColor: 'from-[#0F2A4A] to-[#1E4D80]',
        accentColor: 'text-[#1E4D80]',
        bullets: [
          'As 5 habilidades essenciais da inteligência emocional segundo Daniel Goleman.',
          'Técnicas práticas para autocontrole sob estresse e pressão.',
          'Como motivar e engajar colaboradores em momentos de crise.'
        ],
        downloadUrl: '#',
        image: '/assets/inteligencia-emocional.jpg'
      },
      {
        id: 'jeff-bezos',
        title: 'E-book Jeff Bezos: A Regra de 1 Dia',
        subtitle: 'Melhore o rendimento da sua equipe com lições da Amazon',
        description: 'Aprenda a otimizar processos de decisão e manter a mentalidade ágil de uma startup mesmo em corporações em pleno crescimento.',
        price: 'Gratuito',
        isFree: true,
        coverColor: 'from-purple-700 to-violet-500',
        accentColor: 'text-violet-400',
        bullets: [
          'O conceito de "Dia 1" de Jeff Bezos para evitar a burocracia.',
          'Como delegar e acelerar a tomada de decisões na empresa.',
          'Técnicas de liderança focadas em foco absoluto no cliente.'
        ],
        downloadUrl: '#',
        image: '/assets/ebook-amazon.png'
      },
      {
        id: 'gatilhos-mentais',
        title: 'Gatilhos Mentais: Manual Completo',
        subtitle: 'Desbravando a mente do consumidor para vendas',
        description: 'Descubra as táticas psicológicas comprovadas para aumentar sua conversão, quebrar objeções e fechar mais negócios de forma ética.',
        price: 'R$ 9,90',
        isFree: false,
        coverColor: 'from-emerald-700 to-teal-600',
        accentColor: 'text-emerald-500',
        bullets: [
          'Estudo detalhado de 14 gatilhos mentais aplicados ao marketing online.',
          'Como gerar escassez, urgência e prova social para acelerar compras.',
          'Exemplos de roteiros de vendas com alta taxa de conversão.'
        ],
        image: '/assets/gatilhos-mentais.png'
      }
    ])
  }
];

async function seed() {
  console.log('Iniciando o seed completo de todas as seções no Supabase...');
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
    console.log('Processo de seed completo finalizado com sucesso!');
  } catch (err) {
    console.error('Erro catastrófico no seed:', err);
    process.exit(1);
  }
}

seed();
