import React from "react";
import { GET_PACKAGE_LIST, SET_PACKAGE_ORDER } from "../../../api";
import "./Package_List.css";

export default React.memo(function Package_List({
  isSelectPackageId,
  setIsSelectPackageId,
  setIsShowLoadingAnimation,
}) {
  //パッケージのリスト
  const [isPackageList, setIsPackageList] = React.useState([]);

  var startindex = "";
  var isPackageListLog = [];

  function mydrag(event) {
    startindex = event.target.id;
    isPackageListLog = [];
    for (var i = 0; i < isPackageList.length; i++) {
      isPackageListLog.push(isPackageList[i]);
    }
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

  async function mydrop(event) {
    event.preventDefault();
    const NewArr = [];
    for (var i = 0; i < isPackageList.length; i++) {
      NewArr.push(isPackageList[i]);
    }
    const Elem_Drag = isPackageList[startindex];
    const ToIndex = event.target.id;

    const element = document.getElementById(event.target.id);
    let rect = element.getBoundingClientRect();
    if (event.clientY - rect.top < element.clientHeight / 2) {
      //マウスカーソルの位置が要素の半分より上
      NewArr.splice(startindex, 1);

      if (Number(startindex) < Number(ToIndex)) {
        NewArr.splice(Number(ToIndex) - 1, 0, Elem_Drag);
      } else {
        NewArr.splice(Number(ToIndex), 0, Elem_Drag);
      }
    } else {
      //マウスカーソルの位置が要素の半分より下
      NewArr.splice(startindex, 1);

      if (Number(startindex) < Number(ToIndex)) {
        NewArr.splice(Number(ToIndex), 0, Elem_Drag);
      } else {
        NewArr.splice(Number(ToIndex) + 1, 0, Elem_Drag);
      }
    }

    for (var i = 0; i < element.children.length; i++) {
      element.children[i].style.borderTop = "1px solid #999";
      element.children[i].style.borderBottom = "1px solid #999";
    }

    //ローディングアニメーション開始
    setIsShowLoadingAnimation(true);

    //パッケージ順変更
    try {
      const PostArr = [];
      for (var i = 0; i < NewArr.length; i++) {
        PostArr.push({ ID: NewArr[i].id });
      }
      await SET_PACKAGE_ORDER(PostArr);
      setIsPackageList(NewArr);
    } catch {}

    //ローディングアニメーション終了
    setIsShowLoadingAnimation(false);
  }

  //行クリック
  function ClickRow(PackageID) {
    setIsSelectPackageId(PackageID);
  }

  //
  //テーブル作成
  //
  async function createlistdata() {
    //ローディングアニメーション開始
    setIsShowLoadingAnimation(true);

    try {
      const ResponseData = await GET_PACKAGE_LIST();
      setIsPackageList(ResponseData.package_list);
    } catch {}

    //ローディングアニメーション終了
    setIsShowLoadingAnimation(false);
  }

  React.useEffect(() => {
    createlistdata();
  }, []);

  React.useEffect(() => {}, [isPackageList]);

  return (
    <table className="managepackagetable colortable">
      <tbody className="managepackagetabletbody">
        {isPackageList.map((Package, index) =>
          Package.id == isSelectPackageId ? (
            <tr
              onClick={() => ClickRow(Package.id)}
              draggable="true"
              className="dragitem selectpackage"
              id={index}
              key={Package.id}
              onDrag={mydrag}
              onDragOver={mydragover}
              onDragLeave={mydragleave}
              onDrop={mydrop}
            >
              <td id={index}>{Package.name}</td>
            </tr>
          ) : (
            <tr
              onClick={() => ClickRow(Package.id)}
              draggable="true"
              className="dragitem"
              id={index}
              key={Package.id}
              onDrag={mydrag}
              onDragOver={mydragover}
              onDragLeave={mydragleave}
              onDrop={mydrop}
            >
              <td id={index}>{Package.name}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
});
