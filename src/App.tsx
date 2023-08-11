import { z } from 'zod'

import { useForm } from './components/Form'
import { Field } from './components/Form/components/Field'
import { Label } from './components/Form/components/Label'
import { MaskInput } from './components/Form/components/MaskInput'
import { Message } from './components/Form/components/Message'
import { NumberInput } from './components/Form/components/NumberInput'
import { SelectInput } from './components/Form/components/SelectInput'
import { TextInput } from './components/Form/components/TextInput'

const testFormSchema = z.object({
  name: z.string().nonempty(),
  age: z.number(),
  cep: z.string().nonempty(),
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
        <Field name="name">
          <Label name="name">Name</Label>
          <TextInput name="name" placeholder="Name" />
          <Message name="name" />
        </Field>

        <Field name="age">
          <Label name="age">Age</Label>
          <NumberInput name="age" placeholder="Age" />
          <Message name="age" />
        </Field>

        <Field name="cep">
          <Label name="cep">Cep</Label>
          <MaskInput name="cep" placeholder="Cep" mask="99999-999" />
          <Message name="cep" />
        </Field>

        <Field name="state">
          <Label name="state">State</Label>
          <SelectInput
            name="state"
            placeholder="state"
            options={[
              {
                value: 'value-1',
                label: 'Option 1',
              },
              {
                value: 'value-2',
                label: 'Option 2',
              },
              {
                value: 'value-3',
                label: 'Option 3',
              },
            ]}
          />
          <Message name="State" />
        </Field>

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
