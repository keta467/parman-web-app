import React from 'react'

export default function ModalEditMachine({isShowModal, setIsShowModal}) {

  const CloseModal = () => {
    setIsShowModal({isShowModal:false, machineInfo:{text:"aaa"}});
  };

  return (
    <>
    {isShowModal.isShowModal ? (
      <>
      <div className="overlay" onClick={CloseModal}></div>
      <div className="modal" >
        <div id='textarea'>
          <div>
            <p>端末名</p>
            <input type="text" value={isShowModal.machineInfo.pcname}/>
          </div>
          <div>
            <p>端末名称</p>
            <input type="text" value={isShowModal.machineInfo.nickname}/>
          </div>
          <div>
            <p>IPアドレス</p>
            <input type="text" value={isShowModal.machineInfo.ip}/>
          </div>
        </div>
        <div id='buttonarea'>
          <button onClick={CloseModal}>削除</button>
          <button onClick={CloseModal}>更新</button>
        </div>
      </div>
      </>
    ) : (
      <></>
    )}
  </>
  )
}
