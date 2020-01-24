In this section you will learn how to import and provide the required info to the JMap api.

# Import the JMap Javascript executables in your page

JMap API JS exexutables are available through a CDN url. The URL is like "https://cdn.jsdelivr.net/npm/jmap-js-api@0.3.5/public/", but it depends on the version you want to use.

Fisrt you need to import our JS file in your http file, in order to load our JS API. It's better to place the CDN import at the end of the body tag, like that :
```html
...
<html>
  ...
  <body>
    ...
    <!-- !!! Insert the import at the end of the body tag !!! -->
    <script defer type="text/javascript" src="https://cdn.jsdelivr.net/npm/jmap-js-api@0.3.5/public/"></script>
  </body>
</html>
```

# Provide your required informations to the API

To make the API working you need to provide some required information like :

  - Your JMap Server Rest API URL
  - The project id to open
  - A valid JMap user session token, **or** set the API to log as "anonymous"

It can be passed by setting a global JS variable named "JMAP_API_OPTIONS" :

```html
...
<html>
  <body>
    <script type="text/javascript">
      window.JMAP_API_OPTIONS = {
        // a valid project id
        projectId: 10,
        // a valid JMap server Rest url
        restBaseUrl: "http://my-jmap-server/services/rest/v2.0",
        session: {
          // a valid session token
          token: 2345677654
        }
        ... // other optional JMAP params
      }
    </script>

    ... your web page
    
    <script defer type="text/javascript" src="https://cdn.jsdelivr.net/npm/jmap-js-api@0.3.5/public/"></script>
  </body>
</html>
```

# Loggin as an anonymous user

If the project you access can be accessed anonymously, you are not forced to pass a session token but you have to explicitly tell the API to log as an anonymous user by setting the "***anonymous***" parameter like that :

```html
...
<html>
  <body>
    <script type="text/javascript">
      window.JMAP_API_OPTIONS = {
        // a valid project id
        projectId: 10,
        // a valid JMap server Rest url
        restBaseUrl: "http://my-jmap-server/services/rest/v2.0",
        // The anonymous parameter
        anonymous: true
        ... // other optional JMAP params
      }
    </script>

    ... your web page
    
    <script defer type="text/javascript" src="https://cdn.jsdelivr.net/npm/jmap-js-api@0.3.5/public/"></script>
  </body>
</html>
```
