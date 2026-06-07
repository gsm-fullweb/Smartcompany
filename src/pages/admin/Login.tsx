import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Mail, Lock, ShieldAlert, Loader2, ArrowLeft } from 'lucide-react'
import { supabase } from '../../lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { siteSlug } = useParams()
  const currentSlug = siteSlug || 'smartcompany'

  useEffect(() => {
    // Check if user is already logged in
    async function checkUser() {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        navigate(`/admin/${currentSlug}`)
      }
    }
    checkUser()
  }, [navigate, currentSlug])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) throw authError

      if (data?.session) {
        navigate(`/admin/${currentSlug}`)
      }
    } catch (err: any) {
      console.error('Erro de login:', err)
      setError(err.message || 'Credenciais inválidas. Verifique seus dados e tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-primary-dark min-h-screen text-slate-300 font-sans flex items-center justify-center relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background radial effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gold-primary/5 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-blue/10 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-md w-full space-y-8 z-10">
        {/* Back Link */}
        <div className="flex justify-start">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-gold-primary transition-colors gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Site</span>
          </button>
        </div>

        {/* Logo and Header */}
        <div className="text-center space-y-4">
          <img
            src="/assets/logo_fundo_escuro.png"
            alt="Smart Company Logo"
            className="h-16 w-auto mx-auto object-contain"
          />
          <h2 className="text-3xl font-display font-black text-white tracking-tight uppercase">
            Acesso Restrito
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed max-w-xs mx-auto">
            Painel Administrativo Smart Company. Faça login com suas credenciais de operador.
          </p>
        </div>

        {/* Glass Box Form */}
        <form
          onSubmit={handleLogin}
          className="glass p-8 rounded-2xl border border-white/10 space-y-5 shadow-2xl relative overflow-hidden"
        >
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs font-semibold leading-relaxed flex gap-2 items-start">
              <ShieldAlert className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1" htmlFor="email-input">
                E-mail
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#070F1E] border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-gold-primary transition-colors"
                  placeholder="admin@smartcompany.com.br"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1" htmlFor="password-input">
                Senha
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="password-input"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#070F1E] border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-gold-primary transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center py-3.5 text-sm font-bold uppercase tracking-wider text-primary-dark bg-gold-primary hover:bg-gold-light rounded-lg shadow-lg shadow-gold-primary/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span>Autenticando...</span>
                <Loader2 className="w-4 h-4 ml-2 animate-spin" />
              </>
            ) : (
              <span>Entrar no Painel</span>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
