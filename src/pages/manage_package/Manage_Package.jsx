import React from "react";
import Topbar from "../../components/topbar/Topbar.jsx";
import Tree_View from "../../components/tree_view/Tree_View.jsx";
import "./Manage_Package.css";
import { Folder, ModulesToFoders } from "../../myclass.js";
import Manage_Package_Table from "../../components/tables/manage_package_table/Manage_Package_Table.jsx";
import Package_List from "../../components/tables/package_list/Package_List.jsx";
import Package_Alert from "../../components/alert/package_alert/Package_Alert.jsx";
import {
  GET_MODULE_LIST_IN_PACKAGE,
  GET_PACKAGE_TARGET_TERMINAL,
  GET_TERMINALS,
  UPDATE_PACKAGE,
} from "../../api.js";

export default React.memo(function Manage_Package({ TitleText }) {
  const [isFolderList, setIsFolderList] = React.useState([]);
  const [isTerminalList, setIsTerminalList] = React.useState([]);
  const [isShowPackageAlert, setIsShowPackageAlert] = React.useState(false);

  const [isSelectPackageId, setIsSelectPackageId] = React.useState(-1);

  //
  // ツリーデータ作成
  //
  async function createtreedata() {
    if (isSelectPackageId == -1) return;

    const ResponseData = await GET_MODULE_LIST_IN_PACKAGE(isSelectPackageId);
    const MODULE_LIST = ResponseData.MODULE_LIST;

    //フォルダと更新情報を取得
    var result = ModulesToFoders(MODULE_LIST);
    for (var i = 0; i < result[0].length; i++) {
      result[0][i].setclickfunc(ToggleFolder);
    }

    //一つでも更新されているファイルがあればアラートを表示
    if (result[1] == true) {
      setIsShowPackageAlert(true);
    }

    setIsFolderList(result[0]);
  }

  //
  // テーブルデータ作成
  //
  async function createtabledata() {
    if (isSelectPackageId == -1) return;
    setIsTerminalList(await merge());
  }

  //データをマージする処理
  async function merge() {
    var terminallist = [];

    const ResponceData = await GET_TERMINALS();
    const ALL_TERMINAL_LIST = ResponceData.TERMINAL_LIST;

    const ResponceData2 = await GET_PACKAGE_TARGET_TERMINAL(isSelectPackageId);
    const TERGET_TERMINAL_LIST = ResponceData2.TERMINAL_LIST;

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
      terminallist.push({
        ID: ALL_TERMINAL_LIST[i].ID,
        NAME: ALL_TERMINAL_LIST[i].NAME,
        DISPLAY_NAME: ALL_TERMINAL_LIST[i].DISPLAY_NAME,
        IP_ADDRESS: ALL_TERMINAL_LIST[i].IP_ADDRESS,
        IS_TARGET_TERMINAL: IS_TARGET_TERMINAL,
        RELEASE_DATE: RELEASE_DATE,
        RELEASED: RELEASED,
      });
    }
    return terminallist;
  }

  //フォルダを開閉させる処理
  function ToggleFolder() {
    setIsFolderList((prevState) =>
      prevState.map(
        (value) => new Folder(null, null, null, null, null, null, value)
      )
    );
  }

  //一括同期ボタン
  function doukiclick() {
    UPDATE_PACKAGE(0);
  }

  //検索ボタン
  async function searchclick() {
    var element = document.getElementById("serchtext");

    const keyword = element.value.toUpperCase();
    var new_data = [];
    const terminallist = await merge();
    for (var i = 0; i < terminallist.length; i++) {
      if (
        terminallist[i].NAME.toUpperCase().includes(keyword) ||
        terminallist[i].DISPLAY_NAME.toUpperCase().includes(keyword) ||
        terminallist[i].IP_ADDRESS.toUpperCase().includes(keyword) ||
        terminallist[i].RELEASE_DATE.toUpperCase().includes(keyword)
      ) {
        new_data.push(terminallist[i]);
      }
    }
    setIsTerminalList(new_data);
  }

  var isHandler1Dragging = false;
  var isHandler2Dragging = false;
  ///
  /// マウスオーバーイベントを追加する
  ///
  function addMouseOverColoringEvent() {
    var handler1 = document.getElementById("managepackagehandler1");
    var handler2 = document.getElementById("managepackagehandler2");
    var wrapper = document.getElementById("managepackagewrapper");
    var boxA = document.getElementById("managepackagebox1");
    var boxB = document.getElementById("managepackagebox2");
    var boxC = document.getElementById("managepackagebox3");
    document.addEventListener("mousedown", function (e) {
      if (e.target === handler1) {
        isHandler1Dragging = true;
      }
      if (e.target === handler2) {
        isHandler2Dragging = true;
      }
    });

    document.addEventListener("mousemove", function (e) {
      if (isHandler1Dragging) {
        boxA.style.width = e.clientX - wrapper.offsetLeft - 12 + "px";
        boxB.style.width = boxB.clientWidth + 8 + "px";
        boxC.style.width = boxC.clientWidth - 8 + "px";
      }

      if (isHandler2Dragging) {
        boxA.style.width = boxA.clientWidth + "px";
        boxB.style.width = boxB.clientWidth + "px";
        boxC.style.width =
          window.innerWidth - e.clientX - wrapper.offsetLeft - 23 + "px";
      }
    });

    document.addEventListener("mouseup", function (e) {
      isHandler1Dragging = false;
      isHandler2Dragging = false;
    });
    boxA.style.width = "25%";
    boxB.style.width = "30%";
    boxC.style.width = "45%";
  }

  React.useEffect(() => {
    addMouseOverColoringEvent();
  }, []);

  React.useEffect(() => {
    createtreedata();
    createtabledata();
  }, [isSelectPackageId]);

  return (
    <>
      <Topbar TitleText={TitleText} />
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

      <div id="managepackagewrapper">
        <div id="managepackagebox1">
          <Package_List
            isSelectPackageId={isSelectPackageId}
            setIsSelectPackageId={setIsSelectPackageId}
          />
        </div>
        <div className="handler" id="managepackagehandler1"></div>
        <div id="managepackagebox2">
          <Package_Alert
            isShowAlert={isShowPackageAlert}
            setIsShowAlert={setIsShowPackageAlert}
            isSelectPackageId={isSelectPackageId}
          />
          <Tree_View FolderList={isFolderList} />
        </div>
        <div className="handler" id="managepackagehandler2"></div>
        <div id="managepackagebox3">
          <div id="searchareawrapper">
            <input type="text" name="" id="serchtext" />
            <button
              className="mybutton"
              onClick={searchclick}
              style={{ userSelect: "none" }}
            >
              検索
            </button>
          </div>
          <div id="managepackagesearchviewtablewrapper">
            <Manage_Package_Table
              TerminalList={isTerminalList}
              isSelectPackageId={isSelectPackageId}
            />
          </div>
        </div>
      </div>
    </>
  );
});
