import type { ComponentProps } from 'react'
import React from 'react'

type RichTextToolbarButtonProps = {
  active: boolean
} & ComponentProps<'button'>
export function RichTextToolbarButton({ active, ...rest }: RichTextToolbarButtonProps) {
  return (
    <button
      className={`${active && 'bg-blue-600 text-white'} antialiased dark:text-white bg-gray-200 dark:bg-neutral-800 p-2 rounded-sm flex justify-center items-center`}
      {...rest}
    />
  )
}
