import axios from 'axios';

const COMPONENTS_BASE = 'https://raw.githubusercontent.com/once-ui-system/nextjs-starter/main/src/once-ui/components/index.ts';

const compRegex = /export\s+\*\s+from\s+["']\.(?:\/|\\)([^"']+)["'];/;

export async function getComponents() {
  const response = await axios.get(COMPONENTS_BASE);
  const data = response.data;

  return data.split('\n').map(c => {
    const match = c.match(compRegex);
    if (match) {
      return match[1]
    }
  })
}