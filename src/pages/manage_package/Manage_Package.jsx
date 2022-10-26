import React from "react";
import Topbar from "../../components/topbar/Topbar.jsx";
import Tree_View from "../../components/tree_view/Tree_View.jsx";
import "./Manage_Package.css";
import { Folder } from "../../lib/myclass.js";
import Manage_Package_Table from "../../components/tables/manage_package_table/Manage_Package_Table.jsx";
import Package_List from "../../components/tables/package_list/Package_List.jsx";
import Package_Alert from "../../components/alert/package_alert/Package_Alert.jsx";
import {
  GET_MODULE_LIST_IN_PACKAGE,
  GET_PACKAGE_TARGET_TERMINAL,
  GET_TERMINALS,
  UPDATE_PACKAGE,
} from "../../api.js";
import Loading_Animation from "../../components/alert/loading_animation/Loading_Animation.jsx";
import { ModulesToFoders } from "../../lib/myfunction.js";

// パッケージ管理画面
export default React.memo(function Manage_Package({ TitleText }) {
  //フォルダリスト
  const [isFolderList, setIsFolderList] = React.useState([]);

  //端末リスト
  const [isTerminalList, setIsTerminalList] = React.useState([]);

  //パッケージアラート表示フラグ
  const [isShowPackageAlert, setIsShowPackageAlert] = React.useState(false);

  //選択しているパッケージID
  const [isSelectPackageId, setIsSelectPackageId] = React.useState(-1);

  //ローディングアニメーション１
  const [isShowLoadingAnimation, setIsShowLoadingAnimation] =
    React.useState(false);

  //ローディングアニメーション２
  const [isShowLoadingAnimation2, setIsShowLoadingAnimation2] =
    React.useState(false);

  //ローディングアニメーション３
  const [isShowLoadingAnimation3, setIsShowLoadingAnimation3] =
    React.useState(false);

  //ローディングアニメーション３
  const [isShowLoadingAnimation4, setIsShowLoadingAnimation4] =
    React.useState(false);

  //
  // ツリーデータ作成
  //
  const createTreeData = React.useCallback(async (SelectPackageId) => {
    if (SelectPackageId == -1) return;
    //ローディングアニメーション開始
    setIsShowLoadingAnimation2(true);

    //表示クリア
    setIsFolderList([]);

    //ローディングアニメーション終了
    setIsShowPackageAlert(false);

    try {
      // 3.パッケージ内モジュール一覧
      const ResponseData = await GET_MODULE_LIST_IN_PACKAGE(SelectPackageId);

      //レスポンスからデータ取得
      const MODULE_LIST = ResponseData.module_list;

      //フォルダを取得
      console.log("クリエイトツリーでーた");
      const FolderList = ModulesToFoders(MODULE_LIST);

      for (var i = 0; i < FolderList.length; i++) {
        FolderList[i].setclickfunc(toggleFolder);
      }

      //一つでも更新されているファイルがあればアラートを表示
      for (var i = 0; i < MODULE_LIST.length; i++) {
        if (MODULE_LIST[i].difference == true) {
          setIsShowPackageAlert(true);
          break;
        }
      }

      // フォルダをセット
      setIsFolderList(FolderList);
    } catch {}

    //ローディング終了
    setIsShowLoadingAnimation2(false);
  }, []);

  //
  // テーブルデータ作成
  //
  const createTableData = React.useCallback(async (SelectPackageId) => {
    if (SelectPackageId == -1) return;
    //表示クリア
    setIsTerminalList([]);
    document.getElementById("serchtext").value = ""; // 検索ボックスをリセット
    document.getElementById("abc").checked = false; // ヘッダーのチェックボックスをリセット

    //ローディングアニメーション開始
    setIsShowLoadingAnimation3(true);
    //テーブルデータを構築し、セット
    setIsTerminalList(await merge(SelectPackageId));
    //ローディングアニメーション終了
    setIsShowLoadingAnimation3(false);
  }, []);

  //データをマージする処理
  async function merge(SelectPackageId) {
    // 端末リスト
    const TreminalList = [];

    try {
      //　7.管理端末一覧 からデータを取得
      const ResponceData = await GET_TERMINALS();
      const ALL_TERMINAL_LIST = ResponceData.terminal_list;

      // 6.パッケージ対応管理端末一覧 からデータを取得
      const ResponceData2 = await GET_PACKAGE_TARGET_TERMINAL(SelectPackageId);
      const TERGET_TERMINAL_LIST = ResponceData2.terminal_list;

      // ２つのデータをマージする
      var is_target_terminal;
      var release_date;
      var released;
      for (var i = 0; i < ALL_TERMINAL_LIST.length; i++) {
        is_target_terminal = false;
        release_date = "";
        released = false;
        for (var j = 0; j < TERGET_TERMINAL_LIST.length; j++) {
          // パッケージ対応管理端末の場合
          if (ALL_TERMINAL_LIST[i].id == TERGET_TERMINAL_LIST[j].id) {
            is_target_terminal = true;
            release_date = TERGET_TERMINAL_LIST[j].release_date;
            released = TERGET_TERMINAL_LIST[j].released;
            break;
          }
        }
        TreminalList.push({
          id: ALL_TERMINAL_LIST[i].id,
          name: ALL_TERMINAL_LIST[i].name,
          display_name: ALL_TERMINAL_LIST[i].display_name,
          ip_address: ALL_TERMINAL_LIST[i].ip_address,
          is_target_terminal: is_target_terminal,
          release_date: release_date,
          released: released,
        });
      }
    } catch {}

    return TreminalList;
  }

  // フォルダを開閉させる処理
  const toggleFolder = React.useCallback(() => {
    setIsFolderList((prevState) =>
      prevState.map(
        (value) => new Folder(null, null, null, null, null, null, null, value)
      )
    );
  });

  //一括同期ボタン
  async function clickDouki() {
    setIsShowLoadingAnimation4(true);
    try {
      await UPDATE_PACKAGE(0);
      //画面をリロード
      window.location.reload();
    } catch {}
    setIsShowLoadingAnimation4(false);
  }

  //検索ボタン
  async function searchclick() {
    //ローディングアニメーション開始
    setIsShowLoadingAnimation3(true);

    //表示クリア
    setIsTerminalList([]);

    // 検索ボックス内のテキストを全て大文字変換で取得
    const KeyWord = document.getElementById("serchtext").value.toUpperCase();

    const New_Data = [];
    const TreminalList = await merge(isSelectPackageId);
    for (var i = 0; i < TreminalList.length; i++) {
      if (
        TreminalList[i].name.toUpperCase().includes(KeyWord) ||
        TreminalList[i].display_name.toUpperCase().includes(KeyWord) ||
        TreminalList[i].ip_address.toUpperCase().includes(KeyWord) ||
        TreminalList[i].release_date.toUpperCase().includes(KeyWord)
      ) {
        New_Data.push(TreminalList[i]);
      }
    }
    setIsTerminalList(New_Data);

    //ローディングアニメーション終了
    setIsShowLoadingAnimation3(false);
  }

  // 左のリサイズハンドラー用フラグ
  var isHandler1Dragging = false;
  // 右のリサイズハンドラー用フラグ
  var isHandler2Dragging = false;

  ///
  /// マウスオーバーイベントを追加する（リサイズ処理）
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
        document.getElementById(
          "resize_div"
        ).innerHTML = `${boxA.style.width},${boxB.style.width},${boxC.style.width}`;
      }

      if (isHandler2Dragging) {
        const NEW_C = window.innerWidth - e.clientX - wrapper.offsetLeft;
        const NEW_B = boxB.clientWidth + (boxC.clientWidth - NEW_C);
        const NEW_A = boxA.clientWidth;

        if (NEW_B < 200 || NEW_C < 200) return;

        boxC.style.width = NEW_C + "px";
        boxB.style.width = NEW_B + "px";
        boxA.style.width = NEW_A + "px";

        document.getElementById(
          "resize_div"
        ).innerHTML = `${boxA.style.width},${boxB.style.width},${boxC.style.width}`;
      }
    });

    document.addEventListener("mouseup", function (e) {
      isHandler1Dragging = false;
      isHandler2Dragging = false;
    });

    const Resize_Div = document
      .getElementById("resize_div")
      .innerHTML.split(",");
    boxA.style.width = Resize_Div[0];
    boxB.style.width = Resize_Div[1];
    boxC.style.width = Resize_Div[2];
  }

  // 最初に描画されたとき
  React.useEffect(() => {
    addMouseOverColoringEvent();
  }, []);

  // 選択中のパッケージが変更されたとき
  React.useEffect(() => {
    createTreeData(isSelectPackageId);
    createTableData(isSelectPackageId);
  }, [isSelectPackageId]);

  return (
    <>
      <Topbar TitleText={TitleText} />
      <div
        style={{
          width: "96%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "25px",
          display: "flex",
        }}
      >
        <button className="mybutton" onClick={clickDouki}>
          パッケージ一括同期
        </button>
        <div
          style={{
            position: "relative",
            width: "40px",
            height: "40px",
            marginLeft: "5px",
          }}
        >
          <Loading_Animation isShowLoadingAnimation={isShowLoadingAnimation4} />
        </div>
      </div>

      <div id="managepackagewrapper">
        <div id="managepackagebox1">
          <Loading_Animation isShowLoadingAnimation={isShowLoadingAnimation} />
          <div className="widthheightoverflow">
            <Package_List
              isSelectPackageId={isSelectPackageId}
              setIsSelectPackageId={setIsSelectPackageId}
              setIsShowLoadingAnimation={setIsShowLoadingAnimation}
            />
          </div>
        </div>
        <div className="handler" id="managepackagehandler1"></div>
        <div id="managepackagebox2">
          <Loading_Animation isShowLoadingAnimation={isShowLoadingAnimation2} />
          <div className="widthheightoverflow">
            <Package_Alert
              isShowAlert={isShowPackageAlert}
              isSelectPackageId={isSelectPackageId}
              createtreedata={createTreeData}
              createTableData={createTableData}
            />
            <Tree_View FolderList={isFolderList} />
          </div>
        </div>
        <div className="handler" id="managepackagehandler2"></div>
        <div id="managepackagebox3">
          <div id="searchareawrapper">
            <form onSubmit={searchclick}>
              <input type="text" name="" id="serchtext" />
              <button
                type="submit"
                className="mybutton"
                style={{ userSelect: "none" }}
              >
                検索
              </button>
            </form>
          </div>
          <div id="manage_package_table_loding_area">
            <Loading_Animation
              isShowLoadingAnimation={isShowLoadingAnimation3}
            />
            <div id="manage_package_table_wrapper">
              <Manage_Package_Table
                TerminalList={isTerminalList}
                isSelectPackageId={isSelectPackageId}
                setIsShowLoadingAnimation3={setIsShowLoadingAnimation3}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
