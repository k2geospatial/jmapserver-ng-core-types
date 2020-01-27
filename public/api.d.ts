/**
 * To configure the JMap library in your web page, you can consult the demo pages :
 * 
 *   - [A map embedded in a div in a page of your website](https://github.com/k2geospatial/jmap-api-ng/blob/master/examples/v0.3.34/example-embedded.md)
 *   - [A map displayed full screen](https://github.com/k2geospatial/jmap-api-ng/blob/master/examples/v0.3.34/example-full-page.md)
 * 
 * You can also consult the library startup options [[JAPIOptions]], in order to customize it for you needs.
 * 
 * After been loaded, the JMap library is accessible through the nampespace **JMap** in the javascript console.
 * 
 * For example :
 * ```ts
 * // returns the API build version.
 * JMap.Api.getVersion()
 * ```
 * 
 * The library is organized in modules, and sub-modules :
 *   - [[JMap.Api]] : Get API information (version, documentation)
 *   - [[JMap.Service]] : Get and manage the library states
 *   - [[JMap.Component]] : Create and destroy your JMap API Component instances
 *   - [[JMap.Event]] : Create, activate, deactivate and remove your own listeners, reacting to JMAP API events
 *   - [[JMap.External]] : Fully integrate your own plugin to JMAP API
 */
declare namespace JMap {

  /**
   * **JMap.Api**
   * 
   * This is where you can find information about the API.
   */
  namespace Api {

    /**
     * **JMap.Api.getVersion**
     * 
     * Returns the API build version.
     * 
     * @example ```ts
     * 
     * // returns the build version, for example "1.0.1"
     * JMap.Api.getVersion()
     * ```
     */
    function getVersion(): string

    /**
     * **JMap.Api.getDataStore**
     * 
     * Returns the JMap data store, an instance of Redux (https://redux.js.org/).
     *
     * @example ```ts
     * 
     * // returns the Web API Redux store
     * const reduxStore = JMap.Api.getDataStore()
     * reduxStore.dispatch(...)
     * ```
     */
    function getDataStore(): any | undefined

    /**
     * **JMap.Api.getRestUrl**
     * 
     * Returns in use JMap API server rest API.
     *
     * This is the url on which the JMap API will make all of its ajax call.
     * 
     * @example ```ts
     * 
     * // returns the JMap server rest URL in use
     * JMap.Api.getRestUrl()
     * ```
     */
    function getRestUrl(): string

    /**
    * **JMap.Api.openDocumentation**
    * 
    * Open JMap Web API online documentation, in a new tab.
    * 
    * @example ```ts
    * 
    * // open JMap Web API online documentation, in a new tab
    * JMap.Api.openDocumentation()
    * ```
    */
   function openDocumentation(): void

   /**
    * **JMap.Api.getOS**
    * 
    * Return the operating system on witch JMap Api is running client side.
    * 
    * Possible values returned are defined here [[JOperatingSystem]].
    * 
    * @example ```ts
    * 
    * // Return "mac" if the OS is Mac OS
    * JMap.Api.getOS()
    * ```
    */
   function getOS(): JOperatingSystem
  }

  /**
   * **JMap.Service**
   * 
   * This is where you can get data and interact with the API.
   */
  namespace Service {

    /**
     * **JMap.Service.History**
     * 
     * This is where you can find browser history relative methods
     */
    namespace History {

      /**
       * **JMap.Service.History.transformSearchParamsIntoHashParams**
       * 
       * Get all search params in the url and transform them into hash params
       * without refreshing the page.
       * 
       * @example ```ts
       * 
       * // Ex. url is = ***http://localhost:8080/services/jmap?projectId=0&myvar=test***
       *
       * JMap.Service.History.transformSearchParamsIntoHashParams()
       * 
       * // The url is now = ***http://localhost:8080/services/jmap#?projectId=0&myvar=test***
       * ```
       */
      function transformSearchParamsIntoHashParams(): void
      
      /**
       * **JMap.Service.History.goBack**
       * 
       * The same as clicking the back button of the browser
       * 
       * @example ```ts
       * 
       * // go to previous page
       * JMap.Service.History.goBack()
       * ```
       */
      function goBack(): void
      
      /**
       * **JMap.Service.History.goForward**
       * 
       * The same as clicking the forward button of the browser
       * 
       * @example ```ts
       * 
       * // go to the next page if exist
       * JMap.Service.History.goForward()
       * ```
       */
      function goForward(): void

      /**
       * **JMap.Service.History.getHashParameter**
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
       * JMap.Service.History.getHashParameter("myvar")
       * // return "test"
       * 
       * JMap.Service.History.getHashParameter("myvardoesntexist")
       * // return ""
       * ```
       */
      function getHashParameter(parameterName: string): string

      /**
       * **JMap.Service.History.getHashParameters**
       * 
       * Return a JS object that contains all key / value entries present
       * in the hash of the url.
       * 
       * @example ```ts
       * 
       * // get all parameters in the url hash
       * JMap.Service.History.getHashParameters()
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
       * **JMap.Service.History.pushHashParameters**
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
       * JMap.Service.History.pushHashParameters("myvar", "test")
       * 
       * // The url is now = ***http://localhost:8080/services/jmap#?projectId=0&myvar=test***
       * ```
       */
      function pushHashParameters(parameterName: string, parameterValue: string): void
      
      /**
       * **JMap.Service.History.popHashParameters**
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
       * JMap.Service.History.popHashParameters("myvar")
       * 
       * // The url is now = ***http://localhost:8080/services/jmap#?projectId=0***
       * ```
       */
      function popHashParameters(parameterName: string): void

      /**
       * **JMap.Service.History.onParameterChange**
       * 
       * You can attach a listener that listen for url hash params change.
       * 
       * The function returns the listener id that can be used after to remove the listener.
       *
       * @param parameterName: the name of the parameter
       * @param fn: the function that will be processed when the property changed
       * 
       * @returns the listener id, can be used to remove the listener with [[JMap.Service.History.removePropertyChangeListener]]
       *
       * @throws Error if parameterName is not a valid string or fn is not a function
       * 
       * @example ```ts
       * 
       * const listenerId = JMap.Service.History.onParameterChange("projectId", (oldValue, newValue) => {
       *    console.log(`In the url hash the parameter "projectId" has changed from "${oldValue}" to "${newValue}"`)
       * })
       * ```
       */
      function onParameterChange(parameterName: string, fn: (oldValue: string, newValue: string | undefined) => void): string

      /**
       * **JMap.Service.History.removePropertyChangeListener**
       * 
       * You can detach a property listener by its id that has been returned when it has been created
       * with function [[JMap.Service.History.onParameterChange]].
       * 
       * After that the listener will be destroyed.
       * 
       * @param listenerId: the listener id
       * 
       * @throws Error if parameterName is not a valid string or fn is not a function
       * 
       * @example ```ts
       * 
       * const listenerId = JMap.Service.History.onParameterChange(...)
       * // the listener is working
       * 
       * // ...
       * 
       * JMap.Service.History.removePropertyChangeListener(listenerId)
       * // here the listener has stopped
       * ```
       */
      function removePropertyChangeListener(listenerId: string): void
    }
    
    /**
     * **JMap.Service.Layer**
     * 
     * Layer related methods.
     */
    namespace Layer {

      /**
       * **JMap.Service.Layer.getLayerTree**
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
       * JMap.Service.Layer.getLayerTree()
       * ```
       */
      function getLayerTree(): JLayerTree

      /**
       * **JMap.Service.Layer.getLayerTreeElementsById**
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
       * JMap.Service.Layer.getLayerTreeElementsById()
       * ```
       */
      function getLayerTreeElementsById(): { [ layerElementId: number ]: JLayerTreeElement }

      /**
       * **JMap.Service.Layer.getLayers**
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
       * JMap.Service.Layer.getLayers()
       * ```
       */
      function getLayers(): JLayer[]

      /**
       * **JMap.Service.Layer.getLayerIds**
       * 
       * Returns an array with JMap layer ids.
       * 
       * The array order is the same as the one in the tree.
       * 
       * If no project is loaded, returns en empty array.
       * 
       * This function is equivalent to :
       * ```ts
       * JMap.Service.Layer.getLayers().map(layer => layer.id)
       * ```
       * 
       * @example ```ts
       * 
       * // returns all JMap layer ids
       * JMap.Service.Layer.getLayerIds()
       * ```
       */
      function getLayerIds(): number[]
      
      /**
       * **JMap.Service.Layer.getLayerAttributes**
       * 
       * Returns all attribute descriptors for a particuler layer
       * 
       * @throws Error if layer is not found
       * @param layerId The JMap layer id
       * @example ```ts
       * 
       *  JMap.Service.Layer.getLayerAttributes(4)
       * ```
       */
      function getLayerAttributes(layerId: number): JLayerAttribute[]
      
