declare type JFormType =
  "DEPRECATED_FORM"
  | "LAYER_ATTRIBUTES_FORM"
  | "LAYER_ATTRIBUTES_SUB_FORM"
  | "EXTERNAL_ATTRIBUTES_FORM"
  | "EXTERNAL_ATTRIBUTES_SUB_FORM"

declare type JFormUIControlAlignment =
  "LEFT"
  | "CENTER"
  | "RIGHT"

declare type JFormWidgetType =
  "input"
  | "range"
  | "switch"
  | "select"
  | "date"
  | "photo"
  | "tree"
  | "label"
  | "span"
  | "table"

declare type JSONSchemaTypes =
  "string"
  | "number"
  | "integer"
  | "boolean"
  | "array"
  | "object"

declare interface JForm {
  id: JId
  type: JFormType
  name: string
  schema: JFormSchema
  uiSchema: JFormUISchema
  idAttributeName: string | null
}

declare interface JFormSchema {
  $id: string,
  type: "object",
  $schema: "http://json-schema.org/draft-07/schema#",
  definitions: {},
  properties: JFormSchemaProperties
  required: string[]
}

declare interface JFormSchemaProperties {
  [ name: string ]: JFormSchemaProperty
}

declare interface JFormSchemaProperty {
  title: string
  type: JSONSchemaTypes
  description: string
  items?: { // used if property type = "array"
    type: JSONSchemaTypes // only number or string
  }
  readOnly?: boolean
  format?: string
  pattern?: string
  minimum?: number
  maximum?: number
  minLength?: number // used for required (because required check only if object has attribute)
  maxLength?: number
  enum?: string[] | number[]
  enumNames?: string[]
  parents?: Array<string | undefined> | Array<string | undefined>
  default?: any
}

declare type JFormUISchema = JFormUITab[]

declare interface JFormUITab {
  type: "Tab",
  title: string
  controls: JFormUIControl[]
}

declare interface JFormUIControl {
  type: "Control"
  id: string
  widget: JFormWidgetType
  colSpan: number // the layout grid has 12 columns
  scope?: string // use with attribute related controls. Ex of scope : "#/properties/done"
  multi?: boolean // for select control
  align?: JFormUIControlAlignment
  rows?: number // for multiline input control
  label?: string
  tooltip?: string
  date?: boolean
  dateNow?: boolean // for date control : current date as default value
  dateTime?: boolean // for date control
  dateFormat?: string // for date control
  onlyLeafSelection?: boolean // for tree control
  tree?: JFormUIControlTreeElement[]
  entries?: JFormUIControlEntry[]
  parentAttributeName?: string // used for select that change following parent value
  mask?: string
  subFormId?: JId // for table control
  tableAttributes?: JFormAttribute[] // for table control
}

declare interface JFormUIControlEntry {
  label: string
  value: number | string
  parentValue: string | undefined
}

declare interface JFormUIControlTreeElement extends JFormUIControlEntry {
  children: undefined | JFormUIControlTreeElement[]
}

// BELOW ALL OLD FORM TYPES RECEIVED FROM SERVERS IN JMAP 7

declare type JFormFieldType =
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

declare interface JFormSection {
  name: string
  index: number
  nbCol: number
  rows: JFormRow[]
}

declare interface JFormRow {
  sectionIndex: number
  sectionName: string
  index: number
  fields: JFormField[]
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
  id: string
  type: JFormFieldType
  tooltip: string
  align: JFormUIControlAlignment
}

declare interface JFormFieldEmpty extends JFormFieldBase {
  type: JFormFieldType
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
  type: JFormFieldType
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

declare interface JFormAttribute {
  name: string
  title: string
  sqlType: number
  readOnly: boolean
  nullable: boolean
  isSystem: boolean
  displayFormat: string
  isShowInTable: boolean
  formatPattern: string
}

declare interface JFormFieldTable extends JFormFieldBase {
  label: string
  subFormId: JId
  attributes: JFormAttribute[]
}

declare interface JFormElement {
  elementId: JId
  attributeValueByName: JAttributeValueByName
  geometry?: GeoJSON.Geometry // required for/in attribute forms
}

declare interface JFormById {
  [formId: string]: JForm
}

declare interface JFormId {
  layerId: JId
  formId: JId
}

declare interface JFormElementId extends JFormId {
  elementId: JId
}

declare interface JFormElementIds extends JFormId {
  elementIds: JId[]
}

declare interface JFormElementData extends JFormId {
  attributeValueByName: JAttributeValueByName
}

declare interface JFormCreateAttributeElementsParams extends JFormId {
  elements: JFormCreateAttributeElement[]
}

declare interface JFormCreateAttributeElement {
  geometry: GeoJSON.Geometry
  attributeValueByName: JAttributeValueByName
}

declare interface JFormCreateExternalOrSubFormElementParams extends JFormElementData {
  layerElementId: JId
}

declare interface JFormUpdateElementsParams extends JFormId {
  elements: JFormElement[]
}

declare interface JFormResult {
  elementId: JId
  success: boolean
}

declare interface JFormCreateParams extends JFormId {
  geometry?: GeoJSON.Geometry
}

declare interface JFormEditParams extends JFormId {
  elements: JFormElement[]
}

declare interface JFormTreeElement {
  layerId: JId
  form: JForm
  elements: JFormElement[]
  selectedElementIds: JId[]
  openedSubFormSelection: JFormTreeElement | undefined
}

declare interface JFormData {
  [id: string]: any
}
