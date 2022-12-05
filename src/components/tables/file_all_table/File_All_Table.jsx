import React, { useEffect } from "react";
import styles from "./File_All_Table.module.css";

// ファイル全体管理画面のテーブル
export default function File_All_Table({ ModuleList, TERMINAL_LIST }) {
  //
  // セットアップ
  //
  function setUp() {
    // スクロール禁止
    function handle(event) {
      event.preventDefault();
    }
    window.onload = function () {
      const boxB = document.getElementsByClassName(styles.boxB)[0];
      boxB.children[0].addEventListener("touchmove", handle, {
        passive: false,
      });
      boxB.children[0].addEventListener("mousewheel", handle, {
        passive: false,
      });
    };

    //参考データ
    const table = document.getElementsByClassName(styles.table)[3];
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    td.innerHTML = "　";
    tr.appendChild(td);
    table.appendChild(tr);

    //overlayセッティング
    const overlay = document.getElementsByClassName(styles.overlay)[0];
    var elem = document.getElementsByTagName("td")[0];
    const div_rect = elem.getBoundingClientRect();
    overlay.style.width = div_rect.width * ModuleList.length + "px";
    overlay.style.height = div_rect.height * TERMINAL_LIST.length + "px";
  }

  //
  // テーブル作成１
  //
  function createTable1() {
    //左上を取得
    const table = document.getElementsByClassName(styles.table)[0];

    //１行生成
    var tr = document.createElement("tr");

    var th = document.createElement("th");
    var input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    //チェックボックスの同期
    input.addEventListener("change", async () => {
      //チェックボックス（行）要素を取得
      const RowsCheakBox = document.getElementsByClassName("mycheckbox");

      //全てのチェックボックスのデータを更新
      for (var i = 0; i < RowsCheakBox.length; i++) {
        RowsCheakBox[i].checked = event.target.checked;
      }
    });
    th.appendChild(input);
    tr.appendChild(th);

    var th2 = document.createElement("th");
    th2.innerHTML = "端末名";
    tr.appendChild(th2);
    table.appendChild(tr);
  }

  //
  // テーブル作成２
  //
  function createTable2() {
    //右上を取得
    const table = document.getElementsByClassName(styles.table)[1];

    // 1列づつデータを投入
    var tr = document.createElement("tr");

    for (var i = 0; i < ModuleList.length; i++) {
      const size = adjustFontSize(ModuleList[i].module_name, 150);

      var th = document.createElement("th");
      th.style.fontSize = `${size}px`;
      th.style.position = "relative";
      th.appendChild(document.createTextNode(ModuleList[i].module_name));
      var discirption = document.createElement("div");
      discirption.appendChild(
        document.createTextNode(
          `${ModuleList[i].install_path}\\${ModuleList[i].module_name}`
        )
      );
      discirption.style.display = "none";
      discirption.className = styles.discription;

      th.appendChild(discirption);
      th.addEventListener("mouseover", manageDiscriptionIn);
      th.addEventListener("mouseout", manageDiscriptionOut);

      tr.appendChild(th);
    }
    // 一番右に行ったときにずれるのを防ぐ
    var divth = document.createElement("th");
    var div = document.createElement("div");
    div.style.width = "30px";
    divth.appendChild(div);

    tr.appendChild(divth);

    table.appendChild(tr);
  }

  //　説明管理イン
  function manageDiscriptionIn(event) {
    var clientRect = event.target.getBoundingClientRect();
    var x = clientRect.left + clientRect.width / 2;
    var y = clientRect.top - 55;
    for (var i = 0; i < event.target.children.length; i++) {
      if (event.target.children[i].className == styles.discription) {
        event.target.children[i].style.display = "block";
        event.target.children[i].style.left = x + "px";
        event.target.children[i].style.top = y + "px";
      }
    }
  }

  //　説明管理アウト
  function manageDiscriptionOut(event) {
    for (var i = 0; i < event.target.children.length; i++) {
      if (event.target.children[i].className == styles.discription) {
        event.target.children[i].style.display = "none";
      }
    }
  }

  //
  // テーブル作成３
  //
  function createTable3() {
    //左下を取得
    const table = document.getElementsByClassName(styles.table)[2];

    // 1行づつデータを投入
    var script = "";
    for (var i = 0; i < TERMINAL_LIST.length; i++) {
      const size = adjustFontSize(TERMINAL_LIST[i].terminal_name, 250);

      script += `<tr>`;
      script += `<th><input type="checkbox" class="mycheckbox" id="${TERMINAL_LIST[i].terminal_id}_${TERMINAL_LIST[i].terminal_name}"></th>`;
      script += `<th style="font-size: ${size}px;">${TERMINAL_LIST[i].terminal_name}</th>`;
      script += `</tr>`;
    }
    // 一番下に行ったときにずれるのを防ぐ
    script +=
      '<tr><th><div style="height: 30px;"></div></th><th><div style="height: 30px;"></div></th></tr>';
    script += "";
    table.innerHTML = script;

    //なぜか固定しないといけない
    const boxA = document.getElementsByClassName(styles.boxA)[0];
    const divA = boxA.children[0];
    const boxB = document.getElementsByClassName(styles.boxB)[0];
    const divB = boxB.children[0];
    divB.style.minWidth = divA.clientWidth + "px";
    divB.style.overflow = "auto";
  }

  //
  // テーブル４更新
  //
  function updateTable4(sLeft, sTop) {
    //テーブルを更新
    var elem = document.getElementsByTagName("td")[0];

    const div_rect = elem.getBoundingClientRect();
    const width = div_rect.width;
    const height = div_rect.height;

    var numWidth = Math.floor(sLeft / width);
    var numHeight = Math.floor(sTop / height);

    //テーブル作成
    const table4Tate = 28;
    const table4Yoko = 12;
    var script = `<table class="${styles.table} ${styles.moveTable}">`;
    for (
      var terminalIndex = numHeight;
      terminalIndex < numHeight + table4Tate;
      terminalIndex++
    ) {
      if (terminalIndex >= TERMINAL_LIST.length) break;
      script += "<tr>";
      for (
        var moduleIndex = numWidth;
        moduleIndex < numWidth + table4Yoko;
        moduleIndex++
      ) {
        if (moduleIndex >= ModuleList.length) break;

        //バージョン情報をもっているかの判断
        var file_version = "";
        for (
          var k = 0;
          k < TERMINAL_LIST[terminalIndex].module_list.length;
          k++
        ) {
          if (
            TERMINAL_LIST[terminalIndex].module_list[k].module_name ==
              ModuleList[moduleIndex].module_name &&
            TERMINAL_LIST[terminalIndex].module_list[k].install_path ==
              ModuleList[moduleIndex].install_path
          ) {
            file_version =
              TERMINAL_LIST[terminalIndex].module_list[k].file_version;
            break;
          }
        }
        if (file_version == "" || file_version == " ") {
          file_version = "　";
        }
        if (file_version.length > 15) {
          script += `<td style="font-size: 10px;">${file_version}</td>`;
        } else {
          script += `<td class="mouseeventtarget row${moduleIndex} col${moduleIndex}">${file_version}</td>`;
        }
      }
      script += "</tr>";
    }
    script += "</table>";

    const overlay = document.getElementsByClassName(styles.overlay)[0];
    overlay.innerHTML = script;

    var moveTable = document.getElementsByClassName(styles.moveTable)[0];
    moveTable.style.top = sTop - (sTop % height) + "px";
    moveTable.style.left = sLeft - (sLeft % width) + "px";

    addMouseOverColoringEvent();

    if (lastTarget != undefined) setColorIn(lastTarget);
  }

  //文字サイズ調整
  function adjustFontSize(str, maxSize) {
    // 文字サイズ計算
    var size = 15;
    var span = document.createElement("span");
    span.innerHTML = str;
    span.style.fontSize = size + "px";
    document.body.appendChild(span);
    for (var j = 0; j < 14; j++) {
      if (span.offsetWidth <= maxSize) break;
      size--;
      span.style.fontSize = size + "px";
    }
    span.parentElement.removeChild(span);
    return size;
  }

  // スクロール時のイベント
  function scrollManageBoxB2() {
    const boxB = document.getElementsByClassName(styles.boxB)[0];
    const boxA = document.getElementsByClassName(styles.boxA)[0];

    const sLeft = boxB.children[1].scrollLeft;
    const sTop = boxB.children[1].scrollTop;

    //スクロールXの同期
    boxA.children[1].scrollLeft = sLeft;
    //スクロールYの同期
    boxB.children[0].scrollTop = sTop;

    updateTable4(sLeft, sTop);
  }

  // スクロール時のイベント
  function scrollManageBoxA2() {
    const boxA = document.getElementsByClassName(styles.boxA)[0];
    const boxB = document.getElementsByClassName(styles.boxB)[0];

    const sLeft = boxA.children[1].scrollLeft;

    //スクロールXの同期
    boxB.children[1].scrollLeft = sLeft;
  }

  //最後にホバーしたセル
  var lastTarget;

  // マウスオーバーイベントを追加する
  function addMouseOverColoringEvent() {
    var materialTd = document.getElementsByClassName("mouseeventtarget");
    for (
      var materialNumber = 0;
      materialNumber < materialTd.length;
      materialNumber++
    ) {
      //ホバーしたセルに色を付ける
      materialTd[materialNumber].addEventListener(
        "mouseover",
        function (event) {
          setColorIn(event.target);
          lastTarget = event.target; //記録
        }
      );

      //ホバーしたセルに色を付ける
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

        lastTarget = undefined; //記録を消す
      });
    }
  }

  //ホバーしたセルに色を付ける
  function setColorIn(target) {
    var classList = target.className.split(" ");
    var rowList = document.getElementsByClassName(classList[1]);
    for (var rowNumber = 0; rowNumber < rowList.length; rowNumber++) {
      rowList[rowNumber].style.backgroundColor = "aqua";
    }

    var innerText = target.innerHTML;
    var colList = document.getElementsByClassName(classList[2]);
    for (var colNumber = 0; colNumber < colList.length; colNumber++) {
      if (innerText == colList[colNumber].innerHTML) {
        colList[colNumber].style.backgroundColor = "aqua";
      } else {
        colList[colNumber].style.backgroundColor = "yellow";
      }
    }
  }

  // 初回レンダリング後と、useした値の更新後に自動で実行
  useEffect(() => {
    setUp();
    createTable1();
    createTable2();
    createTable3();
    updateTable4(0, 0);
  }, []);

  return (
    <div>
      <div className={styles.boxA}>
        <div>
          <table className={styles.table}></table>
        </div>
        <div onScroll={scrollManageBoxA2}>
          <table className={styles.table}></table>
        </div>
      </div>
      <div className={styles.boxB}>
        <div>
          <table className={styles.table}></table>
        </div>
        <div onScroll={scrollManageBoxB2}>
          <div className={styles.overlay}>
            <table className={styles.table}></table>
          </div>
        </div>
      </div>
    </div>
  );
}
