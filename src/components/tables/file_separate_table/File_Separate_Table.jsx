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
          <tr key={`${Terminal.ID}`}>
            <td>{Terminal.NAME}</td>
            <td>{Terminal.DISPLAY_NAME}</td>
            <td>{Terminal.IP_ADDRESS}</td>
            <td>{Terminal.FILE_VERSION}</td>
            <td className="releasedatet">{Terminal.UPDATE_DATE_TIME}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}