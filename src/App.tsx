import { useState } from 'react'

import { z } from 'zod'

import {
  useForm,
  Field,
  Label,
  Message,
  TextInput,
  MaskInput,
  NumberInput,
  SelectInput,
} from './components/Form'

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

  const [names, setNames] = useState<string[]>([])

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
          {names.map((item, index) => (
            <div key={item} style={{ display: 'flex' }}>
              <Field name={`names.${index}.name`}>
                <Label>Name</Label>
                <TextInput placeholder="Name" />
                <Message />
              </Field>

              <button
                type="button"
                onClick={() =>
                  setNames((prevState) =>
                    prevState.filter((_, itemIndex) => itemIndex !== index),
                  )
                }
              >
                X
              </button>
            </div>
          ))}
          <div>
            <button
              type="button"
              onClick={() =>
                setNames((prevState) => [...prevState, crypto.randomUUID()])
              }
            >
              add
            </button>
          </div>
        </div>
        <div>
          <Field name="name">
            <Label>Name</Label>
            <TextInput placeholder="Name" />
            <Message />
          </Field>

          <div>
            <button
              type="button"
              className="h-10 bg-blue-500 text-white px-4"
              onClick={() =>
                console.log(testForm.getFieldValue('this.is.first.name'))
              }
            >
              get field value
            </button>

            <button
              type="button"
              className="h-10 bg-blue-500 text-white px-4"
              onClick={() =>
                testForm.setFieldValue('this.is.first.name', 'John Doe')
              }
            >
              set field value
            </button>

            <button
              type="button"
              className="h-10 bg-blue-500 text-white px-4"
              onClick={() => testForm.resetField('this.is.first.name')}
            >
              reset field
            </button>

            <button
              type="button"
              className="h-10 bg-blue-500 text-white px-4"
              onClick={() => testForm.focus('this.is.first.name')}
            >
              focus
            </button>
          </div>
        </div>

        <div>
          <Field name="age">
            <Label>Age</Label>
            <NumberInput placeholder="Age" />
            <Message />
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
              onClick={() => testForm.resetField('age')}
            >
              reset field
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
            <Label>Cep</Label>
            <MaskInput placeholder="Cep" mask="99999-999" />
            <Message />
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
              onClick={() => testForm.resetField('cep')}
            >
              reset field
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
            <Label>State</Label>

            <SelectInput
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
            <Message />
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
              onClick={() => testForm.resetField('state')}
            >
              reset field
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
