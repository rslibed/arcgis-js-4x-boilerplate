require([
  "esri/WebMap",
  "esri/views/MapView",
  "esri/widgets/Legend",
  "esri/widgets/Expand",
  "esri/widgets/Search",
  "app/Sketch/SketchWidget",
  "esri/layers/GraphicsLayer", // Be sure to point directly to JS file
  "dojo/domReady!"
], function(
  WebMap,
  MapView,
  Legend,
  Expand,
  Search,
  SketchWidget,
  GraphicsLayer
) {
  const graphicsLayer = new GraphicsLayer();
  const webmap = new WebMap({
    portalItem: {
      id: "1354d582ae87490dbb3fbaf4010e58f6"
    },
    layers: [graphicsLayer]
  });
  const view = new MapView({
    map: webmap,
    container: "viewDiv"
  });
  const legend = new Legend({
    view
  });
  const legendNode = document.createElement("div");
  const legendExpand = new Expand({
    container: legendNode,
    content: legend
  });
  const search = new Search({
    view
  });
  const sketchContainer = document.createElement("div");
  const sketch = new SketchWidget({
    container: sketchContainer,
    view,
    layer: graphicsLayer
  });
  const group = [sketch, legendExpand];
  view.ui.add(group, "top-right");
});
