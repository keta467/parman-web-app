import React from "react";
// import "./Tree_View.css";
import style from "./Tree_View.module.css";

// ツリービュー
export default function Tree_View({ FolderList }) {
  return (
    <div className={style.treeview}>
      {FolderList.map((Folder) => (
        <div key={Folder.id}>{Folder.getScript()}</div>
      ))}
    </div>
  );
}
