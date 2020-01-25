This example below will show you how to start a JMap map in full screen.

This example will use one of our demo server, but you need to adapt the restBaseUrl parameter to reach your JMap server.

This example is simple and the user is authenticated as an anonymous user.

Notice :

  - The class "jmap_wrapper" has been added to the body element, it's because all JMap library css code is applyed only inside a div that contains the class "jmap_wrapper", in order to not interfer with your own css code. 
  - The HTML page that contains this code has to be served by a server, it will not works if you copy/paste it in a browser and open the html file locally due to browser security check. 

Bellow the example :

```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <meta charset="UTF-8">
  </head>
  <body class="jmap_wrapper">
    <script type="text/javascript">
      window.JMAP_API_OPTIONS = {
        projectId: 35,
        restBaseUrl: "https://jmap7dev.jmaponline.net/services/rest",
        noSessionExpiration: true,
        anonymous: true
      }
    </script>
    <script defer type="text/javascript" src="https://cdn.jsdelivr.net/npm/jmap-js-api@0.3.5/public/"></script>
  </body>
</html>
```