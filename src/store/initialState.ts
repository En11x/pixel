import { Tools } from "@/types"

export interface CanvasState {
  config: {
    width: number
    height: number
  }
  style: {
    bgColor: string,
    gridColor:string,
    gridWidth:number,
    hoverColor:string
  },
  tool:{
    selected:Tools
  }
}

export const initialState: CanvasState = {
  config: {
    width: 1050,
    height: 1050,
  },
  style: {
    bgColor: 'white',
    gridColor:'#D9D9D9',
    gridWidth:10,
    hoverColor:'#B2B2B2'
  },
  tool:{
    selected:Tools.PENCEL
  }
}
