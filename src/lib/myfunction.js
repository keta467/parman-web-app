import { File, Folder } from "./myclass";

// AIアドレスか判定する関数
export function isIPaddress(ipaddress) {
  if (
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      ipaddress
    )
  ) {
    return true;
  }
  return false;
}

//モジュールリストを取得してフォルダを返す関数
export function ModulesToFoders(MODULE_LIST) {
  ///
  ///フォルダを全て生成
  ///
  const FolderList = [];
  for (var i = 0; i < MODULE_LIST.length; i++) {
    //例　D:\lambda\Bin.v2\castScenePlugIn\Animation
    const INSTALL_PATH = MODULE_LIST[i].install_path;
    //例　D: lambda Bin.v2 castScenePlugIn Animation
    const FoldersInPath = INSTALL_PATH.split("\\");

    //取得したパスを全て生成
    for (
      var depth_count = 0;
      depth_count < FoldersInPath.length;
      depth_count++
    ) {
      //インデックス取得
      var result;
      const p = /\\/g;
      const Indexs = [];
      while ((result = p.exec(INSTALL_PATH))) {
        Indexs.push(result.index);
      }

      const FolderName = FoldersInPath[depth_count];
      const FolderFullPath = INSTALL_PATH.slice(0, Indexs[depth_count]);
      const ParentFolderPath =
        depth_count == 0
          ? "root"
          : INSTALL_PATH.slice(0, Indexs[depth_count - 1]);

      // console.log(
      //   `元パス: ${INSTALL_PATH}\nフォルダ名: ${FolderName}\nパス: ${FolderFullPath}\n親パス:${ParentFolderPath}`
      // );

      //重複チェック
      var isok = true;
      for (var j = 0; j < FolderList.length; j++) {
        if (
          FolderList[j].get_path() == FolderFullPath &&
          FolderList[j].get_name() == FolderName
        ) {
          isok = false;
          break;
        }
      }
      //重複した場合、次のループへ
      if (isok == false) continue;

      if (depth_count == 0) {
        FolderList.push(
          new Folder(
            FolderList.length + 1,
            FolderName,
            true,
            0,
            FolderFullPath,
            depth_count,
            null,
            null
          )
        );
      } else {
        //親フォルダIDを見つけ出す
        var parentfolderid = 0;
        for (var j = 0; j < FolderList.length; j++) {
          //もしパスから自分を抜いたパスとパスが一致するフォルダの場合
          if (FolderList[j].get_path() == ParentFolderPath) {
            parentfolderid = FolderList[j].id;
            break;
          }
        }
        FolderList.push(
          new Folder(
            FolderList.length + 1,
            FoldersInPath[depth_count].replace("\\", ""),
            true,
            parentfolderid,
            FolderFullPath,
            depth_count,
            null,
            null
          )
        );
      }
    }
  }
  const Files = [];
  for (var i = 0; i < MODULE_LIST.length; i++) {
    const MODULE = MODULE_LIST[i];

    //親フォルダ情報を探索
    var parentfolderid, parentfolder_depth_count;
    for (var j = 0; j < FolderList.length; j++) {
      if (FolderList[j].get_path() == MODULE.install_path) {
        parentfolderid = FolderList[j].id;
        parentfolder_depth_count = FolderList[j].get_depth_count();
        break;
      }
    }

    Files.push(
      new File(
        MODULE.module_name,
        parentfolderid,
        MODULE.install_path + "\\" + MODULE.module_name,
        MODULE.file_version,
        parentfolder_depth_count + 1
      )
    );
  }

  //フォルダにファイルを入れる
  for (var i = 0; i < FolderList.length; i++) {
    for (var j = 0; j < Files.length; j++) {
      if (FolderList[i].get_id() == Files[j].get_parentfolderid()) {
        FolderList[i].addchild(Files[j]);
      }
    }
  }

  //フォルダにフォルダを入れる
  for (var i = 0; i < FolderList.length; i++) {
    for (var j = 0; j < FolderList.length; j++) {
      if (FolderList[i].get_id() == FolderList[j].get_parentfolderid()) {
        FolderList[i].addchild(FolderList[j]);
      }
    }
  }

  //並べ替え
  for (var i = 0; i < FolderList.length; i++) {
    FolderList[i].sort();
  }

  //親フォルダが0のみのフォルダをセット
  const ResultArr = [];
  for (var i = 0; i < FolderList.length; i++) {
    if (FolderList[i].get_parentfolderid() == 0) {
      ResultArr.push(FolderList[i]);
    }
  }
  return ResultArr;
}
