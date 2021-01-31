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
      show: false,
      pageNum: 5,
      page: 1,
      onclick: function (page: number) {
        console.log(page);
      },
    },
  };
  rows: Array<{ [key: string]: any }> = [];
  constructor(id: string) {
    this.bindDom = document.getElementById(id);

    // 清空bindDom底下所有元素
    this.bindDom.innerHTML = '' 

    // 將 this.bindDom 掛接上 table
    let table: HTMLElement = naxoDom.getDom(
      (<any>Object).assign({ name: "table", attrs: { id } })
    );
    this.bindDom.appendChild(table);
  }

  public Conf(config: IConfig) {
    // 先刪除 config 當中指定的 table id
    if(config?.attrs?.table["id"])
    {
      delete config.attrs.table["id"];
    }
    // 加到 table 物件的設定中
    (<any>Object).assign(this.config, { ...config });
  }
  public render() {
    this.bindDom.innerHTML = ""; // 清空
    this.bindDom.appendChild(Table.getDom(this));
    if(this.config.pagination.show) {
      this.bindDom.appendChild(Pagination.getDom(this.config.pagination));
    }
  }
  public benchmark(times: number) {
    let start = Date.now();
    for (let i = 0; i < times; i++) {
      this.render();
    }
    let duration = Date.now() - start;
    console.log(
      `[benchmark] Table render ${times} times, time used: ${duration}ms`
    );
  }
}
