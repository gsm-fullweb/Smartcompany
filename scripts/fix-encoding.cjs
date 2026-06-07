// fix-encoding.js - Fixes mojibake (double-encoded UTF-8) in Dashboard.tsx
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'pages', 'admin', 'Dashboard.tsx');

// Read raw bytes
const buffer = fs.readFileSync(filePath);

// The file was saved as UTF-8 but the strings inside are UTF-8 bytes
// that were incorrectly interpreted as Latin-1 and then re-encoded as UTF-8.
// Strategy: decode as Latin-1 to get the original bytes, then re-interpret as UTF-8.
const latin1Text = buffer.toString('latin1');
// Re-encode the Latin-1 string back to a Buffer treating each char as a byte
const fixedBuffer = Buffer.from(latin1Text, 'latin1');
// Now decode as UTF-8
let text = fixedBuffer.toString('utf8');

// Write back
fs.writeFileSync(filePath, text, { encoding: 'utf8' });
console.log('Done! Encoding fixed for:', filePath);

// Verify a few key strings
const sample = text.substring(0, 5000);
if (sample.includes('Vis') && !sample.includes('\u00c3')) {
  console.log('Verification: No more mojibake detected in first 5000 chars');
} else {
  console.log('Sample check:', sample.substring(sample.indexOf('Vis'), sample.indexOf('Vis') + 50));
}
