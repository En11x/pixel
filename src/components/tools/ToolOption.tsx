import { useStore } from '@/store'
import { Range } from '../range'

export const ToolOption = () => {
  const currentTool = useStore(s => s.settings.tool)
  const size = useStore(s => s.settings.size)
  const setSize = useStore(s => s.setSize)

  return (
    <div className='w-100% bg-222 h-30px flex items-center px-2 fs-12'>
      <div className='f-center'>{currentTool}:</div>
      <div className='f-center'>
        <label className='p2'>PIXEL SIZE({size})</label>
        <Range value={size} onChange={setSize} />
      </div>
    </div>
  )
}
