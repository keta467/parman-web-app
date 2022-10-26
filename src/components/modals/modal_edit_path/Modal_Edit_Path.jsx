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
        message += "\n" + Elems[i].value;
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

  const deletePath = () => {
    setIsPathList(
      isPathList.filter((value, index) => index !== isPathList.length - 1)
    );
  };

  const [isShowLoadingAnimation, setIsShowLoadingAnimation] =
    React.useState(false);

  function searchclick(event, _index) {
    console.log(event.target.children[0].value);
    setIsPathList(
      isPathList.map((value, index) =>
        index === _index ? event.target.children[0].value : value
      )
    );
  }

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
                    <form
                      className="df"
                      onSubmit={(event) => searchclick(event, pathindex)}
                    >
                      <input
                        className="pathtext"
                        type="text"
                        defaultValue={path}
                      />
                    </form>
                  </div>
                ))}
              </div>
              <div id="pathmodalbuttonsarea">
                <div>
                  <button className="pathaddbutton1" onClick={addPath}>
                    追加
                  </button>
                  <button className="pathaddbutton2" onClick={deletePath}>
                    削除
                  </button>
                </div>

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
