export interface IAttrs {
  [key: string]: string|Array<string>
}
export interface IVDom {
  name: string,
  attrs?: IAttrs
}
export default class naxoDom {
  // get node/node list from html string 
  static parse(html: string): NodeListOf<ChildNode> | ChildNode {
    let tmp: HTMLTemplateElement = document.createElement("template");
    tmp.innerHTML = html.trim();
    let children: NodeListOf<ChildNode> = tmp.content.childNodes;

    if(children.length === 0) return null; 
    if(children.length === 1) return children[0]; 
    return children;
  }
  // get HTMLElement from vDom config
  static getDom(vDom: IVDom): HTMLElement {
    let el: HTMLElement = document.createElement(vDom.name);
    if (vDom.attrs) this.applyAttrs(el, vDom.attrs);
    return el;
  }
  // apply attrs on HTMLElement
  static applyAttrs( el: HTMLElement, attrs: IAttrs): void {
    Object.keys(attrs).forEach((attrName) => {
      let v = attrs[attrName]
      let attrStr = Array.isArray(v)
        ? (<Array<string>>v).join(" ")
        : <string>v
      el.setAttribute(attrName, attrStr);
    });
  }
}
