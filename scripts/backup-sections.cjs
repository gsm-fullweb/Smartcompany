const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const dotenvPath = path.join(__dirname, '../.env');
if (fs.existsSync(dotenvPath)) {
  fs.readFileSync(dotenvPath, 'utf8').split(/\r?\n/).forEach(line => {
    const t = line.trim();
    if (t && !t.startsWith('#')) {
      const i = t.indexOf('=');
      let v = t.slice(i + 1).trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
      process.env[t.slice(0, i).trim()] = v;
    }
  });
}
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// READ-ONLY: apenas lê e salva um snapshot local. Nenhuma mutação.
(async () => {
  const { data, error } = await supabase
    .from('site_sections').select('*').eq('site_slug', 'smartcompany');
  if (error) { console.error('Erro ao ler:', error.message); process.exit(1); }
  const stamp = process.argv[2] || 'backup';
  const out = path.join(__dirname, `site_sections_${stamp}.json`);
  fs.writeFileSync(out, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Backup salvo: ${out} (${data.length} seções)`);
})();
