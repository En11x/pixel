import { useStore } from '@/store'

export const Pencel = () => {
  const pencel = useStore(s => s.tool.PENCEL)

  return (
    <div className='f-center'>
      <span className='p2'>RIGHT CLICK ERASER</span>
      <span>{pencel.rightClickEraser}</span>
    </div>
  )
}
