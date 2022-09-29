import React from "react";
import File_Separate_Table from "../../components/tables/file_separate_table/File_Separate_Table.jsx";
import Topbar from "../../components/topbar/Topbar.jsx";
import "./View_file_Separate.css";
import { Folder, ModulesToFoders } from "../../lib/myclass.js";
import Tree_View from "../../components/tree_view/Tree_View.jsx";
import Modal_Edit_Path from "../../components/modals/modal_edit_path/Modal_Edit_Path.jsx";
import {
  GET_COLLECT_PATH,
  GET_INSTALLED_MODULE,
  GET_MODULE_INSTALLED_TERMINAL,
} from "../../api.js";
import Loading_Animation from "../../components/alert/loading_animation/Loading_Animation.jsx";

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
  async function createtreedata() {
    setIsShowLoadingAnimation(true);

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
            if (
              modulelist[k].module_name ==
                terminal.module_list[j].module_name &&
              modulelist[k].install_path == terminal.module_list[j].install_path
            ) {
              okflag = false;
              break;
            }
          }
          if (okflag == true) {
            modulelist.push(terminal.module_list[j]);
          }
        }
      }

      //フォルダを取得
      const FolderList = ModulesToFoders(modulelist);

      for (var i = 0; i < FolderList.length; i++) {
        FolderList[i].setclickfunc(ToggleFolder);
      }
      for (var i = 0; i < FolderList.length; i++) {
        FolderList[i].setfileclickfunc(SetFilePath);
      }
      setIsFolderList(FolderList);
    } catch {}

    setIsShowLoadingAnimation(false);
  }

  //
  // テーブルデータ作成
  //
  async function createtabledata() {
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

  const SetFilePath = React.useCallback((Path) => {
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
        // boxA.style.width = e.clientX - wrapper.offsetLeft - 12 + "px";
        // boxB.style.width = boxB.clientWidth + 8 + "px";

        const NEW_A = e.clientX - wrapper.offsetLeft;
        const NEW_B = boxB.clientWidth + (boxA.clientWidth - NEW_A);

        if (NEW_A < 250 || NEW_B < 250) return;

        boxA.style.width = NEW_A + "px";
        boxB.style.width = NEW_B + "px";
      }
    });

    document.addEventListener("mouseup", function (e) {
      isHandler1Dragging = false;
    });

    //初期サイズ
    boxA.style.width = "35%";
    boxB.style.width = "65%";
  }

  //初回レンダリング時
  React.useEffect(() => {
    //リサイズイベント追加
    addMouseOverColoringEvent();

    //ツリー作成
    createtreedata();
  }, []);

  //ファイル選択時
  React.useEffect(() => {
    //テーブル作成
    createtabledata();
  }, [isInstallPath]);

  //フォルダ変更時に実行
  React.useEffect(() => {
    SetFilePath(isInstallPath);
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
              収集先編集
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
