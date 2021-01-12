import naxoDom from "../../naxoDom";
import { pn_Nav } from "./pn_Nav";
export interface IConfigPagination {
  pageNum: number;
  page: number;
  span?: number;
  onclick: (page: number) => any;
}
export interface IConfigPaginationHaveRest extends IConfigPagination {
  direct: IConfigPaginationHaveRest_Direct;
  span: number;
}
export enum IConfigPaginationHaveRest_Direct {
  Before,
  After,
}
export interface IConfigNavUlLiA {
  text: string;
  page: number;
  disabled?: boolean;
  onclick?: Function;
}
export class Pagination extends HTMLElement {
  public static getDom(config: IConfigPagination): HTMLElement {
    // 確保 config 的 pagination 設置為合法設置
    this.setConfigLegal(config);

    let pagination = naxoDom.getDom({
      name: "div",
      attrs: { class: ["d-flex", "justify-content-end"] },
    });
    pagination.appendChild(pn_Nav.getDom(config));
    return pagination;
  }

  private static setConfigLegal(config: IConfigPagination) {
    // 設置為 config.span 奇數整數
    if (config.span) {
      config.span = Math.round(config.span);
      config.span = config.span % 2 === 0 ? config.span + 1 : config.span;
    }
    // 設置為 config.pageNum 為整數
    if (config.pageNum) {
      config.pageNum = Math.round(config.pageNum);
    }
    // 設置為 config.page 為整數
    if (config.page) {
      config.page = Math.round(config.page);
    }
  }

  public static haveRest(config: IConfigPaginationHaveRest): boolean {
    if (config.pageNum <= config.span) {
      return false;
    } else {
      return config.direct === IConfigPaginationHaveRest_Direct.Before
        ? config.page - 1 > (config.span - 1) / 2
        : config.pageNum - config.page > (config.span - 1) / 2;
    }
  }
}
export default Pagination;
