import { ChangeEvent, ComponentProps, useRef } from 'react'

interface TextInputProps extends ComponentProps<'input'> {
  name: string
}

interface InputRef extends HTMLInputElement {
  isDirty: boolean
}

export function TextInput(props: TextInputProps) {
  const ref = useRef<InputRef>(null)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (ref.current) {
      ref.current.isDirty = true
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
      onChange={handleChange}
      {...props}
    />
  )
}
