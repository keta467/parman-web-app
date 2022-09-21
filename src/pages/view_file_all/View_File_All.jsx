import React from "react";
import File_All_Table from "../../components/tables/file_all_table/File_All_Table.jsx";
import Topbar from "../../components/topbar/Topbar.jsx";
import "./View_File_All.css";
import {
  GET_INSTALLED_MODULE,
  UPDATE_TERMINAL_MODULE_VERSION,
} from "../../api.js";
import Loading_Animation from "../../components/alert/loading_animation/Loading_Animation.jsx";

export default function View_File_All({ TitleText }) {
  //モジュールリスト
  const [isModulelist, setIsModulelist] = React.useState([]);

  //端末リスト
  const [isTERMINAL_LIST, setIsTerminalList] = React.useState([]);

  //ローディングアニメーションフラグ
  const [isShowLoadingAnimation, setIsShowLoadingAnimation] =
    React.useState(false);

  //
  //　テーブル用データ作成
  //
  async function createtabledata() {
    //ローディングアニメーション開始
    setIsShowLoadingAnimation(true);

    //一回表示を空にする
    setIsTerminalList([]);
    setIsModulelist([]);

    try {
      const ResponceData = await GET_INSTALLED_MODULE();
      const TERMINAL_LIST = ResponceData.terminal_list;
      var modulelist = [];

      //モジュールリストの作成
      for (var i = 0; i < TERMINAL_LIST.length; i++) {
        var terminal = TERMINAL_LIST[i];
        for (var j = 0; j < terminal.module_list.length; j++) {
          var okflag = true;
          for (var k = 0; k < modulelist.length; k++) {
            //既にモジュールリストにある場合
            if (modulelist[k].module_id == terminal.module_list[j].module_id) {
              okflag = false;
              break;
            }
          }
          if (okflag == true) {
            modulelist.push(terminal.module_list[j]);
          }
        }
      }

      setIsTerminalList(TERMINAL_LIST);
      setIsModulelist(modulelist);
    } catch {}

    //ローディングアニメーション終了
    setIsShowLoadingAnimation(false);
  }

  //
  //最新バージョン取得
  //
  async function getnewversion() {
    try {
      await UPDATE_TERMINAL_MODULE_VERSION(0);
    } catch {}
  }

  //初回レンダリング後
  React.useEffect(() => {
    createtabledata();
  }, []);

  return (
    <>
      <Topbar TitleText={TitleText} />

      <div className="viewfileallbuttonwrapper">
        <button id="redobutton" className="mybutton" onClick={createtabledata}>
          再表示
        </button>
        <button className="mybutton" onClick={getnewversion}>
          最新バージョン取得
        </button>
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
