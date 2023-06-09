import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useStore } from '@/store'
import { Position, Tools } from '@/types'
import { genrateCanvasDataKey, getOrigin, pxToNumber, restoreCanvasDataKey } from '@/utils'

export const Canvas = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const markRef = useRef<HTMLCanvasElement>(null)
  const width = useStore(s => s.config.width)
  const height = useStore(s => s.config.height)
  const bgColor = useStore(s => s.style.bgColor)
  const gridColor = useStore(s => s.style.gridColor)
  const gridWidth = useStore(s => s.style.gridWidth)
  const hoverColor = useStore(s => s.style.hoverColor)
  // const canvasData = useStore(s => s.data)
  // 卡顿 in zustand store
  // const setCanvasData = useStore(s => s.setData)
  // const delCanvasData = useStore(s => s.delData)
  const tool = useStore(s => s.settings.tool)
  const toolColor = useStore(s => s.settings.color)
  const size = useStore(s => s.settings.size)
  const [canvasData, setCanvasData] = useState<Map<number, string>>(new Map())

  const drawPixel = useCallback(
    (pos: Position, color: string, isBg = false) => {
      const canvas = canvasRef.current
      const context = canvas?.getContext('2d') as CanvasRenderingContext2D
      const width = isBg ? 1 : size
      context.fillStyle = color
      context.fillRect(pos.x, pos.y, gridWidth * width, gridWidth * width)
    },
    [gridWidth, size]
  )

  const getPixelBg = useCallback(
    ({ x, y }: Position): string => {
      const mouldX = (x / gridWidth) % 2
      const mouldY = (y / gridWidth) % 2
      if ((mouldX === 0 && mouldY === 0) || (mouldX !== 0 && mouldY !== 0)) {
        return bgColor
      }
      return gridColor
    },
    [bgColor, gridColor, gridWidth]
  )

  const paint = useCallback(
    (event: MouseEvent) => {
      const y = event.offsetY
      const x = event.offsetX
      const origin = getOrigin({ x, y }, gridWidth)
      const key = genrateCanvasDataKey(origin)
      if (!canvasData.has(key)) {
        clearMark()
        drawPixel(origin, toolColor)
        for (let i = origin.x; i <= origin.x + size * gridWidth; i += gridWidth) {
          for (let j = origin.y; j <= origin.y + size * gridWidth; j += gridWidth) {
            setCanvasData(s => s.set(genrateCanvasDataKey({ x: i, y: j }), toolColor))
          }
        }
      }
    },
    [canvasData, drawPixel, gridWidth, setCanvasData, toolColor, size]
  )

  const clear = useCallback(() => {
    if (!canvasData.size) {
      return
    }
    const mark = markRef.current
    const canvas = canvasRef.current
    const canvasLeft = canvas?.offsetLeft || 0
    const canvasTop = canvas?.offsetTop || 0
    const markWidth = size * gridWidth
    const markLeft = mark?.style.left || ''
    const markTop = mark?.style.top || ''
    const left = pxToNumber(markLeft) - canvasLeft
    const top = pxToNumber(markTop) - canvasTop
    const right = left + markWidth
    const bottom = top + markWidth

    for (const key of canvasData.keys()) {
      const origin = restoreCanvasDataKey(key)
      if (origin.x >= left && origin.x <= right && origin.y >= top && origin.y <= bottom) {
        const bgColor = getPixelBg(origin)
        drawPixel(origin, bgColor, true)
        setCanvasData(s => {
          s.delete(key)
          return s
        })
      }
    }
  }, [canvasData, size, gridWidth, getPixelBg, drawPixel])

  const drawMark = useCallback(
    ({ x, y }: Position, color: string) => {
      const mark = markRef.current as HTMLCanvasElement
      const canvas = canvasRef.current
      const minX = canvas?.offsetLeft || 0
      const maxX = minX + width
      const minY = canvas?.offsetTop || 0
      const maxY = minY + height
      const markWidth = gridWidth * size
      const offset = Math.floor(size / 2) * gridWidth
      const markLeft = x + minX - offset
      const markRight = markLeft + markWidth
      const markTop = y + minY - offset
      const markBottom = markTop + markWidth
      mark.style.left = `${
        markLeft < minX ? minX : markRight > maxX ? maxX - markWidth : markLeft
      }px`
      mark.style.top = `${markTop < minY ? minY : markBottom > maxY ? maxY - markWidth : markTop}px`
      mark.style.opacity = '0.7'
      mark.width = markWidth
      mark.height = markWidth
      const context = mark?.getContext('2d') as CanvasRenderingContext2D
      context.fillStyle = color
      context.fillRect(0, 0, markWidth, markWidth)
    },
    [gridWidth, height, size, width]
  )

  const clearMark = () => {
    const mark = markRef.current as HTMLCanvasElement
    mark.width = 0
    mark.height = 0
  }

  const onMouseMove = useCallback(
    (event: MouseEvent) => {
      const x = event.offsetX
      const y = event.offsetY
      const mark = markRef.current as HTMLCanvasElement
      const origin = getOrigin({ x, y }, gridWidth)
      const originKey = genrateCanvasDataKey(origin)
      mark.style.zIndex = canvasData.has(originKey) ? '0' : '2'
      drawMark(origin, hoverColor)
    },
    [canvasData, drawMark, gridWidth, hoverColor]
  )

  const onClickCanvas = useCallback(
    (event: MouseEvent) => {
      if (tool === Tools['PENCEL']) {
        return paint(event)
      }
      if (tool === Tools['ERASER']) {
        return clear()
      }
    },
    [clear, paint, tool]
  )

  const onMouseLeave = useCallback(() => {
    clearMark()
  }, [])

  const onMouseDown = useCallback(
    (event: MouseEvent) => {
      const canvas = canvasRef.current

      if (event.button === 0) {
        canvas?.addEventListener('mousemove', onClickCanvas)
      }
    },
    [onClickCanvas]
  )

  const onMouseUp = useCallback(
    (event: MouseEvent) => {
      const canvas = canvasRef.current
      if (event.button === 0) {
        canvas?.removeEventListener('mousemove', onClickCanvas)
      }
    },
    [onClickCanvas]
  )

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
    canvas?.addEventListener('mousedown', onMouseDown)
    canvas?.addEventListener('mouseup', onMouseUp)
    canvas?.addEventListener('click', onClickCanvas)

    return () => {
      canvas?.removeEventListener('mouseleave', onMouseLeave)
      canvas?.removeEventListener('mousemove', onMouseMove)
      canvas?.removeEventListener('click', onClickCanvas)
      canvas?.removeEventListener('mousedown', onMouseDown)
      canvas?.removeEventListener('mouseup', onMouseUp)
    }
  }, [onClickCanvas, onMouseDown, onMouseLeave, onMouseMove, onMouseUp])

  return (
    <div className='f-center flex-1 relative'>
      <canvas className='absolute z-2 pointer-events-none' ref={markRef}></canvas>
      <canvas className='absolute z-1' ref={canvasRef}></canvas>
    </div>
  )
})
