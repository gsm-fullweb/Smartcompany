import { useState } from 'react'
import { BookOpen, Film, Search, Quote } from 'lucide-react'
import { useDynamicContent } from '../hooks/useDynamicContent'
import SEO from '../components/SEO'
import EditableText from '../admin/inline/EditableText'
import EditableImage from '../admin/inline/EditableImage'
import { StaticContent } from '../admin/inline/StaticContent'
import EditableStatic from '../admin/inline/EditableStatic'

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

export default function Recomendacoes() {
  const defaultHero = {
    badge: 'Acervo de Sucesso',
    title: 'Livros & Filmes Recomendados',
    content: 'Recomendações selecionadas pessoalmente por Antonio Geraldes para inspirar, motivar e instruir empresários e gestores em sua busca por excelência.'
  }
  
  const { hero, books, movies } = useDynamicContent('recomendacoes', { 
    hero: defaultHero, 
    books: defaultBooks, 
    movies: defaultMovies 
  })

  const [activeTab, setActiveTab] = useState<'livros' | 'filmes'>('livros')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredItems = (activeTab === 'livros' ? books : movies).filter((item: any) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (activeTab === 'livros' && (item as any).author.toLowerCase().includes(searchTerm.toLowerCase())) ||
    item.review.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <StaticContent pageKey="recomendacoes">
    <div className="bg-primary-dark pt-24 min-h-screen text-slate-300 font-sans">
      <SEO
        title="Livros e Filmes Recomendados para Empresários" 
        description="Confira uma curadoria exclusiva de obras de liderança, estratégia, vendas e negócios recomendadas por Antonio Geraldes." 
      />
      {/* Banner Header */}
      <section className="relative bg-[#070F1E] py-20 border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <EditableText
            as="span"
            sectionKey="recomendacoes_hero"
            path={['metadata', 'badge']}
            value={hero.badge}
            className="text-[10px] font-bold text-gold-primary uppercase tracking-widest bg-gold-primary/10 py-1.5 px-4 rounded-full border border-gold-primary/20 inline-block"
          />
          <EditableText
            as="h1"
            sectionKey="recomendacoes_hero"
            field="title"
            value={hero.title}
            className="text-4xl sm:text-5xl font-display font-black text-white tracking-tight uppercase"
          />
          <EditableText
            as="p"
            sectionKey="recomendacoes_hero"
            field="content"
            value={hero.content}
            className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed"
          />
        </div>
      </section>

      {/* Tabs & Search controls */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-white/10 pb-6">
          {/* Tab Selection */}
          <div className="flex bg-white/5 p-1 rounded-lg border border-white/10 w-full md:w-auto">
            <button
              onClick={() => { setActiveTab('livros'); setSearchTerm(''); }}
              className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'livros' ? 'bg-gold-primary text-primary-dark shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <EditableStatic k="tab_livros" value="Livros Recomendados" as="span" className="" />
            </button>
            <button
              onClick={() => { setActiveTab('filmes'); setSearchTerm(''); }}
              className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'filmes' ? 'bg-gold-primary text-primary-dark shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Film className="w-4 h-4" />
              <EditableStatic k="tab_filmes" value="Filmes Recomendados" as="span" className="" />
            </button>
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder={`Buscar ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#070F1E] border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white text-xs focus:outline-none focus:border-gold-primary transition-colors"
            />
          </div>
        </div>

        {/* Content list */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-[#091120] rounded-xl border border-white/5">
            <EditableStatic k="empty_busca" value="Nenhum item corresponde à sua busca." as="p" className="text-slate-500 text-sm" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item: any, idx: number) => {
              const sourceArr = activeTab === 'livros' ? books : movies
              const realIdx = sourceArr.indexOf(item)
              const itemsKey = activeTab === 'livros' ? 'books' : 'movies'
              return (
              <div
                key={item.title}
                className="bg-[#091120] border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-gold-primary/20 transition-all duration-300 shadow-xl group"
              >
                {/* Image Showcase */}
                <div className="relative h-64 overflow-hidden bg-[#050b14] flex items-center justify-center p-6 border-b border-white/5">
                  {item.image ? (
                    <div className="relative w-32 h-48 shadow-[0_15px_30px_rgba(0,0,0,0.6)] rounded-md overflow-hidden transform group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-300">
                      <EditableImage
                        sectionKey="recomendacoes_items"
                        path={['metadata', itemsKey, realIdx, 'image']}
                        value={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="w-32 h-48 rounded-md bg-gradient-to-br from-slate-800 to-slate-950 flex flex-col justify-between p-4 shadow-lg">
                      <BookOpen className="w-6 h-6 text-gold-primary" />
                      <span className="text-[10px] font-bold text-white uppercase tracking-widest truncate">{item.title}</span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-gold-primary/10 flex items-center justify-center text-gold-primary shadow-lg border border-gold-primary/10">
                    {activeTab === 'livros' ? (
                      <BookOpen className="w-4 h-4" />
                    ) : (
                      <Film className="w-4 h-4" />
                    )}
                  </div>
                </div>

                {/* Details Content */}
                <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <EditableText
                        as="h3"
                        sectionKey="recomendacoes_items"
                        path={['metadata', itemsKey, realIdx, 'title']}
                        value={item.title}
                        className="text-base font-display font-extrabold text-white group-hover:text-gold-primary transition-colors leading-tight line-clamp-2"
                      />
                      {activeTab === 'livros' && (item as any).author && (
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                          De{' '}
                          <EditableText
                            as="span"
                            sectionKey="recomendacoes_items"
                            path={['metadata', itemsKey, realIdx, 'author']}
                            value={(item as any).author}
                            className=""
                          />
                        </p>
                      )}
                    </div>

                    <div className="relative pt-2 pb-2">
                      <Quote className="w-6 h-6 text-white/5 absolute -top-2.5 -left-1" />
                      <p className="text-xs sm:text-sm leading-relaxed text-slate-400 font-medium italic relative z-10 line-clamp-4 font-sans">
                        &ldquo;
                        <EditableText
                          as="span"
                          sectionKey="recomendacoes_items"
                          path={['metadata', itemsKey, realIdx, 'review']}
                          value={item.review}
                          className=""
                        />
                        &rdquo;
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-4 text-[10px] font-bold text-gold-primary uppercase tracking-widest flex items-center justify-between">
                    <span>Recomendação #{idx + 1}</span>
                    <span className="text-slate-500 font-semibold">{activeTab === 'livros' ? (
                      <EditableStatic k="rotulo_livro" value="Livro" as="span" className="" />
                    ) : (
                      <EditableStatic k="rotulo_filme" value="Filme" as="span" className="" />
                    )}</span>
                  </div>
                </div>
              </div>
              )
            })}
          </div>
        )}
      </section>
    </div>
    </StaticContent>
  )
}
