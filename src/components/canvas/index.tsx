import { useCallback, useEffect, useRef } from 'react'
import { useStore } from '@/store'
import { Position, Tools } from '@/types'
import { genrateCanvasDataKey, getOrigin } from '@/utils'

export const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const markRef = useRef<HTMLCanvasElement>(null)
  const width = useStore(s => s.config.width)
  const height = useStore(s => s.config.height)
  const bgColor = useStore(s => s.style.bgColor)
  const gridColor = useStore(s => s.style.gridColor)
  const gridWidth = useStore(s => s.style.gridWidth)
  const hoverColor = useStore(s => s.style.hoverColor)
  const canvasData = useStore(s => s.data)
  const setCanvasData = useStore(s => s.setData)
  const delCanvasData = useStore(s => s.delData)
  const tool = useStore(s => s.settings.tool)
  const toolColor = useStore(s => s.settings.color)
  const size = useStore(s => s.settings.size)

  const drawPixel = (pos: Position, color: string) => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d') as CanvasRenderingContext2D

    context.fillStyle = color
    context.fillRect(pos.x, pos.y, gridWidth, gridWidth)
  }

  const getPixelBg = ({ x, y }: Position): string => {
    const mouldX = (x / gridWidth) % 2
    const mouldY = (y / gridWidth) % 2
    if ((mouldX === 0 && mouldY === 0) || (mouldX !== 0 && mouldY !== 0)) {
      return bgColor
    }
    return gridColor
  }

  const paint = (event: MouseEvent) => {
    const x = event.offsetX
    const y = event.offsetY
    const origin = getOrigin({ x, y }, gridWidth)
    const key = genrateCanvasDataKey(origin)
    if (!canvasData.has(key)) {
      clearMark()
      drawPixel(origin, toolColor)
      setCanvasData(key, toolColor)
    }
  }

  const clear = (event: MouseEvent) => {
    const x = event.offsetX
    const y = event.offsetY
    const origin = getOrigin({ x, y }, gridWidth)
    const key = genrateCanvasDataKey(origin)
    if (canvasData.has(key)) {
      const bgColor = getPixelBg(origin)
      drawPixel(origin, bgColor)
      delCanvasData(key)
    }
  }

  const drawMark = ({ x, y }: Position, color: string) => {
    const mark = markRef.current
    const canvas = canvasRef.current
    const minX = canvas!.offsetLeft
    const maxX = minX + width
    const minY = canvas!.offsetTop
    const maxY = minY + height
    const eraserSize = tool === Tools.ERASER ? size : 1
    const markWidth = gridWidth * eraserSize
    const offset = Math.floor(eraserSize / 2) * gridWidth
    const markLeft = x + minX - offset
    const markRight = markLeft + markWidth
    const markTop = y + minY - offset
    const markBottom = markTop + markWidth
    console.log(markLeft, markTop)
    mark!.style.left = `${
      markLeft < minX ? minX : markRight > maxX ? maxX - markWidth : markLeft
    }px`
    mark!.style.top = `${markTop < minY ? minY : markBottom > maxY ? maxY - markWidth : markTop}px`
    mark!.style.opacity = '0.7'
    mark!.width = markWidth
    mark!.height = markWidth
    const context = mark?.getContext('2d') as CanvasRenderingContext2D
    context.fillStyle = color
    context.fillRect(0, 0, markWidth, markWidth)
  }

  const clearMark = () => {
    const mark = markRef.current
    mark!.width = 0
    mark!.height = 0
  }

  const onMouseMove = (event: MouseEvent) => {
    const x = event.offsetX
    const y = event.offsetY
    const origin = getOrigin({ x, y }, gridWidth)
    console.log(x, y, origin)
    const originKey = genrateCanvasDataKey(origin)
    if (canvasData.has(originKey)) {
      return
    }
    drawMark(origin, hoverColor)
  }

  const onClickCanvas = useCallback(
    (event: MouseEvent) => {
      console.log(1)
      if (tool === Tools['PENCEL']) {
        return paint(event)
      }
      if (tool === Tools['ERASER']) {
        return clear(event)
      }
    },
    [tool]
  )

  const onMouseLeave = () => {
    clearMark()
  }

  const onMouseDown = (event: MouseEvent) => {
    const canvas = canvasRef.current

    if (event.button === 0) {
      canvas?.addEventListener('mousemove', onClickCanvas)
    }
  }

  const onMouseUp = (event: MouseEvent) => {
    const canvas = canvasRef.current
    if (event.button === 0) {
      console.log('up', '?')
      canvas!.removeEventListener('mousemove', onClickCanvas)
    }
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

    canvas?.addEventListener('mouseleave', onMouseLeave)
    canvas?.addEventListener('mousemove', onMouseMove)
    canvas?.addEventListener('click', onClickCanvas)
    canvas?.addEventListener('mousedown', onMouseDown)
    canvas?.addEventListener('mouseup', onMouseUp)

    return () => {
      canvas?.removeEventListener('mouseleave', onMouseLeave)
      canvas?.removeEventListener('mousemove', onMouseMove)
      canvas?.removeEventListener('click', onClickCanvas)
      canvas?.removeEventListener('mousedown', onMouseDown)
      canvas?.removeEventListener('mouseup', onMouseUp)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tool, size])

  return (
    <div className='f-center flex-1 relative'>
      <canvas className='absolute z-2 pointer-events-none' ref={markRef}></canvas>
      <canvas className='absolute z-1' ref={canvasRef}></canvas>
    </div>
  )
}
