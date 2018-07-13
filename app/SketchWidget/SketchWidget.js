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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "dojo/i18n!./Sketch/nls/resources", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/support/widget", "./Sketch/SketchViewModel"], function (require, exports, __extends, __decorate, i18n, decorators_1, Widget, widget_1, CustomSketchViewModel) {
    "use strict";
    //----------------------------------
    //
    //  CSS Classes
    //
    //----------------------------------
    var CSS = {
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
            //  iconClass
            //
            //----------------------------------
            _this.iconClass = CSS.icons.widgetIcon;
            //----------------------------------
            //
            //  view
            //
            //----------------------------------
            _this.view = null;
            //----------------------------------
            //
            //  layer
            //
            //----------------------------------
            _this.layer = null;
            //----------------------------------
            //
            //  viewModel
            //
            //----------------------------------
            _this.viewModel = new CustomSketchViewModel({
                pointSymbol: {
                    type: "simple-marker",
                    style: "square",
                    color: "red",
                    size: "16px",
                    outline: {
                        color: [255, 255, 0],
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
                        color: "white",
                        width: 1
                    }
                }
            });
            return _this;
        }
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
        Sketch.prototype.render = function () {
            var drawItems = this._renderDrawItems();
            return (widget_1.tsx("div", { class: CSS.base },
                widget_1.tsx("div", { class: CSS.header.headerContainer },
                    widget_1.tsx("h1", { class: CSS.header.headerText }, i18n.sketch)),
                widget_1.tsx("hr", { class: CSS.hr }),
                widget_1.tsx("div", { class: CSS.sketchBody.sketchItemContainer }, drawItems)));
        };
        //----------------------------------
        //
        //  Private methods
        //
        //----------------------------------
        Sketch.prototype._renderDrawItems = function () {
            var _this = this;
            var drawItems = [
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
            return drawItems.map(function (item) { return _this._renderDrawItem(item); });
        };
        Sketch.prototype._renderDrawItem = function (drawItem) {
            return (widget_1.tsx("div", { class: CSS.sketchBody.sketchItems.sketchItem },
                widget_1.tsx("div", { bind: this, onclick: drawItem.method, role: "button", class: CSS.sketchBody.sketchItems.sketchIconContainer },
                    widget_1.tsx("span", { class: this.classes(CSS.sketchBody.sketchItems.sketchIcon, drawItem.icon) }))));
        };
        //----------------------------------
        //
        //  _drawPoint
        //
        //----------------------------------
        Sketch.prototype._drawPoint = function () {
            this.viewModel.create("point", { mode: "click" });
        };
        //----------------------------------
        //
        //  _drawLine
        //
        //----------------------------------
        Sketch.prototype._drawLine = function () {
            this.viewModel.create("polyline", { mode: "hybrid" });
        };
        //----------------------------------
        //
        //  _drawPolygon
        //
        //----------------------------------
        Sketch.prototype._drawPolygon = function () {
            this.viewModel.create("polygon", { mode: "hybrid" });
        };
        //----------------------------------
        //
        //  _deleteAll
        //
        //----------------------------------
        Sketch.prototype._deleteAll = function () {
            this.viewModel.reset();
            this.layer.removeAll();
        };
        __decorate([
            decorators_1.property()
        ], Sketch.prototype, "iconClass", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.view")
        ], Sketch.prototype, "view", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.layer")
        ], Sketch.prototype, "layer", void 0);
        __decorate([
            widget_1.renderable(["viewModel.state"]),
            decorators_1.property({
                type: CustomSketchViewModel
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