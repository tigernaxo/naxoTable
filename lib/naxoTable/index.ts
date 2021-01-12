import naxoDom from "../naxoDom";
import Pagination from "./pagination";
import { Table } from "./tb_Table";
import { IConfigPagination } from "./pagination";
export interface IConfig {
  attrs?: IConfigAttrs;
  pagination: IConfigPagination;
  columns: IConfigColumns;
}
export interface IConfigColumns {
  [key: string]: {
    title: Function | string | number;
    render?: Function;
  };
}
export interface IConfigAttrs {
  [key: string]: { [key: string]: string | Array<string> };
}
export default class naxoTable {
  bindDom: HTMLElement;
  config: IConfig = {
    attrs: {},
    columns: {},
    pagination: {
      pageNum: 10,
      page: 2,
      onclick: function (page: number) {
        console.log(page);
      },
    },
  };
  rows: Array<{ [key: string]: any }> = [];
  constructor(id: string) {
    this.bindDom = document.getElementById(id);
    // 產生 Table element
    let table: HTMLElement = naxoDom.getDom(
      (<any>Object).assign({ name: "table", attrs: { id } })
    );

    // 把 this.bindDom 取代成 table
    // this.bindDom.parentNode.replaceChild(table, this.bindDom);
    this.bindDom.appendChild(table);
  }

  public Conf(config: IConfig) {
    // 刪除 config 當中指定的 table id
    if (config.attrs?.table?.["id"] !== undefined) {
      delete config.attrs.table["id"];
    }
    // 加到 table 物件的設定中
    (<any>Object).assign(this.config, { ...config });
    // 把 attr 應用到 table 上
    if (this.config.attrs.table) {
      naxoDom.applyAttrs(this.bindDom, this.config.attrs.table);
    }
  }
  public mount() {
    this.bindDom.innerHTML = ""; // 清空
    this.bindDom.appendChild(Table.getDom(this));
    this.bindDom.appendChild(Pagination.getDom(this.config.pagination));
  }
  public benchmark(times: number) {
    let start = Date.now();
    for (let i = 0; i < times; i++) {
      this.mount();
    }
    let duration = Date.now() - start;
    console.log(
      "[benchmark] 掛載次數：" + times + "; 使用時間：" + duration + "(毫秒)"
    );
  }
}
