import React from "react";
import { UPDATE_PACKAGE } from "../../../api";
import "./Package_Alert.css";
import chuui from "../../../assets/chuui.svg";
import Loading_Animation from "../loading_animation/Loading_Animation.jsx";

export default function Package_Alert({
  isShowAlert,
  setIsShowAlert,
  isSelectPackageId,
  createtreedata,
  createtabledata,
}) {
  //ローディングアニメーションフラグ
  const [isShowLoadingAnimation, setIsShowLoadingAnimation] =
    React.useState(false);

  async function CloseAlert() {
    try {
      setIsShowLoadingAnimation(true);
      const Responce = await UPDATE_PACKAGE(isSelectPackageId);
      setIsShowLoadingAnimation(false);
      //正常にパッケージが更新された
      if (Responce.result == 0) {
        createtreedata(isSelectPackageId);
        createtabledata(isSelectPackageId);
      } else {
        window.alert("UPDATE_PACKAGE エラー");
      }
    } catch {}
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
          <div id="packagealert" className="original-box-shadow">
            <img src={chuui} />
            <span>このパッケージは更新されています</span>
            <button onClick={CloseAlert}>同期</button>
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
