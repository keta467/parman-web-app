import { GET_INSTALLED_MODULE_DATA } from "./DummyDatas/GET_INSTALLED_MODULE_DATA";
import { GET_MODULE_INSTALLED_TERMINAL_DATA } from "./DummyDatas/GET_MODULE_INSTALLED_TERMINAL_DATA";
import { GET_MODULE_LIST_IN_PACKAGE_DATA } from "./DummyDatas/GET_MODULE_LIST_IN_PACKAGE_DATA";
import { GET_PACKAGE_LIST_DATA } from "./DummyDatas/GET_PACKAGE_LIST_DATA";
import { GET_PACKAGE_TARGET_TERMINAL_DATA } from "./DummyDatas/GET_PACKAGE_TARGET_TERMINAL_DATA";
import { GET_TERMINALS_DATA } from "./DummyDatas/GET_TERMINALS_DATA";
import axios from "axios"; //const response = await axios.get(url);
import { GET_COLLECT_PATH_DATA } from "./DummyDatas/GET_COLLECT_PATH_DATA";

const mode = true;
const SERVER_IP = "192.167.1.10";
const SERVER_PORT = "1234";
axios.defaults.baseURL = `http://${SERVER_IP}:${SERVER_PORT}/manage`;
//使い方
// axios
// .post("/" + Name, Data)
// .then(function (response) {
//   console.log(response);
// })
// .catch(function (error) {
//   console.log(error);
// });

//
//1.パッケージ一覧取得
//
export function GET_PACKAGE_LIST() {
  const Name = GET_PACKAGE_LIST.name;
  const Data = {};
  console.log(`-----------------${Name}-------------------`);
  console.log(Data);
  if (mode) {
    return GET_PACKAGE_LIST_DATA;
  } else {
    return [];
  }
}

//
//3.パッケージ内モジュール一覧
//
export function GET_MODULE_LIST_IN_PACKAGE() {
  const Name = GET_MODULE_LIST_IN_PACKAGE.name;
  const Data = {};
  console.log(`-----------------${Name}-------------------`);
  console.log(Data);
  if (mode) {
    return GET_MODULE_LIST_IN_PACKAGE_DATA;
  } else {
    return [];
  }
}

//
//4.更新パッケージ取り込み
//
export async function UPDATE_PACKAGE(PACKAGE_ID) {
  const Name = UPDATE_PACKAGE.name;
  const Data = {
    PACKAGE_ID: PACKAGE_ID,
  };
  console.log(`-----------------${Name}-------------------`);
  console.log(Data);
  if (mode) {
    return { API_NAME: Name, RESULT: 0 };
  } else {
  }
}

//
//5.パッケージリリース端末変更
//
export async function SET_PACKAGE_RELEASE_TERMINAL(
  PACKAGE_ID,
  RELEASE_TERMINALS
) {
  const Name = SET_PACKAGE_RELEASE_TERMINAL.name;
  const Data = {
    PACKAGE_ID: PACKAGE_ID,
    RELEASE_TERMINAL: RELEASE_TERMINALS,
  };
  console.log(`-----------------${Name}-------------------`);
  console.log(Data);
  if (mode) {
    return { API_NAME: Name, RESULT: 0 };
  } else {
  }
}

//
//6.パッケージ対応管理端末一覧
//
export function GET_PACKAGE_TARGET_TERMINAL() {
  const Name = GET_PACKAGE_TARGET_TERMINAL.name;
  const Data = {};
  console.log(`-----------------${Name}-------------------`);
  console.log(Data);
  if (mode) {
    return GET_PACKAGE_TARGET_TERMINAL_DATA;
  } else {
    return [];
  }
}

//
//7.管理端末一覧
//
export function GET_TERMINALS() {
  const Name = GET_TERMINALS.name;
  const Data = {};
  console.log(`-----------------${Name}-------------------`);
  console.log(Data);
  if (mode) {
    return GET_TERMINALS_DATA;
  } else {
    return [];
  }
}

//
//8.端末順変更
//
export async function SET_TERMINAL_ORDER(TERMINAL_COUNT, TERMINAL_ORDER) {
  const Name = SET_TERMINAL_ORDER.name;
  const Data = {
    TERMINAL_COUNT: TERMINAL_COUNT,
    TERMINAL_ORDER: TERMINAL_ORDER,
  };
  console.log(`-----------------${Name}-------------------`);
  console.log(Data);
  if (mode) {
    return { API_NAME: Name, RESULT: 0 };
  } else {
  }
}

