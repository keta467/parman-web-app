import React, { useEffect } from "react";
import "./File_All_Table.css";

export default function File_All_Table({ ModuleList, TERMINAL_LIST }) {
  ///
  /// マウスオーバーイベントを追加する
  ///
  function addMouseOverColoringEvent() {
    var materialTd = document.getElementsByClassName("mouseeventtarget");
    for (
      var materialNumber = 0;
      materialNumber < materialTd.length;
      materialNumber++
    ) {
      materialTd[materialNumber].addEventListener("mouseout", function (event) {
        var classList = event.target.className.split(" ");

        var rowList = document.getElementsByClassName(classList[1]);
        for (var rowNumber = 0; rowNumber < rowList.length; rowNumber++) {
          rowList[rowNumber].style.backgroundColor = "white";
        }

        var colList = document.getElementsByClassName(classList[2]);
        for (var colNumber = 0; colNumber < colList.length; colNumber++) {
          colList[colNumber].style.backgroundColor = "white";
        }
      });

      materialTd[materialNumber].addEventListener(
        "mouseover",
        function (event) {
          var classList = event.target.className.split(" ");
          var rowList = document.getElementsByClassName(classList[1]);
          for (var rowNumber = 0; rowNumber < rowList.length; rowNumber++) {
            rowList[rowNumber].style.backgroundColor = "aqua";
          }

          var innerText = event.target.innerHTML;
          var colList = document.getElementsByClassName(classList[2]);
          for (var colNumber = 0; colNumber < colList.length; colNumber++) {
            if (innerText == colList[colNumber].innerHTML) {
              colList[colNumber].style.backgroundColor = "aqua";
            } else {
              colList[colNumber].style.backgroundColor = "yellow";
            }
          }
        }
      );
    }
  }

  // 初回レンダリング後と、useした値の更新後に自動で実行
  useEffect(() => {
    addMouseOverColoringEvent();
  });

  return (
    <table id="filealltable">
      <thead id="module_list_header">
        <tr>
          <th id="machinenameth" className="machinename">
            <div
              style={{ width: "200px", textAlign: "right", fontSize: "14px" }}
            >
              モジュール名
            </div>
            <div
              style={{ width: "200px", textAlign: "left", fontSize: "14px" }}
            >
              マシン名
            </div>
          </th>
          {ModuleList.map((module, index) => (
            <th
              key={module.module_id}
              id={"th" + index}
              onMouseOver={() => {
                document.getElementById(
                  `${module.install_path}\\${module.module_name}`
                ).style.display = "block";
              }}
              onMouseOut={() => {
                document.getElementById(
                  `${module.install_path}\\${module.module_name}`
                ).style.display = "none";
              }}
            >
              {module.module_name}
              <div
                id={`${module.install_path}\\${module.module_name}`}
                className="description"
                style={{ display: "none" }}
              >
                {`${module.install_path}\\${module.module_name}`}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody id="module_list_body">
        {TERMINAL_LIST.map((terminal, index) => (
          <tr key={index}>
            <th className="machinename">
              <div className="machinenametext">{terminal.terminal_name}</div>
            </th>
            {ModuleList.map((module, index2) => (
              <td
                key={"ddd" + index2}
                className={
                  "mouseeventtarget" + " row" + index2 + " col" + index2
                }
              >
                {terminal.module_list.find(
                  (MODULE) => MODULE.module_id == module.module_id
                ) == undefined
                  ? ""
                  : terminal.module_list.find(
                      (MODULE) => MODULE.module_id == module.module_id
                    ).file_version}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
