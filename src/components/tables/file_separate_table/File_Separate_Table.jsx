import React from "react";
import "./File_Separate_Table.css";
import "..//colortable.css";

export default function File_Separate_Table({ TerminalList }) {
  return (
    <table className="nomaltable">
      <thead>
        <tr>
          <th>端末名</th>
          <th>端末名称</th>
          <th>IPアドレス</th>
          <th>製品バージョン</th>
          <th style={{ fontSize: 17 }}>ファイル更新日時</th>
        </tr>
      </thead>
      <tbody>
        {TerminalList.map((Terminal) => (
          <tr key={`${Terminal.id}`}>
            <td>{Terminal.name}</td>
            <td>{Terminal.display_name}</td>
            <td>{Terminal.ip_address}</td>
            <td>{Terminal.file_version}</td>
            <td className="releasedatet">{Terminal.update_date_time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
