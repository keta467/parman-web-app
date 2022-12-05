import React from "react";
import { SET_COLLECT_PATH } from "../../../api";
import Loading_Animation from "../../alert/loading_animation/Loading_Animation.jsx";
import modalStyle from "../Modal.module.css";
import style from "./Modal_Edit_Path.module.css";

// パス編集モーダル
export default function Modal_Edit_Path({
  isShowModal,
  setIsShowModal,
  isPathList,
  setIsPathList,
}) {
  //モーダルを閉じる
  const closeModal = () => {
    //ローディング中の場合
    if (isShowLoadingAnimation == true) return;
    //モーダルを閉じる
    setIsShowModal(false);
  };

  //更新
  async function updateButton() {
    //要素を取得
    const Elems = document.getElementsByClassName("pathtext");
    //配列に格納
    const NewArr = [];
    var message = "";
    for (var i = 0; i < Elems.length; i++) {
      if (Elems[i].value != "") {
        NewArr.push(Elems[i].value);
        message += `\n${i + 1}. ${Elems[i].value}`;
      }
    }

    //確認アラートを表示
    var res = window.confirm(
      `以下の内容で更新します。よろしいですか？${message}`
    );
    //キャンセルが推された場合
    if (res == false) return;

    //ローディング開始
    setIsShowLoadingAnimation(true);
    try {
      //apiをたたく
      await SET_COLLECT_PATH(NewArr);
      //モーダルを閉じる
      closeModal();
    } catch {}
    //ローディング終了
    setIsShowLoadingAnimation(false);
  }

  //空欄のテキストエリアを追加
  const addPath = () => {
    setIsPathList([...isPathList, ""]);
  };

  //削除
  const deletePath = (pathindex, path) => {
    setIsPathList(isPathList.filter((value, index) => index !== pathindex));
  };

  //ボタンにホバーされたとき
  function buttonMouseOver() {
    //ローディング開始
    setIsShowLoadingAnimation(true);

    //画面上のデータを配列にいれる
    const Elems = document.getElementsByClassName("pathtext");
    const NewArr = [];
    for (var i = 0; i < Elems.length; i++) {
      NewArr.push(Elems[i].value);
    }
    setIsPathList(NewArr);

    //ローディング終了
    setIsShowLoadingAnimation(false);
  }

  //ローディングアニメーション
  const [isShowLoadingAnimation, setIsShowLoadingAnimation] =
    React.useState(false);

  return (
    <>
      {isShowModal ? (
        <>
          <div className={modalStyle.overlay} onClick={closeModal}></div>
          <div className={modalStyle.modal_centering_div}>
            <div className={style.modal}>
              <Loading_Animation
                isShowLoadingAnimation={isShowLoadingAnimation}
              />
              <div className={style.area1}>
                {isPathList.map((path, pathindex) => (
                  <div key={path + pathindex}>
                    <p>収集先パス{pathindex + 1}</p>
                    <div className={style.df}>
                      <input
                        className="pathtext"
                        type="text"
                        defaultValue={path}
                      />
                      <button
                        className={style.deleteButton}
                        onMouseOver={buttonMouseOver}
                        onClick={(event) => deletePath(pathindex, path)}
                      >
                        削除
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className={style.area2}>
                <button className={style.addbutton} onClick={addPath}>
                  追加
                </button>
                <div>
                  <button
                    style={{ marginRight: "10px" }}
                    className="mybutton"
                    onClick={updateButton}
                  >
                    更新
                  </button>
                  <button className="mybutton" onClick={closeModal}>
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
}
