import React from "react";
import Topbar from "../../components/topbar/Topbar.jsx";
import TreeView from "../../components/treeview/TreeView.jsx";
import "./ManagePackage.css";
import { Folder, File } from "../../myclass.js";
import ManagePackageTable from "../../components/tables/manage_package_table/ManagePackageTable.jsx";
import { ReleasedList } from "../../dummyData.js";
import { DebugModeContext } from "../../components/providers/DebugModeProvider.jsx";
import PackageList from "../../components/tables/package_list/PackageList.jsx";
import PackageAlert from "../../components/alert/package_alert/PackageAlert.jsx";
import { GET_PACKAGE_LIST } from "../../DummyDatas/GET_PACKAGE_LIST.js";
import { GET_MODULE_LIST_IN_PACKAGE } from "../../DummyDatas/GET_MODULE_LIST_IN_PACKAGE.js";
import { GET_PACKAGE_TARGET_TERMINAL } from "../../DummyDatas/GET_PACKAGE_TARGET_TERMINAL.js";
import { GET_TERMINALS } from "../../DummyDatas/GET_TERMINALS.js";

export default function ManagePackage({ titletext }) {
  const { isDebugMode } = React.useContext(DebugModeContext);

  function ToggleFolder() {
    setFolders((prevState) =>
      prevState.map(
        (value) => new Folder(null, null, null, null, null, null, value)
      )
    );
  }

  const [folders, setFolders] = React.useState([]);
  const [isPCList, setIsPCList] = React.useState([]);
  const [isShowPackageAlert, setIsShowPackageAlert] = React.useState(false);

  function returnpackages() {
    if (isDebugMode) {
      return GET_PACKAGE_LIST.PACKAGE_LIST;
    } else {
      return [];
    }
  }

  async function createtreedata() {
    var folderlist = [];
    if (isDebugMode) {
      ///
      ///フォルダを全て生成
      ///
      for (var i = 0; i < GET_MODULE_LIST_IN_PACKAGE.MODULE_LIST.length; i++) {
        const str = GET_MODULE_LIST_IN_PACKAGE.MODULE_LIST[i].INSTALL_PATH;
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
      for (var i = 0; i < GET_MODULE_LIST_IN_PACKAGE.MODULE_LIST.length; i++) {
        const str = GET_MODULE_LIST_IN_PACKAGE.MODULE_LIST[i].INSTALL_PATH;

        var datas = str.match(/\\[^\\]*/g);
        const filename = datas[datas.length - 1].replace("\\", "");

        datas = str.match(/([^\\]*)\\/g);
        var parentfolderid;
        for (var j = 0; j < folderlist.length; j++) {
          if (folderlist[j].Path == str.replace(filename, "")) {
            parentfolderid = folderlist[j].id;
          }
        }

        const Path = GET_MODULE_LIST_IN_PACKAGE.MODULE_LIST[i].INSTALL_PATH;

        files.push(new File(filename, parentfolderid, Path, null));
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

    //Dのラムダ以下をセット
    for (var i = 0; i < folderlist.length; i++) {
      console.log();
      if (folderlist[i].Path == "D:\\lambda\\") {
        setFolders(folderlist[i].childs);
        break;
      }
    }
  }

  async function createtabledata() {
    var pclist = await gettabledata();
    setIsPCList(pclist);
  }

  async function gettabledata() {
    var pclist = [];
    if (isDebugMode) {
      var IS_TARGET_TERMINAL;
      var RELEASE_DATE;
      var RELEASED;
      for (var i = 0; i < GET_TERMINALS.TERMINAL_LIST.length; i++) {
        IS_TARGET_TERMINAL = false;
        RELEASE_DATE = "";
        RELEASED = false;
        for (
          var j = 0;
          j < GET_PACKAGE_TARGET_TERMINAL.TERMINAL_LIST.length;
          j++
        ) {
          if (
            GET_TERMINALS.TERMINAL_LIST[i].ID ==
            GET_PACKAGE_TARGET_TERMINAL.TERMINAL_LIST[j].ID
          ) {
            IS_TARGET_TERMINAL = true;
            RELEASE_DATE =
              GET_PACKAGE_TARGET_TERMINAL.TERMINAL_LIST[j].RELEASE_DATE;
            RELEASED = GET_PACKAGE_TARGET_TERMINAL.TERMINAL_LIST[j].RELEASED;
            break;
          }
        }
        pclist.push({
          ID: GET_TERMINALS.TERMINAL_LIST[i].ID,
          NAME: GET_TERMINALS.TERMINAL_LIST[i].NAME,
          DISPLAY_NAME: GET_TERMINALS.TERMINAL_LIST[i].DISPLAY_NAME,
          IP_ADDRESS: GET_TERMINALS.TERMINAL_LIST[i].IP_ADDRESS,
          IS_TARGET_TERMINAL: IS_TARGET_TERMINAL,
          RELEASE_DATE: RELEASE_DATE,
          RELEASED: RELEASED,
        });
      }
    } else {
    }
    return pclist;
  }

  async function buttonclick() {
    var element = document.getElementById("serchtext");
    search(element.value);
  }

  async function search(keyword) {
    keyword = keyword.toUpperCase();
    var pclist = [];
    var data = await gettabledata();
    for (var i = 0; i < data.length; i++) {
      if (
        data[i].NAME.toUpperCase().includes(keyword) ||
        data[i].DISPLAY_NAME.toUpperCase().includes(keyword) ||
        data[i].IP_ADDRESS.toUpperCase().includes(keyword) ||
        data[i].RELEASE_DATE.toUpperCase().includes(keyword)
      ) {
        pclist.push(data[i]);
      }
    }
    setIsPCList(pclist);
  }

  function packagecheck() {
    //一つでも更新されているファイルがあればアラートを表示
    for (var i = 0; i < GET_MODULE_LIST_IN_PACKAGE.MODULE_LIST.length; i++) {
      if (GET_MODULE_LIST_IN_PACKAGE.MODULE_LIST[i].DIFFERENCE == true) {
        setIsShowPackageAlert(true);
        break;
      }
    }
  }

  React.useEffect(() => {
    createtreedata();
    createtabledata();
    packagecheck();
  }, []);

  return (
    <>
      <Topbar titletext={titletext} />

      <div className="managepackagewrapper">
        <div className="managepackagelistwrapper">
          <PackageList packages={returnpackages()} />
        </div>
        <div className="managepackagetreeview">
          <PackageAlert
            isShowAlert={isShowPackageAlert}
            setIsShowAlert={setIsShowPackageAlert}
          />
          <TreeView folders={folders} />
        </div>
        <div className="managepackagesearchview">
          <div id="searchareawrapper">
            <input type="text" name="" id="serchtext" />
            <button className="mybutton" onClick={buttonclick}>
              検索
            </button>
          </div>
          <div className="managepackagesearchviewtablewrapper">
            <ManagePackageTable pclist={isPCList} />
          </div>
        </div>
      </div>
    </>
  );
}
