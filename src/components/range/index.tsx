import { ChangeEventHandler, useState } from 'react'
import './index.css'

interface RangeProps {
  value: number
  onChange: (val: number) => void
  min?: number
  max?: number
}

export const Range = (props: RangeProps) => {
  const { value, onChange, min = 1, max = 24 } = props
  const [val, setVal] = useState<number | string>(value)

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    const val = Number(e.target.value)

    setVal(val)
    onChange(val)
  }

  return (
    <div>
      <input type='range' min={min} max={max} value={val} onChange={handleChange} />
    </div>
  )
}
