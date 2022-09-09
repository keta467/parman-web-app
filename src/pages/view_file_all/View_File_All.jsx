import React from "react";
import File_All_Table from "../../components/tables/file_all_table/File_All_Table.jsx";
import Topbar from "../../components/topbar/Topbar.jsx";
import "./View_File_All.css";
import {
  GET_INSTALLED_MODULE,
  UPDATE_TERMINAL_MODULE_VERSION,
} from "../../api.js";

export default function View_File_All({ TitleText }) {
  const [isModulelist, setIsModulelist] = React.useState([]);
  const [isTERMINAL_LIST, setIsTerminalList] = React.useState([]);

  //
  //　テーブル用データ作成
  //
  async function createtabledata() {
    const ResponceData = await GET_INSTALLED_MODULE();
    const TERMINAL_LIST = ResponceData.TERMINAL_LIST;
    var modulelist = [];

    //モジュールリストの作成
    for (var i = 0; i < TERMINAL_LIST.length; i++) {
      var terminal = TERMINAL_LIST[i];
      for (var j = 0; j < terminal.MODULE_LIST.length; j++) {
        var okflag = true;
        for (var k = 0; k < modulelist.length; k++) {
          //既にモジュールリストにある場合
          if (modulelist[k].MODULE_ID == terminal.MODULE_LIST[j].MODULE_ID) {
            okflag = false;
            break;
          }
        }
        if (okflag == true) {
          modulelist.push(terminal.MODULE_LIST[j]);
        }
      }
    }

    setIsTerminalList(TERMINAL_LIST);
    setIsModulelist(modulelist);
  }

  //
  //最新バージョン取得
  //
  function getnewversion() {
    UPDATE_TERMINAL_MODULE_VERSION();
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
      <div className="viewfilealltablewrapper">
        <File_All_Table
          ModuleList={isModulelist}
          TERMINAL_LIST={isTERMINAL_LIST}
        />
      </div>
    </>
  );
}
