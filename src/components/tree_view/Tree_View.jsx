import React from "react";
import "./Tree_View.css";

// ツリービュー
export default function Tree_View({ FolderList }) {
  return (
    <div className="treeview">
      {FolderList.map((Folder) => (
        <div key={Folder.id}>{Folder.getScript()}</div>
      ))}
    </div>
  );
}
