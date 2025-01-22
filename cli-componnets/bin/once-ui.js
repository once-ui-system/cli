#!/usr/bin/env node

import { Command } from "commander";
import { fetchComponent } from "../lib/fetchComponent.js";
import { logger } from "../lib/logger.js";

const program = new Command();

program
  .name("once-ui-kit")
  .description("CLI to manage UI components")
  .version("1.0.0");

program
  .command("add <component>")
  .description("Add a UI component to your project")
  .action(async (component) => {
    try {
      logger.info(`Adding ${component}...`);
      await fetchComponent(component);
      logger.success(`${component} added successfully!`);
    } catch (error) {
      logger.error(`Failed to add ${component}: ${error.message}`);
    }
  });

program
  .command("list")
  .description("List available components")
  .action(() => {
    const components = ["Accordion", "Button", "Card"];
    logger.info("Available components:");
    components.forEach((component) => logger.success(`- ${component}`));
  });

program.parse(process.argv);
