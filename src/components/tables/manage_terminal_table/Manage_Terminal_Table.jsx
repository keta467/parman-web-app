import React from "react";
import { GET_TERMINALS } from "../../../api";
import "./Manage_Terminal_Table.css";

export default function Manage_Terminal_Table({
  setIsShowModalEditTerminal,
  setIsSelectTerminal,
}) {
  const [isTerminalList, setIsTerminalList] = React.useState([]);

  var startindex = "";

  function mydrag(event) {
    startindex = event.target.id;
  }

  function mydragover(event) {
    event.preventDefault();

    const element = document.getElementById(event.target.id);
    let rect = element.getBoundingClientRect();
    if (event.clientY - rect.top < element.clientHeight / 2) {
      //マウスカーソルの位置が要素の半分より上
      for (var i = 0; i < element.children.length; i++) {
        element.children[i].style.borderTop = "2px solid blue";
        element.children[i].style.borderBottom = "1px solid #999";
      }
    } else {
      //マウスカーソルの位置が要素の半分より下
      for (var i = 0; i < element.children.length; i++) {
        element.children[i].style.borderTop = "1px solid #999";
        element.children[i].style.borderBottom = "2px solid blue";
      }
    }
  }

  function mydragleave(event) {
    const element = document.getElementById(event.target.id);
    for (var i = 0; i < element.children.length; i++) {
      element.children[i].style.borderTop = "1px solid #999";
      element.children[i].style.borderBottom = "1px solid #999";
    }
  }

  function mydrop(event) {
    event.preventDefault();
    let elm_drag = isTerminalList[startindex];

    var toindex = event.target.id;

    const element = document.getElementById(event.target.id);
    let rect = element.getBoundingClientRect();
    if (event.clientY - rect.top < element.clientHeight / 2) {
      //マウスカーソルの位置が要素の半分より上
      isTerminalList.splice(startindex, 1);

      if (Number(startindex) < Number(toindex)) {
        isTerminalList.splice(Number(toindex) - 1, 0, elm_drag);
      } else {
        isTerminalList.splice(Number(toindex), 0, elm_drag);
      }
    } else {
      //マウスカーソルの位置が要素の半分より下
      isTerminalList.splice(startindex, 1);

      if (Number(startindex) < Number(toindex)) {
        isTerminalList.splice(Number(toindex), 0, elm_drag);
      } else {
        isTerminalList.splice(Number(toindex) + 1, 0, elm_drag);
      }
    }

    var newarr = [];
    for (var i = 0; i < isTerminalList.length; i++) {
      newarr.push(isTerminalList[i]);
    }
    setIsTerminalList(newarr);

    for (var i = 0; i < element.children.length; i++) {
      element.children[i].style.borderTop = "1px solid #999";
      element.children[i].style.borderBottom = "1px solid #999";
    }
  }

  const OpenModal = (index) => {
    setIsShowModalEditTerminal(true);
    setIsSelectTerminal(isTerminalList[index]);
  };

  //初回レンダリング後
  React.useEffect(() => {
    setIsTerminalList(GET_TERMINALS().TERMINAL_LIST);
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
        {isTerminalList.map((Terminal, index) => (
          <tr
            onClick={() => OpenModal(index)}
            draggable="true"
            className="dragitem"
            id={index}
            key={Terminal.ID}
            onDrag={mydrag}
            onDragOver={mydragover}
            onDragLeave={mydragleave}
            onDrop={mydrop}
          >
            <td id={index}>{Terminal.NAME}</td>
            <td id={index}>{Terminal.DISPLAY_NAME}</td>
            <td id={index}>{Terminal.IP_ADDRESS}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
