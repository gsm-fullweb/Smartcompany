const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// ─── Load .env ───────────────────────────────────────────────────────────────
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

const SLUG = 'smartcompany';

// section_key → chave do array em metadata (alinhada ao que o hook useDynamicContent lê)
const TARGETS = [
  { key: 'home_journeys',           metaKey: 'journeys' },
  { key: 'home_pillars',            metaKey: 'pillars' },
  { key: 'home_cursos',             metaKey: 'cursos' },
  { key: 'home_ebooks',             metaKey: 'ebooks' },
  { key: 'agexpert_painPoints',     metaKey: 'painPoints' },
  { key: 'agexpert_modules',        metaKey: 'modules' },
  { key: 'agexpert_bonuses',        metaKey: 'bonuses' },
  { key: 'cursocia_targets',        metaKey: 'targets' },
  { key: 'cursocia_modules',        metaKey: 'modules' },
  { key: 'cursocia_bonuses',        metaKey: 'bonuses' },
  { key: 'imersao-omappa_pillars',  metaKey: 'pillars' },
  { key: 'imersao-omappa_testimonies', metaKey: 'testimonies' },
  { key: 'imersao-omappa_faqs',     metaKey: 'faqs' },
  { key: 'materiais_ebooks',        metaKey: 'ebooks' },
];

(async () => {
  console.log('Migrando arrays de content (JSON) → metadata...\n');
  for (const { key, metaKey } of TARGETS) {
    const { data: rows, error } = await supabase
      .from('site_sections').select('*').eq('site_slug', SLUG).eq('section_key', key).limit(1);
    if (error) { console.error(`✗ ${key}: erro ao buscar — ${error.message}`); continue; }
    const row = rows && rows[0];
    if (!row) { console.log(`– ${key}: seção não existe, ignorada`); continue; }

    const meta = (row.metadata && typeof row.metadata === 'object') ? row.metadata : {};
    if (Array.isArray(meta[metaKey]) && meta[metaKey].length > 0) {
      console.log(`✓ ${key}: já em metadata.${metaKey} (${meta[metaKey].length} itens), idempotente`);
      continue;
    }

    let parsed = null;
    if (typeof row.content === 'string' && row.content.trim().startsWith('[')) {
      try { parsed = JSON.parse(row.content); } catch (e) { parsed = null; }
    }
    if (!Array.isArray(parsed)) {
      console.log(`! ${key}: content não é array JSON — PULADO (verificar manualmente)`);
      continue;
    }

    const newMeta = { ...meta, [metaKey]: parsed };
    const { error: upErr } = await supabase
      .from('site_sections')
      .update({ metadata: newMeta, content: '', updated_at: new Date().toISOString() })
      .eq('id', row.id);
    if (upErr) { console.error(`✗ ${key}: erro ao atualizar — ${upErr.message}`); continue; }
    console.log(`✓ ${key}: ${parsed.length} itens movidos para metadata.${metaKey}, content limpo`);
  }
  console.log('\nConcluído.');
})();
