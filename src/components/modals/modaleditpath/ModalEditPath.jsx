import React from "react";
import "../Modal.css";
import "./ModalEditPath.css";

export default function ModalEditPath({ isShowModal, setIsShowModal }) {
  const CloseModal = () => {
    setIsShowModal(false);
  };

  //空欄のテキストエリアを追加
  const AddPath = () => {
    setIsPathList([...isPathList, ""]);
  };

  const [isPathList, setIsPathList] = React.useState([
    "D:Lambda",
    "D:/lambda/binv2",
    "C:Lambda",
  ]);

  return (
    <>
      {isShowModal ? (
        <>
          <div className="overlay" onClick={CloseModal}></div>
          <div className="modal" id="modaleditpathmodal">
            <div id="modaleditpathbuttonareatextarea">
              {isPathList.map((path, pathindex) => (
                <div>
                  <p>収集先{pathindex + 1}</p>
                  <div className="df">
                    <input type="text" value={path} />
                    <button className="pathdeletebutton1">削除</button>
                  </div>
                </div>
              ))}
            </div>
            <div id="pathmodalbuttonsarea">
              <button className="pathaddbutton1" onClick={AddPath}>
                追加
              </button>
              <button className="mybutton" onClick={CloseModal}>
                更新
              </button>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
