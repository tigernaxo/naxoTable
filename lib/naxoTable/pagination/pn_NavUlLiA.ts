import naxoDom from "../../naxoDom";
import { IConfigNavUlLiA } from "./index";
class pn_NavUlLiA {
  public static getDom(config: IConfigNavUlLiA): HTMLElement {
    let vDom = {
      name: "a",
      attrs: {
        class: ["page-link"],
        href: "#",
      },
    };
    if (config.disabled) {
      vDom.attrs["aria-disabled"] = "true";
    }
    let el = naxoDom.getDom(vDom);
    el.textContent = config.text;
    return el;
  }
}

export { pn_NavUlLiA };