//
//9.パッケージ順変更
//
export async function SET_PACKAGE_ORDER(PACKAGE_COUNT, PACKAGE_LIST) {
  const Name = SET_PACKAGE_ORDER.name;
  const Data = {
    PACKAGE_COUNT: PACKAGE_COUNT,
    PACKAGE_LIST: PACKAGE_LIST,
  };
  console.log(`-----------------${Name}-------------------`);
  console.log(Data);
  if (mode) {
    return { API_NAME: Name, RESULT: 0 };
  } else {
  }
}

//
//10.端末登録
//
export async function REGISTER_TERMINAL(NAME, DISPLAY_NAME, IP_ADDRESS) {
  const Name = REGISTER_TERMINAL.name;
  const Data = {
    NAME: NAME,
    DISPLAY_NAME: DISPLAY_NAME,
    IP_ADDRESS: IP_ADDRESS,
  };
  console.log(`-----------------${Name}-------------------`);
  console.log(Data);
  if (mode) {
    return { API_NAME: Name, RESULT: 0 };
  } else {
  }
}

//
//11.端末削除
//
export async function REMOVE_TERMINAL(TERMINAL_ID) {
  const Name = REMOVE_TERMINAL.name;
  const Data = {
    TERMINAL_ID: TERMINAL_ID,
  };
  console.log(`-----------------${Name}-------------------`);
  console.log(Data);
  if (mode) {
    return { API_NAME: Name, RESULT: 0 };
  } else {
  }
}

//
//12.端末更新
//
export async function UPDATE_TERMINAL(
  TERMINAL_ID,
  NAME,
  DISPLAY_NAME,
  IP_ADDRESS
) {
  const Name = UPDATE_TERMINAL.name;
  const Data = {
    TERMINAL_ID: TERMINAL_ID,
    NAME: NAME,
    DISPLAY_NAME: DISPLAY_NAME,
    IP_ADDRESS: IP_ADDRESS,
  };
  console.log(`-----------------${Name}-------------------`);
  console.log(Data);
  if (mode) {
    return { API_NAME: Name, RESULT: 0 };
  } else {
  }
}

//
//14.端末モジュール一覧取得
//
export function GET_INSTALLED_MODULE() {
  const Name = GET_INSTALLED_MODULE.name;
  const Data = {};
  console.log(`-----------------${Name}-------------------`);
  console.log(Data);
  if (mode) {
    return GET_INSTALLED_MODULE_DATA;
  } else {
    return [];
  }
}

//
//15.端末モジュールバージョン更新
//
export async function UPDATE_TERMINAL_MODULE_VERSION(TERMINAL_ID) {
  const Name = UPDATE_TERMINAL_MODULE_VERSION.name;
  const Data = {
    TERMINAL_ID: TERMINAL_ID,
  };
  console.log(`-----------------${Name}-------------------`);
  console.log(Data);
  if (mode) {
    return { API_NAME: Name, RESULT: 0 };
  } else {
  }
}

//
//16.ファイル所有端末取得
//
export function GET_MODULE_INSTALLED_TERMINAL(INSTALL_PATH) {
  const Name = GET_MODULE_INSTALLED_TERMINAL.name;
  const Data = {};
  console.log(`-----------------${Name}-------------------`);
  console.log(Data);
  if (mode) {
    return GET_MODULE_INSTALLED_TERMINAL_DATA;
  } else {
    return [];
  }
}

//
//17.収集パスの取得
//
export function GET_COLLECT_PATH() {
  const Name = GET_COLLECT_PATH.name;
  const Data = {};
  console.log(`-----------------${Name}-------------------`);
  console.log(Data);
  if (mode) {
    return GET_COLLECT_PATH_DATA;
  } else {
  }
}

//
//18.収集パスの設定
//
export async function SET_COLLECT_PATH(COLLECT_PATHS) {
  const Name = SET_COLLECT_PATH.name;
  const Data = {
    COLLECT_PATH_COUNT: COLLECT_PATHS.length,
    COLLECT_PATH: COLLECT_PATHS,
  };
  console.log(`-----------------${Name}-------------------`);
  console.log(Data);
  if (mode) {
    return { API_NAME: Name, RESULT: 0 };
  } else {
  }
}

//7 使い方
// SET_PACKAGE_RELEASE_TERMINAL(3, [
//   { ID: 1, ENABLE: false },
//   { ID: 2, ENABLE: true },
//   { ID: 3, ENABLE: false },
// ]);

//8 使い方
//SET_TERMINAL_ORDER(3, [{ ID: 1 }, { ID: 2 }, { ID: 3 }]);

//9 使い方
//SET_PACKAGE_ORDER(3, [{ ID: 1 }, { ID: 2 }, { ID: 3 }]);
