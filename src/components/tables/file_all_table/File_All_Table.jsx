import React, { useEffect } from "react";
import "./File_All_Table.css";

// ファイル全体管理画面のテーブル
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

  //
  // テーブルヘッダーの固定
  //
  function fixedTableHeader() {
    const BorderWidth = 1;

    //左上を固定
    const fixedCorner = document.getElementById("fixedCorner");
    fixedCorner.style.position = "sticky";
    fixedCorner.style.zIndex = 10;
    fixedCorner.style.top = 0;
    fixedCorner.style.left = 0;

    //左上を固定
    const fixedCorner2 = document.getElementById("fixedCorner2");
    fixedCorner2.style.position = "sticky";
    fixedCorner2.style.zIndex = 10;
    fixedCorner2.style.top = 0;
    fixedCorner2.style.left = fixedCorner.clientWidth + BorderWidth + "px";

    //上を固定
    const fixedTops = document.getElementsByClassName("fixedTop");
    for (var i = 0; i < fixedTops.length; i++) {
      fixedTops[i].style.position = "sticky";
      fixedTops[i].style.zIndex = 9;
      fixedTops[i].style.top = 0;
    }

    //左を固定1
    const fixedLeft1 = document.getElementsByClassName("fixedLeft1");
    for (var i = 0; i < fixedLeft1.length; i++) {
      fixedLeft1[i].style.position = "sticky";
      fixedLeft1[i].style.zIndex = 8;
      fixedLeft1[i].style.left = 0;
    }

    //左を固定2
    const fixedLeft2 = document.getElementsByClassName("fixedLeft2");
    for (var i = 0; i < fixedLeft2.length; i++) {
      fixedLeft2[i].style.position = "sticky";
      fixedLeft2[i].style.zIndex = 7;
      fixedLeft2[i].style.left = fixedCorner.clientWidth + BorderWidth + "px";
    }
  }

  //
  //チェックボックス（ヘッダー）
  //
  async function headercheckboxtoggle(event) {
    //チェックボックス（行）要素を取得
    const RowsCheakBox = document.getElementsByClassName("mycheckbox");

    //全てのチェックボックスのデータを更新
    for (var i = 0; i < RowsCheakBox.length; i++) {
      RowsCheakBox[i].checked = event.target.checked;
    }
  }

  // 初回レンダリング後と、useした値の更新後に自動で実行
  useEffect(() => {
    addMouseOverColoringEvent();
    fixedTableHeader();
  }, []);

  return (
    <table id="filealltable">
      <thead>
        <tr>
          <th id="fixedCorner">
            <input
              onChange={headercheckboxtoggle}
              style={{ margin: "0 5px 0 5px" }}
              type="checkbox"
            />
          </th>
          <th id="fixedCorner2">
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
              className="fixedTop"
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
      <tbody>
        {TERMINAL_LIST.map((terminal, index) => (
          <tr key={index}>
            <th className="fixedLeft1">
              <input
                id={`${terminal.terminal_id}_${terminal.terminal_name}`}
                className="mycheckbox"
                type="checkbox"
              />
            </th>
            <th className="fixedLeft2" style={{ overflow: "auto" }}>
              <div style={{ width: "200px" }}>{terminal.terminal_name}</div>
            </th>

            {ModuleList.map((module, index2) => (
              <td
                key={index2}
                className={
                  "mouseeventtarget" + " row" + index2 + " col" + index2
                }
              >
                {terminal.module_list.find(
                  (MODULE) =>
                    MODULE.module_name == module.module_name &&
                    MODULE.install_path == module.install_path
                ) == undefined
                  ? ""
                  : terminal.module_list.find(
                      (MODULE) =>
                        MODULE.module_name == module.module_name &&
                        MODULE.install_path == module.install_path
                    ).file_version}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
