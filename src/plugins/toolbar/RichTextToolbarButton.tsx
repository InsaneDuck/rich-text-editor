import type { ComponentProps } from 'react'
import React from 'react'

type RichTextToolbarButtonProps = {
  active: boolean
} & ComponentProps<'button'>
export function RichTextToolbarButton({ active, className, ...rest }: RichTextToolbarButtonProps) {
  return (
    <button
      className={`antialiased p-2 rounded-sm flex justify-center items-center ${
        active
          ? 'bg-blue-600 text-white'
          : 'bg-gray-200 text-black dark:bg-neutral-800 dark:text-white'
      }${className ? ` ${className}` : ''}`}
      {...rest}
    />
  )
}
