import { memo, useCallback, useEffect, useRef, useTransition } from 'react'
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
  const canvasData = useStore(s => s.data)
  const setCanvasData = useStore(s => s.setData)
  const delCanvasData = useStore(s => s.delData)
  const tool = useStore(s => s.settings.tool)
  const toolColor = useStore(s => s.settings.color)
  const size = useStore(s => s.settings.size)

  const drawPixel = useCallback((pos: Position, color: string) => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d') as CanvasRenderingContext2D

    context.fillStyle = color
    context.fillRect(pos.x, pos.y, gridWidth, gridWidth)
  },[gridWidth])

  const getPixelBg =  useCallback(({ x, y }: Position): string => {
    const mouldX = (x / gridWidth) % 2
    const mouldY = (y / gridWidth) % 2
    if ((mouldX === 0 && mouldY === 0) || (mouldX !== 0 && mouldY !== 0)) {
      return bgColor
    }
    return gridColor
  },[bgColor, gridColor, gridWidth])

  const paint = useCallback((event: MouseEvent) => {
    const x = event.offsetX
    const y = event.offsetY
    const origin = getOrigin({ x, y }, gridWidth)
    const key = genrateCanvasDataKey(origin)
    if (!canvasData.has(key)) {
      clearMark()
      drawPixel(origin, toolColor)
      setCanvasData(key, toolColor)
    }
  },[canvasData, drawPixel, gridWidth, setCanvasData, toolColor])

  const clear = useCallback(() => {
    console.log(canvasData.size,'?')
    if(!canvasData.size){
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
    console.log('clear')
    for (let x = left; x < right; x++) {
      for (let y = top; y < bottom; y++) {
        const origin = getOrigin({ x, y }, gridWidth)
        const key = genrateCanvasDataKey(origin)
        if (canvasData.has(key)) {
          const bgColor = getPixelBg(origin)
          drawPixel(origin, bgColor)
          delCanvasData(key)
        }
      }
    }
  },[canvasData,delCanvasData,drawPixel,getPixelBg,gridWidth,size])

  const drawMark = useCallback(({ x, y }: Position, color: string) => {
    const mark = markRef.current as HTMLCanvasElement
    const canvas = canvasRef.current
    const minX = canvas?.offsetLeft || 0
    const maxX = minX + width
    const minY = canvas?.offsetTop || 0
    const maxY = minY + height
    const eraserSize = tool === Tools.ERASER ? size : 1
    const markWidth = gridWidth * eraserSize
    const offset = Math.floor(eraserSize / 2) * gridWidth
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
  },[gridWidth, height, size, tool, width])

  const clearMark = () => {
    const mark = markRef.current as HTMLCanvasElement
    mark.width = 0
    mark.height = 0
  }

  const onMouseMove = useCallback(
    (event: MouseEvent) => {
      const x = event.offsetX
      const y = event.offsetY
      const origin = getOrigin({ x, y }, gridWidth)
      const originKey = genrateCanvasDataKey(origin)
      if (canvasData.has(originKey)) {
        return
      }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tool]
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

    // canvas?.addEventListener('mouseleave', onMouseLeave)
    canvas?.addEventListener('mousemove', onMouseMove)
    canvas?.addEventListener('mousedown', onMouseDown)
    canvas?.addEventListener('mouseup', onMouseUp)
    // canvas?.addEventListener('click', onClickCanvas)

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
