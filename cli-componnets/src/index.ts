#!/usr/bin/env node
import { Command } from "commander";
import { add } from "./commands/add.js";
import { init } from "./commands/init.js";
import { list } from "./commands/list.js";
import chalk from "chalk";

const program = new Command();

// Add ASCII art banner
console.log(chalk.cyan(`
 ██████╗ ███╗   ██╗ ██████╗███████╗    ██╗   ██╗██╗
██╔═══██╗████╗  ██║██╔════╝██╔════╝    ██║   ██║██║
██║   ██║██╔██╗ ██║██║     █████╗      ██║   ██║██║
██║   ██║██║╚██╗██║██║     ██╔══╝      ██║   ██║██║
╚██████╔╝██║ ╚████║╚██████╗███████╗    ╚██████╔╝██║
 ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝╚══════╝     ╚═════╝ ╚═╝
`));

program
  .name("once-ui-kit")
  .description(chalk.white("Modern UI components for your Next.js projects"))
  .version("1.1.5");

program
  .command("add")
  .description("Add a component to your project")
  .argument("<component>", "component name")
  .option("-y, --yes", "Skip confirmation prompt", false)
  .action(add);

program
  .command("init")
  .description("Initialize Once UI in your project")
  .option("-y, --yes", "Skip confirmation prompt", false)
  .action(init);

program
  .command("list")
  .description("List all available components")
  .action(list);

// Add examples
program.addHelpText("after", `
Examples:
  $ once-ui-kit init              Initialize Once UI in your project
  $ once-ui-kit list             List all available components
  $ once-ui-kit add Button       Add Button component to your project
  $ once-ui-kit add Alert -y     Add Alert component without confirmation
`);

program.parse();
