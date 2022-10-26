import React from "react";
import { REMOVE_TERMINAL, UPDATE_TERMINAL } from "../../api";
import { isIPaddress } from "../../lib/myfunction";
import Loading_Animation from "../alert/loading_animation/Loading_Animation.jsx";
import "./Modal.css";

// 端末編集モーダル
export default React.memo(function Modal_Edit_Terminal({
  isShowModal,
  setIsShowModal,
  isSelectTerminal,
  createTableData,
}) {
  const [isShowLoadingAnimation, setIsShowLoadingAnimation] =
    React.useState(false);

  const closeModal = () => {
    if (isShowLoadingAnimation == true) return;
    setIsShowModal(false);
  };

  async function update() {
    const text1 = document.getElementById("textarea1");
    const text2 = document.getElementById("textarea2");
    const text3 = document.getElementById("textarea3");

    if (text1.value == "" || text2.value == "" || text3.value == "") {
      window.alert("空の項目があります。");
      return;
    }

    if (isIPaddress(text3.value) == false) {
      window.alert("正しいIPアドレスを入力してください");
      return;
    }

    if (text1.value.length >= 51 || text2.value.length >= 51) {
      window.alert("50文字以内で入力してください");
      return;
    }

    setIsShowLoadingAnimation(true);

    try {
      await UPDATE_TERMINAL(
        isSelectTerminal.id,
        text1.value,
        text2.value,
        text3.value
      );
      createTableData();
      closeModal();
    } catch {}

    setIsShowLoadingAnimation(false);
  }

  async function remove() {
    var res = window.confirm(
      `以下の端末を削除しますか？\n名称: ${isSelectTerminal.display_name}\nHostName: ${isSelectTerminal.name}\nIPアドレス: ${isSelectTerminal.ip_address}\n\n削除するには「OK」を中止するには「キャンセル」をクリックしてください。`
    );
    if (res == false) return;

    setIsShowLoadingAnimation(true);

    try {
      await REMOVE_TERMINAL(isSelectTerminal.id);
      createTableData();
      closeModal();
    } catch {}

    setIsShowLoadingAnimation(false);
  }

  return (
    <>
      {isShowModal ? (
        <>
          <div className="overlay" onClick={closeModal}></div>
          <div className="modal_centering_div">
            <div className="modal">
              <Loading_Animation
                isShowLoadingAnimation={isShowLoadingAnimation}
              />
              <div id="textarea">
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
              <div id="buttonarea">
                <button className="mybutton" onClick={remove}>
                  削除
                </button>
                <button className="mybutton" onClick={update}>
                  更新
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
        </>
      ) : (
        <></>
      )}
    </>
  );
});
