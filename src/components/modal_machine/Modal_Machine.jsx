import React from 'react'
import "./Modal_Machine.css"

export default function Modal_Machine({isShowModal, setisShowModal}) {

  const ClickAddButton = () => {
    setisShowModal(false);
  };

  return (
    <>
      {isShowModal ? (
        <div className="overlay">
          <div className="modalContent" >
            <div id='inputtextwrapper'>
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
            <div id='closebuttonwrapper'>
              <input type="checkbox" name="" id="" />
              連続で登録する際はこちらにチェック
              <button id='closebutton' onClick={ClickAddButton}>登録</button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
