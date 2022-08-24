import React, { useEffect } from "react";
import "./FileAllTable.css";

export default function FileAllTable({ modulelist, pclist }) {
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
          <th className="machinename">マシン名</th>
          {modulelist.map((module, index) => (
            <th key={module.MODULE_ID} id={"th" + index}>
              {module.MODULE_NAME}
            </th>
          ))}
        </tr>
      </thead>
      <tbody id="module_list_body">
        {pclist.map((pc, index) => (
          <tr key={index}>
            <th className="machinename">{pc.TERMINAL_NAME}</th>
            {modulelist.map((module, mindex) => (
              <td
                key={"ddd" + mindex}
                className={
                  "mouseeventtarget" + " row" + mindex + " col" + mindex
                }
              >
                {pc.MODULE_LIST.find(
                  (MODULE) => MODULE.MODULE_ID == module.MODULE_ID
                ) == undefined
                  ? ""
                  : pc.MODULE_LIST.find(
                      (MODULE) => MODULE.MODULE_ID == module.MODULE_ID
                    ).FILE_VERSION}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
