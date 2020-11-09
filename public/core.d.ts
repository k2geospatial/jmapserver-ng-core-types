/**
 * This is the JMap Web Core library API documentation.
 * 
 * Examples are availables <a href="https://doc.k2geospatial.com/jmap/doc/ng_dev/examples.html" target="_blank">here</a>.
 * 
 * You can customize JMap Web Core library by providing startup options ([[JCoreOptions]]).
 * 
 * After being loaded, the **JMap Web Core** library is accessible through the namespace **JMap** in the javascript console. For example :
 * ```ts
 * // returns the JMap Web Core version.
 * JMap.getVersion()
 * ```
 */
declare namespace JMap {

  /**
   * **JMap.getVersion**
   * 
   * Returns the JMap Web Core library build version.
   * 
   * @example ```ts
   * 
   * // returns the build version, for example "1.0.1"
   * JMap.getVersion()
   * ```
   */
  function getVersion(): string

  /**
   * **JMap.getApiVersion**
   * 
   * Returns the JMap Web Core library API (typescript interfaces) version.
   * 
   * For the same API version, multiple implementation versions can exist.
   * 
   * @example ```ts
   * 
   * // returns the API version, for example "1.0.1"
   * JMap.getApiVersion()
   * ```
   */
  function getApiVersion(): string

  /**
   * **JMap.getDataStore**
   * 
   * Returns the JMap library redux data store, an instance of Redux (https://redux.js.org/).
   *
   * @example ```ts
   * 
   * // returns the JMap Web Core library Redux store
   * const reduxStore = JMap.getDataStore()
   * reduxStore.dispatch(...)
   * ```
   */
  function getDataStore(): any | undefined

  /**
   * **JMap.getRestUrl**
   * 
   * Returns the in use JMap server Rest API url.
   *
   * This is the url on which the JMap Web Core library makes all of its ajax calls.
   * 
   * @example ```ts
   * 
   * // returns the JMap server rest URL in use
   * JMap.getRestUrl()
   * ```
   */
  function getRestUrl(): string

  /**
  * **JMap.openDocumentation**
  * 
  * Open JMap Web Core library interface online documentation, in a new tab.
  * 
  * @example ```ts
  * 
  * // open JMap Web Core library online JS API documentation, in a new tab
  * JMap.openDocumentation()
  * ```
  */
  function openDocumentation(): void

  /**
  * **JMap.getOS**
  * 
  * Return the operating system on witch JMap Web Core library is running client side.
  * 
  * Possible values returned are defined here [[JOperatingSystem]].
  * 
  * @example ```ts
  * 
  * // Return "mac" if the OS is Mac OS
  * JMap.getOS()
  * ```
  */
  function getOS(): JOperatingSystem

  /**
   * **JMap.Geolocation**
   * 
   * This is where you can find geolocation relative methods
   */
  namespace Geolocation {
    
    /**
     * **JMap.Geolocation.isSupportedByBrowser**
     * 
     * Returns true if the browser support the geolocation
     * 
     * @example ```ts
     * 
     * // return true if the browser supports the geolocation
     * JMap.Geolocation.isSupportedByBrowser()
     * ```
     */
    function isSupportedByBrowser(): boolean
    
    /**
     * **JMap.Geolocation.isEnabled**
     * 
     * Returns false if the JMap Web Core library has been started with option that disable the geolocation.
     * 
     * See startup parameter [[JCoreOption.geolocationEnabled]].
     * 
     * @example ```ts
     * 
     * // return false if geolocation is disabled
     * JMap.Geolocation.isEnabled()
     * ```
     */
    function isEnabled(): boolean
    
    /**
     * **JMap.Geolocation.getMyLocation**
     * 
     * Returns the user current location if promise succeed.
     * 
     * @throws if browser doesn't support geolocation, if geolocation is disabled, if an unexpected error occurs while getting location from browser
     * @example ```ts
     * 
     * // return a promise that return the user current location if succeed
     * JMap.Geolocation.getMyLocation()
     *    .then(location => console.info("My location is ", location))
     *    .error(error => console.error("Cannot get my location : ", error))
     * ```
     */
    function getMyLocation(): Promise<JLocation>
    
    /**
     * **JMap.Geolocation.goToMyLocation**
     * 
     * Returns the user current location if promise succeed, and pan and zoom to this location.
     * 
     * @throws if browser doesn't support geolocation, if geolocation is disabled, if an unexpected error occurs while getting location from browser
     * @param options pan and zoom options
     * @example ```ts
     * 
     * // pan and zoom to the user location
     * JMap.Geolocation.goToMyLocation()
     *    .then(location => console.info("Paned and zommed to user location ", location))
     *    .error(error => console.error("Cannot get my location : ", error))
     * ```
     */
    function goToMyLocation(options?: JPanAndZoomOptions): Promise<JLocation>
  }

  /**
   * **JMap.History**
   * 
   * This is where you can find browser history relative methods
   */
  namespace History {

    /**
     * **JMap.History.transformSearchParamsIntoHashParams**
     * 
     * Get all search params in the url and transform them into hash params
     * without refreshing the page.
     * 
     * @param paramNames list of params to transform, if no params will transform all serach params
     * @example ```ts
     * 
     * // Ex. url is = ***http://localhost:8080/services/jmap?projectId=0&myvar=test***
     *
     * JMap.History.transformSearchParamsIntoHashParams()
     * 
     * // The url is now = ***http://localhost:8080/services/jmap#?projectId=0&myvar=test***
     * ```
     */
    function transformSearchParamsIntoHashParams(paramNames?: string[]): void
    
    /**
     * **JMap.History.goBack**
     * 
     * The same as clicking the back button of the browser
     * 
     * @example ```ts
     * 
     * // go to previous page
     * JMap.History.goBack()
     * ```
     */
    function goBack(): void
    
    /**
     * **JMap.History.goForward**
     * 
     * The same as clicking the forward button of the browser
     * 
     * @example ```ts
     * 
     * // go to the next page if exist
     * JMap.History.goForward()
     * ```
     */
    function goForward(): void

    /**
     * **JMap.History.getHashParameter**
     * 
     * Return a JS object that contains all key / value entries present
     * in the hash of the url.
     * 
     * Returns an empty string if parameter's not found.
     * 
     * @throws Error if parameterName is not a valid string
     * 
     * @example ```ts
     * 
     * // Ex. url = ***http://localhost:8080/services/jmap#?projectId=0&myvar=test***
     * 
     * JMap.History.getHashParameter("myvar")
     * // return "test"
     * 
     * JMap.History.getHashParameter("myvardoesntexist")
     * // return ""
     * ```
     */
    function getHashParameter(parameterName: string): string

    /**
     * **JMap.History.getHashParameters**
     * 
     * Return a JS object that contains all key / value entries present
     * in the hash of the url.
     * 
     * @example ```ts
     * 
     * // get all parameters in the url hash
     * JMap.History.getHashParameters()
     * 
     * // Ex. url = ***http://localhost:8080/services/jmap#?projectId=0&myvar=test***
     * // Will return this object :
     * {
     *    projectId: 0,
     *    myvar: "test"
     * }
     * ```
     */
    function getHashParameters(): { [ key: string ]: string }
    
    /**
     * **JMap.History.pushHashParameters**
     * 
     * You can add or update a parameter in the url hash.
     * 
     * @param parameterName: the name of the parameter
     * @param parameterValue: the string value of the parameter, only string are accepted.
     * 
     * @throws Error if parameterName is not a valid string
     * 
     * @example ```ts
     * 
     * // Ex. url is = ***http://localhost:8080/services/jmap#?projectId=0***
     *
     * JMap.History.pushHashParameters("myvar", "test")
     * 
     * // The url is now = ***http://localhost:8080/services/jmap#?projectId=0&myvar=test***
     * ```
     */
    function pushHashParameters(parameterName: string, parameterValue: string): void
    
    /**
     * **JMap.History.popHashParameters**
     * 
     * You can remove a parameter in the url hash.
     * 
     * Don't throw an error if the parameter doesn't exist.
     *
     * @param parameterName: the name of the parameter
     *
     * @throws Error if parameterName is not a valid string
     *  
     * @example ```ts
     * 
     * // Ex. url is = ***http://localhost:8080/services/jmap#?projectId=0&myvar=test***
     *
     * JMap.History.popHashParameters("myvar")
     * 
     * // The url is now = ***http://localhost:8080/services/jmap#?projectId=0***
     * ```
     */
    function popHashParameters(parameterName: string): void

    /**
     * **JMap.History.onParameterChange**
     * 
     * You can attach a listener that listen for url hash params change.
     * 
     * The function returns the listener id that can be used after to remove the listener.
     *
     * @param parameterName: the name of the parameter
     * @param fn: the function that will be processed when the property changed
     * 
     * @returns the listener id, can be used to remove the listener with [[JMap.History.removePropertyChangeListener]]
     *
     * @throws Error if parameterName is not a valid string or fn is not a function
     * 
     * @example ```ts
     * 
     * const listenerId = JMap.History.onParameterChange("projectId", (oldValue, newValue) => {
     *    console.log(`In the url hash the parameter "projectId" has changed from "${oldValue}" to "${newValue}"`)
     * })
     * ```
     */
    function onParameterChange(parameterName: string, fn: (oldValue: string, newValue: string | undefined) => void): string

    /**
     * **JMap.History.removePropertyChangeListener**
     * 
     * You can detach a property listener by its id that has been returned when it has been created
     * with function [[JMap.History.onParameterChange]].
     * 
     * After that the listener will be destroyed.
     * 
     * @param listenerId: the listener id
     * 
     * @throws Error if parameterName is not a valid string or fn is not a function
     * 
     * @example ```ts
     * 
     * const listenerId = JMap.History.onParameterChange(...)
     * // the listener is working
     * 
     * // ...
     * 
     * JMap.History.removePropertyChangeListener(listenerId)
     * // here the listener has stopped
     * ```
     */
    function removePropertyChangeListener(listenerId: string): void
  }
  
  /**
   * **JMap.Layer**
   * 
   * Layer related methods.
   */
  namespace Layer {

    /**
     *  **JMap.Layer.Search**
     * 
     * Methods used to search features for a layer.
     */
    namespace Search {

      /**
       * **JMap.Layer.Search.byAttribute**
       * 
       * Returns features, for a given layer, having attribute value equals to the given value(s).
       * 
       * @param params search parameters
       * @returns a promise that will return all the features of the Layer corresponding to the search criteria
       * @throws Error if promise fails
       *
       * @example ```ts
       * 
       * // returns all features that have the attribute "E"
       * JMap.Layer.Search
       *   .byAttribute({
       *      layerId: 99,
       *      attributeName: "TREE",
       *      attributeValue: [ "Cherry", "Birch" ] // here an array for multipe values, but could be a single value like a string
       *   })
       *   .then(features => console.info(`Total ${features.length} feature(s) found`, features))
       *   .catch(error => console.error(error))
       * ```
       */
      function byAttribute(params: JLayerSearchByAttributesParams): Promise<any> // any is Feature[]
    }

    /**
     * **JMap.Layer.getLayerTree**
     * 
     * Returns project's layer tree.
     * 
     * The layer tree is an array of tree element.
     * 
     * A tree element is a layer group or a layer.
     * 
     * A layer group contains layer and/or other layer group, and has a negative id.
     * 
     * A layer has a positive id.
     * 
     * If no project is loaded, returns en empty array.
     * 
     * @example ```ts
     * 
     * // returns the entire layer tree of the project
     * JMap.Layer.getLayerTree()
     * ```
     */
    function getLayerTree(): JLayerTree

    /**
     * **JMap.Layer.getLayerTreeElementsById**
     * 
     * Returns a map (= a javascript object) where :
     *  - the key is the tree element id
     *  - the value is the tree element
     * 
     * A tree element is a layer group or a layer.
     * 
     * A layer group contains layer(s) and/or other layer group(s), and has a negative id.
     * 
     * A layer has a positive id.
     * 
     * If no project is loaded, returns en empty object.
     * 
     * @example ```ts
     * 
     * // returns a map of layer elements defined by layer id
     * JMap.Layer.getLayerTreeElementsById()
     * ```
     */
    function getLayerTreeElementsById(): { [ layerElementId: number ]: JLayerTreeElement }

    /**
     * **JMap.Layer.getLayers**
     * 
     * Returns an array with JMap layers.
     * 
     * The array order is the same as the one in the tree.
     * 
     * If no project is loaded, returns en empty array.
     * 
     * @example ```ts
     * 
     * // returns all JMap layers
     * JMap.Layer.getLayers()
     * ```
     */
    function getLayers(): JLayer[]

    /**
     * **JMap.Layer.getLayerIds**
     * 
     * Returns an array with JMap layer ids.
     * 
     * The array order is the same as the one in the tree.
     * 
     * If no project is loaded, returns en empty array.
     * 
     * This function is equivalent to :
     * ```ts
     * JMap.Layer.getLayers().map(layer => layer.id)
     * ```
     * 
     * @example ```ts
     * 
     * // returns all JMap layer ids
     * JMap.Layer.getLayerIds()
     * ```
     */
    function getLayerIds(): number[]

    /**
     * **JMap.Layer.attributeExists**
     * 
     * Returns true if the layer has the given attribute.
     * 
     * @throws Error if layer is not found
     * @param layerId The JMap layer id
     * @param attributeName The JMap attribute name
     * @example ```ts
     * 
     *  // return true if the attribute named "SPECIES" exist on layer id=4
     *  JMap.Layer.attributeExists(4, "SPECIES")
     * ```
     */
    function attributeExists(layerId: number, attributeName: string): boolean

    /**
     * **JMap.Layer.getLayerAttribute**
     * 
     * Returns the attribute descriptor for a given layer and attribute
     * 
     * @throws Error if layer or attribute not found
     * @param layerId The JMap layer id
     * @param attributeName The JMap attribute name
     * @example ```ts
     * 
     *  // return the layer attribute descriptor
     *  JMap.Layer.getLayerAttribute(4, "SPECIES")
     * ```
     */
    function getLayerAttribute(layerId: number, attributeName: string): JLayerAttribute

    /**
     * **JMap.Layer.getLayerAttributes**
     * 
     * Returns all attribute descriptors for a particuler layer
     * 
     * @throws Error if layer is not found
     * @param layerId The JMap layer id
     * @example ```ts
     * 
     *  JMap.Layer.getLayerAttributes(4)
     * ```
     */
    function getLayerAttributes(layerId: number): JLayerAttribute[]
    
    /**
     * **JMap.Layer.exists**
     * 
     * Returns true if a layer having the id exists.
     * 
     * @param layerId The JMap layer id
     * @example ```ts
     * 
     * // returns true if layer id=3 exists
     * JMap.Layer.exists(3)
     * ```
     */
    function exists(layerId: number): boolean

    /**
     * **JMap.Layer.getById**
     * 
     * Returns the JMap layer having the id.
     * 
     * @throws Error if no layer found for the id
     * @param layerId The JMap layer id
     * @example ```ts
     * 
     * // returns the JMap layer id=3
     * JMap.Layer.getById(3)
     * ```
     */
    function getById(layerId: number): JLayerTreeElement

    /**
     * **JMap.Layer.getSelfOrChildren**
     * 
     * If the layerId is a layer returns it.
     * If the layerId is a layer group, returns all of its layers children
     * (remove all layer groups).
     * 
     * Returns an empty array if it's an empty layer group
     * 
     * @throws Error if no layer found for the id
     * @param layerId The JMap layer id
     * @example ```ts
     * 
     * // returns an array with only JMap layers (no layer group)
     * JMap.Layer.getSelfOrChildren(3)
     * ```
     */
    function getSelfOrChildren(layerId: number): JLayer[]

    /**
     * **JMap.Layer.getName**
     * 
     * Returns the name of the layer.
     * 
     * @throws Error if no layer found for the id
     * @param layerId The JMap layer id
     * @example ```ts
     * 
     * // returns the name of layer id=3
     * JMap.Layer.getName(3)
     * ```
     */
    function getName(layerId: number): string

    /**
     * **JMap.Layer.getDescription**
     * 
     * Returns the descrition of the layer.
     * 
     * @throws Error if no layer found for the id
     * @param layerId The JMap layer id
     * @example ```ts
     * 
     * // returns the description of layer id=3
     * JMap.Layer.getDescription(3)
     * ```
     */
    function getDescription(layerId: number): string

    /**
     * **JMap.Layer.getEPSG4326Extent**
     * 
     * Returns the extent of the layer in ESPG:4326 coordinates
     * @example ```ts
     * 
     * // returns the bounding box (JBoundaryBox) of the layer ID 3 in decimal degrees
     * JMap.Layer.getEPSG4326Extent(3)
     * ```
     * 
     * @throws Error if no layer found for the id
     * @param layerId The JMap layer id
     */
    function getEPSG4326Extent(layerId: number):JBoundaryBox | null

    /**
     * **JMap.Layer.isVisible**
     * 
     * Returns the tree element visibility property.
     * 
     * The visibility property is initialy defined on the project, and can be
     * changed by the user through the JMap Web Core library.
     * 
     * If this property is false, the layer cannot be displayed on the map.
     * 
     * If it's true, the layer can be rendered on the map. The layer is rendered depending
     * on the current map scale of the map, and the min / max scale defined for this layer.
     * 
     * @throws Error if no layer found for the id
     * @param layerId The JMap layer id
     * @param checkParentVisibility If true will check if all parent elements have the property visible equals to true
     * @example ```ts
     * 
     * // returns false if layer id=3 is not set as visible
     * JMap.Layer.isVisible(3)
     * ```
     */
    function isVisible(layerId: number, checkParentVisibility?: boolean): boolean

    /**
     * **JMap.Layer.isAllLayerParentsVisible**
     * 
     * Returns true if all parents of the element have the visibility property equals to true.
     * 
     * If element has no parent it returns true.
     * 
     * @throws Error if no layer found for the id
     * @param layerId The JMap layer id
     * @example ```ts
     * 
     * // returns true if all parents of layer id=3 have the property visible set to true
     * JMap.Layer.isAllLayerParentsVisible(3)
     * ```
     */
    function isAllLayerParentsVisible(layerId: number): boolean

    /**
     * **JMap.Layer.getStyle**
     * 
     * Returns the base style of the layer.
     * 
     * @throws Error if no layer found for the id, or if the layer is a layer group.
     * @param layerId The JMap layer id
     * @example ```ts
     * 
     * // returns layer id=3 base style
     * JMap.Layer.getStyle(3)
     * ```
     */
    function getStyle(layerId: number): JLayerStyle

    /**
     * **JMap.Layer.getSimpleSelectionStyle**
     * 
     * Returns the selection "simple" style of the layer.
     * 
     * It always returns an object, and if no selection style has been set on the layer,
     * it returns the project default values.
     * 
     * @throws Error if no layer found for the id, or if the layer is a layer group.
     * @param layerId The JMap layer id
     * @example ```ts
     * 
     * // returns the simple selection style of layer id=3
     * JMap.Layer.getSimpleSelectionStyle(3)
     * ```
     */
    function getSimpleSelectionStyle(layerId: number): JLayerSimpleStyle

    /**
     * **JMap.Layer.getSelectionStyle**
     * 
     * Returns the layer selection style if defined, else returns null.
     * 
     * @throws Error if no layer found for the id, or if the layer is a layer group.
     * @param layerId The JMap layer id
     * @example ```ts
     * 
     * // returns the simple selection style of layer id=3
     * JMap.Layer.getSelectionStyle(3)
     * ```
     */
    function getSelectionStyle(layerId: number): JLayerStyle | null

    /**
     * ***JMap.Layer.getAllThematicsForLayer***
     * 
     * Returns all layer thematics.
     * 
     * @throws Error if no layer found for the id, or if the layer is a layer group.
     * @param layerId The JMap layer id
     * @example ```ts
     * 
     * // returns all thematics of layer id=4
     * JMap.Layer.getAllThematicsForLayer(4)
     * ```
     */
    function getAllThematicsForLayer(layerId: number): JLayerThematic[]

    /**
     * ***JMap.Layer.getThematicById***
     * 
     * Returns a specific layer thematic.
     * 
     * @throws Error if no layer found for the id, if the layer is a layer group, or if the thematic doesn't exist.
     * @param layerId The JMap layer id
     * @param thematicId The thematic id
     * @example ```ts
     * 
     * // returns thematic id=3 of layer id=4
     * JMap.Layer.getThematicById(4, 3)
     * ```
     */
    function getThematicById(layerId: number, thematicId: number): JLayerThematic

