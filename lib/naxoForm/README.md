# naxoForm
目前支援的輸入框種類、解析出的 type：
checkbox bool
range、number number
file file
其他：從 value 屬性取得 string
```js
// 從 html 初始化一個 naxoForm 物件
let f = new naxoForm(document.getElementById('form1'))
// 取得填入的資料，目前是只要有 id 就會取 value 屬性得到 {id: value} 的物件
f.GetData()
/*
{
  input0: null, 
  input1: true, 
  input2: "abc", 
  input3: undefined
}
*/
```
清除 form 當中所有輸入  
Clear  
從給定的物件{id: value}...指定給 form 當中的 input  
Load  
從表單中直接產生 FormData  
GetFormData  
以 bootstrap5 內建機制驗證表單  
會得到 true(驗證通過)/false(驗證不通過)
Validate()  
// 清除驗證  
ValidateReset()  
