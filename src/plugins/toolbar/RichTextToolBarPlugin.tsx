import {
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  INDENT_CONTENT_COMMAND,
  INSERT_PARAGRAPH_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
} from 'lexical'
import {
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from '@lexical/list'

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { RichTextToolbarButton } from '#/plugins/toolbar/RichTextToolbarButton'
import { ToolbarIcon } from '#/plugins/toolbar/ToolbarIcon'
import { toolbarIcons } from '#/plugins/toolbar/toolbarIcons'
import React from 'react'
import { useEditorStateListener } from '#/plugins/toolbar/useEditorStateListener'

export function RichTextToolBarPlugin() {
  const [editor] = useLexicalComposerContext()
  const { canRedo, canUndo, textAlignment, isHighlighted, isItalic, isStrikethrough, isUnderline, isBold, listType } =
    useEditorStateListener()

  return (
    <div className="flex items-center gap-0.5">
      <RichTextToolbarButton
        disabled={!canUndo}
        active={false}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined)
        }}
      >
        <ToolbarIcon svg={toolbarIcons.undo} />
      </RichTextToolbarButton>
      <RichTextToolbarButton
        disabled={!canRedo}
        active={false}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined)
        }}
      >
        <ToolbarIcon svg={toolbarIcons.redo} />
      </RichTextToolbarButton>
      <RichTextToolbarButton
        active={isBold}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
        }}
      >
        <ToolbarIcon svg={toolbarIcons.bold} />
      </RichTextToolbarButton>
      <RichTextToolbarButton active={isItalic} onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}>
        <ToolbarIcon svg={toolbarIcons.italic} />
      </RichTextToolbarButton>
      <RichTextToolbarButton
        active={isUnderline}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
      >
        <ToolbarIcon svg={toolbarIcons.underline} />
      </RichTextToolbarButton>
      <RichTextToolbarButton
        active={isStrikethrough}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')}
      >
        <ToolbarIcon svg={toolbarIcons.strikethrough} />
      </RichTextToolbarButton>
      <RichTextToolbarButton
        active={listType === 'number'}
        onClick={() => {
          if (listType === 'number') {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
          } else {
            editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
          }
        }}
      >
        <ToolbarIcon svg={toolbarIcons.orderedList} />
      </RichTextToolbarButton>
      <RichTextToolbarButton
        active={listType === 'bullet'}
        onClick={() => {
          if (listType === 'bullet') {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
          } else {
            editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
          }
        }}
      >
        <ToolbarIcon svg={toolbarIcons.bulletList} />
      </RichTextToolbarButton>

      <RichTextToolbarButton
        active={listType === 'check'}
        onClick={() => {
          if (listType === 'check') {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
          } else {
            editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined)
          }
        }}
      >
        <ToolbarIcon svg={toolbarIcons.checkList} />
      </RichTextToolbarButton>
      <RichTextToolbarButton
        active={false}
        onClick={() => {
          editor.dispatchCommand(INSERT_PARAGRAPH_COMMAND, undefined)
          editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined)
        }}
      >
        <ToolbarIcon svg={toolbarIcons.paragraph} />
      </RichTextToolbarButton>

      <RichTextToolbarButton
        active={textAlignment === 'right'}
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')}
      >
        <ToolbarIcon svg={toolbarIcons.alignRight} />
      </RichTextToolbarButton>
      <RichTextToolbarButton
        active={textAlignment === 'center'}
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')}
      >
        <ToolbarIcon svg={toolbarIcons.alignCenter} />
      </RichTextToolbarButton>
      <RichTextToolbarButton
        active={textAlignment === 'justify'}
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify')}
      >
        <ToolbarIcon svg={toolbarIcons.alignJustify} />
      </RichTextToolbarButton>
      <RichTextToolbarButton
        active={textAlignment === 'left' || textAlignment === 'start' || textAlignment === ''}
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')}
      >
        <ToolbarIcon svg={toolbarIcons.alignLeft} />
      </RichTextToolbarButton>

      <RichTextToolbarButton
        active={isHighlighted}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'highlight')}
      >
        <ToolbarIcon svg={toolbarIcons.highlight} />
      </RichTextToolbarButton>
    </div>
  )
}
