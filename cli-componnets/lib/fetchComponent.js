const axios = require("axios");
const fs = require("fs");
const path = require("path");

// GitHub repository URL
const REPO_URL = "https://raw.githubusercontent.com/once-ui-system/nextjs-starter/main/src/once-ui/components";

async function fetchComponent(componentName) {
  try {
    // Fetch .tsx and .scss files for the component
    const tsxUrl = `${REPO_URL}/${componentName}/${componentName}.tsx`;
    const scssUrl = `${REPO_URL}/${componentName}/${componentName}.module.scss`;

    const [tsxRes, scssRes] = await Promise.all([
      axios.get(tsxUrl),
      axios.get(scssUrl)
    ]);

    // Store files locally (could be in temp storage or user-defined directory)
    const dir = path.join(__dirname, "../components", componentName);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Save .tsx and .scss files
    fs.writeFileSync(path.join(dir, `${componentName}.tsx`), tsxRes.data);
    fs.writeFileSync(path.join(dir, `${componentName}.module.scss`), scssRes.data);

    console.log(`Successfully added component: ${componentName}`);
  } catch (error) {
    console.error(`Error fetching component ${componentName}:`, error.message);
  }
}

module.exports = fetchComponent;
