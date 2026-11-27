import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    define: {
      'process.env.REACT_APP_BASE_URL': JSON.stringify(
        env.REACT_APP_BASE_URL || 'http://localhost:4000/api/v1'
      ),
      'process.env.REACT_APP_API_URL': JSON.stringify(
        env.REACT_APP_API_URL || 'http://localhost:4000/api/v1'
      ),
    },
  };
});
