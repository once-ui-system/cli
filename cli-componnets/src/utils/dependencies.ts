import { execa } from "execa";
import { logger } from "./logger.js";

export async function installDependencies(dependencies: string[]) {
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