import { Maybe } from '@/types'
import { trim } from './chaos'

const HEX_REG = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i

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

export const hexTorRgba = (hex: string, opacity: number): Maybe<string> => {
  const result = HEX_REG.exec(hex)
  if (!result) {
    return null
  }
  const r = parseInt(result[1], 16)
  const g = parseInt(result[2], 16)
  const b = parseInt(result[3], 16)
  const a = opacity || 1

  return result ? `rgba(${r},${g},${b},${a})` : null
}

export const blurColor = (color: string, opacity: number): string => {
  const res = color.toLowerCase()
  const isHex = HEX_REG.test(res)

  if (isHex) {
    return hexTorRgba(res, opacity) as string
  }

  const parts = res.substring(res.indexOf('(')).split(',')

  return `rgba(${parts[0]},${parts[1]},${parts[2]},${opacity})`
}
