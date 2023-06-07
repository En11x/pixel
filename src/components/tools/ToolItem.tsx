import TOOLS_PNG from '@/assets/tools.png'
import { Tools } from '@/types'
import { ReactNode } from 'react'

const Position = ({ x, y }: { x: number; y: number }) => {
  return (
    <div
      className='w-32px h-32px'
      style={{
        backgroundImage: `url(${TOOLS_PNG})`,
        backgroundPosition: `${x}px ${y}px`
      }}
    ></div>
  )
}

const TOOLS: Record<Tools, ReactNode> = {
  [Tools.PENCEL]: <Position x={-1} y={-1} />,
  [Tools.ERASER]: <Position x={-34} y={-1} />,
  [Tools.BRUSH]: <Position x={-1} y={-34} />
}

interface ToolItemProps {
  kit: Tools
  selected: boolean
  onClick: () => void
}

export const ToolItem = (props: ToolItemProps) => {
  const { kit, selected, onClick } = props

  return (
    <div
      className={`w-50% h-48px f-center cursor-pointer ${
        selected ? 'tool-selected' : 'hover:tool-hover'
      }`}
      onClick={onClick}
    >
      {TOOLS[kit]}
    </div>
  )
}
