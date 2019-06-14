// Here the JMAP API namespace definition
// It will enable to call the API like that in your code :
// Ex: JMap.Services.User.logout()
// This is the API contract, if changed it could have impact on customers !

declare namespace JMap {
  // JMap.Service : expose API services
  namespace Service {
    // JMap.Service.Api
    namespace Api {
      function setMode(mode: API_MODE): void
    }
    // JMap.Service.Language
    namespace Language {
      function getLocale(): string // EN (default), FR, ES, or PT
      function translate(key: string, params?: string | string[], locale?: string): string
    }
    // JMap.Service.Project
    namespace Project {
      function setId(projectId: string): void
    }
    // JMap.Service.Layer
    namespace Layer {
      function getLayerAttributes(layerId: number): JLayerAttribute[]
      function getLayerTree(): JLayerTree
      function getRenderedLayerIds(): number[]
      function exists(layerId: number): boolean
      function getById(layerId: number): JLayerElement
      function getName(layerId: number): string
      function getDescription(layerId: number): string
      function isVisible(layerId: number): boolean
      function setVisible(layerId: number, visible: boolean): void
      function setGroupOpen(nodeId: number, open: boolean): void
      function removeLayer(layerId: number): void
    }
    // JMap.Service.Map
    namespace Map {
      function getMap(): any
      function getMapJSLib(): any
      function getLayersVisibilityStatus(): JMapLayersVisibilityStatus
      function getInUseJMapLayerIds(): number[]
      function getInUseJMapVectorLayerIds(): number[]
      function getInUseJMapLayerBefore(layerId: number): number | undefined
      function getInUseJMapLayerAfter(layerId: number): number | undefined
      function getRenderedFeatures(layerId: number, filter?: JLocation | JBoundaryBox): any[]
      function getRenderedFeaturesAttributeValues(layerId: number, filter?: JLocation | JBoundaryBox): JMapFeatureAttributeValues[]
      function getAvailableBaseMaps(): string[]
      function setBaseMap(mapName: string): void
      function panTo(center: JLocation): void
      function zoomTo(zoom: number): void
      function panAndZoomTo(center: JLocation, zoom: number): void
      // JMap.Service.Map.Interaction
      namespace Interaction {
        function addInteractor(name: string, interactor: JMapInteractor, active?: boolean): void
        function terminateInteractorById(interactorId: string): void
        function getAllInteractorDescriptors(): JMapInteractorDescriptor[]
        function getActiveInteractorDescriptors(): JMapInteractorDescriptor
        function activateInteractorById(interactorId: string): void
      }
      // JMap.Service.Map.Filter
      namespace Filter {
        function applyHasAttribute(layerId: number, attributeId: string): string
        function applyHasNotAttribute(layerId: number, attributeId: string): string
        function applyAttributeValueEqualTo(layerId: number, attributeId: string, attributeValue: any): string
        function applyAttributeValueBetween(layerId: number, attributeId: string, start: any, end: any): string
        function applyAttributeValueNotEqualTo(layerId: number, attributeId: string, attributeValue: any): string
        function applyAttributeValueGreaterThan(layerId: number, attributeId: string, attributeValue: any): string
        function applyAttributeValueGreaterOrEqualsTo(layerId: number, attributeId: string, attributeValue: any): string
        function applyAttributeValueLowerThan(layerId: number, attributeId: string, attributeValue: any): string
        function applyAttributeValueLowerOrEqualsTo(layerId: number, attributeId: string, attributeValue: any): string
        function applyAttributeValueIn(layerId: number, attributeId: string, attributeValues: any[]): string
        function applyAttributeValueNotIn(layerId: number, attributeId: string, attributeValues: any[]): string
        function applySpatial(layerId: number, filterGeometry: JPolygon | JCircle): string
        function removeByFilterId(filterId: string): void
        function removeAllFilters(layerId: number): void
      }
      // JMap.Service.Map.Selection
      namespace Selection {
        function selectOnAllLayersAtLocation(location: JLocation): { [ layerId: number ]: any[] } // any is a feature
        function selectOnOneLayerAtLocation(layerId: number, location: JLocation): any[]
        function setLayerSelection(layerId: number, features: any | any[]): void
        function addFeaturesToLayerSelection(layerId: number, features: any | any[]): void
        function removeFeaturesFromLayerSelection(layerId: number, featureIds: number | number[]): void
        function clearSelection(layerId?: number): void
      }
    }
    // JMap.Service.User
    namespace User {
      function setSessionId(sessionId: string): void
      function login(login: string, password: string): Promise<JLoginData>
      function logout(): Promise<void>
    }
  }

