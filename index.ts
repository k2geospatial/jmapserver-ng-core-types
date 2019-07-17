import { Action, Store } from "redux"
import { Feature } from "geojson"

// API
export interface JAPI {
  Api: JAPIApi
  Data: JAPIData
  Service: JAPIService
  Component: JAPIComponent
  Application: JAPIApplication
  Event: JAPIEvent
  External: JAPIExternal
}

// API Api

export interface JAPIApi {
  getVersion(): string
  openDocumentation(): void
}

// API COMPONENT

export interface JAPIComponent {
  User: JAPIComponentItem<{}>
}

export interface JAPIComponentItem<P> {
  create(containerId: string, options?: P): void
  destroy(containerId: string): void
}

// API EVENT

export interface JAPIEvent {
  Layer: JLayerEventModule
  Map: JMapEventModule
}

export type JEventFunction = (params?: any) => void

export interface JEventListener {
  id: string
  fn: JEventFunction
}

export interface JEventModule {
  on: {
    [ method: string ]: (listenerId: string, fn: JEventFunction) => void
  }
  activate(listenerId: string): void
  deactivate(listenerId: string): void
  remove(listenerId: string): void
}

export interface JProjectEventModule extends JEventModule {
  on: {
    projectChange(listenerId: string, fn: (params: JProjectEventParams) => void): void
  }
}

export interface JLayerEventModule extends JEventModule {
  on: {
    visibilityChange(listenerId: string, fn: (params: JLayerEventParams) => void): void
    layerDeletion(listenerId: string, fn: (params: JLayerEventParams) => void): void
  }
}

export interface JMapEventModule extends JEventModule {
  on: {
    mapLoad(listenerId: string, fn: (params: JMapEventImplementationParams) => void): void
    mapDestroy(listenerId: string, fn: () => void): void
    moveStart(listenerId: string, fn: (params: JMapEventParams) => void): void
    moveEnd(listenerId: string, fn: (params: JMapEventParams) => void): void
    mouseMove(listenerId: string, fn: (params: JMapEventLayerParams) => void): void
    mouseMoveOnLayer(listenerId: string, fn: (params: JMapEventFeaturesParams) => void): void
    mouseEnter(listenerId: string, fn: (params: JMapEventFeaturesParams) => void): void
    mouseLeave(listenerId: string, fn: (params: JMapEventLayerParams) => void): void
    click(listenerId: string, fn: (params: JMapEventLocationParams) => void): void
  }
}

// API DATA
export interface JAPIData {
  getStore(): Store<JAPIState> | undefined
  Api: JStoreGetterApi
  Application: JStoreGetterApp
  Project: JStoreGetterProject
  Layer: JStoreGetterLayer
  Map: JStoreGetterMap
  User: JStoreGetterUser
  Photo: JStoreGetterPhoto
}

export interface JStoreGetterApi {
  getRestUrl(): string
  getMode(): API_MODE
  getAllMode(): API_MODE[]
  getMapImplementation(): MAP_IMPLEMENTATION
}

export interface JStoreGetterApp {
  isSidePanelOpen(): boolean
  getDomContainerId(): string
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
  getInitialExtent(): JBounds | null
}

export interface JStoreGetterLayer {
  getLayerTree(): JLayerTree
  getLayerTreeElementsById(): { [ layerElementId: number ]: JLayerElement }
  getRenderedLayers(): JLayer[]
  exists(layerId: number): boolean
  getById(layerId: number): JLayerElement
  getSelfOrChildren(layerId: number): JLayer[]
  getName(layerId: number): string
  getDescription(layerId: number): string
  isVisible(layerId: number): boolean
  getStyle(layerId: number): JLayerStyle
  getSimpleSelectionStyle(layerId: number): JLayerSimpleStyle
  getSelectionStyle(layerId: number): JLayerStyle | null
  getAllThematicsForLayer(layerId: number): JLayerThematic[]
  getThematicById(layerId: number, thematicId: number): JLayerThematic
  hasVisibleThematics(layerId: number): boolean
  getVisibleThematics(layerId: number): JLayerThematic[]
}

export interface JStoreGetterMap {
  getDomContainerId(): string
  getImplementation(): MAP_IMPLEMENTATION
  isMapLoaded(): boolean
  getCenter(): { x: number, y: number }
  getZoom(): number
  getScale(): number
  getBaseMap(): string
  getSelectedFeatures(): JMapSelection
  getSelectedFeaturesForLayer(layerId: number): Feature[]
  getSelectedFeatureIdsForLayer(layerId: number): number[]
}

export interface JStoreGetterUser {
  getToken(): string
  getFirstName(): string
  getLastName(): string
  getLogin(): string
}

export interface JStoreGetterPhoto {
  isPopupOpened(): boolean
  isPopupInfoPanelOpened(): boolean
  getPhotoDescriptors(): JPhotoDescriptor[]
  getSelectedPhotoId(): number | undefined
}

export interface JAPIState {
  api: JAPIOwnState
  app: JAppState
  map: JMapState
  project: JProjectState
  layer: JLayerState
  user: JUserState
  photo: JPhotoState
  external?: any
}

