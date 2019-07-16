**JMap Web API documentation**

You can explore the API by clicking on the link at the top right of this page named ***JMap***, just under *Globals*.

The project has been written in Typescript, so this documentation is able to provide information about result types or arguments to pass to the API.

If you want, you can have a look at the typescript public interfaces located in our Github project named [jmap-api-ng](https://github.com/k2geospatial/jmap-api-ng).

This project is also published on [NPM](https://www.npmjs.com/package/jmap-api-ng).

If your project is written in Typescript you can get all autocompletions for the JMap Web API by adding this NPM package to your project :
```bash
npm i -D jmap-web-ng
```

JMap Web API purpose is to provide a JS API in order to be able to fully integrate JMap in your Web Application.

By default the API is started without any options. So nothing special is done except some DOM initializations (for popup containers etc ...)

Before being able to use the API, you must be authenticated (= having a valid JMap token) and you need to set some JMap startup options ([[JAPIOptions]]).

This file get the ***sessionId*** and the ***projectId*** from the url as parameters like *?sessionId=95423672742&projectId=10*.

This options provide a valid ***sessionId*** and a ***projectId***, so when API will start it will automatically start the map and display the project 10 in the div id=**"jmap-map"**.

Then you can start our UI components where you want in your page.

By example if you want to insert in your html div id="user-container-id" the JMap component "User", that manage the user session and informations, you can add it like that :
```ts
  JMap.Component.User.create("user-container-id", { ...options })
```