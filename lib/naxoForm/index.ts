export default class naxoForm {
  bindEl: HTMLFormElement;
  constructor(idOrEl: string | HTMLFormElement) {
    // 綁定 Dom
    this.bindEl =
      typeof idOrEl === "string"
        ? <HTMLFormElement>document.getElementById(<string>idOrEl)
        : idOrEl;
    // 加入驗證邏輯
    if (this.bindEl.classList.contains("needs-validation")) {
      let form = this.bindEl;
      this.bindEl.addEventListener("submit", function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      });
    }
  }
  // GetData 取得填入的資料 {id: value}
  GetData(): any {
    let data: any = {};
    this.bindEl.childNodes.forEach((el) => {
      if ((<Element>el).id) {
        data[(<Element>el).id] = naxoForm.getValue(<HTMLInputElement>el);
      }
    });
    return data;
  }
  // Clear 清除 form 當中所有輸入
  Clear(): void {
    let key: string;
    this.bindEl.childNodes.forEach((el) => {
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
    let nodes = this.bindEl.childNodes;
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
    let validity = this.bindEl.checkValidity();
    if (!validity) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.bindEl.classList.add("was-validated");
    return validity;
  }
  // clear validation
  ValidateReset(): void {
    this.bindEl.classList.remove("was-validated");
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
          value = numberIsNaNToNull(parseFloat(el.value));
          break;
        case "file":
          value = el.files[-1];
          break;
        default:
          value = stringEmptyToNull(<string>el.value);
          break;
      }
    } else if (el instanceof HTMLTimeElement) {
      value = stringEmptyToNull(<string>el.dateTime);
    } else {
      //  HTMLSelectElement|HTMLTextAreaElement 、其他種類的 input
      value = stringEmptyToNull(<string>el.value);
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
function stringEmptyToNull(str: string | null): string | null {
  if (str) {
    return str.length === 0 ? null : str;
  }
  return null;
}

function numberIsNaNToNull(num: number | null): number | null {
  if (!(<any>Number).isNaN(num)) {
    return num;
  }
  return null;
}
