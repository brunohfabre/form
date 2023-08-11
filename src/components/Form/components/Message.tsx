import { ComponentProps } from 'react'

interface MessageProps extends ComponentProps<'span'> {
  name: string
}

export function Message({ name, ...props }: MessageProps) {
  return <span data-name={name} data-is-field-message {...props} />
}
