import axios from 'axios';
import { error } from './logger.js';

const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/once-ui-system/nextjs-starter/main/src/once-ui/components';

export async function fetchComponentContent(componentName) {
  try {
    const response = await axios.get(`${GITHUB_RAW_BASE}/${componentName}.tsx`);
    return response.data;
  } catch (err) {
    error(`Error fetching ${componentName}: ${err.message}`);
    return null;
  }
}

export async function fetchStyleContent(componentName) {
  try {
    const response = await axios.get(`${GITHUB_RAW_BASE}/${componentName}.module.scss`);
    return response.data;
  } catch (err) {
    // Don't show error for missing style files as not all components have them
    return null;
  }
}