export enum Tools {
  PENCEL = 'PENCEL',
  ERASER = 'ERASER',
  BRUSH = 'BRUSH'
}

export interface ToolsOptions{
  PENCEL:{
    rightClickEraser:boolean
  }
  ERASER:{
    strength:number
  }
}
