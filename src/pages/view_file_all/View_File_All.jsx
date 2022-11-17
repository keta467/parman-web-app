import React from "react";
import File_All_Table from "../../components/tables/file_all_table/File_All_Table.jsx";
import Topbar from "../../components/topbar/Topbar.jsx";
import style from "./View_File_All.module.css";
import {
  GET_INSTALLED_MODULE,
  UPDATE_TERMINAL_MODULE_VERSION,
} from "../../api.js";
import Loading_Animation from "../../components/alert/loading_animation/Loading_Animation.jsx";

// ファイル全体管理画面
export default function View_File_All({ TitleText }) {
  //モジュールリスト
  const [isModulelist, setIsModulelist] = React.useState([]);

  //端末リスト
  const [isTERMINAL_LIST, setIsTerminalList] = React.useState([]);

  //ローディングアニメーションフラグ
  const [isShowLoadingAnimation, setIsShowLoadingAnimation] =
    React.useState(false);

  //ローディングアニメーションフラグ
  const [isShowLoadingAnimation2, setIsShowLoadingAnimation2] =
    React.useState(false);

  //ローディングアニメーションフラグ
  const [isShowLoadingAnimation3, setIsShowLoadingAnimation3] =
    React.useState(false);

  //
  //　テーブル用データ作成
  //
  async function createTableData() {
    //ローディングアニメーション開始
    setIsShowLoadingAnimation(true);

    //一回表示を空にする
    setIsTerminalList([]);
    setIsModulelist([]);

    try {
      // 14.端末モジュール一覧取得からデータを取得
      const ResponceData = await GET_INSTALLED_MODULE();
      const TERMINAL_LIST = ResponceData.terminal_list;
      const ModuleList = [];

      //モジュールリストの作成
      for (var i = 0; i < TERMINAL_LIST.length; i++) {
        const TERMINAL = TERMINAL_LIST[i];
        for (var j = 0; j < TERMINAL.module_list.length; j++) {
          var isOk = true;
          for (var k = 0; k < ModuleList.length; k++) {
            //既にモジュールリストにある場合
            if (
              ModuleList[k].module_name ==
                TERMINAL.module_list[j].module_name &&
              ModuleList[k].install_path == TERMINAL.module_list[j].install_path
            ) {
              isOk = false;
              break;
            }
          }
          if (isOk == true) {
            ModuleList.push(TERMINAL.module_list[j]);
          }
        }
      }

      //モジュールリストをソートする
      let ModuleList2 = ModuleList.sort((a, b) => {
        const la = a.module_name.toLowerCase();
        const lb = b.module_name.toLowerCase();
        if (la < lb) {
          return -1;
        }
        if (la > lb) {
          return 1;
        }
        if (a < b) {
          return -1;
        }
        if (b < a) {
          return 1;
        }
      });

      setIsTerminalList(TERMINAL_LIST);
      setIsModulelist(ModuleList2);
    } catch {}

    //ローディングアニメーション終了
    setIsShowLoadingAnimation(false);
  }

  //
  //端末別バージョン取得
  //
  async function getSeparateTerminalVersion() {
    //チェックボックス（行）要素を取得
    const RowsCheakBox = document.getElementsByClassName("mycheckbox");

    //apiに送るデータを作成
    const NewArr = [];
    var message = "";
    for (var i = 0; i < RowsCheakBox.length; i++) {
      if (RowsCheakBox[i].checked == false) continue;
      console.log(RowsCheakBox[i].id.split("_"));
      NewArr.push({
        ID: Number(RowsCheakBox[i].id.split("_")[0]),
      });
      message += "・" + RowsCheakBox[i].id.split("_")[1] + "\n";
    }
    console.log(NewArr);

    //対象端末がない場合
    if (NewArr.length == 0) {
      window.alert(
        "対象の端末がありません。\nバージョン取得を行う端末にチェックを入れてください。"
      );
      return;
    }

    //確認アラート
    var res = window.confirm(
      `以下端末のバージョン取得を行います。よろしいですか？\n${message}\nよろしければ「OK」を、中止するには「キャンセル」をクリックしてください。`
    );
    //キャンセルが選択されたとき
    if (res == false) return;

    setIsShowLoadingAnimation2(true);
    try {
      for (var i = 0; i < NewArr.length; i++) {
        await UPDATE_TERMINAL_MODULE_VERSION(NewArr[i].ID);
      }
    } catch {}
    setIsShowLoadingAnimation2(false);
  }

  //
  //最新バージョン取得
  //
  async function getNewVersion() {
    //確認アラートの表示
    var res = window.confirm(
      `全端末バージョン取得を行います。よろしいですか？\n\nよろしければ「OK」を、中止するには「キャンセル」をクリックしてください。`
    );
    //キャンセルが選択されたとき
    if (res == false) return;

    setIsShowLoadingAnimation3(true);
    try {
      await UPDATE_TERMINAL_MODULE_VERSION(0);
    } catch {}
    setIsShowLoadingAnimation3(false);
  }

  //初回レンダリング後
  React.useEffect(() => {
    createTableData();
  }, []);

  return (
    <>
      <Topbar TitleText={TitleText} />

      <div className={style.buttonwrapper}>
        <button
          className={`mybutton ${style.marginleft10}`}
          onClick={createTableData}
        >
          再表示
        </button>
        <button
          className={`mybutton ${style.marginleft10}`}
          onClick={getSeparateTerminalVersion}
        >
          端末別バージョン取得
        </button>
        {isShowLoadingAnimation2 ? (
          <div
            style={{
              position: "relative",
              width: "40px",
              height: "40px",
              marginLeft: "5px",
            }}
          >
            <Loading_Animation
              isShowLoadingAnimation={isShowLoadingAnimation2}
            />
          </div>
        ) : (
          <></>
        )}
        <button
          className={`mybutton ${style.marginleft10}`}
          onClick={getNewVersion}
        >
          全端末バージョン取得
        </button>
        {isShowLoadingAnimation3 ? (
          <div
            style={{
              position: "relative",
              width: "40px",
              height: "40px",
              marginLeft: "5px",
            }}
          >
            <Loading_Animation
              isShowLoadingAnimation={isShowLoadingAnimation3}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className={style.table_loading_area}>
        <Loading_Animation isShowLoadingAnimation={isShowLoadingAnimation} />
        {isTERMINAL_LIST.length != 0 ? (
          <div className={style.tablewrapper}>
            <File_All_Table
              ModuleList={isModulelist}
              TERMINAL_LIST={isTERMINAL_LIST}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
