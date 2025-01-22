import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { getDefaultConfig } from "../utils/config.js";
import { logger } from "../utils/logger.js";
import { fetchComponentList } from "../utils/fetch.js";
import prompts from "prompts";

export async function init(options: { yes: boolean }) {
  try {
    const config = getDefaultConfig();
    
    // Write config file
    await fs.writeFile(
      path.join(process.cwd(), "once-ui.config.json"),
      JSON.stringify(config, null, 2)
    );

    logger.success("Initialized Once UI configuration");

    // Fetch and display available components
    const components = await fetchComponentList();
    if (components.length === 0) {
      logger.info("No components available.");
      return;
    }

    console.log("\n" + chalk.bold.blue("Available Components:") + "\n");
    const componentChoices = components.map((component, index) => ({
      title: component.name,
      value: component.name,
    }));

    const response = await prompts({
      type: 'select',
      name: 'component',
      message: 'Select a component to add:',
      choices: componentChoices,
      initial: 0,
    });

    if (response.component) {
      console.log(`You selected: ${response.component}`);
      // Here you can call the add function to add the selected component
      // await add(response.component, { yes: options.yes });
    }
  } catch (error) {
    logger.error("Failed to initialize", error);
    process.exit(1);
  }
}