    /**
     * ***JMap.Layer.hasVisibleThematics***
     * 
     * Returns true if the layer has at least one thematic displayed on the map.
     * 
     * @throws Error if no layer found for the id, or if the layer is a layer group.
     * @param layerId The JMap layer id
     * @example ```ts
     * 
     * // returns false if no thematic is displayed for layer id=4
     * JMap.Layer.hasVisibleThematics(4)
     * ```
     */
    function hasVisibleThematics(layerId: number): boolean

    /**
     * ***JMap.Layer.getVisibleThematics***
     * 
     * Returns layer thematics that are currently displayed on the map.
     * 
     * @throws Error if no layer found for the id, or if the layer is a layer group.
     * @param layerId The JMap layer id
     * @example ```ts
     * 
     * // returns false if no thematic is displayed for layer id=4
     * JMap.Layer.getVisibleThematics(4)
     * ```
     */
    function getVisibleThematics(layerId: number): JLayerThematic[]

    /**
     * **JMap.Layer.setVisible**
     * 
     * Set the visibility property of the layer.
     * 
     * If it's a JMap layer, it apply the visibility to it.
     * 
     * The visibility property is initialy defined on the project, and can be
     * changed by the user through the JMap Web Core library.
     * 
     * If this property is false, the layer cannot be displayed on the map.
     * 
     * If it's true, the layer can be rendered on the map. The layer is rendered depending
     * on the current map scale of the map, and the min / max scale defined for this layer.
     * 
     * @throws Error if no layer found for the id
     * @param layerId The JMap layer id
     * @param isVisible The new visibility property value for the layer
     * @example ```ts
     * 
     * // show layer id=5
     * JMap.Layer.setVisible(5, true)
     * 
     * // hide layer id=3
     * JMap.Layer.setVisible(3, false)
     * ```
     */
    function setVisible(layerId: number, isVisible: boolean): void

    /**
     * **JMap.Layer.setLayersVisibility**
     * 
     * Set the visibility property of multiple layers.
     * 
     * _For each layer:_
     * 
     * If it's a JMap layer, it apply the visibility to it.
     * 
     * The visibility property is initialy defined on the project, and can be
     * changed by the user through the JMap Web Core library.
     * 
     * If this property is false, the layer cannot be displayed on the map.
     * 
     * If it's true, the layer can be rendered on the map. The layer is rendered depending
     * on the current map scale of the map, and the min / max scale defined for this layer.
     * 
     * @throws Error if any layer is not found for any of the ids
     * @param params an array of JLayerSetLayersVisibilityParams
     * @example ```ts
     * 
     * // show layers id=5 and 6, hide layer 3
     * JMap.Layer.setLayersVisibility([
     *    {layerId: 5, visibility: true}, 
     *    {layerId: 6, visibility: true}, 
     *    {layerId: 3, visibility: false}
     * ])
     * 
     * ```
     */
    function setLayersVisibility(params: JLayerSetLayersVisibilityParams[]): void

    /**
     * **JMap.Layer.ensureLayerIsVisible**
     * 
     * Make sure a layer is visible on the Map. All parent layers will also be made visible 
     * 
     * @param layerId The JMap layer id
     * 
     * @example ```ts
     * 
     * // show layer id=5 (and all parent layers)
     * JMap.Layer.ensureLayerIsVisible(5)
     * 
     * ```
     */
    function ensureLayerIsVisible(layerId: number): void

    /**
     * **JMap.Layer.ensureLayersAreVisible**
     * 
     * Make sure that all specified layers are visible on the Map. 
     * All parent layers of all Layers will also be made visible 
     * 
     * @param layerIds An array of JMap layer ids
     * 
     * @example ```ts
     * 
     * // show layer ids 5, 6 and 7 (and all parent layers)
     * JMap.Layer.ensureLayersAreVisible([5, 6, 7])
     * 
     * ```
     */
    function ensureLayersAreVisible(layerIds: number[]): void

    /**
     * **JMap.Layer.setLayerGroupExpansion**
     * 
     * Set the layer group expansion state.
     * 
     * @throws Error if layer group is not found, or is not a layer group but a layer
     * @param layerGroupId The JMap layer group id
     * @param isExpanded if true will expand, if false will collapse the layer group
     * @example ```ts
     * 
     * // Expand the layer group id -4
     * JMap.Layer.setLayerGroupExpansion(-4, true)
     * ```
     */
    function setLayerGroupExpansion(layerGroupId: number, isExpanded: boolean): void
    
    /**
     * **JMap.Layer.setLayerGroupsExpansion**
     * 
     * Set the group expansion state of multiple layer groups.
     * 
     * @throws Error if any layer group is not found for any group id, or if any group found is not a layer group but a layer
     * @param params An array of JLayerSetLayerGroupsExpansionParams
     * @example ```ts
     * 
     * // Expand the layer group id -4, collapse group id -5 
     * JMap.Layer.setLayerGroupsExpansion([{layerGroupId: -4, open: true}, {layerGroupId: -5, open: false}])
     * ```
     */
    function setLayerGroupsExpansion(params: JLayerSetLayerGroupsExpansionParams[]): void
    
    /**
     * **JMap.Layer.deleteLayer**
     * 
     * Delete the layer in the data store and in the map.
     * 
     * The layer is not deleted server side, but only in the browser.
     * 
     * Use this function if you want to dynamically remove a layer.
     * 
     * @throws Error if layer is not found
     * @param layerId The JMap layer id
     * @example ```ts
     * 
     * // Remove layer 4 (only client side)
     * JMap.Layer.deleteLayer(4)
     * ```
     */
    function deleteLayer(layerId: number): void
    
    /**
     * **JMap.Layer.setThematicVisibility**
     * 
     * Show or hide a layer thematic on the map
     * 
     * @throws Error if layer or thematic is not found
     * @param layerId The JMap layer id
     * @param thematicId The thematic id
     * @param visibility true to show, false to hide
     * @example ```ts
     * 
     * // Display the thematic id=3 of layer id=7
     * JMap.Layer.Thematic.setThematicVisibility(7, 3, true)
     * 
     * // Hide the thematic id=3 of layer id=7
     * JMap.Layer.Thematic.setThematicVisibility(7, 3, false)
     * ```
     */
    function setThematicVisibility(layerId: number, thematicId: number, visibility: boolean): void

    /**
     * **JMap.Layer.setThematicsVisibility**
     * 
     * Show or hide multiple layer thematics on the map
     * 
     * @throws Error if any layer or thematic are not found
     * @param params An array of JLayerSetThematicsVisibilityParams
     * @example ```ts
     * 
     * // Display the thematic id=3 of layer id=7, and hide the thematic id=1 of layer id=14
     * JMap.Layer.Thematic.setThematicsVisibility([
     *    {layerId: 7, thematicId: 3, visibility: true},
     *    {layerId: 14, thematicId: 1, visibility: false}
     * ])
     * ```
     */
    function setThematicsVisibility(params: JLayerSetThematicsVisibilityParams[]): void
  }

  /**
   * **JMap.Geometry**
   * 
   * This section contains geometry related methods.
   * 
   * JMap geometry service is based on turfjs implementation.
   */
  namespace Geometry {

    /**
     * **JMap.Geometry.checkLocation**
     * 
     * Throw an error if the provided parameter is not a valid location.
     * 
     * @param location The location object to check
     * @example ```ts
     * 
     * let location = { x: 10, y: 10 }
     * // The following instruction will not throw an error
     * JMap.Geometry.checkLocation(location)
     * 
     * location = {} // empty object
     * // The following instruction will throw an error
     * JMap.Geometry.checkLocation(location)
     * ```
     */
    function checkLocation(location: JLocation): void

    /**
     * **JMap.Geometry.isValidLocation**
     * 
     * Return false if the provided parameter is not a valid location.
     * 
     * @param location The location object to check
     * @example ```ts
     * 
     * let location = { x: 10, y: 10 }
     * // The following instruction will return true
     * JMap.Geometry.isValidLocation(location)
     * 
     * location = {} // empty object
     * // The following instruction will return false
     * JMap.Geometry.isValidLocation(location)
     * ```
     */
    function isValidLocation(location: JLocation | undefined): boolean

    /**
     * **JMap.Geometry.checkCircle**
     * 
     * Throw an error if the provided parameter is not a valid circle.
     * 
     * @param circle The circle object to check
     * @example ```ts
     * 
     * let circle = { center: { x: 10, y: 10 }, radius: 10 }
     * // The following instruction will not throw an error
     * JMap.Geometry.checkCircle(circle)
     * 
     * circle = { radius: 10 } // missing center
     * // The following instruction will throw an error
     * JMap.Geometry.checkCircle(circle)
     * ```
     */
    function checkCircle(circle: JCircle): void

    /**
     * **JMap.Geometry.checkPolygon**
     * 
     * Throw an error if the provided parameter is not a valid polygon.
     * 
     * @param polygon The polygon array to check
     * @example ```ts
     * 
     * let polygon = [[ 10, 10 ], [ 11, 11 ], [ 12, 12 ], [ 10, 10 ]]
     * // The following instruction will not throw an error
     * JMap.Geometry.checkPolygon(polygon)
     * 
     * polygon = [] // empty array
     * // The following instruction will throw an error
     * JMap.Geometry.checkPolygon(polygon)
     * ```
     */
    function checkPolygon(polygon: JPolygon): void

    /**
     * **JMap.Geometry.checkLine**
     * 
     * Throw an error if the provided parameter is not a valid polygon.
     * 
     * @param line The line object to check
     * @example ```ts
     * 
     * let line = [[ 10, 10 ], [ 11, 11 ], [ 12, 12 ]]
     * // The following instruction will not throw an error
     * JMap.Geometry.checkLine(line)
     * 
     * line = [] // empty line
     * // The following instruction will throw an error
     * JMap.Geometry.checkLine(line)
     * ```
     */
    function checkLine(line: JLine): void

    /**
     * **JMap.Geometry.checkBbox**
     * 
     * Throw an error if the provided parameter is not a valid boundary box.
     * 
     * @param bbox The bbox object to check
     * @example ```ts
     * 
     * let bbox = { sw: { x: 10, y: 10 }, ne: { x: 12, y: 12 } }
     * // The following instruction will not throw an error
     * JMap.Geometry.checkBbox(bbox)
     * 
     * bbox = { sw: { x: 10, y: 10 } } // missing "ne" attribute
     * // The following instruction will throw an error
     * JMap.Geometry.checkBbox(bbox)
     * ```
     */
    function checkBbox(bbox: JBoundaryBox): void

    /**
     * **JMap.Geometry.isValidBbox**
     * 
     * Return false if the provided parameter is not a valid boundary box.
     * 
     * @param bbox The bbox object to check
     * @example ```ts
     * 
     * let bbox = { sw: { x: 10, y: 10 }, ne: { x: 12, y: 12 } }
     * // The following instruction will return true
     * JMap.Geometry.isValidBbox(bbox)
     * 
     * bbox = { sw: { x: 10, y: 10 } } // missing "ne" attribute
     * // The following instruction will return false
     * JMap.Geometry.isValidBbox(bbox)
     * ```
     */
    function isValidBbox(bbox: JBoundaryBox | undefined): boolean

    /**
     * **JMap.Geometry.getArea**
     * 
     * Works for feature having geometry equals to Polygon or a MultiPolygon.
     * 
     * It returns the area in square meters.
     * 
     * Throw an error if the provided feature geometry is not a Polygon or a MultiPolygon.
     * 
     * @param feature The Polygon or MultiPolygon feature
     * @example ```ts
     * 
     * const feature = ...
     * // The method will return the area in m2
     * JMap.Geometry.getArea(feature)
     * ```
     */
    function getArea(feature: GeoJSON.Feature): number

    /**
     * **JMap.Geometry.getLineLength**
     * 
     * Works for feature having geometry equals to LineString or a MultiLineString.
     * 
     * It returns the line length in the desired units (default in kilometers).
     * 
     * Throw an error if the provided feature geometry is not a LineString or a MultiLineString.
     * 
     * @param feature The LineString or MultiLineString feature to measure.
     * @param units Can be "degrees", "radians", "miles", or "kilometers" (default)
     * @example ```ts
     * 
     * const line = ...
     * 
     * // The method will return the line length in kilometers
     * JMap.Geometry.getLineLength(line)
     *
     * // The method will return the line length in miles
     * JMap.Geometry.getLineLength(line, "miles")
     * ```
     */
    function getLineLength(feature: GeoJSON.Feature<GeoJSON.LineString> | GeoJSON.Feature<GeoJSON.MultiLineString>, units?: JGeometryUnit | JDistanceUnit ): number

    /**
     * **JMap.Geometry.getCentroid**
     * 
     * Returns a point feature representing the centroid of the provided feature or featureCollection.
     * 
     * @param feature a feature or a feature collection
     * @example ```ts
     * 
     * const polygonFeature = ...
     * // The method will return the centroid of "polygonFeature" as a point feature
     * JMap.Geometry.getCentroid(polygonFeature)
     * ```
     */
    function getCentroid(feature: GeoJSON.Feature | GeoJSON.FeatureCollection): GeoJSON.Feature<GeoJSON.Point>

    /**
     * **JMap.Geometry.getFeatureFromLine**
     * 
     * Returns a line feature from a line object ([[JLine]]).
     * 
     * @param line A line array
     * @example ```ts
     * 
     * const line = [[ 10, 12], [12, 23], [34, 12]]
     * // The method will return a line feature
     * const feature = JMap.Geometry.getFeatureFromLine(line)
     * ```
     */
    function getFeatureFromLine(line: JLine): GeoJSON.Feature<GeoJSON.LineString>
    
    /**
     * **JMap.Geometry.getPolygonFeatureFromCircle**
     * 
     * Returns a plygon feature from a circle object ([[JCircle]]).
     * 
     * @param circle A circle object
     * @param units unit of the radius
     * @example ```ts
     * 
     * const circle = [[ 10, 12], [12, 23], [34, 12], [ 10, 12]]
     * // The method will return a polygon feature
     * const feature = JMap.Geometry.getPolygonFeatureFromCircle(circle)
     * ```
     */
    function getPolygonFeatureFromCircle(circle: JCircle, units?: JGeometryUnit): GeoJSON.Feature<GeoJSON.Polygon>
    
    /**
     * **JMap.Geometry.getFeatureFromPolygon**
     * 
     * Returns a polygon feature from a polygon array ([[JPolygon]]).
     * 
     * @param polygon A polygon array
     * @example ```ts
     * 
     * const polygon = [[ 10, 12], [12, 23], [34, 12], [ 10, 12]]
     * // The method will return a polygon feature
     * const feature = JMap.Geometry.getFeatureFromPolygon(line)
     * ```
     */
    function getFeatureFromPolygon(polygon: JPolygon): GeoJSON.Feature<GeoJSON.Polygon>
    
    /**
     * **JMap.Geometry.getBboxFromFeature**
     * 
     * Returns the feature geometry boundary box ([[JBoundaryBox]]).
     * 
     * @param feature A feature object
     * @example ```ts
     * 
     * const feature = ...
     * // The method will return the feature geometry boundary box
     * const bbox = JMap.Geometry.getBboxFromFeature(feature)
     * ```
     */
    function getBboxFromFeature(feature: GeoJSON.Feature): JBoundaryBox

    /**
     * **JMap.Geometry.getBboxFromFeatures**
     * 
     * Return the boundary box that contains all features
     * 
     * @param features array of features
     * @example ```ts
     *
     * const features = ...
     * // return the features bbox
     * const distance = JMap.Geometry.getBboxFromFeatures(features)
     * ```
     */
    function getBboxFromFeatures(features: GeoJSON.Feature[]): JBoundaryBox
    
    /**
     * **JMap.Geometry.getBboxFromPolygon**
     * 
     * Returns the polygon boundary box.
     * 
     * @param polygon A polygon array
     * @example ```ts
     * 
     * const polygon = [[ 10, 12], [12, 23], [34, 12], [ 10, 12]]
     * // The method will return the polygon boundary box
     * const bbox = JMap.Geometry.getBboxFromPolygon(feature)
     * ```
     */
    function getBboxFromPolygon(polygon: JPolygon): JBoundaryBox
    
    /**
     * **JMap.Geometry.getBboxFromLine**
     * 
     * Returns the line boundary box.
     * 
     * @param line A line array
     * @example ```ts
     * 
     * const line = [[ 10, 12], [12, 23], [34, 12]]
     * // The method will return the line boundary box
     * const bbox = JMap.Geometry.getBboxFromLine(line)
     * ```
     */
    function getBboxFromLine(line: JLine): JBoundaryBox
    
    /**
     * **JMap.Geometry.getPolygonFeatureFromBbox**
     * 
     * Returns a polygon feature corresponding to the boundary box.
     * 
     * @param boundaryBox A boundary box
     * @example ```ts
     * 
     * const bbox = { sw: { x: 10, y: 10 }, ne: { x: 20, y: 20 }}
     * // The method will return the polygon corresponding to the bbox
     * const polygonFeature = JMap.Geometry.getPolygonFeatureFromBbox(bbox)
     * ```
     */
    function getPolygonFeatureFromBbox(boundaryBox: JBoundaryBox): GeoJSON.Feature<GeoJSON.Polygon>
    
    /**
     * **JMap.Geometry.bboxIntersect**
     * 
     * Returns true if the first bbox intersect the second one.
     * 
     * @param bbox1 The first boundary box
     * @param bbox2 The second boundary box
     * @example ```ts
     * 
     * const bbox1 = { sw: { x: 10, 10 }, sw: { x: 20, 20 }}
     * const bbox2 = { sw: { x: 12, 12 }, sw: { x: 14, 18 }}
     * // The method will return true
     * const areIntersecting = JMap.Geometry.bboxIntersect(bbox1, bbox2)
     * ```
     */
    function bboxIntersect(bbox1: JBoundaryBox, bbox2: JBoundaryBox): boolean
    
    /**
     * **JMap.Geometry.polygonIntersect**
     * 
     * Returns true if the polygon feature geometry intersects the other feature geometry.
     * 
     * @param polygonFeature A polygon feature
     * @param otherFeature A feature (can be not a polygon)
     * @example ```ts
     * 
     * const polygonFeature = ...
     * const otherFeature = ...
     * // The method will return true if otherFeature intersect the polygonFeature
     * const areIntersecting = JMap.Geometry.polygonIntersect(polygonFeature, otherFeature)
     * ```
     */
    function polygonIntersect(polygonFeature: GeoJSON.Feature<GeoJSON.Polygon> , otherFeature: GeoJSON.Feature): boolean
    
    /**
     * **JMap.Geometry.lineIntersect**
     * 
     * Returns true if the line feature geometry intersects the other feature geometry.
     * 
     * @param lineFeature A line feature
     * @param otherFeature A feature (can be not a line)
     * @example ```ts
     * 
     * const lineFeature = ...
     * const otherFeature = ...
     * // The method will return true if otherFeature intersect the lineFeature
     * const areIntersecting = JMap.Geometry.lineIntersect(lineFeature, otherFeature)
     * ```
     */
    function lineIntersect(lineFeature: GeoJSON.Feature<GeoJSON.LineString>, otherFeature: GeoJSON.Feature): boolean

    /**
     * **JMap.Geometry.getDistance**
     * 
     * Returns the distance in kilometers between 2 points.
     * 
     * @param p1 the first point
     * @param p2 The second point
     * @example ```ts
     * 
     * // returns the distance between the 2 points
     * const distance = JMap.Geometry.getDistance([ 10, 20 ], [ 30, 30 ])
     * 
     * // returns the distance between the 2 points
     * const distance = JMap.Geometry.getDistance({ x: 10, y: 20 }, { x: 30, y: 30 })
     * ```
     */
    function getDistance(p1: JPoint | JLocation, p2: JPoint | JLocation): number

    /**
     * **JMap.Geometry.getFeatureCollection**
     * 
     * Returns a feature collection.
     * 
     * @param features could be a collection of turf features, JMap locations, or JMap points
     * @example ```ts
     * 
     * // returns the feature collection for the 2 points
     * const distance = JMap.Geometry.getFeatureCollection([ { x: 10, y: 20 }, { x: 30, y: 30 } ])
     * ```
     */
    function getFeatureCollection(features: GeoJSON.Feature[] | JLocation[] | JPoint[]): GeoJSON.FeatureCollection

