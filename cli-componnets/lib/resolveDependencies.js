import fs from "fs";
import path from "path";
import { logger } from "./logger.js";

export async function resolveDependencies(component) {
  const dependenciesDir = path.resolve("src/dependencies");
  if (!fs.existsSync(dependenciesDir)) {
    fs.mkdirSync(dependenciesDir, { recursive: true });
    logger.success("Created dependencies directory.");
  }

  const dependencyFile = path.resolve(dependenciesDir, `${component}.dep.js`);
  if (!fs.existsSync(dependencyFile)) {
    fs.writeFileSync(
      dependencyFile,
      `// Dependency for ${component}\nexport const ${component}Dependency = {};\n`
    );
    logger.success(`Created dependency for ${component}.`);
  }
}
