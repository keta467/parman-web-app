import React from "react";
import File_Separate_Table from "../../components/tables/file_separate_table/File_Separate_Table.jsx";
import Topbar from "../../components/topbar/Topbar.jsx";
import "./View_file_Separate.css";
import { Folder, ModulesToFoders } from "../../myclass.js";
import Tree_View from "../../components/tree_view/Tree_View.jsx";
import Modal_Edit_Path from "../../components/modals/modal_edit_path/Modal_Edit_Path.jsx";
import {
  GET_MODULE_INSTALLED_TERMINAL,
  GET_MODULE_LIST_IN_PACKAGE,
} from "../../api.js";

export default function View_file_Separate({ TitleText }) {
  const [isFolderList, setIsFolderList] = React.useState([]);

  const [isFilePath, setIsFilePath] = React.useState("");

  const [isTerminalList, setIsTerminalList] = React.useState([]);

  const [isShowModalEditPath, setIsShowModalEditPath] = React.useState(false);

  //
  // ツリーデータ作成
  //
  function createtreedata() {
    const MODULE_LIST = GET_MODULE_LIST_IN_PACKAGE().MODULE_LIST;

    //フォルダを取得
    var result = ModulesToFoders(MODULE_LIST);

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
  function createtabledata(INSTALL_PATH) {
    if (INSTALL_PATH == "") {
      return;
    }
    const TERMINAL_LIST = GET_MODULE_INSTALLED_TERMINAL().TERMINAL_LIST;
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
    setIsFilePath(Path); //どのファイルか記録
  }

  //収集先編集ボタン
  const ClickEditPath = () => {
    setIsShowModalEditPath(true);
  };

  //初回レンダリング時に実行
  React.useEffect(() => {
    createtreedata();
  }, []);

  //フォルダ変更時に実行
  React.useEffect(() => {
    SetFilePath(isFilePath);
  }, [isFolderList]);

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

  React.useEffect(() => {
    createtabledata(isFilePath);
  }, [isFilePath]);

  React.useEffect(() => {
    addMouseOverColoringEvent();
  }, []);

  return (
    <>
      <Topbar TitleText={TitleText} />
      <Modal_Edit_Path
        isShowModal={isShowModalEditPath}
        setIsShowModal={setIsShowModalEditPath}
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