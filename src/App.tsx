import { ComponentProps, useRef } from 'react'

interface InputProps extends ComponentProps<'input'> {
  name: string
}

function Input({ name, ...props }: InputProps) {
  const ref = useRef()

  return (
    <input
      ref={ref}
      name={name}
      className="h-10 bg-red-200 px-3"
      onChange={() => {
        if (ref.current) {
          ref.current.isDirty = true
        }
      }}
      {...props}
    />
  )
}

export function App() {
  const testInputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef(null)

  function handleSubmit(event: any) {
    event.preventDefault()

    const data = Array.from(event.target.childNodes)
      .filter((item) => !!item.name)
      .reduce(
        (acc, item) => ({
          ...acc,
          [item.name]: item.isDirty ? item.value : undefined,
        }),
        {},
      )

    console.log(data)
  }

  function reset() {
    Array.from(formRef.current.childNodes)
      .filter((item) => !!item.name)
      .forEach((item) => {
        item.value = ''
        item.isDirty = false
      })
  }

  function setValue() {
    const fieldName = 'email'
    const value = 'vrau'

    const field = Array.from(formRef.current.childNodes).find(
      (item) => item.name === fieldName,
    )

    field.value = value
  }

  function clearField() {
    const fieldName = 'password'

    const field = Array.from(formRef.current.childNodes).find(
      (item) => item.name === fieldName,
    )

    field.value = ''
  }

  function focus() {
    const fieldName = 'email'

    const field = Array.from(formRef.current.childNodes).find(
      (item) => item.name === fieldName,
    )

    field.focus()
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col w-80 gap-4"
      >
        <Input name="name" placeholder="Name" />
        <Input name="email" placeholder="Email" />
        <Input name="password" placeholder="Password" />

        <button type="submit" className="h-10 bg-emerald-200 px-4">
          submit
        </button>
      </form>

      <div className="flex gap-2">
        <button
          type="button"
          className="h-10 bg-red-500 text-white px-4"
          onClick={() => console.log('get-field-value')}
        >
          get field value
        </button>

        <button
          type="button"
          className="h-10 bg-red-500 text-white px-4"
          onClick={() => console.log('set-field-value')}
        >
          set field value
        </button>

        <button
          type="button"
          className="h-10 bg-red-500 text-white px-4"
          onClick={() => console.log('clear-field')}
        >
          clear field
        </button>

        <button
          type="button"
          className="h-10 bg-red-500 text-white px-4"
          onClick={() => console.log('focus-field')}
        >
          focus field
        </button>

        <button
          type="button"
          className="h-10 bg-red-500 text-white px-4"
          onClick={() => console.log('get-data')}
        >
          get data
        </button>

        <button
          type="button"
          className="h-10 bg-red-500 text-white px-4"
          onClick={() => console.log('set-data')}
        >
          set data
        </button>

        <button
          type="button"
          className="h-10 bg-red-500 text-white px-4"
          onClick={reset}
        >
          reset
        </button>
      </div>
    </div>
  )
}
