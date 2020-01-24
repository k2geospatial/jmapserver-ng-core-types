declare interface Window {
  JMAP_API_OPTIONS?: JAPIOptions
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any
}

/**
 * The JMAP API startup options.
 * 
 * You can customize the JMap Web API by setting startup options.
 * 
 * This options has to be defined before evaluating the JMAP Web API js file :
 * ```html
 * <!DOCTYPE html>
 * <html>
 *   <head>
 *     <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
 *     <meta charset="UTF-8">
 *   </head>
 *   <body class="jmap_wrapper">
 *    <script type="text/javascript">
 *       const url = new URL(window.location.href)
 *       const token = url.searchParams.get("token")
 *       let projectId = Number(url.searchParams.get("projectId"))
 *       if (isNaN(projectId)) {
 *         projectId = 0
 *       }
 *       window.JMAP_API_OPTIONS = {
 *         projectId: Number(projectId),
 *         restBaseUrl: "http://your-jmap-server-url/services/rest/v2.0",
 *         session: {
 *           token: Number(token),
 *           user: {
 *             username: "jdo@mycompany.com",
 *             fullName: "John do",
 *             admin: false
 *           }
 *         },
 *         map: {
 *           mapboxToken: "xx.xxx.xx",
 *           onStartupMapReadyFn: map => console.log("JMap is ready !")
 *         }
 *       }
 *     </script>
 *     <script defer
 *             type="text/javascript"
 *             src="https://cdn.jsdelivr.net/npm/jmap-api-ng@x.x.x/public/index.js">
 *     </script>
 *   </body>
 * </html>
 * ```
 * 
 * This html file gets parameters ***token*** and ***projectId*** from the url.
 * 
 * For example, you can pass this parameters like that :
 *   - **http:// my-company/my-custom-page-using-jmap?sessionId=95423672742&projectId=10**.
 * 
 * When JMAP API starts, if the **JMap token "*95423672742*"** is valid, it will automatically load
 * the **JMap project id=*10***, then load the map in the **div id="*jmap-map*"**.
 */
declare interface JAPIOptions {
  /**
   * The project id. If not set the API will do noting.
   */
  projectId?: number
  /**
   * The JMAp server Rest API url.
   * 
   * Default value is : http://localhost:8080/services/rest/v2.0
   */
  restBaseUrl?: string
  /**
   * If true will make ping to server every 5 minutes in order to keep the session opened.
   */
  noSessionExpiration: boolean
  /**
   * The JMap user session data
   * 
   * @example ```ts
   * 
   * session: {
   *  token: "67464654674"
   *  user: {
   *    username: "jdo@company.com",
   *    fullName: "John Do",
   *    admin: false
   *  }
   * }
   * ```
   */
  session?: JSessionData
  /**
   * The JMap map options.
   * 
   * @example ```ts
   * 
   * map: {
   *   containerId: "jmap-map",
   *   mapboxToken: "xx.xxx.xx",
   *   onStartupMapReadyFn: map => console.log("JMap is ready and map loaded !")
   * }
   * ```
   */
  map?: JAPIMapOptions
}

declare interface JAPIMapOptions {
  /**
   * The DOM container div id where the map will be inserted.
   * 
   * Default is "jmap-map"
   */
  containerId?: string
  /**
   * The MapBox token, needed if the map implementation is MapBox.
   */
  mapboxToken?: ""
  /**
   * If true display a scale control panel
   */
  scaleControlVisible?: boolean
  /**
   * Set the position of the scale control panel
   */
  scaleControlPosition?: JMapPosition
  /**
   * If *scaleControlVisible* is true, you can define the *scaleControlUnit*.
   * 
   * This is the unit in which the scale panel will display the data.
   * 
   * Values "degrees" and "us" are not supported with MapBox
   */
  scaleControlUnit?: "imperial" |  "metric" |  "nautical" | "degrees" | "us"
  /**
   * If set, the map will be centered to this location.
   */
  center?: JLocation
  /**
   * If set, the map will be zoomed to that zoom level
   */
  zoom?: number
  /**
   * If set, this function will be called after JMap API is ready and the map has been loaded.
   */
  onStartupMapReadyFn?: (map: any) => {}
}
