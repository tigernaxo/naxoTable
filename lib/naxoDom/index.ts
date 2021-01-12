export default class naxoDom {
  static parse(html: string): NodeListOf<ChildNode> | ChildNode {
    let tmp: HTMLTemplateElement = document.createElement("template");
    tmp.innerHTML = html.trim();
    let children: NodeListOf<ChildNode> = tmp.content.childNodes;
    switch (children.length) {
      case 0:
        return null;
      case 1:
        return children[0];
      default:
        return children;
    }
  }
  static getDom(vDom: any): HTMLElement {
    let el: HTMLElement = document.createElement(vDom.name);
    if (vDom.attrs) {
      Object.keys(vDom.attrs).map((attr) => {
        let configStr: string | string[] = vDom.attrs[attr];
        let property: string = Array.isArray(configStr)
          ? (<string[]>configStr).join(" ")
          : <string>configStr;
        el.setAttribute(attr, property);
      });
    }
    return el;
  }
  static applyAttrs(
    el: HTMLElement,
    attrObj: { [key: string]: Array<string> | string }
  ): void {
    Object.keys(attrObj).forEach((attrName) => {
      el.setAttribute(
        attrName,
        typeof attrObj[attrName] === "string"
          ? <string>attrObj[attrName]
          : (<Array<string>>attrObj[attrName]).join(" ")
      );
    });
  }
}
