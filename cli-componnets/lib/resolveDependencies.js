const fs = require("fs");
const path = require("path");
const { fetchFile } = require("./fetchComponent");
const { logger } = require("./logger");

const BASE_URL = "https://raw.githubusercontent.com/once-ui-system/nextjs-starter/main/src/once-ui/components";

const resolveDependencies = async (filePath, targetDir) => {
  const content = fs.readFileSync(filePath, "utf-8");
  const importRegex = /import .* from ["'](.*)["'];?/g;
  const dependencies = [...content.matchAll(importRegex)].map((match) => match[1]);

  for (const dep of dependencies) {
    if (!dep.startsWith(".")) continue; // Skip external modules

    const depPath = dep.replace("./", "");
    const depUrl = `${BASE_URL}/${depPath}.tsx`;
    const depDest = path.join(targetDir, `${depPath}.tsx`);

    if (!fs.existsSync(depDest)) {
      logger.info(`Fetching dependency: ${depPath}`);
      await fetchFile(depUrl, depDest);
      await resolveDependencies(depDest, targetDir); // Recursive resolution
    }
  }
};

module.exports = { resolveDependencies };