  // JMap.Data : Provide redux store used by api, and also getters to easy access data
  namespace Data {
    function getStore(): any | undefined
    // JMap.Data.Api
    namespace Api {
      function gerRestUrl(): string
      function getMode(): API_MODE
      function getAllMode(): API_MODE[]
      function getMapImplementation(): MAP_IMPLEMENTATION
    }
    // JMap.Data.App
    namespace App {
      // TODO
    }
    // JMap.Data.Project
    namespace Project {
      function getId(): string
    }
    // JMap.Data.Layer
    namespace Layer {
      function getLayerTree(): JLayerTree
      function getRenderedLayers(): JLayer[]
      function exists(layerId: number): boolean
      function getById(layerId: number): JLayerElement
      function getSelfOrChildren(layerId: number): JLayer[]
      function getName(layerId: number): string
      function getDescription(layerId: number): string
      function isVisible(layerId: number): boolean
    }
    // JMap.Data.Map
    namespace Map {
      function getImplementation(): MAP_IMPLEMENTATION
      function getCenter(): JLocation
      function getZoom(): number
      function getBaseMap(): string
      function getSelectedFeaturesForLayer(layerId: number): any[]
      function getSelectedFeatureIdsForLayer(layerId: number): number[]
    }
    // JMap.Data.User
    namespace User {
      function getLocale(): string
      function getSessionId(): string
      function getIdentity(): JUserIdentity
      function getLogin(): string
    }
    // JMap.Data.Selectio
    namespace Selection {
      function getSelection(): JElementSelection
    }
  }

  // JMap.Component : provide a way to start ui components by your own in the DOM container of your choice
  namespace Component {
    // JMap.Component.FormFlat : form without sections, rows and column. Only field aligned vertically
    const FormFlat: JAPIComponent<JFormCmp, JFormProps>
  }

  // JMap.Application : JMap application instance management (not started by default)
  namespace Application {
    function needToStart(): boolean
    function getContainerId(): string
    function getInstance(): React.Component<any, React.ComponentState> | Element | void
    function start(containerId?: string, initOptions?: JAPIApplicationOptions): void
  }

  // JMap.Extension : provide an api to register dynamically an extension
  namespace External {
    function register(extensionModel: JExtensionModel): void
    function isRegistered(extensionId: string): boolean // ex : JMap.Extension.isRegistered('Document')
    function getAllRegistered(): string[]
    function renderMouseOver(layerId: string, elementId: string): JExtensionMouseOver[]
    function hasMouseOver(): boolean

    // JMap.Extension.Document : @Optional
    namespace Document {
      const ui_controller: any // @Deprecated

      function setMode(newMode: JDocumentMode): void

      function selectMapElement(layer: string, element: string): Promise<void>
      function unSelectMapElement(): void
      function getElementDocuments(toSelectObjectId: JObjectId): Promise<JAllDocumentDescriptors>

      function getAndSetDeposits(): Promise<JDepositDescriptor[]>
      function setDeposits(deposits: JDepositDescriptor[]): void

      function setSelectionDocuments(descriptors: JAllDocumentDescriptors): void
      function filterSelectionResult(filterValue: string | undefined): void

      function setSearchBasicDeposit(depositId: number): void
      function setSearchBasicTextInput(filter: string): void
      function setSearchBasicOptionRegion(selected: boolean): void
      function setSearchBasicOptionElementSelected(selected: boolean): void
      function resetSearchBasic(textInput?: string): void
      function filterSearchBasicResult(filterValue: string | undefined): void
      function clearSearchBasicResult(): void
      function launchSearchBasic(): Promise<JDocumentDescriptor[]>

