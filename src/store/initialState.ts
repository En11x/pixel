import { Tools } from '@/types/index'

export interface CanvasState {
  config: {
    width: number
    height: number
  }
  style: {
    bgColor: string
    gridColor: string
    gridWidth: number
    hoverColor: string
  }
  tool: {
    current: Tools
    color: string
    size: number
  }
  data: Map<number, string>
}

export const initialState: CanvasState = {
  config: {
    width: 1050,
    height: 1050
  },
  style: {
    bgColor: 'white',
    gridColor: '#D9D9D9',
    gridWidth: 10,
    hoverColor: '#B2B2B2'
  },
  tool: {
    current: Tools['PENCEL'],
    color: '#000000',
    size: 1
  },
  data: new Map()
}
