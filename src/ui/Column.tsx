import type { ReactNode } from 'react'
import React from 'react'

export function Column({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-2">{children}</div>
}
