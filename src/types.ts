export interface FormHandles {
  getFieldValue: (fieldName: string) => void
  setFieldValue: (fieldName: string, value: any) => void
  resetField: (fieldName: string) => void
  focus: (fieldName: string) => void

  getData: () => void
  setData: (data: Record<string, any>) => void

  reset: () => void
}
