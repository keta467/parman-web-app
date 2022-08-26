import React from "react";
import Topbar from "../../components/topbar/Topbar.jsx";
import TreeView from "../../components/treeview/TreeView.jsx";
import "./ManagePackage.css";
import { Folder, ModulesToFoders } from "../../myclass.js";
import ManagePackageTable from "../../components/tables/manage_package_table/ManagePackageTable.jsx";
import PackageList from "../../components/tables/package_list/PackageList.jsx";
import PackageAlert from "../../components/alert/package_alert/PackageAlert.jsx";
import {
  GET_MODULE_LIST_IN_PACKAGE,
  GET_PACKAGE_LIST,
  GET_PACKAGE_TARGET_TERMINAL,
  GET_TERMINALS,
} from "../../api.js";

export default function ManagePackage({ titletext }) {
  const PACKAGE_LIST = GET_PACKAGE_LIST().PACKAGE_LIST;
  const [folders, setFolders] = React.useState([]);
  const [isShowPackageAlert, setIsShowPackageAlert] = React.useState(false);
  const [isPCList, setIsPCList] = React.useState([]);

  //
  // ツリーデータ作成
  //
  function createtreedata() {
    const MODULE_LIST = GET_MODULE_LIST_IN_PACKAGE().MODULE_LIST;

    //フォルダと更新情報を取得
    var result = ModulesToFoders(MODULE_LIST);
    for (var i = 0; i < result[0].length; i++) {
      result[0][i].setclickfunc(ToggleFolder);
    }

    //一つでも更新されているファイルがあればアラートを表示
    if (result[1] == true) {
      setIsShowPackageAlert(true);
    }

    setFolders(result[0]);
  }

  //
  // テーブルデータ作成
  //
  function createtabledata() {
    var pclist = [];

    const ALL_TERMINAL_LIST = GET_TERMINALS().TERMINAL_LIST;
    const TERGET_TERMINAL_LIST = GET_PACKAGE_TARGET_TERMINAL().TERMINAL_LIST;

    var IS_TARGET_TERMINAL;
    var RELEASE_DATE;
    var RELEASED;
    for (var i = 0; i < ALL_TERMINAL_LIST.length; i++) {
      IS_TARGET_TERMINAL = false;
      RELEASE_DATE = "";
      RELEASED = false;
      for (var j = 0; j < TERGET_TERMINAL_LIST.length; j++) {
        if (ALL_TERMINAL_LIST[i].ID == TERGET_TERMINAL_LIST[j].ID) {
          IS_TARGET_TERMINAL = true;
          RELEASE_DATE = TERGET_TERMINAL_LIST[j].RELEASE_DATE;
          RELEASED = TERGET_TERMINAL_LIST[j].RELEASED;
          break;
        }
      }
      pclist.push({
        ID: ALL_TERMINAL_LIST[i].ID,
        NAME: ALL_TERMINAL_LIST[i].NAME,
        DISPLAY_NAME: ALL_TERMINAL_LIST[i].DISPLAY_NAME,
        IP_ADDRESS: ALL_TERMINAL_LIST[i].IP_ADDRESS,
        IS_TARGET_TERMINAL: IS_TARGET_TERMINAL,
        RELEASE_DATE: RELEASE_DATE,
        RELEASED: RELEASED,
      });
    }
    setIsPCList(pclist);
  }

  //フォルダを開閉させる処理
  function ToggleFolder() {
    setFolders((prevState) =>
      prevState.map(
        (value) => new Folder(null, null, null, null, null, null, value)
      )
    );
  }

  //一括同期ボタン
  function doukiclick() {
    window.alert("更新パッケージ取り込み UPDATE_PACKAGE");
  }

  //検索ボタン
  function searchclick() {
    var element = document.getElementById("serchtext");

    const keyword = element.value.toUpperCase();
    var pclist = [];
    var data = gettabledata();
    for (var i = 0; i < data.length; i++) {
      if (
        data[i].NAME.toUpperCase().includes(keyword) ||
        data[i].DISPLAY_NAME.toUpperCase().includes(keyword) ||
        data[i].IP_ADDRESS.toUpperCase().includes(keyword) ||
        data[i].RELEASE_DATE.toUpperCase().includes(keyword)
      ) {
        pclist.push(data[i]);
      }
    }
    setIsPCList(pclist);
  }

  React.useEffect(() => {
    createtreedata();
    createtabledata();
  }, []);

  return (
    <>
      <Topbar titletext={titletext} />
      <div
        style={{
          width: "96%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "30px",
        }}
      >
        <button className="mybutton" onClick={doukiclick}>
          パッケージ一括同期
        </button>
      </div>

      <div className="managepackagewrapper">
        <div className="managepackagelistwrapper">
          <PackageList packages={PACKAGE_LIST} />
        </div>
        <div className="managepackagetreeview">
          <PackageAlert
            isShowAlert={isShowPackageAlert}
            setIsShowAlert={setIsShowPackageAlert}
          />
          <TreeView folders={folders} />
        </div>
        <div className="managepackagesearchview">
          <div id="searchareawrapper">
            <input type="text" name="" id="serchtext" />
            <button className="mybutton" onClick={searchclick}>
              検索
            </button>
          </div>
          <div className="managepackagesearchviewtablewrapper">
            <ManagePackageTable pclist={isPCList} />
          </div>
        </div>
      </div>
    </>
  );
}