    /**
     * **JMap.Geometry.getCircleFeature**
     * 
     * Returns a polygon feature equivalent to the circle.
     * 
     * @param center Location of circle's center
     * @param radius The radius in KM
     * @example ```ts
     * 
     * // returns the circle feature
     * const circle = JMap.Geometry.getCircleFeature([ 10, 20 ], 1.4)
     * 
     * // returns the circle feature
     * const circle = JMap.Geometry.getCircleFeature({ x: 10, y: 20 }, 1.4)
     * ```
     */
    function getCircleFeature(center: JPoint | JLocation, radius: number): GeoJSON.Feature<GeoJSON.Polygon>

    /**
     * **JMap.Geometry.getPolygonFeature**
     * 
     * Returns a polygon feature from coordinates.
     * 
     * If the coordinates are not closed the method will close it automatically.
     * 
     * @param coordinates the polygon coordinates (closed or not closed)
     * @param closeCoordinates if true will close the coordinates (if needed)
     * @example ```ts
     * 
     * // will close the coordinates of the polygon and returns the feature
     * const distance = JMap.Geometry.getPolygonFeature([
     *    [ 10, 20 ],
     *    [ 30, 30 ],
     *    [ 10, 60 ]
     * ])
     * ```
     */
    function getPolygonFeature(coordinates: JPoint[], closeCoordinates?: boolean): GeoJSON.Feature<GeoJSON.Polygon>
  }

  /**
   * **JMap.Map**
   * 
   * This section contains map related methods. 
   */
  namespace Map {
    
    /**
     * **JMap.Map.getMap**
     * 
     * Returns the Mapbox map instance, a MapBox map.
     * 
     * @example ```ts
     * 
     * // returns the Mapbox map instance
     * JMap.Map.getMap()
     * ```
     */
    function getMap(): mapboxgl.Map
    
    /**
     * **JMap.Map.getMapJSLib**
     * 
     * Returns the MapBox JS library used to create the map.
     * 
     * Usefull to be able to create a map library object, by example a popup.
     * 
     * @example ```ts
     * 
     * // Create a MapBox popup
     * const myCustomPopup = JMap.Map.getMapJSLib().Popup({
     *   closeButton: false,
     *   closeOnClick: false
     * })
     * ```
     */
    function getMapJSLib(): any

    /**
     * ***JMap.Map.getDomContainerId***
     * 
     * Returns the map div container id, where the map is or will be created.
     * 
     * @example ```ts
     * 
     * // returns the map div container id
     * JMap.Map.getDomContainerId()
     * ```
     */
    function getDomContainerId(): string

    /**
     * **JMap.Map.getAllDistanceUnits**
     *
     * Returns a list of all available distance units.
     * 
     * @example ```ts
     *
     * // return list of all distance units
     * // ["millimeters", "centimeters", "meters", "kilometers", "inches", "feet", "yards", "miles", "nauticalmiles" ]
     * JMap.Map.getAllDistanceUnits()
     * ```
     */
    function getAllDistanceUnits(): JDistanceUnit[]

    /**
     * **JMap.Map.getDistanceUnit**
     *
     * Get the map defined distance unit.
     *
     * If no distance unit has been set by user, it returns the project distance unit,
     * if no distance unit is set on the project, it returns "meters" by default.
     * 
     * @throws if no project is loaded
     * @example ```ts
     *
     * // return undefined if no distance unit, else the value
     * JMap.Map.getDistanceUnit()
     * ```
     */
    function getDistanceUnit(): JDistanceUnit

    /**
     * **JMap.Map.setDistanceUnit**
     *
     * Set the distance unit, for the current project.
     * 
     * Save this preference in local storage.
     * 
     * @throws if bad distance unit is provided, or no project is loaded
     * @param distanceUnit the distance unit
     * @example ```ts
     *
     * // Set the distance unit to "miles"
     * JMap.Map.setDistanceUnit("miles")
     * ```
     */
    function setDistanceUnit(distanceUnit: JDistanceUnit): void

    /**
     * ***JMap.Map.isMapCreated***
     * 
     * Returns true if the map has been created.
     * 
     * @example ```ts
     * 
     * // returns true or false
     * JMap.Map.isMapCreated()
     * ```
     */
    function isMapCreated(): boolean

    /**
     * ***JMap.Map.isMapLoaded***
     * 
     * Returns true if the map has been loaded and is ready.
     * 
     * @example ```ts
     * 
     * // returns true or false
     * JMap.Map.isMapLoaded()
     * ```
     */
    function isMapLoaded(): boolean

    /**
     * ***JMap.Map.getExtent***
     * 
     * Returns the current map extent.
     * 
     * @example ```ts
     * 
     * // returns the current map extent
     * JMap.Map.getExtent()
     * ```
     */
    function getExtent(): JBoundaryBox

    /**
     * ***JMap.Map.getCenter***
     * 
     * Returns the location that is the current center of the map.
     * 
     * @example ```ts
     * 
     * // returns the current center of the map
     * JMap.Map.getCenter()
     * ```
     */
    function getCenter(): JLocation

    /**
     * ***JMap.Map.getZoom***
     * 
     * Returns the current map zoom.
     * 
     * @example ```ts
     * 
     * // returns the current map zoom
     * JMap.Map.getZoom()
     * ```
     */
    function getZoom(): number

    /**
     * ***JMap.Map.getScale***
     * 
     * Returns the current map scale.
     * 
     * @example ```ts
     * 
     * // returns the current map scale
     * JMap.Map.getScale()
     * ```
     */
    function getScale(): number

    /**
     * ***JMap.Map.isNavigationHistoryControlVisible***
     * 
     * Returns true if the Navigation History control is visible on the map.
     * 
     * @example ```ts
     * 
     * // returns true if control is displayed on the map
     * JMap.Map.isNavigationHistoryControlVisible()
     * ```
     */
    function isNavigationHistoryControlVisible(): boolean

    /**
     * ***JMap.Map.setNavigationHistoryControlVisibility***
     * 
     * Change the Navigation History control visibility on the map.
     * 
     * @param isVisible true to display the Navigation History control, false to hide
     * @example ```ts
     * 
     * // will display the Navigation History control on the map
     * JMap.Map.setNavigationHistoryControlVisibility(true)
     * 
     * // will hide the Navigation History control on the map
     * JMap.Map.setNavigationHistoryControlVisibility(false)
     * ```
     */
    function setNavigationHistoryControlVisibility(isVisible: boolean): void

    /**
     * ***JMap.Map.isMapRotationControlVisible***
     * 
     * Returns true if the Map Rotation control is visible on the map.
     * 
     * @example ```ts
     * 
     * // returns true if control is displayed on the map
     * JMap.Map.isMapRotationControlVisible()
     * ```
     * 
     */
    function isMapRotationControlVisible(): boolean
  
    /**
     * ***JMap.Map.setMapRotationControlVisibility***
     * 
     * Change the Map Rotation control visibility on the map.
     * 
     * @param isVisible true to display the Map Rotation control, false to hide
     * 
     * @example ```ts
     * 
     * // will display the Map Rotation control on the map
     * JMap.Map.setMapRotationControlVisibility(true)
     * 
     * // will hide the Map Rotation control on the map
     * JMap.Map.setMapRotationControlVisibility(false)
     * ```
     */
    function setMapRotationControlVisibility(isVisible:boolean):void
  
    /**
     * ***JMap.Map.isScaleControlVisible***
     * 
     * Returns true if the scale control panel is visible on the map.
     * 
     * @example ```ts
     * 
     * // returns true if control is displayed on the map
     * JMap.Map.isScaleControlVisible()
     * ```
     */
    function isScaleControlVisible(): boolean

    /**
     * ***JMap.Map.setScaleControlVisibility***
     * 
     * Change the scale control panel visibility on the map.
     * 
     * @param isVisible true to display the scale control, false to hide
     * @param position the position on the map where to display the scale control.
     * @example ```ts
     * 
     * // will display the scale control on the map
     * JMap.Map.setScaleControlVisibility(true)
     * 
     * // will hide the scale control on the map
     * JMap.Map.setScaleControlVisibility(false)
     * ```
     */
    function setScaleControlVisibility(isVisible: boolean, position?: JMapPosition): void

    /**
     * ***JMap.Map.setScaleControlUnits***
     * 
     * Change the scale control units.
     * 
     * @param units possible values : "imperial", "metric", or "nautical"
     * @example ```ts
     * 
     * // will change the scale control for imperial units
     * JMap.Map.setScaleControlUnits("imperial")
     * ```
     */
    function setScaleControlUnits(units: "imperial" | "metric" | "nautical"): void

    /**
     * ***JMap.Map.setScaleControlPosition***
     * 
     * Change the scale control position on the map.
     * 
     * @param position the position on the map where to display the scale control.
     * @example ```ts
     * 
     * // will move the scale control on the top-left corner of the map
     * JMap.Map.setScaleControlPosition("top-left")
     * ```
     */
    function setScaleControlPosition(position: JMapPosition): void

    /**
     * ***JMap.Map.getScaleControlPosition***
     * 
     * Return the current scale control position on the map.
     * 
     * @example ```ts
     * 
     * // Return the current scale control position
     * JMap.Map.getScaleControlPosition()
     * ```
     */
    function getScaleControlPosition(): JMapPosition

    /**
     * **JMap.Map.isLayerRendered**
     * 
     * Returns true if layer is visible on the map.
     * 
     * To be true the layer visibility property has to be true,
     * and the current map scale between the layer min and max scale.
     * 
     * @example ```ts
     * 
     * // returns true if layer is visible on the map
     * JMap.Map.isLayerRendered(4)
     * ```
     */
    function isLayerRendered(layerId: number): boolean

    /**
     * **JMap.Map.getLayersVisibilityStatus**
     * 
     * Returns layers visibility status.
     * 
     * The result is a map (= javascript object) where :
     *  - the key is the JMap layer id
     *  - the value is a JMapLayersVisibilityStatus object
     * 
     * A JMapLayersVisibilityStatus object has the following properties :
     *  - layerId: the layer id
     *  - layerName: the layer name
     *  - isRendered: true if 'visibilityProperty', 'parentVisibility', 
     *                'scaleVisibility' and 'extentVisibility' are all true
     *  - visibilityProperty: user can show or hide a layer
     *  - parentVisibility: return false if one of its group parent(s) has
     *                      its visibility property equals to false
     *  - scaleVisibility: return false if at the current scale the layer
     *                     cannot be displayed
     *  - extentVisibility: return false if the extent of the layer is not
     *                      contains by the current view of the map
     * 
     * @example ```ts
     * 
     * // returns the visibility status
     * JMap.Map.getLayersVisibilityStatus()
     * 
     * // Example of result :
     * {
     *  1: { layerId: 1, layerName: "layer 1", isRendered: true, visibilityProperty: true, parentVisibility: true, scaleVisibility: true, extentVisibility: true }
     *  2: { layerId: 2, layerName: "layer 2", isRendered: false, visibilityProperty: true, parentVisibility: true, scaleVisibility: false, extentVisibility: true }
     *  3: { layerId: 3, layerName: "layer 3", isRendered: false, visibilityProperty: false, parentVisibility: true, scaleVisibility: false, extentVisibility: true }
     *  4: { layerId: 4, layerName: "layer 4", isRendered: false, visibilityProperty: false, parentVisibility: false, scaleVisibility: false, extentVisibility: true }
     *  5: { layerId: 5, layerName: "layer 5", isRendered: false, visibilityProperty: true, parentVisibility: true, scaleVisibility: true, extentVisibility: false }
     * }
     * ```
     */
    function getLayersVisibilityStatus(): JMapLayersVisibilityStatus

    /**
     * **JMap.Map.getLayersVisibilityStatusAsArray**
     * 
     * Returns layers visibility status as an array of JMapLayersVisibilityStatus object.
     * 
     * A JMapLayersVisibilityStatus object has the following properties :
     *  - layerId: the layer id
     *  - layerName: the layer name
     *  - isRendered: true if 'visibilityProperty', 'parentVisibility', 
     *                'scaleVisibility' and 'extentVisibility' are all true
     *  - visibilityProperty: user can show or hide a layer
     *  - parentVisibility: return false if one of its group parent(s) has
     *                      its visibility property equals to false
     *  - scaleVisibility: return false if at the current scale the layer
     *                     cannot be displayed
     *  - extentVisibility: return false if the extent of the layer is not
     *                      contains by the current view of the map
     * 
     * @example ```ts
     * 
     * // returns the visibility status as an object array
     * JMap.Map.getLayersVisibilityStatusAsArray()
     * 
     * // Example of result :
     * [
     *  { layerId: 1, layerName: "layer 1", isRendered: true, visibilityProperty: true, parentVisibility: true, scaleVisibility: true, extentVisibility: true }
     *  { layerId: 2, layerName: "layer 2", isRendered: false, visibilityProperty: true, parentVisibility: true, scaleVisibility: false, extentVisibility: true }
     *  { layerId: 3, layerName: "layer 3", isRendered: false, visibilityProperty: false, parentVisibility: true, scaleVisibility: false, extentVisibility: true }
     *  { layerId: 4, layerName: "layer 4", isRendered: false, visibilityProperty: false, parentVisibility: false, scaleVisibility: false, extentVisibility: true }
     *  { layerId: 5, layerName: "layer 5", isRendered: false, visibilityProperty: true, parentVisibility: true, scaleVisibility: true, extentVisibility: false }
     * ]
     * ```
     */
    function getLayersVisibilityStatusAsArray(): JMapLayerVisibilityStatus[]

    /**
     * **JMap.Map.getMapboxSupportedJMapLayerIds**
     * 
     * Returns all layer ids that are displayed by the map.
     * 
     * Mapbox doesn't support all layer types defined in JMap Server.
     * 
     * This function returns all layers ids that are managed by the map.
     * 
     * @example ```ts
     * 
     * // returns layer ids supported by the Mapbox
     * JMap.Map.getMapboxSupportedJMapLayerIds()
     * ```
     */
    function getMapboxSupportedJMapLayerIds(): number[]
    
    /**
     * **JMap.Map.getMapboxSupportedJMapVectorLayerIds**
     * 
     * Returns all vector layer ids that are displayed by the map.
     * 
     * Mapbox doesn't support all layer types defined in JMap Server.
     * 
     * This function returns all vector layers ids that are managed by the map.
     * 
     * @example ```ts
     * 
     * // returns vector layer ids managed by the map implementation
     * JMap.Map.getMapboxSupportedJMapVectorLayerIds()
     * ```
     */
    function getMapboxSupportedJMapVectorLayerIds(): number[]
    
    /**
     * **JMap.Map.getMapboxSupportedJMapLayerBefore**
     * 
     * Returns the Mapbox supported JMap layer id that is ordered before the JMap layer id provided in argument.
     * 
     * @throws Error if layer is not found
     * @param layerId The JMap layer id
     * @returns the JMap layer id, or undefined if no layer before
     * @example ```ts
     * 
     * // Returns the layer id that is located before layer id=4
     * JMap.Map.getMapboxSupportedJMapLayerBefore(4)
     * ```
     */
    function getMapboxSupportedJMapLayerBefore(layerId: number): number | undefined
    
    /**
     * **JMap.Map.getMapboxSupportedJMapLayerAfter**
     * 
     * Returns the Mapbox supported JMap layer id that is ordered after the JMap layer id provided in argument.
     * 
     * @throws Error if layer is not found
     * @param layerId The JMap layer id
     * @returns the JMap layer id, or undefined if no layer after
     * @example ```ts
     * 
     * // Returns the layer id that is located after layer id=3
     * JMap.Map.getMapboxSupportedJMapLayerAfter(3)
     * ```
     */
    function getMapboxSupportedJMapLayerAfter(layerId: number): number | undefined

    /**
     * **JMap.Map.addMapboxLayerConfigurationForJmapLayer**
     * 
     * Add a JMap layer to the Mapbox supported layer configuration. This method will enable a JMap Layer that would otherwise not 
     * be displayed on the map, and that would otherwise be disabled in the layer tree panel.
     *  
     * @throws Error if layer is not found, or if layer is already displayed on the map
     * @param params a  JMapAddMapboxLayerConfigurationForJmapLayerParams object
     * 
     * @example ```ts
     * 
     * // Add Jmap layer id 118 to the mapbox supported layer configuration, before layer id 147
     * 
     *   JMap.Map.addMapboxLayerConfigurationForJmapLayer({
     *    jmapLayerId: 118,
     *    beforeJmapLayerId: 147,
     *    baseStyle: {
     *      styleLayer: {
     *        "id": "this-id-will-be-normalized",
     *        "type": "fill",
     *        "paint": {
     *          "fill-color": "#FF0000"
     *        },
     *        "layout": {
     *          visibility: "visible" // visibility will be normalized
     *        },
     *        "source": "pre-existing-source-id-or-embeded-source",
     *        "source-layer": "needed-if-adding-a-vector-tile-source"
     *      }
     *    }
     *  })
     * ```
     */
    function addMapboxLayerConfigurationForJmapLayer(params: JMapAddMapboxLayerConfigurationForJmapLayerParams): void

    /**
     * **JMap.Map.getRenderedJMapLayerIds**
     * 
     * Returns the ids of the layers that are displayed on the map.
     * 
     * Mapbox doesn't support all layer types defined on JMap Server.
     * 
     * This function returns all layers ids that are managed by the map.
     * 
     * @example ```ts
     * 
     * // returns all layer ids that are managed by the map
     * JMap.Map.getRenderedJMapLayerIds()
     * ```
     */
    function getRenderedJMapLayerIds(): number[]

    /**
     * **JMap.Map.getRenderedFeatures**
     * 
     * Returns rendered geojson features for the layer.
     * 
     * @throws Error if layer is not found
     * @throws Error if no or incorrect filter is passed
     * @param layerId The JMap layer id
     * @param filter You can pass a location, a boundary box, or a circle (radius in km). Will returns only features that intersect.
     * @return A features array
     * @example ```ts
     * 
     * // Returns all rendered geojson features for layer 4
     * JMap.Map.getRenderedFeatures(4)
     * 
     * // Returns all rendered geojson features for layer 4 at location x=45.54 and y=65.43
     * JMap.Map.getRenderedFeatures(4, { x: 45.54, y: 65.43 })
     * 
     * // Returns all rendered geojson features for layer 4, that intersect the circle (radius in km)
     * JMap.Map.getRenderedFeatures(4, { center: { x: 45.54, y: 65.43 }, radius: .5 })
     * 
     * // Returns all rendered geojson features for layer 4, that intersect the boundary box
     * // having south-west { x=45.54 and y=65.43 } and north-est { x=48.54 and y=70.43 }
     * JMap.Map.getRenderedFeatures(4, {
     *  sw: { x: 45.54, y: 65.43 },
     *  ne: { x: 48.54, y: 70.43 }
     * })
     * ```
     */
    function getRenderedFeatures(layerId: number, filter?: JLocation | JBoundaryBox | JCircle): GeoJSON.Feature[]
    
    /**
     * **JMap.Map.getRenderedFeaturesAttributeValues**
     * 
     * Returns rendered features attributes for the layer.
     * 
     * The result is an array of object, one object for each feature.
     * Each object contains all feature's attributes, plus another one that is called "featureId" and contains the feature id.
     * 
     * @throws Error if layer is not found
     * @throws Error if no or incorrect filter is passed
     * @param layerId The JMap layer id
     * @param filter You can pass a location, a boundary box, or a circle (radius in km). Will returns only features that intersect.
     * @return An object array
     * @example ```ts
     * 
     * // returns all features attributes for layer 4
     * JMap.Map.getRenderedFeaturesAttributeValues(4)
     * 
     * // returns all features attributes for layer 4, that intersect the location
     * JMap.Map.getRenderedFeaturesAttributeValues(4, { x: 45.54, y: 65.43 })
     * 
     * // returns all features attributes for layer 4, that intersect the circle (radius in km)
     * JMap.Map.getRenderedFeaturesAttributeValues(4, { center: { x: 45.54, y: 65.43 }, radius: .5 })
     * 
     * // returns all features attributes for layer 4, that intersect the boundary box
     * JMap.Map.getRenderedFeaturesAttributeValues(4, { sw: { x: 45.54, y: 65.43 }, ne: { x: 48.54, y: 70.43 }})
     * 
     * // Example of result for features that have only 2 attributes "Firestation" and "Nursery" :
     * [
     *  { name: "Firestation", age: 23, featureId: 2377 },
     *  { name: "Nursery", age: 20, featureId: 3456 }
     * ]
     * ```
     */
    function getRenderedFeaturesAttributeValues(layerId: number, filter?: JLocation | JBoundaryBox | JCircle): JMapFeatureAttributeValues[]
    
