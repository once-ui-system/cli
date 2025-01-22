const fs = require("fs");
const path = require("path");

function resolveDeps(componentName) {
  // Here we assume that the dependencies of each component are listed in a JSON file
  const registry = require("../components-registry/registry.json");

  // Check if the component exists in the registry
  const component = registry[componentName];
  if (!component) {
    console.error(`Component ${componentName} not found in registry.`);
    return;
  }

  // Install dependencies (if any) listed in the registry
  const dependencies = component.dependencies || [];
  dependencies.forEach((dep) => {
    console.log(`Resolving dependency: ${dep}`);
    // Here you can call the fetchComponent function for each dependency
    fetchComponent(dep);
  });
}

module.exports = resolveDeps;
