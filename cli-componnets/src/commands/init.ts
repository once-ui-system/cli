import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { getDefaultConfig } from "../utils/config.js";
import { logger } from "../utils/logger.js";

export async function init(options: { yes: boolean }) {
  try {
    const config = getDefaultConfig();
    
    // Write config file
    await fs.writeFile(
      path.join(process.cwd(), "once-ui.config.json"),
      JSON.stringify(config, null, 2)
    );

    logger.success("Initialized Once UI configuration");
  } catch (error) {
    logger.error("Failed to initialize", error);
    process.exit(1);
  }
}