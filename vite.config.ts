import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import presetAttributify from '@unocss/preset-attributify'
import presetUno from '@unocss/preset-uno'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    UnoCSS({
      presets: [presetUno(), presetAttributify()],
      rules: [
        ['bg-333', { 'background-color': '#333' }],
        ['bg-222', { 'background-color': '#222' }],
        ['tool-hover', { 'background-color': 'rgba(255,255,255,.2)' }],
        ['tool-selected', { 'background-color': '#2084fc' }],
        [/^fs-(.+)$/, ([, v]) => ({ 'font-size': `${v}px` })],
        [
          /^repeat-(.+)$/,
          ([, v]) => ({ display: 'grid', 'grid-template-columns': `repeat(${v},1fr)` })
        ],
        [/^flex-basis-(.+)$/, ([, v]) => ({ 'flex-basis': `${v}` })],
        // [/^bp-(.+)-(.+)$/, ([, x,y]) => ({ 'background-position': `${x}px ${y}px` })]
        ['space-nowrap', { 'white-space': 'nowrap' }],
      ],
      shortcuts: [
        {
          'f-center': 'flex flex-items-center flex-justify-center'
        }
      ]
    }),
    react()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/')
    }
  }
})
