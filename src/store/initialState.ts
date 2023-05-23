export interface CanvasState {
  config: {
    width: number
    height: number
  }
  style: {
    bgColor: string,
    gridColor:string,
    gridWidth:number
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
    gridWidth:10
  },
}
