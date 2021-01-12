import naxoDom from "../naxoDom";
import naxoTable from ".";

export namespace TheadTrTh {
  export function getDom(table: naxoTable, colName: string) {
    let thead_tr_th = naxoDom.getDom(
      Object.assign({ name: "th", attrs: { ...table.config.attrs["th"] } })
    );

    // 根據是否有 render function 決定呼叫渲染函式或直接顯示所設定文字
    const title_render = table.config.columns[colName].title;
    if (typeof title_render === "function") {
      thead_tr_th.appendChild((<Function>title_render)({ colName, table }));
    } else {
      thead_tr_th.textContent = <string>title_render;
    }
    // 回傳
    return thead_tr_th;
  }
}