      /**
       * **JMap.Service.Layer.exists**
       * 
       * Returns true if a layer having the id exists.
       * 
       * @param layerId The JMap layer id
       * @example ```ts
       * 
       * // returns true if layer id=3 exists
       * JMap.Service.Layer.exists(3)
       * ```
       */
      function exists(layerId: number): boolean

      /**
       * **JMap.Service.Layer.getById**
       * 
       * Returns the JMap layer having the id.
       * 
       * @throws Error if no layer found for the id
       * @param layerId The JMap layer id
       * @example ```ts
       * 
       * // returns the JMap layer id=3
       * JMap.Service.Layer.getById(3)
       * ```
       */
      function getById(layerId: number): JLayerTreeElement

      /**
       * **JMap.Service.Layer.getSelfOrChildren**
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
       * JMap.Service.Layer.getSelfOrChildren(3)
       * ```
       */
      function getSelfOrChildren(layerId: number): JLayer[]

      /**
       * **JMap.Service.Layer.getName**
       * 
       * Returns the name of the layer.
       * 
       * @throws Error if no layer found for the id
       * @param layerId The JMap layer id
       * @example ```ts
       * 
       * // returns the name of layer id=3
       * JMap.Service.Layer.getName(3)
       * ```
       */
      function getName(layerId: number): string

      /**
       * **JMap.Service.Layer.getDescription**
       * 
       * Returns the descrition of the layer.
       * 
       * @throws Error if no layer found for the id
       * @param layerId The JMap layer id
       * @example ```ts
       * 
       * // returns the description of layer id=3
       * JMap.Service.Layer.getDescription(3)
       * ```
       */
      function getDescription(layerId: number): string

      /**
       * **JMap.Service.Layer.isVisible**
       * 
       * Returns the tree element visibility property.
       * 
       * The visibility property is initialy defined on the project, and can be
       * changed by the user through the API.
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
       * JMap.Service.Layer.isVisible(3)
       * ```
       */
      function isVisible(layerId: number, checkParentVisibility?: boolean): boolean

      /**
       * **JMap.Service.Layer.isAllLayerParentsVisible**
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
       * JMap.Service.Layer.isAllLayerParentsVisible(3)
       * ```
       */
      function isAllLayerParentsVisible(layerId: number): boolean

      /**
       * **JMap.Service.Layer.getStyle**
       * 
       * Returns the base style of the layer.
       * 
       * @throws Error if no layer found for the id, or if the layer is a layer group.
       * @param layerId The JMap layer id
       * @example ```ts
       * 
       * // returns layer id=3 base style
       * JMap.Service.Layer.getStyle(3)
       * ```
       */
      function getStyle(layerId: number): JLayerStyle

      /**
       * **JMap.Service.Layer.getSimpleSelectionStyle**
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
       * JMap.Service.Layer.getSimpleSelectionStyle(3)
       * ```
       */
      function getSimpleSelectionStyle(layerId: number): JLayerSimpleStyle

      /**
       * **JMap.Service.Layer.getSelectionStyle**
       * 
       * Returns the layer selection style if defined, else returns null.
       * 
       * @throws Error if no layer found for the id, or if the layer is a layer group.
       * @param layerId The JMap layer id
       * @example ```ts
       * 
       * // returns the simple selection style of layer id=3
       * JMap.Service.Layer.getSelectionStyle(3)
       * ```
       */
      function getSelectionStyle(layerId: number): JLayerStyle | null

      /**
       * ***JMap.Service.Layer.getAllThematicsForLayer***
       * 
       * Returns all layer thematics.
       * 
       * @throws Error if no layer found for the id, or if the layer is a layer group.
       * @param layerId The JMap layer id
       * @example ```ts
       * 
       * // returns all thematics of layer id=4
       * JMap.Service.Layer.getAllThematicsForLayer(4)
       * ```
       */
      function getAllThematicsForLayer(layerId: number): JLayerThematic[]

      /**
       * ***JMap.Service.Layer.getThematicById***
       * 
       * Returns a specific layer thematic.
       * 
       * @throws Error if no layer found for the id, if the layer is a layer group, or if the thematic doesn't exist.
       * @param layerId The JMap layer id
       * @param thematicId The thematic id
       * @example ```ts
       * 
       * // returns thematic id=3 of layer id=4
       * JMap.Service.Layer.getThematicById(4, 3)
       * ```
       */
      function getThematicById(layerId: number, thematicId: number): JLayerThematic

      /**
       * ***JMap.Service.Layer.hasVisibleThematics***
       * 
       * Returns true if the layer has at least one thematic displayed on the map.
       * 
       * @throws Error if no layer found for the id, or if the layer is a layer group.
       * @param layerId The JMap layer id
       * @example ```ts
       * 
       * // returns false if no thematic is displayed for layer id=4
       * JMap.Service.Layer.hasVisibleThematics(4)
       * ```
       */
      function hasVisibleThematics(layerId: number): boolean

      /**
       * ***JMap.Service.Layer.getVisibleThematics***
       * 
       * Returns layer thematics that are currently displayed on the map.
       * 
       * @throws Error if no layer found for the id, or if the layer is a layer group.
       * @param layerId The JMap layer id
       * @example ```ts
       * 
       * // returns false if no thematic is displayed for layer id=4
       * JMap.Service.Layer.getVisibleThematics(4)
       * ```
       */
      function getVisibleThematics(layerId: number): JLayerThematic[]

      /**
       * **JMap.Service.Layer.setVisible**
       * 
       * Set the visibility property of the layer.
       * 
       * If it's a JMap layer, it apply the visibility to it.
       * 
       * The visibility property is initialy defined on the project, and can be
       * changed by the user through the API.
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
       * JMap.Service.Layer.setVisible(5, true)
       * 
       * // hide layer id=3
       * JMap.Service.Layer.setVisible(3, false)
       * ```
       */
      function setVisible(layerId: number, isVisible: boolean): void

      /**
       * **JMap.Service.Layer.setLayerGroupExpansion**
       * 
       * Set the layer group expended or not.
       * 
       * @throws Error if layer group is not found, or is not a layer group but a layer
       * @param layerGroupId The JMap layer group id
       * @param isExpanded if true will expand, if false will collapse the layer group
       * @example ```ts
       * 
       * // Expand the layer group 4
       * JMap.Service.Layer.setLayerGroupExpansion(4, false)
       * ```
       */
      function setLayerGroupExpansion(layerGroupId: number, isExpanded: boolean): void
      
      /**
       * **JMap.Service.Layer.removeLayer**
       * 
       * Remove the layer in the data store and in the map.
       * It is not deleted server side, only in the browser.
       * 
       * @throws Error if layer is not found
       * @param layerId The JMap layer id
       * @example ```ts
       * 
       * // Remove layer 4 (only client side)
       * JMap.Service.Layer.removeLayer(4)
       * ```
       */
      function removeLayer(layerId: number): void
      
      /**
       * **JMap.Service.Layer.setThematicVisibility**
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
       * JMap.Service.Layer.Thematic.setThematicVisibility(7, 3, true)
       * 
       * // Hide the thematic id=3 of layer id=7
       * JMap.Service.Layer.Thematic.setThematicVisibility(7, 3, false)
       * ```
       */
      function setThematicVisibility(layerId: number, thematicId: number, visibility: boolean): void
    }

    /**
     * **JMap.Service.Geometry**
     * 
     * This section contains geometry related methods.
     * 
     * JMap geometry service is based on turfjs implementation.
     */
    namespace Geometry {

      /**
       * **JMap.Service.Geometry.checkLocation**
       * 
       * Throw an error if the provided parameter is not a valid location.
       * 
       * @param location The location object to check
       * @example ```ts
       * 
       * let location = { x: 10, y: 10 }
       * // The following instruction will not throw an error
       * JMap.Service.Geometry.checkLocation(location)
       * 
       * location = {} // empty object
       * // The following instruction will throw an error
       * JMap.Service.Geometry.checkLocation(location)
       * ```
       */
      function checkLocation(location: JLocation): void

      /**
       * **JMap.Service.Geometry.checkCircle**
       * 
       * Throw an error if the provided parameter is not a valid circle.
       * 
       * @param circle The circle object to check
       * @example ```ts
       * 
       * let circle = { center: { x: 10, y: 10 }, radius: 10 }
       * // The following instruction will not throw an error
       * JMap.Service.Geometry.checkCircle(circle)
       * 
       * circle = { radius: 10 } // missing center
       * // The following instruction will throw an error
       * JMap.Service.Geometry.checkCircle(circle)
       * ```
       */
      function checkCircle(circle: JCircle): void

