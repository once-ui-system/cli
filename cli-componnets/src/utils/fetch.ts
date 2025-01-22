import fetch from "node-fetch";
import { getConfig } from "./config.js";

interface ComponentData {
  tsx: string;
  scss: string;
  dependencies: string[];
}

interface Component {
  name: string;
  description: string;
}

export async function fetchComponentList(): Promise<Component[]> {
  const config = await getConfig();
  
  try {
    const response = await fetch(
      `${config.repository}/src/once-ui/components`
    );
    const data = await response.json();
    
    return data
      .filter((file: any) => file.name.endsWith('.tsx'))
      .map((file: any) => ({
        name: file.name.replace('.tsx', ''),
        description: getComponentDescription(file.name)
      }));
  } catch (error) {
    console.error("Error fetching component list:", error);
    return [];
  }
}

function getComponentDescription(name: string): string {
  const descriptions: Record<string, string> = {
    'Accordion': 'Expandable content sections with smooth animations',
    'Alert': 'Contextual feedback messages for user actions',
    'Avatar': 'User or entity representation with image support',
    'Badge': 'Small count and labeling component',
    'Button': 'Customizable button component with various styles',
    'Card': 'Flexible content container with multiple variants',
    'Checkbox': 'Interactive checkbox input component',
    'Dialog': 'Modal dialog with customizable content',
    'Dropdown': 'Button with dropdown menu',
    'Input': 'Text input field with various styles',
    'Select': 'Dropdown select component',
    'Tabs': 'Tabbed interface component',
    'Toast': 'Temporary notification messages',
    'Toggle': 'Switch toggle component',
  };
  
  return descriptions[name] || 'UI component';
}

export async function fetchComponentData(componentName: string): Promise<ComponentData | null> {
  const config = await getConfig();
  
  try {
    const tsxResponse = await fetch(
      `${config.repository}/src/once-ui/components/${componentName}.tsx`
    );
    const tsxData = await tsxResponse.json();
    
    const scssResponse = await fetch(
      `${config.repository}/src/once-ui/components/${componentName}.module.scss`
    );
    const scssData = await scssResponse.json();
    
    const dependencies = extractDependencies(Buffer.from(tsxData.content, 'base64').toString());

    return {
      tsx: Buffer.from(tsxData.content, 'base64').toString(),
      scss: Buffer.from(scssData.content, 'base64').toString(),
      dependencies,
    };
  } catch (error) {
    console.error(`Error fetching component data for ${componentName}:`, error);
    return null;
  }
}

function extractDependencies(tsxContent: string): string[] {
  const importRegex = /import.*from\s+['"]([^'"]+)['"]/g;
  const matches = [...tsxContent.matchAll(importRegex)];
  
  return matches
    .map(match => match[1])
    .filter(dep => !dep.startsWith("."))
    .filter(dep => dep !== "react");
}
