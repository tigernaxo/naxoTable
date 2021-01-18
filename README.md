# QuickStart
## Dependency
這個版本依賴 Bootstrap5
## Release
## Compile
依照下列步驟使用 vite 進行編譯：
```bash
git clone https://github.com/tigernaxo/naxoTable.git
cd naxoTable
npm i
npm run build
```
# Usage
## naxoDom
方便用於 Dom 操作所製作的類別，主要功能：
### 從Html解析Dom
將文字解析為 DOM 物件
```js
let el = naxoDom.parse(`<div></div>`)
el
// <div></div>
```
### 套用屬性
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
/*  這是一個在 bootstrap5 轉圈圈的 spinner
<div class="spinner-border text-primary" role="status">
    <span class="visually-hidden">Loading...</span>
</div>
*/
```
## naxoForm
方便用於表單操作
## naxoTable
用於繪製表格、以自定義 ajax 和後端交換資料

# Example