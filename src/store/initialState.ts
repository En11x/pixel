import { Tools, ToolsOptions } from '@/types'

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
    [Tools.PENCEL]: ToolsOptions[Tools.PENCEL]
    [Tools.ERASER]: ToolsOptions[Tools.ERASER]
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
    color: '#2196f3',
    size: 1,
    PENCEL: {
      rightClickEraser: true
    },
    ERASER: {
      strength: 1
    }
  },
  data: new Map()
}
