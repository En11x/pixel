import { Checkbox } from '@/components/inputs/checkbox'
import { useStore } from '@/store'

export const Pencel = () => {
  const pencel = useStore(s => s.tool.PENCEL)

  return (
    <div className='f-center'>
      <span className='p2'>RIGHT CLICK ERASER</span>
      <Checkbox value={true} onChange={()=>{
        console.log(1)
      }}  />
    </div>
  )
}
