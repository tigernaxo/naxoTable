// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-type
enum INPUT_TYPE {
  button="button",
  checkbox="checkbox",
  file="file",
  radio="radio",
  password="password",
  number="number",
  range="range",
  text="text",
}
export default class naxoForm {
  public ClassNeedValidation: string = "needs-validation" 
  public ClassWasValidated: string = "was-validated" 
  private static controlSelector: string = 'input,textarea,select';
  bindEl: HTMLFormElement;
  constructor(idOrEl: string | HTMLFormElement) {
    // 綁定 Dom
    this.bindEl = idOrEl instanceof HTMLFormElement
      ? idOrEl
      : <HTMLFormElement>document.getElementById(<string>idOrEl)
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement
    // check description for checkValidity() 
    if (this.bindEl.classList.contains(this.ClassNeedValidation)) {
      let form = this.bindEl;
      let classWasValidated = this.ClassWasValidated
      this.bindEl.addEventListener("submit", function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add(classWasValidated);
      });
    }
  }
  // GetData 取得填入的資料 {id: value}
  GetData(): any {
    let data: any = {};
    this.getInputElements().forEach(el=>{
      el = <Element>el
      if (el.id) {
        data[el.id] = naxoForm.getValue(<HTMLInputElement>el);
      }
    })
    return data;
  }
  // Clear 清除 form 當中所有輸入
  Clear(): void {
    let key: string;
    this.getInputElements().forEach((el) => {
      key = (<Element>el).id;
      if (key) {
        let type: string = (<HTMLElement>el).getAttribute("type");
        if (type?.toLocaleLowerCase() === "checkbox") {
          (<HTMLInputElement>el).checked = false;
        } else {
          (<HTMLInputElement>el).value = "";
        }
      }
    });
  }
  // Load 從給定的物件{id: value}...指定給 form 當中的 input
  Load(data: any): void {
    Object.keys(data).forEach((key) => {
      naxoForm.setValue(
        <HTMLInputElement>this.bindEl.querySelector("#" + key),
        data[key]
      );
    });
  }
  // GetFormData 直接產生 FormData
  GetFormData(): FormData {
    let fd: FormData = new FormData();
    let nodes: NodeListOf<Element> = this.getInputElements();
    let key: string;
    nodes.forEach((el) => {
      key = (<Element>el).id;
      if (key?.length > 0) {
        fd.set(key, <string>naxoForm.getValue(<HTMLInputElement>el));
      }
    });
    return fd;
  }
  // Validation
  Validate(): boolean {
    this.bindEl.classList.add("was-validated");
    return this.bindEl.checkValidity();
  }
  // clear validation
  ValidateReset(): void {
    this.bindEl.classList.remove("was-validated");
  }
  private  getInputElements():NodeListOf<Element>{
    return this.bindEl.querySelectorAll(naxoForm.controlSelector)
  }
  // getValue 取得 HTMLInputElement 的值
  private static getValue(
    el:
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
      | HTMLTimeElement
  ): string | boolean | number | File {
    let value: number | string | boolean | File;
    if (el instanceof HTMLInputElement) {
      switch (el.type) {
        case "checkbox":
          value = el.checked;
          break;
        case "range":
        case "number":
          value = parseFloat(el.value) || null;
          break;
        case "file":
          value = el.files[0];
          break;
        default:
          value = <string>el.value || null;
          break;
      }
    } else if (el instanceof HTMLTimeElement) {
      value = <string>el.dateTime || null;
    } else {
      //  HTMLSelectElement|HTMLTextAreaElement 、其他種類的 input
      value = <string>el.value || null;
    }
    return value;
  }
  // setValue 設置 HTMLInputElement 的值
  private static setValue(
    el: HTMLInputElement,
    value: number | boolean | string
  ): void {
    if (el.type?.toLocaleLowerCase() === "checkbox") {
      el.checked = <boolean>value;
    } else {
      el.value = <string>value;
    }
  }
}