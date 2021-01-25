# Table Of Content
- [Table Of Content](#table-of-content)
- [naxoForm](#naxoform)
  - [初始化 naxoForm()](#初始化-naxoform)
  - [GetData() 取得表單資料(Object)](#getdata-取得表單資料object)
  - [GetFormData 取得表單資料(FormData)](#getformdata-取得表單資料formdata)
  - [表單清除輸入 Clear()](#表單清除輸入-clear)
  - [表單載入檔案 Load()](#表單載入檔案-load)
  - [驗證 Validate()](#驗證-validate)
  - [清除驗證 ValidateReset()](#清除驗證-validatereset)

# naxoForm
目前支援的輸入框種類：input、checkbox
## 初始化 naxoForm()
可以用 dom 或 id 進行初始化
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
## GetFormData 取得表單資料(FormData)
以 FormData 形式取得表單輸入資料
```js
let f = new naxoForm('form1')
let fd = f.GetFormData()
fd.get('input3')
/*
File {name: "test_file.txt", lastModified: 1604836034824, lastModifiedDate: Sun Nov 08 2020 19:47:14 GMT+0800 (台北標準時間), webkitRelativePath: "", size: 82, …}
*/
```
## 表單清除輸入 Clear() 
清除 form 當中所有輸入，checkbox 會被設置為 false
## 表單載入檔案 Load() 
從給定的物件{id: value}...映射給 form 當中的 input  
## 驗證 Validate()  
以 bootstrap5 內建機制驗證表單，會得到 true(驗證通過)/false(驗證不通過)
## 清除驗證 ValidateReset()  
清除 bootstrap5 驗證後加上得類別標籤  
