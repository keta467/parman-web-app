import React from "react";
import arrow_down_image from "../assets/arrow_down.svg";
import arrow_right_image from "../assets/arrow_right.svg";
import line_image from "../assets/line.svg";
import folder_open_image from "../assets/folder_open.svg";
import folder_close_image from "../assets/folder_close.svg";
import file_image from "../assets/file.svg";
import style from "../components/tree_view/Tree_View.module.css";

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
            className={style.treeview_row_button}
            onClick={() => this.onclickfunc()}
          >
            <div
              className={style.row_div}
              style={{ marginLeft: `${marginleft}px` }}
            >
              <img className={style.arrow_icon} src={arrow_down_image}></img>
              <img
                className={style.folder_or_file_icon}
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
            className={style.treeview_row_button}
            onClick={() => this.onclickfunc()}
          >
            <div
              className={style.row_div}
              style={{ marginLeft: `${marginleft}px` }}
            >
              <img className={style.arrow_icon} src={arrow_right_image}></img>
              <img
                className={style.folder_or_file_icon}
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
            className={style.treeview_row_button}
            style={{ pointerEvents: "none" }}
          >
            <div
              className={style.row_div}
              style={{ marginLeft: `${marginleft}px` }}
            >
              <img className={style.folder_or_file_icon} src={file_image}></img>
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
            className={`${style.treeview_row_button} ${style.file_button}`}
            onClick={() => this.onclickfunc(this.path)}
          >
            <div
              className={style.row_div}
              style={{ marginLeft: `${marginleft}px` }}
            >
              <img className={style.folder_or_file_icon} src={file_image}></img>
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
