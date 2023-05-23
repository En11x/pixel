import { useEffect, useRef } from 'react'
import { useStore } from '../store'

export const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const width = useStore((s) => s.config.width)
  const height = useStore((s) => s.config.height)
  const bgColor = useStore((s) => s.style.bgColor)
  const gridColor = useStore((s) => s.style.gridColor)
  const gridWidth = useStore((s) => s.style.gridWidth)

  //init canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }
    const context = canvas.getContext('2d')
    if (!context) {
      return
    }

    canvas.width = width
    canvas.height = height

    context.fillStyle = bgColor
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = gridColor
    const rows = Math.floor(canvas.height / gridWidth)
    const cols = Math.floor(canvas.width / gridWidth)

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        i % 2 === 0 &&
          context.fillRect(
            (j % 2 === 0 ? i - 1 : i) * gridWidth,
            j * gridWidth,
            gridWidth,
            gridWidth
          )
      }
    }
  }, [bgColor, gridColor, gridWidth, height, width])

  return <canvas ref={canvasRef}></canvas>
}
