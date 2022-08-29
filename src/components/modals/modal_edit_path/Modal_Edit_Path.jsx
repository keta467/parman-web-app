import React from "react";
import "../Modal.css";
import "./Modal_Edit_Path.css";

export default function Modal_Edit_Path({ isShowModal, setIsShowModal }) {
  const CloseModal = () => {
    setIsShowModal(false);
  };

  //空欄のテキストエリアを追加
  const AddPath = () => {
    setIsPathList([...isPathList, ""]);
  };

  const DeletePath = (pathindex) => {
    setIsPathList(isPathList.filter((value, index) => index !== pathindex));
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
                <div key={path + pathindex}>
                  <p>収集先{pathindex + 1}</p>
                  <div className="df">
                    <input type="text" defaultValue={path} />
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
