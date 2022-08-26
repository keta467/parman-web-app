import React from "react";
import "./PackageAlert.css";

export default function PackageAlert({ isShowAlert, setIsShowAlert }) {
  const CloseAlert = () => {
    window.alert("更新パッケージ取り込み UPDATE_PACKAGE");
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