      /**
       * **JMap.Service.Geometry.checkPolygon**
       * 
       * Throw an error if the provided parameter is not a valid polygon.
       * 
       * @param polygon The polygon array to check
       * @example ```ts
       * 
       * let polygon = [[ 10, 10 ], [ 11, 11 ], [ 12, 12 ], [ 10, 10 ]]
       * // The following instruction will not throw an error
       * JMap.Service.Geometry.checkPolygon(polygon)
       * 
       * polygon = [] // empty array
       * // The following instruction will throw an error
       * JMap.Service.Geometry.checkPolygon(polygon)
       * ```
       */
      function checkPolygon(polygon: JPolygon): void

      /**
       * **JMap.Service.Geometry.checkLine**
       * 
       * Throw an error if the provided parameter is not a valid polygon.
       * 
       * @param line The line object to check
       * @example ```ts
       * 
       * let line = [[ 10, 10 ], [ 11, 11 ], [ 12, 12 ]]
       * // The following instruction will not throw an error
       * JMap.Service.Geometry.checkLine(line)
       * 
       * line = [] // empty line
       * // The following instruction will throw an error
       * JMap.Service.Geometry.checkLine(line)
       * ```
       */
      function checkLine(line: JLine): void

      /**
       * **JMap.Service.Geometry.checkBbox**
       * 
       * Throw an error if the provided parameter is not a valid boundary box.
       * 
       * @param bbox The bbox object to check
       * @example ```ts
       * 
       * let bbox = { sw: { x: 10, y: 10 }, ne: { x: 12, y: 12 } }
       * // The following instruction will not throw an error
       * JMap.Service.Geometry.checkBbox(bbox)
       * 
       * bbox = { sw: { x: 10, y: 10 } } // missing "ne" attribute
       * // The following instruction will throw an error
       * JMap.Service.Geometry.checkBbox(bbox)
       * ```
       */
      function checkBbox(bbox: JBoundaryBox): void

      /**
       * **JMap.Service.Geometry.getArea**
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
       * JMap.Service.Geometry.getArea(feature)
       * ```
       */
      function getArea(feature: any): number

      /**
       * **JMap.Service.Geometry.getLineLength**
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
       * JMap.Service.Geometry.getLineLength(line)
       *
       * // The method will return the line length in miles
       * JMap.Service.Geometry.getLineLength(line, "miles")
       * ```
       */
      function getLineLength(feature: any, units?: JGeometryUnit): number

      /**
       * **JMap.Service.Geometry.getCentroid**
       * 
       * Returns a point feature representing the centroid of the provided feature.
       * 
       * @param feature The feature
       * @example ```ts
       * 
       * const polygonFeature = ...
       * // The method will return the centroid of "polygonFeature" as a point feature
       * JMap.Service.Geometry.getCentroid(polygonFeature)
       * ```
       */
      function getCentroid(feature: any): any

      /**
       * **JMap.Service.Geometry.getFeatureFromLine**
       * 
       * Returns a line feature from a line object ([[JLine]]).
       * 
       * @param line A line array
       * @example ```ts
       * 
       * const line = [[ 10, 12], [12, 23], [34, 12]]
       * // The method will return a line feature
       * const feature = JMap.Service.Geometry.getFeatureFromLine(line)
       * ```
       */
      function getFeatureFromLine(line: JLine): any
      
      /**
       * **JMap.Service.Geometry.getPolygonFeatureFromCircle**
       * 
       * Returns a plygon feature from a circle object ([[JCircle]]).
       * 
       * @param circle A circle object
       * @param units unit of the radius
       * @example ```ts
       * 
       * const circle = [[ 10, 12], [12, 23], [34, 12], [ 10, 12]]
       * // The method will return a polygon feature
       * const feature = JMap.Service.Geometry.getPolygonFeatureFromCircle(circle)
       * ```
       */
      function getPolygonFeatureFromCircle(circle: JCircle, units?: JGeometryUnit): any
      
      /**
       * **JMap.Service.Geometry.getFeatureFromPolygon**
       * 
       * Returns a polygon feature from a polygon array ([[JPolygon]]).
       * 
       * @param polygon A polygon array
       * @example ```ts
       * 
       * const polygon = [[ 10, 12], [12, 23], [34, 12], [ 10, 12]]
       * // The method will return a polygon feature
       * const feature = JMap.Service.Geometry.getFeatureFromPolygon(line)
       * ```
       */
      function getFeatureFromPolygon(polygon: JPolygon): any
      
      /**
       * **JMap.Service.Geometry.getBboxFromFeature**
       * 
       * Returns the feature geometry boundary box ([[JBoundaryBox]]).
       * 
       * @param feature A feature object
       * @example ```ts
       * 
       * const feature = ...
       * // The method will return the feature geometry boundary box
       * const bbox = JMap.Service.Geometry.getBboxFromFeature(feature)
       * ```
       */
      function getBboxFromFeature(feature: any): JBoundaryBox
      
      /**
       * **JMap.Service.Geometry.getBboxFromPolygon**
       * 
       * Returns the polygon boundary box.
       * 
       * @param polygon A polygon array
       * @example ```ts
       * 
       * const polygon = [[ 10, 12], [12, 23], [34, 12], [ 10, 12]]
       * // The method will return the polygon boundary box
       * const bbox = JMap.Service.Geometry.getBboxFromPolygon(feature)
       * ```
       */
      function getBboxFromPolygon(polygon: JPolygon): JBoundaryBox
      
      /**
       * **JMap.Service.Geometry.getBboxFromLine**
       * 
       * Returns the line boundary box.
       * 
       * @param line A line array
       * @example ```ts
       * 
       * const line = [[ 10, 12], [12, 23], [34, 12]]
       * // The method will return the line boundary box
       * const bbox = JMap.Service.Geometry.getBboxFromLine(line)
       * ```
       */
      function getBboxFromLine(line: JLine): JBoundaryBox
      
      /**
       * **JMap.Service.Geometry.getPolygonFeatureFromBbox**
       * 
       * Returns a polygon feature corresponding to the boundary box.
       * 
       * @param boundaryBox A boundary box
       * @example ```ts
       * 
       * const bbox = { sw: { x: 10, 10 }, sw: { x: 10, 10 }}
       * // The method will return the line boundary box
       * const bbox = JMap.Service.Geometry.getPolygonFeatureFromBbox(line)
       * ```
       */
      function getPolygonFeatureFromBbox(boundaryBox: JBoundaryBox): any
      
      /**
       * **JMap.Service.Geometry.bboxIntersect**
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
       * const areIntersecting = JMap.Service.Geometry.bboxIntersect(bbox1, bbox2)
       * ```
       */
      function bboxIntersect(bbox1: JBoundaryBox, bbox2: JBoundaryBox): boolean
      
      /**
       * **JMap.Service.Geometry.polygonIntersect**
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
       * const areIntersecting = JMap.Service.Geometry.polygonIntersect(polygonFeature, otherFeature)
       * ```
       */
      function polygonIntersect(polygonFeature: any, otherFeature: any): boolean
      
      /**
       * **JMap.Service.Geometry.lineIntersect**
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
       * const areIntersecting = JMap.Service.Geometry.lineIntersect(lineFeature, otherFeature)
       * ```
       */
      function lineIntersect(lineFeature: any, otherFeature: any): boolean
    }

    /**
     * **JMap.Service.Map**
     * 
     * This section contains map related methods. 
     */
    namespace Map {
      
      /**
       * **JMap.Service.Map.getMap**
       * 
       * Returns the Mapbox map instance, a MapBox map.
       * 
       * @example ```ts
       * 
       * // returns the Mapbox map instance
       * JMap.Service.Map.getMap()
       * ```
       */
      function getMap(): any
      
      /**
       * **JMap.Service.Map.getMapJSLib**
       * 
       * Returns the MapBox JS library used to create the map.
       * 
       * Usefull to be able to create a map library object, by example a popup.
       * 
       * @example ```ts
       * 
       * // Create a MapBox popup
       * const myCustomPopup = JMap.Service.Map.getMapJSLib().Popup({
       *   closeButton: false,
       *   closeOnClick: false
       * })
       * ```
       */
      function getMapJSLib(): any

      /**
       * ***JMap.Service.Map.getDomContainerId***
       * 
       * Returns the map div container id, where the map is or will be created.
       * 
       * @example ```ts
       * 
       * // returns the map div container id
       * JMap.Service.Map.getDomContainerId()
       * ```
       */
      function getDomContainerId(): string

      /**
       * ***JMap.Service.Map.isMapLoaded***
       * 
       * Returns true if the map has been loaded and is ready.
       * 
       * @example ```ts
       * 
       * // returns true or false
       * JMap.Service.Map.isMapLoaded()
       * ```
       */
      function isMapLoaded(): boolean

      /**
       * ***JMap.Service.Map.getExtent***
       * 
       * Returns the current map extent.
       * 
       * @example ```ts
       * 
       * // returns the current map extent
       * JMap.Service.Map.getExtent()
       * ```
       */
      function getExtent(): JBoundaryBox

