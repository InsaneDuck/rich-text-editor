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
        <i className="fa-solid fa-rotate-left"></i>
      </RichTextToolbarButton>
      <RichTextToolbarButton
        disabled={!canRedo}
        active={false}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined)
        }}
      >
        <i className="fa-solid fa-rotate-right"></i>
      </RichTextToolbarButton>
      <RichTextToolbarButton
        active={isBold}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
        }}
      >
        <i className="fa-solid fa-bold"></i>
      </RichTextToolbarButton>
      <RichTextToolbarButton active={isItalic} onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}>
        <i className="fa-solid fa-italic"></i>
      </RichTextToolbarButton>
      <RichTextToolbarButton
        active={isUnderline}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
      >
        <i className="fa-solid fa-underline"></i>
      </RichTextToolbarButton>
      <RichTextToolbarButton
        active={isStrikethrough}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')}
      >
        <i className="fa-solid fa-strikethrough"></i>
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
        <i className="fa-solid fa-list-ol"></i>
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
        <i className="fa-solid fa-list"></i>
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
        <i className="fa-solid fa-square-check"></i>
      </RichTextToolbarButton>
      <RichTextToolbarButton
        active={false}
        onClick={() => {
          editor.dispatchCommand(INSERT_PARAGRAPH_COMMAND, undefined)
          editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined)
        }}
      >
        <i className="fa-solid fa-paragraph"></i>
      </RichTextToolbarButton>

      {/*<RichTextToolbarButton active={isHeading}>*/}
      {/*  <i className="fa-solid fa-heading"></i>*/}
      {/*</RichTextToolbarButton>*/}
      <RichTextToolbarButton
        active={textAlignment === 'right'}
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')}
      >
        <i className="fa-solid fa-align-right"></i>
      </RichTextToolbarButton>
      <RichTextToolbarButton
        active={textAlignment === 'center'}
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')}
      >
        <i className="fa-solid fa-align-center"></i>
      </RichTextToolbarButton>
      <RichTextToolbarButton
        active={textAlignment === 'justify'}
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify')}
      >
        <i className="fa-solid fa-align-justify"></i>
      </RichTextToolbarButton>
      <RichTextToolbarButton
        active={textAlignment === 'left' || textAlignment === 'start' || textAlignment === ''}
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')}
      >
        <i className="fa-solid fa-align-left"></i>
      </RichTextToolbarButton>

      <RichTextToolbarButton
        active={isHighlighted}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'highlight')}
      >
        <i className="fa-solid fa-marker"></i>
      </RichTextToolbarButton>
    </div>
  )
}
