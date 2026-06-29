const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            
            let newContent = content.replace(/className=(["'])(.*?)\1/g, (match, quote, classNames) => {
                if (/\b(text-2xl|text-3xl|text-4xl|text-5xl|text-6xl|text-7xl)\b/.test(classNames)) {
                    let updated = classNames
                        .replace(/\bfont-semibold\b/g, 'font-light')
                        .replace(/\bfont-medium\b/g, 'font-light')
                        .replace(/\bfont-normal\b/g, 'font-light')
                        .replace(/\bfont-bold\b/g, 'font-light');
                    return `className=${quote}${updated}${quote}`;
                }
                return match;
            });
            
            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent);
            }
        }
    }
}

processDir('d:/WorkSpace/86B.ai/src');
