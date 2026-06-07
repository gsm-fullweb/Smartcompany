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

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Erro: VITE_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY ausentes no ambiente')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function setupStorage() {
  console.log('Tentando inicializar o bucket site-assets...')
  try {
    const { data, error } = await supabase.storage.createBucket('site-assets', {
      public: true,
      allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/svg+xml', 'image/webp'],
      fileSizeLimit: 52428800 // 50MB
    })

    if (error) {
      if (error.message.includes('already exists') || error.message.includes('Duplicate')) {
        console.log('Bucket "site-assets" já está criado.')
      } else {
        throw error
      }
    } else {
      console.log('Sucesso! Bucket "site-assets" criado com sucesso.', data)
    }
  } catch (err) {
    console.error('Erro ao configurar bucket:', err.message)
  }
}

setupStorage()
