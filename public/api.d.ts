/**
 * JMap is the entry point of our API.
 * 
 * All references to our API will start by JMap.
 * 
 * @example ```ts
 *  JMap.Documentation.open()
 * ```
 */
declare namespace JMap {
  /**
   * The API version.
   * 
   * @example ```ts
   * console.info(JMap.version)
   * // return a string that is the version like "1.0.1"
   * ``
   */
  const version: string
  /**
   * JMap.Service
   * 
   * This is where you can interact with the API.
   * It is split by features.
   */
  namespace Service {
    /**
     * JMap.Service.Api
     * 
     * API related methods.
     */
    namespace Api {
      /**
       * JMap.Service.Api.setMode
       * 
       *  Change the API mode. Mainly used when the application is launched.
       * 
       * @param mode JMap.Service.Api.setMode()
       * @example ```ts
       *  JMap.Service.Api.setMode("layer")
       * ```
       */
      function setMode(mode: API_MODE): void
    }
    /**
     * JMap.Service.Language
     * 
     * Language translation related methods.
     */
    namespace Language {
      /**
       * JMap.Service.Language.getLocale
       * 
       * Get the API current locale in use.
       * 
       * @example ```ts
       * JMap.Service.Language.getLocale() // return "EN", or "FR", or "ES", or "PT"
       * ```
       */
      function getLocale(): string
      /**
       * JMap.Service.Language.translate
       * 
       * Get the translation for a particular key.
       * 
       * @param key The translation key
       * @param params Some translation are dynamics and used runtime variables to construct the translation
       * @param locale If provided will return the translation for this locale, else the in use locale
       * @example ```ts
       *    
       * // return "Sauvegarder" if local in use is FR
       * JMap.Service.Language.translate("button.save")
       * 
       * // return "Save" even if local in use is FR
       * JMap.Service.Language.translate("button.save", "EN")
       * 
       * // return "4 visible layer(s) on map" if local in use is EN
       * JMap.Service.Language.translate("layer.count.visible", 4)
       * 
       * // return "L'utilisateur 'Jack' est admin" even if local in use is EN
       * JMap.Service.Language.translate("user.test", [ "admin", "Jack" ], "FR")
       * ```
       */
      function translate(key: string, params?: string | string[], locale?: string): string
    }
    /**
     * JMap.Service.Layer
     * 
     * Layer related methods.
     */
    namespace Layer {
      /**
       * JMap.Service.Layer.getLayerAttributes
       * 
       * Return all attribute descriptors for a particuler layer
       * 
       * @param layerId The JMap layer id
       * @example ```ts
       *  JMap.Service.Layer.getLayerAttributes()
       * ```
       */
      function getLayerAttributes(layerId: number): JLayerAttribute[]
      /**
       * JMap.Service.Layer.getLayerTree
       * 
       * Return the tree of layer elements. A layer element can be a tree node or a layer descriptor
       * 
       * @example ```ts
       *  JMap.Service.Layer.getLayerTree()
       * ```
       */
      function getLayerTree(): JLayerTree
      /**
       * JMap.Service.Layer.getRenderedLayerIds
       * 
       * Return the ids of the layers that are displayed on the map.
       * 
       * This function exists because MapBox cannot display all the layers defined by the project.
       * 
       * @example ```ts
       *  JMap.Service.Layer.getRenderedLayerIds()
       * ```
       */
      function getRenderedLayerIds(): number[]
      /**
       * JMap.Service.Layer.exists
       * 
       * Return true if the layer exists.
       * 
       * @param layerId The JMap layer id
       * @example ```ts
       * // return true if the layer with id=4 exists
       * JMap.Service.Layer.exists(4)
       * ```
       */
      function exists(layerId: number): boolean
      /**
       * JMap.Service.Layer.getById
       * 
       * Get the layer element in the tree (a node or a layer descriptor) and return it.
       * 
       * @throws Error if layer is not found
       * @param layerId The JMap layer id
       * @example ```ts
       * JMap.Service.Layer.getById(4)
       * ```
       */
      function getById(layerId: number): JLayerElement
      /**
       * JMap.Service.Layer.getName
       * 
       * Return the layer element name.
       * 
       * @throws Error if layer is not found
       * @param layerId The JMap layer id
       * @example ```ts
       * JMap.Service.Layer.getName(4)
       * ```
       */
      function getName(layerId: number): string
      /**
       * JMap.Service.Layer.getDescription
       * 
       * Return the layer element description.
       * 
       * @throws Error if layer is not found
       * @param layerId The JMap layer id
       * @example ```ts
       * JMap.Service.Layer.getDescription(4)
       * ```
       */
      function getDescription(layerId: number): string
      /**
       * JMap.Service.Layer.isVisible
       * 
       * Return true if the layer element is visible.
       * 
       * It is the user visibility, not the map visibility that depends on the scale.
       * 
       * @throws Error if layer is not found
       * @param layerId The JMap layer id
       * @example ```ts
       * JMap.Service.Layer.isVisible(4)
       * ```
       */
      function isVisible(layerId: number): boolean
      /**
       * JMap.Service.Layer.setVisible
       * 
       * Set the layer element visibility.
       * 
       * @throws Error if layer is not found
       * @param layerId The JMap layer id
       * @param visible if true will display, if false will hide the layer element
       * @example ```ts
       * JMap.Service.Layer.setVisible(4, false)
       * ```
       */
      function setVisible(layerId: number, visible: boolean): void
      /**
       * JMap.Service.Layer.setGroupOpen
       * 
       * Set the tree node open or closed.
       * 
       * @throws Error if layer is not found
       * @param layerId The JMap layer id
       * @param open if true will display, if false will hide the node
       * @example ```ts
       * JMap.Service.Layer.setGroupOpen(4, false)
       * ```
       */
      function setGroupOpen(nodeId: number, open: boolean): void
      /**
       * JMap.Service.Layer.removeLayer
       * 
       * Remove the layer in the data store and in the map.
       * It is not deleted server side, only in the browser.
       * 
       * @throws Error if layer is not found
       * @param layerId The JMap layer id
       * @example ```ts
       * JMap.Service.Layer.removeLayer(4)
       * ```
       */
      function removeLayer(layerId: number): void
      /**
       * JMap.Service.Layer.setThematicVisibility
       * 
       * Show or hide a layer's thematic on the map
       * 
       * @throws Error if layer or thematic are not found
       * @param layerId The JMap layer id
       * @example ```ts
       * // Display the thematic id=3 of layer id=7
       * JMap.Service.Layer.Thematic.setThematicVisibility(7, 3, true)
       * // Hide the thematic id=3 of layer id=7
       * JMap.Service.Layer.Thematic.setThematicVisibility(7, 3, false)
       * ```
       */
      function setThematicVisibility(layerId: number, thematicId: number, visibility: boolean): void
    }
    /**
       * JMap.Service.Map
       * 
       * Map related features
       */
    namespace Map {
      /**
       * JMap.Service.Map.getMap
       * 
       * Return the map implementation : MapBox or OpenLayer map.
       * 
       * @example ```ts
       * JMap.Service.Map.getMap()
       * ```
       */
      function getMap(): any
      /**
       * JMap.Service.Map.getMapJSLib
       * 
       * Return the map implementation librairie : MapBox or OpenLayer.
       * 
       * Usefull to be able to create library object, like a Mapbox popup by example.
       * 
       * @example ```ts
       * // Create a MapBox popup, require the map implementation to be MapBox
       * const popup: Popup = new (JMap.Service.Map.getMapJSLib() as any).Popup({
       *   closeButton: false,
       *   closeOnClick: false
       * })
       * ```
       */
      function getMapJSLib(): any
      /**
       * JMap.Service.Map.getLayersVisibilityStatus
       * 
       * Return the layer visibility status. 
       * 
       * @example ```ts
       * JMap.Service.Map.getLayersVisibilityStatus()
       * ```
       */
      function getLayersVisibilityStatus(): JMapLayersVisibilityStatus
      /**
       * JMap.Service.Map.getInUseJMapLayerIds
       * 
       * Return all layer ids that are displayed by the map.
       * 
       * @example ```ts
       * JMap.Service.Map.getInUseJMapLayerIds()
       * ```
       */
      function getInUseJMapLayerIds(): number[]
      /**
       * JMap.Service.Map.getInUseJMapVectorLayerIds
       * 
       * Return all vector layer ids that are displayed by the map.
       * 
       * @example ```ts
       * JMap.Service.Map.getInUseJMapVectorLayerIds()
       * ```
       */
      function getInUseJMapVectorLayerIds(): number[]
      /**
       * JMap.Service.Map.getInUseJMapLayerBefore
       * 
       * Return the layer id that is ordered before the layer id provided in argument.
       * 
       * @param layerId The JMap layer id
       * @example ```ts
       * JMap.Service.Map.getInUseJMapLayerBefore()
       * ```
       */
      function getInUseJMapLayerBefore(layerId: number): number | undefined
      /**
       * JMap.Service.Map.getInUseJMapLayerAfter
       * 
       * Return the layer id that is ordered after the layer id provided in argument.
       * 
       * @param layerId The JMap layer id
       * @example ```ts
       * JMap.Service.Map.getInUseJMapLayerAfter()
       * ```
       */
      function getInUseJMapLayerAfter(layerId: number): number | undefined
      /**
       * JMap.Service.Map.getRenderedFeatures
       * 
       * Return rendered features for the layer.
       * 
       * @param layerId The JMap layer id
       * @param filter You can pass a location or a boundary box to get only the features that intersect it
       * @example ```ts
       * JMap.Service.Map.getRenderedFeatures(4)
       * JMap.Service.Map.getRenderedFeatures(4, { x: 45.54, y: 65.43 })
       * JMap.Service.Map.getRenderedFeatures(4, { sw: { x: 45.54, y: 65.43 }, ne: { x: 48.54, y: 70.43 }})
       * ```
       */
      function getRenderedFeatures(layerId: number, filter?: JLocation | JBoundaryBox): any[]
      /**
       * JMap.Service.Map.getRenderedFeaturesAttributeValues
       * 
       * Return rendered features attributes for the layer.
       * 
       * @param layerId The JMap layer id
       * @param filter You can pass a location or a boundary box to get only the features that intersect it
       * @example ```ts
       * JMap.Service.Map.getRenderedFeaturesAttributeValues(4)
       * JMap.Service.Map.getRenderedFeaturesAttributeValues(4, { x: 45.54, y: 65.43 })
       * JMap.Service.Map.getRenderedFeaturesAttributeValues(4, { sw: { x: 45.54, y: 65.43 }, ne: { x: 48.54, y: 70.43 }})
       * ```
       */
      function getRenderedFeaturesAttributeValues(layerId: number, filter?: JLocation | JBoundaryBox): JMapFeatureAttributeValues[]
      /**
       * JMap.Service.Map.getAvailableBaseMaps
       * 
       * Return the available basemap names that can be used with method setBaseMap.
       * 
       * @example ```ts
       * // For mapbox return [ "light", "streets", "satellite", "dark", "outdoors", "none" ]
       * JMap.Service.Map.getAvailableBaseMaps()
       * ```
       */
      function getAvailableBaseMaps(): string[]
      /**
       * JMap.Service.Map.setBaseMap
       * 
       * Apply the basemap on the map.
       * 
       * @param mapName The name of the basemap, use JMap.Service.Map.getAvailableBaseMaps() to get available basemap names
       * @example ```ts
       * JMap.Service.Map.setBaseMap("streets")
       * ```
       */
      function setBaseMap(mapName: string): void
      /**
       * JMap.Service.Map.panTo
       * 
       * Move and center the map to the location
       * 
       * @param center The location where the map will be centered
       * @example ```ts
       * JMap.Service.Map.panTo({ x: 45.34, y: 65.87 })
       * ```
       */
      function panTo(center: JLocation): void
      /**
       * JMap.Service.Map.zoomTo
       * 
       * Zoom or unzoom the map
       * 
       * @param zoom The zoom level to apply
       * @example ```ts
       * JMap.Service.Map.zoomTo(4.45)
       * ```
       */
      function zoomTo(zoom: number): void
      /**
       * JMap.Service.Map.panAndZoomTo
       * 
       * Move and zoom (or unzoom) the map
       * 
       * @param center The location where the map will be centered
       * @param zoom The zoom level to apply
       * @example ```ts
       * JMap.Service.Map.panAndZoomTo({ x: 45.34, y: 65.87 }, 5)
       * ```
       */
      function panAndZoomTo(center: JLocation, zoom: number): void
      /**
       * JMap.Service.Map.Interaction
       * 
       * Map interaction related methods
       */
      namespace Interaction {
        /**
         * JMap.Service.Map.Interaction.addInteractor
         * 
         * Add a map interactor.
         * 
         * @param name The new interactor name
         * @param interactor The map interactor descriptor
         * @param active If true will activate the new interactor
         * @example ```ts
         * JMap.Service.Map.Interactor.addInteractor("custom-selection", { ...mapInteractor }, true)
         * ```
         */
        function addInteractor(name: string, interactor: JMapInteractor, active?: boolean): void
        /**
         * JMap.Service.Map.Interaction.terminateInteractorById
         * 
         * Terminate the map interactor.
         * 
         * @param interactorId The interactor to terminate
         * @example ```ts
         * JMap.Service.Map.Interactor.terminateInteractorById("custom-selection")
         * ```
         */
        function terminateInteractorById(interactorId: string): void
        /**
         * JMap.Service.Map.Interaction.getAllInteractorDescriptors
         * 
         * Return all registered interactor descriptors.
         * 
         * @example ```ts
         * JMap.Service.Map.Interactor.getAllInteractorDescriptors()
         * ```
         */
        function getAllInteractorDescriptors(): JMapInteractorDescriptor[]
        /**
         * JMap.Service.Map.Interaction.getActiveInteractorDescriptor
         * 
         * Return the actived interactor descriptor.
         * 
         * @example ```ts
         * JMap.Service.Map.Interactor.getActiveInteractorDescriptor()
         * ```
         */
        function getActiveInteractorDescriptor(): JMapInteractorDescriptor
        /**
         * JMap.Service.Map.Interaction.activateInteractorById
         * 
         * Activate a registered map interactor.
         * 
         * @param interactorId The interactor to activate
         * @example ```ts
         * JMap.Service.Map.Interactor.activateInteractorById("layer")
         * ```
         */
        function activateInteractorById(interactorId: string): void
      }
      /**
       * JMap.Service.Map.Filter
       * 
       * Map filtering related methods
       */
      namespace Filter {
        /**
         * JMap.Service.Map.Filter.applyHasAttribute
         * 
         * For a layer, show on map only the features that has the attribute defined in their properties, even if the property is defined but value is undefined.
         * 
         * @param layerId The JMap layer id
         * @param attributeId The JMap attribute id
         * @example ```ts
         * JMap.Service.Map.Interactor.applyHasAttribute(4, "name")
         * ```
         */
        function applyHasAttribute(layerId: number, attributeId: string): string
        /**
         * JMap.Service.Map.Filter.applyHasNotAttribute
         * 
         * For a layer, show on map only the features that hasn't the attribute defined in their properties.
         * If the property is defined but value is undefined, the feature will not be shown.
         * 
         * @param layerId The JMap layer id
         * @param attributeId The JMap attribute id
         * @example ```ts
         * JMap.Service.Map.Interactor.applyHasNotAttribute(4, "name")
         * ```
         */
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
        function selectOnAllLayersAtLocation(location: JLocation): JMapSelection
        function selectOnOneLayerAtLocation(layerId: number, location: JLocation): any[]
        function setLayerSelection(layerId: number, features: any | any[]): void
        function addFeaturesToLayerSelection(layerId: number, features: any | any[]): void
        function removeFeaturesFromLayerSelection(layerId: number, featureIds: number | number[]): void
        function clearSelection(layerId?: number): void
      }
    }
    namespace MouseOver {
      function renderForFeaturesAtLocation(containerId: string, location: JLocation): boolean // return true if has mouseover
      function renderForFeaturesSelection(containerId: string, selection: JMapSelection): boolean // return true if has mouseover
      function getMouseOverContent(selection: JMapSelection): JMouseOverContent | undefined
      function processJSAndPhotosForContent(content: JMouseOverContent): void
    }
    namespace Project {
      function setId(projectId: string): void
    }
    namespace User {
      function setSessionId(sessionId: string): void
      function login(login: string, password: string): Promise<JLoginData>
      function logout(): Promise<void>
    }
  }
  namespace Application {
    function needToStart(): boolean
    function getContainerId(): string
    function getInstance(): React.Component<any, React.ComponentState> | Element | void
    function start(containerId?: string, initOptions?: JAPIApplicationOptions): void
  }
  namespace Component {
    namespace User {
      function create(containerId: string, options?: JUserCmpProps): void
      function destroy(containerId: string): void
    }
  }
  namespace Data {
    function getStore(): any | undefined
    namespace Api {
      function gerRestUrl(): string
      function getMode(): API_MODE
      function getAllMode(): API_MODE[]
      function getMapImplementation(): MAP_IMPLEMENTATION
    }
    namespace Project {
      function getId(): string
    }
    namespace Layer {
      function getLayerTree(): JLayerTree
      function getRenderedLayers(): JLayer[]
      function exists(layerId: number): boolean
      function getById(layerId: number): JLayerElement
      function getSelfOrChildren(layerId: number): JLayer[]
      function getName(layerId: number): string
      function getDescription(layerId: number): string
      function isVisible(layerId: number): boolean
      function getStyle(layerId: number): JLayerStyle
      function getSimpleSelectionStyle(layerId: number): JLayerSimpleStyle
      function getSelectionStyle(layerId: number): JLayerStyle | null
      function getThematicById(layerId: number, thematicId: number): JLayerThematic
      /**
       * JMap.Data.Layer.getAllThematicsForLayer
       * 
       * Return all layer's thematics
       * 
       * @throws Error if layer is not found
       * @param layerId The JMap layer id
       * @example ```ts
       * JMap.Data.Layer.getAllThematicsForLayer(4)
       * ```
       */
      function getAllThematicsForLayer(layerId: number): JLayerThematic[]
      function hasVisibleThematics(layerId: number): boolean
      function getVisibleThematics(layerId: number): JLayerThematic[]
    }
    namespace Map {
      function getImplementation(): MAP_IMPLEMENTATION
      function isMapLoaded(): boolean
      function getCenter(): JLocation
      function getZoom(): number
      function getScale(): number
      function getBaseMap(): string
      function getSelectedFeatures(): JMapSelection
      function getSelectedFeaturesForLayer(layerId: number): any[]
      function getSelectedFeatureIdsForLayer(layerId: number): number[]
    }
    namespace User {
      function getLocale(): string
      function getToken(): string
      function getIdentity(): JUserIdentity
      function getLogin(): string
    }
    namespace Selection {
      function getSelection(): JElementSelection
    }
    namespace Photo {
      function isPopupOpened(): boolean
      function isInfoPanelOpened(): boolean
      function getPhotoDescriptors(): JPhotoDescriptor[]
      function getSelectedPhotoId(): number | undefined
    }
  }
  namespace Event {
    namespace Project {
      namespace on {
        function projectChange(listenerId: string, fn: (params: JProjectEventParams) => void): void
      }
      function activate(listenerId: string): void
      function deactivate(listenerId: string): void
      function remove(listenerId: string): void
    }
    namespace Layer {
      namespace on {
        function visibilityChange(listenerId: string, fn: (params: JLayerEventParams) => void): void
        function layerDeletion(listenerId: string, fn: (params: JLayerEventParams) => void): void
      }
      function activate(listenerId: string): void
      function deactivate(listenerId: string): void
      function remove(listenerId: string): void
    }
    namespace Map {
      namespace on {
        function mapLoad(listenerId: string, fn: (params: JMapEventImplementationParams) => void): void
        function mapDestroy(listenerId: string, fn: () => void): void
        function moveStart(listenerId: string, fn: (params: JMapEventParams) => void): void
        function moveEnd(listenerId: string, fn: (params: JMapEventParams) => void): void
        function mouseMove(listenerId: string, fn: (params: JMapEventLayerParams) => void): void
        function mouseMoveOnLayer(listenerId: string, fn: (params: JMapEventFeaturesParams) => void): void
        function mouseEnter(listenerId: string, fn: (params: JMapEventFeaturesParams) => void): void
        function mouseLeave(listenerId: string, fn: (params: JMapEventParams) => void): void
        function click(listenerId: string, fn: (params: JMapEventLocationParams) => void): void
      }
      function activate(listenerId: string): void
      function deactivate(listenerId: string): void
      function remove(listenerId: string): void
    }
  }
  namespace External {
    function register(extensionModel: JExtensionModel): void
    function isRegistered(extensionId: string): boolean // ex : JMap.Extension.isRegistered("Document")
    function getAllRegistered(): string[]
    function renderMouseOver(layerId: string, elementId: string): JExtensionMouseOver[]

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
  namespace Documentation {
    function open(): void
  }
}
