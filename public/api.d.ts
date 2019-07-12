/**
 * The API entry point in the javascript console is ***JMap***, the entry point.
 * All references to our API will start by ***JMap***.
 * 
 * @example ```ts
 * 
 *  JMap.Data.Project.getId()
 * ```
 */
declare namespace JMap {
  
  /**
   * The API version.
   * 
   * @example ```ts
   * 
   * console.info(JMap.version)
   * // return a string that is the version like "1.0.1"
   * ``
   */
  const version: string
  
  /**
   * **JMap.Service**
   * 
   * This is where you can interact with the API.
   * It is split by features.
   */
  namespace Service {
    
    /**
     * **JMap.Service.Api**
     * 
     * API related methods.
     */
    namespace Api {
      
      /**
       * **JMap.Service.Api.setMode**
       * 
       *  Change the API mode. Mainly used when the application is launched.
       * 
       * @param mode JMap.Service.Api.setMode()
       * @example ```ts
       * 
       *  JMap.Service.Api.setMode("layer")
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
       * Return the tree of layer elements.
       * A layer element can be a tree node or a layer descriptor
       * 
       * @example ```ts
       * 
       *  JMap.Service.Layer.getLayerTree()
       * ```
       */
      function getLayerTree(): JLayerTree
      
      /**
       * **JMap.Service.Layer.getRenderedLayerIds**
       * 
       * Return the ids of the layers that are displayed on the map.
       * 
       * This function exists because MapBox cannot display all the layers defined by the project.
       * 
       * @example ```ts
       * 
       *  JMap.Service.Layer.getRenderedLayerIds()
       * ```
       */
      function getRenderedLayerIds(): number[]
      
      /**
       * **JMap.Service.Layer.exists**
       * 
       * Return true if the layer exists.
       * 
       * @throws Error if layer is not found
       * @param layerId The JMap layer id
       * @example ```ts
       * 
       * // return true if the layer with id=4 exists
       * JMap.Service.Layer.exists(4)
       * ```
       */
      function exists(layerId: number): boolean
      
      /**
       * **JMap.Service.Layer.getById**
       * 
       * Get the layer element in the tree (a node or a layer descriptor) and return it.
       * 
       * @throws Error if layer is not found
       * @param layerId The JMap layer id
       * @example ```ts
       * 
       * JMap.Service.Layer.getById(4)
       * ```
       */
      function getById(layerId: number): JLayerElement
      
      /**
       * **JMap.Service.Layer.getName**
       * 
       * Return the layer element name.
       * 
       * @throws Error if layer is not found
       * @param layerId The JMap layer id
       * @example ```ts
       * 
       * JMap.Service.Layer.getName(4)
       * ```
       */
      function getName(layerId: number): string
      
      /**
       * **JMap.Service.Layer.getDescription**
       * 
       * Return the layer element description.
       * 
       * @throws Error if layer is not found
       * @param layerId The JMap layer id
       * @example ```ts
       * 
       * JMap.Service.Layer.getDescription(4)
       * ```
       */
      function getDescription(layerId: number): string
      
      /**
       * **JMap.Service.Layer.isVisible**
       * 
       * Return true if the layer element is visible.
       * 
       * It is the user visibility, not the map visibility that depends on the scale.
       * 
       * @throws Error if layer is not found
       * @param layerId The JMap layer id
       * @example ```ts
       * 
       * JMap.Service.Layer.isVisible(4)
       * ```
       */
      function isVisible(layerId: number): boolean
      
      /**
       * **JMap.Service.Layer.setVisible**
       * 
       * Set the layer element visibility.
       * 
       * @throws Error if layer is not found
       * @param layerId The JMap layer id
       * @param visible if true will display, if false will hide the layer element
       * @example ```ts
       * 
       * JMap.Service.Layer.setVisible(4, false)
       * ```
       */
      function setVisible(layerId: number, visible: boolean): void
      
      /**
       * **JMap.Service.Layer.setGroupOpen**
       * 
       * Set the tree node open or closed.
       * 
       * @throws Error if layer is not found
       * @param layerId The JMap layer id
       * @param open if true will display, if false will hide the node
       * @example ```ts
       * 
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
     * Map related features
     */
    namespace Map {
      
      /**
       * **JMap.Service.Map.getMap**
       * 
       * Return the map implementation : MapBox or OpenLayer map.
       * 
       * @example ```ts
       * 
       * JMap.Service.Map.getMap()
       * ```
       */
      function getMap(): any
      
