import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
server:{
  proxy:{
    "/api":{
      target:"http://localhost:5000", /// whenever we use the /api it's going to prefix  with the target
    }
  }
}
})