      /**
       * ***JMap.Service.Map.getCenter***
       * 
       * Returns the location that is the current center of the map.
       * 
       * @example ```ts
       * 
       * // returns the current center of the map
       * JMap.Service.Map.getCenter()
       * ```
       */
      function getCenter(): JLocation

      /**
       * ***JMap.Service.Map.getZoom***
       * 
       * Returns the current map zoom.
       * 
       * @example ```ts
       * 
       * // returns the current map zoom
       * JMap.Service.Map.getZoom()
       * ```
       */
      function getZoom(): number

      /**
       * ***JMap.Service.Map.getScale***
       * 
       * Returns the current map scale.
       * 
       * @example ```ts
       * 
       * // returns the current map scale
       * JMap.Service.Map.getScale()
       * ```
       */
      function getScale(): number

      /**
       * ***JMap.Service.Map.isScaleControlVisible***
       * 
       * Returns true if the scale control panel is visible on the map.
       * 
       * @example ```ts
       * 
       * // returns true if control is displayed on the map
       * JMap.Service.Map.isScaleControlVisible()
       * ```
       */
      function isScaleControlVisible(): boolean

      /**
       * ***JMap.Service.Map.setScaleControlVisibility***
       * 
       * Change the scale control panel visibility on the map.
       * 
       * @param isVisible true to display the scale control, false to hide
       * @param position the position on the map where to display the scale control.
       * @example ```ts
       * 
       * // will display the scale control on the map
       * JMap.Service.Map.setScaleControlVisibility(true)
       * 
       * // will hide the scale control on the map
       * JMap.Service.Map.setScaleControlVisibility(false)
       * ```
       */
      function setScaleControlVisibility(isVisible: boolean, position?: JMapPosition): void

      /**
       * ***JMap.Service.Map.setScaleControlUnits***
       * 
       * Change the scale control units.
       * 
       * @param units possible values : "imperial", "metric", or "nautical"
       * @example ```ts
       * 
       * // will change the scale control for imperial units
       * JMap.Service.Map.setScaleControlUnits("imperial")
       * ```
       */
      function setScaleControlUnits(units: "imperial" | "metric" | "nautical"): void

      /**
       * ***JMap.Service.Map.setScaleControlPosition***
       * 
       * Change the scale control position on the map.
       * 
       * @param position the position on the map where to display the scale control.
       * @example ```ts
       * 
       * // will move the scale control on the top-left corner of the map
       * JMap.Service.Map.setScaleControlPosition("top-left")
       * ```
       */
      function setScaleControlPosition(position: JMapPosition): void

      /**
       * ***JMap.Service.Map.getScaleControlPosition***
       * 
       * Return the current scale control position on the map.
       * 
       * @example ```ts
       * 
       * // Return the current scale control position
       * JMap.Service.Map.getScaleControlPosition()
       * ```
       */
      function getScaleControlPosition(): JMapPosition

      /**
       * **JMap.Service.Map.isLayerRendered**
       * 
       * Returns true if layer is visible on the map.
       * 
       * To be true the layer visibility property has to be true,
       * and the current map scale between the layer min and max scale.
       * 
       * @example ```ts
       * 
       * // returns true if layer is visible on the map
       * JMap.Service.Map.isLayerRendered(4)
       * ```
       */
      function isLayerRendered(layerId: number): boolean

      /**
       * **JMap.Service.Map.getLayersVisibilityStatus**
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
       * JMap.Service.Map.getLayersVisibilityStatus()
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
       * **JMap.Service.Map.getLayersVisibilityStatusAsArray**
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
       * JMap.Service.Map.getLayersVisibilityStatusAsArray()
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
       * **JMap.Service.Map.getInUseJMapLayerIds**
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
       * JMap.Service.Map.getInUseJMapLayerIds()
       * ```
       */
      function getInUseJMapLayerIds(): number[]
      
      /**
       * **JMap.Service.Map.getInUseJMapVectorLayerIds**
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
       * JMap.Service.Map.getInUseJMapVectorLayerIds()
       * ```
       */
      function getInUseJMapVectorLayerIds(): number[]
      
      /**
       * **JMap.Service.Map.getInUseJMapLayerBefore**
       * 
       * Returns the layer id that is ordered before the layer id provided in argument.
       * 
       * @throws Error if layer is not found
       * @param layerId The JMap layer id
       * @returns the JMap layer id, or undefined if no layer before
       * @example ```ts
       * 
       * // Returns the layer id that is located before layer id=4
       * JMap.Service.Map.getInUseJMapLayerBefore(4)
       * ```
       */
      function getInUseJMapLayerBefore(layerId: number): number | undefined
      
      /**
       * **JMap.Service.Map.getInUseJMapLayerAfter**
       * 
       * Returns the layer id that is ordered after the layer id provided in argument.
       * 
       * @throws Error if layer is not found
       * @param layerId The JMap layer id
       * @returns the JMap layer id, or undefined if no layer after
       * @example ```ts
       * 
       * // Returns the layer id that is located after layer id=3
       * JMap.Service.Map.getInUseJMapLayerAfter(3)
       * ```
       */
      function getInUseJMapLayerAfter(layerId: number): number | undefined

      /**
       * **JMap.Service.Map.getRenderedJMapLayerIds**
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
       * JMap.Service.Map.getRenderedJMapLayerIds()
       * ```
       */
      function getRenderedJMapLayerIds(): number[]

      /**
       * **JMap.Service.Map.getRenderedFeatures**
       * 
       * Returns rendered geojson features for the layer.
       * 
       * @throws Error if layer is not found
       * @throws Error if no or incorrect filter is passed
       * @param layerId The JMap layer id
       * @param filter You can pass a location or a boundary box to get only the features that intersect it
       * @return A features array
       * @example ```ts
       * 
       * // Returns all rendered geojson features for layer 4
       * JMap.Service.Map.getRenderedFeatures(4)
       * 
       * // Returns all rendered geojson features for layer 4 at location x=45.54 and y=65.43
       * JMap.Service.Map.getRenderedFeatures(4, { x: 45.54, y: 65.43 })
       * 
       * // Returns all rendered geojson features for layer 4 that intersect the boundary box
       * // having south-west { x=45.54 and y=65.43 } and north-est { x=48.54 and y=70.43 }
       * JMap.Service.Map.getRenderedFeatures(4, {
       *  sw: { x: 45.54, y: 65.43 },
       *  ne: { x: 48.54, y: 70.43 }
       * })
       * ```
       */
      function getRenderedFeatures(layerId: number, filter?: JLocation | JBoundaryBox): any[]
      
      /**
       * **JMap.Service.Map.getRenderedFeaturesAttributeValues**
       * 
       * Returns rendered features attributes for the layer.
       * 
       * The result is an array of object, one object for each feature.
       * Each object contains all feature's attributes, plus another one that is called "featureId" and contains the feature id.
       * 
       * @throws Error if layer is not found
       * @throws Error if no or incorrect filter is passed
       * @param layerId The JMap layer id
       * @param filter You can pass a location or a boundary box to get only the features that intersect it
       * @return An object array
       * @example ```ts
       * 
       * // Will returns all features attributes for layer 4
       * JMap.Service.Map.getRenderedFeaturesAttributeValues(4)
       * 
       * // Will returns all features attributes for layer 4, that intersect the location
       * JMap.Service.Map.getRenderedFeaturesAttributeValues(4, { x: 45.54, y: 65.43 })
       * 
       * // Will returns all features attributes for layer 4, that intersect the boundary box
       * JMap.Service.Map.getRenderedFeaturesAttributeValues(4, { sw: { x: 45.54, y: 65.43 }, ne: { x: 48.54, y: 70.43 }})
       * 
       * // Example of result for features that have only 2 attributes "Firestation" and "Nursery" :
       * [
       *  { name: "Firestation", age: 23, featureId: 2377 },
       *  { name: "Nursery", age: 20, featureId: 3456 }
       * ]
       * ```
       */
      function getRenderedFeaturesAttributeValues(layerId: number, filter?: JLocation | JBoundaryBox): JMapFeatureAttributeValues[]
      
      /**
       * **JMap.Service.Map.getAvailableBaseMaps**
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
       * JMap.Service.Map.getAvailableBaseMaps()
       * ```
       */
      function getAvailableBaseMaps(): string[]

       /**
       * ***JMap.Service.Map.getBaseMap***
       * 
       * Returns the current map pitch.
       * 
       * @example ```ts
       * 
       * // returns the current map pitch
       * JMap.Service.Map.getPitch()
       * ```
       */
      function getPitch(): number

      /**
       * ***JMap.Service.Map.getBaseMap***
       * 
       * Returns the current map bearing (rotation).
       * 
       * @example ```ts
       * 
       * // returns the current map bearing
       * JMap.Service.Map.getBearing()
       * ```
       */
      function getBearing(): number
      /**
       * ***JMap.Service.Map.getBaseMap***
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
       * JMap.Service.Map.getBaseMap()
       * ```
       */
      function getBaseMap(): string
      
