import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import { fileURLToPath } from 'url';

// https://vitejs.dev/config/


//fix for __dirname not available
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{find: "@", replacement: path.resolve(__dirname, "src")}]
  }
})
