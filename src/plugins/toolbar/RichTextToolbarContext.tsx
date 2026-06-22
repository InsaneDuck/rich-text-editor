import React, { createContext, type ReactNode, useCallback, useContext, useMemo, useState } from 'react'
import type { ElementFormatType, LexicalEditor } from 'lexical'
import type { ListType } from '@lexical/list'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

type RichTextToolbarStateType = {
  canRedo: boolean
  canUndo: boolean
  isBold: boolean
  isHighlighted: boolean
  isItalic: boolean
  isStrikethrough: boolean
  isUnderline: boolean
  listType: ListType | undefined
  textAlignment: ElementFormatType
}

const initialValue: RichTextToolbarStateType = {
  canRedo: false,
  canUndo: false,
  isBold: false,
  isHighlighted: false,
  isItalic: false,
  isStrikethrough: false,
  isUnderline: false,
  listType: undefined,
  textAlignment: 'left',
}

type RichTextToolbarContextType = {
  editor: LexicalEditor | null
  toolbarState: RichTextToolbarStateType
  updateToolbarState: <K extends keyof RichTextToolbarStateType, V extends RichTextToolbarStateType[K]>(
    key: K,
    value: V,
  ) => void
}

export const RichTextToolbarContext = createContext<RichTextToolbarContextType | undefined>(undefined)

export function RichTextToolbarProvider({ children }: { children: ReactNode }) {
  const [toolbarState, setToolbarState] = useState<RichTextToolbarStateType>(initialValue)
  const [editor] = useLexicalComposerContext()

  const updateToolbarState = useCallback(
    <K extends keyof RichTextToolbarStateType, V extends RichTextToolbarStateType[K]>(key: K, value: V) => {
      setToolbarState((prevState) => ({ ...prevState, [key]: value }))
    },
    [],
  )

  const context = useMemo(() => {
    return { editor, toolbarState, updateToolbarState }
  }, [editor, toolbarState, updateToolbarState])

  return <RichTextToolbarContext.Provider value={context}>{children}</RichTextToolbarContext.Provider>
}

export const useRichTextToolbarContext = () => {
  const context = useContext(RichTextToolbarContext)

  if (context === undefined) {
    throw new Error('useRichTextToolbarContext must be used within a RichTextToolbarProvider')
  }

  return context
}
