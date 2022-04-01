import './style.css'
let data = [
  { id: 1, name: 'Taichung', time: '2021/1/30', weather: 'sunny', aqi: 39, temperature: [12, 22] },
  { id: 2, name: 'Taichung', time: '2021/1/31', weather: 'windy', aqi: 56, temperature: [13, 22] },
  { id: 3, name: 'Taichung', time: '2021/2/1', weather: 'rainy', aqi: 68, temperature: [14, 22] },
  { id: 4, name: 'Taichung', time: '2021/2/2', weather: 'sunny', aqi: 77, temperature: [16, 22] },
  { id: 5, name: 'Taichung', time: '2021/2/3', weather: 'cloudy', aqi: 108, temperature: [15, 22] },
  { id: 6, name: 'Taichung', time: '2021/2/4', weather: 'sunny', aqi: 87, temperature: [16, 22] },
]; 

let t1 = new naxoTable("tableMountPoint1");
t1.Conf( {
  columns: {
    id: { title: "id", },
    name: { title: "地名", },
    time: { title: "日期", },
    weather: { title: "天氣", },
    aqi: { title: "空氣品質", },
    temperature: { title: "氣溫", },
  },
  attrs:{
    table: {class:['table', 'table-striped', 'table-hover']},
  },
  pagination: {
    show: false
  },
});
t1.rows = data;
t1.render();


let t2 = new naxoTable("tableMountPoint2");
t2.Conf({
  columns: {
    id: { title: "id", },
    name: { title: "地名", },
    time: { title: "日期", },
    weather: { title: "天氣", },
    aqi: { title: "空氣品質", },
    temp_low: { title: "低溫", render: ({ rowIdx, table })=>{
        let arr = table.rows[rowIdx]['temperature'];
        return naxoDom.parse(`<div>${arr[0]}</div>`)
      } 
    },
    temp_high: { title: "高溫", render: ({ rowIdx, table })=>{
        let arr = table.rows[rowIdx]['temperature'];
        return naxoDom.parse(`<div>${arr[1]}</div>`)
    }}
  },
  attrs:{
    table: { class:['table', 'table-striped', 'table-hover'] }
  },
  pagination: { show: false },
});
t2.rows = data;
t2.render()

let t3 = new naxoTable("tableMountPoint3");
t3.Conf({
  columns: {
    id: { title: "id", },
    name: { title: "地名", },
    time: { title: "日期", },
    weather: { title: "天氣", render: ({}, value)=>{
      let iconClass = ['fas', 'fa-question'];
      iconClass = value === 'sunny'  ? ['fas', 'fa-sun'] : iconClass
      iconClass = value === 'windy'  ? ['fas', 'fa-wind'] : iconClass
      iconClass = value === 'cloudy'  ? ['fas', 'fa-clouds'] : iconClass
      iconClass = value === 'rainy'  ? ['fas', 'fa-cloud-rain'] : iconClass
      return naxoDom.parse(`<i class="${iconClass.join(' ')}"></d>`)
    }},
    aqi: { title: "空氣品質", render: ({}, value)=>{
      let colorClass = "text-success"
      colorClass = value > 40 ? 'text-secondary' : colorClass
      colorClass = value > 70 ? 'text-warning' : colorClass
      colorClass = value > 100 ? 'text-danger' : colorClass
      return naxoDom.parse(`<div class="${colorClass}">${value}</div>`)
    }},
    temp_low: { title: "低溫", render: ({ rowIdx, table })=>{
      let arr = table.rows[rowIdx]['temperature'];
      return naxoDom.parse(`<div>${arr[0]}</div>`)
    }},
    temp_high: { title: "高溫", render: ({ rowIdx, table })=>{
      let arr = table.rows[rowIdx]['temperature'];
      return naxoDom.parse(`<div>${arr[1]}</div>`)
    }},
    action: { title: "動作", render: ({rowIdx, table})=>{
      // 編輯按鈕
      let btn_edit = naxoDom.parse( `<i class="far fa-pencil-alt mx-1"></i>` )
      btn_edit.addEventListener('click', (e)=>{
        alert(`事件:${e}<br>正在編輯資料：${JSON.stringify(table.rows[rowIdx])}`)
      })
      btn_edit.style.cursor = 'pointer'
      // 刪除按鈕
      let btn_del = naxoDom.parse( `<i class="far fa-trash-alt mx-1"></i>` )
      btn_del.addEventListener('click', (e)=>{
        alert(`事件:${e}<br>正在刪除資料：${JSON.stringify(table.rows[rowIdx])}`)
      })
      btn_del.style.cursor = 'pointer'
      // 掛接回傳
      let el = naxoDom.parse(`<div></div>`)
      el.appendChild(btn_edit)
      el.appendChild(btn_del)
      return el;
    }}
  },
  attrs:{
    table: { class:['table', 'table-striped', 'table-hover'] }
  },
  pagination: { show: false },
});
t3.rows = data;
t3.render()