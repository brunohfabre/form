export interface FormHandles {
  getFieldValue: (fieldName: string) => void
  setFieldValue: (fieldName: string, value: any) => void
  clearField: (fieldName: string) => void
  focus: (fieldName: string) => void

  getData: () => void
  setData: (data: Record<string, any>) => void

  reset: () => void
}
