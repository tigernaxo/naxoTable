import './style.css'

let table = new naxoTable("tableMountPoint");
let config = {
  columns: {
    col1: {
      // 傳入渲染 title 的 function，或 text 值
      title: function (thInfo) {
        // thInfo.colName
        return naxoDom.parse("<div>第一欄<br>第一欄第二行</div>");
      },
      // 傳入渲染 title 的 function，沒有則會直接顯示值
      render: function (tdInfo, value) {
        //tdInfo.colName, tdInfo.rowIdx, tdInfo.table;
        value = parseInt(value);
        let btnClass = "btn-success";
        btnClass = value > 4 ? "btn-primary" : btnClass;
        btnClass = value > 5 ? "btn-warning" : btnClass;
        btnClass = value > 7 ? "btn-danger" : btnClass;
        let dom = naxoDom.parse(
          '<button type="button" class="btn ' + btnClass + '"></button>'
        );
        dom.addEventListener("click", function () {
          console.log(value);
        });
        return dom;
      },
    },
    col2: {
      title: "第二欄",
    },
    col3: {
      title: "第3欄",
    },
    col4: {
      title: "第4欄",
    },
  },
  pagination: {
    pageNum: 10, // 總共有幾頁
    page: 5, // 目前在第幾頁
    span: 4, // 有幾個分頁按鈕
    onclick: function (page) {
      console.log(page);
    },
  },
};
table.Conf(config);
table.rows = [
  { col1: 1, col2: 2, col3: 3, col4: 4 },
  { col1: 2, col2: 2, col3: 3, col4: 4 },
  { col1: 3, col2: 2, col3: 3, col4: 4 },
  { col1: 4, col2: 2, col3: 3, col4: 4 },
  { col1: 5, col2: 2, col3: 3, col4: 4 },
  { col1: 6, col3: 2, col3: 3, col4: 4 },
  { col1: 7, col2: 2, col3: 3, col4: 4 },
  { col1: 8, col2: 2, col3: 3, col4: 4 },
  { col1: 9, col2: 2, col3: 3, col4: 4 },
  { col1: 10, col2: 2, col3: 3, col4: 4 },
];
table.render();