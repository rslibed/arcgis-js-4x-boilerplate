require([
  "esri/WebMap",
  "esri/WebScene",
  "esri/views/MapView",
  "esri/views/SceneView",
  "esri/tasks/Locator",
  "esri/layers/FeatureLayer",
  "esri/widgets/Search",
  "dojo/domReady!"
], function(
  WebMap,
  WebScene,
  MapView,
  SceneView,
  Locator,
  FeatureLayer,
  Search
) {
  // const map = new WebMap({
  //   portalItem: {
  //     id: "18f11672eede4bfea2d5d9dd259bb41d"
  //   }
  // });
  // const view = new MapView({
  //   map,
  //   container: "viewDiv"
  // });
  const map = new WebScene({
    portalItem: {
      id: "affa021c51944b5694132b2d61fe1057"
    }
  });
  const view = new SceneView({
    map,
    container: "viewDiv"
  });
  const search = new Search({
    view
  });
  view.ui.add(search, "top-right");
});
