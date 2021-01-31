- [QuickStart](#quickstart)
  - [Dependency](#dependency)
  - [Release](#release)
  - [Compile](#compile)
- [naxoDom](#naxodom)
  - [parse(html)](#parsehtml)
  - [getDom(obj)](#getdomobj)
  - [applyAttrs(el, attrs)](#applyattrsel-attrs)
- [naxoForm](#naxoform)
  - [naxoForm(id|dom)](#naxoformiddom)
  - [GetData() 取得表單資料(Object)](#getdata-取得表單資料object)
  - [GetFormData()](#getformdata)
  - [Clear()](#clear)
  - [Load(obj)](#loadobj)
  - [Validate()](#validate)
  - [ValidateReset()](#validatereset)
- [naxoTable](#naxotable)
  - [naxoTable 屬性](#naxotable-屬性)
    - [bindDom](#binddom)
    - [config](#config)
    - [rows](#rows)
  - [naxoTable 方法](#naxotable-方法)
    - [naxoTable(id)](#naxotableid)
    - [Conf(obj)](#confobj)
    - [render()](#render)
    - [benchmark()](#benchmark)

# QuickStart
觀看範例吧(需要安裝 [nodejs](https://nodejs.org/en/))：
```bash
git clone https://github.com/tigernaxo/naxoTable.git
cd naxoTable
npm i
npm run dev
```
接著打開 [http://localhost:3000/](http://localhost:3000/)，目前很簡易(程式參考 main.js)，有空會再慢慢補上。
## Dependency
- [Bootstrap5](https://getbootstrap.com/docs/5.0/getting-started/download/)
## Release
[naxoTable 1.0.0](https://github.com/tigernaxo/naxoTable/files/5900050/naxoTable-1.0.0.zip)
## Compile
依照下列步驟使用 vite 進行編譯：
```bash
git clone https://github.com/tigernaxo/naxoTable.git
cd naxoTable
npm i
npm run build
```
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
## parse(html)
將 Html 解析為 Dom
```js
let el = naxoDom.parse(`<div></div>`)
el
// <div></div>
```
## getDom(obj)
從 js 物件產生 Dom
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
## applyAttrs(el, attrs)
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
# naxoForm
目前支援的輸入框種類：input、checkbox
## naxoForm(id|dom)
可以選擇用 dom 或 id 進行初始化。
```js
// 取得 dom 進行初始化
let f1 = new naxoForm(document.getElementById('form1'))
// 以 id 進行初始化
let f2 -= new naxoForm('form2')
```
## GetData() 取得表單資料(Object)
以 Object 形式取得表單輸入資料，可取得文字、數字、檔案
```js
let f = new naxoForm('form1')
// 取得填入的資料，目前是只要有 id 就會取 value 屬性得到 {id: value} 的物件
f.GetData()
/*
{
  input0: null, 
  input1: true, 
  input2: "abc", 
  input3: File
}
*/
```
## GetFormData() 
以 FormData 形式取得表單輸入資料
```js
let f = new naxoForm('form1')
let fd = f.GetFormData()
fd.get('input3')
/*
File {name: "test_file.txt", lastModified: 1604836034824, lastModifiedDate: Sun Nov 08 2020 19:47:14 GMT+0800 (台北標準時間), webkitRelativePath: "", size: 82, …}
*/
```
## Clear() 
表單清除輸入，清除 form 當中所有輸入，checkbox 會被設置為 false
## Load(obj) 
表單載入檔案，從給定的物件{id: value}...映射給 form 當中的 input  
## Validate()  
以 bootstrap5 內建機制驗證表單，會得到 true(驗證通過)/false(驗證不通過)
## ValidateReset()  
清除 bootstrap5 驗證後加上得類別標籤  

# naxoTable
## naxoTable 屬性
naxoDom 暴露了許多可供直接讀寫的屬性如下：
### bindDom
naxoTable 綁定的 Dom 物件
### config
config 是紀錄設置的物件，
雖然暴露出來供使用者存取，但直接指定給 config 屬性的話某些設置會無法生效，應透過 Conf() 方法設置。

columns 設定每個欄位的 title 及該欄位的渲染函式；
attrs 用來設置 html 標籤，當中的設定會映射到 table、tbody... 等屬性
(注意：無法對 table 重新設置 id)；
pagination 用來設置右下方頁碼，及點擊頁碼會發生的行為，該行為通常是跟伺服器要求資料，
將 naxoTable 的資料更新
並設置 config.pagination 裡面的頁數後再重新渲染。
```js
// 設定格式說明：
{
  columns:{
    id1:{
      title: Function | string,
      render?: Function
    },
    id2, id3, id4...
  },
  attrs: {
    tagName: { prop: Array|string, prop2: Array|string }
  },
  pagination: {
    pageNum: 10, // 總共有幾頁
    page: 5, // 目前在第幾頁
    span: 4, // 有幾個分頁按鈕
    onclick: function (page) {
      console.log(page);
    },
}
```
naxoTable 渲染函式都應回傳一個 Dom。
在渲染函式中可以用解構賦值取得一些可用物件：
- colName：正在渲染的**列名稱**
- rowIdx：正在渲染的**行 index**
- table：指向正在渲染的 **naxoTable 實例**  

**title 渲染函式**
  ```js
  function({ colName, table }){}
  ```
**render 渲染函式**
  ```js
  function ({ colName, rowIdx, table }, value) {}
  ```
### rows
以 key-value 物件組成的資料陣列，key 為 colums 中所設置的欄位名稱，舉例如下：
```js
[
  {id: 1, colId1: 1, colId2: "a" },
  {id: 2, colId1: 2, colId2: "b" }
]
```
## naxoTable 方法
### naxoTable(id)
初始化一個 naxoTable，
並設定 id 為 table1 的元素為 Table 掛接點。
```js
let t1 = new naxoDom('table1');
```
### Conf(obj)
設置 naxoTable 實例的 config 物件並套用，
若直接指定給 config 屬性的話某些設置會無法生效。
### render()
依據設置的 config 物件、資料渲染表格。
### benchmark()
指定次數渲染表格進行效能測試 ，觀察使用時間。