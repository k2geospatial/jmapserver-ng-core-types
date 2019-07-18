**JMap Web API documentation**

You can explore the API by clicking on this link ***[[JMap]]***.

The project has been written in Typescript, so this documentation provides information about result types or arguments to pass to the API.

If you want, you can have a look at the typescript public interfaces located in our Github project named [jmap-api-ng](https://github.com/k2geospatial/jmap-api-ng).

This project is also published on [NPM](https://www.npmjs.com/package/jmap-api-ng).

If your project is written in Typescript you can get all autocompletions for the JMap Web API by adding this NPM package to your project :
```bash
npm i -D jmap-web-ng
```

JMap Web API purpose is to provide a JS API in order to fully integrate JMap in your Web Application.

By default the API is started without any options. So nothing special is done except some DOM initializations (for popup containers, etc ...).

Before being able to use the API, you must be authenticated (= having a valid JMap token) and you need to set some JMap startup options ([[JAPIOptions]]).

You can start a JMAP UI components where you want in your page.

For example if you want to insert in your html div id="user-container-id" the JMap component "User" (manages the user session and information), you can add it like that :
```ts
  JMap.Component.User.create("user-container-id", { ...options })
```

**API changes**

**V0.2.4 => V0.2.5**
 - Function added :
    - **[[JMap.Data.User.getFullName]]**
 - Function removed :
    - <span style="color:red">**JMap.Data.User.getFirstName**</span> (replaced by JMap.Data.User.getFullName())
    - <span style="color:red">**JMap.Data.User.getLastName**</span> (replaced by JMap.Data.User.getFullName())
 - Functions renamed :
    - JMap.Data.Api.getAllMode => <span style="color:green">**JMap.Data.Api.getAllMode*s***</span>
    - JMap.Data.Project.getScaleMin => <span style="color:green">**JMap.Data.Project.get*MinScale***</span>
    - JMap.Data.Project.getScaleMax => <span style="color:green">**JMap.Data.Project.get*MaxScale***</span>
    - JMap.Data.Project.getColorSelection => <span style="color:green">**JMap.Data.Project.get*SelectionColor***</span>
    - JMap.Data.Project.getColorBackground => <span style="color:green">**JMap.Data.Project.get*BackgroundColor***</span>
