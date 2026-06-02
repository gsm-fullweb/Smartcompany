import { MessageSquare, Quote, Award } from 'lucide-react'

export default function Depoimentos() {
  const testimonials = [
    {
      author: 'Karina Dourado',
      role: 'Gestora Financeira',
      company: 'Metrobyte',
      text: 'A Smart Company nos ajudou a desenhar um DRE e BUDGET fácil de analisar. Como resultado, nos permite acompanhar de fato a performance real da empresa, bem como planejar investimentos estruturados. Recomendo!'
    },
    {
      author: 'Aline Lima Rocha de Jesus',
      role: 'Gestora Administrativa',
      company: 'Grand House',
      text: 'A equipe Smart Company está de parabéns. Eu agradeço por terem devolvido a minha motivação. A implantação de melhorias foi muito mais do que criar ferramentas e métodos de trabalho — me devolveram o prazer em trabalhar. Em cada reunião e treinamento eu me sentia segura e motivada. Hoje sei exatamente o que é cumprir uma agenda, tenho foco e ferramentas adequadas. Vale a pena passar por essa experiência.'
    },
    {
      author: 'Flávio F. Mattos',
      role: 'Diretor Geral',
      company: 'Multiplic Seguros',
      text: 'A SMART COMPANY melhorou nossa gestão de vendas e consequentemente os nossos resultados. Profissionais dedicados e altamente capacitados em entender os processos atuais e conduzir as mudanças necessárias de forma construtiva e sem desmotivar a equipe.'
    },
    {
      author: 'Maria de Lourdes Braga',
      role: 'Diretora Financeira',
      company: 'MRSUL',
      text: 'A Smart Company mostrou-se absolutamente eficiente, apoiando e inovando nos procedimentos internos de nossa fábrica, tornando-a mais produtiva. Sempre estando presente quando se apresentava algum desafio, agilizando soluções e dando suporte.'
    },
    {
      author: 'Jamil Marques Figueira',
      role: 'Sócio-Diretor',
      company: 'BAQ',
      text: 'Obtivemos uma visão mais clara dos problemas cotidianos da empresa e pudemos fazer as modificações necessárias para uma melhora nítida nos índices dos resultados financeiro e operacional.'
    },
    {
      author: 'Sergio Fonseca',
      role: 'Diretor',
      company: 'Franquia de Fast Food',
      text: 'A iniciativa de contratar a Smart Company se mostrou acertadíssima. Mergulharam nos números da empresa, gerando um extenso e detalhado relatório. Sempre se mostraram solícitos e disponíveis durante todo o trabalho. Hoje posso dizer que conheço minha empresa muito melhor.'
    },
    {
      author: 'Protasio Pivetta',
      role: 'Diretor',
      company: 'MRSUL',
      text: 'Contratamos a consultoria Smart Company através de indicação. Hoje somos gratos pelo alto nível dos trabalhos prestados nos campos de organização financeira, comercial, almoxarifado e toda a burocracia de acompanhamento da empresa. Esta é uma empresa que tenho o prazer de recomendar.'
    },
    {
      author: 'Lívia Colucci',
      role: 'Diretora Criativa',
      company: 'White Hall',
      text: 'Conseguimos perceber exatamente onde estavam as falhas e os gaps operacionais para nos estruturarmos melhor, aprimorando a comunicação interna, desenhando processos eficientes e crescendo de maneira saudável.'
    },
    {
      author: 'João Henrique Santo',
      role: 'Diretor Executivo',
      company: 'OCSSO',
      text: 'A Smart Company agregou muito em nossa empresa, pois atuou em um momento crítico de transição e organização de informações. O suporte atencioso, comprometido e organizado nos deu a tranquilidade que precisávamos na gestão financeira.'
    }
  ]

  return (
    <div className="bg-primary-dark pt-24 min-h-screen text-slate-300 font-sans">
      {/* Header Banner */}
      <section className="relative bg-[#091120] py-20 border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <MessageSquare className="w-8 h-8 text-gold-primary mx-auto" />
          <h1 className="text-4xl sm:text-5xl font-display font-black text-white tracking-tight uppercase">
            Depoimentos de Nossos Clientes
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
            Nada melhor do que o próprio cliente falar de forma espontânea a respeito do nosso compromisso. Sentimos orgulho das relações de parceria e dos resultados gerados.
          </p>
        </div>
      </section>

      {/* Grid of Testimonials */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.author}
              className="glass p-8 rounded-xl border border-white/5 flex flex-col justify-between relative hover:border-gold-primary/15 transition-all duration-300 group"
            >
              {/* Quote icon background */}
              <div className="absolute top-4 right-4 text-white/5 group-hover:text-gold-primary/5 transition-colors">
                <Quote className="w-12 h-12" />
              </div>
              
              <div className="space-y-4">
                <p className="text-sm leading-relaxed text-slate-400 font-medium italic relative z-10">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-3">
                {/* Avatar Initial circle */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-primary to-gold-dark flex items-center justify-center text-primary-dark font-display font-extrabold text-sm shadow shadow-gold-primary/10">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-display font-bold text-sm leading-none">{t.author}</h4>
                  <p className="text-slate-500 text-xs mt-1.5 leading-none">
                    {t.role} &bull; <span className="text-gold-primary font-semibold">{t.company}</span>
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
          <h3 className="text-xl font-display font-bold text-white uppercase tracking-wider">Compromisso com o Sucesso</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Mais de 100 empresas reestruturadas presencialmente. Nossos índices de satisfação refletem a qualidade das entregas e o esmero com os dados de cada cliente.
          </p>
        </div>
      </section>
    </div>
  )
}
