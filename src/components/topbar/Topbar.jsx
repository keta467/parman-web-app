import React from "react";
import "./Topbar.css";
import { Link } from "react-router-dom";
import { BASE_URL, DEBUG_MODE } from "../../api";

export default function Topbar({ TitleText }) {
  return (
    <div className="topbarContainer">
      <div className="topbartab">
        <Link className="atag" to="/manage_package">
          {TitleText == "パッケージ管理" ? (
            <div className="topbartabbutton selecttopbartabbutton">
              パッケージ管理
            </div>
          ) : (
            <div className="topbartabbutton">パッケージ管理</div>
          )}
        </Link>
        <Link className="atag" to="/manage_machine">
          {TitleText == "端末管理" ? (
            <div className="topbartabbutton selecttopbartabbutton">
              端末管理
            </div>
          ) : (
            <div className="topbartabbutton">端末管理</div>
          )}
        </Link>
        <Link className="atag" to="/view_file_all">
          {TitleText == "ファイル全体管理" ? (
            <div className="topbartabbutton selecttopbartabbutton">
              ファイル全体管理
            </div>
          ) : (
            <div className="topbartabbutton">ファイル全体管理</div>
          )}
        </Link>
        <Link className="atag" to="/view_file_separate">
          {TitleText == "ファイル別管理" ? (
            <div className="topbartabbutton selecttopbartabbutton toptabbuttonright">
              ファイル別管理
            </div>
          ) : (
            <div className="topbartabbutton toptabbuttonright">
              ファイル別管理
            </div>
          )}
        </Link>
      </div>

      <div className="mode_description">
        <p>アプリ更新日: {document.getElementById("app_version").innerHTML}</p>
        {DEBUG_MODE ? (
          <p>デバッグモード: ダミーデータ参照中</p>
        ) : (
          <>
            {/* <p>リリースモード: API参照中</p>
            <p>URL: {BASE_URL}</p> */}
          </>
        )}
      </div>
    </div>
  );
}

if (DEBUG_MODE) {
  console.log(`デバッグモード：ダミーデータ参照中`);
} else {
  console.log(`リリースモード：API参照中\nURL：${BASE_URL}`);
}
