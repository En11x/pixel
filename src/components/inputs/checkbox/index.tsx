import { useControlled } from '@/hooks'
import { ReactNode } from 'react'

interface CheckboxProps {
  value: boolean
  onChange: (val: boolean) => void
  label?: ReactNode
}

export const Checkbox = (props: CheckboxProps) => {
  const { value: valueProp, onChange: onChangeProp, label } = props
  const [value, onChange] = useControlled<boolean>({
    controlled: valueProp,
    onChange: onChangeProp
  })

  return (
    <div className='f-center'>
      <input
        type='checkbox'
        checked={value}
        onChange={e => {
          onChange(e.target.checked)
        }}
      />
      {label}
    </div>
  )
}
