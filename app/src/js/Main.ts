require([
  "esri/WebMap",
  "esri/views/MapView",
  "app/PortalWidget/PortalInfo",
  "dojo/domReady!"
], function(WebMap, MapView, PortalInfo) {
  const map = new WebMap({
    portalItem: {
      id: "e691172598f04ea8881cd2a4adaa45ba"
    }
  });
  const portalInfoContainer = document.createElement("div");
  const portalInfoWidget = new PortalInfo({
    container: portalInfoContainer
  });
  const view = new MapView({
    container: "viewDiv",
    map
  });
  view.ui.add(portalInfoWidget, "top-right");
});
