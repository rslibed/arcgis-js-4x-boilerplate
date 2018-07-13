require([
    "esri/WebMap",
    "esri/views/MapView",
    "esri/widgets/Expand",
    "app/SketchWidget/SketchWidget",
    "esri/layers/GraphicsLayer",
    "dojo/domReady!"
], function (Map, MapView, Expand, SketchWidget, GraphicsLayer) {
    var graphicsLayer = new GraphicsLayer();
    var map = new Map({
        basemap: "streets",
        layers: [graphicsLayer]
    });
    var view = new MapView({
        map: map,
        container: "viewDiv"
    });
    var sketchContainer = document.createElement("div");
    var sketch = new SketchWidget({
        container: sketchContainer,
        view: view,
        layer: graphicsLayer
    });
    var sketchNode = document.createElement("div");
    var sketchExpand = new Expand({
        container: sketchNode,
        content: sketch,
        expanded: true
    });
    view.ui.add(sketchExpand, "top-right");
});
//# sourceMappingURL=Main.js.map