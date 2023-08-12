import { z } from 'zod'

import { useForm } from './components/Form'
import { Field } from './components/Form/components/Field'
import { Label } from './components/Form/components/Label'
import { MaskInput } from './components/Form/components/MaskInput'
import { Message } from './components/Form/components/Message'
import { NumberInput } from './components/Form/components/NumberInput'
import { Select } from './components/Form/components/Select'
import { TextInput } from './components/Form/components/TextInput'

const testFormSchema = z.object({
  name: z.string().nonempty(),
  age: z.number(),
  cep: z.string().nonempty(),
  state: z.string().nonempty(),
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
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <form
        ref={testForm.formRef}
        onSubmit={testForm.handleSubmit(test)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div>
          <Field name="name">
            <Label name="name">Name</Label>
            <TextInput name="name" placeholder="Name" />
            <Message name="name" />
          </Field>

          <div>
            <button
              type="button"
              className="h-10 bg-blue-500 text-white px-4"
              onClick={() => console.log(testForm.getFieldValue('name'))}
            >
              get field value
            </button>

            <button
              type="button"
              className="h-10 bg-blue-500 text-white px-4"
              onClick={() => testForm.setFieldValue('name', 'John Doe')}
            >
              set field value
            </button>

            <button
              type="button"
              className="h-10 bg-blue-500 text-white px-4"
              onClick={() => testForm.clearField('name')}
            >
              clear field
            </button>

            <button
              type="button"
              className="h-10 bg-blue-500 text-white px-4"
              onClick={() => testForm.focus('name')}
            >
              focus
            </button>
          </div>
        </div>

        <div>
          <Field name="age">
            <Label name="age">Age</Label>
            <NumberInput name="age" placeholder="Age" />
            <Message name="age" />
          </Field>
          <div>
            <button
              type="button"
              className="h-10 bg-blue-500 text-white px-4"
              onClick={() => console.log(testForm.getFieldValue('age'))}
            >
              get field value
            </button>

            <button
              type="button"
              className="h-10 bg-blue-500 text-white px-4"
              onClick={() => testForm.setFieldValue('age', 30)}
            >
              set field value
            </button>

            <button
              type="button"
              className="h-10 bg-blue-500 text-white px-4"
              onClick={() => testForm.clearField('age')}
            >
              clear field
            </button>

            <button
              type="button"
              className="h-10 bg-blue-500 text-white px-4"
              onClick={() => testForm.focus('age')}
            >
              focus
            </button>
          </div>
        </div>

        <div>
          <Field name="cep">
            <Label name="cep">Cep</Label>
            <MaskInput name="cep" placeholder="Cep" mask="99999-999" />
            <Message name="cep" />
          </Field>
          <div>
            <button
              type="button"
              className="h-10 bg-blue-500 text-white px-4"
              onClick={() => console.log(testForm.getFieldValue('cep'))}
            >
              get field value
            </button>

            <button
              type="button"
              className="h-10 bg-blue-500 text-white px-4"
              onClick={() => testForm.setFieldValue('cep', 13101676)}
            >
              set field value
            </button>

            <button
              type="button"
              className="h-10 bg-blue-500 text-white px-4"
              onClick={() => testForm.clearField('cep')}
            >
              clear field
            </button>

            <button
              type="button"
              className="h-10 bg-blue-500 text-white px-4"
              onClick={() => testForm.focus('cep')}
            >
              focus
            </button>
          </div>
        </div>

        <div>
          <Field name="state">
            <Label name="state">State</Label>

            <Select
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
            <Message name="state" />
          </Field>
          <div>
            <button
              type="button"
              className="h-10 bg-blue-500 text-white px-4"
              onClick={() => console.log(testForm.getFieldValue('state'))}
            >
              get field value
            </button>

            <button
              type="button"
              className="h-10 bg-blue-500 text-white px-4"
              onClick={() => testForm.setFieldValue('state', 'value-2')}
            >
              set field value
            </button>

            <button
              type="button"
              className="h-10 bg-blue-500 text-white px-4"
              onClick={() => testForm.clearField('state')}
            >
              clear field
            </button>

            <button
              type="button"
              className="h-10 bg-blue-500 text-white px-4"
              onClick={() => testForm.focus('state')}
            >
              focus
            </button>
          </div>
        </div>
        <button type="submit" className="h-10 bg-emerald-200 px-4">
          submit
        </button>
      </form>

      <div className="flex gap-2">
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
            testForm.setData({
              name: 'John Doe 2',
              age: 100,
              cep: '13101676',
              state: 'value-3',
            })
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
