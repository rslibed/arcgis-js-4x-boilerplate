require([
  "esri/WebScene",
  "esri/views/SceneView",
  "esri/layers/SceneLayer",
  "esri/widgets/Legend",
  "dojo/domReady!"
], function(WebScene, SceneView, SceneLayer, Legend) {
  const solidEdges = {
    type: "solid",
    color: [0, 0, 0, 0.6],
    size: 1
  };

  const sketchEdges = {
    type: "sketch",
    color: [0, 0, 0, 0.4],
    size: 1.2,
    extensionLength: 6
  };

  // Create the renderer and configure visual variables
  const renderer = {
    type: "simple", // autocasts as new SimpleRenderer()
    symbol: {
      type: "mesh-3d",
      symbolLayers: [
        {
          type: "fill",
          material: {
            color: "#ffffff",
            colorMixMode: "replace"
          },
          edges: solidEdges
        }
      ]
    },
    visualVariables: [
      {
        // specifies a visual variable of continuous color
        type: "color",
        // based on a field indicating the walking time to public transport
        field: "walkTimeToStopsInService",
        legendOptions: {
          title: "Walking time to public transport"
        },
        // color ramp from white to blue
        // based on the walking time to public transport.
        // Buildings will be assigned a color proportional
        // to the min and max colors specified below
        stops: [
          {
            value: 1,
            color: "#2887a1",
            label: "less than 1 minute"
          },
          {
            value: 15,
            color: "#ffffff",
            label: "more than 15 minutes"
          }
        ]
      }
    ]
  };

  const sceneLayer = new SceneLayer({
    portalItem: {
      id: "f5c497819a374941b0ce8d9b0e979819"
    },
    renderer
  });
  const scene = new WebScene({
    portalItem: {
      id: "12d629fc946845628011f17a963373a9"
    },
    layers: [sceneLayer]
  });

  const view = new SceneView({
    map: scene,
    container: "viewDiv"
  });

  document.getElementById("edges").addEventListener("click", function(event) {
    var edges;

    if (event.target.id === "sketch") {
      edges = sketchEdges;
    } else if (event.target.id === "solid") {
      edges = solidEdges;
    } else if (event.target.id === "none") {
      edges = null;
    }
    if (event.target.checked) {
      var renderer = sceneLayer.renderer.clone();
      renderer.symbol.symbolLayers.getItemAt(0).edges = edges;
      sceneLayer.renderer = renderer;
    }
  });
  view.ui.add(document.getElementById("edges"), "top-right");
});
