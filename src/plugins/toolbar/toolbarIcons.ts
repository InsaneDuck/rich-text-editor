import arrowClockwise from '#/assets/arrow-clockwise.svg?raw'
import arrowCounterclockwise from '#/assets/arrow-counterclockwise.svg?raw'
import filterLeft from '#/assets/filter-left.svg?raw'
import highlighter from '#/assets/highlighter.svg?raw'
import justify from '#/assets/justify.svg?raw'
import cardChecklist from '#/assets/card-checklist.svg?raw'
import listOl from '#/assets/list-ol.svg?raw'
import listUl from '#/assets/list-ul.svg?raw'
import textCenter from '#/assets/text-center.svg?raw'
import textLeft from '#/assets/text-left.svg?raw'
import textRight from '#/assets/text-right.svg?raw'
import typeBold from '#/assets/type-bold.svg?raw'
import typeItalic from '#/assets/type-italic.svg?raw'
import typeStrikethrough from '#/assets/type-strikethrough.svg?raw'
import typeUnderline from '#/assets/type-underline.svg?raw'

export const toolbarIcons = {
  undo: arrowCounterclockwise,
  redo: arrowClockwise,
  bold: typeBold,
  italic: typeItalic,
  underline: typeUnderline,
  strikethrough: typeStrikethrough,
  orderedList: listOl,
  bulletList: listUl,
  checkList: cardChecklist,
  paragraph: filterLeft,
  alignRight: textRight,
  alignCenter: textCenter,
  alignJustify: justify,
  alignLeft: textLeft,
  highlight: highlighter,
} as const
