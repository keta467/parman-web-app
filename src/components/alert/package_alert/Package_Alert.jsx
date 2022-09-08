import React from "react";
import "./Package_Alert.css";

export default function Package_Alert({
  isShowAlert,
  setIsShowAlert,
  isSelectPackageId,
}) {
  const CloseAlert = () => {
    window.alert("更新パッケージ取り込み UPDATE_PACKAGE" + isSelectPackageId);
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
