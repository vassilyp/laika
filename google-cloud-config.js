import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export function setupGoogleCredentials() {
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
    try {
      const credentialsPath = '/tmp/google-credentials.json';
      writeFileSync(credentialsPath, process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
      process.env.GOOGLE_APPLICATION_CREDENTIALS = credentialsPath;
      console.log('Google Cloud credentials set up successfully');
    } catch (error) {
      console.error('Error setting up Google Cloud credentials:', error);
    }
  } else {
    console.error('GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable is not set');
  }
}