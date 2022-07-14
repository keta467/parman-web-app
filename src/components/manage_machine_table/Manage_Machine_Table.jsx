import React from 'react';
import "./Manage_Machine_Table.css";

export default function Manage_Machine_Table() {

  console.log("レンダリング")

  const [isTableData, setIsTableData] = React.useState(
    [
      {pcname:"1サブT1T2", nickname:"0", ip:"192.168.2.2"},
      {pcname:"1サブT1T2", nickname:"1", ip:"192.168.2.2"},
      {pcname:"1サブT1T2", nickname:"2", ip:"192.168.2.2"},
      {pcname:"1サブT1T2", nickname:"3", ip:"192.168.2.2"},
      {pcname:"1サブT1T2", nickname:"4", ip:"192.168.2.2"},
      {pcname:"1サブT1T2", nickname:"5", ip:"192.168.2.2"},
    ]
  );


  var startindex = "";
  ///
  /// マウスオーバーイベントを追加する
  ///
  function addMouseOverColoringEvent() {
    var materialTd = document.getElementsByClassName("dragitem");

    for (var i = 0; i < materialTd.length; i++) {
      materialTd[i].addEventListener("drag", function (event) {
        startindex = event.target.id;
      });

      materialTd[i].addEventListener("dragover", function (event) {
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
      });

      materialTd[i].addEventListener("dragleave", function (event) {

        for(var i = 0; i < this.children.length; i++){
          this.children[i].style.borderTop = '1px solid #999';
          this.children[i].style.borderBottom = '1px solid #999';
        }
      });

      materialTd[i].addEventListener("drop", function (event) {
        event.preventDefault();
        let elm_drag = isTableData[startindex];

        var toindex = event.target.id;
        
        let rect = this.getBoundingClientRect();
        if ((event.clientY - rect.top) < (this.clientHeight / 2)) {
          //マウスカーソルの位置が要素の半分より上
          isTableData.splice(startindex, 1);
          if(startindex < toindex){
            isTableData.splice(toindex - 1, 0, elm_drag);
          }else{
            isTableData.splice(toindex, 0, elm_drag);
          }
        } else {
          //マウスカーソルの位置が要素の半分より下
          isTableData.splice(startindex, 1);
          if(startindex < toindex){
            isTableData.splice(toindex, 0, elm_drag);
          }else{
            isTableData.splice(toindex + 1, 0, elm_drag);
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
      });
    }
  }  

  // 初回レンダリング後と、useした値の更新後に自動で実行
  React.useEffect(() => {
    addMouseOverColoringEvent()
  });

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
        <tr draggable="true" class="dragitem" id={index}>
          <td draggable="false" id={index}>{value.pcname}</td>
          <td draggable="false" id={index}>{value.nickname}</td>
          <td draggable="false" id={index}>{value.ip}</td>
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