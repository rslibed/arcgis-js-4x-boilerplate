require(["esri/Map", "esri/views/MapView", "dojo/domReady!"], function (Map, MapView) {
    var map = new Map({
        basemap: "topo"
    });
    var view = new MapView({
        container: "viewDiv",
        map: map
    });
});
//# sourceMappingURL=Main.js.map