    /**
     * **JMap.Map.getAvailableBaseMaps**
     * 
     * Returns the available basemap names that can be used with method setBaseMap.
     * 
     * Possible values are : "light", "streets", "satellite", "dark", "outdoors", or "none"
     * 
     * Special value "none" means no basemap displayed.
     * 
     * @returns an array of string, the available basemap names
     * @example ```ts
     * 
     * // returns an array of string comtaining names of available basemaps
     * JMap.Map.getAvailableBaseMaps()
     * ```
     */
    function getAvailableBaseMaps(): string[]

    /**
     * **JMap.Map.getNavigationHistoryStack**
     * 
     * Returns the complete stack of navigation steps recorded in the session (stack is limited to 64 entries, older ones are discarded)
     * 
     * @returns an array of JMapNavigationStep
     * 
     * @example ```ts
     * 
     * // get the navigation stack
     * const navStack: JMapNavigationStep[] = JMap.Map.getNavigationHistoryStack()
     * ```
     */
    function getNavigationHistoryStack():JMapNavigationStep[]

    /**
     * **JMap.Map.undoLastNavigationStep**
     * 
     * Step back in the navigation history recorded in the current map session
     * 
     * Will apply the necessary pan, zoom, bearing and pitch to get back to the last
     * Map view. Maximum number of recorded steps is 64 (older steps get erased)
     * 
     * @returns The last JMapNavigationStep, or undefined if the stack is not rewindable anymore
     * 
     * @example ```ts
     * 
     * // navigate to the previous recorded map view
     * const lastStep: JMapNavigationStep | undefined = JMap.Map.undoLastNavigationStep()
     * ```
     */
    function undoLastNavigationStep(): JMapNavigationStep | undefined

    /**
     * ***JMap.Map.getBaseMap***
     * 
     * Returns the current map pitch.
     * 
     * @example ```ts
     * 
     * // returns the current map pitch
     * JMap.Map.getPitch()
     * ```
     */
    function getPitch(): number

    /**
     * ***JMap.Map.getBaseMap***
     * 
     * Returns the current map bearing (rotation).
     * 
     * @example ```ts
     * 
     * // returns the current map bearing
     * JMap.Map.getBearing()
     * ```
     */
    function getBearing(): number

    /**
     * ***JMap.Map.getBaseMap***
     * 
     * Returns the current basemap.
     * 
     * Possble values are : "light", "streets", "satellite", "dark", "outdoors", or "none"
     * 
     * Special value "none" means no basemap is dsplayed.
     * 
     * @example ```ts
     * 
     * // returns the current basemap
     * JMap.Map.getBaseMap()
     * ```
     */
    function getBaseMap(): string
    
    /**
     * **JMap.Map.setBaseMap**
     * 
     * Apply the basemap on the map.
     * 
     * @throws Error if mapName is not supported
     * @param mapName The name of the basemap, use JMap.Map.getAvailableBaseMaps() to get available basemap names
     * @example ```ts
     * 
     * // Set the basemap as "streets"
     * JMap.Map.setBaseMap("streets")
     * ```
     */
    function setBaseMap(mapName: string): void

    /**
     * **JMap.Map.setBearing**
     * 
     * Set the bearing on the map (rotation)
     * 
     * @throws Error if the bearing is not between -360 to 360 degree
     * @param bearing te new value of the bearing between 0 to 360
     * @example ```ts
     * 
     * // Set 30 degrees bearing
     * JMap.Map.setBearing(30)
     * ```
     */
    function setBearing(bearing: number): void

    /**
     * **JMap.Map.setPitch**
     * 
     * Set the pitch on the map
     * 
     * @throws Error if the pitch is not between 0 to 60 degree
     * @param pitch te new value of the pitch between 0 to 60
     * @example ```ts
     * 
     * // Set 30 degrees pitch
     * JMap.Map.setPitch(30)
     * ```
     */
    function setPitch(pitch: number): void

    /**
     * **JMap.Map.panTo**
     * 
     * Move and center the map to the location (animated)
     * 
     * @throws Error if no or incorrect center is passed
     * @param center The location where the map will be centered
     * @param stopJMapEventPropagation if true will prevent JMap events to be fired
     * @example ```ts
     * 
     * // Move the map to the desired location
     * JMap.Map.panTo({ x: 45.34, y: 65.87 })
     * ```
     */
    function panTo(center: JLocation, stopJMapEventPropagation?: boolean): void

    /**
     * **JMap.Map.zoomTo**
     * 
     * Zoom or unzoom the map (animated)
     * 
     * @throws Error if no zoom is passed
     * @param zoom The zoom level to apply
     * @param options animation, zoom padding, stop event, etc ...
     * @example ```ts
     * 
     * // Zoom or unzoom the map to reach the desired zoom level
     * JMap.Map.zoomTo(4.45)
     * ```
     */
    function zoomTo(zoom: number, options?: JPanAndZoomOptions): void
    
    /**
     * **JMap.Map.zoomToRect**
     * 
     * Zoom or unzoom to fit exactly the boundary box (animated)
     * 
     * @throws Error if an invalid bbox is passed
     * @param bbox The boundary box to fit
     * @param options animation, zoom padding, stop event, etc ...
     * @example ```ts
     * 
     * // Zoom or unzoom to fit exactly the boundary box
     * JMap.Map.zoomToRect({ sw: { x: 12, y: 34 }, ne: { x: 23, y: 32 }})
     * ```
     */
    function zoomToRect(bbox: JBoundaryBox, options?: JPanAndZoomOptions): void

    /**
     * **JMap.Map.panAndZoomTo**
     * 
     * Move and zoom (or unzoom) the map (animated)
     * 
     * @throws Error if bad parameters are passed
     * @param center The location where the map will be centered
     * @param zoom The zoom level to apply
     * @param options animation, zoom padding, stop event, etc ...
     * @example ```ts
     * 
     * // Move and zoom the map
     * JMap.Map.panAndZoomTo({ x: 45.34, y: 65.87 }, 5)
     * ```
     */
    function panAndZoomTo(center: JLocation, zoom: number, options?: JPanAndZoomOptions): void

    /**
     * **JMap.Map.setDefaultZoomOptions**
     * 
     * Set zoom default values in JMap Core.
     * 
     * This default values will be used in all methods that use zoom options.
     * 
     * If zoom options are passed in methods, this default values will be overriden by passed values.
     * 
     * If no object is passed, default values are reset with JMap Core default values.
     * 
     * @param options animation, paddings, and maxZoom
     * @example ```ts
     * 
     * // Set default values used by JMap Core
     * JMap.Map.setDefaultZoomOptions({
     *  animate: false,
     *  paddingTop: 20,
     *  paddingLeft: 20,
     *  paddingRight: 20,
     *  paddingBottom: 20
     * })
     * 
     * // Reset default values with JMap Core default values
     * // animate=true, and paddings are all 50.
     * JMap.Map.setDefaultZoomOptions()
     * ```
     */
    function setDefaultZoomOptions(options?: Partial<JZoomOptions>): void

    /**
     * **JMap.Map.navigateTo**
     * 
     * Navigate to a location on the map (animated)
     * 
     * @throws Error if bad parameters are passed
     * @param params the navigation params
     * 
     * @example ```ts
     * 
     * // Navigate to a location on the map
     * JMap.Map.navigateTo({center: { x: 45.34, y: 65.87 }, zoom: 5, bearing: 170, pitch: 30, mapBoxEventData: { stopJMapEventPropagation: true }})
     * ```
     */
    function navigateTo(params: JMapNavigateToParams): void

    /**
     * **JMap.Map.fitFeatures**
     * 
     * Move and zoom (or unzoom) to display the given features.
     * 
     * @throws Error if bad parameters are passed
     * @param features The features where the map will be centered
     * @param options parameter to customize the animation, padding, and/or maxZoomLevel
     * @example ```ts
     * 
     * // first select some features on layer id=3
     * const features = JMap.Map.Selection.getSelectedFeaturesForLayer(3) // return layer id=3 selected features
     * // Move and zoom to display the features
     * JMap.Map.fitFeatures(features)
     * 
     * // The same with optional parameters
     * JMap.Map.fitFeatures(features, {
     *  animate: false, // default true
     *  paddingTop: 120, // default 50
     *  paddingLeft: 100, // default 50
     *  paddingRight: 100, // default 50
     *  paddingBottom: 120, // default 50
     *  maxZoom: 10 // default the current zoom
     * })
     * ```
     */
    function fitFeatures(features: GeoJSON.Feature[], options?: JPanAndZoomOptions): void
    
    /**
     * **JMap.Map.flashLocation**
     * 
     * Display a pulsing dot on the map to hilite a location, with options
     * 
     * Flashed feature can be immediatly removed using [[JMap.Map.clearFlashingLocations]]
     * 
     * @param location a JLocation
     * @param options (see example)
     * @example ```ts
     * 
     * // define a location in lat-lon coordinates
     * const locationToFlash = {x:-74.178, y:46.0455}
     * // define options
     * const flashOptions = { // Optional. 
     *  dotColor: { // Optional. Default { red: 165, green: 165, blue: 255, alpha: 1 }
     *    red:100 , // 0-255
     *    green:100 , // 0-255
     *    blue:255 , // 0-255
     *    alpha: 1.0 // 0-1
     * },  
     *  haloColor: { // Optional. Default { red: 105, green: 105, blue: 255, alpha: 1 }
     *    red:0 ,  // 0-255
     *    reen:255 , // 0-255
     *    blue:100 , // 0-255
     *    alpha: 1 // 0-1
     * },
     *  size: 100, // Optional, in pixels, default 100
     *  delay: 5000, // Optional, in milliseconds. default no expiration delay (flash indefinitely)
     *  fitFeatures: true, // Optional, will pan and zoom to display all flashed features. Default: false
     *  panAndZoomOptions: { // optionnal
     *    animate: false, // default true
     *    paddingTop: 120, // default 50
     *    paddingLeft: 100, // default 50
     *    paddingRight: 100, // default 50
     *    paddingBottom: 120, // default 50
     *    maxZoom: 10 // default the current zoom
     *  }
     * }
     * 
     * JMap.Map.flashLocation(locationToFlash,flashOptions)
     * ```
     */
    function flashLocation(location: JLocation, options?: JMapFlashLocationParams): void
    
    /**
     * **JMap.Map.flashLocations**
     * 
     * Display a collection of pulsing dots on the map to hilite several locations, with options
     * 
     * Flashed features can be immediatly removed using [[JMap.Map.clearFlashingLocations]]
     * 
     * @param locations an array of JLocations
     * @param options (see example)
     * @example ```ts
     * 
     * // define locations in lat-lon coordinates
     * const locationsToFlash = [{x:-74.178, y:46.0455}, {x:-74.3, y:46.2}, {x:-74, y:46.2}]
     * // define options
     * const flashOptions = { // Optional. 
     *  dotColor: { // Optional. Default { red: 165, green: 165, blue: 255, alpha: 1 }
     *    red:100 , // 0-255
     *    green:100 , // 0-255
     *    blue:255 , // 0-255
     *    alpha: 1.0 // 0-1
     * },  
     *  haloColor: { // Optional. Default { red: 105, green: 105, blue: 255, alpha: 1 }
     *    red:0 ,  // 0-255
     *    reen:255 , // 0-255
     *    blue:100 , // 0-255
     *    alpha: 1 // 0-1
     * },
     *  size: 100, // Optional, in pixels, default 100
     *  delay: 5000, // Optional, in milliseconds. default no expiration delay (flash indefinitely)
     *  fitFeatures: true, // Optional, will pan and zoom to display all flashed features. Default: false
     *  panAndZoomOptions: { // optionnal
     *    animate: false, // default true
     *    paddingTop: 120, // default 50
     *    paddingLeft: 100, // default 50
     *    paddingRight: 100, // default 50
     *    paddingBottom: 120, // default 50
     *    maxZoom: 10 // default the current zoom
     *  }
     * }
     * 
     * JMap.Map.flashLocations(locationsToFlash,flashOptions)
     * ```
     */
    function flashLocations(locations: JLocation[], options?: JMapFlashLocationParams): void
  
    /**
     * **JMap.Map.clearFlashingLocations**
     * 
     * Immediatly remove all flashed locations on the map that have been displyed using [[JMap.Map.flashLocation]] or [[JMap.Map.flashLocations]]
     * 
     * @example ```ts
     * 
     * // flash a location indefinetly
     * JMap.Map.flashLocation({x:-74.178, y:46.0455})
     * 
     * // clear all flashed locations after a timeout of 30 seconds
     * setTimeout(()=>JMap.Map.clearFlashingLocations(), 30000)
     * ```     
     * */
    function clearFlashingLocations():void

    /**
     * **JMap.Map.Interaction**
     * 
     * We introduced a notion of map interactor in JMap.
     * 
     * The need is that we want the map to interact in different ways depending on what the user is doing :
     *  - When he is drawing on the map we display shape on the map
     *  - When he is clicking on the map we display a popup information
     *  - etc...
     * 
     * So we defined our own map interactors for JMap, and we also allow you to create and register your own interactors.
     * 
     * An interactor is a JS object that define 4 functions (for more details consult interface [[JMapInteractor]]) :
     * ```ts
     *  - init(map: any): void
     *  - activate(): void
     *  - deactivate(): void
     *  - terminate(): void
     * ```
     * 
     * After creating your interactor object, you need to add it through the interaction service :
     * ```ts
     *  JMap.Map.Interaction.addInteractor(
     *    "display-bubbles-on-click", // interactor id
     *    bubbleInteractor, // interactor object
     *    true // if true activate the interactor after being added
     * )
     * ```
     * 
     * There is always an interactor actived, and this is the active interactions that are in use on the map.
     * 
     * When you activate an interactor, the previous one is deactivated, and the new one activated on the map.
     * 
     * When you don't need anymore an interactor you can terminate it, and it will not exist anymore in the JMap Web Core library.
     */
    namespace Interaction {
      
      /**
       * **JMap.Map.Interaction.addInteractor**
       * 
       * Add a map interactor.
       * 
       * If the id has already an existing interactor defined for, it will replace the old one.
       * 
       * So be carrefull not to remove JMap interactors.
       * 
       * You can get the list of already existing interactor ids like this :
       * ```ts
       * JMap.Map.Interaction
       *    .getAllInteractorDescriptors()
       *    .map(interactor => interactor.id)
       * ```
       * 
       * @throws Error if bad parameters are passed
       * @param id The new interactor id.
       * @param interactor The map interactor object
       * @param active If true will activate the new interactor after being added
       * @example ```ts
       * 
       * // add a new interactor
       * JMap.Map.Interaction.addInteractor("my-custom-pin", { ...mapInteractor }, false)
       * 
       * // add and activate a new interactor
       * JMap.Map.Interaction.addInteractor("my-custom-pin", { ...mapInteractor }, true)
       * ```
       */
      function addInteractor(id: string, interactor: JMapInteractor, active?: boolean): void
      
      /**
       * **JMap.Map.Interaction.terminateInteractorById**
       * 
       * Terminate the map interactor.
       * 
       * After being terminated, the interactor doesn't exist anymore in JMap Web Core library.
       * 
       * You cannot activate it anymore.
       * 
       * @throws Error if interactor is not found
       * @param interactorId The interactor id to terminate
       * @example ```ts
       * 
       * // terminate interactor id="custom-selection"
       * JMap.Map.Interaction.terminateInteractorById("custom-selection")
       * ```
       */
      function terminateInteractorById(interactorId: string): void
      
      /**
       * **JMap.Map.Interaction.getAllInteractorIds**
       * 
       * Returns all existing interactor ids.
       * 
       * @example ```ts
       * 
       * // returns all existing interactor ids
       * JMap.Map.Interaction.getAllInteractorIds()
       * ```
       */
      function getAllInteractorIds(): string[]
      
      /**
       * **JMap.Map.Interaction.getActiveInteractorId**
       * 
       * Returns the active interactor id.
       * 
       * @example ```ts
       * 
       * // Returns the active interactor descriptor
       * JMap.Map.Interaction.getActiveInteractorId()
       * ```
       */
      function getActiveInteractorId(): string
      
      /**
       * **JMap.Map.Interaction.activateInteractorById**
       * 
       * Activate an existing map interactor.
       * 
       * Deactivate the previous one, and activate the new one.
       * 
       * @throws Error if interactor is not found
       * @param interactorId The interactor id to activate
       * @example ```ts
       * 
       * // Activate the JMAP defined interactor "draw"
       * JMap.Map.Interaction.activateInteractorById("draw")
       * ```
       */
      function activateInteractorById(interactorId: string): void
    }
    
    /**
     * **JMap.Map.Filter**
     * 
     * JMap offer the ability to filter the features that are rendered on the map.
     * 
     * We can apply filter on attributes values, or a spatial filter.
     */
    namespace Filter {
      
      /**
       * **JMap.Map.Filter.applyHasAttribute**
       * 
       * Render only layer's features that has the attribute defined in their properties.
       * If the feature attribute is defined but its value is undefined, the feature will be rendered.
       * 
       * Only one attribute filter can be set for a specific layer and attributeId at the same time.
       * 
       * @throws Error if layer or attribute is not found
       * @param layerId The JMap layer id
       * @param attributeId The JMap attribute id
       * @returns The filter id. By example for layer 4 and attribute 'on_off' => "attribute-4-on_off"
       * @example ```ts
       * 
       * // Will render only features having attribute "name" for layer 4
       * JMap.Map.Filter.applyHasAttribute(4, "name")
       * ```
       */
      function applyHasAttribute(layerId: number, attributeId: string): string
      
      /**
       * **JMap.Map.Filter.applyHasNotAttribute**
       * 
       * Render only layer's features that hasn't the attribute defined in their properties.
       * If the property is defined but value is undefined, the feature will not be rendered.
       * 
       * Only one attribute filter can be set for a specific layer and attributeId at the same time.
       * 
       * @throws Error if layer or attribute is not found
       * @param layerId The JMap layer id
       * @param attributeId The JMap attribute id
       * @returns The filter id. By example for layer 4 and attribute 'on_off' => "attribute-4-on_off"
       * @example ```ts
       * 
       * // Will hide features having attribute "name" for layer 4
       * JMap.Map.Filter.applyHasNotAttribute(4, "name")
       * ```
       */
      function applyHasNotAttribute(layerId: number, attributeId: string): string
      
      /**
       * **JMap.Map.Filter.applyAttributeValueEqualTo**
       * 
       * Render only layer's features that has attributeId having value equals to attributeValue
       * 
       * Only one attribute filter can be set for a specific layer and attributeId at the same time.
       * 
       * @throws Error if layer or attribute is not found
       * @param layerId The JMap layer id
       * @param attributeId The JMap attribute id
       * @param attributeValue The attribute value
       * @returns The filter id. By example for layer 4 and attribute 'on_off' => "attribute-4-on_off"
       * @example ```ts
       * 
       * // Will render features having "name" equals to "Aquarius" for layer 4
       * JMap.Map.Filter.applyAttributeValueEqualTo(4, "name", "Aquarius")
       * ```
       */
      function applyAttributeValueEqualTo(layerId: number, attributeId: string, attributeValue: any): string
      
      /**
       * **JMap.Map.Filter.applyAttributeValueBetween**
       * 
       * Render only layer's features that has attributeId having value between start and end attributes,
       * including equals values.
       * 
       * Only one attribute filter can be set for a specific layer and attributeId at the same time.
       * 
       * @throws Error if layer or attribute is not found
       * @param layerId The JMap layer id
       * @param attributeId The JMap attribute id
       * @param start The min value
       * @param start The max value
       * @returns The filter id. By example for layer 4 and attribute 'on_off' => "attribute-4-on_off"
       * @example ```ts
       * 
       * // Will render only features having "level" greater or equals to 2 and lower or equals to 10 for layer 4
       * JMap.Map.Filter.applyAttributeValueBetween(4, "level", 2, 10)
       * ```
       */
      function applyAttributeValueBetween(layerId: number, attributeId: string, start: any, end: any): string
      
