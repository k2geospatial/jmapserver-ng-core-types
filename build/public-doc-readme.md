**JMap Server NG Core library documentation**

You can explore the JMap Server NG Core library API by clicking on this link ***{@link JMap}***.

The project has been written in Typescript, so this documentation provides information about result types or arguments to pass to the JMap Server NG Core library.

If you want, you can have a look at the typescript public interfaces located in our Github project named [jmapserver-ng-core-types](https://github.com/k2geospatial/jmapserver-ng-core-types).

This project is also published on [NPM](https://www.npmjs.com/package/jmapserver-ng-core-types).

If your project is written in Typescript you can get all autocompletions for the JMap Server NG Core library by adding this NPM package to your project :
```bash
npm i -D jmapserver-ng-core-types
```

JMap Server NG Core library purpose is to provide a JS API in order to fully integrate JMap in your Web Application.

By default the JMap Server NG Core library is started without any options. So nothing special is done except some DOM initializations (for popup containers, etc ...).

Before being able to use the JMap Server NG Core library, you must be authenticated (= having a valid JMap token) and you need to set some JMap startup options ({@link JCoreOptions}).

You can start a JMAP UI components where you want in your page.

For example if you want to insert in your html div id="user-container-id" the JMap component "User" (manages the user session and information), you can add it like that :
```ts
  JMap.Component.User.create("user-container-id", { ...options })
```
