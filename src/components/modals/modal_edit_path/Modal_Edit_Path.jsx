import React from "react";
import { SET_COLLECT_PATH } from "../../../api";
import Loading_Animation from "../../alert/loading_animation/Loading_Animation.jsx";
import "../Modal.css";
import "./Modal_Edit_Path.css";

export default function Modal_Edit_Path({
  isShowModal,
  setIsShowModal,
  isPathList,
  setIsPathList,
}) {
  const CloseModal = () => {
    if (isShowLoadingAnimation == true) return;
    setIsShowModal(false);
  };

  async function UpdateButton() {
    const Elems = document.getElementsByClassName("pathtext");
    const NewArr = [];
    for (var i = 0; i < Elems.length; i++) {
      if (Elems[i].value != "") {
        NewArr.push(Elems[i].value);
      }
    }
    setIsShowLoadingAnimation(true);
    try {
      await SET_COLLECT_PATH(NewArr);
      setIsShowModal(false);
    } catch {}

    setIsShowLoadingAnimation(false);
  }

  //空欄のテキストエリアを追加
  const AddPath = () => {
    setIsPathList([...isPathList, ""]);
  };

  const DeletePath = (pathindex) => {
    setIsPathList(isPathList.filter((value, index) => index !== pathindex));
  };

  const [isShowLoadingAnimation, setIsShowLoadingAnimation] =
    React.useState(false);

  return (
    <>
      {isShowModal ? (
        <>
          <div className="overlay" onClick={CloseModal}></div>
          <div className="modal_centering_div">
            <div className="modal" id="modaleditpathmodal">
              <Loading_Animation
                isShowLoadingAnimation={isShowLoadingAnimation}
              />
              <div id="modaleditpathbuttonareatextarea">
                {isPathList.map((path, pathindex) => (
                  <div key={path + pathindex}>
                    <p>収集先{pathindex + 1}</p>
                    <div className="df">
                      <input
                        className="pathtext"
                        type="text"
                        defaultValue={path}
                      />
                      <button
                        className="pathdeletebutton1"
                        onClick={(event) => DeletePath(pathindex)}
                      >
                        削除
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div id="pathmodalbuttonsarea">
                <button className="pathaddbutton1" onClick={AddPath}>
                  追加
                </button>
                <button className="mybutton" onClick={UpdateButton}>
                  更新
                </button>
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
