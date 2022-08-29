import React from "react";
import "./Manage_Package_Table.css";
import "../nomaltable.css";

export default function Manage_Package_Table({ TerminalList }) {
  function headercheckboxtoggle(event) {
    if (event.target.checked) {
      var elems = document.getElementsByClassName("mycheckbox");
      for (var i = 0; i < elems.length; i++) {
        elems[i].checked = true;
      }
    } else {
      var elems = document.getElementsByClassName("mycheckbox");
      for (var i = 0; i < elems.length; i++) {
        elems[i].checked = false;
      }
    }
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
        {TerminalList.map((Terminal, index) => (
          <tr key={Terminal.ID}>
            {Terminal.RELEASED ? (
              <td className="redtext bold">済</td>
            ) : (
              <td>
                <input
                  type="checkbox"
                  className="mycheckbox"
                  defaultChecked={Terminal.IS_TARGET_TERMINAL}
                />
              </td>
            )}
            <td>{Terminal.NAME}</td>
            <td>{Terminal.DISPLAY_NAME}</td>
            <td>{Terminal.IP_ADDRESS}</td>
            <td className="releasedatet">{Terminal.RELEASE_DATE}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
