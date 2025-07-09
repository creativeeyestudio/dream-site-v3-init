import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export const convertRichTextToHTML = (data: SerializedEditorState): string => {
  return convertLexicalToHTML({ data })
}
