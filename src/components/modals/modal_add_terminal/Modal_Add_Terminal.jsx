import React from "react";
import { REGISTER_TERMINAL } from "../../../api";
import { isIPaddress } from "../../../lib/myfunction";
import Loading_Animation from "../../alert/loading_animation/Loading_Animation.jsx";
import modalStyle from "../Modal.module.css";
import style from "./Modal_Add_Terminal.module.css";

// 端末追加モーダル
export default React.memo(function Modal_Add_Terminal({
  isShowModal,
  setIsShowModal,
  createTableData,
}) {
  //モーダルを閉じる
  const closeModal = () => {
    if (isShowLoadingAnimation == true) return;
    setIsShowModal(false);
  };

  //ローディングアニメーション
  const [isShowLoadingAnimation, setIsShowLoadingAnimation] =
    React.useState(false);

  //登録
  async function register() {
    //要素を取得
    const text1 = document.getElementById("textarea1");
    const text2 = document.getElementById("textarea2");
    const text3 = document.getElementById("textarea3");

    //空の項目がある場合
    if (text1.value == "" || text2.value == "" || text3.value == "") {
      window.alert("空の項目があります。");
      return;
    }

    //IPアドレスの書式が違う場合
    if (isIPaddress(text3.value) == false) {
      window.alert("正しいIPアドレスを入力してください");
      return;
    }

    //文字数制限を超える場合
    if (text1.value.length >= 51 || text2.value.length >= 51) {
      window.alert("50文字以内で入力してください");
      return;
    }

    //ローディングアニメーション開始
    setIsShowLoadingAnimation(true);

    try {
      //apiをたたく
      await REGISTER_TERMINAL(text1.value, text2.value, text3.value);

      //テーブルを作成
      createTableData();

      //連続で登録の場合
      if (document.getElementById("checkbox1").checked) {
        text1.value = "";
        text2.value = "";
        text3.value = "";
      } else {
        // モーダルを閉じる
        closeModal();
      }
    } catch {}

    //ローディングアニメーション終了
    setIsShowLoadingAnimation(false);
  }

  return (
    <>
      {isShowModal ? (
        <>
          <div className={modalStyle.overlay} onClick={closeModal}></div>
          <div className={modalStyle.modal_centering_div}>
            <div className={modalStyle.modal}>
              <Loading_Animation
                isShowLoadingAnimation={isShowLoadingAnimation}
              />
              <div className={style.textarea}>
                <div>
                  <p>名称</p>
                  <input id="textarea2" type="text" />
                </div>
                <div>
                  <p>HostName</p>
                  <input id="textarea1" type="text" />
                </div>
                <div>
                  <p>IPアドレス</p>
                  <input id="textarea3" type="text" />
                </div>
              </div>
              <div className={style.buttonarea}>
                <div>
                  <input type="checkbox" name="" id="checkbox1" />
                  <span style={{ marginRight: "150px" }}>連続で登録する</span>
                </div>
                <div>
                  <button
                    className="mybutton"
                    id="closebutton"
                    onClick={register}
                  >
                    登録
                  </button>
                  <button
                    className="mybutton"
                    id="closebutton"
                    onClick={closeModal}
                  >
                    キャンセル
                  </button>
                </div>
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
