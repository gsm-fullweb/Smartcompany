import { useState } from 'react'
import { Mail, Phone, MapPin, Youtube, Instagram, Facebook, Send, Check } from 'lucide-react'

export default function Contato() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="bg-primary-dark pt-24 min-h-screen text-slate-300 font-sans">
      {/* Header Banner */}
      <section className="relative bg-[#091120] py-16 border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Mail className="w-8 h-8 text-gold-primary mx-auto" />
          <h1 className="text-4xl sm:text-5xl font-display font-black text-white tracking-tight uppercase">
            Entre em Contato Conosco
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
            Estamos prontos para atender você e desenhar a melhor solução estratégica, comercial ou financeira para a sua empresa.
          </p>
        </div>
      </section>

      {/* Grid of Contact Info & Form */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info Details Column */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-gold-primary uppercase tracking-widest">Canais Disponíveis</span>
              <h2 className="text-3xl font-display font-extrabold text-white uppercase">Informações Institucionais</h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                Quer agendar uma visita presencial em São Paulo, tirar dúvidas sobre nossas formações online (AG Expert e CIA) ou iniciar um Valuation para M&A? Escolha o melhor canal abaixo:
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gold-primary/10 flex items-center justify-center text-gold-primary flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-display font-bold text-sm uppercase">Atendimento Nacional</h4>
                  <p className="text-slate-400 text-sm mt-1">São Paulo / SP - Atendimento online e presencial para todo o Brasil.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gold-primary/10 flex items-center justify-center text-gold-primary flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-display font-bold text-sm uppercase">WhatsApp Comercial</h4>
                  <p className="text-slate-400 text-sm mt-1">
                    <a href="tel:+5511999999999" className="hover:text-gold-primary transition-colors">
                      (11) 99999-9999
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gold-primary/10 flex items-center justify-center text-gold-primary flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-display font-bold text-sm uppercase">E-mail Corporativo</h4>
                  <p className="text-slate-400 text-sm mt-1">
                    <a href="mailto:contato@smartcompany.com.br" className="hover:text-gold-primary transition-colors">
                      contato@smartcompany.com.br
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Social channels */}
            <div className="pt-4 border-t border-white/5 space-y-4">
              <h4 className="text-white font-display font-bold text-xs uppercase tracking-wider">Acompanhe nas Redes Sociais</h4>
              <div className="flex gap-3">
                <a
                  href="https://www.youtube.com/channel/UCEi7bnqRbibkehIL8ikcc1A"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:text-gold-primary hover:bg-gold-primary/10 transition-colors text-slate-400"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/smartcompanybr/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:text-gold-primary hover:bg-gold-primary/10 transition-colors text-slate-400"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:text-gold-primary hover:bg-gold-primary/10 transition-colors text-slate-400"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="glass p-8 rounded-xl border border-white/10 space-y-4 shadow-2xl">
                <h3 className="text-xl font-display font-bold text-white uppercase border-b border-white/5 pb-3">Enviar Mensagem</h3>
                
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1" htmlFor="c-name">
                    Seu Nome
                  </label>
                  <input
                    id="c-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#070F1E] border border-white/10 rounded-lg py-2.5 px-4 text-white text-sm focus:outline-none focus:border-gold-primary transition-colors"
                    placeholder="João Silva"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1" htmlFor="c-email">
                    Seu Email
                  </label>
                  <input
                    id="c-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#070F1E] border border-white/10 rounded-lg py-2.5 px-4 text-white text-sm focus:outline-none focus:border-gold-primary transition-colors"
                    placeholder="joao@exemplo.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1" htmlFor="c-phone">
                    WhatsApp / Telefone
                  </label>
                  <input
                    id="c-phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#070F1E] border border-white/10 rounded-lg py-2.5 px-4 text-white text-sm focus:outline-none focus:border-gold-primary transition-colors"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1" htmlFor="c-msg">
                    Sua Mensagem
                  </label>
                  <textarea
                    id="c-msg"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#070F1E] border border-white/10 rounded-lg py-2.5 px-4 text-white text-sm focus:outline-none focus:border-gold-primary transition-colors resize-none"
                    placeholder="Escreva sua mensagem detalhando o que precisa..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center py-3.5 text-sm font-bold uppercase tracking-wider text-primary-dark bg-gold-primary hover:bg-gold-light rounded-lg shadow-lg shadow-gold-primary/10 transition-colors"
                >
                  <span>Enviar Mensagem</span>
                  <Send className="w-4 h-4 ml-2" />
                </button>
              </form>
            ) : (
              <div className="glass p-8 rounded-xl border border-green-500/20 text-center space-y-4 shadow-2xl py-12">
                <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h3 className="text-xl font-display font-bold text-white">Mensagem Enviada!</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Agradecemos o contato, <strong>{formData.name}</strong>. Nossa assessoria retornará via e-mail ou WhatsApp nas próximas horas.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-gold-primary font-bold uppercase hover:underline"
                >
                  Enviar Nova Mensagem
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
