import naxoDom from "./naxoDom";
import naxoForm from "./naxoForm";
import naxoTable from "./naxoTable";

declare global {
  interface Window {
    naxoDom: any;
    naxoForm: any;
    naxoTable: any;
  }
}
window.naxoDom = naxoDom;
window.naxoForm = naxoForm;
window.naxoTable = naxoTable;
