require([
    "esri/WebMap",
    "esri/views/MapView",
    "app/PortalWidget/PortalInfo",
    "dojo/domReady!"
], function (WebMap, MapView, PortalInfo) {
    var map = new WebMap({
        portalItem: {
            id: "e691172598f04ea8881cd2a4adaa45ba"
        }
    });
    var portalInfoContainer = document.createElement("div");
    var portalInfoWidget = new PortalInfo({
        container: portalInfoContainer
    });
    var view = new MapView({
        container: "viewDiv",
        map: map
    });
    view.ui.add(portalInfoWidget, "top-right");
});
//# sourceMappingURL=Main.js.map