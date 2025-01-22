const { Command } = require("commander");
const fetchComponent = require("../lib/fetchComponent");
const resolveDeps = require("../lib/resolveDeps");
const inquirer = require("inquirer");
const chalk = require("chalk");

const program = new Command();

program
  .version("1.0.0")
  .description("CLI to add components dynamically from GitHub repository");

program
  .command("add <component-name>")
  .description("Add a new component")
  .action(async (componentName) => {
    // First, resolve dependencies for the component
    resolveDeps(componentName);

    // Fetch the component's code
    await fetchComponent(componentName);

    // Ask user if they want to install additional components
    const { addMore } = await inquirer.prompt([
      {
        type: "confirm",
        name: "addMore",
        message: "Do you want to install more components?",
        default: false,
      },
    ]);

    if (addMore) {
      const { component } = await inquirer.prompt([
        {
          type: "input",
          name: "component",
          message: "Enter component name to add:",
        },
      ]);
      await fetchComponent(component);
    }
  });

program.parse(process.argv);
