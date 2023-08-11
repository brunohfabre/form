import { ChangeEvent, ComponentProps, useRef } from 'react'

import { toPattern } from 'vanilla-masker'

interface MaskInputProps extends ComponentProps<'input'> {
  name: string
  mask: string
}

interface InputRef extends HTMLInputElement {
  isDirty: boolean
}

export function MaskInput(props: MaskInputProps) {
  const ref = useRef<InputRef>(null)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (ref.current) {
      ref.current.isDirty = true

      ref.current.value = toPattern(event.target.value, props.mask)
    }

    if (props.onChange) {
      props.onChange(event)
    }
  }

  return (
    <input
      ref={ref}
      type="text"
      data-is-form-field
      data-type="string"
      onChange={handleChange}
      {...props}
    />
  )
}
