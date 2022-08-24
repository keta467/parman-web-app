import React from "react";
import "./Modal.css";

export default function ModalEditMachine({ MachineData, setIsShowModal }) {
  const CloseModal = () => {
    setIsShowModal({ isShowModal: false, machineInfo: { text: "aaa" } });
  };

  return (
    <>
      {MachineData.isShowModal ? (
        <>
          <div className="overlay" onClick={CloseModal}></div>
          <div className="modal">
            <div id="textarea">
              <div>
                <p>端末名</p>
                <input
                  type="text"
                  defaultValue={MachineData.machineInfo.NAME}
                />
              </div>
              <div>
                <p>端末名称</p>
                <input
                  type="text"
                  defaultValue={MachineData.machineInfo.DISPLAY_NAME}
                />
              </div>
              <div>
                <p>IPアドレス</p>
                <input
                  type="text"
                  defaultValue={MachineData.machineInfo.IP_ADDRESS}
                />
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