      /**
       * **JMap.Map.Filter.applyAttributeValueNotEqualTo**
       * 
       * Render only layer's features that has attributeId not having value equals to attributeValue
       * 
       * Only one attribute filter can be set for a specific layer and attributeId at the same time.
       * 
       * @throws Error if layer or attribute is not found
       * @param layerId The JMap layer id
       * @param attributeId The JMap attribute id
       * @param attributeValue The attribute value
       * @returns The filter id. By example for layer 4 and attribute 'on_off' => "attribute-4-on_off"
       * @example ```ts
       * 
       * // Will hide features having "name" equals "Aquarius" for layer 4
       * JMap.Map.Filter.applyAttributeValueNotEqualTo(4, "name", "Aquarius")
       * ```
       */
      function applyAttributeValueNotEqualTo(layerId: number, attributeId: string, attributeValue: any): string
      
      /**
       * **JMap.Map.Filter.applyAttributeValueGreaterThan**
       * 
       * Render only layer's features that has attributeId having value strictly greater to attributeValue.
       * 
       * Only one attribute filter can be set for a specific layer and attributeId at the same time.
       * 
       * @throws Error if layer or attribute is not found
       * @param layerId The JMap layer id
       * @param attributeId The JMap attribute id
       * @param attributeValue The attribute value
       * @returns The filter id. By example for layer 4 and attribute 'on_off' => "attribute-4-on_off"
       * @example ```ts
       * 
       * // Will render features having "level" strictly greater than 2 for layer 4
       * JMap.Map.Filter.applyAttributeValueGreaterThan(4, "level", 2)
       * ```
       */
      function applyAttributeValueGreaterThan(layerId: number, attributeId: string, attributeValue: any): string
      
      /**
       * **JMap.Map.Filter.applyAttributeValueGreaterOrEqualsTo**
       * 
       * Render only layer's features that has attributeId having value greater or equals to attributeValue.
       * 
       * Only one attribute filter can be set for a specific layer and attributeId at the same time.
       * 
       * @throws Error if layer or attribute is not found
       * @param layerId The JMap layer id
       * @param attributeId The JMap attribute id
       * @param attributeValue The attribute value
       * @returns The filter id. By example for layer 4 and attribute 'on_off' => "attribute-4-on_off"
       * @example ```ts
       * 
       * // Will render features having "level" greater or equals to 2 for layer 4
       * JMap.Map.Filter.applyAttributeValueGreaterOrEqualsTo(4, "level", 2)
       * ```
       */
      function applyAttributeValueGreaterOrEqualsTo(layerId: number, attributeId: string, attributeValue: any): string
      
      /**
       * **JMap.Map.Filter.applyAttributeValueLowerThan**
       * 
       * Render only layer's features that has attributeId having value strictly lower to attributeValue.
       * 
       * Only one attribute filter can be set for a specific layer and attributeId at the same time.
       * 
       * @throws Error if layer or attribute is not found
       * @param layerId The JMap layer id
       * @param attributeId The JMap attribute id
       * @param attributeValue The attribute value
       * @returns The filter id. By example for layer 4 and attribute 'on_off' => "attribute-4-on_off"
       * @example ```ts
       * 
       * // Will render features having "level" strictly lower to 5 for layer 4
       * JMap.Map.Filter.applyAttributeValueLowerThan(4, "level", 5)
       * ```
       */
      function applyAttributeValueLowerThan(layerId: number, attributeId: string, attributeValue: any): string
      
      /**
       * **JMap.Map.Filter.applyAttributeValueLowerOrEqualsTo**
       * 
       * Render only layer's features that has attributeId having value lower or equals to attributeValue.
       * 
       * Only one attribute filter can be set for a specific layer and attributeId at the same time.
       * 
       * @throws Error if layer or attribute is not found
       * @param layerId The JMap layer id
       * @param attributeId The JMap attribute id
       * @param attributeValue The attribute value
       * @returns The filter id. By example for layer 4 and attribute 'on_off' => "attribute-4-on_off"
       * @example ```ts
       * 
       * // Will render features having "level" lower or equals to 5 for layer 4
       * JMap.Map.Filter.applyAttributeValueLowerOrEqualsTo(4, "level", 5)
       * ```
       */
      function applyAttributeValueLowerOrEqualsTo(layerId: number, attributeId: string, attributeValue: any): string
      
      /**
       * **JMap.Map.Filter.applyAttributeValueIn**
       * 
       * Render only layer's features that has attributeId having value matching any values in attributeValues.
       * 
       * Only one attribute filter can be set for a specific layer and attributeId at the same time.
       * 
       * @throws Error if layer or attribute is not found
       * @param layerId The JMap layer id
       * @param attributeId The JMap attribute id
       * @param attributeValues The attribute values to match
       * @returns The filter id. By example for layer 4 and attribute 'on_off' => "attribute-4-on_off"
       * @example ```ts
       * 
       * // Will render features having "level" equals to 4 or 5, for layer 4
       * JMap.Map.Filter.applyAttributeValueIn(4, "level", [ 4, 5 ])
       * ```
       */
      function applyAttributeValueIn(layerId: number, attributeId: string, attributeValues: any[]): string
      
      /**
       * **JMap.Map.Filter.applyAttributeValueNotIn**
       * 
       * Render only layer's features that has attributeId having value not matching any values in attributeValues.
       * 
       * Only one attribute filter can be set for a specific layer and attributeId at the same time.
       * 
       * @throws Error if layer or attribute is not found
       * @param layerId The JMap layer id
       * @param attributeId The JMap attribute id
       * @param attributeValues The attribute values to match
       * @returns The filter id. By example for layer 4 and attribute 'on_off' => "attribute-4-on_off"
       * @example ```ts
       * 
       * // Will render features having "level" not equals to 4 or 5, for layer 4
       * JMap.Map.Filter.applyAttributeValueNotIn(4, "level", [ 4, 5 ])
       * ```
       */
      function applyAttributeValueNotIn(layerId: number, attributeId: string, attributeValues: any[]): string
      
      /**
       * **JMap.Map.Filter.applySpatial**
       * 
       * Render only layer's features that intersect the filterGeometry area.
       * 
       * Only one spatial filter can be set for a specific layer at the same time.
       * 
       * @throws Error if layer is not found, or filterGeometry format is not good
       * @param layerId The JMap layer id
       * @param filterGeometry The geometry that is the area to search. Can be a circle or a polygon.
       * @returns The filter id. By example for layer 4 => "spatial-4"
       * @example ```ts
       * 
       * // Will render features that intersect the circle of radius 500 (in km) centered at location x=20 and y=10.
       * JMap.Map.Filter.applySpatial(4, { radius: 500, center: { x: 20, y: 10 }})
       * 
       * // Will render features that intersect the polygon (in this case a square)
       * JMap.Map.Filter.applySpatial(4, [ [ 20.44, 10.32 ], [ 20.44, 78.44 ], [ 40.56, 78.44 ], [ 40.56, 10.32 ], [ 20.44, 10.32 ] ])
       * ```
       */
      function applySpatial(layerId: number, filterGeometry: JPolygon | JCircle): string
      
      /**
       * **JMap.Map.Filter.removeByFilterId**
       * 
       * Remove the filter on the map following the filter id passed in parameter. 
       * 
       * @param filterId The filter id. The one you get when you call a filter method that starts with apply.
       * @example ```ts
       * 
       * // Remove spatial filter on layer 3
       * JMap.Map.Filter.removeByFilterId("spatial-3")
       * 
       * // Remove attribute filter on attribute id="on_off", on layer 4
       * JMap.Map.Filter.removeByFilterId("attribute-4-on_off")
       * ```
       */
      function removeByFilterId(filterId: string): void

      /**
       * **JMap.Map.Filter.removeAllFilters**
       * 
       * Remove all spatial and attributes filters for layer.
       * 
       * @param layerId The JMap layer id
       * @example ```ts
       * 
       * // Remove all filters (spatial + attribute) for layer 3
       * JMap.Map.Filter.removeAllFilters(3)
       * ```
       */
      function removeAllFilters(layerId: number): void
    }

    /**
     * **JMap.Map.Selection**
     * 
     * You can select features on the map with JMap, this where you can manage the selection.
     * 
     * You can select on the map programatically by passing a location, or by passing features.
     * 
     * And you can also removing some or all features of the selection.
     */
    namespace Selection {

      /**
       * ***JMap.Map.Selection.isEmpty***
       * 
       * Returns true if no selection is made for all layers.
       * 
       * If at least one feature is selected on one layer, returns false.
       * 
       * @example ```ts
       * 
       * // Returns true if no selection is made for all layers.
       * JMap.Map.Selection.isEmpty()
       * ```
       */
      function isEmpty(): boolean

      /**
       * ***JMap.Map.Selection.getSelectedFeatures***
       * 
       * Returns the current map selection as a javascript map (= a javascript object) where :
       *  - the key is the layer element id
       *  - the value is an array of feature (an empty array if layer doesn't have features selected)
       * 
       * @example ```ts
       * 
       * // returns the current selected features by layer id
       * JMap.Map.Selection.getSelectedFeatures()
       * ```
       */
      function getSelectedFeatures(): JMapSelection

      /**
       * ***JMap.Map.Selection.getSelectedFeaturesForLayer***
       * 
       * Returns the current selected features for a specific JMap layer.
       * 
       * @returns an array of GeoJSON features
       * @example ```ts
       * 
       * // returns the current selected features for layer 3
       * JMap.Map.Selection.getSelectedFeaturesForLayer(3)
       * ```
       */
      function getSelectedFeaturesForLayer(layerId: number): GeoJSON.Feature[]

      /**
       * ***JMap.Map.Selection.getSelectedFeatureIdsForLayer***
       * 
       * Returns the current selected feature ids for a specific JMap layer.
       * 
       * This function is the equivalent of that code :
       * ```ts
       * // returns the same as JMap.Map.getSelectedFeatureIdsForLayer(3)
       * JMap.Map.Selection
       *    .getSelectedFeaturesForLayer(layerId: number)
       *    .map(feature => feature.id)
       * ```
       * 
       * @example ```ts
       * 
       * // returns the current selected feature ids for layer 3
       * JMap.Map.Selection.getSelectedFeatureIdsForLayer(3)
       * ```
       */
      function getSelectedFeatureIdsForLayer(layerId: number): string[]

      /**
       * **JMap.Map.Selection.selectOnOneLayerAtLocation**
       * 
       * Select for specific layer its features that are at the location.
       * 
       * Same behavior as if you were clicking on the map in order to select features, but for only one layer.
       * 
       * @throws Error if layer is not found or location format is not good
       * @param layerId The JMap layer id
       * @param location The location where you want feature selection
       * @param params selection parameters, see [[JMapSelectionParams]]
       * @returns The features array
       * @example ```ts
       * 
       * // Process a selection on the map for layer id=4, at the location in params
       * JMap.Map.Selection.selectOnOneLayerAtLocation(4, { x: 34.23, y: 55.5 })
       * ```
       */
      function selectOnOneLayerAtLocation(layerId: number, location: JLocation, params?: JMapSelectionParams): GeoJSON.Feature[]

      /**
       * **JMap.Map.Selection.selectOnOneLayerFromCircle**
       * 
       * Select for specific layer its features that intersect the circle.
       * 
       * @throws Error if layer is not found or if circle format is not good
       * @param layerId The JMap layer id
       * @param circle The circle
       * @param params selection parameters, see [[JMapSelectionParams]]
       * @returns The features array
       * @example ```ts
       * 
       * // Process a selection on the map for layer id=4,
       * // selecting features intersecting the circle
       * JMap.Map.Selection.selectOnOneLayerFromCircle(
       *   4, //layer id
       *   {
       *     center: { x: 34.23, y: 55.5 },
       *     radius: 100
       *   }
       * )
       * ```
       */
      function selectOnOneLayerFromCircle(layerId: number, circle: JCircle, params?: JMapSelectionParams): GeoJSON.Feature[]

      /**
       * **JMap.Map.Selection.selectOnOneLayerFromLine**
       * 
       * Select for specific layer its features that intersect the line.
       * 
       * @throws Error if layer is not found or if line format is not good
       * @param layerId The JMap layer id
       * @param line The line
       * @param params selection parameters, see [[JMapSelectionParams]]
       * @returns The features array
       * @example ```ts
       * 
       * // Process a selection on the map for layer id=4,
       * // selecting features that intersect the line
       * JMap.Map.Selection.selectOnOneLayerFromLine(
       *   4, // The layer id
       *   [
       *     [ 34.23, 55.5 ],
       *     [ 36.24, 14.9 ],
       *     [ 45.23, 25.2 ]
       *   ]
       * )
       * ```
       */
      function selectOnOneLayerFromLine(layerId: number, line: JLine, params?: JMapSelectionParams): GeoJSON.Feature[]

      /**
       * **JMap.Map.Selection.selectOnOneLayerFromPolygon**
       * 
       * Select for specific layer its features that intersect the line.
       * 
       * @throws Error if layer is not found or if line format is not good
       * @param layerId The JMap layer id
       * @param polygon The line
       * @param params selection parameters, see [[JMapSelectionParams]]
       * @returns The features array
       * @example ```ts
       * 
       * // Process a selection on the map for layer id=4, selecting features intersecting the line
       * JMap.Map.Selection.selectOnOneLayerFromPolygon(
       *   4, // The layer id
       *   [
       *     [ 34.23, 55.5 ],
       *     [ 36.24, 14.9 ],
       *     [ 45.23, 25.2 ],
       *     [ 34.23, 55.5 ]
       *   ]
       * )
       * ```
       */
      function selectOnOneLayerFromPolygon(layerId: number, polygon: JPolygon, params?: JMapSelectionParams): GeoJSON.Feature[]

      /**
       * **JMap.Map.Selection.selectOnAllLayersAtLocation**
       * 
       * Select for all layers the features that are at the location.
       * 
       * Same behavior as if you were clicking on the map in order to select features.
       * 
       * @throws Error if location format is not good
       * @param location The location where you want feature selection
       * @param params selection parameters, see [[JMapSelectionParams]]
       * @returns The new feature selection
       * @example ```ts
       * 
       * // Process a selection on the map for all layers, at the location in params
       * JMap.Map.Selection.selectOnAllLayersAtLocation({ x: 34.23, y: 55.5 })
       * ```
       */
      function selectOnAllLayersAtLocation(location: JLocation, params?: JMapSelectionParams): JMapSelection

      /**
       * **JMap.Map.Selection.selectOnAllLayersFromCircle**
       * 
       * Select for all layers the features that intersect the circle.
       * 
       * @throws Error if circle format is not good
       * @param circle The circle
       * @param params selection parameters, see [[JMapSelectionParams]]
       * @returns The new feature selection
       * @example ```ts
       * 
       * // Process a selection on the map for all layers,
       * // select all features that intersect the circle
       * JMap.Map.Selection.selectOnAllLayersFromCircle({
       *   center: { x: 34.23, y: 55.5 },
       *   radius: 100
       * })
       * ```
       */
      function selectOnAllLayersFromCircle(circle: JCircle, params?: JMapSelectionParams): JMapSelection

      /**
       * **JMap.Map.Selection.selectOnAllLayersFromLine**
       * 
       * Select for all layers the features that intersect the line.
       * 
       * @throws Error if line format is not good
       * @param line The line
       * @param params selection parameters, see [[JMapSelectionParams]]
       * @returns The new feature selection
       * @example ```ts
       * 
       * // Process a selection on the map for all layers,
       * // select all features that intersect the line
       * JMap.Map.Selection.selectOnAllLayersFromLine([
       *   [ 34.23, 55.5 ],
       *   [ 36.24, 14.9 ],
       *   [ 45.23, 25.2 ]
       * ])
       * ```
       */
      function selectOnAllLayersFromLine(line: JLine, params?: JMapSelectionParams): JMapSelection

      /**
       * **JMap.Map.Selection.selectOnAllLayersFromPolygon**
       * 
       * Select for all layers the features that intersect the polygon.
       * 
       * @throws Error if polygon format is not good
       * @param polygon The polygon
       * @param params selection parameters, see [[JMapSelectionParams]]
       * @returns The new feature selection
       * @example ```ts
       * 
       * // Process a selection on the map for all layers,
       * // select all features that intersect the polygon
       * JMap.Map.Selection.selectOnAllLayersFromPolygon([
       *   [ 34.23, 55.5 ],
       *   [ 36.24, 14.9 ],
       *   [ 45.23, 25.2 ],
       *   [ 34.23, 55.5 ] // first and last point of a polygon must be equals
       * ])
       * ```
       */
      function selectOnAllLayersFromPolygon(polygon: JPolygon, params?: JMapSelectionParams): JMapSelection

      /**
       * **JMap.Map.Selection.setLayerSelection**
       * 
       * Set the selection for a specific layer.
       * 
       * Cancel previous selection if exist, and replace by new selection
       * 
       * @throws Error if layer is not found or features format is not good
       * @param layerId The JMap layer id
       * @param features The new selection. This is what will be selected on the map
       * @example ```ts
       * 
       * // will select feature (id = 234) of layer 4 on the map
       * JMap.Map.Selection.setLayerSelection(4, {
       *  id: 234,
       *  type: "Point",
       *  geometry: {...},
       *  properties: [...]
       * })
       * 
       * // will select two features (id = 234 and 567) of layer 4 on the map
       * JMap.Map.Selection.setLayerSelection(4, [
       *   {
       *    id: 234,
       *    type: "Point",
       *    geometry: {...},
       *    properties: [...]
       *   },
       *   {
       *    id: 567,
       *    type: "Point",
       *    geometry: {...},
       *    properties: [...]
       *   }
       * ])
       * ```
       */
      function setLayerSelection(layerId: number, features: GeoJSON.Feature | GeoJSON.Feature[]): void

      /**
       * **JMap.Map.Selection.addFeaturesToLayerSelection**
       * 
       * Add to the current layer selection the provided feature(s).
       * 
       * Don't cancel previous selection, but add features to it.
       * 
       * @throws Error if layer is not found or features format is not good
       * @param layerId The JMap layer id
       * @param features The feature(s) that will be selected on the map
       * @example ```ts
       * 
       * // Add one feature (id = 234) to layer 4 selection
       * JMap.Map.Selection.addFeaturesToLayerSelection(4, {
       *  id: 234,
       *  type: "Point",
       *  geometry: {...},
       *  properties: [...]
       * })
       * 
       * // Add 2 features (id = 234 and 567) to layer 4 selection
       * JMap.Map.Selection.addFeaturesToLayerSelection(4, [
       *   {
       *    id: 234,
       *    type: "Point",
       *    geometry: {...},
       *    properties: [...]
       *   },
       *   {
       *    id: 567,
       *    type: "Point",
       *    geometry: {...},
       *    properties: [...]
       *   }
       * ])
       * ```
       */
      function addFeaturesToLayerSelection(layerId: number, features: GeoJSON.Feature | GeoJSON.Feature[]): void

      /**
       * **JMap.Map.Selection.removeFeaturesFromLayerSelection**
       * 
       * Remove from current layer selection the provided feature(s).
       * 
       * Don't cancel previous selection, just remove feature(s) from it.
       * 
       * @throws Error if layer is not found or feature id(s) format is not good
       * @param layerId The JMap layer id
       * @param featureIds The feature id(s) that will be remove from the layer selection
       * @example ```ts
       * 
       * // Remove one feature (id = "234") from layer 4 selection
       * JMap.Map.Selection.removeFeaturesFromLayerSelection(4, "234")
       * 
       * // Remove 2 features (id = "234" and "567") from layer 4 selection
       * JMap.Map.Selection.removeFeaturesFromLayerSelection(4, [ "234", "567" ])
       * ```
       */
      function removeFeaturesFromLayerSelection(layerId: number, featureIds: string | string[]): void

