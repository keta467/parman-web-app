import React from "react";
import Modal_Add_Terminal from "../../components/modals/Modal_Add_Terminal.jsx";
import Modal_Edit_Terminal from "../../components/modals/Modal_Edit_Terminal.jsx";
import Topbar from "../../components/topbar/Topbar.jsx";
import "./Manage_Terminal.css";
import { GET_TERMINALS, SET_TERMINAL_ORDER } from "../../api.js";
import Loading_Animation from "../../components/alert/loading_animation/Loading_Animation.jsx";

export default React.memo(function Manage_Terminal({ TitleText }) {
  //端末リスト
  const [isTerminalList, setIsTerminalList] = React.useState([]);

  //追加モーダル
  const [isShowModalAddTerminal, setIsShowModalAddTerminal] =
    React.useState(false);

  //編集モーダル
  const [isShowModalEditTerminal, setIsShowModalEditTerminal] =
    React.useState(false);

  //編集端末
  const [isSelectTerminal, setIsSelectTerminal] = React.useState();

  //ローディングアニメーションフラグ
  const [isShowLoadingAnimation, setIsShowLoadingAnimation] =
    React.useState(false);

  //追加ボタン
  const ClickAdd = () => {
    setIsShowModalAddTerminal(true);
  };

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
    const NewArr = [];
    for (var i = 0; i < isTerminalList.length; i++) {
      NewArr.push(isTerminalList[i]);
    }

    const Elem_Drag = NewArr[startindex];
    const ToIndex = event.target.id;

    const element = document.getElementById(event.target.id);
    let rect = element.getBoundingClientRect();
    if (event.clientY - rect.top < element.clientHeight / 2) {
      //マウスカーソルの位置が要素の半分より上
      NewArr.splice(startindex, 1);

      if (Number(startindex) < Number(ToIndex)) {
        NewArr.splice(Number(ToIndex) - 1, 0, Elem_Drag);
      } else {
        NewArr.splice(Number(ToIndex), 0, Elem_Drag);
      }
    } else {
      //マウスカーソルの位置が要素の半分より下
      NewArr.splice(startindex, 1);

      if (Number(startindex) < Number(ToIndex)) {
        NewArr.splice(Number(ToIndex), 0, Elem_Drag);
      } else {
        NewArr.splice(Number(ToIndex) + 1, 0, Elem_Drag);
      }
    }

    for (var i = 0; i < element.children.length; i++) {
      element.children[i].style.borderTop = "1px solid #999";
      element.children[i].style.borderBottom = "1px solid #999";
    }

    //ローディングアニメーション開始
    setIsShowLoadingAnimation(true);

    //端末順変更
    try {
      const PostArr = [];
      for (var i = 0; i < NewArr.length; i++) {
        PostArr.push({ ID: NewArr[i].id });
      }
      await SET_TERMINAL_ORDER(PostArr);
      setIsTerminalList(NewArr);
    } catch {}

    //ローディングアニメーション終了
    setIsShowLoadingAnimation(false);
  }

  const OpenModal = (index) => {
    setIsShowModalEditTerminal(true);
    setIsSelectTerminal(isTerminalList[index]);
  };

  const createtabledata = React.useCallback(async () => {
    //ローディングアニメーション開始
    setIsShowLoadingAnimation(true);

    setIsTerminalList([]); // 表示クリア

    try {
      const ResponceData = await GET_TERMINALS();
      setIsTerminalList(ResponceData.terminal_list);
    } catch {}

    //ローディングアニメーション終了
    setIsShowLoadingAnimation(false);
  }, []);

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
        isSelectTerminal={isSelectTerminal}
        createtabledata={createtabledata}
      />

      <div className="managemachinebuttonwrapper">
        <button className="mybutton" onClick={ClickAdd}>
          追加
        </button>
      </div>
      <div id="manage_terminal_table_loading_area">
        <Loading_Animation isShowLoadingAnimation={isShowLoadingAnimation} />
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
                  key={Terminal.id}
                  onDrag={mydrag}
                  onDragOver={mydragover}
                  onDragLeave={mydragleave}
                  onDrop={mydrop}
                >
                  <td id={index}>{Terminal.name}</td>
                  <td id={index}>{Terminal.display_name}</td>
                  <td id={index}>{Terminal.ip_address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
});
