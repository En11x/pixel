import { POS_NUMBER } from '@/constants'
import { Position } from '@/types'

export const getOrigin = (position: Position, width: number): Position => {
  const { x, y } = position

  return {
    x: x - (x % width),
    y: y - (y % width)
  }
}

export const trim = (str: string) => {
  return str.replace(/^\s+|\s+$/gm, '')
}

export const rgbaToHex = (rgba: string) => {
  const parts = rgba.substring(rgba.indexOf('(')).split(','),
    r = parseInt(trim(parts[0].substring(1)), 10),
    g = parseInt(trim(parts[1]), 10),
    b = parseInt(trim(parts[2]), 10),
    a = parseFloat(trim(parts[3].substring(0, parts[3].length - 1))).toFixed(2)

  return (
    '#' +
    r.toString(16) +
    g.toString(16) +
    b.toString(16) +
    ((a as unknown as number) * 255).toString(16).substring(0, 2)
  )
}

export const genrateCanvasDataKey = ({ x, y }: Position): number => x * POS_NUMBER + y
