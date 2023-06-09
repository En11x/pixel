import { Checkbox } from '@/components/inputs/checkbox'
import { useStore } from '@/store'

export const Pencel = () => {
  const rightClickEraser = useStore(s => s.tool.PENCEL.rightClickEraser)
  const setRightClickEraser = useStore(s => s.setPencelRightClickEraser)

  return (
    <>
      <Checkbox
        value={rightClickEraser}
        onChange={setRightClickEraser}
        label='RIGHT CLICK ERASER'
      />
    </>
  )
}
