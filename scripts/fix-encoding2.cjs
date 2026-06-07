// fix-encoding2.cjs
// The Dashboard.tsx has strings that were originally UTF-8 but got double-encoded.
// The file is valid UTF-8, but inside strings like "Gestão" appear as "GestÃ£o"
// because the original bytes (c3 a3 = ã in UTF-8) were interpreted as Latin-1
// (giving the two chars Ã and £), then saved as UTF-8 again.
// 
// Fix: for each string in the file that contains these mojibake patterns,
// re-interpret them correctly.

const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '..', 'src', 'pages', 'admin', 'Dashboard.tsx');

let text = fs.readFileSync(filePath, 'utf8');

// The pattern: take a substring that looks like Latin-1 mojibake
// and re-encode it. We do this by converting the mojibake string 
// back to Latin-1 bytes, then reading those bytes as UTF-8.
function fixMojibake(str) {
  // Encode the string as Latin-1 (each char code is used as a byte value)
  const bytes = Buffer.alloc(str.length);
  for (let i = 0; i < str.length; i++) {
    bytes[i] = str.charCodeAt(i) & 0xff;
  }
  return bytes.toString('utf8');
}

// We need to selectively fix only the broken parts.
// The broken chars will have char codes in range 0xC0-0xC3, 0x80-0xBF 
// (UTF-8 continuation bytes read as Latin-1)
// Strategy: split the text on string literal boundaries and fix each JS string

// Simpler approach: just do targeted replacements for known broken sequences
// These are the UTF-8 2-byte sequences for Portuguese characters, read as Latin-1:
const mojibakeMap = [
  // ã (U+00E3) -> UTF-8: c3 a3 -> Latin-1: Ã£
  ['Ã£', 'ã'],
  // ç (U+00E7) -> UTF-8: c3 a7 -> Latin-1: Ã§
  ['Ã§', 'ç'],
  // õ (U+00F5) -> UTF-8: c3 b5 -> Latin-1: Ãµ
  ['Ãµ', 'õ'],
  // ê (U+00EA) -> UTF-8: c3 aa -> Latin-1: Ãª
  ['Ãª', 'ê'],
  // é (U+00E9) -> UTF-8: c3 a9 -> Latin-1: Ã©
  ['Ã©', 'é'],
  // á (U+00E1) -> UTF-8: c3 a1 -> Latin-1: Ã¡
  ['Ã¡', 'á'],
  // â (U+00E2) -> UTF-8: c3 a2 -> Latin-1: Ã¢
  ['Ã¢', 'â'],
  // à (U+00E0) -> UTF-8: c3 a0 -> Latin-1: Ã 
  ['Ã ', 'à'],
  // í (U+00ED) -> UTF-8: c3 ad -> Latin-1: Ã­
  ['Ã­', 'í'],
  // ó (U+00F3) -> UTF-8: c3 b3 -> Latin-1: Ã³
  ['Ã³', 'ó'],
  // ô (U+00F4) -> UTF-8: c3 b4 -> Latin-1: Ã´
  ['Ã´', 'ô'],
  // ú (U+00FA) -> UTF-8: c3 ba -> Latin-1: Ãº
  ['Ãº', 'ú'],
  // ü (U+00FC) -> UTF-8: c3 bc -> Latin-1: Ã¼
  ['Ã¼', 'ü'],
  // ñ (U+00F1) -> UTF-8: c3 b1 -> Latin-1: Ã±
  ['Ã±', 'ñ'],
  // Uppercase:
  // Ã (U+00C3) -> UTF-8: c3 83 -> Latin-1: Ãƒ  (but Ã in text means U+00C3 itself - tricky)
  // É (U+00C9) -> UTF-8: c3 89 -> Latin-1: É  ... wait this one is ok
  // Ç (U+00C7) -> UTF-8: c3 87 -> Latin-1: Ã‡
  ['Ã‡', 'Ç'],
  // É (U+00C9) -> UTF-8: c3 89 -> Latin-1: Ã‰
  ['Ã‰', 'É'],
  // Ê (U+00CA) -> UTF-8: c3 8a -> Latin-1: ÃŠ
  ['ÃŠ', 'Ê'],
  // Á (U+00C1) -> UTF-8: c3 81 -> Latin-1: Ã
  // (this is ambiguous - Ã alone in Latin-1 is U+00C3)
  // Ó (U+00D3) -> UTF-8: c3 93 -> Latin-1: Ã"
  ['\u00c3\u201c', 'Ó'],  // Ã" 
  // Ô (U+00D4) -> UTF-8: c3 94 -> Latin-1: Ã"
  // Õ (U+00D5) -> UTF-8: c3 95 -> Latin-1: Ã•
  ['Ã•', 'Õ'],
  // Ú (U+00DA) -> UTF-8: c3 9a -> Latin-1: Ãš
  ['Ãš', 'Ú'],
  // Ã (U+00C3) in words like "GestÃo" - the "Ã" before "o" is double-encoded Ã
  // These specific ones need targeted fix:
];

for (const [from, to] of mojibakeMap) {
  // Use a regex-safe replacement
  while (text.includes(from)) {
    text = text.split(from).join(to);
  }
}

// Handle the tricky Ã"PSITO -> ÓPÓSITO case and PROPÃ"SITO
// Ã" in the text is U+00C3 + U+201C (right double quote) which is wrong
// Let's check what PROP actually contains
const propIdx = text.indexOf('PROP');
if (propIdx !== -1) {
  console.log('PROP context:', JSON.stringify(text.substring(propIdx, propIdx + 20)));
}

// Ã³sito fix - Ó is c3 93 in UTF-8, as Latin-1 that's Ã and "
// The " is actually the byte 93 being read as Latin-1 which gives \u201c (curly quote)
// So PROPÃ"SITO should be PROPÓSITO
text = text.split('\u00c3\u201c').join('Ó');

// Similarly for Ê: ÃŠ -> but Š is U+0160 in Windows-1252, not Latin-1
// In strict Latin-1, byte 0x8A is undefined. In Windows-1252 it's Š (U+0160)
// The byte c3 8a in UTF-8 = Ê... as Latin-1 c3='Ã', 8a=undefined (in cp1252 = Š)
// So ÃŠ where Š=U+0160 → Ê
text = text.split('Ã\u0160').join('Ê');

// VOCÃ -> VOCÊ: Ê (U+00CA utf8=c3aa) but "VOCÃ" pattern
// "VOCÃŠ" = VOCÊ in mojibake (Ê = U+00CA, utf8 c3 8a, latin1 Ã Š)
text = text.split('VOC\u00c3\u0160').join('VOCÊ');

// Write back
fs.writeFileSync(filePath, text, 'utf8');
console.log('Done!');

// Verify
const verify = ['Visão', 'Gestão', 'Página', 'Diagnóstico', 'Você', 'Estratégia', 'Propósito', 'Configuração', 'Função'];
const recheck = fs.readFileSync(filePath, 'utf8');
verify.forEach(w => {
  const found = recheck.includes(w);
  console.log(`${w}: ${found ? '✓' : '✗ MISSING'}`);
});
// Check for remaining mojibake
const remaining = recheck.match(/Ã[¡£¢¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞß]/g);
if (remaining) {
  console.log('Remaining mojibake patterns:', [...new Set(remaining)].slice(0, 20));
} else {
  console.log('No more Ã+char mojibake patterns found!');
}
