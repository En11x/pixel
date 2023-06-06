import { Canvas } from '@/components/canvas'
import { CanvasContainer } from '@/components/canvas/Container'
import { Layout } from '@/components/layout'
import { Navbar } from '@/components/navbar'
import { Navigation } from '@/components/navigation'
import { Tools } from '@/components/tools'

function App() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <Layout>
        <Tools />
        <CanvasContainer>
          <Canvas />
        </CanvasContainer>
        <Navigation />
      </Layout>
    </div>
  )
}

export default App
