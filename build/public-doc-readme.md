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
    - **[[JMap.Service.User.getFullName]]**
    - **[[JMap.Service.Layer.getLayerIds]]**
    - **[[JMap.Service.Map.isLayerRendered]]**
 - Function removed :
    - <span style="color:red">**JMap.Data.User.getFirstName**</span> (replaced by [[JMap.Service.User.getFullName]])
    - <span style="color:red">**JMap.Data.User.getLastName**</span> (replaced by [[JMap.Service.User.getFullName]])
    - <span style="color:red">**JMap.Service.Language.translate**</span> (no replacement)
    - <span style="color:red">**JMap.Data.Layer.getLayerTree**</span> (instead use [[JMap.Service.Layer.getLayerTree]])
    - <span style="color:red">**JMap.Data.Layer.exists**</span> (instead use [[JMap.Service.Layer.exists]])
    - <span style="color:red">**JMap.Data.Layer.getById**</span> (instead use [[JMap.Service.Layer.getById]])
    - <span style="color:red">**JMap.Data.Layer.getName**</span> (instead use [[JMap.Service.Layer.getName]])
    - <span style="color:red">**JMap.Data.Layer.getDescription**</span> (instead use [[JMap.Service.Layer.getDescription]])
    - <span style="color:red">**JMap.Data.Layer.isVisible**</span> (instead use [[JMap.Service.Layer.isVisible]])
    - <span style="color:red">**JMap.Data.Api.getMapImplementation**</span> (instead use [[JMap.Service.Map.getImplementation]])
    - <span style="color:red">**JMap.Data.Photo.isPopupOpened**</span> (no replacement)
    - <span style="color:red">**JMap.Data.Photo.isPopupInfoPanelOpened**</span> (no replacement)
    - <span style="color:red">**JMap.Data.Photo.getPhotoDescriptors**</span> (no replacement)
    - <span style="color:red">**JMap.Data.Photo.getSelectedPhotoId**</span> (no replacement)
 - Function moved :
    - JMap.Service.Language.getLocale() => <span style="color:green">**JMap.Service.*User*.getLocale**</span>
    - JMap.Service.Api.setMode => <span style="color:green">**JMap.*Application*.setMode**</span>
    - JMap.Data.Api.getMode => <span style="color:green">**JMap.*Application*.getMode**</span>
    - JMap.Data.Application.getDomContainerId => <span style="color:green">**JMap.*Application*.getDomContainerId**</span>
    - JMap.Data.Project.getId => <span style="color:green">**JMap.*Service*.Project.getId**</span>
    - JMap.Data.Project.getName => <span style="color:green">**JMap.*Service*.Project.getName**</span>
    - JMap.Data.Project.getDescription => <span style="color:green">**JMap.*Service*.Project.getDescription**</span>
    - JMap.Data.Project.getProjection => <span style="color:green">**JMap.*Service*.Project.getProjection**</span>
    - JMap.Data.Project.getInitialRotation => <span style="color:green">**JMap.*Service*.Project.getInitialRotation**</span>
    - JMap.Data.Project.getInitialExtent => <span style="color:green">**JMap.*Service*.Project.getInitialExtent**</span>
    - JMap.Data.Layer.getLayerTreeElementsById => <span style="color:green">**JMap.*Service*.Layer.getLayerTreeElementsById**</span>
    - JMap.Data.Layer.getLayers => <span style="color:green">**JMap.*Service*.Layer.getLayers**</span>
    - JMap.Data.Layer.getLayerIds => <span style="color:green">**JMap.*Service*.Layer.getLayerIds**</span>
    - JMap.Data.Layer.getSelfOrChildren => <span style="color:green">**JMap.*Service*.Layer.getSelfOrChildren**</span>
    - JMap.Data.Layer.getStyle => <span style="color:green">**JMap.*Service*.Layer.getStyle**</span>
    - JMap.Data.Layer.getSimpleSelectionStyle => <span style="color:green">**JMap.*Service*.Layer.getSimpleSelectionStyle**</span>
    - JMap.Data.Layer.getSelectionStyle => <span style="color:green">**JMap.*Service*.Layer.getSelectionStyle**</span>
    - JMap.Data.Layer.getAllThematicsForLayer => <span style="color:green">**JMap.*Service*.Layer.getAllThematicsForLayer**</span>
    - JMap.Data.Layer.getThematicById => <span style="color:green">**JMap.*Service*.Layer.getThematicById**</span>
    - JMap.Data.Layer.hasVisibleThematics => <span style="color:green">**JMap.*Service*.Layer.hasVisibleThematics**</span>
    - JMap.Data.Layer.getVisibleThematics => <span style="color:green">**JMap.*Service*.Layer.getVisibleThematics**</span>
    - JMap.Data.Map.getDomContainerId => <span style="color:green">**JMap.*Service*.Map.getDomContainerId**</span>
    - JMap.Data.Map.getImplementation => <span style="color:green">**JMap.*Service*.Map.getImplementation**</span>
    - JMap.Data.Map.isMapLoaded => <span style="color:green">**JMap.*Service*.Map.isMapLoaded**</span>
    - JMap.Data.Map.getCenter => <span style="color:green">**JMap.*Service*.Map.getCenter**</span>
    - JMap.Data.Map.getZoom => <span style="color:green">**JMap.*Service*.Map.getZoom**</span>
    - JMap.Data.Map.getScale => <span style="color:green">**JMap.*Service*.Map.getScale**</span>
    - JMap.Data.Map.getBaseMap => <span style="color:green">**JMap.*Service*.Map.getBaseMap**</span>
    - JMap.Data.Map.getSelectedFeatures => <span style="color:green">**JMap.*Service*.Map.*Selection*.getSelectedFeatures**</span>
    - JMap.Data.Map.getSelectedFeaturesForLayer => <span style="color:green">**JMap.*Service*.Map.*Selection*.getSelectedFeaturesForLayer**</span>
    - JMap.Data.Map.getSelectedFeatureIdsForLayer => <span style="color:green">**JMap.*Service*.Map.*Selection*.getSelectedFeatureIdsForLayer**</span>
    - JMap.Data.User.getToken => <span style="color:green">**JMap.*Service*.User.getToken**</span>
    - JMap.Data.User.getFullName => <span style="color:green">**JMap.*Service*.User.getFullName**</span>
    - JMap.Data.User.getUsername => <span style="color:green">**JMap.*Service*.User.getUsername**</span>
 - Functions renamed :
    - JMap.Service.Layer.setGroupOpen => <span style="color:green">**JMap.Service.Layer.set*Layer*Group*Expansion***</span>
    - JMap.Data.User.getLogin => <span style="color:green">**JMap.Service.User.get*Username***</span>
    - JMap.Service.Map.Interaction.getAllInteractorDescriptors() => <span style="color:green">**JMap.Service.Map.Interaction.getAllInteractor*Id*s**</span>
    - JMap.Service.Map.Interaction.getActiveInteractorDescriptor() => <span style="color:green">**JMap.Service.Map.Interaction.getActiveInteractor*Id***</span>
 - Functions moved and renamed :
    - JMap.Data.Api.getAllMode => <span style="color:green">**JMap.*Application*.getAllMode*s***</span>
    - JMap.Data.Project.getScaleMin => <span style="color:green">**JMap.*Service*.Project.get*MinScale***</span>
    - JMap.Data.Project.getScaleMax => <span style="color:green">**JMap.*Service*.Project.get*MaxScale***</span>
    - JMap.Data.Project.getColorSelection => <span style="color:green">**JMap.*Service*.Project.get*SelectionColor***</span>
    - JMap.Data.Project.getColorBackground => <span style="color:green">**JMap.*Service*.Project.get*BackgroundColor***</span>
    - JMap.Data.Layer.getRenderedLayers => <span style="color:green">**JMap.*Service*.Layer.get*Layers***</span>
    - JMap.Service.Layer.getRenderedLayerIds => <span style="color:green">**JMap.Service.*Map*.getRendered*JMap*LayerIds**</span>
    - JMap.Data.getStore => <span style="color:green">**JMap.Api.get*Data*.Store**</span>
    - JMap.Data.Application.isSidePanelOpen => <span style="color:green">**JMap.*Application.UI.*SidePanel.isOpen**</span>
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

