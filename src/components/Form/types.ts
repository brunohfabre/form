export type InputRefBase = {
  isDirty: boolean

  getFieldValue: () => any
  setFieldValue: (value: any) => void
  resetField: () => void
}
