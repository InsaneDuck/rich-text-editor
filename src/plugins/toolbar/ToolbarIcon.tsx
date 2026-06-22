import React from 'react'

type ToolbarIconProps = {
  svg: string
}

function formatSvg(svg: string) {
  return svg
    .replace(/\sclass="[^"]*"/, '')
    .replace(/\swidth="[^"]*"/, '')
    .replace(/\sheight="[^"]*"/, '')
    .replace('<svg', '<svg class="size-4" width="1em" height="1em"')
}

export function ToolbarIcon({ svg }: ToolbarIconProps) {
  return (
    <span className="inline-flex shrink-0" aria-hidden dangerouslySetInnerHTML={{ __html: formatSvg(svg) }} />
  )
}
