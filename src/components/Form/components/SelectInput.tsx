import { ChangeEvent, ComponentProps, useRef } from 'react'

type Option = {
  value: string | number
  label: string
}

interface SelectInputProps extends ComponentProps<'input'> {
  name: string
  options: Option[]
}

interface InputRef extends HTMLInputElement {
  isDirty: boolean
}

export function SelectInput(props: SelectInputProps) {
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
