import React from "react";
import { SET_PACKAGE_RELEASE_TERMINAL } from "../../../api";
import nomalTableStyle from "../nomaltable.module.css";

// パッケージ管理画面のテーブル
export default function Manage_Package_Table({
  TerminalList,
  isSelectPackageId,
  setIsShowLoadingAnimation3,
}) {
  //チェックボックス（ヘッダー）
  async function headercheckboxtoggle(event) {
    if (isSelectPackageId == -1) return;

    //ローディングスタート
    setIsShowLoadingAnimation3(true);

    //チェックボックス（行）要素を取得
    const RowsCheakBox = document.getElementsByClassName("mycheckbox");

    //apiに送るデータを作成
    const NewArr = [];
    for (var i = 0; i < RowsCheakBox.length; i++) {
      NewArr.push({
        ID: Number(RowsCheakBox[i].id),
        ENABLE: event.target.checked,
      });
    }

    try {
      //パッケージリリース端末変更
      await SET_PACKAGE_RELEASE_TERMINAL(isSelectPackageId, NewArr);

      //全てのcチェックボックスのデータを更新
      for (var i = 0; i < RowsCheakBox.length; i++) {
        RowsCheakBox[i].checked = event.target.checked;
      }
    } catch {}

    //ローディング終了
    setIsShowLoadingAnimation3(false);
  }

  async function rowcheckboxtoggle(event) {
    //ローディングスタート
    setIsShowLoadingAnimation3(true);

    try {
      //パッケージリリース端末変更
      await SET_PACKAGE_RELEASE_TERMINAL(isSelectPackageId, [
        { ID: Number(event.target.id), ENABLE: event.target.checked },
      ]);
    } catch {
      event.target.checked = !event.target.checked;
    }

    //ローディング終了
    setIsShowLoadingAnimation3(false);
  }

  return (
    <table className={nomalTableStyle.nomaltable}>
      <thead>
        <tr>
          <th style={{ width: "6%" }}>
            <input
              id="checkbox_header"
              type="checkbox"
              onChange={(event) => headercheckboxtoggle(event)}
            />
          </th>
          <th>名称</th>
          <th>HostName</th>
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
            <td>{Terminal.display_name}</td>
            <td>{Terminal.name}</td>
            <td>{Terminal.ip_address}</td>
            <td className={nomalTableStyle.releasedate}>
              {Terminal.release_date}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
