import { useState } from 'react'
import { BookOpen, Film, Search, Quote } from 'lucide-react'

export default function Recomendacoes() {
  const [activeTab, setActiveTab] = useState<'livros' | 'filmes'>('livros')
  const [searchTerm, setSearchTerm] = useState('')

  const books = [
    {
      title: 'Você Pode Curar Sua Vida',
      author: 'Louise L. Hay',
      review: 'Eu passei a investir em ideias e vibrações positivas e vi como foi possível viver plenamente e melhorar a minha qualidade de vida. É um método de cura holística e Louise Hay ensina como aplicar em nossas vidas. Acredito que, com o tempo, os resultados serão ainda mais significativos.'
    },
    {
      title: 'Pai Rico Pai Pobre',
      author: 'Robert T. Kiyosaki',
      review: 'Pai Rico Pai Pobre ilustra a diferença entre ativos e passivos, o que ajuda a definir onde investir o dinheiro sem agregar ainda mais gastos. Este é um fator fundamental que separa os ricos dos demais.'
    },
    {
      title: 'O Mito do Empreendedor',
      author: 'Michael E. Gerber',
      review: 'Ilustra de maneira clara o motivo de algumas empresas não prosperarem e como isso está ligado à mentalidade dos donos. Vale a pena conhecer o que Gerber tem a ensinar. Muitos empreendedores encontrarão insights valiosos para melhorar seus negócios, agindo de forma preventiva ao entender as armadilhas comuns.'
    },
    {
      title: 'Inteligência Positiva',
      author: 'Shirzad Chamine',
      review: 'Esse livro traz conhecimentos fantásticos para aprimorarmos nossa vida e identificarmos os sabotadores de nossa atenção plena, oferecendo insights valiosos sobre como desenvolver uma mentalidade positiva e resiliente.'
    },
    {
      title: 'Um Novo Mundo',
      author: 'Eckhart Tolle',
      review: 'Todos temos um mundo dentro de nós e esse livro me ajudou a mergulhar dentro da minha cabeça, descobrindo sobre o quanto o nosso ego nos prejudica. Para entender melhor a nossa própria mente, é essencial explorar essas profundezas.'
    },
    {
      title: 'Adams Óbvio',
      author: 'Robert R. Updegraff',
      review: 'É um livro curto e que vale a pena ler. A reflexão que nos traz é que quase sempre o sucesso é atrelado a ideias mirabolantes, mas na verdade é muito possível obter sucesso se apoiando apenas em informações claras e no bom senso.'
    },
    {
      title: 'A Coragem de Ser Imperfeito',
      author: 'Brené Brown',
      review: 'Ajudou-me a entender que a vulnerabilidade não é uma fraqueza, mas sim a coragem de se mostrar humano. Traz assuntos importantes como a aceitação e o orgulho de sermos nós mesmos.'
    },
    {
      title: 'O Obstáculo é o Caminho',
      author: 'Ryan Holiday',
      review: 'Introduziu-me ao estoicismo. Este livro traz princípios estoicos práticos por meio de histórias reais de grandes líderes como Steve Jobs e Theodore Roosevelt, mostrando que nas dificuldades encontramos o caminho do sucesso.'
    },
    {
      title: 'A Maestria do Amor',
      author: 'Don Miguel Ruiz',
      review: 'Um livro para quem busca curar feridas emocionais e superar crenças que levam ao sofrimento em todo tipo de relação. Ajudou-me a conquistar o perdão de mim mesmo e dos outros, ensinando a importância da compaixão.'
    },
    {
      title: 'Conversas Difíceis',
      author: 'Douglas Stone, Bruce Patton e Sheila Heen',
      review: 'Ensina sobre comunicação estratégica, dando o passo a passo de como ter as conversas que mais tememos de maneira eficiente. Entender o ponto de vista do outro e usar diálogos construtivos facilita a resolução de conflitos corporativos.'
    },
    {
      title: 'Não Diga Sim Quando Quer Dizer Não',
      author: 'Dr. Herbert Fensterheim e Jean Baer',
      review: 'Superou muito as minhas expectativas e foi um grande parceiro para que eu aprendesse de uma vez por todas a dizer não. Passei a ter mais autonomia e liberdade sobre as minhas próprias decisões diárias.'
    },
    {
      title: 'O Motor da Liderança',
      author: 'Noel M. Tichy',
      review: 'Trouxe grandes estratégias que ajudaram a elevar meus projetos de liderança ao caminho certo. Para alcançar resultados sustentáveis, é fundamental aplicar essas práticas com o time no dia a dia.'
    },
    {
      title: 'As Vantagens da Adversidade',
      author: 'Paul G. Stoltz e Erik Weihenmayer',
      review: 'Uma ótima indicação para quem está passando por dificuldades na vida profissional. A reflexão sobre como lidar com adversidades e continuar motivado para seguir adiante é essencial para todo empresário.'
    },
    {
      title: 'O Verdadeiro Poder',
      author: 'Vicente Falconi',
      review: 'Cita o método Cumbuca de estudo e desenvolvimento de grupos gerenciais. Através de cases reais, o autor me mostrou pontos práticos fundamentais para ajudar uma empresa a se desenvolver de forma altamente saudável.'
    },
    {
      title: 'Execução',
      author: 'Larry Bossidy e Ram Charan',
      review: 'Execução me mostrou como liderar de maneira eficiente e focada em resultados. Pude perceber, na prática, os impactos positivos que processos disciplinados trazem para a rotina da empresa.'
    },
    {
      title: 'Desculpability',
      author: 'João Cordeiro',
      review: 'Ressalta o quanto é preciso parar de dar desculpas e eliminar esse hábito corporativo. Mostra a necessidade de uma transformação de atitude e de assumir responsabilidades diretas sobre os resultados.'
    },
    {
      title: 'A Única Coisa',
      author: 'Gary Keller e Jay Papasan',
      review: 'Esse livro me mostrou que o foco absoluto traz resultados extraordinários. Aprendi como identificar a prioridade única e direcionar esforços comerciais e operacionais para ela.'
    },
    {
      title: 'A Startup Enxuta',
      author: 'Eric Ries',
      review: 'Apresenta o conceito "Construir, Aprender e Mensurar". O autor explica a metodologia de testes rápidos para diminuir riscos e validar produtos e serviços no mercado antes de investir grandes capitais.'
    },
    {
      title: 'Pequenos Passos Para Mudar Sua Vida',
      author: 'Robert Maurer, PH.D.',
      review: 'Ensina que para alcançarmos objetivos complexos é melhor dar um pequeno passo de cada vez (Kaizen). Mudanças graduais e consistentes evitam a resistência natural do time ao novo.'
    }
  ]

  const movies = [
    {
      title: 'Jerry Maguire (1996)',
      review: 'Um agente de uma empresa internacional de gerenciamento de esportes pede demissão devido ao seu compromisso com suas crenças e honestidade. Ele reestrutura seu setor com um modelo de negócios focado na lealdade aos clientes, o que lhe permite transformar uma pequena operação em um verdadeiro concorrente de peso.'
    },
    {
      title: 'Joy: O Nome do Sucesso (2015)',
      review: 'Jennifer Lawrence brilha como Joy, uma aspirante a empreendedora com uma vida pessoal complicada. O filme narra os desafios de uma fundadora que inicia, protege suas patentes e escala uma empresa de manufatura, encontrando parcerias cruciais ao longo da jornada.'
    },
    {
      title: 'Fome de Poder (2017)',
      review: 'Um retrato ousado do empresário Ray Kroc e a expansão internacional do McDonalds. A narrativa foca nas táticas comerciais agressivas e na reestruturação do modelo de franquia que moldou a ascensão da maior marca de fast-food do mundo.'
    },
    {
      title: 'Steve Jobs (2015)',
      review: 'Retrata os bastidores de três grandes lançamentos de produtos que definiram a história da tecnologia. O filme detalha o foco na perfeição do design, a liderança autocrática e os conflitos na gestão de equipes altamente criativas.'
    },
    {
      title: 'O Lobo de Wall Street (2013)',
      review: 'Seguindo o sonho americano, um corretor ambicioso escala um negócio de vendas agressivas nos anos 80. O filme traz lições impactantes sobre o poder de persuasão em vendas, treinamento comercial ativo e a quebra de objeções de clientes.'
    },
    {
      title: 'A Rede Social (2010)',
      review: 'A história do nascimento do Facebook. Mostra como uma ideia disruptiva ganha escala mundial. Traz o conceito de ser o primeiro a dominar o mercado e a importância de atrair grandes talentos e investidores estratégicos.'
    },
    {
      title: 'À Procura da Felicidade (2006)',
      review: 'Um pai solteiro lutando contra a falência extrema consegue um estágio competitivo em uma corretora de valores. Destaca o valor da perseverança inabalável, resiliência comercial e o foco no payback de cada esforço de trabalho.'
    },
    {
      title: 'O Poderoso Chefão (1972)',
      review: 'Um clássico absoluto sobre sucessão familiar, negociação, alianças estratégicas e proteção do negócio em mercados altamente competitivos.'
    },
    {
      title: 'Coach Carter (2005)',
      review: 'Um técnico de basquete impõe regras rígidas de conduta aos seus atletas. O filme mostra como liderar e motivar equipes com base em respeito mútuo, disciplina e a busca constante por excelência acadêmica e esportiva.'
    },
    {
      title: 'Uma Mente Brilhante (2001)',
      review: 'A trajetória do matemático John Nash e sua luta contra a esquizofrenia. Explora a resiliência mental e a busca por padrões e soluções em teoria dos jogos.'
    },
    {
      title: 'Um Senhor Estagiário (2015)',
      review: 'Um aposentado volta ao mercado por meio de um estágio sênior em uma startup de e-commerce de moda. Mostra as vantagens de locais de trabalho multigeracionais, integridade e troca de experiências de gestão.'
    },
    {
      title: 'Pegando Fogo (2015)',
      review: 'Um chef de cozinha talentoso reconstrói sua reputação em busca de estrelas Michelin. O filme ensina que a liderança centralizadora e agressiva falha se não for combinada com a valorização e a sintonia do time.'
    },
    {
      title: 'O Jogo da Imitação (2014)',
      review: 'A história de Alan Turing construindo a máquina precursora do computador moderno para decifrar mensagens alemãs na Segunda Guerra. Mostra o poder do trabalho em equipe interdisciplinar e do foco em problemas matemáticos.'
    },
    {
      title: 'A Teoria de Tudo (2014)',
      review: 'A biografia extraordinária do astrofísico Stephen Hawking. Destaca a superação de limitações físicas extremas e a busca intelectual incessante por respostas sobre a física do universo.'
    },
    {
      title: 'O Diabo Veste Prada (2005)',
      review: 'Retrata os bastidores exigentes de uma grande revista de moda. Serve como case para analisar liderança autoritária, adaptação sob extrema pressão corporativa e dedicação a entregas impecáveis.'
    },
    {
      title: 'Moneyball: O Homem Que Mudou o Jogo (2011)',
      review: 'O gerente do Oakland Athletics usa estatística e análise de dados (sabermetrics) para contratar jogadores subvalorizados e competir com grandes orçamentos. Revela a importância de quebrar velhos paradigmas industriais através de inteligência analítica.'
    },
    {
      title: 'Coco Antes de Chanel (2009)',
      review: 'A história real de Coco Chanel e a revolução da alta-costura. Revela a visão comercial disruptiva de simplificar a vestimenta feminina, transformando inovação estética em uma marca multinacional duradoura.'
    },
    {
      title: 'Walt Antes do Mickey (2015)',
      review: 'Narra os primeiros anos difíceis da carreira de Walt Disney, ilustrando os inúmeros fracassos e falências que enfrentou antes de criar seu maior império de mídia e entretenimento mundial.'
    }
  ]

  const filteredItems = (activeTab === 'livros' ? books : movies).filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (activeTab === 'livros' && (item as typeof books[0]).author.toLowerCase().includes(searchTerm.toLowerCase())) ||
    item.review.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="bg-primary-dark pt-24 min-h-screen text-slate-300 font-sans">
      {/* Banner Header */}
      <section className="relative bg-[#070F1E] py-20 border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-[10px] font-bold text-gold-primary uppercase tracking-widest bg-gold-primary/10 py-1.5 px-4 rounded-full border border-gold-primary/20 inline-block">
            Acervo de Sucesso
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-black text-white tracking-tight uppercase">
            Livros & Filmes <span className="text-gold-primary">Recomendados</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Recomendações selecionadas pessoalmente por Antonio Geraldes para inspirar, motivar e instruir empresários e gestores em sua busca por excelência.
          </p>
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
              <span>Livros Recomendados</span>
            </button>
            <button
              onClick={() => { setActiveTab('filmes'); setSearchTerm(''); }}
              className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'filmes' ? 'bg-gold-primary text-primary-dark shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Film className="w-4 h-4" />
              <span>Filmes Recomendados</span>
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
            <p className="text-slate-500 text-sm">Nenhum item corresponde à sua busca.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, idx) => (
              <div
                key={item.title}
                className="glass p-6 rounded-xl border border-white/5 hover:border-gold-primary/15 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="space-y-1">
                      <h3 className="text-base font-display font-bold text-white group-hover:text-gold-primary transition-colors leading-tight">
                        {item.title}
                      </h3>
                      {activeTab === 'livros' && (
                        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                          De {(item as typeof books[0]).author}
                        </p>
                      )}
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-gold-primary/10 flex items-center justify-center text-gold-primary flex-shrink-0">
                      {activeTab === 'livros' ? (
                        <BookOpen className="w-4 h-4" />
                      ) : (
                        <Film className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                  <div className="relative pt-2 pb-6">
                    <Quote className="w-6 h-6 text-white/5 absolute -top-1.5 -left-1" />
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-400 font-medium italic relative z-10">
                      &ldquo;{item.review}&rdquo;
                    </p>
                  </div>
                </div>
                <div className="border-t border-white/5 pt-4 text-[10px] font-bold text-gold-primary uppercase tracking-widest">
                  Recomendação #{idx + 1}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
