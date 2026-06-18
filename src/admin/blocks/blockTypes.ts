// ─────────────────────────────────────────────────────────────────────────────
// Definição dos blocos do construtor de páginas (Opção A — páginas dinâmicas)
// Cada página personalizada é uma linha em `site_sections` com section_key
// `cpage_<slug>` e metadata = { title?, seo_description, status, show_in_menu,
// menu_order, blocks: Block[] }.
// ─────────────────────────────────────────────────────────────────────────────

export type BlockType = 'hero' | 'text' | 'image' | 'cards' | 'cta'

export interface Block {
  id: string
  type: BlockType
  data: Record<string, any>
}

export interface CustomPageMeta {
  seo_description: string
  status: 'draft' | 'published'
  show_in_menu: boolean
  menu_order: number
  blocks: Block[]
}

export interface CustomPage extends CustomPageMeta {
  slug: string
  title: string
}

export const SECTION_KEY_PREFIX = 'cpage_'

export interface BlockDef {
  type: BlockType
  label: string
  description: string
  defaultData: Record<string, any>
}

export const BLOCK_DEFS: BlockDef[] = [
  {
    type: 'hero',
    label: 'Banner (Hero)',
    description: 'Selo, título grande e texto de abertura.',
    defaultData: {
      badge: 'Selo / Categoria',
      title: 'Título principal da página',
      content: 'Um parágrafo de abertura que apresenta a página.',
    },
  },
  {
    type: 'text',
    label: 'Texto',
    description: 'Um título de seção e um parágrafo de conteúdo.',
    defaultData: {
      heading: 'Título da seção',
      body: 'Escreva aqui o conteúdo desta seção.',
    },
  },
  {
    type: 'image',
    label: 'Imagem',
    description: 'Uma imagem com legenda opcional.',
    defaultData: {
      url: '',
      alt: 'Descrição da imagem',
      caption: '',
    },
  },
  {
    type: 'cards',
    label: 'Cards',
    description: 'Título + lista de cartões (título e descrição).',
    defaultData: {
      heading: 'Nossos diferenciais',
      items: [
        { title: 'Card 1', desc: 'Descrição do primeiro card.' },
        { title: 'Card 2', desc: 'Descrição do segundo card.' },
        { title: 'Card 3', desc: 'Descrição do terceiro card.' },
      ],
    },
  },
  {
    type: 'cta',
    label: 'Chamada para Ação (CTA)',
    description: 'Bloco de destaque com botão e link.',
    defaultData: {
      heading: 'Pronto para começar?',
      text: 'Fale com nossa equipe e dê o próximo passo.',
      label: 'Entrar em contato',
      link: '/contato',
    },
  },
]

export function blockDefFor(type: BlockType): BlockDef | undefined {
  return BLOCK_DEFS.find(b => b.type === type)
}

// Gera um id simples e único para um bloco (uso em runtime do navegador)
export function newBlockId(): string {
  return `b_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    // eslint-disable-next-line no-misleading-character-class
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
