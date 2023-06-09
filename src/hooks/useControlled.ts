import { UseState } from '@/types/state'
import { useCallback, useRef, useState } from 'react'

interface UseControlledArgs<T> {
  controlled?: T
  initial?: T
  onChange?(value: T): void
}

export const useControlled = <T>(args: UseControlledArgs<T>): UseState<T | undefined> => {
  const { controlled, initial, onChange } = args
  const { current: isControlled } = useRef(controlled !== undefined)
  const [valueState, setValue] = useState(initial)
  const value = isControlled ? controlled : valueState

  const setValueIfUncontrolled = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (nextValue: any) => {
      if (!isControlled) {
        setValue(nextValue)
      }
      onChange?.(nextValue)
    },
    [isControlled, onChange]
  )

  return [value, setValueIfUncontrolled]
}
