/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

// esri.core
import Handles = require("esri/core/Handles");
import watchUtils = require("esri/core/watchUtils");

// esri.core.accessorSupport
import {
  subclass,
  declared,
  property
} from "esri/core/accessorSupport/decorators";

// esri.Graphic
import Graphic = require("esri/Graphic");

import SketchViewModel = require("esri/widgets/Sketch/SketchViewModel");

@subclass("CustomSketchViewModel")
class CustomSketchViewModel extends declared(SketchViewModel) {
  //----------------------------------
  //
  //  Lifecycle
  //
  //----------------------------------
  initialize() {
    this._handles.add([
      watchUtils.whenTrue(this, "view.ready", () => {
        this._setUpClickHandler();
      }),
      this.on("create-complete", event => {
        const graphic = new Graphic({
          geometry: event.geometry,
          symbol: this.graphic.symbol
        });
        this.layer.add(graphic);
      }),
      this.on("update-complete", event => {
        // event.graphic is the graphic that user clicked on and its geometry
        // has not been changed. Update its geometry and add it to the layer
        event.graphic.geometry = event.geometry;
        this.layer.add(event.graphic);
        this.editGraphic = null;
      }),
      this.on("update-cancel", event => {
        // event.graphic is the graphic that user clicked on and its geometry
        // has not been changed. Update its geometry and add it to the layer
        event.graphic.geometry = event.geometry;
        this.layer.add(event.graphic);
        this.editGraphic = null;
      })
    ]);
  }

  destroy() {
    this._handles.removeAll();
    this._handles = null;
    this.view = null;
  }

  //----------------------------------
  //
  //  Private Variables
  //
  //----------------------------------

  // Handles
  private _handles: Handles = new Handles();

  //----------------------------------
  //
  //  Properties
  //
  //----------------------------------

  //----------------------------------
  //
  //  editGraphic - readyOnly
  //
  //----------------------------------

  @property() editGraphic: any = null;

  //----------------------------------
  //
  //  Private Methods
  //
  //----------------------------------

  private _setUpClickHandler() {
    this.view.on("click", event => {
      this.view.hitTest(event).then(response => {
        const results = response.results;
        // Found a valid graphic
        if (results.length && results[results.length - 1].graphic) {
          // Check if we're already editing a graphic
          if (!this.editGraphic) {
            // Save a reference to the graphic we intend to update
            this.set("editGraphic", results[results.length - 1].graphic);
            // Remove the graphic from the GraphicsLayer
            // Sketch will handle displaying the graphic while being updated
            this.layer.remove(this.editGraphic);
            this.update(this.editGraphic);
          }
        }
      });
    });
  }
}

export = CustomSketchViewModel;
