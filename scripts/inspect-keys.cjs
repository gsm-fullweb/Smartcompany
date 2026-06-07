const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const vars = {};
envContent.split(/\r?\n/).forEach(line => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx > 0) {
      const k = trimmed.slice(0, eqIdx).trim();
      let v = trimmed.slice(eqIdx + 1).trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
      vars[k] = v;
    }
  }
});

const sb = createClient(vars.VITE_SUPABASE_URL, vars.SUPABASE_SERVICE_ROLE_KEY);

// 1. Mostrar TODOS os section_keys únicos para mapear os prefixos de página
sb.from('site_sections')
  .select('section_key, title')
  .eq('site_slug', 'smartcompany')
  .order('section_key')
  .then(({ data, error }) => {
    if (error) { console.error(JSON.stringify(error)); return; }
    console.log('=== TODOS OS SECTION_KEYS ===');
    data.forEach(r => console.log(`  "${r.section_key}"  →  "${r.title}"`));

    // 2. Extrair prefixos únicos de página
    const prefixes = [...new Set(data.map(r => {
      const parts = r.section_key.split('_');
      // Pega tudo antes do último segmento
      return parts.slice(0, -1).join('_');
    }))].sort();
    console.log('\n=== PREFIXOS ÚNICOS (page slugs) ===');
    prefixes.forEach(p => console.log(' ', p));
  });
