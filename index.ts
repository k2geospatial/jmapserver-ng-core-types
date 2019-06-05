import { Action, Store } from "redux"
import { Feature } from "geojson"

export type UIComponent = void | Element | React.Component

// API
export interface JAPI {
  Extension: JAPIExtention
  Data: JAPIData
  Application: JAPIApplication
  Component: JAPIComponent
  Service: JAPIService
}

// API DATA
export interface JAPIData extends JStoreGetterApi {
  getStore(): Store<JAPIState> | undefined
  App: JStoreGetterApp
  Project: JStoreGetterProject
  Layer: JStoreGetterLayer
  Map: JStoreGetterMap
  User: JStoreGetterUser
}

export interface JStoreGetterApi {
  getMode(): API_MODE
  getAllMode(): API_MODE[]
  getMapImplementation(): MAP_IMPLEMENTATION
}

export interface JStoreGetterApp {
  // TODO
}

export interface JStoreGetterProject {
  getId(): number
  getName(): string
  getDescription(): string
  getProjection(): JProjection
  getInitialRotation(): number
  getScaleMax(): number
  getScaleMin(): number
  getColorSelection(): string
  getColorBackground(): string
  getInitialExtent(): JBounds
}

export interface JStoreGetterLayer {
  getLayerTree(): JLayerTree
  getRenderedLayers(): JLayer[]
  exists(layerId: number): boolean
  getById(layerId: number): JLayerElement
  getSelfOrChildren(layerId: number): JLayer[]
  getName(layerId: number): string
  getDescription(layerId: number): string
  isVisible(layerId: number): boolean
}

export interface JStoreGetterMap {
  getImplementation(): MAP_IMPLEMENTATION
  getCenter(): { x: number, y: number }
  getZoom(): number
  getBaseMap(): string
}

export interface JStoreGetterUser {
  getSessionId(): number
  getFirstName(): string
  getLastName(): string
  getLogin(): string
}

export interface JAPIState {
  api: JAPIOwnState
  app: JAppState
  map: JMapState
  project: JProjectState
  layer: JLayerState
  user: JUserState
  external?: any
}

export interface JAPIOwnState {
  mode: API_MODE,
  allMode: API_MODE[]
  mapImplementation: MAP_IMPLEMENTATION
}

export enum MAP_IMPLEMENTATION {
  MAP_BOX = "MapBox",
  OPEN_LAYERS = "OpenLayers"
}

// API DATA -> APP
export interface JAppState {
  sidePanelOpen: boolean
}

// API DATA -> MAP
export interface JMapState {
  implementation: MAP_IMPLEMENTATION
  center: JPosition
  zoom: number
  boundaryBox: JBoundaryBox
  baseMap: string
}

export interface JCircle {
  center: JPosition,
  radius: number
}

export interface JBoundaryBox {
  sw: JPosition
  ne: JPosition
} 

export interface JPosition {
  x: number
  y: number
}

// API DATA -> PROJECT
export type JProjectState = JProject

// API DATA -> LAYER
export interface JLayerState {
  tree: JLayerTree
  allById: { [layerElementId: string]: JLayerElement }
}

// API DATA -> USER
export interface JUserState {
  firstName: string
  lastName: string
  login: string
  sessionId: number
}

// API APPLICATION
export interface JAPIApplication {
  needToStart(): boolean
  getDomContainerId(): string
  getInstance(): React.Component
  start(containerId?: string, initOptions?: JAPIApplicationOptions): void
  SidePanel: JSidePanelController
}

// API APPLICATION -> SIDE_PANEL
export interface JSidePanelController {
  setVisible(open: boolean): void
  open(): void
  close(): void
}

export interface JAPIApplicationOptions {
  start: boolean
  containerId: string
}

// API SERVICE
export interface JAPIService {
  setMode(mode: API_MODE): void
  Popup: JPopupService
  Language: JAPILanguageService
  Project: JProjectService
  Layer: JLayerService
  User: JUserService
  Map: JMapService
}

export enum API_MODE {
  LAYER = "layer",
  SELECT = "select",
  TOOL = "tool",
  DRAW = "draw",
  SEARCH = "search",
  ADD = "add"
}

// API SERVICE -> MAP
export interface JMapService {
  getMap(): any
  getAvailableBaseMaps(): string[]
  setBaseMap(mapName: string): void
  getRenderedFeatures(layerId: number, filter?: JPosition | JBoundaryBox): Feature[]
  getRenderedFeaturesAttributeValues(layerId: number, filter?: JPosition | JBoundaryBox): JMapFeatureAttributeValues[]
  panTo(center: JPosition): void
  zoomTo(zoom: number): void
  panAndZoomTo(center: JPosition, zoom: number): void
  Filter: {
    applySpatial(layerId: number, filter: JBoundaryBox | JCircle): void
    applyAttributeValueEqualsOrIn(layerId: number, attributeId: string, attributeValue: any | any[]): void
    removeAllFilters(layerId: number): void
  }
}

export interface JMapFeatureAttributeValues {
  featureId: number
  [ attributeId: string ]: any
}

// API SERVICE -> LANGUAGE
export interface JAPILanguageService {
  getLocale(): string
  setLocale(locale: string): void
  translate(key: string, params?: string | string[], locale?: string): string
}

// API SERVICE -> POPUP
export interface JPopupService {
  popInfo(message: string): void
  popWarning(message: string): void
  popError(message: string): void
  popConfirm(message: string, confirmCallback: (() => any), cancelCallback?: (() => any)): void
}

