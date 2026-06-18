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
const SLUG = 'smartcompany';

// type: 'object' → faz spread dos campos do objeto direto em metadata
//       'array'  → guarda o array em metadata[metaKey]
const TARGETS = [
  { key: 'home_mentor',                 type: 'object' },
  { key: 'home_agir_vs_reagir',         type: 'object' },
  { key: 'home_coragem',                type: 'object' },
  { key: 'home_transformacao',          type: 'object' },
  { key: 'home_auto_gestao_checklist',  type: 'array', metaKey: 'auto_gestao_checklist' },
];

(async () => {
  console.log('Migrando objetos/checklist de content (JSON) → metadata...\n');
  for (const tgt of TARGETS) {
    const { data: rows, error } = await supabase
      .from('site_sections').select('*').eq('site_slug', SLUG).eq('section_key', tgt.key).limit(1);
    if (error) { console.error(`✗ ${tgt.key}: ${error.message}`); continue; }
    const row = rows && rows[0];
    if (!row) { console.log(`– ${tgt.key}: não existe, ignorada`); continue; }

    const content = typeof row.content === 'string' ? row.content.trim() : '';
    if (!content.startsWith('{') && !content.startsWith('[')) {
      console.log(`✓ ${tgt.key}: content já vazio/migrado, idempotente`);
      continue;
    }

    let parsed = null;
    try { parsed = JSON.parse(content); } catch (e) { parsed = null; }
    if (parsed == null) { console.log(`! ${tgt.key}: content não é JSON válido — PULADO`); continue; }

    const meta = (row.metadata && typeof row.metadata === 'object') ? row.metadata : {};
    let newMeta;
    if (tgt.type === 'object') {
      if (Array.isArray(parsed) || typeof parsed !== 'object') { console.log(`! ${tgt.key}: esperava objeto — PULADO`); continue; }
      newMeta = { ...meta, ...parsed };
    } else {
      if (!Array.isArray(parsed)) { console.log(`! ${tgt.key}: esperava array — PULADO`); continue; }
      newMeta = { ...meta, [tgt.metaKey]: parsed };
    }

    const { error: upErr } = await supabase
      .from('site_sections')
      .update({ metadata: newMeta, content: '', updated_at: new Date().toISOString() })
      .eq('id', row.id);
    if (upErr) { console.error(`✗ ${tgt.key}: ${upErr.message}`); continue; }
    const desc = tgt.type === 'object' ? `objeto (${Object.keys(parsed).length} campos)` : `${parsed.length} itens`;
    console.log(`✓ ${tgt.key}: ${desc} movido para metadata, content limpo`);
  }
  console.log('\nConcluído.');
})();
