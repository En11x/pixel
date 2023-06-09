import { Checkbox } from '@/components/inputs/checkbox'
import { useStore } from '@/store'

export const Pencel = () => {
  const rightClickEraser = useStore(s => s.tool.PENCEL.rightClickEraser)
  const setRightClickEraser = useStore(s => s.setPencelRightClickEraser)

  return (
    <div className='f-center'>
      <Checkbox value={rightClickEraser} onChange={setRightClickEraser} />
      <span>RIGHT CLICK ERASER</span>
    </div>
  )
}