      function getAndSetSearchAdvancedDepositForms(depositId: number): Promise<JFormDescriptor[]>
      function selectSearchAdvancedDepositForm(formId: number): void
      function setSearchAdvancedDeposit(depositId: number): void
      function setSearchAdvancedOptionRegion(selected: boolean): void
      function setSearchAdvancedOptionElementSelected(selected: boolean): void
      function filterSearchAdvancedResult(filterValue: string | undefined): void
      function clearSearchAdvancedResult(): void
      function launchSearchAdvanced(valuesByAttributeName: { [attributeName: string]: any }): void
    }
  }
  // JMap.Event
  namespace Event {
    // JMap.Event.Layer
    namespace Layer {
      // JMap.Event.Layer.on
      namespace on {
        function visibilityChange(listenerId: string, fn: (layerElement: JLayerElement) => void): void
        function layerDeletion(listenerId: string, fn: (layerElement: JLayerElement) => void): void
      }
      function activate(listenerId: string): void
      function deactivate(listenerId: string): void
      function remove(listenerId: string): void
    }
    // JMap.Event.Map
    namespace Map {
      // JMap.Event.Map.on
      namespace on {
        function mapLoad(listenerId: string, fn: (map: any) => void): void
        function mapDestroy(listenerId: string, fn: () => void): void
        function moveStart(listenerId: string, fn: (map: any) => void): void
        function moveEnd(listenerId: string, fn: (map: any) => void): void
        function mouseMoveOnLayer(listenerId: string, fn: (layerId: number, location: JLocation, feature: any[], map: any) => void): void
        function mouseEnter(listenerId: string, fn: (layerId: number, location: JLocation, feature: any[], map: any) => void): void
        function mouseLeave(listenerId: string, fn: (map: any) => void): void
        function click(listenerId: string, fn: (location: JLocation, map: any) => void): void
      }
      function activate(listenerId: string): void
      function deactivate(listenerId: string): void
      function remove(listenerId: string): void
    }
  }
}

declare interface Window {
  JMAP_API_OPTIONS?: JAPIOptions
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any
}

type API_MODE = "layer" | "select" | "tool" | "draw" | "search" | "add" | "external"

interface JMapFeatureAttributeValues {
  featureId: number
  [ attributeId: string ]: any
}

type LAYER_GEOMETRY = "ANNOTATION" | "CURVE" | "COMPLEX" | "POINT" | "RASTER" | "SURFACE" | "ELLIPSE" | "NONE"

interface JLayerGeometry {
  type: LAYER_GEOMETRY
  editable: boolean
}

interface JLayer extends JLayerElement {
  geometry: JLayerGeometry
  attributes: JLayerAttribute[]
  selectionStyle: JLayerStyle
}

interface JLayerStyle {
  transparency: number
  fillColor: string
  lineColor: string
}

interface JLayerAttribute {
  id: string
  label: string
}

interface JLayerElement {
  id: number,
  name: string,
  description: string
  initialVisibility: boolean
  visible: boolean
  isNode: boolean
  path: string
}

type JLayerTree = Array<JLayerElement>

interface JBoundaryBox {
  sw: JLocation
  ne: JLocation
} 

interface JLocation {
  x: number
  y: number
}

type JPoint = [ number, number ]

type JPolygon = Array<JPoint>

interface JCircle {
  center: JLocation,
  radius: number
}

interface JMapInteractorDescriptor {
  id: string
  apiMode: API_MODE
  isExternal: boolean
}

interface JMapInteractor {
  init(map: any): void
  activate(): void
  deactivate(): void
  terminate(): void
}

interface JMapLayersVisibilityStatus {
  [ layerElementId: number ]: {
    isVisible: boolean
    userVisibility: boolean
    mapVisibility: boolean
  }
}

interface JAPIOptions {
  projectId: number,
  application?: JAPIApplicationOptions,
  map?: JAPIMapOptions,
  restBaseUrl?: string
  session?: JSessionData
  implementation?: MAP_IMPLEMENTATION
}

type MAP_IMPLEMENTATION = "MapBox" | "OpenLayers"

interface JAPIMapOptions {
  containerId?: string
  mapboxToken?: ""
  implementation?: MAP_IMPLEMENTATION
}

interface JSessionData {
  sessionId: number
  user: JUserPublicData
}

interface JUserPublicData {
  login: string,
  firstname: string,
  lastname: string,
  admin: boolean
}

interface JAllDocumentDescriptors {
  documents: JDocumentDescriptor[]
  hyperlinks: JHyperLinkDescriptor[]
}

interface JHyperLinkDescriptor {
  id: number
  url: string
  depositName: string
  depositId: number
  linkDescription: string
  linkImageLocation: string
  linkTitle: string
  linkFavicon: string
}

