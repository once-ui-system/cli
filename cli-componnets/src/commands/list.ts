import chalk from "chalk";
import { fetchComponentList } from "../utils/fetch.js";
import { logger } from "../utils/logger.js";
import ora from "ora";

export async function list() {
  const spinner = ora({
    text: "Fetching available components...",
    color: "blue",
  }).start();

  try {
    const components = await fetchComponentList();
    spinner.stop();

    if (!components.length) {
      logger.info("No components available.");
      return;
    }

    console.log("\n" + chalk.bold.blue("Available Components:") + "\n");

    components.forEach((component, index) => {
      console.log(
        chalk.gray(`${index + 1}.`) +
        chalk.white(` ${component.name}`) +
        chalk.dim(` - ${component.description}`)
      );
    });

    console.log("\n" + chalk.dim("Run") + 
      chalk.cyan(" once-ui-kit add <component>") + 
      chalk.dim(" to add a component to your project") + "\n"
    );
  } catch (error) {
    spinner.fail("Failed to fetch components");
    logger.error("Failed to fetch component list", error);
    process.exit(1);
  }
}