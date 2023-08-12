import { ChangeEvent, useRef, useEffect } from 'react'

interface TextInputProps {
  name: string
  placeholder?: string
  onChange?: (value: string) => void
}

interface InputRef extends HTMLInputElement {
  isDirty: boolean

  getFieldValue: () => any
  setFieldValue: (value: string) => void
  resetField: () => void
}

export function TextInput({ name, placeholder, onChange }: TextInputProps) {
  const ref = useRef<InputRef>(null)

  function getFieldValue() {
    if (!ref.current) {
      return
    }

    return ref.current.value
  }

  function setFieldValue(value: string) {
    if (!ref.current) {
      return
    }

    ref.current.isDirty = true
    ref.current.value = value
  }

  function resetField() {
    if (!ref.current) {
      return
    }

    ref.current.isDirty = false
    ref.current.value = ''
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.getFieldValue = getFieldValue
      ref.current.setFieldValue = setFieldValue
      ref.current.resetField = resetField
    }
  }, [])

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value

    if (ref.current) {
      ref.current.isDirty = true
    }

    if (onChange) {
      onChange(value)
    }
  }

  return (
    <input
      ref={ref}
      name={name}
      placeholder={placeholder}
      onChange={handleChange}
      type="text"
      data-is-form-field
    />
  )
}
