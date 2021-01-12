import naxoDom from "../../naxoDom";
class pn_NavUl {
  public static getDom() {
    let vDom = {
      name: "ul",
      attrs: { class: ["pagination", "justify-content-end"] },
    };
    return naxoDom.getDom(vDom);
  }
}

export { pn_NavUl };
