import { Store } from "redux"
import { Point, LineString, Polygon, Feature, FeatureCollection } from "geojson"

export interface JCoreService extends JCoreMainService {
  Project: JProjectService
  Layer: JLayerService
  User: JUserService
  Map: JMapService
  Geolocation: JGeolocationService,
  Geometry: JGeometryService,
  MouseOver: JMouseOverService
  Form: JFormService
  Query: JQueryService
  Event: JEventService
  History: JHistoryService
  Extension: JExtensionService
}

export interface JCoreMainService {
  getVersion(): string
  getImplVersion(): string
  getDataStore(): Store<JCoreState> | undefined
  getRestUrl(): string
  openDocumentation(): void
  getOS(): JOperatingSystem
}

export interface JGeolocationService {
  isSupportedByBrowser(): boolean
  isEnabled(): boolean
  getMyLocation(): Promise<JLocation>
  goToMyLocation(options?: JPanAndZoomOptions): Promise<JLocation>
}

export interface JQueryService {
  getAllGroups(): JQueryGroup[]
  groupExist(groupId: number): boolean
  getQueriesByLayerId(layerId: number): JQuery[]
  getQueryByLayerId(layerId: number, queryId: number): JQuery
  getQueriesByGroupId(groupId: number): JQuery[]
  getQueryByGroupId(groupId: number, queryId: number): JQuery
  queryExist(groupId: number, queryId: number): boolean
  fetchFeatures(layerId: number, queryId: number, data: any): Promise<Feature[]>
}

export interface JEventService {
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
    projectsChange(listenerId: string, fn: (params: JProjectAllEventParams) => void): void
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
    mapLoad(listenerId: string, fn: (params: JMapEventLoadedParams) => void): void
    mapDestroy(listenerId: string, fn: () => void): void
    moveStart(listenerId: string, fn: (params: JMapEventParams) => void): void
    move(listenerId: string, fn: (params: JMapEventParams) => void):  void
    moveEnd(listenerId: string, fn: (params: JMapEventParams) => void): void
    mouseMove(listenerId: string, fn: (params: JMapEventLayerParams) => void): void
    mouseMoveOnLayer(listenerId: string, fn: (params: JMapEventFeaturesParams) => void): void
    mouseEnter(listenerId: string, fn: (params: JMapEventFeaturesParams) => void): void
    mouseLeave(listenerId: string, fn: (params: JMapEventLayerParams) => void): void
    click(listenerId: string, fn: (params: JMapEventLocationParams) => void): void
    zoomStart(listenerId: string, fn: (params: JMapEventZoomParams) => void): void
    zoom(listenerId: string, fn: (params: JMapEventZoomParams) => void): void
    zoomEnd(listenerId: string, fn: (params: JMapEventZoomParams) => void): void
    rotateStart(listenerId: string, fn: (params: JMapEventRotateParams) => void): void
    rotate(listenerId: string, fn: (params: JMapEventRotateParams) => void): void
    rotateEnd(listenerId: string, fn: (params: JMapEventRotateParams) => void): void
    pitchStart(listenerId: string, fn: (params: JMapEventPitchParams) => void): void
    pitch(listenerId: string, fn: (params: JMapEventPitchParams) => void): void
    pitchEnd(listenerId: string, fn: (params: JMapEventPitchParams) => void): void
  }
}

export interface JUserEventModule extends JEventModule {
  on: {
    sessionChanged(listenerId: string, fn: (params: JUserEventSessionChangedParams) => void): void
  }
}

export interface JCoreState {
  map: JMapState
  project: JProjectState
  layer: JLayerState
  user: JUserState
  photo: JPhotoState
  query: JQueryState
  geolocation: JGeolocationState
  external?: any
}

export interface JGeolocationState {
  isLocationDisplayed: boolean
  isEnabled: boolean
  isSupported: boolean
  currentLocation: JLocation | undefined
}

export interface JMapState {
  pitch: number
  bearing: number
  isLoaded: boolean
  hasFirstLoaded: boolean
  center: JLocation
  zoom: number
  scale: number
  boundaryBox: JBoundaryBox
  baseMap: string
  selection: JMapSelection
  inUseJMapLayerIds: number[]
  isScaleControlVisible: boolean
  scaleControlPosition: JMapPosition
}

export interface JProjectState {
  isLoading: boolean
  loadingError: boolean
  allProjects: JProject[]
  selectedProject: JProject
}

export interface JLayerState {
  isLoading: boolean
  loadingError: boolean
  tree: JLayerTree
  allById: { [treeElementId: string]: JLayerTreeElement }
  orderedLayerIds: number[]
}

export interface JPhotoState {
  selectedPhoto: number | undefined
  photos: JPhoto[]
  isPopupOpened: boolean
  isPopupInfoPanelOpened: boolean
}

export interface JQueryState {
  groups: JQueryGroup[]
  queriesByLayerId: { [ layerId: number ]: JQuery[] }
}

export type JHistoryListener = (oldValue: string | undefined, newValue: string | undefined) => void

export interface JFormService {
  getDefaultValues(form: JForm): { [ id: string ]: any }
  getPreparedData(form: JForm, data: any): any
  validateData(form: JForm, data: { [id: string]: any }): { [key: string]: string }
}

