# naxoDom
```js
{
  name: "",
  attrs:{"id":"", "class": [], ...}, // 可能是 array
  children: [],
  // 用法：
  let arr = { name: "div", attrs: { class: ["class0", "class2"] }, id: "idV" };
  let dom: HTMLElement = naxoDom.getDom(arr);
}
```
## 從Html解析Dom
```js
let el = naxoDom.parse(`<div></div>`)
el
// <div></div>
```
## 套用屬性
接收一個屬性物件，可以是 string 或 string array，如果是 string array 會自動串接成以空白字元分隔的字串。
```js
let attrs = {
  class:[ 'spinner-border', 'text-primary' ],
  role: 'status'
  }
let el = naxoDom.parse(`
  <div class="spinner-border text-primary" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
`)
naxoDom.applyAttrs(el, attrs)
el
/*  產生一個在 bootstrap5 轉圈圈的 spinner
<div class="spinner-border text-primary" role="status">
    <span class="visually-hidden">Loading...</span>
</div>
*/
```