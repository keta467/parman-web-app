import React from "react";
import "./Package_List.css";

export default function Package_List({ PackageList }) {
  //パッケージのリスト
  const [isPackageList, setIsPackageList] = React.useState(PackageList);

  //選択中のパッケージ
  const [isSelectPackage, setIsSelectPackage] = React.useState(
    PackageList[0].NAME
  );

  var startindex = "";

  ///
  /// マウスオーバーイベントを追加する
  ///
  function addMouseOverColoringEvent() {
    var materialTd = document.getElementsByClassName("dragitem");
    for (
      var materialNumber = 0;
      materialNumber < materialTd.length;
      materialNumber++
    ) {
      materialTd[materialNumber].addEventListener("drag", mydrag);

      materialTd[materialNumber].addEventListener("dragover", mydragover);

      materialTd[materialNumber].addEventListener("dragleave", mydragleave);

      materialTd[materialNumber].addEventListener("drop", mydrop);
    }
  }

  function mydrag(event) {
    startindex = event.target.id;
  }

  function mydragover(event) {
    event.preventDefault();

    let rect = this.getBoundingClientRect();
    if (event.clientY - rect.top < this.clientHeight / 2) {
      //マウスカーソルの位置が要素の半分より上
      for (var i = 0; i < this.children.length; i++) {
        this.children[i].style.borderTop = "2px solid blue";
        this.children[i].style.borderBottom = "1px solid #999";
      }
    } else {
      //マウスカーソルの位置が要素の半分より下
      for (var i = 0; i < this.children.length; i++) {
        this.children[i].style.borderTop = "1px solid #999";
        this.children[i].style.borderBottom = "2px solid blue";
      }
    }
  }

  function mydragleave(event) {
    for (var i = 0; i < this.children.length; i++) {
      this.children[i].style.borderTop = "1px solid #999";
      this.children[i].style.borderBottom = "1px solid #999";
    }
  }

  function mydrop(event) {
    event.preventDefault();
    let elm_drag = isPackageList[startindex];

    var toindex = event.target.id;

    let rect = this.getBoundingClientRect();
    if (event.clientY - rect.top < this.clientHeight / 2) {
      //マウスカーソルの位置が要素の半分より上
      isPackageList.splice(startindex, 1);

      if (Number(startindex) < Number(toindex)) {
        isPackageList.splice(Number(toindex) - 1, 0, elm_drag);
      } else {
        isPackageList.splice(Number(toindex), 0, elm_drag);
      }
    } else {
      //マウスカーソルの位置が要素の半分より下
      isPackageList.splice(startindex, 1);

      if (Number(startindex) < Number(toindex)) {
        isPackageList.splice(Number(toindex), 0, elm_drag);
      } else {
        isPackageList.splice(Number(toindex) + 1, 0, elm_drag);
      }
    }

    var newarr = [];
    for (var i = 0; i < isPackageList.length; i++) {
      newarr.push(isPackageList[i]);
    }
    setIsPackageList(newarr);

    for (var i = 0; i < this.children.length; i++) {
      this.children[i].style.borderTop = "1px solid #999";
      this.children[i].style.borderBottom = "1px solid #999";
    }
  }

  //行クリック
  function ClickRow(name) {
    setIsSelectPackage(name);
  }

  //初回レンダリング後
  React.useEffect(() => {
    addMouseOverColoringEvent();
  }, []);

  return (
    <table className="managepackagetable colortable">
      <tbody className="managepackagetabletbody">
        {isPackageList.map((value, index) =>
          value.NAME == isSelectPackage ? (
            <tr
              onClick={() => ClickRow(value.NAME)}
              draggable="true"
              className="dragitem selectpackage"
              id={index}
              key={value.ID}
            >
              <td id={index}>{value.NAME}</td>
            </tr>
          ) : (
            <tr
              onClick={() => ClickRow(value.NAME)}
              draggable="true"
              className="dragitem"
              id={index}
              key={value.ID}
            >
              <td id={index}>{value.NAME}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}
