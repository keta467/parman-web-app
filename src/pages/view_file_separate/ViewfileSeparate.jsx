import React from "react";
import FileSeparateTable from "../../components/tables/file_separate_table/FileSeparateTable.jsx";
import Topbar from "../../components/topbar/Topbar.jsx";
import "./ViewfileSeparate.css";
import { Folder, File } from "../../myclass.js";
import TreeView from "../../components/treeview/TreeView.jsx";
import { installModulesInfo, TreeData2, FileList } from "../../dummyData.js";
import { DebugModeContext } from "../../components/providers/DebugModeProvider.jsx";
import ModalEditPath from "../../components/modals/modaleditpath/ModalEditPath.jsx";
import { GET_INSTALLED_MODULE } from "../../DummyDatas/GET_INSTALLED_MODULE.js";
import { GET_MODULE_INSTALLED_TERMINAL } from "../../DummyDatas/GET_MODULE_INSTALLED_TERMINAL.js";

export default function ViewfileSeparate({ titletext }) {
  const { isDebugMode } = React.useContext(DebugModeContext);

  const [folders, setFolders] = React.useState([]);

  const [isFilePath, setIsFilePath] = React.useState("");

  const [isTerminals, setIsTerminals] = React.useState([]);

  function ToggleFolder() {
    setFolders((prevState) =>
      prevState.map(
        (value) => new Folder(null, null, null, null, null, null, value)
      )
    );
  }

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

  async function createtreedata() {
    var modulelist = [];
    if (isDebugMode) {
      //モジュールリストの作成
      for (var i = 0; i < GET_INSTALLED_MODULE.TERMINAL_LIST.length; i++) {
        var terminal = GET_INSTALLED_MODULE.TERMINAL_LIST[i];
        for (var j = 0; j < terminal.MODULE_LIST.length; j++) {
          var okflag = true;
          for (var k = 0; k < modulelist.length; k++) {
            //既にモジュールリストにある場合
            if (modulelist[k].MODULE_ID == terminal.MODULE_LIST[j].MODULE_ID) {
              okflag = false;
              break;
            }
          }
          if (okflag == true) {
            modulelist.push(terminal.MODULE_LIST[j]);
          }
        }
      }
      ///
      ///フォルダを全て生成
      ///
      var folderlist = [];

      for (var i = 0; i < modulelist.length; i++) {
        const str = modulelist[i].INSTALL_PATH;
        const regex = /([^\\]*)\\/g;
        const foldersInPath = str.match(regex);
        for (var j = 0; j < foldersInPath.length; j++) {
          //パス
          var count = 0;
          var Path = "";
          var ParentFolderPath = "";
          for (var k = 0; k < str.length; k++) {
            if (count == j + 1) {
              break;
            }

            Path += str[k];
            if (str[k] == "\\") {
              count = count + 1;
              if (count == j) {
                ParentFolderPath = Path;
              }
            }
          }
          //重複チェック
          var isok = true;
          for (var k = 0; k < folderlist.length; k++) {
            if (
              folderlist[k].Path == Path &&
              folderlist[k].name == foldersInPath[j].replace("\\", "")
            ) {
              isok = false;
              break;
            }
          }
          //新規フォルダの場合
          if (isok) {
            if (j == 0) {
              folderlist.push(
                new Folder(
                  folderlist.length + 1,
                  foldersInPath[j].replace("\\", ""),
                  true,
                  0,
                  Path,
                  ToggleFolder
                )
              );
            } else {
              //親フォルダIDを見つけ出す
              var parentfolderid = 0;
              for (var k = 0; k < folderlist.length; k++) {
                //もしパスから自分を抜いたパスとパスが一致するフォルダの場合
                if (folderlist[k].Path == ParentFolderPath) {
                  parentfolderid = folderlist[k].id;
                  break;
                }
              }
              folderlist.push(
                new Folder(
                  folderlist.length + 1,
                  foldersInPath[j].replace("\\", ""),
                  true,
                  parentfolderid,
                  Path,
                  ToggleFolder
                )
              );
            }
            //console.log(`${folderlist[folderlist.length - 1].Path}`)
          }
        }
      }

      var files = [];
      for (var i = 0; i < modulelist.length; i++) {
        var parentfolderid;
        for (var j = 0; j < folderlist.length; j++) {
          if (
            folderlist[j].Path ==
            modulelist[i].INSTALL_PATH.replace(modulelist[i].MODULE_NAME, "")
          ) {
            parentfolderid = folderlist[j].id;
          }
        }

        files.push(
          new File(
            modulelist[i].MODULE_NAME,
            parentfolderid,
            modulelist[i].INSTALL_PATH,
            SetFilePath
          )
        );
      }
      //フォルダにファイルを入れる
      for (var i = 0; i < folderlist.length; i++) {
        for (var j = 0; j < files.length; j++) {
          if (folderlist[i].id == files[j].parentfolderid) {
            folderlist[i].addchild(files[j]);
          }
        }
      }

      //フォルダにフォルダを入れる
      for (var i = 0; i < folderlist.length; i++) {
        for (var j = 0; j < folderlist.length; j++) {
          if (folderlist[i].id == folderlist[j].parentfolderid) {
            folderlist[i].addchild(folderlist[j]);
          }
        }
      }
      //並べ替え
      for (var i = 0; i < folderlist.length; i++) {
        folderlist[i].narabekae();
      }
    } else {
    }

    //親フォルダが０のみのフォルダをセット
    var arrr = [];
    for (var i = 0; i < folderlist.length; i++) {
      if (folderlist[i].parentfolderid == 0) {
        arrr.push(folderlist[i]);
      }
    }
    setFolders(arrr);
  }

  function createtabledata(INSTALL_PATH) {
    if (INSTALL_PATH == "") {
      return;
    }
    if (isDebugMode) {
      setIsTerminals(GET_MODULE_INSTALLED_TERMINAL.TERMINAL_LIST);
    } else {
    }
  }

  //初回レンダリング時に実行
  React.useEffect(() => {
    createtreedata();
  }, []);

  //フォルダ変更時に実行
  React.useEffect(() => {
    SetFilePath(isFilePath);
  }, [folders]);

  //フォルダ変更時に実行
  React.useEffect(() => {
    createtabledata(isFilePath);
  }, [isFilePath]);

  const [isShowModalAddMachine, setIsShowModalAddMachine] =
    React.useState(false);

  const ClickAddButton = () => {
    setIsShowModalAddMachine(true);
  };

  return (
    <>
      <Topbar titletext={titletext} />
      <ModalEditPath
        isShowModal={isShowModalAddMachine}
        setIsShowModal={setIsShowModalAddMachine}
      />
      <div className="viewfileseparatewrapper">
        <div className="ViewfileSeparatetreeviewwrapper">
          <TreeView folders={folders} />
        </div>
        <div className="viewfileseparatetableviewwrapper">
          <div id="shuushuusakibutton">
            <button className="mybutton" onClick={ClickAddButton}>
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
