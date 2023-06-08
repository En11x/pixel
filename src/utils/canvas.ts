import { POS_NUMBER } from '@/constants'
import { Position } from '@/types'

export const getOrigin = (position: Position, width: number): Position => {
  const { x, y } = position

  return {
    x: x - (x % width),
    y: y - (y % width)
  }
}

export const genrateCanvasDataKey = ({ x, y }: Position): number => x * POS_NUMBER + y
export const restoreCanvasDataKey = (key:number): Position => ({x:Math.floor(key/POS_NUMBER),y:key%POS_NUMBER})