export interface JAPIOwnState {
  restUrl: string,
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
  isLoaded: boolean
  center: JLocation
  zoom: number
  scale: number
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

// API DATA -> PHOTO
export interface JPhotoState {
  selectedPhoto: number | undefined
  photoDescriptors: JPhotoDescriptor[]
  isPopupOpened: boolean
  isPopupInfoPanelOpened: boolean
}

// API APPLICATION
export interface JAPIApplication {
  startIfNeeded(): void
  start(containerId?: string): void
  SidePanel: JSidePanelController
}

// API APPLICATION -> SIDE_PANEL
export interface JSidePanelController {
  setVisible(open: boolean): void
  open(): void
  close(): void
}

// API SERVICE
export interface JAPIService {
  Api: JAPIOwnService
  Popup: JPopupService
  Language: JAPILanguageService
  Project: JProjectService
  Layer: JLayerService
  User: JUserService
  Map: JMapService
  MouseOver: JMouseOverService
}

// API SERVICE -> API
export interface JAPIOwnService {
  setMode(mode: API_MODE): void
}

// API SERVICE -> MAP
export interface JMapService {
  Interaction: JMapInteractionService
  Filter: JMapFilterService
  Selection: JMapSelectionService
  getMap(): any
  getMapJSLib(): any
  getLayersVisibilityStatus(): JMapLayersVisibilityStatus
  getInUseJMapLayerIds(): number[]
  getInUseJMapVectorLayerIds(): number[]
  getInUseJMapLayerBefore(layerId: number): number | undefined
  getInUseJMapLayerAfter(layerId: number): number | undefined
  getRenderedFeatures(layerId: number, filter?: JLocation | JBoundaryBox): Feature[]
  getRenderedFeaturesAttributeValues(layerId: number, filter?: JLocation | JBoundaryBox): JMapFeatureAttributeValues[]
  getAvailableBaseMaps(): string[]
  setBaseMap(mapName: string): void
  panTo(center: JLocation): void
  zoomTo(zoom: number): void
  panAndZoomTo(center: JLocation, zoom: number): void
}

export interface JMapInteractionService {
  addInteractor(name: string, interactor: JMapInteractor, active?: boolean): void
  terminateInteractorById(interactorId: string): void
  getAllInteractorDescriptors(): JMapInteractorDescriptor[]
  getActiveInteractorDescriptor(): JMapInteractorDescriptor
  activateInteractorById(interactorId: string, force?: boolean): void
}

export interface JMapSelectionService {
  selectOnAllLayersAtLocation(location: JLocation): JMapSelection
  selectOnOneLayerAtLocation(layerId: number, location: JLocation): Feature[]
  setLayerSelection(layerId: number, features: Feature | Feature[]): void
  addFeaturesToLayerSelection(layerId: number, features: Feature | Feature[]): void
  removeFeaturesFromLayerSelection(layerId: number, featureIds: number | number[]): void
  clearSelection(layerId?: number): void
}

export interface JMapFilterService {
  applyHasAttribute(layerId: number, attributeId: string): string
  applyHasNotAttribute(layerId: number, attributeId: string): string
  applyAttributeValueEqualTo(layerId: number, attributeId: string, attributeValue: any): string
  applyAttributeValueBetween(layerId: number, attributeId: string, start: any, end: any): string
  applyAttributeValueNotEqualTo(layerId: number, attributeId: string, attributeValue: any): string
  applyAttributeValueGreaterThan(layerId: number, attributeId: string, attributeValue: any): string
  applyAttributeValueGreaterOrEqualsTo(layerId: number, attributeId: string, attributeValue: any): string
  applyAttributeValueLowerThan(layerId: number, attributeId: string, attributeValue: any): string
  applyAttributeValueLowerOrEqualsTo(layerId: number, attributeId: string, attributeValue: any): string
  applyAttributeValueIn(layerId: number, attributeId: string, attributeValues: any[]): string
  applyAttributeValueNotIn(layerId: number, attributeId: string, attributeValues: any[]): string
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
  setThematicVisibility(layerId: number, thematicId: number, visibility: boolean): void
}

export interface JLayerNode extends JLayerElement {
  open: boolean
  children: JLayerElement[]
}

// API SERVICE -> USER
export interface JUserService {
  setSession(session: JSessionData): void
  login(login: string, password: string): Promise<JSessionData>
  logout(): Promise<void>
}

// API SERVICE -> MOUSE_OVER
export interface JMouseOverService {
  renderForFeaturesAtLocation(containerId: string, location: JLocation): boolean // return true if has mouseover
  renderForFeaturesSelection(containerId: string, selection: JMapSelection): boolean // return true if has mouseover
  getMouseOverContent(selection: JMapSelection): JMouseOverContent | undefined
  processJSAndPhotosForContent(content: JMouseOverContent): void
}

// API EXTERNAL
export interface JAPIExternal {
  Document?: JDocumentService
  register(externalModel: JExternalModel): void
  isRegistered(externalId: string): boolean
  getAllRegistered(): string[]
  renderMouseOver(layer: JLayer, feature: Feature): JExternalMouseOver[]
}

export interface JExternalModel {
  id: string
  initFn: (options: any) => void
  storeReducer?: (reducerState: any, action: Action) => any
  serviceToExpose?: any
  renderMouseOver?(layer: JLayer, feature: Feature): JExternalMouseOver
}

export interface JDocumentService {
  selectElement(layer: string, element: string): Promise<void>
  getElementDocuments(toSelectObjectId: JObjectId): Promise<JAllDocumentDescriptors>
  selectDocuments(descriptors: JAllDocumentDescriptors): void
  filter(filterValue: string | undefined): void
  getRichPreview(webSiteUrl: string): void
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
