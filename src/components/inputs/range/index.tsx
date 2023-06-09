import { ReactNode } from 'react'
import './index.css'
import { useControlled } from '@/hooks'

interface RangeProps {
  value: number
  onChange: (val: number) => void
  min?: number
  max?: number
  label?: ReactNode
}

export const Range = (props: RangeProps) => {
  const { value: valueProp, onChange: onChangeProp, min = 1, max = 24, label } = props
  const [value, onChange] = useControlled({
    controlled: valueProp,
    onChange: onChangeProp
  })

  return (
    <div className='f-center space-nowrap'>
      {typeof label === 'string' ? <label className='p2'>{label}</label> : label}
      <input
        type='range'
        min={min}
        max={max}
        value={value}
        onChange={e => {
          const nextValue = Number(e.target.value)
          onChange(nextValue)
        }}
      />
    </div>
  )
}
