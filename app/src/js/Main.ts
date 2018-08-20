require([
  "esri/WebMap",
  "esri/views/MapView",
  "esri/tasks/Locator",
  "esri/layers/FeatureLayer",
  "esri/widgets/Search",
  "dojo/domReady!"
], function(WebMap, MapView, Locator, FeatureLayer, Search) {
  const map = new WebMap({
    portalItem: {
      id: "18f11672eede4bfea2d5d9dd259bb41d"
    }
  });
  const view = new MapView({
    map,
    container: "viewDiv"
  });
  const search = new Search({
    view
  });
  view.ui.add(search, "top-right");
});
