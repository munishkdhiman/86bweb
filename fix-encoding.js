const fs = require('fs');

const path = 'd:/WorkSpace/86B.ai/src/app/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// The sequence 'â€”' corresponds to the bytes 0xE2 0x80 0x94 read as Windows-1252 but actually it's UTF-8 for '—' (em dash).
// Another sequence is 'â€“' which is en-dash.
// Let's replace 'â€”' with '—'
content = content.replace(/â€”/g, '—');
content = content.replace(/â€“/g, '—');
content = content.replace(/â€'/g, "'"); // apostrophe sometimes
content = content.replace(/â€œ/g, '"'); // quote
content = content.replace(/â€ /g, '"'); // quote
content = content.replace(/â”€/g, '─'); // box drawing

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed encoding issues in page.tsx');
