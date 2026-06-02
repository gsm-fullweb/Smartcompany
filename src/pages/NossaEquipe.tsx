import { Users, Mail, Award, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

interface TeamMember {
  name: string
  role: string
  avatar?: string
  initials: string
  gradient: string
  qualifications: string[]
}

export default function NossaEquipe() {
  const team: TeamMember[] = [
    {
      name: 'Antonio Geraldes',
      role: 'Fundador Smart Company & Mentor de Gestão',
      avatar: '/assets/Ola-sou-Antonio-Geraldes-copia-scaled.jpg',
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

  return (
    <div className="bg-primary-dark pt-24 min-h-screen text-slate-300 font-sans">
      {/* Hero section */}
      <section className="relative bg-[#070F1E] py-24 border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-primary/10 border border-gold-primary/20">
            <Users className="w-4 h-4 text-gold-primary" />
            <span className="text-[10px] font-bold text-gold-primary uppercase tracking-widest">
              Consultores Multidisciplinares
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white tracking-tight uppercase">
            Nosso <span className="text-gold-primary">Time Smart</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Nossa equipe agrega vivências corporativas diversas para entregar resultados de alto nível. 
            Para prover consultoria de excelência, acreditamos que é preciso ser polivalente. 
            Nosso time é formado por administradores, economistas, engenheiros, contadores, psicólogos e tecnólogos.
          </p>
          
          <div className="max-w-2xl mx-auto bg-slate-900/50 border border-white/5 rounded-xl p-6 italic text-slate-400 text-xs sm:text-sm">
            &ldquo;Ser Consultor é ter Conhecimento Pizza: ainda que não seja profundo em todas as áreas, 
            precisa ser extremamente abrangente! Conhecendo o macro, identificamos os elos mais fracos da corrente 
            e investimos foco e energia onde realmente estão os gargalos.&rdquo;
            <span className="block mt-2 font-semibold text-gold-primary not-italic text-xs">— Zé Maria, Consultor Industrial</span>
          </div>
        </div>
      </section>

      {/* Team grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {team.map((member) => (
            <div
              key={member.name}
              className="bg-[#091120] rounded-2xl border border-white/5 hover:border-gold-primary/20 transition-all duration-300 p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start group shadow-lg"
            >
              {/* Photo / Avatar */}
              <div className="flex-shrink-0 mx-auto sm:mx-0">
                {member.avatar ? (
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gold-primary/40 shadow-lg shadow-gold-primary/10">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback in case image is missing
                        (e.target as HTMLImageElement).style.display = 'none'
                      }}
                    />
                  </div>
                ) : (
                  <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center border-2 border-white/10 shadow-lg`}>
                    <span className="font-display font-bold text-white text-2xl tracking-wider">
                      {member.initials}
                    </span>
                  </div>
                )}
              </div>

              {/* Info & Qualifications */}
              <div className="flex-grow space-y-4 w-full">
                <div className="text-center sm:text-left space-y-1">
                  <h3 className="text-xl font-display font-extrabold text-white group-hover:text-gold-primary transition-colors leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-xs text-gold-primary/80 font-bold uppercase tracking-wider">
                    {member.role}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-4">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                    <Award className="w-3.5 h-3.5 text-gold-primary" />
                    Qualificações & Atuação
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
                    {member.qualifications.map((qual, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-gold-primary mt-1 flex-shrink-0">•</span>
                        <span className="leading-relaxed">{qual}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to action - Recruiting */}
      <section className="py-20 bg-[#060D19] border-t border-white/5 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gold-primary/5 via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
            Quer fazer parte da nossa <span className="text-gold-primary">Equipe?</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Estamos sempre em busca de talentos motivados e qualificados que desejem transformar a rotina, 
            estratégia e resultados de empresas de diversos setores em todo o país.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="mailto:contato@smartcompany.com.br"
              className="inline-flex items-center justify-center px-6 py-3 font-bold text-sm uppercase tracking-wider text-primary-dark bg-gold-primary hover:bg-gold-light rounded-md shadow-lg shadow-gold-primary/10 transition-all gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Enviar meu Currículo</span>
            </a>
            <Link
              to="/contato"
              className="inline-flex items-center justify-center px-6 py-3 font-bold text-sm uppercase tracking-wider text-white bg-white/5 hover:bg-white/10 rounded-md border border-white/10 transition-all gap-2"
            >
              <span>Fale Conosco</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-xs text-slate-500 pt-2">
            Surgindo uma oportunidade compatível com o seu perfil, nosso time de recursos humanos entrará em contato.
          </p>
        </div>
      </section>
    </div>
  )
}
