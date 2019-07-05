declare interface JFormDescriptor {
  id: number
  type: JFormTypes
  name: string
  readOnly: boolean
  canInsert: boolean
  canUpdate: boolean
  canDelete: boolean
  sections: JFormSection[]
  permissions: { [key: string]: boolean }
  idAttributeName: string | null
}

declare interface JFormSection {
  name: string
  nbCol: number
  rows: JFormRow[]
}

declare interface JFormRow {
  row: number
  cells: JFormField[]
}

declare type JFormField =
  JFormFieldLabel
  | JFormFieldEmpty
  | JFormFieldInput
  | JFormFieldInputText
  | JFormFieldDate
  | JFormFieldRange
  | JFormFieldCheckBox
  | JFormFieldSelectOne
  | JFormFieldSelectBase
  | JFormFieldSelectTree

declare interface JFormFieldBase {
  uuid?: string
  type: JFormFieldTypes
  tooltip: string
  display: {
    width: number
    row: number
    colSpan: number
    col: number
    align: JFormFieldAlignments
  }
}

declare interface JFormFieldEmpty extends JFormFieldBase {
  type: JFormFieldTypes
}

declare interface JFormFieldLabel extends JFormFieldBase {
  text: string
}

declare interface JFormFieldColumnSpan extends JFormFieldBase {
  id: string
}

declare interface JFormFieldInput extends JFormFieldBase {
  required: boolean
  readOnly: boolean
  defaultValue: string
  labelPrefix: string
  labelSuffix: string
  attribute: JFormFieldAttribute
  parentAttribute: string
}

declare interface JFormFieldAttribute {
  name: string
  type: number
}

declare interface JFormFieldDate extends JFormFieldInput {
  dateFormat: string
}

declare interface JFormFieldInputText extends JFormFieldInput {
  range: null | { min: number, max: number }
  multiLine: boolean
  maxNumberCharacter: number
  maskFormatter: string
}

declare interface JFormFieldRange extends JFormFieldInput {
  type: JFormFieldTypes
}

declare interface JFormFieldCheckBox extends JFormFieldInput {
  checkedValue: string
  uncheckedValue: string
}

declare interface JFormFieldTreeEntry {
  parentValue: string
  label: string
  value: string
}

declare interface JFormFieldSelectBase extends JFormFieldInput {
  selectEntries: JFormFieldTreeEntry[]
}

declare interface JFormFieldSelectOne extends JFormFieldSelectBase {
  canAddNewValue: boolean
  autoSelectUniqueValue: boolean
}

declare interface JFormFieldSelectTree extends JFormFieldSelectBase {
  onlyLeafSelection: boolean
}

declare type JFormTypes =
  "DEPRECATED_FORM"
  | "LAYER_ATTRIBUTES_FORM"
  | "LAYER_ATTRIBUTES_SUB_FORM"
  | "EXTERNAL_ATTRIBUTES_FORM"
  | "EXTERNAL_ATTRIBUTES_SUB_FORM"

declare type JFormFieldTypes =
  "TYPE_EMPTY"
  | "TYPE_COLUMN_SPAN"
  | "TYPE_LABEL"
  | "TYPE_INPUT_TEXT"
  | "TYPE_INPUT_RANGE"
  | "TYPE_SELECT_ONE"
  | "TYPE_SELECT_MANY"
  | "TYPE_INPUT_DATE"
  | "TYPE_SELECT_BOOLEAN"
  | "TYPE_GROUP_PANEL"
  | "TYPE_DOCUMENT"
  | "TYPE_TREE"
  | "TYPE_TABLE"

declare type JFormFieldAlignments =
  "LEFT"
  | "CENTER"
  | "RIGHT"
