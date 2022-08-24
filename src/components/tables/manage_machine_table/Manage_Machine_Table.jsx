import React from "react";
import "./Manage_Machine_Table.css";

export default function Manage_Machine_Table({ tableData, setIsShowModal }) {
  const [isTableData, setIsTableData] = React.useState(tableData);

  var startindex = "";

  ///
  /// マウスオーバーイベントを追加する
  ///
  function addMouseOverColoringEvent() {
    var materialTd = document.getElementsByClassName("dragitem");

    console.log(materialTd.length);

    for (
      var materialNumber = 0;
      materialNumber < materialTd.length;
      materialNumber++
    ) {
      materialTd[materialNumber].addEventListener("drag", mydrag);

      materialTd[materialNumber].addEventListener("dragover", mydragover);

      materialTd[materialNumber].addEventListener("dragleave", mydragleave);

      materialTd[materialNumber].addEventListener("drop", mudrop);
    }
  }

  function mydrag(event) {
    console.log("drag");
    startindex = event.target.id;
  }

  function mydragover(event) {
    event.preventDefault();

    let rect = this.getBoundingClientRect();
    if (event.clientY - rect.top < this.clientHeight / 2) {
      //マウスカーソルの位置が要素の半分より上
      for (var i = 0; i < this.children.length; i++) {
        this.children[i].style.borderTop = "2px solid blue";
        this.children[i].style.borderBottom = "1px solid #999";
      }
    } else {
      //マウスカーソルの位置が要素の半分より下
      for (var i = 0; i < this.children.length; i++) {
        this.children[i].style.borderTop = "1px solid #999";
        this.children[i].style.borderBottom = "2px solid blue";
      }
    }
  }

  function mydragleave(event) {
    for (var i = 0; i < this.children.length; i++) {
      this.children[i].style.borderTop = "1px solid #999";
      this.children[i].style.borderBottom = "1px solid #999";
    }
  }

  function mudrop(event) {
    console.log("drop");
    event.preventDefault();
    let elm_drag = isTableData[startindex];

    var toindex = event.target.id;

    let rect = this.getBoundingClientRect();
    if (event.clientY - rect.top < this.clientHeight / 2) {
      //マウスカーソルの位置が要素の半分より上
      isTableData.splice(startindex, 1);

      if (Number(startindex) < Number(toindex)) {
        isTableData.splice(Number(toindex) - 1, 0, elm_drag);
      } else {
        isTableData.splice(Number(toindex), 0, elm_drag);
      }
    } else {
      //マウスカーソルの位置が要素の半分より下
      isTableData.splice(startindex, 1);

      if (Number(startindex) < Number(toindex)) {
        isTableData.splice(Number(toindex), 0, elm_drag);
      } else {
        isTableData.splice(Number(toindex) + 1, 0, elm_drag);
      }
    }

    var newarr = [];
    for (var i = 0; i < isTableData.length; i++) {
      newarr.push(isTableData[i]);
    }
    setIsTableData(newarr);

    for (var i = 0; i < this.children.length; i++) {
      this.children[i].style.borderTop = "1px solid #999";
      this.children[i].style.borderBottom = "1px solid #999";
    }
  }

  const OpenModal = (index) => {
    console.log("barfor");
    console.log(isTableData[index]);
    var data = { isShowModal: true, machineInfo: isTableData[index] };
    setIsShowModal(data);
  };

  //初回レンダリング後
  React.useEffect(() => {
    addMouseOverColoringEvent();
  }, []);

  return (
    <table className="managemachinetable colortable">
      <thead>
        <tr>
          <th>端末名</th>
          <th>端末名称</th>
          <th>IPアドレス</th>
        </tr>
      </thead>
      <tbody id="managemachinetabletbody">
        {isTableData.map((value, index) => (
          <tr
            onClick={() => OpenModal(index)}
            draggable="true"
            className="dragitem"
            id={index}
            key={index}
          >
            <td id={index}>{value.NAME}</td>
            <td id={index}>{value.DISPLAY_NAME}</td>
            <td id={index}>{value.IP_ADDRESS}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
