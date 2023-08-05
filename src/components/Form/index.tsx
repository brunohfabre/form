import { FormEventHandler, RefObject, useRef } from 'react'

import { z } from 'zod'

import { FormHandles } from '../../types'

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
        const formData = getData()

        if (props?.resolver) {
          const parsedData = props.resolver.parse(formData)

          handle(parsedData ?? ({} as T))

          return
        }

        handle(formData ?? ({} as T))
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.log(JSON.stringify(error, null, 2))
        }
      }
    }
  }

  function getFieldValue(fieldName: string) {
    if (!formRef.current) {
      return
    }

    const findField = Array.from(formRef.current?.childNodes)
      .filter(
        (item: any) =>
          'isFormField' in item.dataset && item.dataset.isFormField === 'true',
      )
      .find((field: any) => field.name === fieldName) as any

    return findField.value
  }

  function setFieldValue(fieldName: string, value: any) {
    if (!formRef.current) {
      return
    }

    const findField = Array.from(formRef.current?.childNodes)
      .filter(
        (item: any) =>
          'isFormField' in item.dataset && item.dataset.isFormField === 'true',
      )
      .find((item: any) => item.name === fieldName) as any

    if (findField) {
      findField.value = value
      findField.isDirty = true
    }
  }

  function clearField(fieldName: string) {
    if (!formRef.current) {
      return
    }

    const findField = Array.from(formRef.current?.childNodes)
      .filter(
        (item: any) =>
          'isFormField' in item.dataset && item.dataset.isFormField === 'true',
      )
      .find((field: any) => field.name === fieldName) as any

    if (findField) {
      findField.value = ''
    }
  }

  function focus(fieldName: string) {
    if (!formRef.current) {
      return
    }

    const findField = Array.from(formRef.current?.childNodes)
      .filter(
        (item: any) =>
          'isFormField' in item.dataset && item.dataset.isFormField === 'true',
      )
      .find((field: any) => field.name === fieldName) as any

    if (findField) {
      findField.focus()
    }
  }

  function getData(): T | void {
    if (!formRef.current) {
      return
    }

    const data = Array.from(formRef.current?.childNodes)
      .filter(
        (item: any) =>
          'isFormField' in item.dataset && item.dataset.isFormField === 'true',
      )
      .reduce(
        (acc: Record<string, any>, field: any) => ({
          ...acc,
          [field.name]: field.isDirty ? field.value : undefined,
        }),
        {},
      ) as T

    return data
  }

  function setData(data: Record<string, any>) {
    if (!formRef.current) {
      return
    }

    Array.from(formRef.current?.childNodes)
      .filter(
        (item: any) =>
          'isFormField' in item.dataset && item.dataset.isFormField === 'true',
      )
      .forEach((item: any) => {
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

    Array.from(formRef.current?.childNodes)
      .filter(
        (item: any) =>
          'isFormField' in item.dataset && item.dataset.isFormField === 'true',
      )
      .forEach((field: any) => {
        field.isDirty = false
        field.value = ''
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
