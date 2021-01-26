
- [naxoTable](#naxotable)
  - [naxoTable 屬性](#naxotable-屬性)
    - [bindDom](#binddom)
    - [config](#config)
      - [title 渲染函式](#title-渲染函式)
      - [render 渲染函式](#render-渲染函式)
    - [rows](#rows)
  - [naxoTable 方法](#naxotable-方法)
    - [naxoTable()](#naxotable-1)
    - [Conf()](#conf)
    - [渲染表格 render()](#渲染表格-render)
    - [效能測試 benchmark()](#效能測試-benchmark)

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
pagination 用來設置右下方頁碼，及點擊頁碼會發生的行為。
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
#### title 渲染函式
```js
function({ colName, table }){}
```
#### render 渲染函式
在渲染函式中可以用解構賦值取得下列物件進行參考：
 - colName：正在渲染的**列名稱**
 - rowIdx：正在渲染的**行 index**
 - table：指向正在渲染的 **naxoTable 實例**
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
### naxoTable()
初始化一個 naxoTable，
並設定 id 為 table1 的元素為 Table 掛接點。
```js
let t1 = new naxoDom('table1');
```
### Conf()
設置 naxoTable 實例的 config 物件並套用，
若直接指定給 config 屬性的話某些設置會無法生效。
### 渲染表格 render()
依據設置的 config 物件、資料渲染表格。
### 效能測試 benchmark()
指定次數渲染表格，觀察使用時間。