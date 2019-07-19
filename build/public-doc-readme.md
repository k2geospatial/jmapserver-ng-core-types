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
    - **[[JMap.Data.Layer.getLayerIds]]**
    - **[[JMap.Service.Map.isLayerRendered]]**
 - Function removed :
    - <span style="color:red">**JMap.Data.User.getFirstName**</span> (replaced by JMap.Data.User.getFullName)
    - <span style="color:red">**JMap.Data.User.getLastName**</span> (replaced by JMap.Data.User.getFullName)
    - <span style="color:red">**JMap.Service.Language.translate**</span> (no replacement)
 - Function moved :
    - JMap.Service.Language.getLocale() => <span style="color:green">**JMap.Service.*User*.getLocale**</span>
    - JMap.Service.Api.setMode => <span style="color:green">**JMap.*Application*.setMode**</span>
    - JMap.Data.Api.getMode => <span style="color:green">**JMap.*Application*.getMode**</span>
    - JMap.Data.Api.getAllModes => <span style="color:green">**JMap.*Application*.getAllModes**</span>
 - Functions renamed :
    - JMap.Data.Api.getAllMode => <span style="color:green">**JMap.Data.Api.getAllMode*s***</span>
    - JMap.Data.Project.getScaleMin => <span style="color:green">**JMap.Data.Project.get*MinScale***</span>
    - JMap.Data.Project.getScaleMax => <span style="color:green">**JMap.Data.Project.get*MaxScale***</span>
    - JMap.Data.Project.getColorSelection => <span style="color:green">**JMap.Data.Project.get*SelectionColor***</span>
    - JMap.Data.Project.getColorBackground => <span style="color:green">**JMap.Data.Project.get*BackgroundColor***</span>
    - JMap.Data.Layer.getRenderedLayers => <span style="color:green">**JMap.Data.Layer.get*Layers***</span>
    - JMap.Service.Layer.setGroupOpen => <span style="color:green">**JMap.Service.Layer.set*Layer*Group*Expansion***</span>
    - JMap.Data.User.getLogin => <span style="color:green">**JMap.Data.User.get*Username***</span>
    - JMap.Service.Map.Interaction.getAllInteractorDescriptors() => <span style="color:green">**JMap.Service.Map.Interaction.getAllInteractor*Id*s**</span>
    - JMap.Service.Map.Interaction.getActiveInteractorDescriptor() => <span style="color:green">**JMap.Service.Map.Interaction.getActiveInteractor*Id***</span>
 - Functions moved and renamed :
    - JMap.Service.Layer.getRenderedLayerIds => <span style="color:green">**JMap.Service.*Map*.getRendered*JMap*LayerIds**</span>
    - JMap.Data.getStore => <span style="color:green">**JMap.Api.get*Data*.Store**</span>
 - Function having result changed :
    - <span style="color:green">**JMap.Service.Map.getLayersVisibilityStatus**</span> :
      - before was : { 1: { isVisible: true, userVisibility: true, mapVisibility: true }, 2: ... }
      - now is : { 1: { **is*Rendered***: true, **visibility*Property***: true, ***scale*Visibility**: true }, 2: ... }
        - => isVisible changed for isRendered
        - => userVisibility changed for visibilityProperty
        - => mapVisibility changed for scaleVisibility
 - Startup option changed :
    - <span style="color:green">**JMAP_API_OPTIONS.session.user**</span> :
      - Properties *firstName* and *lastName* fusioned into one property named <span style="color:green">**fullName**</span>
      - Property *login* changed for <span style="color:green">**username**</span>