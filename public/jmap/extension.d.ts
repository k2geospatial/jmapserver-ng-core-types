declare interface JExtensionEventParams {
  extensionId: string
}

declare interface JExtensionServerOverride {
  id: string
  jsUrl: string
}

declare interface JCoreServerExtensionInfo {
  /**
   * The extension server id. The server extension id could be different of the JS version.
   */
  id: string
  /**
   * The extension server version. The server extension version could be different of the JS version.
   */
  version: string
  /**
   * The data depends on the extension. Some extensions could have an empty params object.
   */
  data: any
}

declare interface JCoreExtensionParams {
  serverInfo?: JCoreServerExtensionInfo
}

/**
 * We introduce the notion of extension in order to let you adding you own JMap plugin.
 *
 * Your plugin is an object that has to implement this interface.
 *
 * Then you have to register your extension like that :
 *
 * @example ```ts
 * // This a minimal model
 * // You need to provide an id and an initFn function at least
 * // This model is useless, but just for the example
 * JMap.Extension.register({
 *  id: "MyExtension", // Unique id
 *  initFn: () => {
 *    // here you can start your UI component if needed
 *    console.log("JMap is started and my extension has been successfuly started")
 *  }
 * })
 * ```
 */
declare interface JCoreExtension {
  /**
   * The unique extension identifier
   */
  id: string
  /**
   * By default an extension is "application" scoped. But you can set the extension as "project" scoped.
   *
   * If an extension is application scoped, it will be loaded one time, and never destroyed.
   *
   * If it's set as project scoped :
   *  - The extension will be registered each time a project is activated (= initFn will be called).
   *  - When a project is deactivated, the extension function destroyFn is called (if defined), then the
   *    extension is unregistered (redux store, service, etc... will be destroyed).
   */
  isProjectExtension?: boolean
  /**
   * If your extensions is depending on a server extension, you have to set this parameter.
   *
   * This parameter is used to determine if an extension is a backend extension or not, and also used
   * in order to provide the parameter to the extension (initFn params).
   *
   * It should be the same id as the JS extension id, it but could be different.
   */
  serverExtensionId?: string
  /**
   * If you want you can expose a service.
   *
   * If your extension id is "MyExtension", your service will be accessible like that :
   * ```ts
   * JMap.Extension.MyExtension.doSomething()
   * ```
   */
  serviceToExpose?: any
  /**
   * By default :
   *  - "application" scoped extensions are initialized (= initFn called) the first time the map is loaded
   *  - "project" scoped extensions are initialized after a project has changed and the new map is loaded
   *
   * If you set this parameter to true :
   *  - "application" scoped extensions will be initialized as soon the extension is registered
   *  - "project" scoped extensions will be initialized as soon the project has changed
   */
  startBeforeMapIsReady?: boolean
  /**
   * You can provide a translation bundle for your extesion. All translations will be handled by the JMap NG
   * translation engine. See [[JMap.Language.addBundle]] for more details on bundles
   */
  translationBundle?: JTranslationBundle
  /**
   * The init function of your extension.
   *
   * Here you can start initialize your extension.
   *
   * By default param is an empty object, but for project server extensions only, a parameter "serverInfo" is passed,
   * fetched from the project configuration that is defined in the admininistration.
   */
  initFn: (params: JCoreExtensionParams) => void
  /**
   * The destroy function.
   *
   * Only used for "project" scoped extensions (useless for "application" scoped extension).
   *
   * For "project" scoped extensions, when a project will be deactivated, all project's extensions are unregistered.
   *
   * Before unregister those extensions, this function is called.
   *
   * For example, when this function is called you should clean all your event listeners.
   *
   * Don't mind about cleaning the redux state, because it will be destroyed by the register function.
   *
   * Then the redux state will be created again when the next project will be loaded,
   * and the extension will be registered again.
   */
  destroyFn?: () => void
  /**
   * You can provide your own Redux store reducer : https://redux.js.org/basics/reducers.
   *
   * Like that you can develop UI component that react to the redux state changes.
   *
   * You can get the data store using this function : [[JMap.getDataStore]], and then dispatch
   * your own actions.
   *
   * A redux reducer is a pure JS function that take the current reducer state (can be undefined first time)
   * and an action, and return the new state (the same if no changes has been made for the action).
   */
  storeReducer?: (currentReducerState: any, action: any) => any
  /**
   * You can provide a renderMouseOver function.
   *
   * If set, this function has to return a [[JExtensionMouseOver]], and it will be displayed
   * at the end of the standard mouseover.
   *
   * @param layer The JMap layer object
   * @param feature  The mouseovered feature (having all its properties filled)
   */
  renderMouseOver?: (layer: JLayer, feature: any) => JExtensionMouseOver | undefined
  /**
   * The registration function.
   *
   * Triggered when this extension has been registered.
   */
  onRegistrationDone?: () => void

  /**
   * An optionnal handler that returns a Mapbox GL JS RequestParameters object
   *
   * Provide this handler if your extention needs to add something special in MapBox map requests,
   * like providing credentials, adding headers, etc.
   *
   * Great care must be taken to not blindly modify every request passed to this handler. You should only modify requests known to your extension. This can usually
   * be determined by looking at the url received by the handler
   *
   * See Mapbox documentation for reference:
   *
   * https://docs.mapbox.com/mapbox-gl-js/api/map/#map-parameters
   * https://docs.mapbox.com/mapbox-gl-js/api/properties/#requestparameters
   *
   * @example ```ts
   * JMap.Extension.register({
   *  id: "MyExtension", // Unique id
   *  initFn: () => {
   *    // here you can start your UI component if needed
   *    console.log("JMap is started and my extension has been successfuly started")
   *  },
   *  injectMapRequestParameters: (url, resourceType) => {
   *    if (resourceType === 'Source' && url.indexOf('http://myHost') > -1) {
   *       return {
   *         url,
   *         headers: {'my-custom-header': true},
   *         credentials: 'include'  // Include cookies for cross-origin requests
   *      }
   *     }
   *    return { url }
   *  }
   * })
   * ```
   *
   */
  injectMapRequestParameters?: mapboxgl.TransformRequestFunction
}

declare interface JExtensionMouseOver {
  html: string // static html content
  js?: string // javascript that will be evaluated after html rendered
}