// API SERVICE -> PROJECT
export interface JProject {
  id: number
  name: string
  description: string
  projection: JProjection
  initialRotation: number
  scaleMax: number
  scaleMin: number
  colorSelection: string
  colorBackground: string
  initialExtent: JBounds
}

// API SERVICE -> PROJECT
export interface JProjectService {
  load(project?: number): Promise<void>
  unload(): void
}

// API SERVICE -> LAYER
export interface JLayerService {
  getLayerAttributes(layerId: number): JLayerAttribute[]
  getLayerTree(): JLayerTree
  getRenderedLayerIds(): number[]
  exists(layerId: number): boolean
  getById(layerId: number): JLayerElement
  getName(layerId: number): string
  getDescription(layerId: number): string
  isVisible(layerId: number): boolean
  setVisible(layerId: number, visible: boolean): void
  setGroupOpen(nodeId: number, open: boolean): void
  removeLayer(layerId: number): void
}

export interface JLayerAttribute {
  id: string
  label: string
}

export enum LAYER_GEOMETRY {
  ANNOTATION = "ANNOTATION",
  CURVE = "CURVE",
  COMPLEX = "COMPLEX",
  POINT = "POINT",
  RASTER = "RASTER",
  SURFACE = "SURFACE",
  ELLIPSE = "ELLIPSE",
  NONE = "NONE"
}

export interface JLayerGeometry {
  type: LAYER_GEOMETRY
  editable: boolean
}

export interface JLayerElement {
  id: number,
  name: string,
  description: string
  initialVisibility: boolean
  visible: boolean
  isNode: boolean
  path: string
}

export interface JLayer extends JLayerElement {
  geometry: JLayerGeometry
  attributes: JLayerAttribute[]
}

export interface JLayerNode extends JLayerElement {
  open: boolean
  children: JLayerElement[]
}

export type JLayerTree = Array<JLayerElement>

export interface JProjection {
  code: string
  name: string
}

export interface JBounds {
  x1: number
  x2: number
  y1: number
  y2: number
}

export type JPoint = Array<number>

// API SERVICE -> USER
export interface JUserService {
  setSession(session: JSessionData): void
  login(login: string, password: string): Promise<JSessionData>
  logout(): Promise<void>
}

export interface JSessionData {
  sessionId: number
  user: JUserPublicData
}

export interface JUserPublicData {
  login: string,
  firstname: string,
  lastname: string,
  admin: boolean
}

// API COMPONENTS
export interface JAPIComponent {
  User: JAPIComponentItem<JUserCmp, JUserProps>
}

// P for react props
export interface JAPIComponentItem<C extends UIComponent, P> {
  create(containerId: string, props?: P): C
  destroy(containerId: string): void
  getInstance(containerId: string): C
}

// API COMPONENTS -> USER CMP
export interface JUserCmp extends React.Component<JUserProps, {}> { }
export interface JUserProps {
  user?: JUserState
}

// API EXTENSION
export interface JAPIExtention {
  Document?: JDocumentService
  register(extensionModel: JExtensionModel): void
  isRegistered(extensionId: string): boolean
  getAllRegistered(): string[]
  renderMouseOver(layerId: string, elementId: string): JExtensionMouseOver[]
  hasMouseOver(): boolean // @Deprecated should not be used in JMap Web NG
}

export interface JExtensionModel {
  id: string
  initFn: (options: any) => void
  storeReducer?: (reducerState: any, action: Action) => any
  serviceToExpose?: any
  renderMouseOver?(layerId: string, elementId: string): JExtensionMouseOver
}

export interface JExtensionMouseOver {
  html: string  // static html content
  js?: string   // javascript that will be evaluated after html rendered
}

// @Deprecated will be removed when old jmap will be retired
export interface JDocumentServiceUiController {
  createDocumentIcon(layerId: string, elementId: string): void
  displayElementDocuments(layerId: string, elementId: string): void
}

export interface JDocumentService {
  ui_controller: JDocumentServiceUiController // @Deprecated
  selectElement(layer: string, element: string): Promise<void>
  getElementDocuments(toSelectObjectId: JObjectId): Promise<JAllDocumentDescriptors>
  selectDocuments(descriptors: JAllDocumentDescriptors): void
  filter(filterValue: string | undefined): void

  getRichPreview(websiteUrl: string): void
}

export interface JAllDocumentDescriptors {
  documents: JDocumentDescriptor[]
  hyperlinks: JHyperLinkDescriptor[]
}

export interface JHyperLinkDescriptor {
  id: number
  url: string
  depositName: string
  depositId: number
  linkDescription: string
  linkImageLocation: string
  linkTitle: string
  linkFavicon: string
}

export interface JDocumentDescriptor {
  identifier: number
  title: string
  description: string
  fileName: string
  creation: number // timestamp
  depositName: string
}

export interface JAPIOptions {
  projectId: number,
  application?: JAPIApplicationOptions,
  restBaseUrl?: string
  session?: JSessionData
  implementation?: MAP_IMPLEMENTATION
}

// MIS
export interface JObjectId {
  project: string
  layer: string
  element: string
}

// GEOMETRY
export interface JGeoJsonFeature {
  id: string
  type: string
  geometry: JGeoJsonGeometry
  properties: { [ propertyName: string ]: any },
  bbox?: number[]
}

export interface JGeoJsonGeometry {
  type: string,
  coordinates: number[]
}
