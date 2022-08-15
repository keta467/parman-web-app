import React from "react";
import "./FileSeparateTable.css";
import "..//colortable.css";

export default function FileSeparateTable({ FileList }) {
  return (
    <table className="nomaltable">
      <thead>
        <tr>
          <th>端末名</th>
          <th>端末名称</th>
          <th>IPアドレス</th>
          <th>製品バージョン</th>
          <th>ファイル更新日時</th>
        </tr>
      </thead>
      <tbody>
        {FileList.map((file, index) => (
          <tr key={`${file.name}${index}`}>
            <td>{file.name}</td>
            <td>{file.nickname}</td>
            <td>{file.ip}</td>
            <td>{file.version}</td>
            <td className="releasedatet">{file.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
