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
      rules:[
        [
          'bg-333',{'background-color':'#333'}
        ]
      ],
      shortcuts:[
        {
          'f-center':'flex flex-items-center flex-justify-center'
        }
      ],
    }),
    react(),
  ],
  resolve:{
    alias:{
      "@": path.resolve(__dirname,'./src/')
    }
  }
})
