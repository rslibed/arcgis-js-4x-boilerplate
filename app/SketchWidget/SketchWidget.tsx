/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

// dojo
import i18n = require("dojo/i18n!./Sketch/nls/resources");

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

// esri.layers
import GraphicsLayer = require("esri/layers/GraphicsLayer");

// esri.widgets
import Widget = require("esri/widgets/Widget");

//esri.widgets.support
import { renderable, tsx } from "esri/widgets/support/widget";

import CustomSketchViewModel = require("./Sketch/SketchViewModel");

//----------------------------------
//
//  CSS Classes
//
//----------------------------------

const CSS = {
  base: "esri-sketch",
  header: {
    headerContainer: "esri-sketch__header-container",
    headerText: "esri-sketch__header"
  },
  sketchBody: {
    sketchItemContainer: "esri-sketch__sketch-item-container",
    sketchItems: {
      sketchItem: "esri-sketch__sketch-item",
      sketchIconContainer: "esri-sketch__icon-container",
      sketchIcon: "esri-sketch__esri-icon"
    }
  },
  sketchIcons: {
    point: "esri-icon-radio-checked",
    polyline: "esri-icon-polyline",
    polygon: "esri-icon-polygon",
    delete: "esri-icon-trash"
  },
  hr: "esri-sketch__hr",
  icons: {
    widgetIcon: "icon-ui-edit"
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
  //  iconClass
  //
  //----------------------------------

  @property() iconClass = CSS.icons.widgetIcon;

  //----------------------------------
  //
  //  view
  //
  //----------------------------------

  @aliasOf("viewModel.view") view: MapView | SceneView = null;

  //----------------------------------
  //
  //  layer
  //
  //----------------------------------

  @aliasOf("viewModel.layer") layer: GraphicsLayer = null;

  //----------------------------------
  //
  //  viewModel
  //
  //----------------------------------
  @renderable(["viewModel.state"])
  @property({
    type: CustomSketchViewModel
  })
  viewModel: CustomSketchViewModel = new CustomSketchViewModel();

  //----------------------------------
  //
  //  Public methods
  //
  //----------------------------------

  //----------------------------------
  //
  // Lifecycle
  //
  //----------------------------------

  render() {
    const drawItems = this._renderDrawItems();
    return (
      <div class={CSS.base}>
        <div class={CSS.header.headerContainer}>
          <h1 class={CSS.header.headerText}>{i18n.sketch}</h1>
        </div>
        <hr class={CSS.hr} />
        <div class={CSS.sketchBody.sketchItemContainer}>{drawItems}</div>
      </div>
    );
  }

  //----------------------------------
  //
  //  Private methods
  //
  //----------------------------------

  private _renderDrawItems() {
    const drawItems = [
      {
        method: this._drawPoint,
        icon: CSS.sketchIcons.point
      },
      {
        method: this._drawLine,
        icon: CSS.sketchIcons.polyline
      },
      {
        method: this._drawPolygon,
        icon: CSS.sketchIcons.polygon
      },
      {
        method: this._deleteAll,
        icon: CSS.sketchIcons.delete
      }
    ];
    return drawItems.map(item => this._renderDrawItem(item));
  }

  private _renderDrawItem(drawItem: { method: any; icon: string }) {
    return (
      <div class={CSS.sketchBody.sketchItems.sketchItem}>
        <div
          bind={this}
          onclick={drawItem.method}
          role="button"
          class={CSS.sketchBody.sketchItems.sketchIconContainer}
        >
          <span
            class={this.classes(
              CSS.sketchBody.sketchItems.sketchIcon,
              drawItem.icon
            )}
          />
        </div>
      </div>
    );
  }

  //----------------------------------
  //
  //  _drawPoint
  //
  //----------------------------------

  private _drawPoint() {
    this.viewModel.create("point", { mode: "click" });
  }

  //----------------------------------
  //
  //  _drawLine
  //
  //----------------------------------

  private _drawLine() {
    this.viewModel.create("polyline", { mode: "hybrid" });
  }

  //----------------------------------
  //
  //  _drawPolygon
  //
  //----------------------------------

  private _drawPolygon() {
    this.viewModel.create("polygon", { mode: "hybrid" });
  }

  //----------------------------------
  //
  //  _deleteAll
  //
  //----------------------------------

  private _deleteAll() {
    this.viewModel.reset();
    this.layer.removeAll();
  }
}

export = Sketch;