      /**
       * **JMap.Map.Selection.removeFeaturesFromLayerSelection**
       * 
       * Clear all selection.
       * 
       * If a layer id is provided, clear only the layer selection, else clear selection of all layers.
       * 
       * @throws Error if a layer id is provided but not found
       * @param layerId The JMap layer id
       * @example ```ts
       * 
       * // Clear selection of layer 4
       * JMap.Map.Selection.clearSelection(4)
       * 
       * // Clear selection of all layers
       * JMap.Map.Selection.clearSelection()
       * ```
       */
      function clearSelection(layerId?: number): void
    }
  }

  /**
   * **JMap.MouseOver**
   * 
   * JMap provide a mecanism that is called MouseOver.
   * 
   * We can defined from JMap Admin a mouseover for a layer.
   * 
   * The mouseover is written in HTML, enriched with JMap specific function that are interpretated.
   * 
   * When we click on layers that have a mouseover defined, JMap display
   * a popup on the map with the formatted content for each features.
   * 
   * This section provide methods permitting you to customize the mouseover.
   */
  namespace MouseOver {

    /**
     * **JMap.MouseOver.renderForFeaturesAtLocation**
     * 
     * Get the feature selection at the location, and process the mouseover for it,
     * and render it inside the div of your choice.
     * 
     * It's like clicking on the map at a location, but instead of displaying on a popup,
     * you can render it on your own div.
     * 
     * @throws Error if div doesn't exist in the DOM, or location format is not good
     * @param containerId The div id where to display the mouseover content 
     * @param location The location on the map where you want to select features and display mouseover for
     * @return true if we displayed content in the div, false if no mouseover found for any layer
     * @example ```ts
     * 
     * // Display in the div id="my-custom-div" the content of mouseover
     * // if features has been found at the location x=34.44 and y=23.44
     * JMap.MouseOver.renderForFeaturesAtLocation("my-custom-div", { x: 34.44, y: 23.44 })
     * ```
     */
    function renderForFeaturesAtLocation(containerId: string, location: JLocation): boolean // returns true if has mouseover

    /**
     * **JMap.MouseOver.renderForFeaturesSelection**
     * 
     * From the feature selection you provide, it process the mouseover for it,
     * and render it inside the div of your choice.
     * 
     * @throws Error if div doesn't exist in the DOM, or selection format is not good
     * @param containerId The div id where to display the mouseover content 
     * @param selection A feature selection, the mouseover will be processed only for this features
     * @return true if we displayed content in the div, false if no mouseover found for any layer
     * @example ```ts
     * 
     * // Display in the div id="my-custom-div" the content of mouseover for the provided selection
     * JMap.MouseOver.renderForFeaturesSelection("my-custom-div", {
     *  4: [ // selection for layer 4
     *    { id: 345, type: "Point", geometry: {...}, properties: [...] },
     *    { id: 234, type: "Point", geometry: {...}, properties: [...] }
     *  ],
     *  8: [ // selection for layer 8
     *    { id: 187, type: "Line", geometry: {...}, properties: [...] },
     *    { id: 98, type: "Line", geometry: {...}, properties: [...] }
     *  ]
     * })
     * ```
     */
    function renderForFeaturesSelection(containerId: string, selection: JMapSelection): boolean

    /**
     * **JMap.MouseOver.getMouseOverContent**
     * 
     * Returns the mousever content for the provided feature selection. If no mouseover are defined
     * for any layer it returns undefined.
     * 
     * The result you get need first to be inserted in the DOM, then after the insertion,
     * you need to call the method processJSAndPhotosForContent()
     * (in order to finish displaying all informations)
     * 
     * You should not use this function, except for a very special need, instead you should use the
     * function JMap.MouseOver.renderForFeaturesSelection that do the same thing in one step.
     * 
     * @throws Error if selection format is not good
     * @param selection A feature selection, the mouseover will be processed only for this features
     * @return the mouseover content or undefined
     * @example ```ts
     * 
     * const mouseOverContent = JMap.MouseOver.getMouseOverContent({
     *  4: [ // selection for layer 4
     *    { id: 345, type: "Point", geometry: {...}, properties: [...] },
     *    { id: 234, type: "Point", geometry: {...}, properties: [...] }
     *  ],
     *  8: [ // selection for layer 8
     *    { id: 187, type: "Line", geometry: {...}, properties: [...] },
     *    { id: 98, type: "Line", geometry: {...}, properties: [...] }
     *  ]
     * })
     * 
     * const mouseOverDiv = document.getElementById("my-div-id")
     * if (mouseOverContent) {
     *  mouseOverDiv.innerHTML = mouseOverContent.html
     *  JMap.MouseOver.processJSAndPhotosForContent(mouseOverContent)
     * } else {
     *  // Emptying the div if no mouseover
     *  mouseOverDiv.innerHTML = ""
     * }
     * ```
     */
    function getMouseOverContent(selection: JMapSelection): JMouseOverContent | undefined

    /**
     * **JMap.MouseOver.processJSAndPhotosForContent**
     * 
     * Use this function only if you use JMap.MouseOver.getMouseOverContent function before.
     * 
     * You can call this function after having inserted the mouseover html in the DOM.
     * 
     * The function will eval the mouseover javascript (from the extension mouseover), and if needed make
     * a call to the server to get the features photos and display it (so we need the mouseover content to be 
     * exist in the DOM.
     * 
     * @throws Error if mouseover content format is not good
     * @param content The mouseover content you get from method JMap.MouseOver.getMouseOverContent
     * @example ```ts
     * 
     * const mouseOverContent = JMap.MouseOver.getMouseOverContent(...)
     * const mouseOverDiv = document.getElementById("my-div-id")
     * if (mouseOverContent) {
     *  mouseOverDiv.innerHTML = mouseOverContent.html
     *  JMap.MouseOver.processJSAndPhotosForContent(mouseOverContent)
     * } else {
     *  // Emptying the div if no mouseover
     *  mouseOverDiv.innerHTML = ""
     * }
     * ```
     */
    function processJSAndPhotosForContent(content: JMouseOverContent): void
  }
  /**
   * **JMap.Project**
   * 
   * From this section you can manage the project that is in use in the JMap Web Core library.
   */
  namespace Project {

    /**
     * **JMap.Project.getAllProjects**
     * 
     * Returns a promise that returns all JMap projects descriptors when resolved.
     * 
     * If no project is loaded, returns empty array.
     * 
     * @example ```ts
     * 
     * // This is asynchronous code, getAllProject return a promise that is
     * // resolved after the server returned all project data.
     * JMap.Project
     *    .getAllProjects()
     *    .then(projects => {
     *      // Here you can start using the projects
     *      console.log(`Projects count = "${projects.length}"`
     *    }))
     * ```
     */
    function getAllProjects(): Promise<JProject[]>

    /**
     * **JMap.Project.existsById**
     * 
     * Returns true if project exist for the given project id.
     * 
     * @param projectId The JMap project id
     * @example ```ts
     * 
     * // returns true if the project id = 2 exists, else false
     * JMap.Project.existsById(2)
     * ```
     */
    function existsById(projectId: number): boolean


    /**
     * **JMap.Project.existsByName**
     * 
     * Returns true if project exist for the given project name.
     * 
     * @param projectName The JMap project name
     * @example ```ts
     * 
     * // returns true if the project "My Project" exists, else false
     * JMap.Project.existsByName("My Project")
     * ```
     */
    function existsByName(projectName: string): boolean


    /**
     * **JMap.Project.getById**
     * 
     * Returns the project for the given project id.
     * 
     * @param projectId The JMap project id
     * @throws error if the project doesn't exists or if projectId is not a valid JMap Id.
     * @example ```ts
     * 
     * // Get Project id 2
     * const project = JMap.Project.getById(2)
     * console.log("Project '" + project.name + "' is loaded")
     * ```
     */
    function getById(projectId: number): JProject

    /**
     * **JMap.Project.getByName**
     * 
     * Returns the project for the given project name.
     * 
     * @param projectName The JMap project name
     * @throws error if the project doesn't exists or if projectName is not a string.
     * @example ```ts
     * 
     * // Get project "My Project"
     * const project = JMap.Project.getByName("My Project")
     * console.log("Project id '" + project.id + "' is loaded")
     * ```
     */
    function getByName(projectName: string): JProject

    /**
     * **JMap.Project.projectIsLoaded**
     * 
     * Returns true if a JMap project is loaded, that means a project is selected and displayed on the map.
     *
     * @example ```ts
     * 
     * // returns true if a project is loaded
     *  JMap.Project.projectIsLoaded()
     *  ```
     */
    function projectIsLoaded(): boolean

    /**
     * **JMap.Project.getId**
     * 
     * Returns loaded JMap project id.
     * 
     * @throws If no project is loaded
     * @example ```ts
     * 
     * // returns the currently loaded project id
     * JMap.Project.getId()
     * ```
     */
    function getId(): number

    /**
     * **JMap.Project.getName**
     * 
     * Returns loaded JMap project name.
     * 
     * @throws If no project is loaded
     * @example ```ts
     * 
     * // returns the currently loaded project name
     * JMap.Project.getName()
     * ```
     */
    function getName(): string

    /**
     * **JMap.Project.getDefaultDistanceUnit**
     *
     * Returns the project distance unit, or "meters" if no distance unit is set on the project.
     *
     * @throws if no project is loaded
     * @example ```ts
     *
     * // return "meters", or "kilometers", or "miles", or "yards"...
     * JMap.Project.getDefaultDistanceUnit()
     * ```
     */
    function getDefaultDistanceUnit(): JDistanceUnit

    /**
     * **JMap.Project.getDescription**
     * 
     * Returns loaded JMap project description.
     * 
     * @throws If no project is loaded
     * @example ```ts
     * 
     * // returns the currently loaded project description
     * JMap.Project.getDescription()
     * ```
     */
    function getDescription(): string

    /**
     * **JMap.Project.getProjection**
     * 
     * Returns loaded JMap project projection.
     * 
     * In MapBox, projection is always "***EPSG:3857***", but that function returns the project
     * defined projection (so it can be different than ***ESPG:3857***).
     * 
     * @throws If no project is loaded
     * @example ```ts
     * 
     * // returns the project projection
     * JMap.Project.getProjection()
     * ```
     */
    function getProjection(): JProjection

    /**
     * **JMap.Project.getInitialRotation**
     * 
     * Returns loaded JMap project initial map rotation.
     * This rotation is the one applied when the project is opened.
     * 
     * @throws If no project is loaded
     * @example ```ts
     * 
     * // returns the project initial rotation
     * JMap.Project.getInitialRotation()
     * ```
     */
    function getInitialRotation(): number

    /**
     * **JMap.Project.getMinScale**
     * 
     * Returns loaded JMap project min scale.
     * 
     * @throws If no project is loaded
     * @example ```ts
     * 
     * // returns the project min scale
     * JMap.Project.getMinScale()
     * ```
    */
    function getMinScale(): number

    /**
     * **JMap.Project.getMaxScale**
     * 
     * Returns loaded JMap project max scale.
     * 
     * @throws If no project is loaded
     * @example ```ts
     * 
     * // returns the project max scale
     * JMap.Project.getMaxScale()
     * ```
     */
    function getMaxScale(): number

    /**
     * **JMap.Project.getSelectionColor**
     * 
     * Returns loaded JMap project selection color in html hexa format.
     * 
     * This is the color that is used for selected features of layers that
     * don't have a specific selection style defined.
     * 
     * @throws If no project is loaded
     * @example ```ts
     * 
     * // returns the project selection color as a html hexa color
     * JMap.Project.getSelectionColor()
     * ```
     */
    function getSelectionColor(): string

    /**
     * **JMap.Project.getBackgroundColor**
     * 
     * Returns loaded JMap project background color in html hexa format.
     * This color is used as the background of the map.
     *
     * @throws If no project is loaded
     * @example ```ts
     * 
     * // returns the project background color as a html hexa color
     * JMap.Project.getBackgroundColor()
     * ```
     */
    function getBackgroundColor(): string

    /**
     * **JMap.Project.getInitialExtent**
     * 
     * Returns loaded JMap project initial extent.
     * This is the extent that is automatically displayed when the project is opened.
     * 
     * @throws If no project is loaded
     * @example ```ts
     * 
     * // returns the project initial extent if exists
     * JMap.Project.getInitialExtent()
     * ```
     */
    function getInitialExtent(): JBounds | null

    /**
     * **JMap.Project.getBase64ImageThumbnail**
     * 
     * Returns loaded JMap project base64 image thumbnail.
     * 
     * When JMap Web Core lib is started, it doesn't load projects thumbnails, but you can load it
     * by setting the startup option "loadAllProjectThumbnails" as true.
     *
     * If no thumbnail has been loaded it returns an empty string.
     * 
     * @throws If no project is loaded
     * @example ```ts
     * 
     * // returns the project initial extent if exists
     * JMap.Project.getInitialExtent()
     * ```
     */
    function getBase64ImageThumbnail(): string

    /**
     * **JMap.Project.load**
     * 
     * Load and display a project data on the map.
     * 
     * User session rigths are checked server side and an error is thrown if user doesn't have
     * the access right for the project.
     * 
     * If no project id or name is provided : get the projectId or projectName in startup options or url parameters ([[JCoreOptions]])
     * 
     * If a project id or name is provided : try to load the project given the project id or name.
     * 
     * @throws Error if project not found
     * @param projectIdOrName The JMap project id or name
     * @return a promise that is resolved when the project has been loaded successfully
     * @example ```ts
     * 
     * // Load the project defined in stratup option or url parameter
     * JMap.Project.load()
     *    .then(project => console.info(`Project id=${project.id} has been loaded.`, project)
     *    .catch(error => console.error(`Cannot load the project : ${error}`)
     * 
     * // Load project id=2
     * JMap.Project.load(2) // project id=2
     *    .then(project => console.info("Project id=2 has been loaded.", project)
     *    .catch(error => console.error(`Cannot load the project : ${error}`)
     * 
     * // Load project name="My city"
     * JMap.Project.load("My city") // project name="My city"
     *    .then(project => console.info(`Project id=${project.id} has been loaded.`, project)
     *    .catch(error => console.error(`Cannot load the project : ${error}`)
     * ```
     */
    function load(projectIdOrName?: number | string): Promise<JProject>

    /**
     * **JMap.Project.unload**
     * 
     * Unload the current displayed project.
     * 
     * The map is destroyed, and nothing is displayed on screen.
     * 
     * @example ```ts
     * 
     * // Unload the current project.
     * JMap.Project.unload()
     * ```
     */
    function unload(): void

    /**
     * **JMap.Project.loadAllProjectThumbnails**
     * 
     * Load all project thumbnails in the data store.
     * 
     * Default width is 348 and height 190.
     * 
     * Image is a base 64 formatted string.
     * 
     * @throws if params are not correct
     * @param params width (0 < width < 1280) and height (0 < height < 720) for the thumbnails
     * @example ```ts
     * 
     * // Will load all projects thumbnail images
     * JMap.Project
     *    .loadAllProjectThumbnails({
     *      width: 200,
     *      height: 200
     *    })
     *    .then(() => console.info("All project images has been loaded"))
     *    .catch(error => console.error("Cannot load project images"))
     * 
     * // Then you can get current project thumnail like that
     * const thumbnail = JMap.Project.getBase64ImageThumbnail()
     * 
     * // Or you can get the project id=3 thumbnail like this
     * const otherThumbnail = JMap.Project.getById(3).base64ImageThumbnail
     * ```
     */
    function loadAllProjectThumbnails(params?: JProjectLoadThumbnailsParams): Promise<void>
  }

  /**
   * **JMap.User**
   * 
   * From this section you can manage the user session.
   */
  namespace User {

    /**
     * ***JMap.User.getToken***
     * 
     * If user is logged in, returns the current user session token.
     * 
     * Else returns "-1" if user has no active session.
     * 
     * @example ```ts
     * 
     * // returns the user session token
     * JMap.User.getToken()
     * ```
     */
    function getToken(): string

    /**
     * ***JMap.User.getFullName***
     * 
     * Returns user full name.
     * 
     * @example ```ts
     * 
     * // returns the user full name, ex : "John Do"
     * JMap.User.getFullName()
     * ```
     */
    function getFullName(): string

    /**
     * ***JMap.User.getUsername***
     * 
     * Returns the username (the one used to login).
     * 
     * @example ```ts
     * 
     * // returns the username
     * JMap.User.getUsername()
     * ```
     */
    function getUsername(): string

    /**
     * **JMap.User.getLocale**
     * 
     * Get the user locale.
     * 
     * @example ```ts
     * 
     * // return "EN", or "FR", or "ES", or "PT"
     * JMap.User.getLocale()
     * ```
     */
    function getLocale(): string

    /**
     * **JMap.User.getPreference**
     * 
     * Get a user preference value from user storage. The returned Promise resolves to the value, else null if no preference has been set. 
     * Rejects on error, or if name parameter is not string or empty string, or if no user is logged in
     * 
     * @param name the name of the preference
     * @returns a Promise that resolves with the value from the user storage (or null if the preference is not set).
     * @example ```ts
     * 
     * let prefName = "jmap-core-basemap"
     * JMap.User
     *      .getPreference(prefName)
     *      .then(preferenceValue=>{
     *        console.log(`Preference item "${prefName}" value is "${preferenceValue}"`) 
     *      }).catch(reason=>{
     *        console.log(`Cannot get the preference value of param "${prefName}". Reason: ${reason}`) 
     *      })
     * 
     * ```
     */
    function getPreference(name: string): Promise<string | null>

    /**
     * **JMap.User.hasPreference**
     * 
     * Check for a user preference existence. The returned Promise resolves with true if a value has been set for the user preference, else false. 
     * Rejects on error, or if name parameter is not string or empty string, or if no user is logged in
     * 
     * @returns a Promise that resolves with true if a value has been set for the user preference, else false
     * @param name the name of the preference
     * @example ```ts
     * 
     * let prefName = "jmap-core-basemap"
     * JMap.User
     *      .hasPreference(prefName)
     *      .then(hasPreferenceValue=>{
     *        console.log(`Preference item "${prefName}" exists: ${hasPreferenceValue.toString()}`) 
     *      })
     * 
     * ```
     */
    function hasPreference(name: string): Promise<boolean>

    /**
     * **JMap.User.removePreference**
     * 
     * Remove a user preference from user storage. The returned Promise resolves with the value of the removed preference, or null if the preference does not exist.
     * 
     * Rejects on error, or if name parameter is not string or empty string, or if no user is logged in
     * 
     * @returns a Promise that removes the user preference, and resolves with the value of the removed preference, or null if the preference does not exist
     * @param name the name of the preference
     * 
     * let prefName = "jmap-core-basemap"
     * JMap.User
     *      .removePreference(prefName)
     *      .then(removedPreferenceValue=>{
     *        if(removedPreferenceValue === null){
     *          console.log(`Preference item "${prefName}" did not exist or was not removed`) 
     *        }else{
     *          console.log(`Preference item "${prefName}" has been removed. Value was: ${removedPreferenceValue}`) 
     *        }
     *      })
     * 
     * ```
     */
    function removePreference(name: string): Promise<string | null>

    /**
     * **JMap.User.setPreference**
     * 
     * Set a user preference in user storage. The returned Promise resolves without value on success.
     * Rejects with a reason on error, or if name parameter is not string or empty string, or if no user is logged in
     * If passed value is undefined, the preference is removed
     * 
     * @returns a Promise that sets the user preference, and resolves with no value, or rejects with a reason
     * @param name the name of the preference
     * @param value the value that will be associated to the name
     * 
     * @example ```ts
     * 
     * let prefName = "jmap-core-basemap"
     * 
     * // Set the value "light" for user preference "jmap-core-basemap"
     * JMap.User
     *      .setPreference(prefName, "light")
     *      .then(preferenceValue=>{
     *        console.log(`Preference item "${prefName}" has been set`) 
     *      }).catch(reason=>{
     *        console.log(`Cannot set the preference value of param "${prefName}". Reason: ${reason}`) 
     *      })
     * 
     * // Remove the value for user preference "theme"
     * JMap.User
     *      .setPreference(prefName)
     *      .then(preferenceValue=>{
     *        console.log(`Preference item "${prefName}" has been removed`) 
     *      }).catch(reason=>{
     *        console.log(`Cannot remove the preference "${prefName}". Reason: ${reason}`) 
     *      })
     * 
     * ```
     */
    function setPreference(name: string, value: string | undefined): Promise<void>

