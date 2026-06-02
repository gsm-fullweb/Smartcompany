import { Link } from 'react-router-dom'
import { Youtube, Instagram, Facebook } from 'lucide-react'

export default function Footer() {

  return (
    <footer className="bg-[#040A14] border-t border-white/10 text-slate-400 pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12 items-start">
          
          {/* Column 1: Logo */}
          <div className="flex justify-center sm:justify-start">
            <Link to="/" className="flex items-center">
              <img
                src="/assets/logo_fundo_escuro.png"
                alt="Smart Company Logo"
                className="h-14 w-auto object-contain hover:opacity-90 transition-opacity"
              />
            </Link>
          </div>

          {/* Column 2: Imersão */}
          <div className="space-y-4 text-center">
            <h4 className="text-white font-display font-bold text-xs uppercase tracking-wider">
              Imersão Empresarial
            </h4>
            <div className="flex justify-center">
              <img
                src="/assets/O-MAPPA.png"
                alt="O MAPPA"
                className="h-10 w-auto object-contain hover:scale-105 transition-transform duration-200"
              />
            </div>
          </div>

          {/* Column 3: Curso Sócios */}
          <div className="space-y-4 text-center">
            <h4 className="text-white font-display font-bold text-xs uppercase tracking-wider">
              Curso avançado para Empresários
            </h4>
            <div className="flex justify-center">
              <img
                src="/assets/AG-Dourado-Horizontal.png"
                alt="AG Dourado Horizontal"
                className="h-10 w-auto object-contain hover:scale-105 transition-transform duration-200"
              />
            </div>
          </div>

          {/* Column 4: Curso Gestores */}
          <div className="space-y-4 text-center">
            <h4 className="text-white font-display font-bold text-xs uppercase tracking-wider">
              Curso para Gestores Comerciais
            </h4>
            <div className="flex justify-center">
              <img
                src="/assets/Logo-CIA-2-circulo-branco.png"
                alt="Logo CIA"
                className="h-12 w-auto object-contain hover:scale-105 transition-transform duration-200"
              />
            </div>
          </div>

          {/* Column 5: Social Media */}
          <div className="space-y-4 text-center sm:text-right">
            <h4 className="text-white font-display font-bold text-xs uppercase tracking-wider">
              Siga-nos
            </h4>
            <div className="flex justify-center lg:justify-end space-x-3 pt-2">
              <a
                href="https://www.instagram.com/antoniogeraldesgestor/"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-gold-primary hover:bg-gold-primary/10 transition-colors"
                aria-label="Instagram Profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100078676876525"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-gold-primary hover:bg-gold-primary/10 transition-colors"
                aria-label="Facebook Page"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCEi7bnqRbibkehIL8ikcc1A"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-gold-primary hover:bg-gold-primary/10 transition-colors"
                aria-label="YouTube Channel"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Divider, Purpose & Copyright */}
        <div className="pt-8 border-t border-white/5 text-center space-y-6">
          <p className="text-sm font-semibold max-w-3xl mx-auto leading-relaxed text-slate-500">
            Nosso proposito é contribuir para o lucro e crescimento sadio da empresa, diminuir o stress na rotina diária, valorizar o negócio e seus Colaboradores.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p>
              Direitos Reservados 2023 ©️ | Smart Company
            </p>
            <div className="flex space-x-6 text-slate-500">
              <a href="#" className="hover:text-slate-400 transition-colors">
                Políticas de Privacidade
              </a>
              <a href="#" className="hover:text-slate-400 transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
