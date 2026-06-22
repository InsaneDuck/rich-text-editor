import { type ComponentProps, useCallback } from 'react'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { Column } from '#/ui/Column'
import { Label } from '#/ui/Label'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { ListItemNode, ListNode } from '@lexical/list'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin'
import { type EditorState, type LexicalEditor, ParagraphNode, TextNode } from 'lexical'
import { TreeViewPlugin } from '#/plugins/treeview/TreeViewPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { $generateHtmlFromNodes } from '@lexical/html'
import { RichTextToolBarPlugin } from '#/plugins/toolbar/RichTextToolBarPlugin'
import { RichTextToolbarProvider } from '#/plugins/toolbar/RichTextToolbarContext'
import React from 'react'
import { tailwindTheme } from '#/theme/TailwindTheme'

type RichTextProps = {
  label?: string
}

export const placeholderText = 'Enter your text here...'

const Placeholder = () => (
  <div className={'pointer-events-none flex absolute top-2 left-2 text-gray-300 '}>{placeholderText}</div>
)

const editorConfig: ComponentProps<typeof LexicalComposer>['initialConfig'] = {
  namespace: 'RichTextEditor',
  onError: (error) => console.error(error),
  nodes: [ParagraphNode, TextNode, ListNode, ListItemNode],
  theme: tailwindTheme,
  html: {},
}

export function RichTextEditor({ label }: RichTextProps) {
  const onChangeHandler = useCallback((_: EditorState, editor: LexicalEditor) => {
    editor.read(() => {
      const htmlString = $generateHtmlFromNodes(editor, null)
      console.log('HTMLString', htmlString)
    })
  }, [])

  return (
    <div>
      <Column>
        <Label>{label}</Label>
        <LexicalComposer initialConfig={editorConfig}>
          <div className="flex flex-col gap-0.5">
            <RichTextToolbarProvider>
              <RichTextToolBarPlugin />
            </RichTextToolbarProvider>
            <div className="relative flex flex-col gap-2">
              <RichTextPlugin
                contentEditable={
                  <div
                    className={
                      'p-2 border border-gray-300 dark:border-neutral-800 max-w-full rounded-sm overflow-hidden resize-none'
                    }
                  >
                    <ContentEditable
                      placeholder={Placeholder}
                      aria-placeholder={placeholderText}
                      className={'text-black dark:text-white outline-none font-mono min-h-30 max-w-full'}
                      autoFocus={true}
                    />
                  </div>
                }
                ErrorBoundary={LexicalErrorBoundary}
              />
              <HistoryPlugin />
              <ListPlugin />
              <CheckListPlugin />
              <TreeViewPlugin />
              <OnChangePlugin onChange={onChangeHandler} />
            </div>
          </div>
        </LexicalComposer>
      </Column>
    </div>
  )
}
