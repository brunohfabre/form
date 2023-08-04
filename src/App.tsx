import { useRef } from 'react'

export function App() {
  const formRef = useRef(null)

  function handleSubmit(event: any) {
    event.preventDefault()

    console.log(
      Array.from(event.target.childNodes)
        .filter((item) => !!item.name)
        .reduce((acc, item) => ({ ...acc, [item.name]: item.value }), {}),
    )
  }

  function reset() {
    Array.from(formRef.current.childNodes)
      .filter((item) => !!item.name)
      .forEach((item) => {
        item.value = ''
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
        <input
          name="name"
          type="text"
          placeholder="Name"
          className="h-10 bg-red-200 px-3"
        />
        <input
          name="email"
          type="text"
          placeholder="Email"
          className="h-10 bg-red-200 px-3"
        />
        <input
          name="password"
          type="text"
          placeholder="Password"
          className="h-10 bg-red-200 px-3"
        />

        <button type="submit" className="h-10 bg-emerald-200 px-4">
          submit
        </button>
      </form>
      <div className="flex gap-2">
        <button
          type="button"
          className="h-10 bg-red-500 text-white px-4"
          onClick={focus}
        >
          focus
        </button>
        <button
          type="button"
          className="h-10 bg-red-500 text-white px-4"
          onClick={setValue}
        >
          set value
        </button>
        <button
          type="button"
          className="h-10 bg-red-500 text-white px-4"
          onClick={clearField}
        >
          clear field
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
