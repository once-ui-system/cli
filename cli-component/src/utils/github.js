import axios from 'axios';
import { error } from './logger.js';

const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/once-ui-system/magic-portfolio/main/src/once-ui/components';

export async function fetchComponentContent(componentName) {
  try {
    const response = await axios.get(`${GITHUB_RAW_BASE}/${componentName}.tsx`);
    return response.data;
  } catch (err) {
    error(`Error fetching ${componentName}: ${err.message}`);
    return null;
  }
}

export async function fetchStyleContent(fileName) {
  try {
    const response = await axios.get(`${GITHUB_STYLES_BASE}/${fileName}`);
    return response.data;
  } catch (err) {
    // Don't show error for missing style files as not all components have them
    return null;
  }
}

export async function fetchTokenContent(fileName) {
  try {
    const response = await axios.get(`${GITHUB_TOKENS_BASE}/${fileName}`);
    return response.data;
  } catch (err) {
    // Don't show error for missing token files as not all components have them
    return null;
  }
}
