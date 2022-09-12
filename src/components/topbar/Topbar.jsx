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

      <div
        className="bold"
        style={{
          width: "500px",
          marginRight: "15px",
          display: "flex",
        }}
      >
        {DEBUG_MODE ? (
          <div>
            <p>デバッグモード</p>
            <p>ダミーデータ参照</p>
          </div>
        ) : (
          <div>
            <p>リリースモード</p>
            <p>API:{BASE_URL}</p>
          </div>
        )}
      </div>
    </div>
  );
}
