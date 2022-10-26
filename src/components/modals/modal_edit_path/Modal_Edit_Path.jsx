import React from "react";
import { SET_COLLECT_PATH } from "../../../api";
import Loading_Animation from "../../alert/loading_animation/Loading_Animation.jsx";
import "../Modal.css";
import "./Modal_Edit_Path.css";

// パス編集モーダル
export default function Modal_Edit_Path({
  isShowModal,
  setIsShowModal,
  isPathList,
  setIsPathList,
}) {
  const closeModal = () => {
    if (isShowLoadingAnimation == true) return;
    setIsShowModal(false);
  };

  async function updateButton() {
    const Elems = document.getElementsByClassName("pathtext");
    const NewArr = [];
    var message = "";
    for (var i = 0; i < Elems.length; i++) {
      if (Elems[i].value != "") {
        NewArr.push(Elems[i].value);
        message += `\n${i + 1}. ${Elems[i].value}`;
      }
    }

    var res = window.confirm(
      `以下の内容で更新します。よろしいですか？${message}`
    );
    if (res == false) return;

    setIsShowLoadingAnimation(true);
    try {
      await SET_COLLECT_PATH(NewArr);
      setIsShowModal(false);
    } catch {}

    setIsShowLoadingAnimation(false);
  }

  //空欄のテキストエリアを追加
  const addPath = () => {
    setIsPathList([...isPathList, ""]);
  };

  const deletePath = (pathindex, path) => {
    setIsPathList(isPathList.filter((value, index) => index !== pathindex));
  };

  function buttonMouseOver() {
    setIsShowLoadingAnimation(true);

    //画面上のデータを配列にいれる
    const Elems = document.getElementsByClassName("pathtext");
    const NewArr = [];
    for (var i = 0; i < Elems.length; i++) {
      NewArr.push(Elems[i].value);
    }
    setIsPathList(NewArr);

    setIsShowLoadingAnimation(false);
  }

  const [isShowLoadingAnimation, setIsShowLoadingAnimation] =
    React.useState(false);

  return (
    <>
      {isShowModal ? (
        <>
          <div className="overlay" onClick={closeModal}></div>
          <div className="modal_centering_div">
            <div className="modal" id="modaleditpathmodal">
              <Loading_Animation
                isShowLoadingAnimation={isShowLoadingAnimation}
              />
              <div id="modaleditpathbuttonareatextarea">
                {isPathList.map((path, pathindex) => (
                  <div key={path + pathindex}>
                    <p>収集先パス{pathindex + 1}</p>
                    <div className="df">
                      <input
                        className="pathtext"
                        type="text"
                        defaultValue={path}
                      />
                      <button
                        className="pathdeletebutton1"
                        onMouseOver={buttonMouseOver}
                        onClick={(event) => deletePath(pathindex, path)}
                      >
                        削除
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div id="pathmodalbuttonsarea">
                <button className="pathaddbutton1" onClick={addPath}>
                  追加
                </button>
                <div>
                  <button
                    style={{ marginRight: "10px" }}
                    className="mybutton"
                    onClick={updateButton}
                  >
                    更新
                  </button>
                  <button className="mybutton" onClick={closeModal}>
                    キャンセル
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
