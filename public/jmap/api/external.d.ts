/**
 * We introduce the notion of External Model in order to let you adding you own JMap plugin.
 * 
 * Your plugin is an object that has to implement this interface.
 * 
 * Then you have to register your external model like that :
 * 
 * @example ```ts
 * // This a minimal model
 * // You need to provide an id and an initFn function at least
 * // This model is useless, but just for the example
 * JMap.External.register({
  *  id: "MyExternalModule", // Unique id
  *  initFn: () => {
  *    // here you can start your UI component if needed
  *    console.log("JMap is started and my external extension has been successfuly started")
  *  }
  * })
 * ```
 */
declare interface JExternalModel {
  /**
   * The unique external model identifier
   */
  id: string
  /**
   * If you want you can expose a service.
   * 
   * If your external model id is "MyCustomPlugin", your service will be accessible like that :
   * ```ts
   * JMap.External.MyCustomPlugin
   * ```
   */
  serviceToExpose?: any
  /**
   * you can set this property to true and your initFn will be called as soon JMap API is
   * loaded. By default the initFn of your plugin is called only after the map has been loaded.
   * 
   * The map is loaded when a project has been loaded, and the project is loaded only if
   * we have we have a valid user session token.
   * 
   * So if you don't provide user sesion data in JMap startup options, your plugin function will
   * be called only when you will have a valid session token, and loaded a project.
   * 
   * You can make a custom autentication using the method [[JMap.Service.User.login]]).
   * You can load a a project using the method [[JMap.Service.Project.load]]).
   */
  startBeforeMapIsReady?: boolean
  /**
   * The init function of your external model.
   * 
   * Here you can start initialize your plugin.
   */
  initFn: (options: any) => void
  /**
   * You can provide you own Redux store reducer : https://redux.js.org/basics/reducers.
   * 
   * // TODO example of reducer
   * 
   * Like that you can develop UI component that react to the redux state changes.
   * 
   * You can get the data store using this function : [[JMap.Api.getDataStore]], and then dispatch
   * your own actions.
   * 
   * // TODO example of dispatch
   */
  storeReducer?: (reducerState: any, action: any) => any
  /**
   * You can provide a renderMouseOver function.
   * 
   * If set, this function has to return a [[JExternalMouseOver]], and it will be displayed
   * at the end of the "normal" mouseover.
   * 
   * // TODO add example
   * 
   * @param layer The JMap layer object
   * @param feature  The mouseovered feature (having all its properties filled)
   */
  renderMouseOver?(layer: JLayer, feature: any): JExternalMouseOver
}

declare interface JExternalMouseOver {
  html: string  // static html content
  js?: string   // javascript that will be evaluated after html rendered
}
