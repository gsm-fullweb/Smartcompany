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
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1);
      }
      vars[k] = v;
    }
  }
});

const sb = createClient(vars.VITE_SUPABASE_URL, vars.SUPABASE_SERVICE_ROLE_KEY);

sb.from('site_sections').select('*').limit(3).then(({ data, error }) => {
  if (error) { console.error('ERROR:', JSON.stringify(error)); return; }
  if (data && data.length) {
    console.log('=== COLUMNS ===');
    console.log(Object.keys(data[0]).join(', '));
    data.forEach((row, i) => {
      console.log('\n=== ROW ' + i + ' ===');
      console.log(JSON.stringify(row, null, 2));
    });
  } else {
    console.log('No rows returned');
  }
});
