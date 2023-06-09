import { useStore } from '@/store'
import { Range } from '@/components/inputs'
import { ReactNode } from 'react'
import { Pencel } from './pencel'
import { Tools } from '@/types'

const options: Record<Tools, ReactNode> = {
  PENCEL: <Pencel />,
  [Tools.ERASER]: undefined,
  [Tools.BRUSH]: undefined
}

export const ToolOption = () => {
  const currentTool = useStore(s => s.tool.current)
  const size = useStore(s => s.tool.size)
  const setToolSize = useStore(s => s.setToolSize)

  return (
    <div className='w-100% bg-222 h-30px flex items-center px-2 fs-10'>
      <div className='f-center'>{currentTool}:</div>
      {options[currentTool]}
      <div className='f-center'>
        <label className='p2'>PIXEL SIZE({size})</label>
        <Range value={size} onChange={setToolSize} />
      </div>
    </div>
  )
}
