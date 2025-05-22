import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const repositoryName = 'vibe'; // O el nombre que le hayas dado

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? `/${repositoryName}/` : '/',

})
