import type { JSX } from 'react'

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { TreeView } from '@lexical/react/LexicalTreeView'
import React from 'react'

export function TreeViewPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext()
  return (
    <div className={'max-w-full resize-none overflow-hidden rounded-sm'}>
      <TreeView
        viewClassName="tree-view-output"
        treeTypeButtonClassName="debug-treetype-button"
        timeTravelPanelClassName="debug-time-travel-panel"
        timeTravelButtonClassName="debug-time-travel-button"
        timeTravelPanelSliderClassName="debug-time-travel-panel-slider"
        timeTravelPanelButtonClassName="debug-time-travel-panel-button"
        editor={editor}
      />
    </div>
  )
}
