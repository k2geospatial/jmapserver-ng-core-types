/**
 * The API entry point, in the javascript console, is ***JMap***.
 * 
 * All references to JMAP Web API will start by ***JMap***.
 * 
 * For example :
 * ```ts
 * // return the API build version.
 * JMap.Api.getVersion()
 * ```
 * 
 * The API is organized in modules, some of them can have sub-modules :
 *   - [[JMap.Api]] : Get API information (version, documentation)
 *   - [[JMap.Data]] : Get API state data
 *   - [[JMap.Service]] : Manage and change the API state
 *   - [[JMap.Component]] : Create and destroy your JMap API Component instances
 *   - [[JMap.Application]] : Manage the JMap API application
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
     * Return the API build version.
     * 
     * @example ```ts
     * 
     * // return the build version, for example "1.0.1"
     * JMap.Api.getVersion()
     * ```
     */
    function getVersion(): string

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
  }
  
  /**
   * **JMap.Service**
   * 
   * This is where you can interact with the API.
   * If you want to get data, most of the time you will find your function in JMap.Data but not here.
   * But if you want to set or apply things, it's there that you gonna do.
   */
  namespace Service {
    
    /**
     * **JMap.Service.Api**
     * 
     * JMap API related methods.
     */
    namespace Api {
      
      /**
       * **JMap.Service.Api.setMode**
       * 
       * Change the API mode. Mainly used when the application is launched.
       * 
       * @param mode JMap.Service.Api.setMode()
       * @example ```ts
       * 
       * // set the API mode to "layer"
       * JMap.Service.Api.setMode("layer")
       * ```
       */
      function setMode(mode: API_MODE): void
    }
    
    /**
     * **JMap.Service.Language**
     * 
     * Language translation related methods.
     */
    namespace Language {
      
      /**
       * **JMap.Service.Language.getLocale**
       * 
       * Get the API current locale in use.
       * 
       * @example ```ts
       * 
       * // return "EN", or "FR", or "ES", or "PT"
       * JMap.Service.Language.getLocale()
       * ```
       */
      function getLocale(): string
      
      /**
       * **JMap.Service.Language.translate**
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
     * **JMap.Service.Layer**
     * 
     * Layer related methods.
     */
    namespace Layer {
      
      /**
       * **JMap.Service.Layer.getLayerAttributes**
       * 
       * Return all attribute descriptors for a particuler layer
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
       * **JMap.Service.Layer.getLayerTree**
       * 
       * Return project's layer tree.
       * 
       * The layer tree is an array of layer element.
       * 
       * A layer element is a node or a leaf.
       * 
       * A node contains leaves and/or other nodes, and has a negative id.
       * 
       * A leaf is a JMap layer and has a positive id.
       * 
       * If no project is loaded, return en empty array.
       * 
       * @example ```ts
       * 
       * // return the entire layer element tree of the project
       * JMap.Service.Layer.getLayerTree()
       * ```
       */
      function getLayerTree(): JLayerTree

      /**
       * **JMap.Service.Layer.getRenderedLayerIds**
       * 
       * Return the ids of the layers that are displayed on the map.
       * 
       * Some map implementation ([[MAP_IMPLEMENTATION]]) doesn't support all layer types.
       * 
       * This function return all layers ids that are managed by the map.
       * 
       * @example ```ts
       * 
       * // return all layer ids that are managed by the map
       * JMap.Service.Layer.getRenderedLayerIds()
       * ```
       */
      function getRenderedLayerIds(): number[]
      
      /**
       * **JMap.Service.Layer.exists**
       * 
       * Return true if a layer having the id exists.
       * 
       * @param layerId The JMap layer id
       * @example ```ts
       * 
       * // return true if layer id=3 exists
       * JMap.Service.Layer.exists(3)
       * ```
       */
      function exists(layerId: number): boolean

      /**
       * **JMap.Service.Layer.getById**
       * 
       * Return the JMap layer having the id.
       * 
       * @throws Error if no layer found for the id
       * @param layerId The JMap layer id
       * @example ```ts
       * 
       * // return the JMap layer id=3
       * JMap.Service.Layer.getById(3)
       * ```
       */
      function getById(layerId: number): JLayerElement

      /**
       * **JMap.Service.Layer.getName**
       * 
       * Return the name of the layer.
       * 
       * @throws Error if no layer found for the id
       * @param layerId The JMap layer id
       * @example ```ts
       * 
       * // return the name of layer id=3
       * JMap.Service.Layer.getName(3)
       * ```
       */
      function getName(layerId: number): string

      /**
       * **JMap.Service.Layer.getDescription**
       * 
       * Return the descrition of the layer.
       * 
       * @throws Error if no layer found for the id
       * @param layerId The JMap layer id
       * @example ```ts
       * 
       * // return the description of layer id=3
       * JMap.Service.Layer.getDescription(3)
       * ```
       */
      function getDescription(layerId: number): string

      /**
       * **JMap.Service.Layer.isVisible**
       * 
       * Return true if the layer is visible.
       * 
       * This is the "user" visibility, different from the "map" visibility
       * which is based on the min and max scale. 
       * 
       * @throws Error if no layer found for the id
       * @param layerId The JMap layer id
       * @example ```ts
       * 
       * // return false if layer id=3 is not set as visible
       * JMap.Service.Layer.isVisible(3)
       * ```
       */
      function isVisible(layerId: number): boolean

      /**
       * **JMap.Service.Layer.setVisible**
       * 
       * Set the layer visibility.
       * 
       * If the layer is a node, it will apply the visibility to all its children
       * and itself.
       * 
       * If it's a JMap layer, it apply the visibility to it.
       * 
       * This is the "user" visibility, different from the "map" visibility
       * which is based on the min and max scale. 
       * 
       * @throws Error if no layer found for the id
       * @param layerId The JMap layer id
       * @param visible The layer visibility
       * @example ```ts
       * 
       * // show layer id=5
       * JMap.Service.Layer.setVisible(5, true)
       * 
       * // hide layer id=3
       * JMap.Service.Layer.setVisible(3, false)
       * ```
       */
      function setVisible(layerId: number, visible: boolean): void

      /**
       * **JMap.Service.Layer.setGroupOpen**
       * 
       * Set the tree node open or closed.
       * 
       * @throws Error if tree node is not found
       * @param nodeId The JMap layer id
       * @param open if true will display, if false will hide the node
       * @example ```ts
       * 
       * // Open the node 4
       * JMap.Service.Layer.setGroupOpen(4, false)
       * ```
       */
      function setGroupOpen(nodeId: number, open: boolean): void
      
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
       * Show or hide a layer's thematic on the map
       * 
       * @throws Error if layer or thematic are not found
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
     * **JMap.Service.Map**
     * 
     * This section contains map related methods.
     * 
     * JMap support 2 type of map implementations : "MapBox" or "OpenLayers".
     * 
     * Sometimes the result of the methods depends on this [[MAP_IMPLEMENTATION]].
     */
    namespace Map {
      
      /**
       * **JMap.Service.Map.getMap**
       * 
       * Return the map implementation instance, a MapBox or OpenLayer map.
       * 
       * @example ```ts
       * 
       * // return the implementation map instance
       * JMap.Service.Map.getMap()
       * ```
       */
      function getMap(): any
      
      /**
       * **JMap.Service.Map.getMapJSLib**
       * 
       * Return the map implementation JS library : MapBox or OpenLayer.
       * 
       * Usefull to be able to create library's object, by example a Mapbox popup.
       * 
       * @example ```ts
       * 
       * // Create a MapBox popup, require the map implementation to be MapBox
       * const myCustomPopup = JMap.Service.Map.getMapJSLib().Popup({
       *   closeButton: false,
       *   closeOnClick: false
       * })
       * ```
       */
      function getMapJSLib(): any
      
      /**
       * **JMap.Service.Map.getLayersVisibilityStatus**
       * 
       * Return layers visibility status.
       * 
       * The result is a map (= javascript object) where :
       *  - the key is the JMap layer id
       *  - the value is an object containing all visibility status for a layer
       * 
       * The visibility status are the following :
       *  - isVisible: true if the user can see the layer on the map
       *  - userVisibility: user can show or hide a layer
       *  - mapVisibility: depending on the map scale or zoom level a layer can be hidden
       * 
       * @example ```ts
       * 
       * // return the visibility status
       * JMap.Service.Map.getLayersVisibilityStatus()
       * 
       * // Example of result :
       * [
       *  1: { isVisible: true, userVisibility: true, mapVisibility: true }
       *  2: { isVisible: false, userVisibility: true, mapVisibility: false }
       *  3: { isVisible: false, userVisibility: false, mapVisibility: false }
       *  4: { isVisible: false, userVisibility: false, mapVisibility: false }
       * ]
       * ```
       */
      function getLayersVisibilityStatus(): JMapLayersVisibilityStatus
      
      /**
       * **JMap.Service.Map.getInUseJMapLayerIds**
       * 
       * Return all layer ids that are displayed by the map.
       * 
       * Some map implementation ([[MAP_IMPLEMENTATION]]) doesn't support all layer types.
       * 
       * This function return all layers ids that are managed by the map.
       * 
       * @example ```ts
       * 
       * // return layer ids managed by the map implementation
       * JMap.Service.Map.getInUseJMapLayerIds()
       * ```
       */
      function getInUseJMapLayerIds(): number[]
      
      /**
       * **JMap.Service.Map.getInUseJMapVectorLayerIds**
       * 
       * Return all vector layer ids that are displayed by the map.
       * 
       * Some map implementation ([[MAP_IMPLEMENTATION]]) doesn't support all layer types.
       * 
       * This function return all vector layers ids that are managed by the map.
       * 
       * @example ```ts
       * 
       * // return vector layer ids managed by the map implementation
       * JMap.Service.Map.getInUseJMapVectorLayerIds()
       * ```
       */
      function getInUseJMapVectorLayerIds(): number[]
      
      /**
       * **JMap.Service.Map.getInUseJMapLayerBefore**
       * 
       * Return the layer id that is ordered before the layer id provided in argument.
       * 
       * @throws Error if layer is not found
       * @param layerId The JMap layer id
       * @returns the JMap layer id, or undefined if no layer before
       * @example ```ts
       * 
       * // Return the layer's id that is located before layer id=4
       * JMap.Service.Map.getInUseJMapLayerBefore(4)
       * ```
       */
      function getInUseJMapLayerBefore(layerId: number): number | undefined
      
      /**
       * **JMap.Service.Map.getInUseJMapLayerAfter**
       * 
       * Return the layer id that is ordered after the layer id provided in argument.
       * 
       * @throws Error if layer is not found
       * @param layerId The JMap layer id
       * @returns the JMap layer id, or undefined if no layer after
       * @example ```ts
       * 
       * // Return the layer's id that is located after layer id=3
       * JMap.Service.Map.getInUseJMapLayerAfter(3)
       * ```
       */
      function getInUseJMapLayerAfter(layerId: number): number | undefined
      
      /**
       * **JMap.Service.Map.getRenderedFeatures**
       * 
       * Return rendered geojson features for the layer.
       * 
       * @throws Error if layer is not found
       * @throws Error if no or incorrect filter is passed
       * @param layerId The JMap layer id
       * @param filter You can pass a location or a boundary box to get only the features that intersect it
       * @return A features array
       * @example ```ts
       * 
       * // Return all rendered geojson features for layer 4
       * JMap.Service.Map.getRenderedFeatures(4)
       * 
       * // Return all rendered geojson features for layer 4 at location x=45.54 and y=65.43
       * JMap.Service.Map.getRenderedFeatures(4, { x: 45.54, y: 65.43 })
       * 
       * // Return all rendered geojson features for layer 4 that intersect the boundary box
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
       * Return rendered features attributes for the layer.
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
       * // Will return all features attributes for layer 4
       * JMap.Service.Map.getRenderedFeaturesAttributeValues(4)
       * 
       * // Will return all features attributes for layer 4, that intersect the location
       * JMap.Service.Map.getRenderedFeaturesAttributeValues(4, { x: 45.54, y: 65.43 })
       * 
       * // Will return all features attributes for layer 4, that intersect the boundary box
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
       * Return the available basemap names that can be used with method setBaseMap.
       * 
       * Depends on the map implementation ([[MAP_IMPLEMENTATION]]).
       * 
       * For mapbox : [ "light", "streets", "satellite", "dark", "outdoors", "none" ]
       * 
       * For openlayers : Not yet implemented
       * 
       * @returns an array of string, the available basemap names for map implementation
       * @example ```ts
       * 
       * // return an array of string comtaining names of available basemaps
       * JMap.Service.Map.getAvailableBaseMaps()
       * ```
       */
      function getAvailableBaseMaps(): string[]
      
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
       * **JMap.Service.Map.panTo**
       * 
       * Move and center the map to the location (animated)
       * 
       * @throws Error if no or incorrect center is passed
       * @param center The location where the map will be centered
       * @example ```ts
       * 
       * // Move the map to the desired location
       * JMap.Service.Map.panTo({ x: 45.34, y: 65.87 })
       * ```
       */
      function panTo(center: JLocation): void
      
      /**
       * **JMap.Service.Map.zoomTo**
       * 
       * Zoom or unzoom the map (animated)
       * 
       * @throws Error if no zoom is passed
       * @param zoom The zoom level to apply
       * @example ```ts
       * 
       * // Zoom or unzoom the map to reach the desired zoom level
       * JMap.Service.Map.zoomTo(4.45)
       * ```
       */
      function zoomTo(zoom: number): void
      
      /**
       * **JMap.Service.Map.panAndZoomTo**
       * 
       * Move and zoom (or unzoom) the map (animated)
       * 
       * @throws Error if bad parameters are passed
       * @param center The location where the map will be centered
       * @param zoom The zoom level to apply
       * @example ```ts
       * 
       * // Move and zoom the map
       * JMap.Service.Map.panAndZoomTo({ x: 45.34, y: 65.87 }, 5)
       * ```
       */
      function panAndZoomTo(center: JLocation, zoom: number): void
      
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
         * **JMap.Service.Map.Interaction.getAllInteractorDescriptors**
         * 
         * Return all existing interactor descriptors ([[JMapInteractorDescriptor]]).
         * 
         * @example ```ts
         * 
         * // return all existing interactor descriptors
         * JMap.Service.Map.Interaction.getAllInteractorDescriptors()
         * ```
         */
        function getAllInteractorDescriptors(): JMapInteractorDescriptor[]
        
        /**
         * **JMap.Service.Map.Interaction.getActiveInteractorDescriptor**
         * 
         * Return the active interactor descriptor ([[JMapInteractorDescriptor]]).
         * 
         * @example ```ts
         * 
         * // Return the active interactor descriptor
         * JMap.Service.Map.Interaction.getActiveInteractorDescriptor()
         * ```
         */
        function getActiveInteractorDescriptor(): JMapInteractorDescriptor
        
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
         * **JMap.Service.Map.Selection.selectOnAllLayersAtLocation**
         * 
         * Select for all layers the features that are at the location.
         * 
         * Same behavior as if you were clicking on the map in order to select features.
         * 
         * @throws Error if location format is not good
         * @param location The location where you want feature selection
         * @returns The new feature selection
         * @example ```ts
         * 
         * // Process a selection on the map for all layers, at the location in params
         * JMap.Service.Map.Selection.selectOnAllLayersAtLocation({ x: 34.23, y: 55.5 })
         * ```
         */
        function selectOnAllLayersAtLocation(location: JLocation): JMapSelection

        /**
         * **JMap.Service.Map.Selection.selectOnOneLayerAtLocation**
         * 
         * Select for particular layer its features that are at the location.
         * 
         * Same behavior as if you were clicking on the map in order to select features, but for only one layer.
         * 
         * @throws Error if layer is not found or location format is not good
         * @param layerId The JMap layer id
         * @param location The location where you want feature selection
         * @returns The features array
         * @example ```ts
         * 
         * // Process a selection on the map for layer id=4, at the location in params
         * JMap.Service.Map.Selection.selectOnOneLayerAtLocation(4, { x: 34.23, y: 55.5 })
         * ```
         */
        function selectOnOneLayerAtLocation(layerId: number, location: JLocation): any[]

        /**
         * **JMap.Service.Map.Selection.setLayerSelection**
         * 
         * Set the selection for a particular layer.
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
         * Add to the current layer's selection the provided feature(s).
         * 
         * Don't cancel previous selection, but add features to it.
         * 
         * @throws Error if layer is not found or features format is not good
         * @param layerId The JMap layer id
         * @param features The feature(s) that will be selected on the map
         * @example ```ts
         * 
         * // Add one feature (id = 234) to layer's 4 selection
         * JMap.Service.Map.Selection.addFeaturesToLayerSelection(4, {
         *  id: 234,
         *  type: "Point",
         *  geometry: {...},
         *  properties: [...]
         * })
         * 
         * // Add 2 features (id = 234 and 567) to layer's 4 selection
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
         * Remove from current layer's selection the provided feature(s).
         * 
         * Don't cancel previous selection, just remove feature(s) from it.
         * 
         * @throws Error if layer is not found or feature id(s) format is not good
         * @param layerId The JMap layer id
         * @param featureIds The feature id(s) that will be remove from the layer's selection
         * @example ```ts
         * 
         * // Remove one feature (id = 234) from layer's 4 selection
         * JMap.Service.Map.Selection.removeFeaturesFromLayerSelection(4, 234)
         * 
         * // Remove 2 features (id = 234 and 567) from layer's 4 selection
         * JMap.Service.Map.Selection.removeFeaturesFromLayerSelection(4, [ 234, 567 ])
         * ```
         */
        function removeFeaturesFromLayerSelection(layerId: number, featureIds: number | number[]): void

        /**
         * **JMap.Service.Map.Selection.removeFeaturesFromLayerSelection**
         * 
         * Clear all selection.
         * 
         * If a layer id is provided, clear only the layer's selection, else clear selection of all layers.
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
      function renderForFeaturesAtLocation(containerId: string, location: JLocation): boolean // return true if has mouseover

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
       * Return the mousever content for the provided feature selection. If no mouseover are defined
       * for any layer it return undefined.
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
       * **JMap.Service.User.login**
       * 
       * The login function, return a promise. Make a call to the server and if
       * login is successful resolve the promise providing the user session data.
       * 
       * @throws Error if bad credentials or server error.
       * @param session The user session data
       * @example ```ts
       * 
       * const userLogin = "jdo@mycompany.com"
       * const userPassword = "xxx"
       * 
       * // Open a new user session, and get back user's data from server
       * JMap.Service.User
       *    .login(userLogin, userPassword)
       *    .then(sessionData => {
       *      console.log(`User ${userLogin} has been authenticated, his session token is "${sessionData.token}"`)
       *    })
       *    .catch(error => {
       *      console.error(`Cannot loggin ${userLogin}`, error)
       *    })
       * ```
       */
      function login(login: string, password: string): Promise<JSessionData>

      /**
       * **JMap.Service.User.logout**
       * 
       * Logout function. Make a call to the server to invalidate the session id.
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
   * **JMap.Application**
   * 
   * Here are JMap application related method.
   * 
   * JMap API can be started with only the map in the div of your choice, and you can start some JMap component too.
   * 
   * But from this section you will be able to manage the full JMap Web Application.
   */
  namespace Application {

    /**
     * **JMap.Application.start**
     * 
     * Start the JMap application.
     * 
     * The container div need to exist in the DOM before calling this method.
     * 
     * @throws Error if app has already been started or if container not found in the DOM
     * @param containerId The id of the div in the DOM where app will be inserted.
     * @example ```ts
     * 
     * // Start the JMap application and mount it in div id="my-div"
     * JMap.Application.start("my-div")
     * ```
     */
    function start(containerId?: string): void

    /**
     * **JMap.Application.startIfNeeded**
     * 
     * You should not need to use this function.
     * 
     * This function is called by the API in order to check if the application need to start.
     * 
     * If yes it call the function *JMap.Application.start*.
     * 
     * @param containerId The id of the div in the DOM where app will be inserted.
     * @example ```ts
     * 
     * // Start the JMap application if it is set to true in the startup options
     * JMap.Application.startIfNeeded()
     * ```
     */
    function startIfNeeded(): void

    /**
     * **JMap.Application.SidePanel**
     * 
     * You can manage the application left panel from here.
     */
    namespace SidePanel {

      /**
       * **JMap.Application.Sidepanel.setVisible**
       * 
       * Set the application's left side panel visibility.
       * 
       * @param open if true show the panel, else hide it
       * @example ```ts
       * 
       * // Show the left side panel
       * JMap.Application.Sidepanel.setVisible(true)
       * 
       * // Hide the left side panel
       * JMap.Application.Sidepanel.setVisible(false)
       * ```
       */
      function setVisible(open: boolean): void

      /**
       * **JMap.Application.Sidepanel.open**
       * 
       * Display the left application panel if not visible.
       * 
       * Do nothing if it's already visible.
       * 
       * @example ```ts
       * 
       * // Open the application left side panel
       * JMap.Application.Sidepanel.open()
       * ```
       */
      function open(): void

      /**
       * **JMap.Application.Sidepanel.open**
       * 
       * Hide the left application panel if visible.
       * 
       * Do nothing if it's already not visible.
       * 
       * @example ```ts
       * 
       * // Close the application left side panel
       * JMap.Application.Sidepanel.close()
       * ```
       */
      function close(): void
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
   * **JMap.Data**
   * 
   * From this section you can get all the data you need about the different data states of the API.
   * 
   * There is not data modifications from this section, you can just get data.
   * 
   * If you want to change the data state, have a look in [[JMap.Service]].
   */
  namespace Data {

    /**
     * **JMap.Component.User.destroy**
     * 
     * Return the JMap data store, currently an instance of Redux (https://redux.js.org/).
     *
     * @example ```ts
     * 
     * // return the Web API redux store
     * const reduxStore = JMap.Data.getStore()
     * reduxStore.dispatch(...)
     * ```
     */
    function getStore(): any | undefined

    /**
     * ***JMap.Data.Api***
     * 
     * This section contains all JMAp Api getter methods
     */
    namespace Api {

      /**
       * **JMap.Data.Api.getRestUrl**
       * 
       * Return in use JMap API server rest API.
       *
       * This is the url on which the JMap API will make all of its ajax call.
       * 
       * @example ```ts
       * 
       * // return the JMap server rest URL in use
       * JMap.Data.Api.getRestUrl()
       * ```
       */
      function getRestUrl(): string

      /**
       * **JMap.Data.Api.getMode**
       * 
       * Return the current JMap API mode state.
       *
       * This mode is mainly use for the JMap application.
       * 
       * @example ```ts
       * 
       * // return the currently activated API mode
       * JMap.Data.Api.getMode()
       * ```
       */
      function getMode(): API_MODE

      /**
       * **JMap.Data.Api.getAllMode**
       * 
       * Return all available JMap API modes (see [[API_MODE]]).
       * 
       * @example ```ts
       * 
       * // return all available API modes
       * JMap.Data.Api.getAllMode()
       * ```
       */
      function getAllMode(): API_MODE[]

      /**
       * **JMap.Data.Api.getMapImplementation**
       * 
       * Return the map implementation : "MapBox" or "OpenLayers".
       * 
       * @example ```ts
       * 
       * // return "MapBox" or "OpenLayers"
       * JMap.Data.Api.getMapImplementation()
       * ```
       */
      function getMapImplementation(): MAP_IMPLEMENTATION
    }

    /**
     * ***JMap.Data.Application***
     * 
     * This section contains all JMap application getter methods
     */
    namespace Application {

      /**
       * **JMap.Data.Application.isSidePanelOpen**
       * 
       * Return true if the JMAP application main panel on the left is opened.
       * 
       * @example ```ts
       * 
       * // return true if side panel is opened
       * JMap.Data.Application.isSidePanelOpen()
       * ```
       */
      function isSidePanelOpen(): boolean

      /**
       * **JMap.Data.Application.getDomContainerId**
       * 
       * Return the DOM div element id where application UI has been inserted.
       * 
       * @example ```ts
       * 
       * // return the application DOM container id
       * JMap.Data.Application.getDomContainerId()
       * ```
       */
      function getDomContainerId(): string
    }

    /**
     * ***JMap.Data.Project***
     * 
     * This section contains all JMap project getter methods
     */
    namespace Project {

      /**
       * **JMap.Data.Project.getId**
       * 
       * Return current JMap project's id.
       * 
       * If no project is loaded, return -1.
       * 
       * @example ```ts
       * 
       * // return the currently loaded project's id
       * JMap.Data.Project.getId()
       * ```
       */
      function getId(): number

      /**
       * **JMap.Data.Project.getName**
       * 
       * Return current JMap project's name.
       * 
       * If no project is loaded, return "".
       * 
       * @example ```ts
       * 
       * // return the currently loaded project's name
       * JMap.Data.Project.getName()
       * ```
       */
      function getName(): string

      /**
       * **JMap.Data.Project.getDescription**
       * 
       * Return current JMap project's description.
       * 
       * If no project is loaded, return "".
       * 
       * @example ```ts
       * 
       * // return the currently loaded project's description
       * JMap.Data.Project.getDescription()
       * ```
       */
      function getDescription(): string

      /**
       * **JMap.Data.Project.getProjection**
       * 
       * Return current JMap project's projection.
       * 
       * If no project is loaded, return an empty projection : { code: "", name: "" }.
       * 
       * In MapBox projection is always "***EPSG:3857***", but that function returns the project
       * defined projection (so it can be different of ***ESPG:3857***).
       * 
       * @example ```ts
       * 
       * // return the project's projection
       * JMap.Data.Project.getProjection()
       * ```
       */
      function getProjection(): JProjection

      /**
       * **JMap.Data.Project.getInitialRotation**
       * 
       * Return current JMap project's initial map rotation.
       * 
       * If no project is loaded, return 0.
       * 
       * @example ```ts
       * 
       * // return the project's initial rotation
       * JMap.Data.Project.getInitialRotation()
       * ```
       */
      function getInitialRotation(): number

      /**
       * **JMap.Data.Project.getScaleMax**
       * 
       * Return current JMap project's max scale.
       * 
       * If no project is loaded, return 0.
       * 
       * @example ```ts
       * 
       * // return the project's max scale
       * JMap.Data.Project.getScaleMax()
       * ```
       */
      function getScaleMax(): number

      /**
       * **JMap.Data.Project.getScaleMin**
       * 
       * Return current JMap project's min scale.
       * 
       * If no project is loaded, return 0.
       * 
       * @example ```ts
       * 
       * // return the project's min scale
       * JMap.Data.Project.getScaleMin()
       * ```
       */
      function getScaleMin(): number

      /**
       * **JMap.Data.Project.getColorSelection**
       * 
       * Return current JMap project's selection color in html hexa format.
       * 
       * This is the color that is applied to all layers that has not a selection color defined.
       * 
       * If no project is loaded, return "#ffffff".
       * 
       * @example ```ts
       * 
       * // return the project's selection color as a html hexa color
       * JMap.Data.Project.getColorSelection()
       * ```
       */
      function getColorSelection(): string

      /**
       * **JMap.Data.Project.getColorBackground**
       * 
       * Return current JMap project's background color in html hexa format.
       * 
       * If no project is loaded, return "bisque".
       * 
       * @example ```ts
       * 
       * // return the project's background color as a html hexa color
       * JMap.Data.Project.getColorBackground()
       * ```
       */
      function getColorBackground(): string

      /**
       * **JMap.Data.Project.getInitialExtent**
       * 
       * Return current JMap project's initial extent.
       * 
       * If no project is loaded, return null.
       * 
       * @example ```ts
       * 
       * // return the project's initial extent if exists
       * JMap.Data.Project.getInitialExtent()
       * ```
       */
      function getInitialExtent(): JBounds | null
    }

    /**
     * ***JMap.Data.Layer***
     * 
     * This section contains all JMap layer getter methods
     */
    namespace Layer {

      /**
       * **JMap.Data.Layer.getLayerTree**
       * 
       * Return project's layer tree.
       * 
       * The layer tree is an array of layer element.
       * 
       * A layer element is a node or a leaf.
       * 
       * A node contains leaves and/or other nodes, and has a negative id.
       * 
       * A leaf is a JMap layer and has a positive id.
       * 
       * If no project is loaded, return en empty array.
       * 
       * @example ```ts
       * 
       * // return the entire layer element tree of the project
       * JMap.Data.Layer.getLayerTree()
       * ```
       */
      function getLayerTree(): JLayerTree

      /**
       * **JMap.Data.Layer.getLayerTreeElementsById**
       * 
       * Return a map (= a javascript object) where :
       *  - the key is the layer element id
       *  - the value the layer element
       * 
       * A layer element is a node or a leaf.
       * 
       * A node contains leaves and/or other nodes, and has a negative id.
       * 
       * A leaf is a JMap layer and has a positive id.
       * 
       * If no project is loaded, return en empty object.
       * 
       * @example ```ts
       * 
       * // return a map of layer elements defined by layer id
       * JMap.Data.Layer.getLayerTreeElementsById()
       * ```
       */
      function getLayerTreeElementsById(): { [ layerElementId: number ]: JLayerElement }

      /**
       * **JMap.Data.Layer.getRenderedLayers**
       * 
       * Return only JMap layers, not the nodes.
       * 
       * The layer tree is composed of nodes and leaves.
       * 
       * A node contains leaves and/or other nodes, and has a negative id.
       * 
       * A leaf is a JMap layer and has a positive id.
       * 
       * So this function remove all nodes and return only the leaves.
       * 
       * If no project is loaded, return en empty array.
       * 
       * @example ```ts
       * 
       * // return only the JMap layers (the one that are rendered on the map, so not the nodes)
       * JMap.Data.Layer.getRenderedLayers()
       * ```
       */
      function getRenderedLayers(): JLayer[]

      /**
       * **JMap.Data.Layer.exists**
       * 
       * Return true if a layer having the id exists.
       * 
       * @param layerId The JMap layer id
       * @example ```ts
       * 
       * // return true if layer id=3 exists
       * JMap.Data.Layer.exists(3)
       * ```
       */
      function exists(layerId: number): boolean

      /**
       * **JMap.Data.Layer.getById**
       * 
       * Return the JMap layer having the id.
       * 
       * @throws Error if no layer found for the id
       * @param layerId The JMap layer id
       * @example ```ts
       * 
       * // return the JMap layer id=3
       * JMap.Data.Layer.getById(3)
       * ```
       */
      function getById(layerId: number): JLayerElement

      /**
       * **JMap.Data.Layer.getSelfOrChildren**
       * 
       * If the layerId is a JMap layer return it.
       * If the layerId is a node, return all node's JMap layers (remove all nodes).
       * Return an empty array if it's an empty node
       * 
       * @throws Error if no layer found for the id
       * @param layerId The JMap layer id
       * @example ```ts
       * 
       * // return an array with only JMap layers (no node)
       * JMap.Data.Layer.getSelfOrChildren(3)
       * ```
       */
      function getSelfOrChildren(layerId: number): JLayer[]

      /**
       * **JMap.Data.Layer.getName**
       * 
       * Return the name of the layer.
       * 
       * @throws Error if no layer found for the id
       * @param layerId The JMap layer id
       * @example ```ts
       * 
       * // return the name of layer id=3
       * JMap.Data.Layer.getName(3)
       * ```
       */
      function getName(layerId: number): string

      /**
       * **JMap.Data.Layer.getDescription**
       * 
       * Return the descrition of the layer.
       * 
       * @throws Error if no layer found for the id
       * @param layerId The JMap layer id
       * @example ```ts
       * 
       * // return the description of layer id=3
       * JMap.Data.Layer.getDescription(3)
       * ```
       */
      function getDescription(layerId: number): string

      /**
       * **JMap.Data.Layer.isVisible**
       * 
       * Return true if the layer is visible.
       * 
       * This is the "user" visibility, different from the "map" visibility
       * which is based on the min and max scale. 
       * 
       * @throws Error if no layer found for the id
       * @param layerId The JMap layer id
       * @example ```ts
       * 
       * // return false if layer id=3 is not set as visible
       * JMap.Data.Layer.isVisible(3)
       * ```
       */
      function isVisible(layerId: number): boolean

      /**
       * **JMap.Data.Layer.getStyle**
       * 
       * Return the base style of the layer.
       * 
       * @throws Error if no layer found for the id, or if the layer is a node.
       * @param layerId The JMap layer id
       * @example ```ts
       * 
       * // return layer id=3 base style
       * JMap.Data.Layer.getStyle(3)
       * ```
       */
      function getStyle(layerId: number): JLayerStyle

      /**
       * **JMap.Data.Layer.getSimpleSelectionStyle**
       * 
       * Return the selection "simple" style of the layer.
       * 
       * It return always an object, and if no selection has been set on the layer,
       * it return the project values.
       * 
       * @throws Error if no layer found for the id, or if the layer is a node.
       * @param layerId The JMap layer id
       * @example ```ts
       * 
       * // return the simple selection style of layer id=3
       * JMap.Data.Layer.getSimpleSelectionStyle(3)
       * ```
       */
      function getSimpleSelectionStyle(layerId: number): JLayerSimpleStyle

      /**
       * **JMap.Data.Layer.getSelectionStyle**
       * 
       * Return the layer's selection style if defined, else return null.
       * 
       * @throws Error if no layer found for the id, or if the layer is a node.
       * @param layerId The JMap layer id
       * @example ```ts
       * 
       * // return the simple selection style of layer id=3
       * JMap.Data.Layer.getSelectionStyle(3)
       * ```
       */
      function getSelectionStyle(layerId: number): JLayerStyle | null

      /**
       * ***JMap.Data.Layer.getAllThematicsForLayer***
       * 
       * Return all layer's thematics.
       * 
       * @throws Error if no layer found for the id, or if the layer is a node.
       * @param layerId The JMap layer id
       * @example ```ts
       * 
       * // return all thematics of layer id=4
       * JMap.Data.Layer.getAllThematicsForLayer(4)
       * ```
       */
      function getAllThematicsForLayer(layerId: number): JLayerThematic[]

      /**
       * ***JMap.Data.Layer.getThematicById***
       * 
       * Return a particular layer's thematic.
       * 
       * @throws Error if no layer found for the id, or if the layer is a node, or if the thematic doesn't exist.
       * @param layerId The JMap layer id
       * @param thematicId The thematic id
       * @example ```ts
       * 
       * // return thematic id=3 of layer id=4
       * JMap.Data.Layer.getThematicById(4, 3)
       * ```
       */
      function getThematicById(layerId: number, thematicId: number): JLayerThematic

      /**
       * ***JMap.Data.Layer.hasVisibleThematics***
       * 
       * Return true if the layer has at least one thematic displayed on the map.
       * 
       * @throws Error if no layer found for the id, or if the layer is a node.
       * @param layerId The JMap layer id
       * @example ```ts
       * 
       * // return false if no thematic are displayed for layer id=4
       * JMap.Data.Layer.hasVisibleThematics(4)
       * ```
       */
      function hasVisibleThematics(layerId: number): boolean

      /**
       * ***JMap.Data.Layer.getVisibleThematics***
       * 
       * Return layer's thematics that are currently displayed on the map.
       * 
       * @throws Error if no layer found for the id, or if the layer is a node.
       * @param layerId The JMap layer id
       * @example ```ts
       * 
       * // return false if no thematic are displayed for layer id=4
       * JMap.Data.Layer.getVisibleThematics(4)
       * ```
       */
      function getVisibleThematics(layerId: number): JLayerThematic[]
    }

    /**
     * ***JMap.Data.Map***
     * 
     * This section contains all JMap map getter methods
     */
    namespace Map {

      /**
       * ***JMap.Data.Map.getDomContainerId***
       * 
       * Return the map div container id, where the map is created.
       * 
       * @example ```ts
       * 
       * // return the map div container id
       * JMap.Data.Map.getDomContainerId()
       * ```
       */
      function getDomContainerId(): string

      /**
       * ***JMap.Data.Map.getImplementation***
       * 
       * Return the map implementation ("MapBox" or "OpenLayers")
       * 
       * @example ```ts
       * 
       * // return "MapBox" or "OpenLayers"
       * JMap.Data.Map.getImplementation()
       * ```
       */
      function getImplementation(): MAP_IMPLEMENTATION

      /**
       * ***JMap.Data.Map.isMapLoaded***
       * 
       * Return true if the map has been loaded and is ready.
       * 
       * @example ```ts
       * 
       * // return true or false
       * JMap.Data.Map.isMapLoaded()
       * ```
       */
      function isMapLoaded(): boolean

      /**
       * ***JMap.Data.Map.getCenter***
       * 
       * Return the location that is the current center of the map.
       * 
       * @example ```ts
       * 
       * // return the current center of the map
       * JMap.Data.Map.getCenter()
       * ```
       */
      function getCenter(): JLocation

      /**
       * ***JMap.Data.Map.getZoom***
       * 
       * Return the current map's zoom.
       * 
       * @example ```ts
       * 
       * // return the current map's zoom
       * JMap.Data.Map.getZoom()
       * ```
       */
      function getZoom(): number

      /**
       * ***JMap.Data.Map.getScale***
       * 
       * Return the current map's scale.
       * 
       * @example ```ts
       * 
       * // return the current map's scale
       * JMap.Data.Map.getScale()
       * ```
       */
      function getScale(): number

      /**
       * ***JMap.Data.Map.getScale***
       * 
       * Return the current map's basemap.
       * 
       * The basemap depends on the map implementation ([[MAP_IMPLEMENTATION]]).
       * 
       * For mapbox : [ "light", "streets", "satellite", "dark", "outdoors", "none" ]
       * 
       * For openlayers : Not yet implemented
       * 
       * @example ```ts
       * 
       * // return the current map's basemap
       * JMap.Data.Map.getBaseMap()
       * ```
       */
      function getBaseMap(): string

      /**
       * ***JMap.Data.Map.getSelectedFeatures***
       * 
       * Return the current map's selection as a javascript map (= a javascript object) where :
       *  - the key is the layer element id
       *  - the value is an array of feature (an empty array if layer doesn't have features selected)
       * 
       * @example ```ts
       * 
       * // return the current selected features by layer id
       * JMap.Data.Map.getSelectedFeatures()
       * ```
       */
      function getSelectedFeatures(): JMapSelection

      /**
       * ***JMap.Data.Map.getSelectedFeaturesForLayer***
       * 
       * Return the current selected features for a particular JMap layer.
       * 
       * @returns an array of GeoJSON features
       * @example ```ts
       * 
       * // return the current selected features for layer 3
       * JMap.Data.Map.getSelectedFeaturesForLayer(3)
       * ```
       */
      function getSelectedFeaturesForLayer(layerId: number): any[]

      /**
       * ***JMap.Data.Map.getSelectedFeatureIdsForLayer***
       * 
       * Return the current selected feature ids for a particular JMap layer.
       * 
       * This function is the equivalent of that code :
       * ```ts
       * // return the same as JMap.Data.Map.getSelectedFeatureIdsForLayer(3)
       * JMap.Data
       *    .getSelectedFeaturesForLayer(layerId: number)
       *    .map(feature => feature.id)
       * ```
       * 
       * @example ```ts
       * 
       * // return the current selected feature ids for layer 3
       * JMap.Data.Map.getSelectedFeatureIdsForLayer(3)
       * ```
       */
      function getSelectedFeatureIdsForLayer(layerId: number): number[]
    }

    /**
     * ***JMap.Data.User***
     * 
     * This section contains all JMap user getter methods
     */
    namespace User {

      /**
       * ***JMap.Data.User.getToken***
       * 
       * If user is loggued, return the current user session token.
       * 
       * Else return "-1" if user has no active session.
       * 
       * @example ```ts
       * 
       * // return the user session token
       * JMap.Data.User.getToken()
       * ```
       */
      function getToken(): string

      /**
       * ***JMap.Data.User.getFirstName***
       * 
       * Return user first name.
       * 
       * @example ```ts
       * 
       * // return the user first name
       * JMap.Data.User.getFirstName()
       * ```
       */
      function getFirstName(): string

      /**
       * ***JMap.Data.User.getLastName***
       * 
       * Return user last name.
       * 
       * @example ```ts
       * 
       * // return the user last name
       * JMap.Data.User.getLastName()
       * ```
       */
      function getLastName(): string

      /**
       * ***JMap.Data.User.getLogin***
       * 
       * Return user login.
       * 
       * @example ```ts
       * 
       * // return the user login
       * JMap.Data.User.getLogin()
       * ```
       */
      function getLogin(): string
    }

    /**
     * ***JMap.Data.Application***
     * 
     * This section contains all JMap photo getter methods.
     */
    namespace Photo {

      /**
       * ***JMap.Data.Photo.isPopupOpened***
       * 
       * Return true if the photo popup is opened.
       * 
       * @example ```ts
       * 
       * // return true if the photo popup is displayed
       * JMap.Data.Photo.isPopupOpened()
       * ```
       */
      function isPopupOpened(): boolean

      /**
       * ***JMap.Data.Photo.isPopupInfoPanelOpened***
       * 
       * Return true if the info panel is opened inside the photo popup.
       * 
       * @example ```ts
       * 
       * // return true if the info panel is opened inside the photo popup
       * JMap.Data.Photo.isPopupInfoPanelOpened()
       * ```
       */
      function isPopupInfoPanelOpened(): boolean

      /**
       * ***JMap.Data.Photo.getPhotoDescriptors***
       * 
       * Return the displayed photo descriptors, an empty array if no photo displayed.
       * 
       * @example ```ts
       * 
       * // return the displayed photo descriptors, an empty array if no photo displayed
       * JMap.Data.Photo.getPhotoDescriptors()
       * ```
       */
      function getPhotoDescriptors(): JPhotoDescriptor[]

      /**
       * ***JMap.Data.Photo.getSelectedPhotoId***
       * 
       * Return the current selected/displayed photo ids.
       * 
       * Return undefined if no photo is selected.
       * 
       * This function is the equivalent of :
       * ```ts
       * JMap.Data.Photo
       *    .getPhotoDescriptors()
       *    .map(photoDescriptor => photoDescriptor.id)
       * ```
       * 
       * @example ```ts
       * 
       * // return the selected photo ids.
       * JMap.Data.Photo.getSelectedPhotoId()
       * ```
       */
      function getSelectedPhotoId(): number | undefined
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
         *    project => console.log(`New project id="${project.id}"`)
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
         * ***JMap.Event.Layer.on.projectChange***
         * 
         * This event is triggered when a layer visibility changed.
         * 
         * @param listenerId Your listener id (must be unique for all layer events)
         * @param fn Your listener function
         * @example ```ts
         * 
         * // Each time a layer element visibility is changed, will display the new visibility
         * // in the console
         * JMap.Event.Layer.on.visibilityChange(
         *    "custom-visibility-change",
         *    element => {
         *      console.log(`Layer element id="${element.id}" visible="${element.visible}"`)
         *    }
         * )
         * ```
         */
        function visibilityChange(listenerId: string, fn: (params: JLayerEventParams) => void): void

        /**
         * ***JMap.Event.Layer.on.layerDeletion***
         * 
         * This event is triggered when a layer is deleted.
         * 
         * @param listenerId Your listener id (must be unique for all layer events)
         * @param fn Your listener function
         * @example ```ts
         * 
         * // Each time a layer element is deleted, will display a message in the console
         * JMap.Event.Layer.on.layerDeletion(
         *    "custom-layer-deletion",
         *    layerElement => {
         *      console.log(`Layer element id="${layerElement.id}" has been deleted client side`)
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
         *      // implementation is "MapBox" or "OpenLayers"
         *      console.log(`Instance of map "${args.implementation}" ready`, args.map)
         *    }
         * )
         * ```
         */
        function mapLoad(listenerId: string, fn: (params: JMapEventImplementationParams) => void): void

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
         *      // mapEvent is the map implementation event
         *    }
         * )
         * ```
         */
        function moveStart(listenerId: string, fn: (params: JMapEventParams) => void): void

        /**
         * ***JMap.Event.Map.on.moveStart***
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
         *      // mapEvent is the map implementation event
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
         *          args.map, args.mapEvent // mapEvent is the map implementation event
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
         *          args.map, args.mapEvent // the mapEvent is the map implementation event
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
         *          args.map, args.mapEvent // mapEvent is the map implementation event
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
         *          args.map, args.mapEvent // mapEvent is the map implementation event
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
         *          args.map, args.mapEvent // mapEvent is the map implementation event
         *      )
         *    }
         * )
         * ```
         */
        function click(listenerId: string, fn: (params: JMapEventLocationParams) => void): void
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
   * You can create an object that implement the interface [[JExtensionModel]], and register it
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
    function register(extensionModel: JExtensionModel): void

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
     * // return true if the JMap Document extension is in use or not for the project
     * JMap.External.isRegistered("Document")
     * ```
     */
    function isRegistered(extensionId: string): boolean

    /**
     * ***JMap.External.getAllRegistered***
     * 
     * Return all registered extension ids.
     * 
     * @example ```ts
     * 
     * // Could return [ "Document", "MyCustomExtension" ]
     * JMap.External.getAllRegistered()
     * ```
     */
    function getAllRegistered(): string[]

    /**
     * ***JMap.External.getAllRegistered***
     * 
     * *You should not need to use this function. It is usefull for the API itself.*
     * 
     * Return all external mouseovers for a particular layer's feature.
     * 
     * Each result elements are the result of calling method [[JExtensionModel.renderMouseOver]]
     * 
     * You can have a look at ***[[JMap.Service.MouseOver]]***.
     * 
     * @param layer The JMap layer
     * @param feature A geoJSON feature
     * @returns an empty array if no external registered
     * @example ```ts
     * 
     * // Could return [ "Document", "MyCustomExtension" ]
     * JMap.External.getAllRegistered()
     * ```
     */
    function renderMouseOver(layer: JLayer, feature: any): JExternalMouseOver[]
  }
}
