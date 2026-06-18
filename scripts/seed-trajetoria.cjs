const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// ─── Load .env ───────────────────────────────────────────────────────────────
const dotenvPath = path.join(__dirname, '../.env');
if (fs.existsSync(dotenvPath)) {
  fs.readFileSync(dotenvPath, 'utf8').split(/\r?\n/).forEach(line => {
    const t = line.trim();
    if (t && !t.startsWith('#')) {
      const i = t.indexOf('=');
      let v = t.slice(i + 1).trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
      process.env[t.slice(0, i).trim()] = v;
    }
  });
}

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// ─── Dados (espelham os defaults de src/pages/NossaTrajetoria.tsx) ────────────
const timelineEvents = [
  { year: '2001', title: 'Nascemos como Fábrica', desc: 'Abertura do CNPJ Smart Company. Start Up focada em projetar e fabricar cubas especiais de quartzo e resinas polimerizadas com tecnologia inédita no Brasil, instalando peças lindas em residências de alto padrão (Tamboré e Alphaville).' },
  { year: '2003', title: 'Foco e Transição', desc: 'Após mudanças do mercado e sucesso de destaque na mídia (matéria de 1/2 página na revista Arquitetura & Construção), decidimos colocar a produção em stand-by e direcionar a expertise para consultoria e planejamento.' },
  { year: '2004', title: 'Consultoria de Estratégia', desc: 'Início oficial da prestação de serviços de Consultoria em Estratégia, Gestão e Planos de Negócios (Business Plan), atuando diretamente na recuperação e aceleração operacional de parceiros.' },
  { year: '2006', title: 'Boutique Jurídica', desc: 'Afiliação a uma Boutique Jurídica em São Paulo com foco em Fusões & Aquisições (M&A), reorganizações societárias complexas, blindagem patrimonial e holding.' },
  { year: '2007', title: 'Formatação de Franquias', desc: 'Estruturação de know-how e expansão de mercado com foco em formatação técnica de redes de franquias de diversos segmentos.' },
  { year: '2011', title: 'Projeto Amazzone', desc: 'Desenvolvimento do plano de negócios (Business Plan) para a Amazzone Cosméticos, projetando atração internacional de investimentos.' },
  { year: '2012', title: 'Registro de Marca & CIESP', desc: 'Registro formal da logomarca Smart Company no INPI e afiliação oficial ao CIESP para estreitar laços com o ecossistema industrial.' },
  { year: '2018', title: 'Smart On-Line', desc: 'Início do planejamento da plataforma Smart On-Line, viabilizando consultorias à distância e treinamentos digitais escaláveis.' },
  { year: '2019', title: 'Maioridade & Check Up', desc: 'A Smart Company completa 18 anos de história e lança o "Check Up Empresas" — o primeiro diagnóstico empresarial 100% estruturado de forma online.' },
  { year: '2020', title: 'Lançamento de Info-Produtos', desc: 'Lançamento nacional das formações proprietárias online: Curso AG Expert (Auto Gestão para Sócios) e Curso C.I.A. (Comercial Inteligente e Ativo).' },
  { year: '2023', title: 'Auto Diagnóstico', desc: 'Implantação do Termômetro e Auto Diagnóstico interativo de 5 pilares com a meta de liderar as ferramentas de performance orientativa no Brasil.' },
];

const gallery = [
  { title: 'Busca de Inovação', image_url: '/assets/trajetoria/viagem_eua.jpg', desc: 'Viagem aos EUA em busca de novos produtos e tecnologias para o mercado brasileiro.' },
  { title: 'Engenharia Reversa', image_url: '/assets/trajetoria/engenharia_reversa.jpg', desc: 'Engenharia reversa no produto Americano e nosso primeiro protótipo sendo preparado manualmente.' },
  { title: 'Primeira Cuba Instalada', image_url: '/assets/trajetoria/cuba_instalada.jpg', desc: 'Cuba remodelada para o modelo Smart Company e devidamente instalada.' },
  { title: 'Homologação de Fornecedores', image_url: '/assets/trajetoria/homologacao_fornecedor.jpg', desc: 'Decisão de terceirizar em grande escala. Sr. Santiago à esquerda e o pai do fundador, Sr. Francisco Geraldes, à direita.' },
  { title: 'Desenvolvimento de Design', image_url: '/assets/trajetoria/remodelagem_cuba.jpg', desc: 'Remodelagem para um dos designs proprietários desenvolvidos.' },
  { title: 'Contra-Molde', image_url: '/assets/trajetoria/contra_molde.jpg', desc: 'Preparando os ajustes e acabamento do contra-molde de laminação.' },
  { title: 'Catálogo de Produtos', image_url: '/assets/trajetoria/folder_modelos.jpg', desc: 'Folder original apresentando os 6 modelos de cubas desenvolvidos.' },
  { title: 'Acessórios Exclusivos', image_url: '/assets/trajetoria/escorredor_aramado.png', desc: 'Escorredor aramado com pintura eletrostática, projetado sob medida para legumes e frutas.' },
  { title: 'Exposição Comercial (2001)', image_url: '/assets/trajetoria/display_mogi.jpg', desc: 'Display de exposição das Cubas Smart no Mogi Shopping.' },
  { title: 'Sucesso na Mídia (Julho/2003)', image_url: '/assets/trajetoria/revista_capa.jpg', desc: 'Nossas peças ganharam destaque gratuito espontâneo na prestigiada revista Arquitetura & Construção.' },
  { title: 'Destaque Editorial', image_url: '/assets/trajetoria/revista_pagina.jpg', desc: 'Destaque de 1/2 página dedicado ao nosso produto inovador na revista. Emoção indescritível na época!' },
  { title: 'Residência de Alto Padrão', image_url: '/assets/trajetoria/revista_close.jpg', desc: 'Instalação de 3 cubas Smart em uma residência de luxo no Condomínio Tamboré (SP).' },
];

const sections = [
  {
    site_slug: 'smartcompany',
    section_key: 'trajetoria_hero',
    title: 'NOSSA TRAJETÓRIA',
    content: 'De startup pioneira em cubas de quartzo à referência consolidada em consultoria empresarial de alto impacto e auto diagnóstico de gestão.',
    metadata: { badge: 'História & Evolução' },
    order_index: 1,
  },
  {
    site_slug: 'smartcompany',
    section_key: 'trajetoria_timeline',
    title: 'Nossa Linha do Tempo',
    content: 'Acompanhe a evolução dos marcos históricos da Smart Company ao longo das décadas.',
    metadata: { events: timelineEvents },
    order_index: 2,
  },
  {
    site_slug: 'smartcompany',
    section_key: 'trajetoria_gallery',
    title: 'Galeria Histórica',
    content: 'Registros visuais da nossa jornada, dos primeiros protótipos ao reconhecimento na mídia nacional.',
    metadata: { gallery },
    order_index: 3,
  },
  {
    site_slug: 'smartcompany',
    section_key: 'trajetoria_cta',
    title: 'Chamada para Ação',
    content: '',
    metadata: { label: 'Conheça Nossos Serviços', link: '/como-transformamos-empresas' },
    order_index: 4,
  },
];

(async () => {
  console.log('Inserindo seções de Nossa Trajetória...');
  for (const s of sections) {
    const { error } = await supabase
      .from('site_sections')
      .upsert({ ...s, updated_at: new Date().toISOString() }, { onConflict: 'site_slug,section_key' });
    if (error) {
      console.error(`✗ ${s.section_key}:`, error.message);
    } else {
      console.log(`✓ ${s.section_key}`);
    }
  }
  console.log('Concluído.');
})();
