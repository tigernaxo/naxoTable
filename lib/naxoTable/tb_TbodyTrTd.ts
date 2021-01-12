import naxoDom from "../naxoDom";
import naxoTable from ".";

export namespace TbodyTrTd {
  export function getDom(
    table: naxoTable,
    rowIdx: number,
    colName: string
  ): HTMLElement {
    let config = table.config.columns[colName];
    let attrs = table.config.attrs;
    let value = table.rows[rowIdx][colName];
    let el: HTMLElement = naxoDom.getDom(
      (<any>Object).assign({ name: "td", attrs: { ...attrs["td"] } })
    );
    // 根據是否有 render function 決定直接顯示或呼叫
    if (typeof config.render === "function") {
      el.appendChild(config.render({ colName, rowIdx, table }, value));
    } else {
      el.textContent = value;
    }
    return el;
  }
}
