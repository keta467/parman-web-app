import React from "react";
import { REMOVE_TERMINAL, UPDATE_TERMINAL } from "../../api";
import "./Modal.css";

export default React.memo(function Modal_Edit_Terminal({
  isShowModal,
  setIsShowModal,
  isSelectTerminal,
  createtabledata,
}) {
  const CloseModal = () => {
    setIsShowModal(false);
  };

  async function Update() {
    const text1 = document.getElementById("textarea1");
    const text2 = document.getElementById("textarea2");
    const text3 = document.getElementById("textarea3");

    if (text1.value == "" || text2.value == "" || text3.value == "") {
      window.alert("空の項目があります。");
      return;
    }
    await UPDATE_TERMINAL(
      isSelectTerminal.id,
      text1.value,
      text2.value,
      text3.value
    );
    createtabledata();
    CloseModal();
  }

  async function Remove() {
    await REMOVE_TERMINAL(isSelectTerminal.id);
    createtabledata();
    CloseModal();
  }

  return (
    <>
      {isShowModal ? (
        <>
          <div className="overlay" onClick={CloseModal}></div>
          <div className="modal">
            <div id="textarea">
              <div>
                <p>端末名</p>
                <input
                  id="textarea1"
                  type="text"
                  defaultValue={isSelectTerminal.name}
                />
              </div>
              <div>
                <p>端末名称</p>
                <input
                  id="textarea2"
                  type="text"
                  defaultValue={isSelectTerminal.display_name}
                />
              </div>
              <div>
                <p>IPアドレス</p>
                <input
                  id="textarea3"
                  type="text"
                  defaultValue={isSelectTerminal.ip_address}
                />
              </div>
            </div>
            <div id="buttonarea">
              <button className="mybutton" onClick={Remove}>
                削除
              </button>
              <button className="mybutton" onClick={Update}>
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
});
