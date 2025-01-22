import chalk from "chalk";

export const logger = {
  info: (message: string) => console.log(chalk.blue("info") + " - " + message),
  success: (message: string) => console.log(chalk.green("success") + " - " + message),
  error: (message: string, error?: any) => {
    console.error(chalk.red("error") + " - " + message);
    if (error) console.error(error);
  },
};
