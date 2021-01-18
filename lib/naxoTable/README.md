# naxoTable
```js
<table>
  <thead>
    <tr>
      <th></th> <th></th> <th></th> ...
    </tr>
  </thead>
  <tbody>
    <tr>
      <td> </td> <td> </td> <td> </td> ...
    </tr>
  </tbody>
</table>

function ( value, params={this, rowIndex, colName}){
}

// 設定方式：
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
}
```