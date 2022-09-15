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
    setIsShowModal(false);
  };

  async function UpdateButton() {
    const elems = document.getElementsByClassName("pathtext");
    var arr = [];
    for (var i = 0; i < elems.length; i++) {
      if (elems[i].value != "") {
        arr.push(elems[i].value);
      }
    }
    setIsShowLoadingAnimation(true);
    await SET_COLLECT_PATH(arr);
    setIsShowLoadingAnimation(false);
    setIsShowModal(false);
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
