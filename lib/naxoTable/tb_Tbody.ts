import naxoDom from "../naxoDom";
import { TbodyTr } from "./tb_TbodyTr";
import naxoTable from "./index";

export namespace Tbody {
  export function getDom(table: naxoTable): HTMLElement {
    let el: HTMLElement = naxoDom.getDom(
      Object.assign({ name: "tbody", attrs: { ...table.config.attrs["tody"] } })
    );
    table.rows.length + 1;
    for (let rowIdx = 0; rowIdx < table.rows.length; rowIdx++) {
      el.appendChild(TbodyTr.getDom(table, rowIdx));
    }
    // table.rows.forEach((row, rowIdx) => {
    // });
    return el;
  }
}
