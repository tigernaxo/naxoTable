import naxoDom from "../../naxoDom";
import { pn_NavUlLiA } from "./pn_NavUlLiA";
import { IConfigNavUlLiA } from "./index";
class pn_NavUlLi {
  public static getDom(config: IConfigNavUlLiA): HTMLElement {
    let vDom = {
      name: "li",
      attrs: { class: ["page-item"] },
    };
    if (config.disabled) {
      vDom.attrs.class.push("disabled");
    }
    let dom = naxoDom.getDom(vDom);
    // 如果有設定 onclick 就加入按鈕事件
    // 以 pagination 按鈕代表的頁面作為參數呼叫外部傳入的 function
    if (config.onclick && !config.disabled) {
      dom.addEventListener("click", function () {
        config.onclick(config.page);
      });
    }
    dom.appendChild(pn_NavUlLiA.getDom(config));
    return dom;
  }
}

export { pn_NavUlLi };
