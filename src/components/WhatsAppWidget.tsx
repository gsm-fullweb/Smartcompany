import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppWidget() {
  const [isIframe, setIsIframe] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsIframe(window.self !== window.top)
    }
  }, [])

  if (isIframe) {
    return null
  }

  const whatsappNumber = '5511993291892'
  const message = encodeURIComponent('Olá, gostaria de saber mais sobre as soluções de Gestão e Consultoria da Smart Company.')
  const url = `https://api.whatsapp.com/send/?phone=${whatsappNumber}&text=${message}&type=phone_number&app_absent=0`

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group"
      aria-label="Fale Conosco no WhatsApp"
    >
      {/* Pulse effect */}
      <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping group-hover:animate-none"></span>
      <MessageCircle className="w-7 h-7 relative z-10" />
      
      {/* Tooltip */}
      <span className="absolute right-16 scale-0 group-hover:scale-100 transition-all origin-right bg-secondary-dark text-slate-100 text-xs font-semibold py-2 px-3.5 rounded-lg border border-white/10 shadow-xl whitespace-nowrap">
        Fale Conosco
      </span>
    </a>
  )
}

