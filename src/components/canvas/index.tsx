import { useEffect, useRef } from 'react'
import { useStore } from '@/store'
import { Pixel, Position } from '@/types'
import { genrateCanvasDataKey, getOrigin } from '@/utils'

export const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const width = useStore(s => s.config.width)
  const height = useStore(s => s.config.height)
  const bgColor = useStore(s => s.style.bgColor)
  const gridColor = useStore(s => s.style.gridColor)
  const gridWidth = useStore(s => s.style.gridWidth)
  const hoverColor = useStore(s => s.style.hoverColor)
  const pixel = useRef<Pixel | null>(null)
  const canvasData = useStore(s => s.data)
  const setCanvasData = useStore(s => s.setData)
  const toolColor = useStore(s => s.settings.color)

  const getPosition = (e: MouseEvent): Position => {
    const canvas = canvasRef.current as HTMLCanvasElement

    return {
      x: e.pageX - canvas.offsetLeft,
      y: e.pageY - canvas.offsetTop
    }
  }

  const drawPixel = (pos: Position, color: string) => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d') as CanvasRenderingContext2D

    context.fillStyle = color
    context.fillRect(pos.x, pos.y, gridWidth, gridWidth)
  }

  const onMouseMove = (event: MouseEvent) => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d') as CanvasRenderingContext2D
    const { x, y } = getPosition(event)
    const origin = getOrigin({ x, y }, gridWidth)
    const data = context.getImageData(x, y, 1, 1).data
    const rgba = `rgba(${data[0]},${data[1]},${data[2]},${data[3]})`

    const currentPixel = { x: origin.x, y: origin.y, color: rgba }

    if (!pixel.current) {
      pixel.current = currentPixel
    }

    const { x: currentX, y: currentY, color: currentColor } = pixel.current

    const originKey = genrateCanvasDataKey(origin)
    if (canvasData.has(originKey)) {
      return
    }

    if (!(origin.x === currentX && origin.y === currentY)) {
      drawPixel({ x: currentX, y: currentY }, currentColor)
      pixel.current = currentPixel
    }
    drawPixel(origin, hoverColor)
  }

  const paint = (event: MouseEvent) => {
    event.preventDefault()

    const pointerPos = getPosition(event)
    const origin = getOrigin(pointerPos, gridWidth)
    const key = genrateCanvasDataKey(origin)
    if (!canvasData.has(key)) {
      drawPixel(origin, toolColor)
      setCanvasData(key, toolColor)
      if (!pixel.current) {
        return
      }
      const { x: currentX, y: currentY } = pixel.current
      if (origin.x === currentX && origin.y === currentY) {
        pixel.current!.color = toolColor
      }
    }
  }

  const onMouseLeave = () => {
    if (!pixel.current) {
      return
    }
    const { x: currentX, y: currentY, color: currentColor } = pixel.current
    drawPixel({ x: currentX, y: currentY }, currentColor)
    pixel.current = null
  }

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

  useEffect(() => {
    const canvas = canvasRef.current

    canvas?.addEventListener('mousemove', onMouseMove)
    canvas?.addEventListener('mouseleave', onMouseLeave)

    canvas?.addEventListener('click', paint)

    return () => {
      canvas?.removeEventListener('mousemove', onMouseMove)
      canvas?.removeEventListener('mouseleave', onMouseLeave)

      canvas?.removeEventListener('click', paint)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='f-center flex-1'>
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}
