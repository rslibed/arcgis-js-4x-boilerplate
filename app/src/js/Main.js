require([
    "esri/WebMap",
    "esri/views/MapView",
    "esri/widgets/Legend",
    "esri/widgets/Expand",
    "esri/widgets/Search",
    "app/Sketch/SketchWidget",
    "esri/layers/GraphicsLayer",
    "dojo/domReady!"
], function (WebMap, MapView, Legend, Expand, Search, SketchWidget, GraphicsLayer) {
    var graphicsLayer = new GraphicsLayer();
    var webmap = new WebMap({
        portalItem: {
            id: "1354d582ae87490dbb3fbaf4010e58f6"
        },
        layers: [graphicsLayer]
    });
    var view = new MapView({
        map: webmap,
        container: "viewDiv"
    });
    var legend = new Legend({
        view: view
    });
    var legendNode = document.createElement("div");
    var legendExpand = new Expand({
        container: legendNode,
        content: legend
    });
    var search = new Search({
        view: view
    });
    var sketchContainer = document.createElement("div");
    var sketch = new SketchWidget({
        container: sketchContainer,
        view: view,
        layer: graphicsLayer
    });
    var group = [sketch, legendExpand];
    view.ui.add(group, "top-right");
});
//# sourceMappingURL=Main.js.map