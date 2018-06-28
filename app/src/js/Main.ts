require(["esri/Map", "esri/views/MapView", "dojo/domReady!"], function(
  Map,
  MapView
) {
  const map = new Map({
    basemap: "topo"
  });
  const view = new MapView({
    container: "viewDiv",
    map
  });
});
