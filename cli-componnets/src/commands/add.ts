import chalk from "chalk";
import { fetchComponentData } from "../utils/fetch.js";
import { installDependencies } from "../utils/dependencies.js";
import fs from "fs-extra";
import path from "path";
import { getConfig } from "../utils/config.js";
import { logger } from "../utils/logger.js";

export async function add(componentName: string, options: { yes: boolean }) {
  try {
    const config = await getConfig();
    
    // Fetch component data from repository
    const componentData = await fetchComponentData(componentName);
    if (!componentData) {
      logger.error(`Component ${componentName} not found`);
      process.exit(1);
    }

    // Install dependencies
    await installDependencies(componentData.dependencies);

    // Create component directory if it doesn't exist
    const componentDir = path.join(process.cwd(), config.componentsDir);
    await fs.ensureDir(componentDir);

    // Write component files
    await fs.writeFile(
      path.join(componentDir, `${componentName}.tsx`),
      componentData.tsx
    );
    await fs.writeFile(
      path.join(componentDir, `${componentName}.module.scss`),
      componentData.scss
    );

    logger.success(`Added ${componentName} component`);
  } catch (error) {
    logger.error("Failed to add component", error);
    process.exit(1);
  }
}