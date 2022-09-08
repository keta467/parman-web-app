import React from "react";
import { GET_PACKAGE_LIST } from "../../../api";
import "./Package_List.css";

export default React.memo(function Package_List({
  isSelectPackageId,
  setIsSelectPackageId,
}) {
  //パッケージのリスト
  const [isPackageList, setIsPackageList] = React.useState([]);

  var startindex = "";

  function mydrag(event) {
    startindex = event.target.id;

    event;
  }

  function mydragover(event) {
    event.preventDefault();

    const element = document.getElementById(event.target.id);
    let rect = element.getBoundingClientRect();
    if (event.clientY - rect.top < rect.height / 2) {
      //マウスカーソルの位置が要素の半分より上
      for (var i = 0; i < element.children.length; i++) {
        element.children[i].style.borderTop = "2px solid blue";
        element.children[i].style.borderBottom = "1px solid #999";
      }
    } else {
      //マウスカーソルの位置が要素の半分より下
      for (var i = 0; i < element.children.length; i++) {
        element.children[i].style.borderTop = "1px solid #999";
        element.children[i].style.borderBottom = "2px solid blue";
      }
    }
  }

  function mydragleave(event) {
    const element = document.getElementById(event.target.id);
    for (var i = 0; i < element.children.length; i++) {
      element.children[i].style.borderTop = "1px solid #999";
      element.children[i].style.borderBottom = "1px solid #999";
    }
  }

  function mydrop(event) {
    event.preventDefault();
    let elm_drag = isPackageList[startindex];

    var toindex = event.target.id;

    const element = document.getElementById(event.target.id);
    let rect = element.getBoundingClientRect();
    if (event.clientY - rect.top < element.clientHeight / 2) {
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

    for (var i = 0; i < element.children.length; i++) {
      element.children[i].style.borderTop = "1px solid #999";
      element.children[i].style.borderBottom = "1px solid #999";
    }
  }

  //行クリック
  function ClickRow(PackageID) {
    setIsSelectPackageId(PackageID);
  }

  React.useEffect(() => {
    setIsPackageList(GET_PACKAGE_LIST().PACKAGE_LIST);
  }, []);

  return (
    <table className="managepackagetable colortable">
      <tbody className="managepackagetabletbody">
        {isPackageList.map((Package, index) =>
          Package.ID == isSelectPackageId ? (
            <tr
              onClick={() => ClickRow(Package.ID)}
              draggable="true"
              className="dragitem selectpackage"
              id={index}
              key={Package.ID}
              onDrag={mydrag}
              onDragOver={mydragover}
              onDragLeave={mydragleave}
              onDrop={mydrop}
            >
              <td id={index}>{Package.NAME}</td>
            </tr>
          ) : (
            <tr
              onClick={() => ClickRow(Package.ID)}
              draggable="true"
              className="dragitem"
              id={index}
              key={Package.ID}
              onDrag={mydrag}
              onDragOver={mydragover}
              onDragLeave={mydragleave}
              onDrop={mydrop}
            >
              <td id={index}>{Package.NAME}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
});