      /**
       * **JMap.Service.Map.setBaseMap**
       * 
       * Apply the basemap on the map.
       * 
       * @throws Error if mapName is not supported
       * @param mapName The name of the basemap, use JMap.Service.Map.getAvailableBaseMaps() to get available basemap names
       * @example ```ts
       * 
       * // Set the basemap as "streets"
       * JMap.Service.Map.setBaseMap("streets")
       * ```
       */
      function setBaseMap(mapName: string): void

       /**
       * **JMap.Service.Map.setBearing**
       * 
       * Set the bearing on the map (rotation)
       * 
       * @throws Error if the bearing is not between -360 to 360 degree
       * @param bearing te new value of the bearing between 0 to 360
       * @example ```ts
       * 
       * // Set 30 degrees bearing
       * JMap.Service.Map.setBearing(30)
       * ```
       */
      function setBearing(bearing: number): void

      /**
       * **JMap.Service.Map.setPitch**
       * 
       * Set the pitch on the map
       * 
       * @throws Error if the pitch is not between 0 to 60 degree
       * @param pitch te new value of the pitch between 0 to 60
       * @example ```ts
       * 
       * // Set 30 degrees pitch
       * JMap.Service.Map.setPitch(30)
       * ```
       */
      function setPitch(pitch: number): void

      /**
       * **JMap.Service.Map.panTo**
       * 
       * Move and center the map to the location (animated)
       * 
       * @throws Error if no or incorrect center is passed
       * @param center The location where the map will be centered
       * @param stopJMapEventPropagation if true will prevent JMap events to be fired
       * @example ```ts
       * 
       * // Move the map to the desired location
       * JMap.Service.Map.panTo({ x: 45.34, y: 65.87 })
       * ```
       */

      function panTo(center: JLocation, stopJMapEventPropagation?: boolean): void

      /**
       * **JMap.Service.Map.zoomTo**
       * 
       * Zoom or unzoom the map (animated)
       * 
       * @throws Error if no zoom is passed
       * @param zoom The zoom level to apply
       * @param stopJMapEventPropagation if true will prevent JMap events to be fired
       * @example ```ts
       * 
       * // Zoom or unzoom the map to reach the desired zoom level
       * JMap.Service.Map.zoomTo(4.45)
       * ```
       */
      function zoomTo(zoom: number, stopJMapEventPropagation?: boolean): void
      
      /**
       * **JMap.Service.Map.zoomToRect**
       * 
       * Zoom or unzoom to fit exactly the boundary box (animated)
       * 
       * @throws Error if an invalid bbox is passed
       * @param bbox The boundary box to fit
       * @param stopJMapEventPropagation if true will prevent JMap events to be fired
       * @example ```ts
       * 
       * // Zoom or unzoom to fit exactly the boundary box
       * JMap.Service.Map.zoomToRect({ sw: { x: 12, y: 34 }, ne: { x: 23, y: 32 }})
       * ```
       */
      function zoomToRect(bbox: JBoundaryBox, stopJMapEventPropagation?: boolean): void

      /**
       * **JMap.Service.Map.panAndZoomTo**
       * 
       * Move and zoom (or unzoom) the map (animated)
       * 
       * @throws Error if bad parameters are passed
       * @param center The location where the map will be centered
       * @param zoom The zoom level to apply
       * @param stopJMapEventPropagation if true will prevent JMap event to be fired
       * @example ```ts
       * 
       * // Move and zoom the map
       * JMap.Service.Map.panAndZoomTo({ x: 45.34, y: 65.87 }, 5)
       * ```
       */
      function panAndZoomTo(center: JLocation, zoom: number, stopJMapEventPropagation?: boolean): void
      
      /**
       * **JMap.Service.Map.Interaction**
       * 
       * We introduced a notion of map interactor in JMap.
       * 
       * The need is that we want the map to interact in different ways depending on what the user is doing :
       *  - When he is drawing on the map we display shape on the map
       *  - When he is clicking on the map we display a popup information
       *  - etc...
       * 
       * Depending on the API mode that is activated, we need different interactions with the user.
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
       * After creating your interactor object, you need to add it in the API :
       * ```ts
       *  JMap.Service.Map.Interaction.addInteractor(
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
       * When you don't need anymore an interactor you can terminate it, and it will not exist anymore in the API.
       */
      namespace Interaction {
        
        /**
         * **JMap.Service.Map.Interaction.addInteractor**
         * 
         * Add a map interactor.
         * 
         * If the id has already an existing interactor defined for, it will replace the old one.
         * 
         * So be carrefull not to remove JMap interactors.
         * 
         * You can get the list of already existing interactor ids like this :
         * ```ts
         * JMap.Service.Map.Interaction
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
         * JMap.Service.Map.Interaction.addInteractor("my-custom-pin", { ...mapInteractor }, false)
         * 
         * // add and activate a new interactor
         * JMap.Service.Map.Interaction.addInteractor("my-custom-pin", { ...mapInteractor }, true)
         * ```
         */
        function addInteractor(id: string, interactor: JMapInteractor, active?: boolean): void
        
        /**
         * **JMap.Service.Map.Interaction.terminateInteractorById**
         * 
         * Terminate the map interactor.
         * 
         * After being terminated, the interactor doesn't exist anymore in JMAp Web API.
         * 
         * You cannot activate it anymore.
         * 
         * @throws Error if interactor is not found
         * @param interactorId The interactor id to terminate
         * @example ```ts
         * 
         * // terminate interactor id="custom-selection"
         * JMap.Service.Map.Interaction.terminateInteractorById("custom-selection")
         * ```
         */
        function terminateInteractorById(interactorId: string): void
        
        /**
         * **JMap.Service.Map.Interaction.getAllInteractorIds**
         * 
         * Returns all existing interactor ids.
         * 
         * @example ```ts
         * 
         * // returns all existing interactor ids
         * JMap.Service.Map.Interaction.getAllInteractorIds()
         * ```
         */
        function getAllInteractorIds(): string[]
        
        /**
         * **JMap.Service.Map.Interaction.getActiveInteractorId**
         * 
         * Returns the active interactor id.
         * 
         * @example ```ts
         * 
         * // Returns the active interactor descriptor
         * JMap.Service.Map.Interaction.getActiveInteractorId()
         * ```
         */
        function getActiveInteractorId(): string
        
        /**
         * **JMap.Service.Map.Interaction.activateInteractorById**
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
         * JMap.Service.Map.Interaction.activateInteractorById("draw")
         * ```
         */
        function activateInteractorById(interactorId: string): void
      }
      
      /**
       * **JMap.Service.Map.Filter**
       * 
       * JMap offer the ability to filter the features that are rendered on the map.
       * 
       * We can apply filter on attributes values, or a spatial filter.
       */
      namespace Filter {
        
        /**
         * **JMap.Service.Map.Filter.applyHasAttribute**
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
         * JMap.Service.Map.Filter.applyHasAttribute(4, "name")
         * ```
         */
        function applyHasAttribute(layerId: number, attributeId: string): string
        
        /**
         * **JMap.Service.Map.Filter.applyHasNotAttribute**
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
         * JMap.Service.Map.Filter.applyHasNotAttribute(4, "name")
         * ```
         */
        function applyHasNotAttribute(layerId: number, attributeId: string): string
        
        /**
         * **JMap.Service.Map.Filter.applyAttributeValueEqualTo**
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
         * JMap.Service.Map.Filter.applyAttributeValueEqualTo(4, "name", "Aquarius")
         * ```
         */
        function applyAttributeValueEqualTo(layerId: number, attributeId: string, attributeValue: any): string
        
        /**
         * **JMap.Service.Map.Filter.applyAttributeValueBetween**
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
         * JMap.Service.Map.Filter.applyAttributeValueBetween(4, "level", 2, 10)
         * ```
         */
        function applyAttributeValueBetween(layerId: number, attributeId: string, start: any, end: any): string
        
        /**
         * **JMap.Service.Map.Filter.applyAttributeValueNotEqualTo**
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
         * JMap.Service.Map.Filter.applyAttributeValueNotEqualTo(4, "name", "Aquarius")
         * ```
         */
        function applyAttributeValueNotEqualTo(layerId: number, attributeId: string, attributeValue: any): string
        
        /**
         * **JMap.Service.Map.Filter.applyAttributeValueGreaterThan**
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
         * JMap.Service.Map.Filter.applyAttributeValueGreaterThan(4, "level", 2)
         * ```
         */
        function applyAttributeValueGreaterThan(layerId: number, attributeId: string, attributeValue: any): string
        
        /**
         * **JMap.Service.Map.Filter.applyAttributeValueGreaterOrEqualsTo**
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
         * JMap.Service.Map.Filter.applyAttributeValueGreaterOrEqualsTo(4, "level", 2)
         * ```
         */
        function applyAttributeValueGreaterOrEqualsTo(layerId: number, attributeId: string, attributeValue: any): string
        