interface JDocumentDescriptor {
  identifier: number
  title: string
  description: string
  fileName: string
  creation: number // timestamp
  depositName: string
  depositId: number
  hasDownloadPermission: boolean
  documentAssociations: JElementSelectionWithAttribute[]
  metadataList: JDocumentMetadata[]
}

interface JDocumentMetadata {
  name: string
  values: (string | number)[]
}

interface JDepositDescriptor {
  id: number
  name: string
  description: string
}

interface JExtensionMouseOver {
  html: string  // static html content
  js?: string   // javascript that will be evaluated after html rendered
}

interface JObjectId {
  project: string
  layer: string
  element: string
}

interface JElementSelection {
  [layerId: number]: number[]
}

interface JElementSelectionWithAttribute {
  attributeName: string
  layerName: string
  elementIds: string[]
}

interface JUserIdentity {
  firstName: string
  lastName: string
  login: string
}

interface JLoginData {
  token: string
  user: JUserPublicData
}

interface JUserPublicData {
  login: string,
  firstname: string,
  lastname: string,
  admin: boolean
}

interface JAPIApplicationOptions {
  start: boolean
  containerId: string
}

interface JAPIComponent<C extends React.Component, P> {
  create(containerId: string, options?: P): C
  destroy(containerId: string): void
  getInstance(containerId: string): C
}

interface JFormCmp extends React.Component<JFormProps, {}> { }
interface JFormProps {
  idPrefix: string
  formDescriptor: JFormDescriptor,
  buttonLabelSubmit?: string
  buttonLabelCancel?: string
  buttonLabelClear?: string
  hideClearButton?: boolean
  onSubmit: (values: any) => void,
  onCancel?: () => void
  onClear?: () => void
}

interface JFormDescriptor {
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

interface JFormSection {
  name: string
  nbCol: number
  rows: JFormRow[]
}

interface JFormRow {
  row: number
  cells: JFormField[]
}

type JFormField =
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

interface JFormFieldBase {
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

interface JFormFieldEmpty extends JFormFieldBase {
  type: JFormFieldTypes
}

interface JFormFieldLabel extends JFormFieldBase {
  text: string
}

interface JFormFieldColumnSpan extends JFormFieldBase {
  id: string
}

interface JFormFieldInput extends JFormFieldBase {
  required: boolean
  readOnly: boolean
  defaultValue: string
  labelPrefix: string
  labelSuffix: string
  attribute: JFormFieldAttribute
  parentAttribute: string
}

interface JFormFieldAttribute {
  name: string
  type: number
}

interface JFormFieldDate extends JFormFieldInput {
  dateFormat: string
}

interface JFormFieldInputText extends JFormFieldInput {
  range: null | { min: number, max: number }
  multiLine: boolean
  maxNumberCharacter: number
  maskFormatter: string
}

interface JFormFieldRange extends JFormFieldInput {
  type: JFormFieldTypes
}

interface JFormFieldCheckBox extends JFormFieldInput {
  checkedValue: string
  uncheckedValue: string
}

interface JFormFieldTreeEntry {
  parentValue: string
  label: string
  value: string
}

interface JFormFieldSelectBase extends JFormFieldInput {
  selectEntries: JFormFieldTreeEntry[]
}

interface JFormFieldSelectOne extends JFormFieldSelectBase {
  canAddNewValue: boolean
  autoSelectUniqueValue: boolean
}

interface JFormFieldSelectTree extends JFormFieldSelectBase {
  onlyLeafSelection: boolean
}

type JFormTypes =
  "DEPRECATED_FORM"
  | "LAYER_ATTRIBUTES_FORM"
  | "LAYER_ATTRIBUTES_SUB_FORM"
  | "EXTERNAL_ATTRIBUTES_FORM"
  | "EXTERNAL_ATTRIBUTES_SUB_FORM"

type JFormFieldTypes =
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

type JFormFieldAlignments =
  "LEFT"
  | "CENTER"
  | "RIGHT"

interface JUserState {
  identity: JUserIdentity
  token: string
  locale: string
}

interface JUserIdentity {
  firstName: string
  lastName: string
  login: string
}

interface JExtensionModel {
  id: string
  initFn: (options: any) => void
  storeReducer?: (reducerState: any, action: any) => any
  serviceToExpose?: any
  renderMouseOver?(layerId: string, elementId: string): JExtensionMouseOver
}

type JDocumentMode = "MENU" | "SELECTION" | "SEARCH_BASIC" | "SEARCH_ADVANCED"
