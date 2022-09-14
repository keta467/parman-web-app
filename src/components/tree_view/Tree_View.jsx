import React from "react";
import "./Tree_View.css";

export default function Tree_View({ FolderList }) {
  return (
    // <ul className="mytreeview">
    //   {FolderList.map((Folder) => (
    //     <li key={Folder.id}>{Folder.getscript()}</li>
    //   ))}
    // </ul>

    // <div className="treeview_wrapper">
    //   <div className="treeview">
    //     {FolderList.map((Folder) => (
    //       <div key={Folder.id}>{Folder.getscript()}</div>
    //     ))}
    //   </div>
    // </div>
    <div className="treeview">
      {FolderList.map((Folder) => (
        <div key={Folder.id}>{Folder.getscript()}</div>
      ))}
    </div>
  );
}