**V0.2.5 => V0.2.7**

 - Function removed :
    - <span style="color:red">**JMap.Application.setMode**</span> (no replacement)
    - <span style="color:red">**JMap.Application.getMode**</span> (no replacement)
    - <span style="color:red">**JMap.Application.getAllModes**</span> (no replacement)
    - <span style="color:red">**JMap.Application.getDomContainerId**</span> (no replacement)
    - <span style="color:red">**JMap.Application.startIfNeeded**</span> (no replacement)
    - <span style="color:red">**JMap.Application.start**</span> (no replacement)
    - <span style="color:red">**JMap.Application.UI.SidePanel.setVisible**</span> (no replacement)
    - <span style="color:red">**JMap.Application.UI.SidePanel.isOpen**</span> (no replacement)
    - <span style="color:red">**JMap.Application.UI.SidePanel.open**</span> (no replacement)
    - <span style="color:red">**JMap.Application.UI.SidePanel.close**</span> (no replacement)

**V0.2.7 => V0.2.8**

 - Function added :
    - **[[JMap.Service.Map.getExtent]]**

 - Function having result changed :
    - <span style="color:green">**JMap.Service.Map.getLayersVisibilityStatus**</span> :
      - before was : { 1: { isRendered: true, visibilityProperty: true, scaleVisibility: true }, 2: ... }
      - now is : { 1: { isRendered: true, visibilityProperty: true, scaleVisibility: true, ***extentVisibility***: true }, 2: ... }
        - => extentVisibility property added