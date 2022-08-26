import React from "react";

export class Folder {
  constructor(id, name, isOpen, parentfolderid, Path, ToggleFolder, folder) {
    this.type = "folder";
    this.id = id;
    this.name = name;
    this.isOpen = isOpen;
    this.childs = [];
    this.ToggleFolder = ToggleFolder;
    this.parentfolderid = parentfolderid;
    this.Path = Path;

    if (folder != null) {
      this.type = folder.type;
      this.id = folder.id;
      this.name = folder.name;
      this.isOpen = folder.isOpen;
      this.childs = folder.childs;
      this.ToggleFolder = folder.ToggleFolder;
      this.parentfolderid = folder.parentfolderid;
      this.Path = folder.Path;
    }
  }

  getscript() {
    if (this.isOpen) {
      var chilsarr = [];
      for (var i = 0; i < this.childs.length; i++) {
        chilsarr.push(this.childs[i].getscript());
      }
      return (
        <div key={this.id}>
          <div className="plus" onClick={() => this.onclickfunc()}></div>
          <div className="treeitem">
            <span className="folder" onClick={() => this.onclickfunc()}>
              {this.name}
            </span>
            <ul>{chilsarr}</ul>
          </div>
        </div>
      );
    } else {
      return (
        <div key={this.id}>
          <div className="minus" onClick={() => this.onclickfunc()}></div>
          <div className="treeitem">
            <span
              className="folder closefolder"
              onClick={() => this.onclickfunc()}
            >
              {this.name}
            </span>
          </div>
        </div>
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
}

export class File {
  constructor(name, parentfolderid, Path) {
    this.type = "file";
    this.name = name;
    this.parentfolderid = parentfolderid;
    this.Path = Path;
    this.onclickfunc = null;
  }
  getscript() {
    if (this.onclickfunc == null) {
      return (
        <li key={this.Path}>
          <div className="filevarsionbox">
            <span className="box1">{this.name}</span>
            <span className="v-line"></span>
            <span className="box2">3.0.2.0</span>
          </div>
        </li>
      );
    } else {
      return (
        <li key={this.Path}>
          <div className="filebox" id={this.Path}>
            <a
              href={void 0}
              onClick={() => {
                this.onclickfunc(this.Path);
              }}
            >
              {this.name}
            </a>
          </div>
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
    if (MODULE_LIST[i].DIFFERENCE == true) {
      flag = true;
      break;
    }
  }

  ///
  ///フォルダを全て生成
  ///
  var folderlist = [];
  for (var i = 0; i < MODULE_LIST.length; i++) {
    const str = MODULE_LIST[i].INSTALL_PATH;
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
              null
            )
          );
        }
      }
    }
  }
  var files = [];
  for (var i = 0; i < MODULE_LIST.length; i++) {
    const str = MODULE_LIST[i].INSTALL_PATH;

    var datas = str.match(/\\[^\\]*/g);
    const filename = datas[datas.length - 1].replace("\\", "");

    datas = str.match(/([^\\]*)\\/g);
    var parentfolderid;
    for (var j = 0; j < folderlist.length; j++) {
      if (folderlist[j].Path == str.replace(filename, "")) {
        parentfolderid = folderlist[j].id;
      }
    }

    const Path = MODULE_LIST[i].INSTALL_PATH;

    files.push(new File(filename, parentfolderid, Path));
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
