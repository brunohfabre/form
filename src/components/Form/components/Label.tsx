import { ComponentProps, ReactNode } from 'react'

export interface LabelProps extends ComponentProps<'label'> {
  name: string
  children: ReactNode
}

export function Label({ name, ...props }: LabelProps) {
  return <label data-name={name} htmlFor={name} {...props} />
}
