import { ChangeEvent, ComponentProps, useRef } from 'react'

interface NumberInputProps extends ComponentProps<'input'> {
  name: string
}

interface InputRef extends HTMLInputElement {
  isDirty: boolean
}

export function NumberInput(props: NumberInputProps) {
  const ref = useRef<InputRef>(null)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (ref.current) {
      ref.current.isDirty = true

      ref.current.value = event.target.value.replace(/[^\d]+/g, '')
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
      data-type="number"
      onChange={handleChange}
      {...props}
    />
  )
}
