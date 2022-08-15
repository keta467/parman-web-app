import React from "react";
import Topbar from "../../components/topbar/Topbar.jsx";
import TreeView from "../../components/treeview/TreeView.jsx";
import "./ManagePackage.css";
import { Folder, File } from "../../myclass.js";
import ManagePackageTable from "../../components/tables/manage_package_table/ManagePackageTable.jsx";
import { packageList, ReleasedList, TreeData2 } from "../../dummyData.js";
import { DebugModeContext } from "../../components/providers/DebugModeProvider.jsx";
import PackageList from "../../components/tables/package_list/PackageList.jsx";
import PackageAlert from "../../components/alert/package_alert/PackageAlert.jsx";

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
  const [isShowPackageAlert, setIsShowPackageAlert] = React.useState(true);

  function returnpackages() {
    if (isDebugMode) {
      return packageList.data;
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
      for (var i = 0; i < TreeData2.data.length; i++) {
        const str = TreeData2.data[i].path;
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
      for (var i = 0; i < TreeData2.data.length; i++) {
        const str = TreeData2.data[i].path;

        var datas = str.match(/\\[^\\]*/g);
        const filename = datas[datas.length - 1].replace("\\", "");

        datas = str.match(/([^\\]*)\\/g);
        var parentfolderid;
        for (var j = 0; j < folderlist.length; j++) {
          if (folderlist[j].Path == str.replace(filename, "")) {
            parentfolderid = folderlist[j].id;
          }
        }

        const Path = TreeData2.data[i].path;

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
      for (var i = 0; i < ReleasedList.data.length; i++) {
        pclist.push(ReleasedList.data[i]);
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
    var pclist = [];
    var data = await gettabledata();
    for (var i = 0; i < data.length; i++) {
      if (data[i].name.includes(keyword)) {
        pclist.push(data[i]);
      }
    }
    setIsPCList(pclist);
  }

  React.useEffect(() => {
    createtreedata();
    createtabledata();
  }, []);

  return (
    <>
      <Topbar titletext={titletext} />
      <PackageAlert
        isShowAlert={isShowPackageAlert}
        setIsShowAlert={setIsShowPackageAlert}
      />
      <div className="managepackagewrapper">
        <div className="managepackagelistwrapper">
          <PackageList packages={returnpackages()} />
        </div>
        <div className="managepackagetreeview">
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
