import React from "react";
import arrow_down_image from "./assets/arrow_down.svg";
import arrow_right_image from "./assets/arrow_right.svg";
import line_image from "./assets/line.svg";
import folder_open_image from "./assets/folder_open.svg";
import folder_close_image from "./assets/folder_close.svg";
import file_image from "./assets/file.svg";
const row_left_margin = 20;

export class Folder {
  constructor(
    id,
    name,
    isOpen,
    parentfolderid,
    Path,
    kaisou_count,
    ToggleFolder,
    folder
  ) {
    if (folder != null) {
      this.type = folder.type;
      this.id = folder.id;
      this.name = folder.name;
      this.isOpen = folder.isOpen;
      this.childs = folder.childs;
      this.ToggleFolder = folder.ToggleFolder;
      this.parentfolderid = folder.parentfolderid;
      this.Path = folder.Path;
      this.kaisou_count = folder.kaisou_count;
    } else {
      this.type = "folder";
      this.id = id;
      this.name = name;
      this.isOpen = isOpen;
      this.childs = [];
      this.ToggleFolder = ToggleFolder;
      this.parentfolderid = parentfolderid;
      this.Path = Path;
      this.kaisou_count = kaisou_count;
    }
  }

  getscript() {
    const marginleft = (this.kaisou_count - 1) * row_left_margin;
    if (this.isOpen) {
      return (
        <ul key={this.Path}>
          <button
            className="treeview_row_button"
            onClick={() => this.onclickfunc()}
          >
            <div className="row_div" style={{ marginLeft: `${marginleft}px` }}>
              <img className="arrow_icon" src={arrow_down_image}></img>
              <img
                className="folder_or_file_icon"
                src={folder_open_image}
              ></img>
              {this.name}
            </div>
          </button>
          <div
            style={{
              background: `url(${line_image}) ${marginleft + 8}px  repeat-y`,
              backgroundSize: "15px",
            }}
          >
            {this.childs.map((child) => child.getscript())}
          </div>
        </ul>
      );
    } else {
      return (
        <ul key={this.Path}>
          <button
            className="treeview_row_button"
            onClick={() => this.onclickfunc()}
          >
            <div className="row_div" style={{ marginLeft: `${marginleft}px` }}>
              <img className="arrow_icon" src={arrow_right_image}></img>
              <img
                className="folder_or_file_icon"
                src={folder_close_image}
              ></img>
              {this.name}
            </div>
          </button>
        </ul>
      );
    }
  }

  addchild(child) {
    this.childs.push(child);
  }

  onclickfunc() {
    this.isOpen = !this.isOpen;
    this.ToggleFolder();
  }

  setclickfunc(func) {
    if (this.type == "folder") {
      this.ToggleFolder = func;
    } else {
      return;
    }

    for (var i = 0; i < this.childs.length; i++) {
      if (this.childs[i].type == "folder") {
        this.childs[i].setclickfunc(func);
      }
    }
  }

  setfileclickfunc(func) {
    for (var i = 0; i < this.childs.length; i++) {
      this.childs[i].setfileclickfunc(func);
    }
  }

  narabekae() {
    var newarr = [];
    for (var i = 0; i < this.childs.length; i++) {
      if (this.childs[i].type == "folder") {
        newarr.push(this.childs[i]);
      }
    }
    for (var i = 0; i < this.childs.length; i++) {
      if (this.childs[i].type == "file") {
        newarr.push(this.childs[i]);
      }
    }
    this.childs = newarr;
  }

  getkaisou() {
    return this.kaisou_count;
  }
}

export class File {
  constructor(name, parentfolderid, Path, file_version, kaisou_count) {
    this.type = "file";
    this.name = name;
    this.parentfolderid = parentfolderid;
    this.Path = Path;
    this.file_version = file_version;
    this.onclickfunc = null;
    this.kaisou_count = kaisou_count;
  }
  getscript() {
    const marginleft = this.kaisou_count * row_left_margin;
    if (this.onclickfunc == null) {
      return (
        <li key={this.Path}>
          <button
            className="treeview_row_button"
            style={{ pointerEvents: "none" }}
          >
            <div className="row_div" style={{ marginLeft: `${marginleft}px` }}>
              <img className="folder_or_file_icon" src={file_image}></img>
              <div
                style={{ width: "300px" }}
              >{`${this.name} (v${this.file_version})`}</div>
            </div>
          </button>
        </li>
      );
    } else {
      return (
        <li key={this.Path}>
          <button
            id={this.Path}
            className={`treeview_row_button file_button`}
            onClick={() => this.onclickfunc(this.Path)}
          >
            <div className="row_div" style={{ marginLeft: `${marginleft}px` }}>
              <img className="folder_or_file_icon" src={file_image}></img>
              {this.name}
            </div>
          </button>
        </li>
      );
    }
  }

  setfileclickfunc(func) {
    this.onclickfunc = func;
  }
}

export function ModulesToFoders(MODULE_LIST) {
  //一つでも更新されているファイルがあればアラートを表示
  var flag = false;
  for (var i = 0; i < MODULE_LIST.length; i++) {
    if (MODULE_LIST[i].differnce == true) {
      flag = true;
      break;
    }
  }

  ///
  ///フォルダを全て生成
  ///
  var folderlist = [];
  for (var i = 0; i < MODULE_LIST.length; i++) {
    const str = MODULE_LIST[i].install_path;
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
              count,
              null,
              null
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
              count,
              null,
              null
            )
          );
        }
      }
    }
  }
  var files = [];
  for (var i = 0; i < MODULE_LIST.length; i++) {
    const INSTALL_PATH = MODULE_LIST[i].install_path;
    const MODULE_NAME = MODULE_LIST[i].module_name;
    const FILE_VERSION = MODULE_LIST[i].file_version;

    var parentfolderid, parentfolder_kaisou_count;
    for (var j = 0; j < folderlist.length; j++) {
      if (folderlist[j].Path == INSTALL_PATH.replace(MODULE_NAME, "")) {
        parentfolderid = folderlist[j].id;
        parentfolder_kaisou_count = folderlist[j].getkaisou();
        break;
      }
    }

    files.push(
      new File(
        MODULE_NAME,
        parentfolderid,
        INSTALL_PATH,
        FILE_VERSION,
        parentfolder_kaisou_count + 1
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

  //親フォルダが０のみのフォルダをセット
  var arrr = [];
  for (var i = 0; i < folderlist.length; i++) {
    if (folderlist[i].parentfolderid == 0) {
      arrr.push(folderlist[i]);
    }
  }
  return [arrr, flag];
}
