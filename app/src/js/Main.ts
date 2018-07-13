require([
  "esri/WebMap",
  "esri/views/MapView",
  "esri/widgets/Expand",
  "app/SketchWidget/SketchWidget",
  "esri/layers/GraphicsLayer", // Be sure to point directly to JS file
  "dojo/domReady!"
], function(Map, MapView, Expand, SketchWidget, GraphicsLayer) {
  const graphicsLayer = new GraphicsLayer();
  const map = new Map({
    basemap: "streets",
    layers: [graphicsLayer]
  });
  const view = new MapView({
    map: map,
    container: "viewDiv"
  });
  const sketchContainer = document.createElement("div");
  const sketch = new SketchWidget({
    container: sketchContainer,
    view,
    layer: graphicsLayer
  });
  const sketchNode = document.createElement("div");
  const sketchExpand = new Expand({
    container: sketchNode,
    content: sketch,
    expanded: true
  });
  view.ui.add(sketchExpand, "top-right");
});
