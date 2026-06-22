import path from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const external = ['react', 'react-dom', 'react/jsx-runtime', /^lexical$/, /^@lexical\//]

export default defineConfig({
  resolve: {
    alias: {
      '#': path.resolve(dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external,
    },
    cssCodeSplit: false,
  },
  plugins: [
    tailwindcss(),
    dts({
      tsconfigPath: './tsconfig.build.json',
      entryRoot: 'src',
    }),
  ],
})
