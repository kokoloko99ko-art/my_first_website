'use strict';

const fs = require('node:fs');
const path = require('node:path');

const configuredUrl = String(process.env.NEXORA_API_URL || '').trim().replace(/\/+$/, '');

if (configuredUrl) {
  let parsedUrl;
  try {
    parsedUrl = new URL(configuredUrl);
  } catch (error) {
    throw new Error('NEXORA_API_URL must be a valid HTTPS backend origin.');
  }

  if (parsedUrl.protocol !== 'https:' || parsedUrl.pathname !== '/' || parsedUrl.search || parsedUrl.hash) {
    throw new Error('NEXORA_API_URL must be an HTTPS backend origin without a path, query, or fragment.');
  }
}

const apiConfig = 'window.NEXORA_BACKEND_URL = ' + JSON.stringify(configuredUrl) + ';\n';
fs.writeFileSync(path.join(__dirname, 'api-config.js'), apiConfig, 'utf8');
console.log('Generated api-config.js' + (configuredUrl ? ' for the configured backend.' : ' without a backend URL (static/demo mode).'));
