import React from "react";
import Modal_Add_Terminal from "../../components/modals/Modal_Add_Terminal.jsx";
import Modal_Edit_Terminal from "../../components/modals/Modal_Edit_Terminal.jsx";
import Topbar from "../../components/topbar/Topbar.jsx";
import "./Manage_Terminal.css";
import { GET_TERMINALS, SET_TERMINAL_ORDER } from "../../api.js";

export default React.memo(function Manage_Terminal({ TitleText }) {
  //追加モーダル
  const [isShowModalAddTerminal, setIsShowModalAddTerminal] =
    React.useState(false);

  //編集モーダル
  const [isShowModalEditTerminal, setIsShowModalEditTerminal] =
    React.useState(false);

  //編集端末
  const [isSelectTerminal, setIsSelectTerminal] = React.useState();

  //追加ボタン
  const ClickAdd = () => {
    setIsShowModalAddTerminal(true);
  };

  //端末リスト
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

  async function mydrop(event) {
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

    //端末順変更
    var orderarr = [];
    for (var i = 0; i < isTerminalList.length; i++) {
      orderarr.push({ ID: isTerminalList[i].ID });
    }

    //端末順変更
    const ResponceData = await SET_TERMINAL_ORDER(orderarr);
  }

  const OpenModal = (index) => {
    setIsShowModalEditTerminal(true);
    setIsSelectTerminal(isTerminalList[index]);
  };

  async function createtabledata() {
    const ResponceData = await GET_TERMINALS();
    setIsTerminalList(ResponceData.TERMINAL_LIST);
  }

  //初回レンダリング後
  React.useEffect(() => {
    createtabledata();
  }, []);

  return (
    <>
      <Topbar TitleText={TitleText} />
      <Modal_Add_Terminal
        isShowModal={isShowModalAddTerminal}
        setIsShowModal={setIsShowModalAddTerminal}
        createtabledata={createtabledata}
      />
      <Modal_Edit_Terminal
        isShowModal={isShowModalEditTerminal}
        setIsShowModal={setIsShowModalEditTerminal}
        SelectTerminal={isSelectTerminal}
        createtabledata={createtabledata}
      />
      <div className="managemachinebuttonwrapper">
        <button className="mybutton" onClick={ClickAdd}>
          追加
        </button>
      </div>
      <div className="managemachinetablewrapper">
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
      </div>
    </>
  );
});
