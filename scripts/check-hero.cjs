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

async function check() {
  const { data, error } = await supabase
    .from('site_sections')
    .select('*')
    .eq('site_slug', 'smartcompany')
    .eq('section_key', 'quemsomos_hero')
    .maybeSingle()

  if (error) {
    console.error('Erro:', error.message)
  } else {
    console.log('Valores no banco para quemsomos_hero:', JSON.stringify(data, null, 2))
  }
}

check()
