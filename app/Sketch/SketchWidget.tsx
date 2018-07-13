/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

// dojo
import SketchViewModel = require("esri/widgets/Sketch/SketchViewModel");

// esri.core.accessorSupport
import {
  subclass,
  declared,
  property,
  aliasOf
} from "esri/core/accessorSupport/decorators";

// esri.views
import MapView = require("esri/views/MapView");
import SceneView = require("esri/views/SceneView");

import Graphic = require("esri/Graphic");
import GraphicsLayer = require("esri/layers/GraphicsLayer");

// esri.widgets
import Widget = require("esri/widgets/Widget");

//esri.widgets.support
import { renderable, tsx } from "esri/widgets/support/widget";

const CSS = {
  icons: {
    widgetIcon: ""
  }
};

@subclass("Sketch")
class Sketch extends declared(Widget) {
  //----------------------------------
  //
  //  Properties
  //
  //----------------------------------

  //----------------------------------
  //
  //  view
  //
  //----------------------------------

  @aliasOf("viewModel.view") view: MapView | SceneView = null;

  //----------------------------------
  //
  //  iconClass
  //
  //----------------------------------

  @property() iconClass = CSS.icons.widgetIcon;

  @property() editGraphic: any = null;

  @aliasOf("viewModel.layer") layer: GraphicsLayer = null;

  //----------------------------------
  //
  //  viewModel
  //
  //----------------------------------
  @renderable(["viewModel.state"])
  @property({
    type: SketchViewModel
  })
  viewModel: SketchViewModel = new SketchViewModel({
    view: this.view,
    pointSymbol: {
      type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
      style: "circle",
      color: "white",
      size: "16px",
      outline: {
        // autocasts as new SimpleLineSymbol()
        color: "black",
        width: 3
      }
    },
    polylineSymbol: {
      type: "simple-line", // autocasts as new SimpleMarkerSymbol()
      color: "#8A2BE2",
      width: "4",
      style: "dash"
    },
    polygonSymbol: {
      type: "simple-fill", // autocasts as new SimpleMarkerSymbol()
      color: "rgba(138,43,226, 0.8)",
      style: "solid",
      outline: {
        // autocasts as new SimpleLineSymbol()
        color: "white",
        width: 1
      }
    }
  });

  //----------------------------------
  //
  //  Public Methods
  //
  //----------------------------------

  postInitialize() {
    console.log(this.viewModel);
    this.viewModel.on("create-complete", event => {
      const graphic = new Graphic({
        geometry: event.geometry,
        symbol: this.viewModel.graphic
      });
      this.layer.add(graphic);
    });

    this.viewModel.on("update-complete", event => {
      // event.graphic is the graphic that user clicked on and its geometry
      // has not been changed. Update its geometry and add it to the layer
      event.graphic.geometry = event.geometry;
      this.layer.add(event.graphic);
      this.editGraphic = null;
    });
  }
  render() {
    return (
      <div class="esri-sketch">
        <h1 class="esri-sketch__header">Sketch</h1>
        <hr class="esri-sketch__hr" />
        <ul class="esri-sketch__base">
          <div class="esri-sketch__sketch-item">
            <div
              bind={this}
              onclick={this._drawPoint}
              role="button"
              class="esri-sketch__icon-container"
            >
              <span class="esri-sketch__esri-icon esri-icon-radio-checked" />
            </div>
          </div>
          <div class="esri-sketch__sketch-item">
            <div
              bind={this}
              onclick={this._drawLine}
              role="button"
              class="esri-sketch__icon-container"
            >
              <span class="esri-sketch__esri-icon esri-icon-polyline" />
            </div>
          </div>
          <div class="esri-sketch__sketch-item">
            <div
              bind={this}
              onclick={this._drawPolygon}
              role="button"
              class="esri-sketch__icon-container"
            >
              <span class="esri-sketch__esri-icon esri-icon-polygon" />
            </div>
          </div>
          <div class="esri-sketch__sketch-item">
            <div
              bind={this}
              onclick={this._delete}
              role="button"
              class="esri-sketch__icon-container"
            >
              <span class="esri-sketch__esri-icon esri-icon-trash" />
            </div>
          </div>
        </ul>
      </div>
    );
  }

  private _drawPoint() {
    this.viewModel.create("point");
  }
  private _drawLine() {
    this.viewModel.create("polyline");
  }
  private _drawPolygon() {
    this.viewModel.create("polygon");
  }
  private _delete() {
    this.viewModel.reset();
    this.layer.removeAll();
  }
}

export = Sketch;
