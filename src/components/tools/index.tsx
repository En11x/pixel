import { Tools } from '@/types'
import { ToolItem } from './ToolItem'
import { useStore } from '@/store'

export const Tool = () => {
  const currentTool = useStore(s => s.tool.current)
  const setTool = useStore(s => s.setTool)

  return (
    <div className='bg-333 flex flex-wrap grid-content-start z-4'>
      <div className='h-50px f-center flex-basis-100%'>TOOLS</div>
      {Object.values(Tools).map(tool => (
        <ToolItem
          key={tool}
          kit={tool}
          selected={currentTool === tool}
          onClick={() => {
            setTool(tool)
          }}
        />
      ))}
    </div>
  )
}
