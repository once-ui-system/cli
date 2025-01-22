import fs from "fs";
import path from "path";
import { logger } from "./logger.js";

export async function fetchComponent(component) {
  const componentsDir = path.resolve("src/components");
  const componentDir = path.resolve(componentsDir, component);

  if (!fs.existsSync(componentsDir)) {
    fs.mkdirSync(componentsDir, { recursive: true });
    logger.success("Created components directory.");
  }

  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
    logger.success(`Created directory for ${component}.`);
  }

  const componentFile = path.resolve(componentDir, `${component}.jsx`);
  if (!fs.existsSync(componentFile)) {
    fs.writeFileSync(
      componentFile,
      `// ${component} Component\n\nexport default function ${component}() {\n  return <div>${component} works!</div>;\n}\n`
    );
    logger.success(`Created ${component} component file.`);
  } else {
    logger.info(`${component} already exists.`);
  }
}
