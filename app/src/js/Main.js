require([
    "esri/WebMap",
    "esri/views/MapView",
    "esri/tasks/Locator",
    "esri/layers/FeatureLayer",
    "esri/widgets/Search",
    "dojo/domReady!"
], function (WebMap, MapView, Locator, FeatureLayer, Search) {
    var map = new WebMap({
        portalItem: {
            id: "18f11672eede4bfea2d5d9dd259bb41d"
        }
    });
    var view = new MapView({
        map: map,
        container: "viewDiv"
    });
    var search = new Search({
        view: view
    });
    view.ui.add(search, "top-right");
});
//# sourceMappingURL=Main.js.map