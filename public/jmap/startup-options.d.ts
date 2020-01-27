declare interface Window {
  JMAP_API_OPTIONS?: JAPIOptions
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any
}

/**
 * This section is about the JMAP Library startup options.
 * 
 * JMap library executable is available through a CDN url.
 * 
 * The URL is like "https://cdn.jsdelivr.net/npm/jmap-js-api@0.3.5/public/",
 * but it depends on the version you want to use (here version 0.3.5).
 * 
 * First you need to import our JS file in your http file, in order to load our JS API.
 * It's recommended to put the CDN import at the end of the body tag, like that :
 * ```html
 * ...
 * <html>
 *   ...
 *   <body>
 *     ...
 *     <!-- !!! Insert the import at the end of the body tag !!! -->
 *     <script defer type="text/javascript" src="https://cdn.jsdelivr.net/npm/jmap-js-api@x.x.x/public/"></script>
 *   </body>
 * </html>
 * ```
 * To make the API working you need to provide some required information like :
 * 
 *   - Your JMap Server Rest API URL
 *   - The project id to open
 *   - A valid JMap user session token, **or** set the API to log as "anonymous"
 * 
 * It can be passed by setting a global JS variable named "JMAP_API_OPTIONS" :
 * 
 * ```html
 * <html>
 *   <body>
 *     <script type="text/javascript">
 *       window.JMAP_API_OPTIONS = {
 *         // a valid project id
 *         projectId: 10,
 *         // a valid JMap server Rest url
 *         restBaseUrl: "http://my-jmap-server/services/rest/v2.0",
 *         session: {
 *           // a valid session token
 *           token: 2345677654
 *         }
 *         ... // other optional JMAP params
 *       }
 *     </script>
 *     ... your web page
 *     <script defer type="text/javascript" src="https://cdn.jsdelivr.net/npm/jmap-js-api@x.x.x/public/"></script>
 *   </body>
 * </html>
 * ```
 * 
 * Below a full example of how to start the JMap library in a web page,
 * where parameters ***token*** and ***projectId*** are get from the url :

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
 *         }
 *       }
 *     </script>
 *     <script defer type="text/javascript" src="https://cdn.jsdelivr.net/npm/jmap-api-ng@x.x.x/public/index.js">
 *     </script>
 *   </body>
 * </html>
 * ```
 * 
 * For example, you can pass this parameters like that :
 *   - **http:// my-company/my-custom-page-using-jmap?token=95423672742&projectId=10**.
 * 
 * When JMAP API starts, if the **JMap token "*95423672742*"** is valid, it will automatically load
 * the **JMap project id=*10***, then load the map in the **div id="*jmap-map*"**.
 */
