import React from "react";
import "./ManagePackageTable.css";
import "../nomaltable.css";

export default function ManagePackageTable({ pclist }) {
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
        {pclist.map((pc, index) => (
          <tr key={pc.ID}>
            {pc.RELEASED ? (
              <td className="redtext bold">済</td>
            ) : (
              <td>
                <input
                  type="checkbox"
                  className="mycheckbox"
                  defaultChecked={pc.IS_TARGET_TERMINAL}
                />
              </td>
            )}
            <td>{pc.NAME}</td>
            <td>{pc.DISPLAY_NAME}</td>
            <td>{pc.IP_ADDRESS}</td>
            <td className="releasedatet">{pc.RELEASE_DATE}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
