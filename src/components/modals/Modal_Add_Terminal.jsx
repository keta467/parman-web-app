import React from "react";
import "./Modal.css";

export default function Modal_Add_Terminal({ isShowModal, setIsShowModal }) {
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
                <input type="text" />
              </div>
              <div>
                <p>端末名称</p>
                <input type="text" />
              </div>
              <div>
                <p>IPアドレス</p>
                <input type="text" />
              </div>
            </div>
            <div id="buttonarea">
              <input type="checkbox" name="" id="" />
              連続で登録する際はこちらにチェック
              <button
                className="mybutton"
                id="closebutton"
                onClick={CloseModal}
              >
                登録
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
