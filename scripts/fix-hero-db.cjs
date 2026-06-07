const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Read .env file
const dotenvPath = path.join(__dirname, '../.env')
if (fs.existsSync(dotenvPath)) {
  const envContent = fs.readFileSync(dotenvPath, 'utf8')
  envContent.split(/\r?\n/).forEach(line => {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith('#')) {
      const parts = trimmed.split('=')
      const key = parts[0].trim()
      let value = parts.slice(1).join('=').trim()
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1)
      } else if (value.startsWith("'") && value.endsWith("'")) {
        value = value.slice(1, -1)
      }
      process.env[key] = value
    }
  })
}

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function fix() {
  const correctTitle = "QUEM SOMOS & PROPÓSITO"
  const correctContent = "Na Smart Company, somos mais do que uma consultoria; somos o seu parceiro estratégico na jornada para o sucesso. Com uma equipe de especialistas altamente capacitados, dedicamo-nos a transformar desafios em oportunidades e a trazer soluções inovadoras para o seu negócio."

  console.log('Atualizando site_sections para corrigir o layout do Quem Somos...')
  const { data, error } = await supabase
    .from('site_sections')
    .update({
      title: correctTitle,
      content: correctContent,
      updated_at: new Date().toISOString()
    })
    .eq('site_slug', 'smartcompany')
    .eq('section_key', 'quemsomos_hero')

  if (error) {
    console.error('Erro ao atualizar banco:', error.message)
  } else {
    console.log('Sucesso! Registro corrigido no Supabase.')
  }
}

fix()
