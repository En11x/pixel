import { Tools } from '@/types'

export const Tool = () => {
  return (
    <div className='bg-333'>
      <div className='w-100% f-center'>TOOLS</div>
      {Object.values(Tools).map(tool => (
        <div>{tool}</div>
      ))}
    </div>
  )
}
