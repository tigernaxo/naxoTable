- [naxoDom](#naxodom)
  - [將 Html 解析為 Dom](#將-html-解析為-dom)
  - [從 js 物件產生 Dom](#從-js-物件產生-dom)
  - [為 Dom 套用屬性](#為-dom-套用屬性)

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
## 將 Html 解析為 Dom
```js
let el = naxoDom.parse(`<div></div>`)
el
// <div></div>
```
## 從 js 物件產生 Dom
```js
let obj = {
  name: 'div',
  attrs: {
    class:[ 'spinner-border', 'text-primary' ], 
    role: 'status', 
    'v-data': '' 
  }
}
let el = naxoDom.getDom(obj)
el
/*  
<div class="spinner-border text-primary" role="status" v-data>
</div>
*/
```
## 為 Dom 套用屬性
接收一個屬性物件，可以是 string 或 string array，如果是 string array 會自動串接成以空白字元分隔的字串。  
- 清單陣列：會變成以空白字元分隔的屬性。
- 字串：直接成為屬性值。
- 空字串：用來設定沒有值的屬性，例如`<div v-data><div>`。

```js
let attrs = {
  class:[ 'spinner-border', 'text-primary' ], 
  role: 'status', 
  'v-data': '' 
  }
let el = naxoDom.parse(`
  <div>
    <span class="visually-hidden">Loading...</span>
  </div>
`)
naxoDom.applyAttrs(el, attrs)
el
/*  
產生一個在 bootstrap5 轉圈圈的 spinner
這裡 v-data 只是演示用，沒有實質作用
<div class="spinner-border text-primary" role="status" v-data>
    <span class="visually-hidden">Loading...</span>
</div>
*/
```