      /**
       * **JMap.Service.Map.getMapJSLib**
       * 
       * Return the map implementation librairie : MapBox or OpenLayer.
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
       * Return the layer visibility status. 
       * 
       * @example ```ts
       * 
       * JMap.Service.Map.getLayersVisibilityStatus()
       * ```
       */
      function getLayersVisibilityStatus(): JMapLayersVisibilityStatus
      
      /**
       * **JMap.Service.Map.getInUseJMapLayerIds**
       * 
       * Return all layer ids that are displayed by the map.
       * 
       * @example ```ts
       * 
       * JMap.Service.Map.getInUseJMapLayerIds()
       * ```
       */
      function getInUseJMapLayerIds(): number[]
      
      /**
       * **JMap.Service.Map.getInUseJMapVectorLayerIds**
       * 
       * Return all vector layer ids that are displayed by the map.
       * 
       * @example ```ts
       * 
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
       * @example ```ts
       * 
       * JMap.Service.Map.getInUseJMapLayerBefore()
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
       * @example ```ts
       * 
       * JMap.Service.Map.getInUseJMapLayerAfter()
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
       * // Will return all rendered geojson features for layer 4
       * JMap.Service.Map.getRenderedFeatures(4)
       * 
       * // Will return all rendered geojson features for layer 4 at location x=45.54 and y=65.43
       * JMap.Service.Map.getRenderedFeatures(4, { x: 45.54, y: 65.43 })
       * 
       * // Will return all rendered geojson features for layer 4 that intersect the boundary box
       * // having south west corner x=45.54 and y=65.43 and north est corner x=48.54 and y=70.43
       * JMap.Service.Map.getRenderedFeatures(4, { sw: { x: 45.54, y: 65.43 }, ne: { x: 48.54, y: 70.43 }})
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
       * JMap.Service.Map.getRenderedFeaturesAttributeValues(4, { x: 45.54, y: 65.43 })
       * 
       * JMap.Service.Map.getRenderedFeaturesAttributeValues(4, { sw: { x: 45.54, y: 65.43 }, ne: { x: 48.54, y: 70.43 }})
       * 
       * // Result example :
       * [
       *  { name: "Firestation", featureId: 2377 },
       *  { name: "Nursery", featureId: 345 }
       * ]
       * ```
       */
      function getRenderedFeaturesAttributeValues(layerId: number, filter?: JLocation | JBoundaryBox): JMapFeatureAttributeValues[]
      
      /**
       * **JMap.Service.Map.getAvailableBaseMaps**
       * 
       * Return the available basemap names that can be used with method setBaseMap.
       * 
       * @example ```ts
       * 
       * // For mapbox it returns [ "light", "streets", "satellite", "dark", "outdoors", "none" ]
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
       * JMap.Service.Map.setBaseMap("streets")
       * ```
       */
      function setBaseMap(mapName: string): void
      
      /**
       * **JMap.Service.Map.panTo**
       * 
       * Move and center the map to the location
       * 
       * @throws Error if no or incorrect center is passed
       * @param center The location where the map will be centered
       * @example ```ts
       * 
       * JMap.Service.Map.panTo({ x: 45.34, y: 65.87 })
       * ```
       */
      function panTo(center: JLocation): void
      
      /**
       * **JMap.Service.Map.zoomTo**
       * 
       * Zoom or unzoom the map
       * 
       * @throws Error if no zoom is passed
       * @param zoom The zoom level to apply
       * @example ```ts
       * 
       * JMap.Service.Map.zoomTo(4.45)
       * ```
       */
      function zoomTo(zoom: number): void
      
      /**
       * **JMap.Service.Map.panAndZoomTo**
       * 
       * Move and zoom (or unzoom) the map
       * 
       * @throws Error if bad parameters are passed
       * @param center The location where the map will be centered
       * @param zoom The zoom level to apply
       * @example ```ts
       * 
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
         * You can get the list of already existing interactor ids like that :
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
         * JMap.Service.Map.Interaction.addInteractor(
         *    "custom-selection",
         *    { ...mapInteractor },
         *    true
         * )
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
       * @param content The mouseover content you get with method JMap.Service.MouseOver.getMouseOverContent
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
  }
  namespace Documentation {
    function open(): void
  }
}
