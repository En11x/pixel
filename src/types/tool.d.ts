enum Tools {
  PENCEL = 'PENCEL',
  ERASER = 'ERASER',
  BRUSH = 'BRUSH'
}

interface ToolsOptions {
  PENCEL: {
    rightClickEraser: boolean
  }
  ERASER: {
    strength: number
  }
}
