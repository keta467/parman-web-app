import { GET_INSTALLED_MODULE_DATA } from "./DummyDatas/GET_INSTALLED_MODULE_DATA";
import { GET_MODULE_INSTALLED_TERMINAL_DATA } from "./DummyDatas/GET_MODULE_INSTALLED_TERMINAL_DATA";
import { GET_MODULE_LIST_IN_PACKAGE_DATA } from "./DummyDatas/GET_MODULE_LIST_IN_PACKAGE_DATA";
import { GET_PACKAGE_LIST_DATA } from "./DummyDatas/GET_PACKAGE_LIST_DATA";
import { GET_PACKAGE_TARGET_TERMINAL_DATA } from "./DummyDatas/GET_PACKAGE_TARGET_TERMINAL_DATA";
import { GET_TERMINALS_DATA } from "./DummyDatas/GET_TERMINALS_DATA";
import { GET_COLLECT_PATH_DATA } from "./DummyDatas/GET_COLLECT_PATH_DATA";
import axios from "axios";

const DebugMode = true;

// const SERVER_IP = "3.137.85.73";
// const SERVER_PORT = "3002";
const SERVER_IP = "localhost";
const SERVER_PORT = "3002";
axios.defaults.baseURL = `http://${SERVER_IP}:${SERVER_PORT}`;

