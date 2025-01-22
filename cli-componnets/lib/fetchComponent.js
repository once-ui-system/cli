const fs = require("fs");
const path = require("path");
const https = require("https");
const { resolveDependencies } = require("./resolveDependencies");
const { logger } = require("./logger");

const BASE_URL = "https://raw.githubusercontent.com/once-ui-system/nextjs-starter/main/src/once-ui/components";

const fetchFile = (url, dest) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const fileStream = fs.createWriteStream(dest);
        res.pipe(fileStream);
        fileStream.on("finish", () => {
          fileStream.close(resolve);
        });
      } else {
        reject(new Error(`Failed to fetch file: ${url} (Status Code: ${res.statusCode})`));
      }
    });
  });
};

const fetchComponent = async (componentName) => {
  const targetDir = path.resolve(process.cwd(), "src/components");
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  const componentUrl = `${BASE_URL}/${componentName}.tsx`;
  const componentPath = path.join(targetDir, `${componentName}.tsx`);

  logger.info(`Downloading ${componentName} component...`);
  await fetchFile(componentUrl, componentPath);

  logger.info(`Resolving dependencies for ${componentName}...`);
  await resolveDependencies(componentPath, targetDir);
};

module.exports = { fetchComponent };
