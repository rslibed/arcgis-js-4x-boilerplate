/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import Widget = require("esri/widgets/Widget");
import PortalInfoViewModel = require("./Portal/PortalInfoViewModel");
import i18n = require("dojo/i18n!./nls/resources");
import {
  subclass,
  property,
  declared
} from "esri/core/accessorSupport/decorators";
import { renderable, tsx } from "esri/widgets/support/widget";

const CSS = {
  main: "esri-main",
  headings: {
    mainHeading: "main-heading",
    summaryHeading: "summary-heading"
  },
  body: {
    main: "main"
  }
};

@subclass("PortalInfo")
class PortalInfo extends declared(Widget) {
  // VIEW MODEL
  @renderable(["viewModel.state"])
  @property({
    type: PortalInfoViewModel
  })
  viewModel: PortalInfoViewModel = new PortalInfoViewModel();

  render() {
    return (
      <div class={CSS.main}>
        <h1 class={CSS.headings.mainHeading}>{i18n.heading}</h1>
        <div class={CSS.body.main}>
          <h2 class={CSS.body.main}>{i18n.summary}</h2>
        </div>
      </div>
    );
  }
}

export = PortalInfo;
