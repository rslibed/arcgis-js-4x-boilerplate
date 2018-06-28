/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />
import { subclass, declared } from "esri/core/accessorSupport/decorators";
import Accessor = require("esri/core/Accessor");
import Handles = require("esri/core/Handles");

@subclass("PortalInfoViewModel")
class PortalInfoViewModel extends declared(Accessor) {}

export = PortalInfoViewModel;
