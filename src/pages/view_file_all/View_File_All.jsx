import React from "react";
import File_All_Table from "../../components/tables/file_all_table/File_All_Table.jsx";
import Topbar from "../../components/topbar/Topbar.jsx";
import "./View_File_All.css";
import {
  GET_INSTALLED_MODULE,
  UPDATE_TERMINAL_MODULE_VERSION,
} from "../../api.js";
import Loading_Animation from "../../components/alert/loading_animation/Loading_Animation.jsx";

// ファイル全体管理画面
export default function View_File_All({ TitleText }) {
  //モジュールリスト
  const [isModulelist, setIsModulelist] = React.useState([]);

  //端末リスト
  const [isTERMINAL_LIST, setIsTerminalList] = React.useState([]);

  //ローディングアニメーションフラグ
  const [isShowLoadingAnimation, setIsShowLoadingAnimation] =
    React.useState(false);

  //ローディングアニメーションフラグ
  const [isShowLoadingAnimation2, setIsShowLoadingAnimation2] =
    React.useState(false);

  //ローディングアニメーションフラグ
  const [isShowLoadingAnimation3, setIsShowLoadingAnimation3] =
    React.useState(false);

  //
  //　テーブル用データ作成
  //
  async function createTableData() {
    //ローディングアニメーション開始
    setIsShowLoadingAnimation(true);

    //一回表示を空にする
    setIsTerminalList([]);
    setIsModulelist([]);

    try {
      // 14.端末モジュール一覧取得からデータを取得
      const ResponceData = await GET_INSTALLED_MODULE();
      const TERMINAL_LIST = ResponceData.terminal_list;
      const ModuleList = [];

      //モジュールリストの作成
      for (var i = 0; i < TERMINAL_LIST.length; i++) {
        const TERMINAL = TERMINAL_LIST[i];
        for (var j = 0; j < TERMINAL.module_list.length; j++) {
          var isOk = true;
          for (var k = 0; k < ModuleList.length; k++) {
            //既にモジュールリストにある場合
            if (
              ModuleList[k].module_name ==
                TERMINAL.module_list[j].module_name &&
              ModuleList[k].install_path == TERMINAL.module_list[j].install_path
            ) {
              isOk = false;
              break;
            }
          }
          if (isOk == true) {
            ModuleList.push(TERMINAL.module_list[j]);
          }
        }
      }

      setIsTerminalList(TERMINAL_LIST);
      setIsModulelist(ModuleList);
    } catch {}

    //ローディングアニメーション終了
    setIsShowLoadingAnimation(false);
  }

  //
  //端末別バージョン取得
  //
  async function getSeparateTerminalVersion() {
    setIsShowLoadingAnimation2(true);
    try {
      await UPDATE_TERMINAL_MODULE_VERSION(0);
    } catch {}
    setIsShowLoadingAnimation2(false);
  }

  //
  //最新バージョン取得
  //
  async function getNewVersion() {
    setIsShowLoadingAnimation3(true);
    try {
      await UPDATE_TERMINAL_MODULE_VERSION(0);
    } catch {}
    setIsShowLoadingAnimation3(false);
  }

  //初回レンダリング後
  React.useEffect(() => {
    createTableData();
  }, []);

  return (
    <>
      <Topbar TitleText={TitleText} />

      <div className="viewfileallbuttonwrapper">
        <button className="mybutton marginleft10" onClick={createTableData}>
          再表示
        </button>
        <button
          className="mybutton marginleft10"
          onClick={getSeparateTerminalVersion}
        >
          端末別バージョン取得
        </button>
        {isShowLoadingAnimation2 ? (
          <div
            style={{
              position: "relative",
              width: "40px",
              height: "40px",
              marginLeft: "5px",
            }}
          >
            <Loading_Animation
              isShowLoadingAnimation={isShowLoadingAnimation2}
            />
          </div>
        ) : (
          <></>
        )}
        <button className="mybutton marginleft10" onClick={getNewVersion}>
          全端末バージョン取得
        </button>
        {isShowLoadingAnimation3 ? (
          <div
            style={{
              position: "relative",
              width: "40px",
              height: "40px",
              marginLeft: "5px",
            }}
          >
            <Loading_Animation
              isShowLoadingAnimation={isShowLoadingAnimation3}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div id="view_file_all_table_loading_area">
        <Loading_Animation isShowLoadingAnimation={isShowLoadingAnimation} />
        {isTERMINAL_LIST.length != 0 ? (
          <div className="viewfilealltablewrapper">
            <File_All_Table
              ModuleList={isModulelist}
              TERMINAL_LIST={isTERMINAL_LIST}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
