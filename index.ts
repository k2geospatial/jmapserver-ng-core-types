import { Action, Store } from "redux"
import { Feature } from "geojson"

export type UIComponent = void | Element | React.Component

// API
export interface JAPI {
  External: JAPIExternal
  Event: JAPIEvent
  Data: JAPIData
  Application: JAPIApplication
  Component: JAPIComponent
  Service: JAPIService
}

// API EVENT

export interface JAPIEvent {
  Layer: JLayerEventModule
  Map: JMapEventModule
}

export type JEventFunction = (p1?: any, p2?: any) => void

export interface JEventListener {
  id: number
  fn: JEventFunction
}

export interface JEventModule {
  addListener: {
    [ eventId: string ]: (fn: JEventFunction) => number
  }
  removeListener(listenerId: number): void
}

export interface JLayerEventModule extends JEventModule {
  addListener: {
    onVisibilityChanged(fn: (layerElement: JLayerElement) => void): number
    onLayerDeleted(fn: (layerElement: JLayerElement) => void): number
  }
}

export interface JMapEventModule extends JEventModule {
  addListener: {
    onMapLoaded(fn: (map: any) => void): number
    onMapMoveStarted(fn: (map: any) => void): number
    onMapMoveEnded(fn: (map: any) => void): number
    onMapCliked(fn: (map: any, location: JLocation) => void): number
    onMapDestroyed(fn: () => void): number
  }
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
  getSelectedFeaturesForLayer(layerId: number): Feature[]
  getSelectedFeatureIdsForLayer(layerId: number): number[]
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

// API DATA -> APP
export interface JAppState {
  sidePanelOpen: boolean
}

// API DATA -> MAP
export interface JMapState {
  implementation: MAP_IMPLEMENTATION
  center: JLocation
  zoom: number
  boundaryBox: JBoundaryBox
  baseMap: string
  selection: JMapSelection
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

// API SERVICE -> MAP
export interface JMapService {
  Filter: JMapFilterService
  Selection: JMapSelectionService
  getMap(): any
  getAvailableBaseMaps(): string[]
  setBaseMap(mapName: string): void
  getRenderedFeatures(layerId: number, filter?: JLocation | JBoundaryBox): Feature[]
  getRenderedFeaturesAttributeValues(layerId: number, filter?: JLocation | JBoundaryBox): JMapFeatureAttributeValues[]
  panTo(center: JLocation): void
  zoomTo(zoom: number): void
  panAndZoomTo(center: JLocation, zoom: number): void
}

export interface JMapSelectionService {
  selectOnAllLayersAtLocation(location: JLocation): JMapSelection
  selectOnOneLayerAtLocation(layerId: number, location: JLocation): Feature[]
  setLayerSelection(layerId: number, features: Feature | Feature[]): void
  addFeaturesToLayerSelection(layerId: number, features: Feature | Feature[]): void
  removeFeaturesFromLayerSelection(layerId: number, featureIds: number | number[]): void
  clearSelection(layerId?: number): void
}

export interface JMapSelection {
  [ layerId: number ]: Feature[]
}

export interface JMapFilterService {
  applyAttributeValueEqualsOrIn(layerId: number, attributeId: string, attributeValue: any | any[]): string
  applySpatial(layerId: number, filterGeometry: JPolygon | JCircle): string
  removeByFilterId(filterId: string): void
  removeAllFilters(layerId: number): void
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
  deleteLayer(layerId: number): void
}

export interface JLayerNode extends JLayerElement {
  open: boolean
  children: JLayerElement[]
}

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

// API SERVICE -> USER
export interface JUserService {
  setSession(session: JSessionData): void
  login(login: string, password: string): Promise<JSessionData>
  logout(): Promise<void>
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

// API EXTERNAL
export interface JAPIExternal {
  Document?: JDocumentService
  register(externalModel: JExternalModel): void
  isRegistered(externalId: string): boolean
  getAllRegistered(): string[]
  renderMouseOver(layerId: string, elementId: string): JExternalMouseOver[]
  hasMouseOver(): boolean // @Deprecated should not be used in JMap Web NG
}

export interface JExternalModel {
  id: string
  initFn: (options: any) => void
  storeReducer?: (reducerState: any, action: Action) => any
  serviceToExpose?: any
  renderMouseOver?(layerId: string, elementId: string): JExternalMouseOver
}

export interface JExternalMouseOver {
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
  map?: JAPIMapOptions,
  restBaseUrl?: string
  session?: JSessionData
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
