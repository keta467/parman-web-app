import React from "react";
import { REMOVE_TERMINAL, UPDATE_TERMINAL } from "../../../api";
import { isIPaddress } from "../../../lib/myfunction";
import Loading_Animation from "../../alert/loading_animation/Loading_Animation.jsx";
import modalStyle from "../Modal.module.css";
import style from "./Modal_Edit_Terminal.module.css";

// 端末編集モーダル
export default React.memo(function Modal_Edit_Terminal({
  isShowModal,
  setIsShowModal,
  isSelectTerminal,
  createTableData,
}) {
  //ローディングアニメーション
  const [isShowLoadingAnimation, setIsShowLoadingAnimation] =
    React.useState(false);

  //モーダルを閉じる
  const closeModal = () => {
    if (isShowLoadingAnimation == true) return;
    setIsShowModal(false);
  };

  //更新
  async function update() {
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
      await UPDATE_TERMINAL(
        isSelectTerminal.id,
        text1.value,
        text2.value,
        text3.value
      );
      //テーブルを作成
      createTableData();
      //モーダルを閉じる
      closeModal();
    } catch {}

    //ローディングアニメーション終了
    setIsShowLoadingAnimation(false);
  }

  //削除
  async function remove() {
    //確認アラートの表示
    var res = window.confirm(
      `以下の端末を削除しますか？\n名称: ${isSelectTerminal.display_name}\nHostName: ${isSelectTerminal.name}\nIPアドレス: ${isSelectTerminal.ip_address}\n\n削除するには「OK」を、中止するには「キャンセル」をクリックしてください。`
    );
    //キャンセルが選択されたとき
    if (res == false) return;

    //ローディングアニメーション開始
    setIsShowLoadingAnimation(true);

    try {
      //apiをたたく
      await REMOVE_TERMINAL(isSelectTerminal.id);
      //テーブルを作成
      createTableData();
      //モーダルを閉じる
      closeModal();
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
                  <input
                    id="textarea2"
                    type="text"
                    defaultValue={isSelectTerminal.display_name}
                  />
                </div>
                <div>
                  <p>HostName</p>
                  <input
                    id="textarea1"
                    type="text"
                    defaultValue={isSelectTerminal.name}
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
              <div className={style.buttonarea}>
                <button className="mybutton" onClick={remove}>
                  削除
                </button>
                <button className="mybutton" onClick={update}>
                  更新
                </button>
                <button className="mybutton" onClick={closeModal}>
                  キャンセル
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
