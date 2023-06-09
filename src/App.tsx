import { Canvas } from '@/components/canvas'
import { Layout } from '@/components/layout'
import { Navbar } from '@/components/navbar'
import { Navigation } from '@/components/navigation'
import { Tool } from '@/components/tools'
import { ToolOption } from './components/tools/options/index'

function App() {
  return (
    <div className='min-h-screen bg-black text-white flex flex-col'>
      <Navbar />
      <Layout>
        <Tool />
        <div className='flex flex-col'>
          <ToolOption />
          <Canvas />
        </div>
        <Navigation />
      </Layout>
    </div>
  )
}

export default App
