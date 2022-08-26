import React from "react";
import FileAllTable from "../../components/tables/file_all_table/FileAllTable.jsx";
import Topbar from "../../components/topbar/Topbar.jsx";
import "./ViewFileAll.css";
import { GET_INSTALLED_MODULE } from "../../api.js";

export default function ViewFileAll({ titletext }) {
  const [isModulelist, setIsModulelist] = React.useState([]);
  const [isTERMINAL_LIST, setIsTerminalList] = React.useState([]);

  //
  //　テーブル用データ作成
  //
  function createtabledata() {
    const TERMINAL_LIST = GET_INSTALLED_MODULE().TERMINAL_LIST;
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

  //初回レンダリング後
  React.useEffect(() => {
    createtabledata();
  }, []);

  return (
    <>
      <Topbar titletext={titletext} />
      <div className="viewfileallbuttonwrapper">
        <button id="redobutton" className="mybutton" onClick={createtabledata}>
          再表示
        </button>
        <button className="mybutton">最新バージョン取得</button>
      </div>
      <div className="viewfilealltablewrapper">
        <FileAllTable
          ModuleList={isModulelist}
          TERMINAL_LIST={isTERMINAL_LIST}
        />
      </div>
    </>
  );
}