    /**
     * **JMap.User.login**
     * 
     * The login function, returns a promise. Make a call to the server and if
     * login is successful resolve the promise providing the user session data.
     * 
     * If an error occurs, 3 differents string message can be returned :
     *   - ***"user.login.error.credential"*** => Bad username or password
     *   - ***"user.login.error.server"*** => Unexpected error while requesting the server
     *   - ***"user.login.error.unexpected"*** => Unexpected error client side
     * 
     * @throws Error if bad credentials or server error.
     * @param session The user session data
     * @example ```ts
     * 
     * const userLogin = "jdo@mycompany.com"
     * const userPassword = "xxx"
     * 
     * // Open a new user session, and get back user data from server
     * JMap.User
     *    .login(userLogin, userPassword)
     *    .then(sessionData => {
     *      console.log(`User ${userLogin} has been authenticated, his session token is "${sessionData.token}"`)
     *    })
     *    .catch(errorKey => {
     *      console.error(`Cannot loggin ${userLogin}, errorKey="${errorKey}"`, error)
     *    })
     * ```
     */
    function login(login: string, password: string): Promise<JSessionData>

    /**
     * **JMap.User.logout**
     * 
     * Logout function. Make a call to the server to invalidate the session id.
     * 
     * If an error occurs, 2 differents string message can be returned :
     *   - ***"user.logout.error.server"*** => Unexpected error while requesting the server
     *   - ***"user.logout.error.unexpected"*** => Unexpected error client side
     * 
     * @example ```ts
     * 
     * // Close the user session client and server side
     * JMap.User
     *    .logout()
     *    .then(() => {
     *      console.log(`User has been logout`)
     *    })
     * ```
     */
    function logout(): Promise<void>

    /**
     * ***JMap.User.isLoggedIn***
     * 
     * Returns true if a user is logged in.
     * 
     * @example ```ts
     * 
     * // returns true if a user is logged in
     * JMap.User.isLoggedIn()
     * ```
     */
    function isLoggedIn(): boolean

    /**
     * **JMap.User.setToken**
     * 
     * Set the user session data. Usefull if you have made a call to our Rest API and get by yourself
     * the session token.
     * 
     * @param session The user session token
     * @example ```ts
     * 
     * To get a JMap session token, you can use the JMap Rest API on your JMap Server. By exemple if your server url is "https://my-jmap-server/", With the [curl tool](https://curl.haxx.se/docs/) you can get for the user "jdo@company.com" his token like that (adapt the username and password ...) :
     * ```sh
     * curl -X POST "https://my-jmap-server/services/rest/v2.0/session" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"username\": \"jdo@company.com\", \"password\": \"xxx\", \"type\": \"WEB\"}"
     * ```
     * 
     * If the request is successfull, the response is like that :
     * ```js
     * {
     *   "message": "The result is a WEB session info",
     *   "status": "OK",
     *   "result": {
     *     "sessionId": 23558109, // session id in the Rest API response is the session token.
     *     ...
     *   }
     * }
     * ```
     * 
     * // Set the user session token
     * JMap.User.setToken("23558109")
     *  .then(userData => {
     *    console.log(`Session token = "${userData.token}""`)
     *    console.log(`The session belongs to ${userData.user.fullName}`)
     *  })
     *  .then(error => {
     *    if (error === "user.token.invalid") {
     *      console.log(`Invalid token`)
     *    } else {
     *      console.log(`Server error`)
     *    }
     *  })
     * ```
     */
    function setToken(token: string): Promise<JSessionData>
  }

  /**
   * **JMap.Query**
   * 
   * A feature query mecanism has been set in JMap to get filtered features.
   * 
   * By example we can get all features that have an attribute equals to a given value.
   * 
   * A query concerns a single layer, and it set a data form that will be filled by users to make a search.
   * 
   * For a given project, a JMap administrator can create query groups and put inside
   * all queries he wants, not depending on a particular layers.
   * 
   * You can get queries definitions (including the form definition) and process a query from this section.
   */
  namespace Query {

    /**
     * ***JMap.Query.getAllGroups***
     * 
     * Returns all query groups defined by JMap administrator.
     * 
     * @example ```ts
     * 
     * // returns all query groups defined by JMap administrator
     * JMap.Query.getAllGroups()
     * ```
     */
    function getAllGroups(): JQueryGroup[]

    /**
     * ***JMap.Query.groupExist***
     * 
     * Returns true if group exists, else false, for the given group id.
     * 
     * @throws if group id is not correct (invalid format or no resource exists)
     * @param groupId The JMap query group id
     * @example ```ts
     * 
     * // returns true if group exists
     * JMap.Query.groupExist(21)
     * ```
     */
    function groupExist(groupId: number): boolean

    /**
     * ***JMap.Query.queryExist***
     * 
     * Returns true if the query exists for a given query group and a given query id.
     * 
     * @param groupId The JMap query group id
     * @param queryId The JMap query id
     * @example ```ts
     * 
     * // returns true if query id=5 of group id=10 exists
     * JMap.Query.queryExist(10, 5)
     * ```
     */
    function queryExist(groupId: number, queryId: string): boolean

    /**
     * ***JMap.Query.getQueriesByLayerId***
     * 
     * Returns all queries defined for a given layer id.
     * 
     * @param layerId The JMap layer id
     * @throws if layer id is not correct (invalid format or no resource exists)
     * @example ```ts
     * 
     * // returns all queries of layer id=12
     * JMap.Query.getQueriesByLayerId(12)
     * ```
     */
    function getQueriesByLayerId(layerId: number): JQuery[]

    /**
     * ***JMap.Query.getQueryByLayerId***
     * 
     * Returns a query for a given query id, and a given layer id.
     * 
     * @throws if layer or query ids are not correct (invalid format or no resource exists)
     * @param layerId The JMap layer id
     * @param queryId The JMap query id
     * @example ```ts
     * 
     * // returns query id=3 of layer id=12
     * JMap.Query.getQueryByLayerId(12, 3)
     * ```
     */
    function getQueryByLayerId(layerId: number, queryId: string): JQuery

    /**
     * ***JMap.Query.getQueriesByGroupId***
     * 
     * Returns all queries for a given query group id.
     * 
     * @throws if group id is not correct (invalid format or no resource exists)
     * @param groupId The JMap query group id
     * @example ```ts
     * 
     * // returns all queries of group id=10
     * JMap.Query.getQueriesByGroupId(10)
     * ```
     */
    function getQueriesByGroupId(groupId: number): JQuery[]

    /**
     * ***JMap.Query.getQueryByGroupId***
     * 
     * Returns the query for a given query group and a given query id.
     * 
     * @throws if group or query ids are not correct (invalid format or no resource exists)
     * @param groupId The JMap query group id
     * @param queryId The JMap query id
     * @example ```ts
     * 
     * // returns the query id=5 of group id=10
     * JMap.Query.getQueryByGroupId(10, 5)
     * ```
     */
    function getQueryByGroupId(groupId: number, queryId: string): JQuery

    /**
     * ***JMap.Query.fetchFeatures***
     * 
     * Process a query request to the JMap server, for given layer and query ids, and provided form data
     * 
     * @throws if group or query ids are not correct (invalid format or no resource exists)
     * @param layerId The JMap layer id
     * @param queryId The JMap query id
     * @param data The form data (values mapping the query form definition)
     * @example ```ts
     * 
     * // returns a promise that when resolved returns the result of the search,
     * // an array of features, for layer id=3 and query id=5.
     * JMap.Query
     *   .fetchFeatures(3, 5, {
     *    "$PARAM1": "test",
     *    "$PARAM2": 35
     *   })
     *   .then(features => console.info(`Found ${features.length} features.`))
     *   .catch(error => console.error("Error while processing query request.", error))
     * ```
     */
    function fetchFeatures(layerId: number, queryId: string, data: any): Promise<any[]> // features
  }

  /**
   * **JMap.Event**
   * 
   * From this section you can manage your own event listeners reacting to JMap Web Core library events.
   * 
   * For all your listener you need provide a listener id. We introduced this notion of listener ids in order
   * to be able to know what's the problem if something goes wrong in a listener.
   * 
   * Like that we are able to identify more easily the problem in the javascript console.
   * 
   * Listener ids have to be unique for the namespace, regardless to the type of event you register your listener.
   * 
   * By example, for all Layer events, you can register only one listener named "***my-custom-listener***"".
   * 
   * A good practice could be prefixing all your listener ids. For example if you work for the city of Montreal
   * they could all start with "***mtm-***"".
   * 
   * Listeners can be deactivated and reactivated.
   * 
   * Deactivating a listener keep it in the JMap Web Core library, but ignore it when an event is emitted.
   */
  namespace Event {

    /**
     * ***JMap.Event.Main***
     * 
     * Here you can manage all high level event listeners.
     * 
     * List of events are located in ***[[JMap.Event.Main.on]]***. 
     */
    namespace Main {

      /**
       * ***JMap.Event.Main.on***
       * 
       * Here you have all available high level events on which you can attach a listener.
       */
      namespace on {

        /**
         * ***JMap.Event.Main.on.coreReady***
         * 
         * This event is triggered once: 
         * * the jmap-core library is loaded, 
         * * the redux store and its reducers are also loaded,
         * * The initial session validation has been run. At thas point if the session has successfully been validated, the logged-in user will also be available
         * 
         * 
         * @param listenerId Your listener id (must be unique)
         * @param fn Your listener function
         * @example ```ts
         * // log a message in the console once the core library is loaded
         * JMap.Event.Main.on.coreReady(
         *    "custom-core-ready", 
         *     () => {
         *      if(JMap.User.getToken() !== "-1"){
         *        console.log(`Logged in username is: "${JMap.User.getUsername()}"`)
         *      }else{
         *        console.log(`No user logged in`)
         *      }
         * })
         * ```
         */
        function coreReady(listenerId: string, fn: () => void): void
      }

      /**
       * ***JMap.Event.Main.activate***
       * 
       * Activate the listener.
       * 
       * If listener was already activated, do nothing.
       * 
       * If the listener was deactivated, it state is turn to activate and it will be called again
       * when en event is emitted.
       * 
       * @param listenerId The listener id
       * @example ```ts
       * 
       * // activate the listener "my-main-listener"
       * JMap.Event.Main.activate("my-main-listener")
       * ```
       */
      function activate(listenerId: string): void

      /**
       * ***JMap.Event.Main.deactivate***
       * 
       * Deactivate the listener.
       * 
       * If listener id doesn't exist or is already deactivated, do nothing.
       * 
       * If the listener was active, it state is turn to deactivate, and it will be ignore
       * when en event is emitted.
       * 
       * @param listenerId The listener id
       * @example ```ts
       * 
       * // deactivate the listener "my-main-listener"
       * JMap.Event.Main.deactivate("my-main-listener")
       * ```
       */
      function deactivate(listenerId: string): void

      /**
       * ***JMap.Event.Main.remove***
       * 
       * Remove the listener.
       * 
       * If the listener doesn't exist, do nothing.
       * 
       * Remove the listener from JMap Web Core library. The listener is deleted and never called again after that.
       * 
       * @param listenerId The listener id
       * @example ```ts
       * 
       * // remove the listener "my-main-listener"
       * JMap.Event.Main.remove("my-main-listener")
       * ```
       */
      function remove(listenerId: string): void
    }

    /**
     * ***JMap.Event.Project***
     * 
     * Here you can manage all project related event listeners.
     * 
     * List of events are located in ***[[JMap.Event.Project.on]]***. 
     */
    namespace Project {

      /**
       * ***JMap.Event.Project.on***
       * 
       * Here you have all available project events on which you can attach a listener.
       */
      namespace on {

        /**
         * ***JMap.Event.Project.on.projectChange***
         * 
         * This event is triggered when a new project is loaded.
         * 
         * @param listenerId Your listener id (must be unique for all project events)
         * @param fn Your listener function
         * @example ```ts
         * 
         * // Each time a new project is loaded will display the new project id in the console
         * JMap.Event.Project.on.projectChange(
         *    "custom-project-change",
         *    params => console.log(`New project id="${params.project.id}"`)
         * )
         * ```
         */
        function projectChange(listenerId: string, fn: (params: JProjectEventParams) => void): void

        /**
         * ***JMap.Event.Project.on.projectsChange***
         * 
         * This event is triggered after the entire project list has been fetched from server.
         * 
         * It happens once after the user session has been validated and set.
         * 
         * @param listenerId Your listener id (must be unique for all project events)
         * @param fn Your listener function
         * @example ```ts
         * 
         * // Each time a new project is loaded will display the new project id in the console
         * JMap.Event.Project.on.projectsChange(
         *    "custom-projects-change",
         *    params => console.log(`Project count = "${params.projects.length}"`)
         * )
         * ```
         */
        function projectsChange(listenerId: string, fn: (params: JProjectAllEventParams) => void): void
      }

      /**
       * ***JMap.Event.Project.activate***
       * 
       * Activate the listener.
       * 
       * If listener was already activated, do nothing.
       * 
       * If the listener was deactivated, it state is turn to activate and it will be called again
       * when en event is emitted.
       * 
       * @param listenerId The listener id
       * @example ```ts
       * 
       * // activate the listener "my-project-listener"
       * JMap.Event.Project.activate("my-project-listener")
       * ```
       */
      function activate(listenerId: string): void

      /**
       * ***JMap.Event.Project.deactivate***
       * 
       * Deactivate the listener.
       * 
       * If listener id doesn't exist or is already deactivated, do nothing.
       * 
       * If the listener was active, it state is turn to deactivate, and it will be ignore
       * when en event is emitted.
       * 
       * @param listenerId The listener id
       * @example ```ts
       * 
       * // deactivate the listener "my-project-listener"
       * JMap.Event.Project.deactivate("my-project-listener")
       * ```
       */
      function deactivate(listenerId: string): void

      /**
       * ***JMap.Event.Project.remove***
       * 
       * Remove the listener.
       * 
       * If the listener doesn't exist, do nothing.
       * 
       * Remove the listener from JMap Web Core library. The listener is deleted and never called again after that.
       * 
       * @param listenerId The listener id
       * @example ```ts
       * 
       * // remove the listener "my-project-listener"
       * JMap.Event.Project.remove("my-project-listener")
       * ```
       */
      function remove(listenerId: string): void
    }

    /**
     * ***JMap.Event.Layer***
     * 
     * Here you can manage all layer related event listeners.
     * 
     * List of events are located in ***[[JMap.Event.Layer.on]]***. 
     */
    namespace Layer {

      /**
       * ***JMap.Event.Layer.on***
       * 
       * Here you have all available layer events on which you can attach a listener.
       */
      namespace on {

        /**
         * ***JMap.Event.Layer.on.layersChange***
         * 
         * This event is triggered when a new project has been loaded, and when its layers have
         * been loaded too.
         * 
         * If the project has been unloaded, this event is triggered but the provided layerTree is
         * an empty array (in JMap a project has at least one layer).
         * 
         * @param listenerId Your listener id (must be unique for all layer events)
         * @param fn Your listener function
         * @example ```ts
         * 
         * // Each time a new project is loaded and its layer have also been loaded,
         * // this method is processed.
         * JMap.Event.Layer.on.layersChange(
         *    "custom-layers-change",
         *    params => {
         *      console.log("This is the new project layer three", params.layerTree)
         *    }
         * )
         * ```
         */
        function layersChange(listenerId: string, fn: (params: JLayerEventChangeParams) => void): void
        
        /**
         * ***JMap.Event.Layer.on.visibilityChange***
         * 
         * This event is triggered when a tree element visibility changed.
         * 
         * @param listenerId Your listener id (must be unique for all layer events)
         * @param fn Your listener function
         * @example ```ts
         * 
         * // Each time a tree element visibility is changed, will display the new visibility
         * // in the console
         * JMap.Event.Layer.on.visibilityChange(
         *    "custom-visibility-change",
         *    params => {
         *      console.log(`Layer element id="${params.layerId}" visible="${params.visibility}"`)
         *    }
         * )
         * ```
         */
        function visibilityChange(listenerId: string, fn: (params: JLayerEventVisibilityParams) => void): void

        /**
         * ***JMap.Event.Layer.on.thematicVisibilityChange***
         * 
         * This event is triggered when a layer thematic visibility changed.
         * 
         * @param listenerId Your listener id (must be unique for all layer events)
         * @param fn Your listener function
         * @example ```ts
         * 
         * // Each time a layer thematic visibility is changed this method is processed
         * JMap.Event.Layer.on.thematicVisibilityChange(
         *    "custom-thematic-visibility-change",
         *    params => {
         *      console.log(
         *        `Layer id="${params.layerId}", ` +
         *        `thematic id="${params.thematicId}" ` +
         *        `visible="${params.visibility}"`
         *      )
         *    }
         * )
         * ```
         */
        function thematicVisibilityChange(listenerId: string, fn: (params: JLayerEventThematicVisibilityParams) => void): void

        /**
         * ***JMap.Event.Layer.on.layerDeletion***
         * 
         * This event is triggered when a layer is deleted.
         * 
         * @param listenerId Your listener id (must be unique for all layer events)
         * @param fn Your listener function
         * @example ```ts
         * 
         * // Each time a layer is deleted, will display a message in the console
         * JMap.Event.Layer.on.layerDeletion(
         *    "custom-layer-deletion",
         *    params => {
         *      console.log(`Layer id="${params.layerId}" has been deleted client side`)
         *    }
         * )
         * ```
         */
        function layerDeletion(listenerId: string, fn: (params: JLayerEventParams) => void): void
      }

      /**
       * ***JMap.Event.Layer.activate***
       * 
       * Activate the listener.
       * 
       * If listener was already activated, do nothing.
       * 
       * If the listener was deactivated, it state is turn to activate and it will be called again
       * when en event is emitted.
       * 
       * @param listenerId The listener id
       * @example ```ts
       * 
       * // activate the listener "my-layer-listener"
       * JMap.Event.Layer.activate("my-layer-listener")
       * ```
       */
      function activate(listenerId: string): void

      /**
       * ***JMap.Event.Layer.deactivate***
       * 
       * Deactivate the listener.
       * 
       * If listener id doesn't exist or is already deactivated, do nothing.
       * 
       * If the listener was active, it state is turn to deactivate, and it will be ignore
       * when en event is emitted.
       * 
       * @param listenerId The listener id
       * @example ```ts
       * 
       * // deactivate the listener "my-layer-listener"
       * JMap.Event.Layer.deactivate("my-layer-listener")
       * ```
       */
      function deactivate(listenerId: string): void

      /**
       * ***JMap.Event.Layer.remove***
       * 
       * Remove the listener.
       * 
       * If the listener doesn't exist, do nothing.
       * 
       * Remove the listener from JMap Web Core library. The listener is deleted and never called again after that.
       * 
       * @param listenerId The listener id
       * @example ```ts
       * 
       * // remove the listener "my-layer-listener"
       * JMap.Event.Layer.remove("my-layer-listener")
       * ```
       */
      function remove(listenerId: string): void
    }

    /**
     * ***JMap.Event.Map***
     * 
     * Here you can manage all map related event listeners.
     * 
     * List of events are located in ***[[JMap.Event.Map.on]]***. 
     */
    namespace Map {

      /**
       * ***JMap.Event.Map.on***
       * 
       * Here you have all available map events on which you can attach a listener.
       */
      namespace on {

        /**
         * ***JMap.Event.Map.on.mapLoad***
         * 
         * This event is triggered when a layer is deleted.
         * 
         * @param listenerId Your listener id (must be unique for all map events)
         * @param fn Your listener function
         * @example ```ts
         * 
         * // Each time a map is created and ready, will display a message in the console
         * JMap.Event.Map.on.mapLoad(
         *    "custom-map-load",
         *    args => {
         *      console.log(`The map is ready, map instance = `, args.map)
         *    }
         * )
         * ```
         */
        function mapLoad(listenerId: string, fn: (params: JMapEventLoadedParams) => void): void

        /**
         * ***JMap.Event.Map.on.mapDestroy***
         * 
         * This event is triggered when the map is destroyed.
         * 
         * @param listenerId Your listener id (must be unique for all map events)
         * @param fn Your listener function
         * @example ```ts
         * 
         * // Each time the map is destroyed, will display a message in the console
         * JMap.Event.Map.on.mapDestroy(
         *    "custom-map-destroyed",
         *    () => console.log(`The map has been destroyed`)
         * )
         * ```
         */
        function mapDestroy(listenerId: string, fn: () => void): void

