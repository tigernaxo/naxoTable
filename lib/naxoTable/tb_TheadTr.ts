import naxoDom from "../naxoDom";
import { TheadTrTh } from "./tb_TheadTrTh";
import naxoTable from ".";

export namespace TheadTr {
  export function getDom(table: naxoTable) {
    let el = naxoDom.getDom(
      Object.assign({ name: "tr", attrs: { ...table.config.attrs["tr"] } })
    );
    for (let colName in table.config.columns) {
      el.appendChild(TheadTrTh.getDom(table, colName));
    }
    return el;
  }
}