        /**
         * **JMap.Service.Map.Filter.applyAttributeValueLowerThan**
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
         * JMap.Service.Map.Filter.applyAttributeValueLowerThan(4, "level", 5)
         * ```
         */
        function applyAttributeValueLowerThan(layerId: number, attributeId: string, attributeValue: any): string
        
        /**
         * **JMap.Service.Map.Filter.applyAttributeValueLowerOrEqualsTo**
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
         * JMap.Service.Map.Filter.applyAttributeValueLowerOrEqualsTo(4, "level", 5)
         * ```
         */
        function applyAttributeValueLowerOrEqualsTo(layerId: number, attributeId: string, attributeValue: any): string
        
        /**
         * **JMap.Service.Map.Filter.applyAttributeValueIn**
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
         * JMap.Service.Map.Filter.applyAttributeValueIn(4, "level", [ 4, 5 ])
         * ```
         */
        function applyAttributeValueIn(layerId: number, attributeId: string, attributeValues: any[]): string
        
        /**
         * **JMap.Service.Map.Filter.applyAttributeValueNotIn**
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
         * JMap.Service.Map.Filter.applyAttributeValueNotIn(4, "level", [ 4, 5 ])
         * ```
         */
        function applyAttributeValueNotIn(layerId: number, attributeId: string, attributeValues: any[]): string
        
        /**
         * **JMap.Service.Map.Filter.applySpatial**
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
         * JMap.Service.Map.Filter.applySpatial(4, { radius: 500, center: { x: 20, y: 10 }})
         * 
         * // Will render features that intersect the polygon (in this case a square)
         * JMap.Service.Map.Filter.applySpatial(4, [ [ 20.44, 10.32 ], [ 20.44, 78.44 ], [ 40.56, 78.44 ], [ 40.56, 10.32 ], [ 20.44, 10.32 ] ])
         * ```
         */
        function applySpatial(layerId: number, filterGeometry: JPolygon | JCircle): string
        
        /**
         * **JMap.Service.Map.Filter.removeByFilterId**
         * 
         * Remove the filter on the map following the filter id passed in parameter. 
         * 
         * @param filterId The filter id. The one you get when you call a filter method that starts with apply.
         * @example ```ts
         * 
         * // Remove spatial filter on layer 3
         * JMap.Service.Map.Filter.removeByFilterId("spatial-3")
         * 
         * // Remove attribute filter on attribute id="on_off", on layer 4
         * JMap.Service.Map.Filter.removeByFilterId("attribute-4-on_off")
         * ```
         */
        function removeByFilterId(filterId: string): void

        /**
         * **JMap.Service.Map.Filter.removeAllFilters**
         * 
         * Remove all spatial and attributes filters for layer.
         * 
         * @param layerId The JMap layer id
         * @example ```ts
         * 
         * // Remove all filters (spatial + attribute) for layer 3
         * JMap.Service.Map.Filter.removeAllFilters(3)
         * ```
         */
        function removeAllFilters(layerId: number): void
      }

      /**
       * **JMap.Service.Map.Selection**
       * 
       * You can select features on the map with JMap, this where you can manage the selection.
       * 
       * You can select on the map programatically by passing a location, or by passing features.
       * 
       * And you can also removing some or all features of the selection.
       */
      namespace Selection {

        /**
         * ***JMap.Service.Map.Selection.getSelectedFeatures***
         * 
         * Returns the current map selection as a javascript map (= a javascript object) where :
         *  - the key is the layer element id
         *  - the value is an array of feature (an empty array if layer doesn't have features selected)
         * 
         * @example ```ts
         * 
         * // returns the current selected features by layer id
         * JMap.Service.Map.Selection.getSelectedFeatures()
         * ```
         */
        function getSelectedFeatures(): JMapSelection
  
        /**
         * ***JMap.Service.Map.Selection.getSelectedFeaturesForLayer***
         * 
         * Returns the current selected features for a specific JMap layer.
         * 
         * @returns an array of GeoJSON features
         * @example ```ts
         * 
         * // returns the current selected features for layer 3
         * JMap.Service.Map.Selection.getSelectedFeaturesForLayer(3)
         * ```
         */
        function getSelectedFeaturesForLayer(layerId: number): any[]
  
        /**
         * ***JMap.Service.Map.Selection.getSelectedFeatureIdsForLayer***
         * 
         * Returns the current selected feature ids for a specific JMap layer.
         * 
         * This function is the equivalent of that code :
         * ```ts
         * // returns the same as JMap.Service.Map.getSelectedFeatureIdsForLayer(3)
         * JMap.Service.Map.Selection
         *    .getSelectedFeaturesForLayer(layerId: number)
         *    .map(feature => feature.id)
         * ```
         * 
         * @example ```ts
         * 
         * // returns the current selected feature ids for layer 3
         * JMap.Service.Map.Selection.getSelectedFeatureIdsForLayer(3)
         * ```
         */
        function getSelectedFeatureIdsForLayer(layerId: number): number[]

        /**
         * **JMap.Service.Map.Selection.selectOnOneLayerAtLocation**
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
         * JMap.Service.Map.Selection.selectOnOneLayerAtLocation(4, { x: 34.23, y: 55.5 })
         * ```
         */
        function selectOnOneLayerAtLocation(layerId: number, location: JLocation, params?: JMapSelectionParams): any[]

        /**
         * **JMap.Service.Map.Selection.selectOnOneLayerFromCircle**
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
         * JMap.Service.Map.Selection.selectOnOneLayerFromCircle(
         *   4, //layer id
         *   {
         *     center: { x: 34.23, y: 55.5 },
         *     radius: 100
         *   }
         * )
         * ```
         */
        function selectOnOneLayerFromCircle(layerId: number, circle: JCircle, params?: JMapSelectionParams): any[]

        /**
         * **JMap.Service.Map.Selection.selectOnOneLayerFromLine**
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
         * JMap.Service.Map.Selection.selectOnOneLayerFromLine(
         *   4, // The layer id
         *   [
         *     [ 34.23, 55.5 ],
         *     [ 36.24, 14.9 ],
         *     [ 45.23, 25.2 ]
         *   ]
         * )
         * ```
         */
        function selectOnOneLayerFromLine(layerId: number, line: JLine, params?: JMapSelectionParams): any[]

        /**
         * **JMap.Service.Map.Selection.selectOnOneLayerFromPolygon**
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
         * JMap.Service.Map.Selection.selectOnOneLayerFromPolygon(
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
        function selectOnOneLayerFromPolygon(layerId: number, polygon: JPolygon, params?: JMapSelectionParams): any[]

        /**
         * **JMap.Service.Map.Selection.selectOnAllLayersAtLocation**
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
         * JMap.Service.Map.Selection.selectOnAllLayersAtLocation({ x: 34.23, y: 55.5 })
         * ```
         */
        function selectOnAllLayersAtLocation(location: JLocation, params?: JMapSelectionParams): JMapSelection

        /**
         * **JMap.Service.Map.Selection.selectOnAllLayersFromCircle**
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
         * JMap.Service.Map.Selection.selectOnAllLayersFromCircle({
         *   center: { x: 34.23, y: 55.5 },
         *   radius: 100
         * })
         * ```
         */
        function selectOnAllLayersFromCircle(circle: JCircle, params?: JMapSelectionParams): JMapSelection

        /**
         * **JMap.Service.Map.Selection.selectOnAllLayersFromLine**
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
         * JMap.Service.Map.Selection.selectOnAllLayersFromLine([
         *   [ 34.23, 55.5 ],
         *   [ 36.24, 14.9 ],
         *   [ 45.23, 25.2 ]
         * ])
         * ```
         */
        function selectOnAllLayersFromLine(line: JLine, params?: JMapSelectionParams): JMapSelection

        /**
         * **JMap.Service.Map.Selection.selectOnAllLayersFromPolygon**
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
         * JMap.Service.Map.Selection.selectOnAllLayersFromPolygon([
         *   [ 34.23, 55.5 ],
         *   [ 36.24, 14.9 ],
         *   [ 45.23, 25.2 ],
         *   [ 34.23, 55.5 ] // first and last point of a polygon must be equals
         * ])
         * ```
         */
        function selectOnAllLayersFromPolygon(polygon: JPolygon, params?: JMapSelectionParams): JMapSelection

