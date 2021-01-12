import naxoDom from "../naxoDom";
import { TbodyTrTd } from "./tb_TbodyTrTd";
import naxoTable from ".";

export namespace TbodyTr {
  export function getDom(table: naxoTable, rowIdx: number): HTMLElement {
    let el: HTMLElement = naxoDom.getDom(
      (<any>Object).assign({ name: "tr", attrs: { ...table.config.attrs["tr"] } })
    );
    for (let id in table.config.columns) {
      el.appendChild(TbodyTrTd.getDom(table, rowIdx, id));
    }
    return el;
  }
}