declare interface JAPIOptions {
  /**
   * The JMap project id.
   * 
   * If the project id is not set, the library will do noting, you will have a blank page.
   * 
   * So if you want the library to load the project automatically, you need to set the project id.
   * 
   * ```html
   * <html>
   *   ...
   *   <body>
   *     <script type="text/javascript">
   *       window.JMAP_API_OPTIONS = {
   *         ...
   *         // a valid project id
   *         projectId: 12
   *       }
   *     </script>
   *     ...
   *   </body>
   * </html>
   * ```
   */
  projectId?: number
  /**
   * The JMap server Rest API url.
   * 
   * Default value is : http://localhost:8080/services/rest/v2.0 (for test only).
   * 
   * If your are not testing you must provide the url of your JMap REST API :
   * ```html
   * <html>
   *   ...
   *   <body>
   *     <script type="text/javascript">
   *       window.JMAP_API_OPTIONS = {
   *         ...
   *         // a valid JMap REST Api url
   *         restBaseUrl: "http://my-custom-jmap-server-url/services/rest/v2.0"
   *       }
   *     </script>
   *     ...
   *   </body>
   * </html>
   * ```
   */
  restBaseUrl?: string
  /**
   * You can tell the API to never lost the session after a user inactivity.
   * For that the JS API will ping the server every 5 minutes if no activity
   * is done in order to keep the session alive.
   * 
   * To activate the option, use the "***noSessionExpiration***" parameter :
   * 
   * ```html
   * <html>
   *   ...
   *   <body>
   *     <script type="text/javascript">
   *       window.JMAP_API_OPTIONS = {
   *         ...
   *         noSessionExpiration: true
   *       }
   *     </script>
   *     ...
   *   </body>
   * </html>
   * ```
   */
  noSessionExpiration: boolean
  /**
   * If the project you access can be accessed anonymously,
   * you are not forced to pass a session token but you have
   * to explicitly tell the JMap library to log as an anonymous
   * user by setting the "***anonymous***" parameter like that :
   * 
   * ```html
   * <html>
   *   ...
   *   <body>
   *     <script type="text/javascript">
   *       window.JMAP_API_OPTIONS = {
   *         // a valid project id
   *         projectId: 10,
   *         // a valid JMap server Rest url
   *         restBaseUrl: "http://my-jmap-server/services/rest/v2.0",
   *         // The anonymous parameter
   *         anonymous: true
   *         ... // other optional JMAP params
   *       }
   *     </script>
   * 
   *     ... your web page
   *     
   *     <script defer type="text/javascript" src="https://cdn.jsdelivr.net/npm/jmap-js-api@x.x.x/public/"></script>
   *   </body>
   * </html>
   * ```
   */
  anonymous?: boolean
  /**
   * The JMap user session data.
   *
   * If you don't use the api logged as an anonymous user (see the ***anonymous*** parameter in this section),
   * you must provide the JMap session id to the JMap library.
   *
   * To get a session id and the user informations, you can use the JMap Rest API on your JMap server. By exemple if your server url is "https://my-jmap-server/", With the [curl tool](https://curl.haxx.se/docs/) you can get for the user "jdo@company.com" a token like that (adapt the username and password ...) :
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
   *     "sessionId": 1246413767,
   *     "userFullName": "John Do",
   *     ...
   *   }
   * }
   * ```
   * 
   * The library "**token**" is the parameter "**sessionId**" in REST the response.
   * 
   * The library "**fullName**" is the parameter "**userFullName**" in REST the response.
   * 
   * So to start the library you can pass the information like that :
   * ```html
   * <html>
   *   ...
   *   <body>
   *     <script type="text/javascript">
   *       window.JMAP_API_OPTIONS = {
   *         session: {
   *           token: "1246413767"
   *           user: {
   *             username: "jdo@company.com",
   *             fullName: "John Do"
   *           }
   *         }
   *       }
   *     </script>
   *     ...
   *     <script defer type="text/javascript" src="https://cdn.jsdelivr.net/npm/jmap-js-api@x.x.x/public/"></script>
   *   </body>
   * </html>
   * ```
   * 
   * If you don't want to make an AJAX call to the REST API, you can use the JMap library to login (JMap will make the AJAX call to the rest API). But you have to wait for the lib to be loaded. To know if the lib has been loaded you can check if the JMAp namespace exist or not. Bellow the example :
   * 
   * ```html
   * <!DOCTYPE html>
   *   <html>
   *     ...
   *     <body class="jmap_wrapper">
   *       <script type="text/javascript">
   *         console.log("JMap", window.JMap)
   *         window.JMAP_API_OPTIONS = {
   *           projectId: 35,
   *           restBaseUrl: "https://jmap7dev.jmaponline.net/services/rest/v2.0",
   *           noSessionExpiration: true,
   *           map: {
   *             zoom: 9.757829447748511,
   *             center: {
   *               x: -73.66415865898597,
   *               y: 45.53583011032552
   *             }
   *           }
   *         }
   *       </script>
   *       ...
   *       <script defer type="text/javascript" src="https://cdn.jsdelivr.net/npm/jmap-js-api@x.x.x/public/index.js"></script>
   *       <script>
   *         (function jmapLogin() {
   *           if (window.hasOwnProperty("JMap")) {
   *             JMap.Service.User.login("jdo@company.com", "xxx")
   *           } else {
   *             console.log("Waiting for the JMap lib to be loaded ...")
   *             setTimeout(() => jmapLogin(), 150) // check every 150 milliseconds
   *           }
   *         })()
   *       </script>
   *     </body>
   *   </html>
   * ```
   * 
   */
  session?: JSessionData
  /**
   * All map related options.
   * 
   * Click on [[JAPIMapOptions]] to get details.
   */
  map?: JAPIMapOptions
}

