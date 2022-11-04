import React from "react";
import File_Separate_Table from "../../components/tables/file_separate_table/File_Separate_Table.jsx";
import Topbar from "../../components/topbar/Topbar.jsx";
import "./View_file_Separate.css";
import { Folder } from "../../lib/myclass.js";
import Tree_View from "../../components/tree_view/Tree_View.jsx";
import Modal_Edit_Path from "../../components/modals/modal_edit_path/Modal_Edit_Path.jsx";
import {
  GET_COLLECT_PATH,
  GET_INSTALLED_MODULE,
  GET_MODULE_INSTALLED_TERMINAL,
} from "../../api.js";
import Loading_Animation from "../../components/alert/loading_animation/Loading_Animation.jsx";
import { ModulesToFoders } from "../../lib/myfunction.js";

// ファイル別管理画面
export default function View_file_Separate({ TitleText }) {
  //フォルダリスト
  const [isFolderList, setIsFolderList] = React.useState([]);

  //選択されたファイルのインストールパス
  const [isInstallPath, setIsInstallPath] = React.useState("");

  //端末リスト
  const [isTerminalList, setIsTerminalList] = React.useState([]);

  //パス編集モーダルの表示フラグ
  const [isShowModalEditPath, setIsShowModalEditPath] = React.useState(false);

  //パスのリスト
  const [isPathList, setIsPathList] = React.useState([]);

  //ローディングアニメーションフラグ１
  const [isShowLoadingAnimation, setIsShowLoadingAnimation] =
    React.useState(false);

  //ローディングアニメーションフラグ２
  const [isShowLoadingAnimation2, setIsShowLoadingAnimation2] =
    React.useState(false);

  //
  // ツリーデータ作成
  //
  async function createTreeData() {
    //ローディング開始
    setIsShowLoadingAnimation(true);

    try {
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

      //フォルダを取得
      const FolderList = ModulesToFoders(ModuleList);

      for (var i = 0; i < FolderList.length; i++) {
        FolderList[i].setclickfunc(ToggleFolder);
      }
      for (var i = 0; i < FolderList.length; i++) {
        FolderList[i].setfileclickfunc(setFilePath);
      }
      setIsFolderList(FolderList);
    } catch {}

    //ローディング終了
    setIsShowLoadingAnimation(false);
  }

  //
  // テーブルデータ作成
  //
  async function createTableData() {
    if (isInstallPath == "") {
      return;
    }
    setIsShowLoadingAnimation2(true);

    //表示をクリア
    setIsTerminalList([]);

    try {
      const ResponceData = await GET_MODULE_INSTALLED_TERMINAL(isInstallPath);
      const TERMINAL_LIST = ResponceData.terminal_list;
      setIsTerminalList(TERMINAL_LIST);
    } catch {}

    setIsShowLoadingAnimation2(false);
  }

  // //フォルダを開閉させる処理
  const ToggleFolder = React.useCallback(() => {
    setIsFolderList((prevState) =>
      prevState.map(
        (value) => new Folder(null, null, null, null, null, null, null, value)
      )
    );
  });

  const setFilePath = React.useCallback((Path) => {
    var elems = document.getElementsByClassName("file_button");
    for (var i = 0; i < elems.length; i++) {
      elems[i].style.backgroundColor = "";
      elems[i].firstElementChild.style.color = "";
      elems[i].firstElementChild.firstElementChild.style.filter = "";
    }
    const SelectElem = document.getElementById(Path);
    if (SelectElem != null) {
      SelectElem.style.backgroundColor = "#F06060";
      SelectElem.firstElementChild.style.color = "white";
      SelectElem.firstElementChild.firstElementChild.style.filter =
        "brightness(0) invert(1)";
    }

    setIsInstallPath(Path); //どのファイルか記録
  });

  //収集先編集ボタン
  async function ClickEditPath() {
    try {
      const RespenceData = await GET_COLLECT_PATH();
      setIsPathList(RespenceData.collect_path);
      setIsShowModalEditPath(true);
    } catch {}
  }

  var isHandler1Dragging = false;
  ///
  /// マウスオーバーイベントを追加する
  ///
  function addMouseOverColoringEvent() {
    var handler1 = document.getElementById("viewfileseparatehandler1");
    var wrapper = document.getElementById("viewfileseparatewrapper");
    var boxA = document.getElementById("viewfileseparatebox1");
    var boxB = document.getElementById("viewfileseparatebox2");
    document.addEventListener("mousedown", function (e) {
      if (e.target === handler1) {
        isHandler1Dragging = true;
      }
    });

    document.addEventListener("mousemove", function (e) {
      if (isHandler1Dragging) {
        const NEW_A = e.clientX - wrapper.offsetLeft;
        const NEW_B = boxB.clientWidth + (boxA.clientWidth - NEW_A);

        if (NEW_A < 250 || NEW_B < 250) return;

        boxA.style.width = NEW_A + "px";
        boxB.style.width = NEW_B + "px";

        document.getElementById(
          "resize_div2"
        ).innerHTML = `${boxA.style.width},${boxB.style.width}`;
      }
    });

    document.addEventListener("mouseup", function (e) {
      isHandler1Dragging = false;
    });

    //初期サイズ
    const Resize_Div = document
      .getElementById("resize_div2")
      .innerHTML.split(",");
    boxA.style.width = Resize_Div[0];
    boxB.style.width = Resize_Div[1];
  }

  //初回レンダリング時
  React.useEffect(() => {
    //リサイズイベント追加
    addMouseOverColoringEvent();

    //ツリー作成
    createTreeData();
  }, []);

  //ファイル選択時
  React.useEffect(() => {
    createTableData();
  }, [isInstallPath]);

  //フォルダ変更時に実行
  React.useEffect(() => {
    setFilePath(isInstallPath);
  }, [isFolderList]);

  return (
    <>
      <Topbar TitleText={TitleText} />
      <Modal_Edit_Path
        isShowModal={isShowModalEditPath}
        setIsShowModal={setIsShowModalEditPath}
        isPathList={isPathList}
        setIsPathList={setIsPathList}
      />
      <div id="viewfileseparatewrapper">
        <div id="viewfileseparatebox1">
          <Loading_Animation isShowLoadingAnimation={isShowLoadingAnimation} />
          <div className="widthheightoverflow">
            <Tree_View FolderList={isFolderList} />
          </div>
        </div>
        <div className="handler" id="viewfileseparatehandler1"></div>
        <div id="viewfileseparatebox2">
          <div id="shuushuusakibutton">
            <button className="mybutton" onClick={ClickEditPath}>
              収集先パス編集
            </button>
          </div>
          <div id="view_file_separate_table_loading_area">
            <Loading_Animation
              isShowLoadingAnimation={isShowLoadingAnimation2}
            />
            <div className="fileseparatetablewrap">
              <File_Separate_Table TerminalList={isTerminalList} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
