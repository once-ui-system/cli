#!/usr/bin/env node

import { fetchComponent } from "../lib/fetchComponent.js";
import { logger } from "../lib/logger.js";

const args = process.argv.slice(2);
const command = args[0];
const componentName = args[1];
const options = args.slice(2);

if (command === "add" && componentName) {
  logger.info(`Fetching component: ${componentName}`);
  fetchComponent(componentName)
    .then(() => logger.success(`Component '${componentName}' added successfully!`))
    .catch((err) => logger.error(err.message));
} else if (command === "list") {
  logger.info("Listing all available components...");
  fetchComponent("index")
    .then(() => logger.success("Components listed successfully!"))
    .catch((err) => logger.error(err.message));
} else {
  logger.error("Invalid command. Use 'add <component-name>' or 'list'.");
}
