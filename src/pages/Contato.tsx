import { useState } from 'react'
import { Mail, Phone, MapPin, Youtube, Instagram, Facebook, Send, Check, Loader2 } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useDynamicContent } from '../hooks/useDynamicContent'
import SEO from '../components/SEO'
import EditableText from '../admin/inline/EditableText'
import { StaticContent } from '../admin/inline/StaticContent'
import EditableStatic from '../admin/inline/EditableStatic'

export default function Contato() {
  const defaultHero = {
    badge: 'Fale Conosco',
    title: 'Entre em Contato Conosco',
    content: 'Estamos prontos para atender você e desenhar a melhor solução estratégica, comercial ou financeira para a sua empresa.'
  }
  const { hero } = useDynamicContent('contato', { hero: defaultHero })

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error: insertError } = await supabase
        .from('leads')
        .insert([{
          site_slug: 'smartcompany',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        }])

      if (insertError) throw insertError

      setSubmitted(true)
    } catch (err: any) {
      console.error('Erro ao enviar mensagem:', err)
      setError('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente ou entre em contato pelo WhatsApp.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <StaticContent pageKey="contato">
    <div className="bg-primary-dark pt-24 min-h-screen text-slate-300 font-sans">
      <SEO 
        title="Contato | Agende um Diagnóstico Gratuito" 
        description="Fale com a nossa equipe de consultores para tirar dúvidas, agendar um diagnóstico empresarial gratuito ou iniciar seu projeto de consultoria." 
      />
      {/* Header Banner */}
      <section className="relative bg-[#091120] py-16 border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Mail className="w-8 h-8 text-gold-primary mx-auto" />
          <EditableText
            as="h1"
            sectionKey="contato_hero"
            field="title"
            value={hero.title}
            className="text-4xl sm:text-5xl font-display font-black text-white tracking-tight uppercase"
          />
          <EditableText
            as="p"
            sectionKey="contato_hero"
            field="content"
            value={hero.content}
            className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed"
          />
        </div>
      </section>

      {/* Grid of Contact Info & Form */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info Details Column */}
          <div className="space-y-8">
            <div className="space-y-4">
              <EditableStatic k="info_eyebrow" value="Canais Disponíveis" as="span" className="text-[10px] font-bold text-gold-primary uppercase tracking-widest" />
              <EditableStatic k="info_title" value="Informações Institucionais" as="h2" className="text-3xl font-display font-extrabold text-white uppercase" />
              <EditableStatic k="info_intro" value="Quer agendar uma visita presencial em São Paulo, tirar dúvidas sobre nossas formações online (AG Expert e CIA) ou iniciar um Valuation para M&A? Escolha o melhor canal abaixo:" as="p" className="text-sm sm:text-base text-slate-400 leading-relaxed" />
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gold-primary/10 flex items-center justify-center text-gold-primary flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <EditableStatic k="channel_address_label" value="Atendimento Nacional" as="h4" className="text-white font-display font-bold text-sm uppercase" />
                  <EditableStatic k="channel_address_value" value="São Paulo / SP - Atendimento online e presencial para todo o Brasil." as="p" className="text-slate-400 text-sm mt-1" />
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gold-primary/10 flex items-center justify-center text-gold-primary flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <EditableStatic k="channel_whatsapp_label" value="WhatsApp Comercial" as="h4" className="text-white font-display font-bold text-sm uppercase" />
                  <p className="text-slate-400 text-sm mt-1">
                    <a href="https://api.whatsapp.com/send/?phone=5511993291892&text&type=phone_number&app_absent=0" target="_blank" rel="noreferrer" className="hover:text-gold-primary transition-colors">
                      <EditableStatic k="channel_whatsapp_value" value="(11) 99329-1892" as="span" />
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gold-primary/10 flex items-center justify-center text-gold-primary flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <EditableStatic k="channel_email_label" value="E-mail Corporativo" as="h4" className="text-white font-display font-bold text-sm uppercase" />
                  <p className="text-slate-400 text-sm mt-1">
                    <a href="mailto:contato@smartcompany.com.br" className="hover:text-gold-primary transition-colors">
                      <EditableStatic k="channel_email_value" value="contato@smartcompany.com.br" as="span" />
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Social channels */}
            <div className="pt-4 border-t border-white/5 space-y-4">
              <EditableStatic k="social_title" value="Acompanhe nas Redes Sociais" as="h4" className="text-white font-display font-bold text-xs uppercase tracking-wider" />
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
                <EditableStatic k="form_title" value="Enviar Mensagem" as="h3" className="text-xl font-display font-bold text-white uppercase border-b border-white/5 pb-3" />
                
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1" htmlFor="c-name">
                    <EditableStatic k="form_label_name" value="Seu Nome" as="span" />
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
                    <EditableStatic k="form_label_email" value="Seu Email" as="span" />
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
                    <EditableStatic k="form_label_phone" value="WhatsApp / Telefone" as="span" />
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
                    <EditableStatic k="form_label_message" value="Sua Mensagem" as="span" />
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

                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs font-semibold leading-relaxed">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center py-3.5 text-sm font-bold uppercase tracking-wider text-primary-dark bg-gold-primary hover:bg-gold-light rounded-lg shadow-lg shadow-gold-primary/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <EditableStatic k="form_submit_loading" value="Enviando..." as="span" />
                      <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                    </>
                  ) : (
                    <>
                      <EditableStatic k="form_submit_label" value="Enviar Mensagem" as="span" />
                      <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="glass p-8 rounded-xl border border-green-500/20 text-center space-y-4 shadow-2xl py-12">
                <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <EditableStatic k="success_title" value="Mensagem Enviada!" as="h3" className="text-xl font-display font-bold text-white" />
                <p className="text-sm text-slate-300 leading-relaxed">
                  Agradecemos o contato, <strong>{formData.name}</strong>. Nossa assessoria retornará via e-mail ou WhatsApp nas próximas horas.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-gold-primary font-bold uppercase hover:underline"
                >
                  <EditableStatic k="success_reset_label" value="Enviar Nova Mensagem" as="span" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
    </StaticContent>
  )
}
