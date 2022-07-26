import React from "react";
import { UPDATE_PACKAGE } from "../../../api";
import style from "./Package_Alert.module.css";
import chuui from "../../../assets/chuui.svg";
import Loading_Animation from "../loading_animation/Loading_Animation.jsx";

// パッケージアラート
export default function Package_Alert({
  isShowAlert,
  isSelectPackageId,
  createtreedata,
  createTableData,
}) {
  //ローディングアニメーションフラグ
  const [isShowLoadingAnimation, setIsShowLoadingAnimation] =
    React.useState(false);

  // 同期のクリック
  async function clickDouki() {
    try {
      // ローディング開始
      setIsShowLoadingAnimation(true);

      // 4.更新パッケージ取り込み
      await UPDATE_PACKAGE(isSelectPackageId);

      //正常にパッケージが更新された場合のみここまでくる
      createtreedata(isSelectPackageId);
      createTableData(isSelectPackageId);
    } catch {}

    // ローディング終了
    setIsShowLoadingAnimation(false);
  }

  return (
    <>
      {isShowAlert ? (
        <div
          style={{
            display: "flex",
            position: "sticky",
            zIndex: "10",
            top: "5px",
            marginBottom: "5px",
            marginRight: "5px",
          }}
        >
          <div className={style.packagealert}>
            <img src={chuui} />
            <span>このパッケージは更新されています</span>
            <button onClick={clickDouki}>同期</button>
          </div>
          {isShowLoadingAnimation ? (
            <div
              style={{
                position: "relative",
                width: "45px",
                height: "45px",
                marginLeft: "5px",
              }}
            >
              <Loading_Animation
                isShowLoadingAnimation={isShowLoadingAnimation}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
