import React from "react";
import { REGISTER_TERMINAL } from "../../api";
import Loading_Animation from "../alert/loading_animation/Loading_Animation.jsx";
import "./Modal.css";

export default React.memo(function Modal_Add_Terminal({
  isShowModal,
  setIsShowModal,
  createtabledata,
}) {
  const CloseModal = () => {
    setIsShowModal(false);
  };

  const [isShowLoadingAnimation, setIsShowLoadingAnimation] =
    React.useState(false);

  async function Register() {
    const text1 = document.getElementById("textarea1");
    const text2 = document.getElementById("textarea2");
    const text3 = document.getElementById("textarea3");

    if (text1.value == "" || text2.value == "" || text3.value == "") {
      window.alert("空の項目があります。");
      return;
    }

    setIsShowLoadingAnimation(true);
    await REGISTER_TERMINAL(text1.value, text2.value, text3.value);
    setIsShowLoadingAnimation(false);

    createtabledata();

    //連続で登録の場合
    if (document.getElementById("checkbox1").checked) {
      text1.value = "";
      text2.value = "";
      text3.value = "";
    } else {
      setIsShowModal(false);
    }
  }

  return (
    <>
      {isShowModal ? (
        <>
          <div className="overlay" onClick={CloseModal}></div>

          <div className="modal_centering_div">
            <div className="modal">
              <Loading_Animation
                isShowLoadingAnimation={isShowLoadingAnimation}
              />
              <div id="textarea">
                <div>
                  <p>端末名</p>
                  <input id="textarea1" type="text" />
                </div>
                <div>
                  <p>端末名称</p>
                  <input id="textarea2" type="text" />
                </div>
                <div>
                  <p>IPアドレス</p>
                  <input id="textarea3" type="text" />
                </div>
              </div>
              <div id="buttonarea">
                <input type="checkbox" name="" id="checkbox1" />
                連続で登録する際はこちらにチェック
                <button
                  className="mybutton"
                  id="closebutton"
                  onClick={Register}
                >
                  登録
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
});
