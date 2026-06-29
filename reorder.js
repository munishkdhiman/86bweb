const fs = require('fs');

const path = 'd:/WorkSpace/86B.ai/src/lib/services-data.ts';
let content = fs.readFileSync(path, 'utf8');

// The objects are fairly well formatted. Let's extract them using a regex that matches each service block.
// A service block starts with `  {\n    slug:` and ends with `  },`
const serviceRegex = /  \{\r?\n    slug: '([^']+)',[\s\S]*?\n  \},/g;

const blocks = {};
let match;
while ((match = serviceRegex.exec(content)) !== null) {
  blocks[match[1]] = match[0];
}

const newOrder = [
  // Core AI Capabilities
  { slug: 'generative-ai', category: 'Core AI Capabilities' },
  { slug: 'digital-humans', category: 'Core AI Capabilities' },
  { slug: 'intelligent-process-automation', category: 'Core AI Capabilities' },
  { slug: 'nlp-document-intelligence', category: 'Core AI Capabilities' },
  { slug: 'computer-vision', category: 'Core AI Capabilities' },

  // Enterprise Infrastructure & Security
  { slug: 'llm-infrastructure', category: 'Enterprise Infrastructure & Security' },
  { slug: 'mlops', category: 'Enterprise Infrastructure & Security' },
  { slug: 'ai-governance', category: 'Enterprise Infrastructure & Security' },
  { slug: 'ai-testing-red-teaming', category: 'Enterprise Infrastructure & Security' },

  // Spatial Intelligence & Operations
  { slug: 'cognitive-digital-twins', category: 'Spatial Intelligence & Operations' },
  { slug: 'spatial-computing-ar', category: 'Spatial Intelligence & Operations' },
  { slug: 'ai-smart-glasses', category: 'Spatial Intelligence & Operations' },
  { slug: 'immersive-environments', category: 'Spatial Intelligence & Operations' },
  { slug: 'ai-route-planning', category: 'Spatial Intelligence & Operations' },

  // Domain-Specific Solutions
  { slug: 'financial-intelligence', category: 'Domain-Specific Solutions' },
  { slug: 'predictive-analytics', category: 'Domain-Specific Solutions' },
  { slug: 'investor-readiness', category: 'Domain-Specific Solutions' },
  { slug: 'hr-talent-ai', category: 'Domain-Specific Solutions' },
  { slug: 'ai-language-training', category: 'Domain-Specific Solutions' },
];

let newServicesArray = '';
let currentCategory = '';

for (const item of newOrder) {
  if (item.category !== currentCategory) {
    currentCategory = item.category;
    newServicesArray += `\n  // ── ${currentCategory} ${'─'.repeat(70 - currentCategory.length)}\n`;
  }
  
  let block = blocks[item.slug];
  if (!block) {
    console.error(`Block not found for ${item.slug}`);
    process.exit(1);
  }
  
  // Replace the category field
  block = block.replace(/category: '[^']+',/, `category: '${item.category}',`);
  newServicesArray += block + '\n';
}

// Replace the array in the original content
const prefixRegex = /([\s\S]*?export const services: Service\[\] = \[)/;
const suffixRegex = /(];\s*\n\s*export const servicesByCategory[\s\S]*)/;

const prefixMatch = content.match(prefixRegex);
const suffixMatch = content.match(suffixRegex);

if (prefixMatch && suffixMatch) {
  const newContent = prefixMatch[1] + newServicesArray + suffixMatch[1];
  fs.writeFileSync(path, newContent, 'utf8');
  console.log('Successfully reordered and categorized services.');
} else {
  console.error('Could not find prefix or suffix.');
}
