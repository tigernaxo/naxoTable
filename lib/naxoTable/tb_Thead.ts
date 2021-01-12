import naxoDom from "../naxoDom";
import { TheadTr } from "./tb_TheadTr";
import naxoTable from ".";

export namespace Thead {
  export function getDom(table: naxoTable) {
    let el: HTMLElement = naxoDom.getDom(
      (<any>Object).assign({
        name: "thead",
        attrs: { ...table.config.attrs["thead"] },
      })
    );
    el.appendChild(TheadTr.getDom(table));
    return el;
  }
}
