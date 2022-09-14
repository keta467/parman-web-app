import React from "react";
import { UPDATE_PACKAGE } from "../../../api";
import "./Package_Alert.css";
import chuui from "../../../assets/chuui.svg";

export default function Package_Alert({
  isShowAlert,
  setIsShowAlert,
  isSelectPackageId,
}) {
  const CloseAlert = () => {
    UPDATE_PACKAGE(isSelectPackageId);
    setIsShowAlert(false);
  };

  return (
    <>
      {isShowAlert ? (
        <>
          <div id="packagealert" className="original-box-shadow">
            <img src={chuui} />
            <span>このパッケージは更新されています</span>
            <button onClick={CloseAlert}>同期</button>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
