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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "esri/widgets/Sketch/SketchViewModel", "esri/core/accessorSupport/decorators", "esri/Graphic", "esri/widgets/Widget", "esri/widgets/support/widget"], function (require, exports, __extends, __decorate, SketchViewModel, decorators_1, Graphic, Widget, widget_1) {
    "use strict";
    var CSS = {
        icons: {
            widgetIcon: ""
        }
    };
    var Sketch = /** @class */ (function (_super) {
        __extends(Sketch, _super);
        function Sketch() {
            //----------------------------------
            //
            //  Properties
            //
            //----------------------------------
            var _this = _super !== null && _super.apply(this, arguments) || this;
            //----------------------------------
            //
            //  view
            //
            //----------------------------------
            _this.view = null;
            //----------------------------------
            //
            //  iconClass
            //
            //----------------------------------
            _this.iconClass = CSS.icons.widgetIcon;
            _this.editGraphic = null;
            _this.layer = null;
            //----------------------------------
            //
            //  viewModel
            //
            //----------------------------------
            _this.viewModel = new SketchViewModel({
                view: _this.view,
                pointSymbol: {
                    type: "simple-marker",
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
                    type: "simple-line",
                    color: "#8A2BE2",
                    width: "4",
                    style: "dash"
                },
                polygonSymbol: {
                    type: "simple-fill",
                    color: "rgba(138,43,226, 0.8)",
                    style: "solid",
                    outline: {
                        // autocasts as new SimpleLineSymbol()
                        color: "white",
                        width: 1
                    }
                }
            });
            return _this;
        }
        //----------------------------------
        //
        //  Public Methods
        //
        //----------------------------------
        Sketch.prototype.postInitialize = function () {
            var _this = this;
            console.log(this.viewModel);
            this.viewModel.on("create-complete", function (event) {
                var graphic = new Graphic({
                    geometry: event.geometry,
                    symbol: _this.viewModel.graphic
                });
                _this.layer.add(graphic);
            });
            this.viewModel.on("update-complete", function (event) {
                // event.graphic is the graphic that user clicked on and its geometry
                // has not been changed. Update its geometry and add it to the layer
                event.graphic.geometry = event.geometry;
                _this.layer.add(event.graphic);
                _this.editGraphic = null;
            });
        };
        Sketch.prototype.render = function () {
            return (widget_1.tsx("div", { class: "esri-sketch" },
                widget_1.tsx("h1", { class: "esri-sketch__header" }, "Sketch"),
                widget_1.tsx("hr", { class: "esri-sketch__hr" }),
                widget_1.tsx("ul", { class: "esri-sketch__base" },
                    widget_1.tsx("div", { class: "esri-sketch__sketch-item" },
                        widget_1.tsx("div", { bind: this, onclick: this._drawPoint, role: "button", class: "esri-sketch__icon-container" },
                            widget_1.tsx("span", { class: "esri-sketch__esri-icon esri-icon-radio-checked" }))),
                    widget_1.tsx("div", { class: "esri-sketch__sketch-item" },
                        widget_1.tsx("div", { bind: this, onclick: this._drawLine, role: "button", class: "esri-sketch__icon-container" },
                            widget_1.tsx("span", { class: "esri-sketch__esri-icon esri-icon-polyline" }))),
                    widget_1.tsx("div", { class: "esri-sketch__sketch-item" },
                        widget_1.tsx("div", { bind: this, onclick: this._drawPolygon, role: "button", class: "esri-sketch__icon-container" },
                            widget_1.tsx("span", { class: "esri-sketch__esri-icon esri-icon-polygon" }))),
                    widget_1.tsx("div", { class: "esri-sketch__sketch-item" },
                        widget_1.tsx("div", { bind: this, onclick: this._delete, role: "button", class: "esri-sketch__icon-container" },
                            widget_1.tsx("span", { class: "esri-sketch__esri-icon esri-icon-trash" }))))));
        };
        Sketch.prototype._drawPoint = function () {
            this.viewModel.create("point");
        };
        Sketch.prototype._drawLine = function () {
            this.viewModel.create("polyline");
        };
        Sketch.prototype._drawPolygon = function () {
            this.viewModel.create("polygon");
        };
        Sketch.prototype._delete = function () {
            this.viewModel.reset();
            this.layer.removeAll();
        };
        __decorate([
            decorators_1.aliasOf("viewModel.view")
        ], Sketch.prototype, "view", void 0);
        __decorate([
            decorators_1.property()
        ], Sketch.prototype, "iconClass", void 0);
        __decorate([
            decorators_1.property()
        ], Sketch.prototype, "editGraphic", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.layer")
        ], Sketch.prototype, "layer", void 0);
        __decorate([
            widget_1.renderable(["viewModel.state"]),
            decorators_1.property({
                type: SketchViewModel
            })
        ], Sketch.prototype, "viewModel", void 0);
        Sketch = __decorate([
            decorators_1.subclass("Sketch")
        ], Sketch);
        return Sketch;
    }(decorators_1.declared(Widget)));
    return Sketch;
});
//# sourceMappingURL=SketchWidget.js.map