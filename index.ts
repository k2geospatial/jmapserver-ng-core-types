import { Action, Store } from "redux"
import { Feature } from "geojson"
import { Point, LineString, Polygon } from "@turf/turf"

// API
export interface JAPI {
  Api: JAPIApi
  Service: JAPIService
  Component: JAPIComponent
  Event: JAPIEvent
  External: JAPIExternal
}

export interface JStoreGetterPhoto {
  isPopupOpened(): boolean
  isPopupInfoPanelOpened(): boolean
  getPhotoDescriptors(): JPhotoDescriptor[]
  getSelectedPhotoId(): number | undefined
}

// API Api

export interface JAPIApi {
  getVersion(): string
  getDataStore(): Store<JAPIState> | undefined
  getRestUrl(): string
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
  Project: JProjectEventModule
  User: JUserEventModule
}

export type JEventFunction = (params?: any) => void

export interface JEventListener {
  id: string
  fn: JEventFunction
}

export interface JEventModule {
  on: {
    [method: string]: (listenerId: string, fn: JEventFunction) => void
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
    layersChange(listenerId: string, fn: (params: JLayerEventChangeParams) => void): void
    thematicVisibilityChange(listenerId: string, fn: (params: JLayerEventThematicVisibilityParams) => void): void
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

export interface JUserEventModule extends JEventModule {
  on: {
    sessionChanged(listenerId: string, fn: (params: JUserEventSessionChangedParams) => void): void
  }
}

export interface JAPIState {
  map: JMapState
  project: JProjectState
  layer: JLayerState
  user: JUserState
  photo: JPhotoState
  external?: any
}

// API DATA -> MAP
export interface JMapState {
  implementation: MAP_IMPLEMENTATION
  isLoaded: boolean
  hasFirstLoaded: boolean
  center: JLocation
  zoom: number
  scale: number
  boundaryBox: JBoundaryBox
  baseMap: string
  selection: JMapSelection
  inUseJMapLayerIds: number[]
}

// API DATA -> PROJECT
export interface JProjectState {
  allProjects: JProject[]
  selectedProject: JProject
}

// API DATA -> LAYER
export interface JLayerState {
  tree: JLayerTree
  allById: { [treeElementId: string]: JLayerTreeElement }
}

// API DATA -> PHOTO
export interface JPhotoState {
  selectedPhoto: number | undefined
  photoDescriptors: JPhotoDescriptor[]
  isPopupOpened: boolean
  isPopupInfoPanelOpened: boolean
}

// API SERVICE
export interface JAPIService {
  History: JHistoryService
  Popup: JPopupService
  Project: JProjectService
  Layer: JLayerService
  User: JUserService
  Map: JMapService
  Geometry: JGeometryService,
  MouseOver: JMouseOverService
}

// API SERVICE -> HISTORY
export type JHistoryListener = (oldValue: string | undefined, newValue: string | undefined) => void

export interface JHistoryService {
  transformSearchParamsIntoHashParams(): void
  goBack(): void
  goForward(): void
  getHashParameter(parameterName: string): string
  getHashParameters(): { [key: string]: string }
  pushHashParameters(parameterName: string, parameterValue: string): void
  popHashParameters(parameterName: string): void
  onParameterChange(parameterName: string, fn: JHistoryListener): string
  removePropertyChangeListener(listenerId: string): void
}

export interface JGeometryService {
  checkLocation(location: JLocation): void
  checkCircle(circle: JCircle): void
  checkPolygon(polygon: JPolygon): void
  checkLine(line: JLine): void
  getArea(feature: Feature): number
  getLineLength(feature: Feature): number
  getCentroid(feature: Feature): Feature<Point>
  getLineFromJLine(jmapLine: JLine): Feature<LineString>
  getPolygonFromJCircle(jmapCircle: JCircle, units?: JGeometryUnit): Feature<Polygon>
  getPolygonFromJPolygon(jmapPolygon: JPolygon): Feature<Polygon>
  getBboxFromFeature(polygon: Feature): JBoundaryBox
  getBboxFromJPolygon(polygon: JPolygon): JBoundaryBox
  getBboxFromJLine(line: JLine): JBoundaryBox
  getPolygonFromBoundaryBox(boundaryBox: JBoundaryBox): Polygon
  intersectBoundaryBox(bb1: JBoundaryBox, bb2: JBoundaryBox): boolean
  intersectPolygon(feature1: Feature<Polygon>, feature2: Feature): boolean
  intersectLine(feature1: Feature<LineString>, feature2: Feature): boolean
}

// API SERVICE -> MAP
export interface JMapService {
  Interaction: JMapInteractionService
  Filter: JMapFilterService
  Selection: JMapSelectionService
  getMap(): any
  getMapJSLib(): any
  getImplementation(): MAP_IMPLEMENTATION
  getDomContainerId(): string
  isMapLoaded(): boolean
  getExtent(): JBoundaryBox
  getCenter(): { x: number, y: number }
  getZoom(): number
  getScale(): number
  isLayerRendered(layerId: number): boolean
  getLayersVisibilityStatus(): JMapLayersVisibilityStatus
  getLayersVisibilityStatusAsArray(): JMapLayerVisibilityStatus[]
  getInUseJMapLayerIds(): number[]
  getInUseJMapVectorLayerIds(): number[]
  getInUseJMapLayerBefore(layerId: number): number | undefined
  getInUseJMapLayerAfter(layerId: number): number | undefined
  getRenderedJMapLayerIds(): number[]
  getRenderedFeatures(layerId: number, filter?: JLocation | JBoundaryBox): Feature[]
  getRenderedFeaturesAttributeValues(layerId: number, filter?: JLocation | JBoundaryBox): JMapFeatureAttributeValues[]
  getAvailableBaseMaps(): string[]
  getBaseMap(): string
  setBaseMap(mapName: string): void
  panTo(center: JLocation): void
  zoomTo(zoom: number): void
  panAndZoomTo(center: JLocation, zoom: number): void
}

export interface JMapInteractionService {
  addInteractor(name: string, interactor: JMapInteractor, active?: boolean): void
  terminateInteractorById(interactorId: string): void
  getAllInteractorIds(): string[]
  getActiveInteractorId(): string
  activateInteractorById(interactorId: string, force?: boolean): void
}

export interface JMapSelectionService {
  getSelectedFeatures(): JMapSelection
  getSelectedFeaturesForLayer(layerId: number): Feature[]
  getSelectedFeatureIdsForLayer(layerId: number): number[]
  selectOnOneLayerAtLocation(layerId: number, location: JLocation, params?: JMapSelectionParams | undefined): Feature[]
  selectOnOneLayerFromCircle(layerId: number, circle: JCircle, params?: JMapSelectionParams | undefined): Feature[]
  selectOnOneLayerFromLine(layerId: number, line: JLine, params?: JMapSelectionParams | undefined): Feature[]
  selectOnOneLayerFromPolygon(layerId: number, polygon: JPolygon, params?: JMapSelectionParams | undefined): Feature[]
  selectOnAllLayersAtLocation(location: JLocation, params?: JMapSelectionParams | undefined): JMapSelection
  selectOnAllLayersFromCircle(circle: JCircle, params?: JMapSelectionParams | undefined): JMapSelection
  selectOnAllLayersFromLine(line: JLine, params?: JMapSelectionParams | undefined): JMapSelection
  selectOnAllLayersFromPolygon(polygon: JPolygon, params?: JMapSelectionParams | undefined): JMapSelection
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
  applySpatial(layerId: number, filterGeometry: JPolygon | JCircle): string
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
  getAllProjects(): Promise<JProject[]>
  getId(): number
  getName(): string
  getDescription(): string
  getProjection(): JProjection
  getInitialRotation(): number
  getMinScale(): number
  getMaxScale(): number
  getSelectionColor(): string
  getBackgroundColor(): string
  getInitialExtent(): JBounds | null
  load(project?: number): Promise<void>
  unload(): void
}

// API SERVICE -> LAYER
export interface JLayerService {
  getLayerTree(): JLayerTree
  getLayerTreeElementsById(): { [treeElementId: number]: JLayerTreeElement }
  getLayers(): JLayer[]
  getLayerIds(): number[]
  getLayerAttributes(layerId: number): JLayerAttribute[]
  exists(layerId: number): boolean
  getById(layerId: number): JLayerTreeElement
  getSelfOrChildren(layerId: number): JLayer[]
  getName(layerId: number): string
  getDescription(layerId: number): string
  isVisible(layerId: number, checkParentVisibility?: boolean): boolean
  isAllLayerParentsVisible(layerId: number): boolean
  getStyle(layerId: number): JLayerStyle
  getSimpleSelectionStyle(layerId: number): JLayerSimpleStyle
  getSelectionStyle(layerId: number): JLayerStyle | null
  getAllThematicsForLayer(layerId: number): JLayerThematic[]
  getThematicById(layerId: number, thematicId: number): JLayerThematic
  hasVisibleThematics(layerId: number): boolean
  getVisibleThematics(layerId: number): JLayerThematic[]
  setVisible(layerId: number, visible: boolean): void
  setLayerGroupExpansion(layerGroupId: number, isExpanded: boolean): void
  deleteLayer(layerId: number): void
  setThematicVisibility(layerId: number, thematicId: number, visibility: boolean): void
}

export interface JLayerGroup extends JLayerTreeElement {
  open: boolean
  children: JLayerTreeElement[]
}

// API SERVICE -> USER
export interface JUserService {
  getToken(): string
  getFullName(): string
  getUsername(): string
  getLocale(): string
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

// MISC
export interface JObjectId {
  project: string
  layer: string
  element: string
}
