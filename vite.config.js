import { defineConfig } from 'vite'
import react from 'lomdat-motivation-sources'

export default defineConfig({
  plugins: [react()],
  base: '/react-boilerplate/',
})