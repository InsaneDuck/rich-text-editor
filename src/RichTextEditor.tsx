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

export type RichTextEditorTheme = 'dark' | 'light'

type RichTextProps = {
  label?: string
  theme?: RichTextEditorTheme
}

export const placeholderText = 'Enter your text here...'

const Placeholder = () => (
  <div className="pointer-events-none absolute top-2 left-2 flex text-gray-400 dark:text-neutral-500">
    {placeholderText}
  </div>
)

const editorConfig: ComponentProps<typeof LexicalComposer>['initialConfig'] = {
  namespace: 'RichTextEditor',
  onError: (error) => console.error(error),
  nodes: [ParagraphNode, TextNode, ListNode, ListItemNode],
  theme: tailwindTheme,
  html: {},
}

export function RichTextEditor({ label, theme = 'light' }: RichTextProps) {
  const onChangeHandler = useCallback((_: EditorState, editor: LexicalEditor) => {
    editor.read(() => {
      const htmlString = $generateHtmlFromNodes(editor, null)
      console.log('HTMLString', htmlString)
    })
  }, [])

  return (
    <div data-rte-theme={theme}>
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
                  <div className="max-w-full resize-none overflow-hidden rounded-sm border border-gray-300 bg-white p-2 dark:border-neutral-800 dark:bg-neutral-900">
                    <ContentEditable
                      placeholder={Placeholder}
                      aria-placeholder={placeholderText}
                      className="min-h-30 max-w-full font-mono text-black outline-none dark:text-white"
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
