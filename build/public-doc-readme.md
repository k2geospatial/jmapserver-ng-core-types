**JMap Web API documentation**

The project has been written in Typescript, so this documentation is able to provide information about result types or arguments to pass to the API.

If you want, you can have a look at the typescript public interfaces located in our Github project named [jmap-api-ng](https://github.com/k2geospatial/jmap-api-ng).

This project is also published on [NPM](https://www.npmjs.com/package/jmap-api-ng).

If your project is written in Typescript you can get all autocompletions for the JMap Web API by adding this NPM package to your project :
```bash
npm i -D jmap-web-ng
```

JMap Web API purpose is to provide a JS API in order to be able to fully integrate JMap in your Web Application.

By default the API is started without any options. So nothing is started except some DOM initializations (for popup containers etc ...)

You can start some UI components independently, or you can start the entire JMap Application.

// TODO document options or pass a ref to the JAPIOptions interface

By example if you want to insert in your html div id="user-container-id" the JMap component "User", you can add it like that :
```ts
  JMap.Component.User.create("user-container-id", { ...options })
```

