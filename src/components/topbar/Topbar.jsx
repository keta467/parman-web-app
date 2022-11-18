import React from "react";
import style from "./Topbar.module.css";
import { Link } from "react-router-dom";
import { BASE_URL, DEBUG_MODE } from "../../api";

//トップバー
export default function Topbar({ TitleText }) {
  return (
    <div className={style.topbarContainer}>
      <p className={style.title}>リリースパッケージ管理システム</p>
      <p className={style.version}>
        version {document.getElementById("app_version").innerHTML}
      </p>
      <div className={style.topbartab}>
        <Link to="/manage_package">
          {TitleText == "パッケージ管理" ? (
            <div
              className={`${style.topbartabbutton} ${style.selecttopbartabbutton}`}
            >
              パッケージ管理
            </div>
          ) : (
            <div className={style.topbartabbutton}>パッケージ管理</div>
          )}
        </Link>
        <Link to="/manage_machine">
          {TitleText == "端末管理" ? (
            <div
              className={`${style.topbartabbutton} ${style.selecttopbartabbutton}`}
            >
              端末管理
            </div>
          ) : (
            <div className={style.topbartabbutton}>端末管理</div>
          )}
        </Link>
        <Link to="/view_file_all">
          {TitleText == "ファイル全体管理" ? (
            <div
              className={`${style.topbartabbutton} ${style.selecttopbartabbutton}`}
            >
              ファイル全体管理
            </div>
          ) : (
            <div className={style.topbartabbutton}>ファイル全体管理</div>
          )}
        </Link>
        <Link to="/view_file_separate">
          {TitleText == "ファイル別管理" ? (
            <div
              className={`${style.topbartabbutton} ${style.selecttopbartabbutton} ${style.toptabbuttonright}`}
            >
              ファイル別管理
            </div>
          ) : (
            <div
              className={`${style.topbartabbutton} ${style.toptabbuttonright}`}
            >
              ファイル別管理
            </div>
          )}
        </Link>
      </div>
    </div>
  );
}

if (DEBUG_MODE) {
  console.log(`デバッグモード：ダミーデータ参照中`);
} else {
  console.log(`リリースモード：API参照中\nURL：${BASE_URL}`);
}