declare interface JAPIMapOptions {
  /**
   * When the API start it will create or use an existing div container in which the map will be inserted into.
   *
   * By default the div container id is "***jmap-map***", but you can set the id of your choice like that :
   * ```html
   * <html>
   *   ...
   *   <body>
   *     <script type="text/javascript">
   *       window.JMAP_API_OPTIONS = {
   *         ...
   *         map: {
   *           containerId: "my-custom-container-id"
   *         }
   *       }
   *     </script>
   *     <div id="my-custom-container-id"></div>
   *  </body>
   * </html>
   * ```
   *
   * In the above example the map will be inserted in the div having "my-custom-container-id" as id. You need to set the width and the height of this div by yourself.
   * 
   * If no container is found in the DOM with the specified id, JMap API will create and append it automatically in the body element of the web page.
   */
  containerId?: string
  /**
   * If a mapbox token is set through the JMap Admin server interface,
   * the API will use it automatically, nothing else to do for you.
   * 
   * The Mapbox token is by JMap in order to fully used Mapbox capabilities
   * like displaying a nice base map by example.
   * 
   * But if no token is set in the JMap administration, or if you want to use
   * the mapbox token of your choice, you have to set the "***mapboxToken***" parameter :
   * 
   * ```html
   * <html>
   *   ...
   *   <body>
   *     <script type="text/javascript">
   *       window.JMAP_API_OPTIONS = {
   *         ...
   *         map: {
   *           mapboxToken: "dfqwdhjgqdhdh4567sjdvhbh"
   *         }
   *       }
   *     </script>
   *     ...
   *   </body>
   * </html>
   * ```
   */
  mapboxToken?: ""
  /**
   * By default the scale control panel it is not visible.
   * 
   * But if ***scaleControlVisible*** is true, it will be displayed on the map.
   * 
   * ```html
   * <html>
   *   ...
   *   <body>
   *     <script type="text/javascript">
   *       window.JMAP_API_OPTIONS = {
   *         ...
   *         map: {
   *           scaleControlVisible: true,
   *         }
   *       }
   *     </script>
   *     ...
   *   </body>
   * </html>
   * ```
   */
  scaleControlVisible?: boolean
  /**
   * You can choose the position of the scale control on the map.
   * 
   * Use a value in : "**top-left**", "**top-right**", "**bottom-left**", or "**bottom-right**"
   * 
   * ```html
   * <html>
   *   ...
   *   <body>
   *     <script type="text/javascript">
   *       window.JMAP_API_OPTIONS = {
   *         ...
   *         map: {
   *           scaleControlPosition: "bottom-right"
   *         }
   *       }
   *     </script>
   *     ...
   *   </body>
   * </html>
   * ```
   */
  scaleControlPosition?: JMapPosition
  /**
   * This is the unit in which the scale control panel will display the data.
   * 
   * ```html
   * <html>
   *   ...
   *   <body>
   *     <script type="text/javascript">
   *       window.JMAP_API_OPTIONS = {
   *         ...
   *         map: {
   *           scaleControlUnit: "imperial"
   *         }
   *       }
   *     </script>
   *     ...
   *   </body>
   * </html>
   * ```
   */
  scaleControlUnit?: "imperial" | "metric" | "nautical"
  /**
   * You can set the location of the center of the map by setting the ***center*** parameter. By exemple if you want to center the map on the city of Ottawa :
   * 
   * ```html
   * <html>
   *   ...
   *   <body>
   *     <script type="text/javascript">
   *       window.JMAP_API_OPTIONS = {
   *         ...
   *         map: {
   *           center: {
   *             x: -75.6981200,
   *             y: 45.4111700
   *           }
   *         }
   *       }
   *     </script>
   *     ...
   *   </body>
   * </html>
   * ```
   */
  center?: JLocation
  /**
   * You can zoom to a custom level by setting the "***zoom***" variable. Here an example :
   * 
   * ```html
   * <html>
   *   ...
   *   <body>
   *     <script type="text/javascript">
   *       window.JMAP_API_OPTIONS = {
   *         ...
   *         map: {
   *           zoom: 4.32
   *         }
   *       }
   *     </script>
   *     ...
   *   </body>
   * </html>
   * ```
   */
  zoom?: number
  /**
   * You can execute a custom piece of code at runtime, after the map is ready,
   * and only one time at JMap Js API startup.
   * 
   * For that you have to set the "***onStartupMapReadyFn***" parameter which is a function.
   * Here an example that will display a message "Hello the map is ready !" in the console :
   * 
   * ```html
   * <html>
   *   ...
   *   <body>
   *     <script type="text/javascript">
   *       window.JMAP_API_OPTIONS = {
   *         ...
   *         map: {
   *           onStartupMapReadyFn: map => {
   *             console.log("Hello the map is ready !", map)
   *           }
   *         }
   *       }
   *     </script>
   *     ...
   *   </body>
   * </html>
   * ```
   */
  onStartupMapReadyFn?: (map: any) => {}
}