export interface JHistoryService {
  transformSearchParamsIntoHashParams(paramNames?: string[]): void
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
  isValidLocation(location: JLocation | undefined): boolean
  checkCircle(circle: JCircle): void
  checkPolygon(polygon: JPolygon): void
  checkLine(line: JLine): void
  checkBbox(bbox: JBoundaryBox): void
  isValidBbox(bbox: JBoundaryBox | undefined): boolean
  getArea(feature: Feature): number
  getLineLength(feature: Feature, units?: JGeometryUnit | JDistanceUnit): number
  getCentroid(feature: Feature | FeatureCollection): Feature<Point>
  getFeatureFromLine(line: JLine): Feature<LineString>
  getPolygonFeatureFromCircle(circle: JCircle, units?: JGeometryUnit): Feature<Polygon>
  getFeatureFromPolygon(polygon: JPolygon): Feature<Polygon>
  getBboxFromFeature(polygon: Feature): JBoundaryBox
  getBboxFromFeatures(features: Feature[]): JBoundaryBox
  getBboxFromPolygon(polygon: JPolygon): JBoundaryBox
  getBboxFromLine(line: JLine): JBoundaryBox
  getPolygonFeatureFromBbox(boundaryBox: JBoundaryBox): Polygon
  bboxIntersect(bb1: JBoundaryBox, bb2: JBoundaryBox): boolean
  polygonIntersect(feature1: Feature<Polygon>, feature2: Feature): boolean
  lineIntersect(feature1: Feature<LineString>, feature2: Feature): boolean
  getDistance(p1: number[] | JLocation, p2: number[] | JLocation): number // in km
  getFeatureCollection(features: Feature[] | JLocation[] | Array<[number, number]>): FeatureCollection
  getCircleFeature(center: number[] | JLocation, radius: number): Feature<Polygon> // radius in km
  getPolygonFeature(coordinates: Array<[number, number]>, closeCoordinates?: boolean): Feature<Polygon>
}

export interface JMapService {
  Interaction: JMapInteractionService
  Filter: JMapFilterService
  Selection: JMapSelectionService
  getMap(): any
  getMapJSLib(): any
  getDomContainerId(): string
  isMapCreated(): boolean
  isMapLoaded(): boolean
  getExtent(): JBoundaryBox
  getCenter(): { x: number, y: number }
  getZoom(): number
  getScale(): number
  isScaleControlVisible(): boolean
  setScaleControlVisibility(isVisible: boolean, position?: JMapPosition): void
  setScaleControlUnits(units: "imperial" | "metric" | "nautical"): void
  setScaleControlPosition(position: JMapPosition): void
  getScaleControlPosition(): JMapPosition
  isLayerRendered(layerId: number): boolean
  getLayersVisibilityStatus(): JMapLayersVisibilityStatus
  getLayersVisibilityStatusAsArray(): JMapLayerVisibilityStatus[]
  getInUseJMapLayerIds(): number[]
  getInUseJMapVectorLayerIds(): number[]
  getInUseJMapLayerBefore(layerId: number): number | undefined
  getInUseJMapLayerAfter(layerId: number): number | undefined
  getRenderedJMapLayerIds(): number[]
  getRenderedFeatures(layerId: number, filter?: JLocation | JBoundaryBox | JCircle): Feature[]
  getRenderedFeaturesAttributeValues(layerId: number, filter?: JLocation | JBoundaryBox | JCircle): JMapFeatureAttributeValues[]
  getAvailableBaseMaps(): string[]
  getPitch(): number
  getBearing(): number
  getBaseMap(): string
  setBaseMap(mapName: string): void
  setPitch(pitch: number): void
  setBearing(bearing: number): void
  panTo(center: JLocation, stopJMapEventPropagation?: boolean): void
  zoomTo(zoom: number, stopJMapEventPropagation?: boolean): void
  zoomToRect(bbox: JBoundaryBox, stopJMapEventPropagation?: boolean): void
  panAndZoomTo(center: JLocation, zoom: number, stopJMapEventPropagation?: boolean): void
  fitFeatures(features: Feature[], options?: JPanAndZoomOptions): void
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
  getSelectedFeatureIdsForLayer(layerId: number): string[]
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
  removeFeaturesFromLayerSelection(layerId: number, featureIds: string | string[]): void
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

export interface JProjectService {
  getAllProjects(): Promise<JProject[]>
  existProject(projectId: number): boolean
  getById(projectId: number): JProject
  projectIsLoaded(): boolean
  getId(): number
  getName(): string
  getDescription(): string
  getProjection(): JProjection
  getDistanceUnit(): JDistanceUnit
  getInitialRotation(): number
  getMinScale(): number
  getMaxScale(): number
  getSelectionColor(): string
  getBackgroundColor(): string
  getInitialExtent(): JBounds | null
  getBase64ImageThumbnail(): string
  load(projectIdOrName?: number | string): Promise<JProject>
  unload(): void
  loadAllProjectThumbnails(params?: JProjectLoadThumbnailsParams): Promise<void>
}

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

export interface JUserService {
  getToken(): string
  getFullName(): string
  getUsername(): string
  getLocale(): string
  getPreference(name: string): string | null
  hasPreference(name: string): boolean
  removePreference(name: string): string | null
  setPreference(name: string, value: string | undefined): void
  setDistanceUnit(projId: number, distanceUnit: JDistanceUnit): void
  setToken(token: string): Promise<JSessionData>
  login(login: string, password: string): Promise<JSessionData>
  logout(): Promise<void>
}

export interface JMouseOverService {
  renderForFeaturesAtLocation(containerId: string, location: JLocation): boolean // return true if has mouseover
  renderForFeaturesSelection(containerId: string, selection: JMapSelection): boolean // return true if has mouseover
  getMouseOverContent(selection: JMapSelection): JMouseOverContent | undefined
  processJSAndPhotosForContent(content: JMouseOverContent): void
}

export interface JExtensionService {
  Document?: JDocumentService
  register(extension: JCoreExtension): void
  isRegistered(extensionId: string): boolean
  getAllRegisteredIds(): string[]
  renderMouseOver(layer: JLayer, feature: Feature): JExtensionMouseOver[]
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
