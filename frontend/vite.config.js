import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import analyzer from 'rollup-plugin-analyzer'
import fs from "fs"

const options = {
  key: fs.readFileSync('privkey.pem'),
  cert: fs.readFileSync('fullchain.pem')
};

export default defineConfig({
  server: {
    https: options
  },
  resolve: {
    alias: {
      'src': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    vue(),
    analyzer({ summaryOnly: true }),
  ],
})
