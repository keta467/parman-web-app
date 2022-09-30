import React from "react";
import arrow_down_image from "../assets/arrow_down.svg";
import arrow_right_image from "../assets/arrow_right.svg";
import line_image from "../assets/line.svg";
import folder_open_image from "../assets/folder_open.svg";
import folder_close_image from "../assets/folder_close.svg";
import file_image from "../assets/file.svg";

// 基本となるマージン値
const ROW_LEFT_MARGIN = 20;

// フォルダクラス
export class Folder {
  // コンストラクタ
  constructor(
    id,
    name,
    isOpen,
    parentfolderid,
    Path,
    depth_count,
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
      this.path = folder.Path;
      this.depth_count = folder.depth_count;
    } else {
      this.type = "folder";
      //フォルダID
      this.id = id;
      //フォルダ名
      this.name = name;
      //開閉フラグ
      this.isOpen = isOpen;
      //子要素
      this.childs = [];
      //クリック関数　開閉処理
      this.ToggleFolder = ToggleFolder;
      //親フォルダID
      this.parentfolderid = parentfolderid;
      //パス
      this.path = Path;
      //階層
      this.depth_count = depth_count;
    }
  }

  getScript() {
    const marginleft = this.depth_count * ROW_LEFT_MARGIN;
    if (this.isOpen) {
      return (
        <ul key={this.id}>
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
            {this.childs.map((child) => child.getScript())}
          </div>
        </ul>
      );
    } else {
      return (
        <ul key={this.id}>
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

  sort() {
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

  get_depth_count() {
    return this.depth_count;
  }

  get_path() {
    return this.path;
  }

  get_id() {
    return this.id;
  }

  get_name() {
    return this.name;
  }

  get_parentfolderid() {
    return this.parentfolderid;
  }
}

// ファイルクラス
export class File {
  // コンストラクタ
  constructor(name, parentfolderid, path, file_version, depth_count) {
    this.type = "file";
    //ファイル名
    this.name = name;
    //親フォルダID
    this.parentfolderid = parentfolderid;
    //パス
    this.path = path;
    //ファイルバージョン
    this.file_version = `(v${file_version})`;

    //バージョンが空、NULLの場合
    if (this.file_version == "(v)" || this.file_version == "(vnull)") {
      this.file_version = "";
    }
    //クリックしたときの処理
    this.onclickfunc = null;
    //階層の深さ
    this.depth_count = depth_count;
  }
  getScript() {
    const marginleft = (this.depth_count + 1) * ROW_LEFT_MARGIN;
    if (this.onclickfunc == null) {
      return (
        <li key={`${this.parentfolderid}${this.path}`}>
          <button
            className="treeview_row_button"
            style={{ pointerEvents: "none" }}
          >
            <div className="row_div" style={{ marginLeft: `${marginleft}px` }}>
              <img className="folder_or_file_icon" src={file_image}></img>
              <div
                style={{ width: "300px" }}
              >{`${this.name} ${this.file_version}`}</div>
            </div>
          </button>
        </li>
      );
    } else {
      return (
        <li key={`${this.parentfolderid}${this.path}`}>
          <button
            id={this.path}
            className={`treeview_row_button file_button`}
            onClick={() => this.onclickfunc(this.path)}
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

  get_parentfolderid() {
    return this.parentfolderid;
  }
}

export function ModulesToFoders(MODULE_LIST) {
  ///
  ///フォルダを全て生成
  ///
  const FolderList = [];
  for (var i = 0; i < MODULE_LIST.length; i++) {
    //例　D:\lambda\Bin.v2\castScenePlugIn\Animation
    const INSTALL_PATH = MODULE_LIST[i].install_path;
    //例　D: lambda Bin.v2 castScenePlugIn Animation
    const FoldersInPath = INSTALL_PATH.split("\\");

    //取得したパスを全て生成
    for (
      var depth_count = 0;
      depth_count < FoldersInPath.length;
      depth_count++
    ) {
      //インデックス取得
      var result;
      const p = /\\/g;
      const Indexs = [];
      while ((result = p.exec(INSTALL_PATH))) {
        Indexs.push(result.index);
      }

      const FolderName = FoldersInPath[depth_count];
      const FolderFullPath = INSTALL_PATH.slice(0, Indexs[depth_count]);
      const ParentFolderPath =
        depth_count == 0
          ? "root"
          : INSTALL_PATH.slice(0, Indexs[depth_count - 1]);

      // console.log(
      //   `元パス: ${INSTALL_PATH}\nフォルダ名: ${FolderName}\nパス: ${FolderFullPath}\n親パス:${ParentFolderPath}`
      // );

      //重複チェック
      var isok = true;
      for (var j = 0; j < FolderList.length; j++) {
        if (
          FolderList[j].get_path() == FolderFullPath &&
          FolderList[j].get_name() == FolderName
        ) {
          isok = false;
          break;
        }
      }
      //重複した場合、次のループへ
      if (isok == false) continue;

      if (depth_count == 0) {
        FolderList.push(
          new Folder(
            FolderList.length + 1,
            FolderName,
            true,
            0,
            FolderFullPath,
            depth_count,
            null,
            null
          )
        );
      } else {
        //親フォルダIDを見つけ出す
        var parentfolderid = 0;
        for (var j = 0; j < FolderList.length; j++) {
          //もしパスから自分を抜いたパスとパスが一致するフォルダの場合
          if (FolderList[j].get_path() == ParentFolderPath) {
            parentfolderid = FolderList[j].id;
            break;
          }
        }
        FolderList.push(
          new Folder(
            FolderList.length + 1,
            FoldersInPath[depth_count].replace("\\", ""),
            true,
            parentfolderid,
            FolderFullPath,
            depth_count,
            null,
            null
          )
        );
      }
    }
  }
  const Files = [];
  for (var i = 0; i < MODULE_LIST.length; i++) {
    const MODULE = MODULE_LIST[i];

    //親フォルダ情報を探索
    var parentfolderid, parentfolder_depth_count;
    for (var j = 0; j < FolderList.length; j++) {
      if (FolderList[j].get_path() == MODULE.install_path) {
        parentfolderid = FolderList[j].id;
        parentfolder_depth_count = FolderList[j].get_depth_count();
        break;
      }
    }

    Files.push(
      new File(
        MODULE.module_name,
        parentfolderid,
        MODULE.install_path + "\\" + MODULE.module_name,
        MODULE.file_version,
        parentfolder_depth_count + 1
      )
    );
  }

  //フォルダにファイルを入れる
  for (var i = 0; i < FolderList.length; i++) {
    for (var j = 0; j < Files.length; j++) {
      if (FolderList[i].get_id() == Files[j].get_parentfolderid()) {
        FolderList[i].addchild(Files[j]);
      }
    }
  }

  //フォルダにフォルダを入れる
  for (var i = 0; i < FolderList.length; i++) {
    for (var j = 0; j < FolderList.length; j++) {
      if (FolderList[i].get_id() == FolderList[j].get_parentfolderid()) {
        FolderList[i].addchild(FolderList[j]);
      }
    }
  }

  //並べ替え
  for (var i = 0; i < FolderList.length; i++) {
    FolderList[i].sort();
  }

  //親フォルダが0のみのフォルダをセット
  const ResultArr = [];
  for (var i = 0; i < FolderList.length; i++) {
    if (FolderList[i].get_parentfolderid() == 0) {
      ResultArr.push(FolderList[i]);
    }
  }
  return ResultArr;
}
