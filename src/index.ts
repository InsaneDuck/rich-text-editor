import editorStyles from './styles.css?inline'
import treeStyles from './plugins/treeview/tree-styles.css?inline'
import { injectStyles } from './injectStyles'

injectStyles(`${editorStyles}\n${treeStyles}`, '@insaneduck/rich-text-editor')

export { RichTextEditor, type RichTextEditorTheme } from './RichTextEditor'