        /**
         * ***JMap.Event.Map.on.moveStart***
         * 
         * This event is triggered when the map start moving (when user or library pan the map).
         * 
         * @param listenerId Your listener id (must be unique for all map events)
         * @param fn Your listener function
         * @example ```ts
         * 
         * // Each time the map start moving, will display a message in the console
         * JMap.Event.Map.on.moveStart(
         *    "custom-map-move-start",
         *    args => {
         *      console.log(`The map start moving`, args.map, args.mapEvent)
         *      // mapEvent is the Mapbox event
         *    }
         * )
         * ```
         */
        function moveStart(listenerId: string, fn: (params: JMapEventParams) => void): void

        /**
         * ***JMap.Event.Map.on.move***
         * 
         * This event is triggered when the map is moving (when user or library pan the map).
         * 
         * @param listenerId Your listener id (must be unique for all map events)
         * @param fn Your listener function
         * @example ```ts
         * 
         * // Will map is moving, will display a message in the console
         * JMap.Event.Map.on.move(
         *    "custom-map-move",
         *    args => {
         *      console.log(`The map is moving`, args.map, args.mapEvent)
         *      // mapEvent is the Mapbox event
         *    }
         * )
         * ```
         */
        function move(listenerId: string, fn: (params: JMapEventParams) => void):  void

        /**
         * ***JMap.Event.Map.on.moveEnd***
         * 
         * This event is triggered when the map end moving (when user or library pan the map).
         * 
         * @param listenerId Your listener id (must be unique for all map events)
         * @param fn Your listener function
         * @example ```ts
         * 
         * // Each time the map stop moving, will display a message in the console
         * JMap.Event.Map.on.moveEnd(
         *    "custom-map-move-end",
         *    args => {
         *      console.log(`The map stop moving`, args.map, args.mapEvent)
         *      // mapEvent is the Mapbox event
         *    }
         * )
         * ```
         */
        function moveEnd(listenerId: string, fn: (params: JMapEventParams) => void): void

        /**
         * ***JMap.Event.Map.on.mouseMove***
         * 
         * This event is triggered when the mouse is moving over the map (when user or library pan the map).
         * 
         * @param listenerId Your listener id (must be unique for all map events)
         * @param fn Your listener function
         * @example ```ts
         * 
         * // When mouse is moving over the map, will display a message in the console
         * JMap.Event.Map.on.mouseMove(
         *    "custom-map-mouse-move",
         *    args => {
         *      console.log(
         *          `The mouse is moving on layer id="${args.layerId}"`, map.location,
         *          args.map, args.mapEvent // mapEvent is the Mapbox event
         *      )
         *    }
         * )
         * ```
         */
        function mouseMove(listenerId: string, fn: (params: JMapEventLayerParams) => void): void

        /**
         * ***JMap.Event.Map.on.mouseMoveOnLayer***
         * 
         * This event is triggered when the mouse is moving over the map (when user or library pan the map).
         * 
         * @param listenerId Your listener id (must be unique for all map events)
         * @param fn Your listener function
         * @example ```ts
         * 
         * // When mouse is moving over the map, will display 2 messages in the console
         * JMap.Event.Map.on.mouseMoveOnLayer(
         *    "custom-map-mouse-move-on-layer",
         *    args => {
         *      console.log(
         *          `The mouse is moving on layer id="${args.layerId}"`,
         *          args.map, args.mapEvent // the mapEvent is the Mapbox event
         *      )
         *      console.log(
         *        `The mouse cursor is over ${args.features.length} features`,
         *        args.location
         *      )
         *    }
         * )
         * ```
         */
        function mouseMoveOnLayer(listenerId: string, fn: (params: JMapEventFeaturesParams) => void): void

        /**
         * ***JMap.Event.Map.on.mouseEnter***
         * 
         * This event is triggered when the mouse enter over a layer feature.
         * 
         * When switching from one feature to another, this event is not called again if the features
         * are joined or intersect.
         * 
         * @param listenerId Your listener id (must be unique for all map events)
         * @param fn Your listener function
         * @example ```ts
         * 
         * // When mouse is entering over a layer feature(s), will display 2 messages
         * // in the console
         * JMap.Event.Map.on.mousemouseEnterMoveOnLayer(
         *    "custom-map-mouse-enter",
         *    args => {
         *      console.log(
         *          `The mouse entered an element of layer id="${args.layerId}"`,
         *          args.map, args.mapEvent // mapEvent is the Mapbox event
         *      )
         *      console.log(
         *        `The mouse cursor is over ${args.features.length} features`,
         *        args.location
         *      )
         *    }
         * )
         * ```
         */
        function mouseEnter(listenerId: string, fn: (params: JMapEventFeaturesParams) => void): void

        /**
         * ***JMap.Event.Map.on.mouseLeave***
         * 
         * This event is triggered when the mouse leave a layer feature, and is not over another
         * feature.
         * 
         * @param listenerId Your listener id (must be unique for all map events)
         * @param fn Your listener function
         * @example ```ts
         * 
         * // When mouse is leaving a layer, will display a message in the console
         * JMap.Event.Map.on.mouseLeave(
         *    "custom-map-mouse-leave",
         *    args => {
         *      console.log(
         *          `The mouse leaved the layer id="${args.layerId}"`, args.location,
         *          args.map, args.mapEvent // mapEvent is the Mapbox event
         *      )
         *    }
         * )
         * ```
         */
        function mouseLeave(listenerId: string, fn: (params: JMapEventLayerParams) => void): void

        /**
         * ***JMap.Event.Map.on.click***
         * 
         * This event is triggered when the mouse is clicked.
         * 
         * @param listenerId Your listener id (must be unique for all map events)
         * @param fn Your listener function
         * @example ```ts
         * 
         * // When mouse clicked on the map, will display a message in the console
         * JMap.Event.Map.on.click(
         *    "custom-map-mouse-click",
         *    args => {
         *      const location = args.location
         *      console.log(
         *          `The mouse has been clicked at { x="${location.x}, y="${location.y}" }"`,
         *          args.map, args.mapEvent // mapEvent is the Mapbox event
         *      )
         *    }
         * )
         * ```
         */
        function click(listenerId: string, fn: (params: JMapEventLocationParams) => void): void

        /**
           * ***JMap.Event.Map.on.zoomStart***
           * 
           * This event is triggered when zoom start.
           * 
           * @param listenerId Your listener id (must be unique for all map events)
           * @param fn Your listener function
           * @example ```ts
           * 
           * // When the map zoom start, it will display a message in the console
           * JMap.Event.Map.on.zoomStart(
           *    "custom-map-zoom-start",
           *    args => console.log(`The zoom is starting (zoom="${args.zoom}")`)
           * )
           * ```
           */
        function zoomStart(listenerId: string, fn: (params: JMapEventZoomParams) => void): void

        /**
           * ***JMap.Event.Map.on.zoom***
           * 
           * This event is triggered when zooming on map
           * 
           * @param listenerId Your listener id (must be unique for all map events)
           * @param fn Your listener function
           * @example ```ts
           * 
           * // When the map zoom change, it will display a message in the console
           * JMap.Event.Map.on.zoom(
           *    "custom-map-zoom",
           *    args => console.log(`The map zoom changed (zoom="${args.zoom}")`)
           * )
           * ```
           */
        function zoom(listenerId: string, fn: (params: JMapEventZoomParams) => void): void

        /**
           * ***JMap.Event.Map.on.zoomStop***
           * 
           * This event is triggered when zoom start.
           * 
           * @param listenerId Your listener id (must be unique for all map events)
           * @param fn Your listener function
           * @example ```ts
           * 
           * // When the map zoom stop, it will display a message in the console
           * JMap.Event.Map.on.zoomStop(
           *    "custom-map-zoom-stop",
           *    args => console.log(`The zoom is finished (zoom="${args.zoom}")`)
           * )
           * ```
           */
        function zoomStop(listenerId: string, fn: (params: JMapEventZoomParams) => void): void

        /**
         * ***JMap.Event.Map.on.rotateStart***
         * 
         * This event is triggered when rotation on the map start.
         * 
         * @param listenerId Your listener id (must be unique for all map events)
         * @param fn Your listener function
         * @example ```ts
         * 
         * // When the rotation of the map start, it will display a message in the console
         * JMap.Event.Map.on.rotateStart(
         *    "custom-map-rotate-start",
         *    args => console.log(`The rotation is starting (rotation="${args.bearing})")`
         * )
         * ```
         */
        function rotateStart(listenerId: string, fn: (params: JMapEventRotateParams) => void): void

        /**
         * ***JMap.Event.Map.on.rotate***
         * 
         * This event is triggered when the map is rotating
         * 
         * @param listenerId Your listener id (must be unique for all map events)
         * @param fn Your listener function
         * @example ```ts
         * 
         * // When the rotation of the map change, it will display a message in the console
         * JMap.Event.Map.on.rotate(
         *    "custom-map-rotate",
         *    args => console.log(`The rotation has changed (rotation="${args.bearing})")`
         * )
         * ```
         */
        function rotate(listenerId: string, fn: (params: JMapEventRotateParams) => void): void

        /**
         * ***JMap.Event.Map.on.rotateStop***
         * 
         * This event is triggered when rotation on the map stop.
         * 
         * @param listenerId Your listener id (must be unique for all map events)
         * @param fn Your listener function
         * @example ```ts
         * 
         * // When the rotation of the map stop, it will display a message in the console
         * JMap.Event.Map.on.rotateStop(
         *    "custom-map-rotate-stop",
         *    args => console.log(`The rotation is finished (rotation="${args.bearing})")`
         * )
         * ```
         */
        function rotateStop(listenerId: string, fn: (params: JMapEventRotateParams) => void): void

        /**
         * ***JMap.Event.Map.on.pitchStart***
         * 
         * This event is triggered when pitch on the map start.
         * 
         * @param listenerId Your listener id (must be unique for all map events)
         * @param fn Your listener function
         * @example ```ts
         * 
         * // When the pitch of the map start, it will display a message in the console
         * JMap.Event.Map.on.pitchStart(
         *    "custom-map-pitch-start",
         *    args => console.log(`The pitch is starting (pitch="${args.pitch})")`
         * )
         * ```
         */
        function pitchStart(listenerId: string, fn: (params: JMapEventPitchParams) => void): void

        /**
         * ***JMap.Event.Map.on.pitch***
         * 
         * This event is triggered when pitch on the map start.
         * 
         * @param listenerId Your listener id (must be unique for all map events)
         * @param fn Your listener function
         * @example ```ts
         * 
         * // When the map is pitching, it will display a message in the console
         * JMap.Event.Map.on.pitch(
         *    "custom-map-pitch",
         *    args => console.log(`The map is pitching (pitch="${args.pitch})")`
         * )
         * ```
         */
        function pitch(listenerId: string, fn: (params: JMapEventPitchParams) => void): void

        /**
         * ***JMap.Event.Map.on.pitchEnd***
         * 
         * This event is triggered when pitch on the map end.
         * 
         * @param listenerId Your listener id (must be unique for all map events)
         * @param fn Your listener function
         * @example ```ts
         * 
         * // When the pitch on the map end, it will display a message in the console
         * JMap.Event.Map.on.pitch(
         *    "custom-map-pitch-end",
         *    args => console.log(`The map is pitching (pitch="${args.pitch})")`
         * )
         * ```
         */
        function pitchEnd(listenerId: string, fn: (params: JMapEventPitchParams) => void): void
      }
      /**
       * ***JMap.Event.Map.activate***
       * 
       * Activate the listener.
       * 
       * If listener was already activated, do nothing.
       * 
       * If the listener was deactivated, it state is turn to activate and it will be called again
       * when en event is emitted.
       * 
       * @param listenerId The listener id
       * @example ```ts
       * 
       * // activate the listener "my-map-listener"
       * JMap.Event.Map.activate("my-map-listener")
       * ```
       */
      function activate(listenerId: string): void

      /**
       * ***JMap.Event.Map.deactivate***
       * 
       * Deactivate the listener.
       * 
       * If listener id doesn't exist or is already deactivated, do nothing.
       * 
       * If the listener was active, it state is turn to deactivate, and it will be ignore
       * when en event is emitted.
       * 
       * @param listenerId The listener id
       * @example ```ts
       * 
       * // deactivate the listener "my-map-listener"
       * JMap.Event.Map.deactivate("my-map-listener")
       * ```
       */
      function deactivate(listenerId: string): void

      /**
       * ***JMap.Event.Map.remove***
       * 
       * Remove the listener.
       * 
       * If the listener doesn't exist, do nothing.
       * 
       * Remove the listener from JMap Web Core library. The listener is deleted and never called again after that.
       * 
       * @param listenerId The listener id
       * @example ```ts
       * 
       * // remove the listener "my-map-listener"
       * JMap.Event.Map.remove("my-map-listener")
       * ```
       */
      function remove(listenerId: string): void
    }

    /**
     * ***JMap.Event.User***
     * 
     * Here you can manage all user related event listeners.
     * 
     * List of events are located in ***[[JMap.Event.User.on]]***. 
     */
    namespace User {

      /**
       * ***JMap.Event.User.on***
       * 
       * Here you have all available user events on which you can attach a listener.
       */
      namespace on {

        /**
         * ***JMap.Event.User.on.sessionChanged***
         * 
         * This event is triggered when the user session changed.
         * 
         * If it's a logout, the token in params.session is equals to "-1".
         * 
         * @param listenerId Your listener id (must be unique for all user events)
         * @param fn Your listener function
         * @example ```ts
         * 
         * // Each time the session has changed this method is processed
         * JMap.Event.User.on.sessionChanged(
         *    "custom-session-change",
         *    params => {
         *      if (params.session.token === "-1") {
         *        console.log("Session has been closed")
         *      } else {
         *        console.log(`New session opened`, params.session)
         *      }
         *    }
         * )
         * ```
         */
        function sessionChanged(listenerId: string, fn: (params: JUserEventSessionChangedParams) => void): void
      }

      /**
       * ***JMap.Event.User.activate***
       * 
       * Activate the listener.
       * 
       * If listener was already activated, do nothing.
       * 
       * If the listener was deactivated, it state is turn to activate and it will be called again
       * when en event is emitted.
       * 
       * @param listenerId The listener id
       * @example ```ts
       * 
       * // activate the listener "my-user-listener"
       * JMap.Event.User.activate("my-user-listener")
       * ```
       */
      function activate(listenerId: string): void

      /**
       * ***JMap.Event.User.deactivate***
       * 
       * Deactivate the listener.
       * 
       * If listener id doesn't exist or is already deactivated, do nothing.
       * 
       * If the listener was active, it state is turn to deactivate, and it will be ignore
       * when en event is emitted.
       * 
       * @param listenerId The listener id
       * @example ```ts
       * 
       * // deactivate the listener "my-user-listener"
       * JMap.Event.User.deactivate("my-user-listener")
       * ```
       */
      function deactivate(listenerId: string): void

      /**
       * ***JMap.Event.User.remove***
       * 
       * Remove the listener.
       * 
       * If the listener doesn't exist, do nothing.
       * 
       * Remove the listener from JMap Web Core library. The listener is deleted and never called again after that.
       * 
       * @param listenerId The listener id
       * @example ```ts
       * 
       * // remove the listener "my-user-listener"
       * JMap.Event.User.remove("my-user-listener")
       * ```
       */
      function remove(listenerId: string): void
    }
  }

  /**
   * **JMap.Extension**
   * 
   * We introduced the notion of extension in JMap.
   * 
   * We designed a mecanism for our needs, that could loads optional plugins for JMap.
   * 
   * This mecanism provide a clean way to integrate in JMap your own extension plugin.
   * 
   * You can create an object that implement the interface [[JCoreExtension]], and register it
   * from this section.
   * 
   * By example you register an extension with id="***MyCompany***"".
   * 
   * You can defined your own Redux reducer that will react to all actions trigerred. In the store
   * your data will be located at ***external.MyCompany***.
   * 
   * You can defined your own JMap related services, that will be accessible at
   * this location : ***JMap.Extension.MyCompany***
   * 
   * And you also can integrate your own mouseover (for more details look in JMap.MouseOver
   * documentation).
   */
  namespace Extension {

    /**
     * ***JMap.Extension.register***
     * 
     * Register your own extension extension.
     * 
     * @throws Error if a parameter is not correct
     * @param extensionModel The extension model
     * @example ```ts
     * 
     * JMap.Extension.register({
     *  id: "MyExtension", // Unique id
     *  initFn: () => {
     *    // here you can start your UI component if needed
     *    console.log("JMap is started and my extension has been successfuly started")
     *  }
     * })
     * ```
     */
    function register(extension: JCoreExtension): void

    /**
     * ***JMap.Extension.isRegistered***
     * 
     * Tell if an extension has been registered or not.
     * 
     * It can be usefull to know if a JMap extension is in use or not.
     * 
     * @throws Error if extensionId format is not correct
     * @param extensionId The extension id
     * @example ```ts
     * 
     * // returns true if the JMap Document extension is in use or not for the project
     * JMap.Extension.isRegistered("Document")
     * ```
     */
    function isRegistered(extensionId: string): boolean

    /**
     * ***JMap.Extension.getAllRegisteredIds***
     * 
     * Returns all registered extension ids.
     * 
     * @example ```ts
     * 
     * // Could returns [ "Document", "MyCustomExtension" ]
     * JMap.Extension.getAllRegisteredIds()
     * ```
     */
    function getAllRegisteredIds(): string[]

    /**
     * ***JMap.Extension.renderMouseOver***
     * 
     * It returns all extension mouseover data for a specific layer and feature.
     * 
     * @param layer The JMap layer
     * @param feature A geoJSON feature
     * @returns an empty array if no extension is registered
     * @example ```ts
     * 
     * const feature = ...
     * // returns all extension mouseover data for the feature
     * JMap.Extension.renderMouseOver(2, feature)
     * ```
     */
    function renderMouseOver(layer: JLayer, feature: GeoJSON.Feature): JExtensionMouseOver[]
  }

  /**
   * **JMap.Form**
   * 
   * Here you'll find all form related methods
   */
  namespace Form {
    
    /**
     * ***JMap.Form.getDefaultValues***
     * 
     * Returns the default data values of the form.
     * 
     * The result is an object where :
     *  - key is the attribute id
     *  - value the default value
     * 
     * @param form A JMap form
     * @returns a key/value object
     * @example ```ts
     * 
     * const form = ...
     * const defaultValues = JMap.Form.getDefaultValues(form)
     * ```
     */
    function getDefaultValues(form: JForm): { [ id: string ]: any }

    /**
     * ***JMap.Form.getPreparedData***
     * 
     * This function prepare the data, it returns a copy object containing the values formatted in a way that fit the server needs.
     * 
     * It's not mandatory to use this function but it's highly recommended to use it before :
     * - sending them to the server ()
     * - validating them using JMap.Form.getPreparedData (change values to fit the )
     * 
     * It returns another object without modifing the passed object.
     * 
     * 
     * Use to set the correct type (number if a string number is passed), and many other things.
     * 
     * @param form A JMap form
     * @param data The form data
     * @returns the prepared data
     * @example ```ts
     * 
     * const data = ...
     * const form = ...
     * const preparedData = JMap.Form.getPreparedData(form, data)
     * const errors = JMap.Form.validateData(form, preparedData)
     * ```
     */
    function getPreparedData(form: JForm, data: any): any

    /**
     * ***JMap.Form.validateData***
     * 
     * Return errors for the given form id and data.
     * 
     * If no error validation, it returns an empty object.
     * 
     * The result is an object where :
     *  - key is the attribute id
     *  - value is the validation error message, translated in the user locale
     * 
     * @param form A JMap form
     * @param data The form data
     * @returns an empty object if no validation error, else an object containing error messages grouped by attribute id.
     * @example ```ts
     * 
     * const form = ...
     *  const data = {
     *   name: "Jack"
     * }
     * // return {} if no error, else could returns { age: "required field" }
     * const errors = JMap.Form.validateData(form, data)
     * ```
     */
    function validateData(form: JForm, data: { [id: string]: any }): { [key: string]: string }
  }
}
