import React from 'react';
import "./Manage_Machine_Table.css";

export default function Manage_Machine_Table() {

  const [isTableData, setIsTableData] = React.useState(
    [
      {pcname:"1サブT1T0", nickname:"0", ip:"192.168.2.0"},
      {pcname:"1サブT1T1", nickname:"1", ip:"192.168.2.1"},
      {pcname:"1サブT1T2", nickname:"2", ip:"192.168.2.2"},
      {pcname:"1サブT1T3", nickname:"3", ip:"192.168.2.3"},
      {pcname:"1サブT1T4", nickname:"4", ip:"192.168.2.4"},
      {pcname:"1サブT1T5", nickname:"5", ip:"192.168.2.5"},
      {pcname:"1サブT1T6", nickname:"6", ip:"192.168.2.6"},
      {pcname:"1サブT1T7", nickname:"7", ip:"192.168.2.7"},
      {pcname:"1サブT1T8", nickname:"8", ip:"192.168.2.8"},
      {pcname:"1サブT1T9", nickname:"9", ip:"192.168.2.9"},
      {pcname:"1サブT1T10", nickname:"10", ip:"192.168.2.10"},
      {pcname:"1サブT1T11", nickname:"11", ip:"192.168.2.11"},
    ]
  );
  // const [isTableData, setIsTableData] = React.useState(
  //   [
  //     {pcname:"1サブT1T2", nickname:"0", ip:"192.168.2.2"},
  //     {pcname:"1サブT1T2", nickname:"1", ip:"192.168.2.2"},
  //     {pcname:"1サブT1T2", nickname:"2", ip:"192.168.2.2"},
  //     {pcname:"1サブT1T2", nickname:"3", ip:"192.168.2.2"},
  //     {pcname:"1サブT1T2", nickname:"4", ip:"192.168.2.2"},
  //   ]
  // );


  var startindex = "";

  ///
  /// マウスオーバーイベントを追加する
  ///
  function addMouseOverColoringEvent() {

    var materialTd = document.getElementsByClassName("dragitem");

    console.log(materialTd.length)
  
    for (var materialNumber = 0; materialNumber < materialTd.length; materialNumber++) {
     
      materialTd[materialNumber].addEventListener("drag", mydrag);

      materialTd[materialNumber].addEventListener("dragover", mydragover);

      materialTd[materialNumber].addEventListener("dragleave", mydragleave);

      materialTd[materialNumber].addEventListener("drop", mudrop);
    }
  }  

  function mydrag(event) {
    console.log("drag")
    startindex = event.target.id;
  };

  function mydragover(event) {
    event.preventDefault();       

    let rect = this.getBoundingClientRect();
    if ((event.clientY - rect.top) < (this.clientHeight / 2)) {
      //マウスカーソルの位置が要素の半分より上
      for(var i = 0; i < this.children.length; i++){
        this.children[i].style.borderTop = '2px solid blue';
        this.children[i].style.borderBottom  = '1px solid #999';
      }
    } else {
      //マウスカーソルの位置が要素の半分より下
      for(var i = 0; i < this.children.length; i++){
       this.children[i].style.borderTop = '1px solid #999';
       this.children[i].style.borderBottom  = '2px solid blue';
      }
    }
  };

  function mydragleave(event) {

    for(var i = 0; i < this.children.length; i++){
      this.children[i].style.borderTop = '1px solid #999';
      this.children[i].style.borderBottom = '1px solid #999';
    }
  };

  function mudrop(event) {
    console.log("drop")
    event.preventDefault();
    let elm_drag = isTableData[startindex];

    var toindex = event.target.id;
    
    let rect = this.getBoundingClientRect();
    if ((event.clientY - rect.top) < (this.clientHeight / 2)) {
      //マウスカーソルの位置が要素の半分より上
      isTableData.splice(startindex, 1);

      if(Number(startindex) < Number(toindex)){
        isTableData.splice(Number(toindex) - 1, 0, elm_drag);
      }else{
        isTableData.splice(Number(toindex), 0, elm_drag);
      }
    } else {
      //マウスカーソルの位置が要素の半分より下
      isTableData.splice(startindex, 1);

      if(Number(startindex) < Number(toindex)){
        isTableData.splice(Number(toindex), 0, elm_drag);
      }else{
        isTableData.splice(Number(toindex) + 1, 0, elm_drag);
      }
    }

    var newarr = [];
    for(var i = 0; i < isTableData.length; i++){
      newarr.push(isTableData[i]);
    }
    setIsTableData(newarr);        

    for(var i = 0; i < this.children.length; i++){
      this.children[i].style.borderTop = '1px solid #999';
      this.children[i].style.borderBottom = '1px solid #999';
    }
  }


  //初回レンダリング後と、useした値の更新後に自動で実行
  React.useEffect(() => {
    console.log("再設定！")
    addMouseOverColoringEvent()
  }, []);

  return (   
    <table className='managemachinetable colortable'>
      <thead>
        <tr>
          <th>端末名称</th>
          <th>端末名</th>
          <th>IPアドレス</th>
        </tr>
      </thead>
      <tbody>
        {isTableData.map((value, index)=>(
        <tr onClick={()=>{window.alert("modal表示")}} draggable="true" className="dragitem" id={index} key={index}>
          <td id={index}>{value.pcname}</td>
          <td id={index}>{value.nickname}</td>
          <td id={index}>{value.ip}</td>
        </tr>
        ))}
      </tbody>
    </table>
  )
}

{/* <tr draggable="true">
<td>1サブT1T2</td>
<td>inp1</td>
<td>192.168.2.2</td>
</tr>
<tr draggable="true">
<td>1サブT1T2</td>
<td>inp1</td>
<td>192.168.2.2</td>
</tr>
<tr draggable="true">
<td>1サブT1T2</td>
<td>inp1</td>
<td>192.168.2.2</td>
</tr>
<tr draggable="true">
<td>1サブT1T2</td>
<td>inp1</td>
<td>192.168.2.2</td>
</tr>
<tr draggable="true">
<td>1サブT1T2</td>
<td>inp1</td>
<td>192.168.2.2</td>
</tr> */}