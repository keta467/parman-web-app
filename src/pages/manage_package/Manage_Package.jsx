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
    const MODULE_LIST = ResponseData.module_list;

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
    const ALL_TERMINAL_LIST = ResponceData.terminal_list;

    const ResponceData2 = await GET_PACKAGE_TARGET_TERMINAL(isSelectPackageId);
    const TERGET_TERMINAL_LIST = ResponceData2.terminal_list;

    var is_target_terminal;
    var release_date;
    var released;
    for (var i = 0; i < ALL_TERMINAL_LIST.length; i++) {
      is_target_terminal = false;
      release_date = "";
      released = false;
      for (var j = 0; j < TERGET_TERMINAL_LIST.length; j++) {
        if (ALL_TERMINAL_LIST[i].id == TERGET_TERMINAL_LIST[j].id) {
          is_target_terminal = true;
          release_date = TERGET_TERMINAL_LIST[j].release_date;
          released = TERGET_TERMINAL_LIST[j].released;
          break;
        }
      }
      terminallist.push({
        id: ALL_TERMINAL_LIST[i].id,
        name: ALL_TERMINAL_LIST[i].name,
        display_name: ALL_TERMINAL_LIST[i].display_name,
        ip_address: ALL_TERMINAL_LIST[i].ip_address,
        is_target_terminal: is_target_terminal,
        release_date: release_date,
        released: released,
      });
    }
    return terminallist;
  }

  //フォルダを開閉させる処理
  function ToggleFolder() {
    setIsFolderList((prevState) =>
      prevState.map(
        (value) => new Folder(null, null, null, null, null, null, null, value)
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
        terminallist[i].name.toUpperCase().includes(keyword) ||
        terminallist[i].display_name.toUpperCase().includes(keyword) ||
        terminallist[i].ip_address.toUpperCase().includes(keyword) ||
        terminallist[i].release_date.toUpperCase().includes(keyword)
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
        const NEW_A = e.clientX - wrapper.offsetLeft;
        const NEW_B = boxB.clientWidth + (boxA.clientWidth - NEW_A);
        const NEW_C = boxC.clientWidth;

        if (NEW_A < 200 || NEW_B < 200) return;
        boxA.style.width = NEW_A + "px";
        boxB.style.width = NEW_B + "px";
        boxC.style.width = NEW_C + "px";
      }

      if (isHandler2Dragging) {
        const NEW_C = window.innerWidth - e.clientX - wrapper.offsetLeft;
        const NEW_B = boxB.clientWidth + (boxC.clientWidth - NEW_C);
        const NEW_A = boxA.clientWidth;

        if (NEW_B < 200 || NEW_C < 200) return;

        boxC.style.width = NEW_C + "px";
        boxB.style.width = NEW_B + "px";
        boxA.style.width = NEW_A + "px";
      }
    });

    document.addEventListener("mouseup", function (e) {
      isHandler1Dragging = false;
      isHandler2Dragging = false;
    });
    boxA.style.width = "22%";
    boxB.style.width = "28%";
    boxC.style.width = "50%";
  }

  React.useEffect(() => {
    addMouseOverColoringEvent();
  }, []);

  React.useEffect(() => {
    createtreedata();
    createtabledata();
    document.getElementById("serchtext").value = ""; // 検索ボックスをリセット
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
          <div className="widthheightoverflow">
            <Package_List
              isSelectPackageId={isSelectPackageId}
              setIsSelectPackageId={setIsSelectPackageId}
            />
          </div>
        </div>
        <div className="handler" id="managepackagehandler1"></div>
        <div id="managepackagebox2">
          <div className="widthheightoverflow">
            <Package_Alert
              isShowAlert={isShowPackageAlert}
              setIsShowAlert={setIsShowPackageAlert}
              isSelectPackageId={isSelectPackageId}
            />
            <Tree_View FolderList={isFolderList} />
          </div>
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
