import React from "react";
import "./Modal.css";

export default function Modal_Edit_Terminal({
  isShowModal,
  setIsShowModal,
  SelectTerminal,
}) {
  const CloseModal = () => {
    setIsShowModal(false);
  };

  return (
    <>
      {isShowModal ? (
        <>
          <div className="overlay" onClick={CloseModal}></div>
          <div className="modal">
            <div id="textarea">
              <div>
                <p>端末名</p>
                <input type="text" defaultValue={SelectTerminal.NAME} />
              </div>
              <div>
                <p>端末名称</p>
                <input type="text" defaultValue={SelectTerminal.DISPLAY_NAME} />
              </div>
              <div>
                <p>IPアドレス</p>
                <input type="text" defaultValue={SelectTerminal.IP_ADDRESS} />
              </div>
            </div>
            <div id="buttonarea">
              <button className="mybutton" onClick={CloseModal}>
                削除
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
