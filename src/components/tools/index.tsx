import { Tools } from '@/types'
import { ToolItem } from './ToolItem'

export const Tool = () => {
  return (
    <div className='bg-333 flex flex-wrap grid-content-start'>
      <div className='h-50px f-center flex-basis-100%'>TOOLS</div>
      {Object.values(Tools).map(tool => (
        <ToolItem key={tool} kit={tool} />
      ))}
    </div>
  )
}
