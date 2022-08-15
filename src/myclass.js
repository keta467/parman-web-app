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
    //this.SelectFile();
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
  constructor(name, parentfolderid, Path, onclickfunc) {
    this.type = "file";
    this.name = name;
    this.parentfolderid = parentfolderid;
    this.Path = Path;
    this.onclickfunc = onclickfunc;
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
}

//フォルダ折り畳み用関数
// function ToggleFolder(id){
//   setFolders((prevState) =>
//     prevState.map((value) => (value.id === id ? new Folder(value.id, value.name, value.childs, !value.isOpen, ToggleFolder) : value))
//   );
// }
