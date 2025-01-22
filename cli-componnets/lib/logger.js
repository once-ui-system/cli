import chalk from "chalk";

export const logger = {
  info: (msg) => console.log(chalk.blue(`[INFO]: ${msg}`)),
  success: (msg) => console.log(chalk.green(`[SUCCESS]: ${msg}`)),
  error: (msg) => console.error(chalk.red(`[ERROR]: ${msg}`)),
};
