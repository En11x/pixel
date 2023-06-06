export type Position = {
  x: number
  y: number
}

export type Pixel = Position & {
  color: string
}

export enum Tools {
  PENCEL = 'PENCEL',
  ERASER = 'ERASER',
  BRUSH = 'BRUSH'
}
