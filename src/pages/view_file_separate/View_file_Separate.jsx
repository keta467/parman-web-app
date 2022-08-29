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

  React.useEffect(() => {
    createtabledata(isFilePath);
  }, [isFilePath]);

  return (
    <>
      <Topbar TitleText={TitleText} />
      <Modal_Edit_Path
        isShowModal={isShowModalEditPath}
        setIsShowModal={setIsShowModalEditPath}
      />
      <div className="viewfileseparatewrapper">
        <div className="ViewfileSeparatetreeviewwrapper">
          <Tree_View FolderList={isFolderList} />
        </div>
        <div className="viewfileseparatetableviewwrapper">
          <div id="shuushuusakibutton">
            <button className="mybutton" onClick={ClickEditPath}>
              収集先編集
            </button>
          </div>
          <div className="fileseparatetablewrap">
            <div id="fileseparatetablewrapbutton"></div>
            <File_Separate_Table TerminalList={isTerminalList} />
          </div>
        </div>
      </div>
    </>
  );
}
