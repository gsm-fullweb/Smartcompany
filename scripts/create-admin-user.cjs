const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Erro: VITE_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY ausentes no ambiente')
  console.log('Valores recebidos:', { supabaseUrl, supabaseServiceKey })
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function createAdmin() {
  const email = 'admin@smartcompany.com.br'
  const password = 'SmartAdmin2026!'

  console.log(`Tentando criar usuário administrativo: ${email}...`)

  try {
    const { data, error } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true
    })

    if (error) {
      if (error.message.includes('already exists') || error.message.includes('already registered')) {
        console.log(`Usuário ${email} já está cadastrado.`);
      } else {
        throw error;
      }
    } else {
      console.log(`Sucesso! Usuário criado com sucesso. ID: ${data.user.id}`);
    }
  } catch (err) {
    console.error('Erro ao criar usuário administrador:', err.message)
  }
}

createAdmin()
