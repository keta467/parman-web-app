import React, { useContext } from "react";
import "./Topbar.css";
import { Link } from "react-router-dom";
import { DebugModeContext } from "../DebugModeContext";

export default function Topbar({ TitleText }) {
  function click(e) {
    setIsDebugMode({
      DebugMode: !isDebugMode.DebugMode,
      BaseURL: isDebugMode.BaseURL,
    });
  }

  function change(e) {
    setIsDebugMode({
      DebugMode: isDebugMode.DebugMode,
      BaseURL: e.target.value,
    });
  }

  const { isDebugMode, setIsDebugMode } = useContext(DebugModeContext);

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
        <button style={{ marginRight: "15px" }} onClick={click}>
          切り替え
        </button>
        {isDebugMode.DebugMode ? (
          <div>
            <p id="aiueo">デバッグモード</p>
            <p>ダミーデータ参照</p>
          </div>
        ) : (
          <div>
            <p id="aiueo">リリースモード</p>
            <p>
              API:{" "}
              <input
                id="takosuke"
                onChange={change}
                type="text"
                defaultValue={isDebugMode.BaseURL}
                style={{ width: "300px" }}
              />
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
