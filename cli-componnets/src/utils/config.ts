import { z } from "zod";
import fs from "fs-extra";
import path from "path";

const configSchema = z.object({
  componentsDir: z.string().default("src/components"),
  repository: z.string(),
  branch: z.string().default("main"),
});

export type Config = z.infer<typeof configSchema>;

export function getDefaultConfig(): Config {
  return {
    componentsDir: "src/components",
    repository: "https://api.github.com/repos/once-ui-system/nextjs-starter/contents",
    branch: "main",
  };
}

export async function getConfig(): Promise<Config> {
  try {
    const configPath = path.join(process.cwd(), "once-ui.config.json");
    const configFile = await fs.readFile(configPath, "utf-8");
    const config = JSON.parse(configFile);
    return configSchema.parse(config);
  } catch {
    return getDefaultConfig();
  }
}