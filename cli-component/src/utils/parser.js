export function getDependencies(content) {
  const dependencies = new Set();

  // Parse component imports
  const importRegex = /import\s+{([^}]+)}\s+from\s+["']\.["'];?/g;
  const matches = [...content.matchAll(importRegex)];
  matches.forEach(match => {
    const imports = match[1]
      .split(',')
      .map(imp => imp.trim())
      .filter(imp => !imp.toLowerCase().includes('props')); // Ignore imports containing 'Props'
    
    imports.forEach(imp => dependencies.add(imp));
  });

  // Parse style imports
  const styleRegex = /import\s+(?:styles|[a-zA-Z]+Styles)\s+from\s+["']\.\/([\w]+)\.module\.scss["'];?/g;
  const styleMatches = [...content.matchAll(styleRegex)];
  styleMatches.forEach(match => {
    dependencies.add(`${match[1]}.module.scss`);
  });

  return Array.from(dependencies);
}
