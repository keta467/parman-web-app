import React from "react";
import "./Topbar.css";
import { Link } from "react-router-dom";

export default function Topbar({ titletext }) {
  function click() {
    setIsDebugMode(!isDebugMode);
  }

  return (
    <div className="topbarContainer">
      <div className="topbartab">
        <Link className="atag" to="/manage_package">
          {titletext == "パッケージ管理" ? (
            <div className="topbartabbutton selecttopbartabbutton">
              パッケージ管理
            </div>
          ) : (
            <div className="topbartabbutton">パッケージ管理</div>
          )}
        </Link>
        <Link className="atag" to="/manage_machine">
          {titletext == "端末管理" ? (
            <div className="topbartabbutton selecttopbartabbutton">
              端末管理
            </div>
          ) : (
            <div className="topbartabbutton">端末管理</div>
          )}
        </Link>
        <Link className="atag" to="/view_file_all">
          {titletext == "ファイル全体管理" ? (
            <div className="topbartabbutton selecttopbartabbutton">
              ファイル全体管理
            </div>
          ) : (
            <div className="topbartabbutton">ファイル全体管理</div>
          )}
        </Link>
        <Link className="atag" to="/view_file_separate">
          {titletext == "ファイル別管理" ? (
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
    </div>
  );
}
