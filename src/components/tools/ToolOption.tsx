import { useStore } from '@/store'

export const ToolOption = () => {
  const currentTool = useStore(s => s.settings.tool)

  return (
    <div className='w-100% bg-222 h-30px flex items-center px-2 fs-12'>
      <div className='f-center'>{currentTool}:</div>
    </div>
  )
}
