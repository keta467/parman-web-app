import React from "react";
import "./TreeView.css";

export default function TreeView({ folders }) {
  return (
    <ul className="mytreeview">
      {folders.map((folder) => (
        <li key={folder.id}>{folder.getscript()}</li>
      ))}
    </ul>
  );
}
