import React from "react";
import "./Topbar.css";
import { Link } from "react-router-dom";
import { DebugModeContext } from "../providers/DebugModeProvider.jsx";

export default function Topbar({ titletext }) {
  const { isDebugMode, setIsDebugMode } = React.useContext(DebugModeContext);

  function click() {
    setIsDebugMode(!isDebugMode);
  }

  return (
    <div className="topbarContainer">
      <div className="topbartab">
        <Link className="atag" to="/manage_package">
          {titletext == "パッケージ情報" ? (
            <div className="topbartabbutton selecttopbartabbutton">
              パッケージ情報
            </div>
          ) : (
            <div className="topbartabbutton">パッケージ情報</div>
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

      {isDebugMode ? (
        <span className="redtext bold" onClick={click}>
          {" "}
          デバッグモードで稼働中
        </span>
      ) : (
        <span className="whitetext bold" onClick={click}>
          {" "}
          リリースモードで稼働中
        </span>
      )}
      <div className="topbarbuttonswraper">
        <button>パッケージ同期</button>
      </div>
    </div>
  );
}
