import naxoDom from "../../naxoDom";
import { pn_NavUlLi } from "./pn_NavUlLi";
import { Pagination } from "./index";
import { pn_NavUl } from "./pn_NavUl";
import {
  IConfigPagination,
  IConfigPaginationHaveRest_Direct,
} from "./index";
export class pn_Nav {
  public static getDom(config: IConfigPagination): HTMLElement {
    let conf = (<any>Object).assign({ span: 5 }, { ...config });
    let vDom = {
      name: "nav",
      attrs: {
        "aria-label": ["Page", "navigation", "example"],
      },
    };
    // 計算出該顯示的 pagination 按鈕
    let haveRestBefore = Pagination.haveRest(
      (<any>Object).assign(
        { direct: IConfigPaginationHaveRest_Direct.Before },
        { ...conf }
      )
    );
    let haveRestAfter = Pagination.haveRest(
      (<any>Object).assign(
        { direct: IConfigPaginationHaveRest_Direct.After },
        { ...conf }
      )
    );
    // console.log("haveRestBefore: " + haveRestBefore);
    // console.log("haveRestAfter: " + haveRestAfter);
    let domNav = naxoDom.getDom(vDom);
    let domNavUl = pn_NavUl.getDom();
    domNav.appendChild(domNavUl);
    // 第一頁
    let pageFirst = {
      text: "首頁",
      page: 1,
      disabled: conf.page === 1,
      onclick: conf.onclick,
    };
    // 最後一頁
    let pageLast = {
      text: "末頁",
      page: conf.pageNum,
      disabled: conf.page === conf.pageNum,
      onclick: conf.onclick,
    };
    // 其餘的
    let pageRest = {
      text: "...",
      page: 1,
      disabled: true,
    };

    // 首頁按鈕
    domNavUl.appendChild(pn_NavUlLi.getDom(pageFirst));
    // 前面的 rest 按鈕
    if (haveRestBefore) {
      domNavUl.appendChild(pn_NavUlLi.getDom(pageRest));
    }
    // 入中間的按鈕
    let startPage = haveRestBefore ? conf.page - (conf.span - 1) / 2 : 1; // 起始頁
    let endPage = haveRestAfter
      ? conf.page + (conf.span - 1) / 2
      : conf.pageNum; // 結束頁
    for (let page = startPage; page <= endPage; page++) {
      domNavUl.appendChild(
        pn_NavUlLi.getDom({
          text: String(page),
          page,
          disabled: page === conf.page,
          onclick: conf.onclick,
        })
      );
    }
    // 後面的 rest 按鈕
    if (haveRestAfter) {
      domNavUl.appendChild(pn_NavUlLi.getDom(pageRest));
    }
    domNavUl.appendChild(pn_NavUlLi.getDom(pageLast));
    return domNav;
  }
}
