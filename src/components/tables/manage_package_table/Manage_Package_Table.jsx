import React from "react";
import "./Manage_Package_Table.css";
import "../nomaltable.css";
import { SET_PACKAGE_RELEASE_TERMINAL } from "../../../api";

export default function Manage_Package_Table({
  TerminalList,
  isSelectPackageId,
}) {
  function headercheckboxtoggle(event) {
    var arr = [];
    if (event.target.checked) {
      var elems = document.getElementsByClassName("mycheckbox");
      for (var i = 0; i < elems.length; i++) {
        elems[i].checked = true;
        arr.push({ ID: Number(elems[i].id), ENABLE: true });
      }
    } else {
      var elems = document.getElementsByClassName("mycheckbox");
      for (var i = 0; i < elems.length; i++) {
        elems[i].checked = false;
        arr.push({ ID: Number(elems[i].id), ENABLE: false });
      }
    }
    //パッケージリリース端末変更
    SET_PACKAGE_RELEASE_TERMINAL(isSelectPackageId, arr);
  }

  function rowcheckboxtoggle(event) {
    //パッケージリリース端末変更
    SET_PACKAGE_RELEASE_TERMINAL(isSelectPackageId, [
      { ID: Number(event.target.id), ENABLE: event.target.checked },
    ]);
  }

  return (
    <table className="nomaltable">
      <thead>
        <tr>
          <th id="checkboxth">
            <input
              type="checkbox"
              onChange={(event) => headercheckboxtoggle(event)}
            />
          </th>
          <th>端末名</th>
          <th>端末名称</th>
          <th>IPアドレス</th>
          <th>リリース日時</th>
        </tr>
      </thead>
      <tbody>
        {TerminalList.map((Terminal) => (
          <tr key={Terminal.id}>
            {Terminal.released ? (
              <td className="redtext bold">済</td>
            ) : (
              <td>
                <input
                  id={Terminal.id}
                  type="checkbox"
                  className="mycheckbox"
                  defaultChecked={Terminal.is_target_terminal}
                  onChange={(event) => rowcheckboxtoggle(event)}
                />
              </td>
            )}
            <td>{Terminal.name}</td>
            <td>{Terminal.display_name}</td>
            <td>{Terminal.ip_address}</td>
            <td className="releasedatet">{Terminal.release_date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
