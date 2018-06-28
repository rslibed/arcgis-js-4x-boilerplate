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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "esri/widgets/Widget", "./Portal/PortalInfoViewModel", "dojo/i18n!./nls/resources", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget"], function (require, exports, __extends, __decorate, Widget, PortalInfoViewModel, i18n, decorators_1, widget_1) {
    "use strict";
    var CSS = {
        main: "esri-main",
        headings: {
            mainHeading: "main-heading",
            summaryHeading: "summary-heading"
        },
        body: {
            main: "main"
        }
    };
    var PortalInfo = /** @class */ (function (_super) {
        __extends(PortalInfo, _super);
        function PortalInfo() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // VIEW MODEL
            _this.viewModel = new PortalInfoViewModel();
            return _this;
        }
        PortalInfo.prototype.render = function () {
            return (widget_1.tsx("div", { class: CSS.main },
                widget_1.tsx("h1", { class: CSS.headings.mainHeading }, i18n.heading),
                widget_1.tsx("div", { class: CSS.body.main },
                    widget_1.tsx("h2", { class: CSS.body.main }, i18n.summary))));
        };
        __decorate([
            widget_1.renderable(["viewModel.state"]),
            decorators_1.property({
                type: PortalInfoViewModel
            })
        ], PortalInfo.prototype, "viewModel", void 0);
        PortalInfo = __decorate([
            decorators_1.subclass("PortalInfo")
        ], PortalInfo);
        return PortalInfo;
    }(decorators_1.declared(Widget)));
    return PortalInfo;
});
//# sourceMappingURL=PortalInfo.js.map