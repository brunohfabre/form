import { ComponentProps, ReactNode } from 'react'

interface FieldProps extends ComponentProps<'div'> {
  name: string
  children: ReactNode
}

export function Field({ name, ...props }: FieldProps) {
  return <div data-name={name} data-is-field {...props} />
}
