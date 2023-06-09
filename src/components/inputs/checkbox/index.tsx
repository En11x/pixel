interface CheckboxProps {
  value: boolean
  onChange: (val: boolean) => void
}

export const Checkbox = () => {
  return (
    <div>
      <input type='checkbox' />
    </div>
  )
}
