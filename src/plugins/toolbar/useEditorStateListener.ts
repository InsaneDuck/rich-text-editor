import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useCallback, useEffect } from 'react'
import {
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_LOW,
  mergeRegister,
  SELECTION_CHANGE_COMMAND,
} from 'lexical'
import { $isListNode, ListNode } from '@lexical/list'
import { $getNearestNodeOfType } from '@lexical/utils'
import { useRichTextToolbarContext } from '#/plugins/toolbar/RichTextToolbarContext.tsx'

export function useEditorStateListener() {
  const [editor] = useLexicalComposerContext()
  const { toolbarState, updateToolbarState } = useRichTextToolbarContext()

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection()

    if (!$isRangeSelection(selection)) return

    updateToolbarState('isBold', selection.hasFormat('bold'))
    updateToolbarState('isItalic', selection.hasFormat('italic'))
    updateToolbarState('isUnderline', selection.hasFormat('underline'))
    updateToolbarState('isStrikethrough', selection.hasFormat('strikethrough'))
    updateToolbarState('isHighlighted', selection.hasFormat('highlight'))

    const anchorNode = selection.anchor.getNode()
    const element = anchorNode.getTopLevelElementOrThrow()
    const format = $isElementNode(element) ? element.getFormatType() : ''
    updateToolbarState('textAlignment', format)

    const listNode = $isListNode(element) ? element : $getNearestNodeOfType(anchorNode, ListNode)
    const listType = listNode?.getListType()
    updateToolbarState('listType', listType)
  }, [updateToolbarState])

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(
          () => {
            $updateToolbar()
          },
          { editor },
        )
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _activeEditor) => {
          $updateToolbar()
          return false
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          updateToolbarState('canRedo', payload)
          return false
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          updateToolbarState('canRedo', payload)
          return false
        },
        COMMAND_PRIORITY_LOW,
      ),
    )
  }, [editor, $updateToolbar, updateToolbarState])

  return toolbarState
}
