import { useControlled } from '@/hooks'

interface CheckboxProps {
  value: boolean
  onChange: (val: boolean) => void
}

export const Checkbox = (props: CheckboxProps) => {
  const { value: valueProp, onChange: onChangeProp } = props
  const [value, onChange] = useControlled<boolean>({
    controlled: valueProp,
    onChange: onChangeProp
  })

  return (
    <div>
      <input
        type='checkbox'
        checked={value}
        onChange={e => {
          onChange(e.target.checked)
        }}
      />
    </div>
  )
}
