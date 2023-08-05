import { z } from 'zod'

import { useForm } from './components/Form'
import { TextInput } from './components/Form/components/TextInput'

const testFormSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email().nonempty(),
  password: z.string().min(6).nonempty(),
})

type TestFormData = z.infer<typeof testFormSchema>

export function App() {
  const testForm = useForm<TestFormData>({
    resolver: testFormSchema,
  })

  function test(data: TestFormData) {
    console.log(data)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <form
        ref={testForm.formRef}
        onSubmit={testForm.handleSubmit(test)}
        className="flex flex-col w-80 gap-4"
      >
        <TextInput name="name" placeholder="Name" />
        <TextInput name="email" placeholder="Email" />
        <TextInput name="password" placeholder="Password" />

        <button type="submit" className="h-10 bg-emerald-200 px-4">
          submit
        </button>
      </form>

      <div className="flex gap-2">
        <button
          type="button"
          className="h-10 bg-blue-500 text-white px-4"
          onClick={() => console.log(testForm.getFieldValue('email'))}
        >
          get field value
        </button>

        <button
          type="button"
          className="h-10 bg-blue-500 text-white px-4"
          onClick={() =>
            testForm.setFieldValue('email', 'bruno.hfabre@gmail.com')
          }
        >
          set field value
        </button>

        <button
          type="button"
          className="h-10 bg-blue-500 text-white px-4"
          onClick={() => testForm.clearField('email')}
        >
          clear field
        </button>

        <button
          type="button"
          className="h-10 bg-blue-500 text-white px-4"
          onClick={() => testForm.focus('email')}
        >
          focus
        </button>

        <button
          type="button"
          className="h-10 bg-blue-500 text-white px-4"
          onClick={() => console.log(testForm.getData())}
        >
          get data
        </button>

        <button
          type="button"
          className="h-10 bg-blue-500 text-white px-4"
          onClick={() =>
            testForm.setData({ name: 'John Doe', password: 'abcd1234' })
          }
        >
          set data
        </button>

        <button
          type="button"
          className="h-10 bg-blue-500 text-white px-4"
          onClick={() => testForm.reset()}
        >
          reset
        </button>
      </div>
    </div>
  )
}
