import { FormEventHandler, RefObject, useRef } from 'react'

import { z } from 'zod'

import { FormHandles } from '../../types'

function getChildNodes(
  ref: any,
  add: (ref: RefObject<HTMLInputElement>) => void,
) {
  add(ref)

  if (ref.childNodes) {
    Array.from(ref.childNodes).forEach((item) => {
      getChildNodes(item, add)
    })
  }
}

function getMessages(ref: any) {
  const nodes: any[] = []

  getChildNodes(ref, (node) => nodes.push(node))

  return nodes.filter(
    (item) => item.dataset && 'isFieldMessage' in item.dataset,
  )
}

function getFields(ref: any) {
  const nodes: any[] = []

  getChildNodes(ref, (node) => nodes.push(node))

  return nodes.filter((item) => item.dataset && 'isFormField' in item.dataset)
}

function processValue(ref: any) {
  const { type } = ref.dataset

  if (type === 'string') {
    return ref.value
  }

  if (type === 'number') {
    return Number(ref.value)
  }

  return undefined
}

interface UseFormProps {
  resolver: z.ZodSchema
}

interface UseFormResponse<T> extends FormHandles {
  formRef: RefObject<HTMLFormElement>

  handleSubmit: (handle: (data: T) => void) => FormEventHandler<HTMLFormElement>
}

export function useForm<T>(props?: UseFormProps): UseFormResponse<T> {
  const formRef = useRef<HTMLFormElement>(null)

  function handleSubmit(handle: (data: T) => void) {
    return (event: any) => {
      event.preventDefault()

      try {
        getMessages(formRef.current).forEach((item) => {
          item.innerText = ''
        })

        const formData = getData()

        if (props?.resolver) {
          const parsedData = props.resolver.parse(formData)

          handle(parsedData ?? ({} as T))

          return
        }

        handle(formData ?? ({} as T))
      } catch (error) {
        if (error instanceof z.ZodError) {
          const errors: Record<string, string> = {}

          error.issues.forEach((issue) => {
            errors[issue.path[0]] = issue.message
          })

          getMessages(formRef.current).forEach((item) => {
            item.innerText = errors[item.dataset.name] ?? ''
          })
        }
      }
    }
  }

  function getFieldValue(fieldName: string) {
    if (!formRef.current) {
      return
    }

    const findField = getFields(formRef.current).find(
      (field: any) => field.name === fieldName,
    ) as any

    return findField.value
  }

  function setFieldValue(fieldName: string, value: any) {
    if (!formRef.current) {
      return
    }

    const findField = getFields(formRef.current).find(
      (item: any) => item.name === fieldName,
    ) as any

    if (findField) {
      findField.value = value
      findField.isDirty = true
    }
  }

  function clearField(fieldName: string) {
    if (!formRef.current) {
      return
    }

    const findField = getFields(formRef.current).find(
      (field: any) => field.name === fieldName,
    ) as any

    if (findField) {
      findField.value = ''
    }
  }

  function focus(fieldName: string) {
    if (!formRef.current) {
      return
    }

    const findField = getFields(formRef.current).find(
      (field: any) => field.name === fieldName,
    ) as any

    if (findField) {
      findField.focus()
    }
  }

  function getData(): T | void {
    if (!formRef.current) {
      return
    }

    const data = getFields(formRef.current).reduce(
      (acc: Record<string, any>, field: any) => ({
        ...acc,
        [field.name]: field.isDirty ? processValue(field) : undefined,
      }),
      {},
    ) as T

    return data
  }

  function setData(data: Record<string, any>) {
    if (!formRef.current) {
      return
    }

    getFields(formRef.current).forEach((item: any) => {
      if (item.name in data) {
        item.value = data[item.name]
        item.isDirty = true
      }
    })
  }

  function reset() {
    if (!formRef.current) {
      return
    }

    getFields(formRef.current).forEach((field: any) => {
      field.isDirty = false
      field.value = ''
    })

    getMessages(formRef.current).forEach((item) => {
      item.innerText = ''
    })
  }

  return {
    handleSubmit,
    getFieldValue,
    setFieldValue,
    clearField,
    focus,
    getData,
    setData,
    reset,
    formRef,
  }
}
