import React from "react";
import "./Tree_View.css";

export default function Tree_View({ FolderList }) {
  return (
    <ul className="mytreeview">
      {FolderList.map((Folder) => (
        <li key={Folder.id}>{Folder.getscript()}</li>
      ))}
    </ul>
  );
}
