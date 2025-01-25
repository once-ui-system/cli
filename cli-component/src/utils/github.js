import axios from 'axios';
import { error } from './logger.js';

const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/once-ui-system/nextjs-starter/main/src/once-ui/components';
const STYLES_BASE = 'https://raw.githubusercontent.com/once-ui-system/nextjs-starter/main/src/once-ui/styles';
const TOKENS_BASE = 'https://raw.githubusercontent.com/once-ui-system/nextjs-starter/main/src/once-ui/tokens';

export async function fetchComponentContent(componentName) {
  try {
    const response = await axios.get(`${GITHUB_RAW_BASE}/${componentName}.tsx`);
    return response.data;
  } catch (err) {
    // Suppress error for missing component files
    return null;
  }
}

export async function fetchStyleContent(componentName) {
  try {
    const response = await axios.get(`${GITHUB_RAW_BASE}/${componentName}.module.scss`);
    return response.data;
  } catch (err) {
    // Suppress error for missing style files
    return null;
  }
}

export async function fetchStyleFile(styleName) {
  try {
    const response = await axios.get(`${STYLES_BASE}/${styleName}`);
    return response.data;
  } catch (err) {
    // Suppress error for missing style files
    return null;
  }
}

export async function fetchTokenFile(tokenName) {
  try {
    const response = await axios.get(`${TOKENS_BASE}/${tokenName}`);
    return response.data;
  } catch (err) {
    // Suppress error for missing token files
    return null;
  }
}