        /**
         * **JMap.Service.Map.Selection.setLayerSelection**
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
         * JMap.Service.Map.Selection.setLayerSelection(4, {
         *  id: 234,
         *  type: "Point",
         *  geometry: {...},
         *  properties: [...]
         * })
         * 
         * // will select two features (id = 234 and 567) of layer 4 on the map
         * JMap.Service.Map.Selection.setLayerSelection(4, [
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
        function setLayerSelection(layerId: number, features: any | any[]): void

        /**
         * **JMap.Service.Map.Selection.addFeaturesToLayerSelection**
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
         * JMap.Service.Map.Selection.addFeaturesToLayerSelection(4, {
         *  id: 234,
         *  type: "Point",
         *  geometry: {...},
         *  properties: [...]
         * })
         * 
         * // Add 2 features (id = 234 and 567) to layer 4 selection
         * JMap.Service.Map.Selection.addFeaturesToLayerSelection(4, [
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
        function addFeaturesToLayerSelection(layerId: number, features: any | any[]): void

        /**
         * **JMap.Service.Map.Selection.removeFeaturesFromLayerSelection**
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
         * // Remove one feature (id = 234) from layer 4 selection
         * JMap.Service.Map.Selection.removeFeaturesFromLayerSelection(4, 234)
         * 
         * // Remove 2 features (id = 234 and 567) from layer 4 selection
         * JMap.Service.Map.Selection.removeFeaturesFromLayerSelection(4, [ 234, 567 ])
         * ```
         */
        function removeFeaturesFromLayerSelection(layerId: number, featureIds: number | number[]): void

        /**
         * **JMap.Service.Map.Selection.removeFeaturesFromLayerSelection**
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
         * JMap.Service.Map.Selection.clearSelection(4)
         * 
         * // Clear selection of all layers
         * JMap.Service.Map.Selection.clearSelection()
         * ```
         */
        function clearSelection(layerId?: number): void
      }
    }

    /**
     * **JMap.Service.MouseOver**
     * 
     * JMap provide a mecanism that is called MouseOver.
     * 
     * We can defined from JMap Admin a mouseover for a layer.
     * 
     * The mouseover is written in HTML, enriched with JMap specific function that are interpretated.
     * 
     * When [[API_MODE]] is "layer", when we click on layers that have a mouseover defined, JMap display
     * a popup on the map with the formatted content for each features.
     * 
     * This API section provide methods permitting you to customize the mouseover.
     */
    namespace MouseOver {

      /**
       * **JMap.Service.MouseOver.renderForFeaturesAtLocation**
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
       * JMap.Service.MouseOver.renderForFeaturesAtLocation("my-custom-div", { x: 34.44, y: 23.44 })
       * ```
       */
      function renderForFeaturesAtLocation(containerId: string, location: JLocation): boolean // returns true if has mouseover

      /**
       * **JMap.Service.MouseOver.renderForFeaturesSelection**
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
       * JMap.Service.MouseOver.renderForFeaturesSelection("my-custom-div", {
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
       * **JMap.Service.MouseOver.getMouseOverContent**
       * 
       * Returns the mousever content for the provided feature selection. If no mouseover are defined
       * for any layer it returns undefined.
       * 
       * The result you get need first to be inserted in the DOM, then after the insertion,
       * you need to call the method processJSAndPhotosForContent()
       * (in order to finish displaying all informations)
       * 
       * You should not use this function, except for a very special need, instead you should use the
       * function JMap.Service.MouseOver.renderForFeaturesSelection that do the same thing in one step.
       * 
       * @throws Error if selection format is not good
       * @param selection A feature selection, the mouseover will be processed only for this features
       * @return the mouseover content or undefined
       * @example ```ts
       * 
       * const mouseOverContent = JMap.Service.MouseOver.getMouseOverContent({
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
       *  JMap.Service.MouseOver.processJSAndPhotosForContent(mouseOverContent)
       * } else {
       *  // Emptying the div if no mouseover
       *  mouseOverDiv.innerHTML = ""
       * }
       * ```
       */
      function getMouseOverContent(selection: JMapSelection): JMouseOverContent | undefined

      /**
       * **JMap.Service.MouseOver.processJSAndPhotosForContent**
       * 
       * Use this function only if you use JMap.Service.MouseOver.getMouseOverContent function before.
       * 
       * You can call this function after having inserted the mouseover html in the DOM.
       * 
       * The function will eval the mouseover javascript (from the external mouseover), and if needed make
       * a call to the server to get the features photos and display it (so we need the mouseover content to be 
       * exist in the DOM.
       * 
       * @throws Error if mouseover content format is not good
       * @param content The mouseover content you get from method JMap.Service.MouseOver.getMouseOverContent
       * @example ```ts
       * 
       * const mouseOverContent = JMap.Service.MouseOver.getMouseOverContent(...)
       * const mouseOverDiv = document.getElementById("my-div-id")
       * if (mouseOverContent) {
       *  mouseOverDiv.innerHTML = mouseOverContent.html
       *  JMap.Service.MouseOver.processJSAndPhotosForContent(mouseOverContent)
       * } else {
       *  // Emptying the div if no mouseover
       *  mouseOverDiv.innerHTML = ""
       * }
       * ```
       */
      function processJSAndPhotosForContent(content: JMouseOverContent): void
    }
    /**
     * **JMap.Service.Project**
     * 
     * From this section you can manage the project that is in use in the API.
     */
    namespace Project {
      
      /**
       * **JMap.Service.Project.getAllProjects**
       * 
       * Returns a promise that returns all JMap projects descriptors when resolved.
       * 
       * If no project is loaded, returns empty array.
       * 
       * @example ```ts
       * 
       * // This is asynchronous code, getAllProject return a promise that is
       * // resolved after the server returned all project data.
       * JMap.Service.Project
       *    .getAllProjects()
       *    .then(projects => {
       *      // Here you can start using the projects
       *      console.log(`Projects count = "${projects.length}"`
       *    }))
       * ```
       */
      function getAllProjects(): Promise<JProject[]>

     /**
      * **JMap.Service.Project.getId**
      * 
      * Returns selected JMap project id.
      * 
      * If no project is loaded, returns -1.
      * 
      * @example ```ts
      * 
      * // returns the currently loaded project id
      * JMap.Service.Project.getId()
      * ```
      */
     function getId(): number

     /**
      * **JMap.Service.Project.getName**
      * 
      * Returns selected JMap project name.
      * 
      * If no project is loaded, returns "".
      * 
      * @example ```ts
      * 
      * // returns the currently loaded project name
      * JMap.Service.Project.getName()
      * ```
      */
     function getName(): string

     /**
      * **JMap.Service.Project.getDescription**
      * 
      * Returns selected JMap project description.
      * 
      * If no project is loaded, returns "".
      * 
      * @example ```ts
      * 
      * // returns the currently loaded project description
      * JMap.Service.Project.getDescription()
      * ```
      */
     function getDescription(): string

     /**
      * **JMap.Service.Project.getProjection**
      * 
      * Returns selected JMap project projection.
      * 
      * If no project is selected, returns an empty projection : { code: "", name: "" }.
      * 
      * In MapBox, projection is always "***EPSG:3857***", but that function returns the project
      * defined projection (so it can be different than ***ESPG:3857***).
      * 
      * @example ```ts
      * 
      * // returns the project projection
      * JMap.Service.Project.getProjection()
      * ```
      */
     function getProjection(): JProjection

     /**
      * **JMap.Service.Project.getInitialRotation**
      * 
      * Returns selected JMap project initial map rotation.
      * This rotation is the one applied when the project is opened.
      * 
      * If no project is selected, returns 0.
      * 
      * @example ```ts
      * 
      * // returns the project initial rotation
      * JMap.Service.Project.getInitialRotation()
      * ```
      */
     function getInitialRotation(): number

     /**
      * **JMap.Service.Project.getMinScale**
      * 
      * Returns selected JMap project min scale.
      * 
      * If no project is selected, returns 0.
      * 
      * @example ```ts
      * 
      * // returns the project min scale
      * JMap.Service.Project.getMinScale()
      * ```
      */
     function getMinScale(): number

     /**
      * **JMap.Service.Project.getMaxScale**
      * 
      * Returns selected JMap project max scale.
      * 
      * If no project is selected, returns 0.
      * 
      * @example ```ts
      * 
      * // returns the project max scale
      * JMap.Service.Project.getMaxScale()
      * ```
      */
     function getMaxScale(): number

     /**
      * **JMap.Service.Project.getSelectionColor**
      * 
      * Returns selected JMap project selection color in html hexa format.
      * 
      * This is the color that is used for selected features of layers that
      * don't have a specific selection style defined.
      * 
      * If no project is selected, returns "#ffffff".
      * 
      * @example ```ts
      * 
      * // returns the project selection color as a html hexa color
      * JMap.Service.Project.getSelectionColor()
      * ```
      */
     function getSelectionColor(): string

     /**
      * **JMap.Service.Project.getBackgroundColor**
      * 
      * Returns selected JMap project background color in html hexa format.
      * This color is used as the background of the map.
      * 
      * If no project is selected, returns "#ffe4c4".
      * 
      * @example ```ts
      * 
      * // returns the project background color as a html hexa color
      * JMap.Service.Project.getBackgroundColor()
      * ```
      */
     function getBackgroundColor(): string

