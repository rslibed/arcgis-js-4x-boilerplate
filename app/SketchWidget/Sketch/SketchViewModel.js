/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "esri/core/Handles", "esri/core/watchUtils", "esri/core/accessorSupport/decorators", "esri/Graphic", "esri/widgets/Sketch/SketchViewModel"], function (require, exports, __extends, __decorate, Handles, watchUtils, decorators_1, Graphic, SketchViewModel) {
    "use strict";
    var CustomSketchViewModel = /** @class */ (function (_super) {
        __extends(CustomSketchViewModel, _super);
        function CustomSketchViewModel() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            //----------------------------------
            //
            //  Private Variables
            //
            //----------------------------------
            // Handles
            _this._handles = new Handles();
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
            _this.editGraphic = null;
            return _this;
        }
        //----------------------------------
        //
        //  Lifecycle
        //
        //----------------------------------
        CustomSketchViewModel.prototype.initialize = function () {
            var _this = this;
            this._handles.add([
                watchUtils.whenTrue(this, "view.ready", function () {
                    _this._setUpClickHandler();
                }),
                this.on("create-complete", function (event) {
                    var graphic = new Graphic({
                        geometry: event.geometry,
                        symbol: _this.graphic.symbol
                    });
                    _this.layer.add(graphic);
                }),
                this.on("update-complete", function (event) {
                    // event.graphic is the graphic that user clicked on and its geometry
                    // has not been changed. Update its geometry and add it to the layer
                    event.graphic.geometry = event.geometry;
                    _this.layer.add(event.graphic);
                    _this.editGraphic = null;
                }),
                this.on("update-cancel", function (event) {
                    // event.graphic is the graphic that user clicked on and its geometry
                    // has not been changed. Update its geometry and add it to the layer
                    event.graphic.geometry = event.geometry;
                    _this.layer.add(event.graphic);
                    _this.editGraphic = null;
                })
            ]);
        };
        CustomSketchViewModel.prototype.destroy = function () {
            this._handles.removeAll();
            this._handles = null;
            this.view = null;
        };
        //----------------------------------
        //
        //  Private Methods
        //
        //----------------------------------
        CustomSketchViewModel.prototype._setUpClickHandler = function () {
            var _this = this;
            this.view.on("click", function (event) {
                _this.view.hitTest(event).then(function (response) {
                    var results = response.results;
                    // Found a valid graphic
                    if (results.length && results[results.length - 1].graphic) {
                        // Check if we're already editing a graphic
                        if (!_this.editGraphic) {
                            // Save a reference to the graphic we intend to update
                            _this.set("editGraphic", results[results.length - 1].graphic);
                            // Remove the graphic from the GraphicsLayer
                            // Sketch will handle displaying the graphic while being updated
                            _this.layer.remove(_this.editGraphic);
                            _this.update(_this.editGraphic);
                        }
                    }
                });
            });
        };
        __decorate([
            decorators_1.property()
        ], CustomSketchViewModel.prototype, "editGraphic", void 0);
        CustomSketchViewModel = __decorate([
            decorators_1.subclass("CustomSketchViewModel")
        ], CustomSketchViewModel);
        return CustomSketchViewModel;
    }(decorators_1.declared(SketchViewModel)));
    return CustomSketchViewModel;
});
//# sourceMappingURL=SketchViewModel.js.map