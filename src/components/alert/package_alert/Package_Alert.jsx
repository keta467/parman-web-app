import React from "react";
import { UPDATE_PACKAGE } from "../../../api";
import "./Package_Alert.css";

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
          <div id="packagealert">
            <div id="packagealertmessagewrapper">
              このパッケージは更新されています。
            </div>
            <button
              id="packagealertbutton"
              className="mybutton"
              onClick={CloseAlert}
            >
              このパッケージを同期
            </button>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
