import React from "react";
import File_Separate_Table from "../../components/tables/file_separate_table/File_Separate_Table.jsx";
import Topbar from "../../components/topbar/Topbar.jsx";
import "./View_file_Separate.css";
import { Folder, ModulesToFoders } from "../../myclass.js";
import Tree_View from "../../components/tree_view/Tree_View.jsx";
import Modal_Edit_Path from "../../components/modals/modal_edit_path/Modal_Edit_Path.jsx";
import {
  GET_COLLECT_PATH,
  GET_INSTALLED_MODULE,
  GET_MODULE_INSTALLED_TERMINAL,
} from "../../api.js";

export default function View_file_Separate({ TitleText }) {
  const [isFolderList, setIsFolderList] = React.useState([]);

  const [isInstallPath, setIsInstallPath] = React.useState("");

  const [isTerminalList, setIsTerminalList] = React.useState([]);

  const [isShowModalEditPath, setIsShowModalEditPath] = React.useState(false);

  const [isPathList, setIsPathList] = React.useState([]);

  //
  // ツリーデータ作成
  //
  async function createtreedata() {
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

    //フォルダを取得
    var result = ModulesToFoders(modulelist);

    for (var i = 0; i < result[0].length; i++) {
      result[0][i].setclickfunc(ToggleFolder);
    }
    for (var i = 0; i < result[0].length; i++) {
      result[0][i].setfileclickfunc(SetFilePath);
    }
    setIsFolderList(result[0]);
  }

  //
  // テーブルデータ作成
  //
  async function createtabledata() {
    if (isInstallPath == "") {
      return;
    }
    const ResponceData = await GET_MODULE_INSTALLED_TERMINAL(isInstallPath);
    const TERMINAL_LIST = ResponceData.terminal_list;
    setIsTerminalList(TERMINAL_LIST);
  }

  //フォルダの開閉
  function ToggleFolder() {
    setIsFolderList((prevState) =>
      prevState.map(
        (value) => new Folder(null, null, null, null, null, null, value)
      )
    );
  }

  //ファイルの選択
  function SetFilePath(Path) {
    var elems = document.getElementsByClassName("filebox");
    for (var i = 0; i < elems.length; i++) {
      if (Path == elems[i].id) {
        elems[i].style.backgroundColor = "#F06060";
        elems[i].firstElementChild.style.color = "white";
      } else {
        elems[i].style.backgroundColor = "white";
        elems[i].firstElementChild.style.color = "blue";
      }
    }
    setIsInstallPath(Path); //どのファイルか記録
  }

  //収集先編集ボタン
  async function ClickEditPath() {
    const RespenceData = await GET_COLLECT_PATH();
    setIsPathList(RespenceData.collect_path);

    setIsShowModalEditPath(true);
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
        boxA.style.width = e.clientX - wrapper.offsetLeft - 12 + "px";
        boxB.style.width = boxB.clientWidth + 8 + "px";
      }
    });

    document.addEventListener("mouseup", function (e) {
      isHandler1Dragging = false;
    });

    //初期サイズ
    boxA.style.width = "40%";
    boxB.style.width = "60%";
  }

  //初回レンダリング時
  React.useEffect(() => {
    //リサイズイベント追加
    addMouseOverColoringEvent();

    //ツリー作成
    createtreedata();
  }, []);

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
          <Tree_View FolderList={isFolderList} />
        </div>
        <div className="handler" id="viewfileseparatehandler1"></div>
        <div id="viewfileseparatebox2">
          <div id="shuushuusakibutton">
            <button className="mybutton" onClick={ClickEditPath}>
              収集先編集
            </button>
          </div>
          <div className="fileseparatetablewrap">
            <File_Separate_Table TerminalList={isTerminalList} />
          </div>
        </div>
      </div>
    </>
  );
}