     /**
      * **JMap.Service.Project.getInitialExtent**
      * 
      * Returns selected JMap project initial extent.
      * This is the extent that is automatically displayed when the project is opened.
      * 
      * If no project is selected, returns null.
      * 
      * @example ```ts
      * 
      * // returns the project initial extent if exists
      * JMap.Service.Project.getInitialExtent()
      * ```
      */
     function getInitialExtent(): JBounds | null

      /**
       * **JMap.Service.Project.load**
       * 
       * You can display another project by calling this method.
       * 
       * User session rigths are checked server side and an error is thrown if user doesn't have
       * the access right for the project.
       * 
       * If no projectId is provided, the one defined in API options ([[JAPIOptions]]) will be used.
       * If no project id has been defined, an error is thrown.
       * 
       * @throws Error if project not found
       * @param projectId The JMap project id
       * @return a promise that is resolved when the project has been loaded successfully
       * @example ```ts
       * 
       * // Load data and display map of project id=2
       * JMap.Service.Project.load(2)
       * ```
       */
      function load(projectId?: number): Promise<void>

      /**
       * **JMap.Service.Project.load**
       * 
       * Unload the current displayed project.
       * 
       * The map is destroyed, and nothing is displayed on screen.
       * 
       * @example ```ts
       * 
       * // Unload the current project.
       * JMap.Service.Project.unload()
       * ```
       */
      function unload(): void
    }

    /**
     * **JMap.Service.User**
     * 
     * From this section you can manage the user session.
     */
    namespace User {

      /**
       * ***JMap.Service.User.getToken***
       * 
       * If user is logged in, returns the current user session token.
       * 
       * Else returns "-1" if user has no active session.
       * 
       * @example ```ts
       * 
       * // returns the user session token
       * JMap.Service.User.getToken()
       * ```
       */
      function getToken(): string

      /**
       * ***JMap.Service.User.getFullName***
       * 
       * Returns user full name.
       * 
       * @example ```ts
       * 
       * // returns the user full name, ex : "John Do"
       * JMap.Service.User.getFullName()
       * ```
       */
      function getFullName(): string

      /**
       * ***JMap.Service.User.getUsername***
       * 
       * Returns the username (the one used to login).
       * 
       * @example ```ts
       * 
       * // returns the username
       * JMap.Service.User.getUsername()
       * ```
       */
      function getUsername(): string

      /**
       * **JMap.Service.User.getLocale**
       * 
       * Get the user locale.
       * 
       * @example ```ts
       * 
       * // return "EN", or "FR", or "ES", or "PT"
       * JMap.Service.User.getLocale()
       * ```
       */
      function getLocale(): string

      /**
       * **JMap.Service.User.login**
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
       * JMap.Service.User
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
       * **JMap.Service.User.logout**
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
       * JMap.Service.User
       *    .logout()
       *    .then(() => {
       *      console.log(`User has been logout`)
       *    })
       * ```
       */
      function logout(): Promise<void>

      /**
       * **JMap.Service.User.setSession**
       * 
       * Set the user session data. Usefull if you have made a call to our rest API and get by yourself
       * the session data.
       * 
       * @throws Error if session data are not good
       * @param session The user session data
       * @example ```ts
       * 
       * // Set the user session data
       * JMap.Service.User.setSession({
       *  token: "2355810917",
       *  user: {
       *    login: "jdo@mycompany.com",
       *    firstname: "John",
       *    lastname: "Do",
       *    admin: false
       *  }
       * })
       * ```
       */
      function setSession(session: JSessionData): void
    }
  }

  /**
   * **JMap.Component**
   * 
   * From this section you can start and destroy JMap component
   * that you can mount where you want in your own DOM containers.
   */
  namespace Component {

    /**
     * **JMap.Component.User**
     * 
     * The user component is a panel where :
     *  - If you are not loggued in display the login form
     *  - If you loggued in display the user information
     */
    namespace User {

      /**
       * **JMap.Component.User.create**
       * 
       * Create a new instance of user component in the container div.
       * 
       * @throws Error if container doesn't exist in the DOM
       * @param containerId The DOM container id where the component will be mounted
       * @example ```ts
       * 
       * // create a user component, and mount it in div id="my-custom-div-id"
       * JMap.Component.User.create("my-custom-div-id")
       * ```
       */
      function create(containerId: string): void

      /**
       * **JMap.Component.User.destroy**
       * 
       * Destroy the user component instance that has been created in the container div.
       * 
       * @throws Error if container doesn't exist in the DOM
       * @param containerId The DOM container id where the component will be mounted
       * @example ```ts
       * 
       * // destroy the user component mounted in div id="my-custom-div-id"
       * JMap.Component.User.destroy("my-custom-div-id")
       * ```
       */
      function destroy(containerId: string): void
    }
  }

  /**
   * **JMap.Event**
   * 
   * From this section you can manage your own event listeners reacting to JMap API events.
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
   * Deactivating a listener keep it in the JMAP API, but ignore it when an event is emitted.
   */
  namespace Event {

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
       * Remove the listener from JMap API. The listener is deleted and never called again after that.
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
         *      console.log(`Layer element id="${params.layer.id}" visible="${params.layer.visible}"`)
         *    }
         * )
         * ```
         */
        function visibilityChange(listenerId: string, fn: (params: JLayerEventParams) => void): void

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
         *      console.log(`Layer id="${params.layer.id}" has been deleted client side`)
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
       * Remove the listener from JMap API. The listener is deleted and never called again after that.
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
         * This event is triggered when the map start moving (when user or API pan the map).
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
         * This event is triggered when the map is moving (when user or API pan the map).
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
         * This event is triggered when the map end moving (when user or API pan the map).
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
         * This event is triggered when the mouse is moving over the map (when user or API pan the map).
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
         * This event is triggered when the mouse is moving over the map (when user or API pan the map).
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
       * JMap.Event.Layer.activate("my-map-listener")
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
       * Remove the listener from JMap API. The listener is deleted and never called again after that.
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
       * Remove the listener from JMap API. The listener is deleted and never called again after that.
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
   * **JMap.External**
   * 
   * We introduced the notion of "external" in JMap.
   * 
   * We designed a mecanism for our needs, that could loads optional plugins for JMap.
   * 
   * This mecanism provide a clean way to integrate in JMap your own external plugin.
   * 
   * You can create an object that implement the interface [[JExternalModel]], and register it
   * from this section.
   * 
   * By example you register an external extension with id="***MyCompany***"".
   * 
   * You can defined your own Redux reducer that will react to all actions trigerred. In the store
   * your data will be located at ***external.MyCompany***.
   * 
   * You can defined your own JMap related services, that will be accessible at
   * this location : ***JMap.External.MyCompany***
   * 
   * And you also can integrate your own mouseover (for more details look in JMap.Service.MouseOver
   * documentation).
   */
  namespace External {

    /**
     * ***JMap.External.register***
     * 
     * Register your own external extension.
     * 
     * @throws Error if a parameter is not correct
     * @param extensionModel The extension model
     * @example ```ts
     * 
     * JMap.External.register({
     *  id: "MyExternalModule", // Unique id
     *  initFn: () => {
     *    // here you can start your UI component if needed
     *    console.log("JMap is started and my external extension has been successfuly started")
     *  }
     * })
     * ```
     */
    function register(extensionModel: JExternalModel): void

    /**
     * ***JMap.External.isRegistered***
     * 
     * Tell if an external extension has been registered or not.
     * 
     * It can be usefull to know if a JMap extension is in use or not.
     * 
     * @throws Error if extensionId format is not correct
     * @param extensionId The extension id
     * @example ```ts
     * 
     * // returns true if the JMap Document extension is in use or not for the project
     * JMap.External.isRegistered("Document")
     * ```
     */
    function isRegistered(extensionId: string): boolean

    /**
     * ***JMap.External.getAllRegistered***
     * 
     * Returns all registered extension ids.
     * 
     * @example ```ts
     * 
     * // Could returns [ "Document", "MyCustomExtension" ]
     * JMap.External.getAllRegistered()
     * ```
     */
    function getAllRegistered(): string[]

    /**
     * ***JMap.External.getAllRegistered***
     * 
     * *You should not need to use this function. It is usefull for the API itself.*
     * 
     * Returns all external mouseovers for a specific layer feature.
     * 
     * Each result elements are the result of calling method [[JExternalModel.renderMouseOver]]
     * 
     * You can have a look at ***[[JMap.Service.MouseOver]]***.
     * 
     * @param layer The JMap layer
     * @param feature A geoJSON feature
     * @returns an empty array if no external registered
     * @example ```ts
     * 
     * // Could returns [ "Document", "MyCustomExtension" ]
     * JMap.External.getAllRegistered()
     * ```
     */
    function renderMouseOver(layer: JLayer, feature: any): JExternalMouseOver[]
  }
}
