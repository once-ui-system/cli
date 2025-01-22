#!/usr/bin/env node

// src/index.ts
import { Command } from "commander";

// src/utils/fetch.ts
import fetch from "node-fetch";

// src/utils/config.ts
import { z } from "zod";
import fs from "fs-extra";
import path from "path";
var configSchema = z.object({
  componentsDir: z.string().default("src/components"),
  repository: z.string(),
  branch: z.string().default("main")
});
function getDefaultConfig() {
  return {
    componentsDir: "src/components",
    repository: "https://api.github.com/repos/once-ui-system/nextjs-starter/contents",
    branch: "main"
  };
}
async function getConfig() {
  try {
    const configPath = path.join(process.cwd(), "once-ui.config.json");
    const configFile = await fs.readFile(configPath, "utf-8");
    const config = JSON.parse(configFile);
    return configSchema.parse(config);
  } catch {
    return getDefaultConfig();
  }
}

// src/utils/fetch.ts
async function fetchComponentData(componentName) {
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
    const dependencies = extractDependencies(Buffer.from(tsxData.content, "base64").toString());
    return {
      tsx: Buffer.from(tsxData.content, "base64").toString(),
      scss: Buffer.from(scssData.content, "base64").toString(),
      dependencies
    };
  } catch (error) {
    return null;
  }
}
function extractDependencies(tsxContent) {
  const importRegex = /import.*from\s+['"]([^'"]+)['"]/g;
  const matches = [...tsxContent.matchAll(importRegex)];
  return matches.map((match) => match[1]).filter((dep) => !dep.startsWith(".")).filter((dep) => dep !== "react");
}

// src/utils/dependencies.ts
import { execa } from "execa";

// src/utils/logger.ts
import chalk from "chalk";
var logger = {
  info: (message) => console.log(chalk.blue("info") + " - " + message),
  success: (message) => console.log(chalk.green("success") + " - " + message),
  error: (message, error) => {
    console.error(chalk.red("error") + " - " + message);
    if (error) console.error(error);
  }
};

// src/utils/dependencies.ts
async function installDependencies(dependencies) {
  if (dependencies.length === 0) return;
  logger.info("Installing dependencies...");
  try {
    await execa("npm", ["install", ...dependencies]);
    logger.success("Dependencies installed");
  } catch (error) {
    logger.error("Failed to install dependencies", error);
    process.exit(1);
  }
}

// src/commands/add.ts
import fs2 from "fs-extra";
import path2 from "path";
async function add(componentName, options) {
  try {
    const config = await getConfig();
    const componentData = await fetchComponentData(componentName);
    if (!componentData) {
      logger.error(`Component ${componentName} not found`);
      process.exit(1);
    }
    await installDependencies(componentData.dependencies);
    const componentDir = path2.join(process.cwd(), config.componentsDir);
    await fs2.ensureDir(componentDir);
    await fs2.writeFile(
      path2.join(componentDir, `${componentName}.tsx`),
      componentData.tsx
    );
    await fs2.writeFile(
      path2.join(componentDir, `${componentName}.module.scss`),
      componentData.scss
    );
    logger.success(`Added ${componentName} component`);
  } catch (error) {
    logger.error("Failed to add component", error);
    process.exit(1);
  }
}

// src/commands/init.ts
import fs3 from "fs-extra";
import path3 from "path";
async function init(options) {
  try {
    const config = getDefaultConfig();
    await fs3.writeFile(
      path3.join(process.cwd(), "once-ui.config.json"),
      JSON.stringify(config, null, 2)
    );
    logger.success("Initialized Once UI configuration");
  } catch (error) {
    logger.error("Failed to initialize", error);
    process.exit(1);
  }
}

// src/index.ts
var program = new Command();
program.name("once-ui-kit").description("CLI for adding Once UI components to your project").version("1.0.0");
program.command("add").description("Add a component to your project").argument("<component>", "component name").option("-y, --yes", "Skip confirmation prompt", false).action(add);
program.command("init").description("Initialize Once UI in your project").option("-y, --yes", "Skip confirmation prompt", false).action(init);
program.parse();
