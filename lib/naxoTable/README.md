```js
public mount() {
  let obj = this;
  let attrs = obj.config.attrs;
  let table: HTMLElement = naxoDom.getDom({ name: "table" });
  // thead
  let thead: HTMLElement = naxoDom.getDom(
    Object.assign({ name: "thead", attrs: { ...attrs["thead"] } })
  );
  // tr
  let thead_tr = naxoDom.getDom(
    Object.assign({ name: "tr", attrs: { ...attrs["tr"] } })
  );
  // th
  for (let id in obj.config.columns) {
    let config = obj.config.columns[id];
    let thead_tr_th = naxoDom.getDom(
      Object.assign({ name: "th", attrs: { ...attrs["th"] } })
    );
    // 根據是否有 render function 決定直接顯示或呼叫
    if (typeof config.title === "function") {
      thead_tr_th.appendChild(
        (<Function>config.title)({ colName: id, table: obj })
      );
    } else {
      thead_tr_th.textContent = <string>config.title;
    }
    thead_tr.appendChild(thead_tr_th);
  }
  thead.appendChild(thead_tr);

  // tbody
  let tbody: HTMLElement = naxoDom.getDom(
    Object.assign({ name: "tbody", attrs: { ...attrs["tody"] } })
  );
  obj.rows.forEach((row, rowIdx) => {
    // tr
    let tbody_tr: HTMLElement = naxoDom.getDom(
      Object.assign({ name: "tr", attrs: { ...attrs["tr"] } })
    );
    // td
    for (let id in obj.config.columns) {
      let tbody_tr_td: HTMLElement = naxoDom.getDom(
        Object.assign({ name: "td", attrs: { ...attrs["td"] } })
      );
      let config: any = obj.config.columns[id];
      // 根據是否有 render function 決定直接顯示或呼叫
      if (typeof config.render === "function") {
        tbody_tr_td.appendChild(
          config.render({ colName: id, rowIdx: rowIdx, table: obj }, row[id])
        );
      } else {
        tbody_tr_td.textContent = row[id];
      }
      tbody_tr.appendChild(tbody_tr_td);
    }
    tbody.appendChild(tbody_tr);
  });
  // pagination
  // console.log("[debug] before Pagination.getDom ");
  let pagi = Pagination.getDom(this.config.pagination);
  // console.log("[debug] after Pagination.getDom ");

  this.bindDom.innerHTML = ""; // 清空
  table.appendChild(thead);
  table.appendChild(tbody);
  this.bindDom.appendChild(table); // 掛接 tbody
  this.bindDom.appendChild(pagi); // 掛接 pagination
}
```