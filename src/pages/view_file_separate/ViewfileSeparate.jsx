import React from "react";
import FileSeparateTable from "../../components/tables/file_separate_table/FileSeparateTable.jsx";
import Topbar from "../../components/topbar/Topbar.jsx";
import "./ViewfileSeparate.css";
import { Folder, ModulesToFoders } from "../../myclass.js";
import TreeView from "../../components/treeview/TreeView.jsx";
import ModalEditPath from "../../components/modals/modaleditpath/ModalEditPath.jsx";
import {
  GET_MODULE_INSTALLED_TERMINAL,
  GET_MODULE_LIST_IN_PACKAGE,
} from "../../api.js";

export default function ViewfileSeparate({ titletext }) {
  const [folders, setFolders] = React.useState([]);

  const [isFilePath, setIsFilePath] = React.useState("");

  const [isTerminals, setIsTerminals] = React.useState([]);

  const [isShowModalAddMachine, setIsShowModalEditPath] = React.useState(false);

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
    setFolders(result[0]);
  }

  //
  // テーブルデータ作成
  //
  function createtabledata(INSTALL_PATH) {
    if (INSTALL_PATH == "") {
      return;
    }
    const TERMINAL_LIST = GET_MODULE_INSTALLED_TERMINAL().TERMINAL_LIST;
    setIsTerminals(TERMINAL_LIST);
  }

  //フォルダの開閉
  function ToggleFolder() {
    setFolders((prevState) =>
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
  }, [folders]);

  React.useEffect(() => {
    createtabledata(isFilePath);
  }, [isFilePath]);

  return (
    <>
      <Topbar titletext={titletext} />
      <ModalEditPath
        isShowModal={isShowModalAddMachine}
        setIsShowModal={setIsShowModalEditPath}
      />
      <div className="viewfileseparatewrapper">
        <div className="ViewfileSeparatetreeviewwrapper">
          <TreeView folders={folders} />
        </div>
        <div className="viewfileseparatetableviewwrapper">
          <div id="shuushuusakibutton">
            <button className="mybutton" onClick={ClickEditPath}>
              収集先編集
            </button>
          </div>
          <div className="fileseparatetablewrap">
            <div id="fileseparatetablewrapbutton"></div>
            <FileSeparateTable Terminals={isTerminals} />
          </div>
        </div>
      </div>
    </>
  );
}