//
//1.パッケージ一覧取得
//
export async function GET_PACKAGE_LIST() {
  console.log(`-------1.パッケージ一覧取得-------`);
  console.log("↓Request↓");
  const Data = {};
  console.log(Data);

  // デバッグモードの場合
  if (DebugMode) return GET_PACKAGE_LIST_DATA;

  try {
    const response = await axios.get("/GET_PACKAGE_LIST");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

//
//3.パッケージ内モジュール一覧
//
export async function GET_MODULE_LIST_IN_PACKAGE(PACKAGE_ID) {
  console.log(`-------3.パッケージ内モジュール一覧-------`);
  console.log("↓Request↓");
  const Data = {
    PACKAGE_ID: PACKAGE_ID,
  };
  console.log(Data);

  // デバッグモードの場合
  if (DebugMode) return GET_MODULE_LIST_IN_PACKAGE_DATA;

  try {
    const response = await axios.get("/GET_MODULE_LIST_IN_PACKAGE", {
      params: Data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

//
//4.更新パッケージ取り込み
//
export async function UPDATE_PACKAGE(PACKAGE_ID) {
  console.log(`-------4.更新パッケージ取り込み-------`);
  console.log("↓Request↓");

  const Data = {
    PACKAGE_ID: PACKAGE_ID,
  };
  console.log(Data);

  // デバッグモードの場合
  if (DebugMode) return { API_NAME: UPDATE_PACKAGE.name, RESULT: 0 };

  try {
    const response = await axios.get("/UPDATE_PACKAGE", {
      params: Data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

//
//5.パッケージリリース端末変更
//
export async function SET_PACKAGE_RELEASE_TERMINAL(
  PACKAGE_ID,
  RELEASE_TERMINALS
) {
  console.log(`-------5.パッケージリリース端末変更-------`);

  const Data = {
    PACKAGE_ID: PACKAGE_ID,
    TERMINAL_COUNT: RELEASE_TERMINALS.length,
    RELEASE_TERMINAL: RELEASE_TERMINALS,
  };
  console.log("↓Request↓");
  console.log(Data);

  // デバッグモードの場合
  if (DebugMode)
    return { API_NAME: SET_PACKAGE_RELEASE_TERMINAL.name, RESULT: 0 };

  try {
    const response = await axios.post("/SET_PACKAGE_RELEASE_TERMINAL", Data);
    console.log("↓Responce↓");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

//
//6.パッケージ対応管理端末一覧
//
export async function GET_PACKAGE_TARGET_TERMINAL(PACKAGE_ID) {
  console.log(`-------6.パッケージ対応管理端末一覧-------`);

  const Data = {
    PACKAGE_ID: PACKAGE_ID,
  };
  console.log("↓Request↓");
  console.log(Data);

  // デバッグモードの場合
  if (DebugMode) return GET_PACKAGE_TARGET_TERMINAL_DATA;

  try {
    const response = await axios.get("/GET_PACKAGE_TARGET_TERMINAL", {
      params: Data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

//
//7.管理端末一覧
//
export async function GET_TERMINALS() {
  console.log(`-------7.管理端末一覧-------\n`);

  const Data = {};
  console.log("↓Request↓");
  console.log(Data);

  // デバッグモードの場合
  if (DebugMode) return GET_TERMINALS_DATA;

  try {
    const response = await axios.get("/GET_TERMINALS", Data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

//
//8.端末順変更
//
export async function SET_TERMINAL_ORDER(TERMINAL_ORDER) {
  console.log(`-------8.端末順変更-------`);

  const Data = {
    TERMINAL_COUNT: TERMINAL_ORDER.length,
    TERMINAL_ORDER: TERMINAL_ORDER,
  };
  console.log("↓Request↓");
  console.log(Data);

  // デバッグモードの場合
  if (DebugMode) return { API_NAME: SET_TERMINAL_ORDER.name, RESULT: 0 };

  try {
    const response = await axios.post("/SET_TERMINAL_ORDER", Data);
    console.log("↓Responce↓");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

//
//9.パッケージ順変更
//
export async function SET_PACKAGE_ORDER(PACKAGE_LIST) {
  console.log(`-------9.パッケージ順変更--------`);

  const Data = {
    PACKAGE_COUNT: PACKAGE_LIST.length,
    PACKAGE_LIST: PACKAGE_LIST,
  };
  console.log("↓Request↓");
  console.log(Data);

  // デバッグモードの場合
  if (DebugMode) return { API_NAME: SET_PACKAGE_ORDER.name, RESULT: 0 };

  try {
    const response = await axios.post("/SET_PACKAGE_ORDER", Data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

//
//10.端末登録
//
export async function REGISTER_TERMINAL(NAME, DISPLAY_NAME, IP_ADDRESS) {
  console.log(`-------10.端末登録-------`);

  const Data = {
    NAME: NAME,
    DISPLAY_NAME: DISPLAY_NAME,
    IP_ADDRESS: IP_ADDRESS,
  };
  console.log("↓Request↓");
  console.log(Data);

  // デバッグモードの場合
  if (DebugMode) return { API_NAME: REGISTER_TERMINAL.name, RESULT: 0 };

  try {
    const response = await axios.get("/REGISTER_TERMINAL", {
      params: Data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

//
//11.端末削除
//
export async function REMOVE_TERMINAL(TERMINAL_ID) {
  console.log(`-------11.端末削除-------`);

  const Data = {
    TERMINAL_ID: TERMINAL_ID,
  };
  console.log("↓Request↓");
  console.log(Data);

  // デバッグモードの場合
  if (DebugMode) return { API_NAME: REMOVE_TERMINAL.name, RESULT: 0 };

  try {
    const response = await axios.get("/REMOVE_TERMINAL", {
      params: Data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
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
  console.log(`-------12.端末更新-------`);

  const Data = {
    TERMINAL_ID: TERMINAL_ID,
    NAME: NAME,
    DISPLAY_NAME: DISPLAY_NAME,
    IP_ADDRESS: IP_ADDRESS,
  };
  console.log("↓Request↓");
  console.log(Data);

  // デバッグモードの場合
  if (DebugMode) return { API_NAME: UPDATE_TERMINAL.name, RESULT: 0 };

  try {
    const response = await axios.get("/UPDATE_TERMINAL", {
      params: Data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

//
//14.端末モジュール一覧取得
//
export async function GET_INSTALLED_MODULE() {
  console.log(`-------14.端末モジュール一覧取得-------`);

  const Data = {};
  console.log("↓Request↓");
  console.log(Data);

  // デバッグモードの場合
  if (DebugMode) return GET_INSTALLED_MODULE_DATA;

  try {
    const response = await axios.get("/GET_INSTALLED_MODULE", {
      params: Data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

//
//15.端末モジュールバージョン更新 TERMINAL_ID無指定も可
//
export async function UPDATE_TERMINAL_MODULE_VERSION(TERMINAL_ID) {
  console.log(`-------15.端末モジュールバージョン更新-------`);

  const Data = {
    TERMINAL_ID: TERMINAL_ID,
  };
  console.log("↓Request↓");
  console.log(Data);

  // デバッグモードの場合
  if (DebugMode)
    return { API_NAME: UPDATE_TERMINAL_MODULE_VERSION.name, RESULT: 0 };

  try {
    const response = await axios.get("/UPDATE_TERMINAL_MODULE_VERSION", {
      params: Data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

//
//16.ファイル所有端末取得
//
export async function GET_MODULE_INSTALLED_TERMINAL(INSTALL_PATH) {
  console.log(`-------16.ファイル所有端末取得-------`);

  const Data = { INSTALL_PATH: INSTALL_PATH };
  console.log("↓Request↓");
  console.log(Data);

  // デバッグモードの場合
  if (DebugMode) return GET_MODULE_INSTALLED_TERMINAL_DATA;

  try {
    const response = await axios.get("/GET_MODULE_INSTALLED_TERMINAL", {
      params: Data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

//
//17.収集パスの取得
//
export async function GET_COLLECT_PATH() {
  console.log(`-------17.収集パスの取得-------`);

  const Data = {};
  console.log("↓Request↓");
  console.log(Data);

  // デバッグモードの場合
  if (DebugMode) return GET_COLLECT_PATH_DATA;

  try {
    const response = await axios.get("/GET_COLLECT_PATH", {
      params: Data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

//
//18.収集パスの設定
//
export async function SET_COLLECT_PATH(COLLECT_PATHS) {
  console.log(`-------18.収集パスの設定-------`);

  const Data = {
    COLLECT_PATH_COUNT: COLLECT_PATHS.length,
    COLLECT_PATH: COLLECT_PATHS,
  };
  console.log("↓Request↓");
  console.log(Data);

  // デバッグモードの場合
  if (DebugMode) return { API_NAME: SET_COLLECT_PATH.name, RESULT: 0 };

  axios
    .post("/SET_COLLECT_PATH", Data)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}
