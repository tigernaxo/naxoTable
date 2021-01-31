import naxoDom from "../naxoDom";
import { Thead } from "./tb_Thead";
import { Tbody } from "./tb_Tbody";
import naxoTable from ".";

export namespace Table {
  export function getDom(table: naxoTable): HTMLElement {
    let el: HTMLElement = naxoDom.getDom( 
      (<any>Object).assign({ name: "table", attrs: { ...table.config.attrs["table"] } })
    );
    el.appendChild(Thead.getDom(table));
    el.appendChild(Tbody.getDom(table));
    return el;
  }
}
