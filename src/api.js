import { GET_INSTALLED_MODULE_DATA } from "./DummyDatas/GET_INSTALLED_MODULE_DATA";
import { GET_MODULE_INSTALLED_TERMINAL_DATA } from "./DummyDatas/GET_MODULE_INSTALLED_TERMINAL_DATA";
import { GET_MODULE_LIST_IN_PACKAGE_DATA } from "./DummyDatas/GET_MODULE_LIST_IN_PACKAGE_DATA";
import { GET_PACKAGE_LIST_DATA } from "./DummyDatas/GET_PACKAGE_LIST_DATA";
import { GET_PACKAGE_TARGET_TERMINAL_DATA } from "./DummyDatas/GET_PACKAGE_TARGET_TERMINAL_DATA";
import { GET_TERMINALS_DATA } from "./DummyDatas/GET_TERMINALS_DATA";
import { GET_COLLECT_PATH_DATA } from "./DummyDatas/GET_COLLECT_PATH_DATA";
import axios from "axios";

export const DEBUG_MODE = (() => {
  const str = document.getElementById("debugmode_div").innerHTML;
  if (typeof str != "string") {
    return Boolean(str);
  }
  try {
    var obj = JSON.parse(str.toLowerCase());
    return obj == true;
  } catch (e) {
    return str != "";
  }
})();

export const IP_ADDRESS = document.getElementById("ipaddress_div").innerHTML;
export const PORT = document.getElementById("port_div").innerHTML;
export const BASE_URL = `http://${IP_ADDRESS}:${PORT}/manage`;

// axios　baseURL設定
axios.defaults.baseURL = BASE_URL;

//
//1.パッケージ一覧取得
//
export async function GET_PACKAGE_LIST() {
  const Name = GET_PACKAGE_LIST.name;
  console.log(`1.${Name}()`);

  const Data = {};

  // デバッグモードの場合
  if (DEBUG_MODE) return GET_PACKAGE_LIST_DATA;

  try {
    const response = await axios.get(`/${Name}`);
    console.log(
      `-------1.パッケージ一覧取得-------\n${Name}\nリクエスト内容\n%o\nレスポンス内容\n%o`,
      Data,
      response.data
    );
    return response.data;
  } catch (error) {
    console.error(`${error.message} : ${Name}`);
    window.alert(`${error.message} : ${Name}`);
    throw new Error(`${error.message} : ${Name}`);
  }
}

//
//3.パッケージ内モジュール一覧
//
export async function GET_MODULE_LIST_IN_PACKAGE(PACKAGE_ID) {
  const Name = GET_MODULE_LIST_IN_PACKAGE.name;
  console.log(`3.${Name}()...`);

  const Data = {
    PACKAGE_ID: PACKAGE_ID,
  };

  // デバッグモードの場合
  if (DEBUG_MODE) return GET_MODULE_LIST_IN_PACKAGE_DATA;

  try {
    const response = await axios.get(`/${Name}`, {
      params: Data,
    });
    console.log(
      `-------3.パッケージ内モジュール一覧-------\n${Name}\nリクエスト内容\n%o\nレスポンス内容\n%o`,
      Data,
      response.data
    );
    return response.data;
  } catch (error) {
    console.error(`${error.message} : ${Name}`);
    window.alert(`${error.message} : ${Name}`);
    throw new Error(`${error.message} : ${Name}`);
  }
}

//
//4.更新パッケージ取り込み
//
export async function UPDATE_PACKAGE(PACKAGE_ID) {
  const Name = UPDATE_PACKAGE.name;
  console.log(`4.${Name}()`);

  const Data = {
    PACKAGE_ID: PACKAGE_ID,
  };

  // デバッグモードの場合
  if (DEBUG_MODE) return { API_NAME: UPDATE_PACKAGE.name, result: 0 };

  try {
    const response = await axios.get(`/${Name}`, {
      params: Data,
    });
    console.log(
      `-------4.更新パッケージ取り込み-------\n${Name}\nリクエスト内容\n%o\nレスポンス内容\n%o`,
      Data,
      response.data
    );

    if (response.data.result != 0) throw new Error(`異常終了`);

    return response.data;
  } catch (error) {
    console.error(`${error.message} : ${Name}`);
    window.alert(`${error.message} : ${Name}`);
    throw new Error(`${error.message} : ${Name}`);
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
  console.log(`5.${Name}()`);

  const Data = {
    PACKAGE_ID: PACKAGE_ID,
    TERMINAL_COUNT: RELEASE_TERMINALS.length,
    RELEASE_TERMINAL: RELEASE_TERMINALS,
  };

  // デバッグモードの場合
  if (DEBUG_MODE)
    return { API_NAME: SET_PACKAGE_RELEASE_TERMINAL.name, result: 0 };

  try {
    const response = await axios.post(`/${Name}`, Data);
    console.log(
      `-------5.パッケージリリース端末変更-------\n${Name}\nリクエスト内容\n%o\nレスポンス内容\n%o`,
      Data,
      response.data
    );

    if (response.data.result != 0) throw new Error(`異常終了`);

    return response.data;
  } catch (error) {
    console.error(`${error.message} : ${Name}`);
    window.alert(`${error.message} : ${Name}`);
    throw new Error(`${error.message} : ${Name}`);
  }
}

//
//6.パッケージ対応管理端末一覧
//
export async function GET_PACKAGE_TARGET_TERMINAL(PACKAGE_ID) {
  const Name = GET_PACKAGE_TARGET_TERMINAL.name;
  console.log(`6.${Name}()`);

  const Data = {
    PACKAGE_ID: PACKAGE_ID,
  };

  // デバッグモードの場合
  if (DEBUG_MODE) return GET_PACKAGE_TARGET_TERMINAL_DATA;

  try {
    const response = await axios.get(`/${Name}`, {
      params: Data,
    });
    console.log(
      `-------6.パッケージ対応管理端末一覧-------\n${Name}\nリクエスト内容\n%o\nレスポンス内容\n%o`,
      Data,
      response.data
    );
    return response.data;
  } catch (error) {
    console.error(`${error.message} : ${Name}`);
    window.alert(`${error.message} : ${Name}`);
    throw new Error(`${error.message} : ${Name}`);
  }
}

//
//7.管理端末一覧
//
export async function GET_TERMINALS() {
  const Name = GET_TERMINALS.name;
  console.log(`7.${Name}()`);

  const Data = {};

  // デバッグモードの場合
  if (DEBUG_MODE) return GET_TERMINALS_DATA;

  try {
    const response = await axios.get(`/${Name}`, Data);
    console.log(
      `-------7.管理端末一覧-------\n${Name}\nリクエスト内容\n%o\nレスポンス内容\n%o`,
      Data,
      response.data
    );
    return response.data;
  } catch (error) {
    console.error(`${error.message} : ${Name}`);
    window.alert(`${error.message} : ${Name}`);
    throw new Error(`${error.message} : ${Name}`);
  }
}

//
//8.端末順変更
//
export async function SET_TERMINAL_ORDER(TERMINAL_ORDER) {
  const Name = SET_TERMINAL_ORDER.name;
  console.log(`8.${Name}()`);

  const Data = {
    TERMINAL_COUNT: TERMINAL_ORDER.length,
    TERMINAL_ORDER: TERMINAL_ORDER,
  };

  // デバッグモードの場合
  if (DEBUG_MODE) return { API_NAME: SET_TERMINAL_ORDER.name, result: 0 };

  try {
    const response = await axios.post(`/${Name}`, Data);
    console.log(
      `-------8.端末順変更-------\n${Name}\nリクエスト内容\n%o\nレスポンス内容\n%o`,
      Data,
      response.data
    );

    if (response.data.result != 0) throw new Error(`異常終了`);

    return response.data;
  } catch (error) {
    console.error(`${error.message} : ${Name}`);
    window.alert(`${error.message} : ${Name}`);
    throw new Error(`${error.message} : ${Name}`);
  }
}

//
//9.パッケージ順変更
//
export async function SET_PACKAGE_ORDER(PACKAGE_LIST) {
  const Name = SET_PACKAGE_ORDER.name;
  console.log(`9.${Name}()`);

  const Data = {
    PACKAGE_COUNT: PACKAGE_LIST.length,
    PACKAGE_LIST: PACKAGE_LIST,
  };

  // デバッグモードの場合
  if (DEBUG_MODE) return { API_NAME: SET_PACKAGE_ORDER.name, result: 0 };

  try {
    const response = await axios.post(`/${Name}`, Data);
    console.log(
      `-------9.パッケージ順変更-------\n${Name}\nリクエスト内容\n%o\nレスポンス内容\n%o`,
      Data,
      response.data
    );

    if (response.data.result != 0) throw new Error(`異常終了`);

    return response.data;
  } catch (error) {
    console.error(`${error.message} : ${Name}`);
    window.alert(`${error.message} : ${Name}`);
    throw new Error(`${error.message} : ${Name}`);
  }
}

//
//10.端末登録
//
export async function REGISTER_TERMINAL(NAME, DISPLAY_NAME, IP_ADDRESS) {
  const Name = REGISTER_TERMINAL.name;
  console.log(`10.${Name}()`);

  const Data = {
    NAME: NAME,
    DISPLAY_NAME: DISPLAY_NAME,
    IP_ADDRESS: IP_ADDRESS,
  };

  // デバッグモードの場合
  if (DEBUG_MODE) return { API_NAME: REGISTER_TERMINAL.name, result: 0 };

  try {
    const response = await axios.get(`/${Name}`, {
      params: Data,
    });
    console.log(
      `-------10.端末登録-------\n${Name}\nリクエスト内容\n%o\nレスポンス内容\n%o`,
      Data,
      response.data
    );

    if (response.data.result != 0) throw new Error(`異常終了`);

    return response.data;
  } catch (error) {
    console.error(`${error.message} : ${Name}`);
    window.alert(`${error.message} : ${Name}`);
    throw new Error(`${error.message} : ${Name}`);
  }
}

//
//11.端末削除
//
export async function REMOVE_TERMINAL(TERMINAL_ID) {
  const Name = REMOVE_TERMINAL.name;
  console.log(`11.${Name}()`);

  const Data = {
    TERMINAL_ID: TERMINAL_ID,
  };

  // デバッグモードの場合
  if (DEBUG_MODE) return { API_NAME: REMOVE_TERMINAL.name, result: 0 };

  try {
    const response = await axios.get(`/${Name}`, {
      params: Data,
    });
    console.log(
      `-------11.端末削除-------\n${Name}\nリクエスト内容\n%o\nレスポンス内容\n%o`,
      Data,
      response.data
    );

    if (response.data.result != 0) throw new Error(`異常終了`);

    return response.data;
  } catch (error) {
    console.error(`${error.message} : ${Name}`);
    window.alert(`${error.message} : ${Name}`);
    throw new Error(`${error.message} : ${Name}`);
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
  console.log(`12.${Name}()`);

  const Data = {
    TERMINAL_ID: TERMINAL_ID,
    NAME: NAME,
    DISPLAY_NAME: DISPLAY_NAME,
    IP_ADDRESS: IP_ADDRESS,
  };

  // デバッグモードの場合
  if (DEBUG_MODE) return { API_NAME: UPDATE_TERMINAL.name, result: 0 };

  try {
    const response = await axios.get(`/${Name}`, {
      params: Data,
    });
    console.log(
      `-------12.端末更新-------\n${Name}\nリクエスト内容\n%o\nレスポンス内容\n%o`,
      Data,
      response.data
    );

    if (response.data.result != 0) throw new Error(`異常終了`);

    return response.data;
  } catch (error) {
    console.error(`${error.message} : ${Name}`);
    window.alert(`${error.message} : ${Name}`);
    throw new Error(`${error.message} : ${Name}`);
  }
}

//
//14.端末モジュール一覧取得
//
export async function GET_INSTALLED_MODULE() {
  const Name = GET_INSTALLED_MODULE.name;
  console.log(`14.${Name}()`);

  const Data = {};

  // デバッグモードの場合
  if (DEBUG_MODE) return GET_INSTALLED_MODULE_DATA;

  try {
    const response = await axios.get(`/${Name}`, {
      params: Data,
    });
    console.log(
      `-------14.端末モジュール一覧取得-------\n${Name}\nリクエスト内容\n%o\nレスポンス内容\n%o`,
      Data,
      response.data
    );
    return response.data;
  } catch (error) {
    console.error(`${error.message} : ${Name}`);
    window.alert(`${error.message} : ${Name}`);
    throw new Error(`${error.message} : ${Name}`);
  }
}

//
//15.端末モジュールバージョン更新 TERMINAL_ID無指定も可
//
export async function UPDATE_TERMINAL_MODULE_VERSION(TERMINAL_ID) {
  const Name = UPDATE_TERMINAL_MODULE_VERSION.name;
  console.log(`15.${Name}()`);

  const Data = {
    TERMINAL_ID: TERMINAL_ID,
  };

  // デバッグモードの場合
  if (DEBUG_MODE)
    return { API_NAME: UPDATE_TERMINAL_MODULE_VERSION.name, result: 0 };

  try {
    const response = await axios.get(`/${Name}`, {
      params: Data,
    });
    console.log(
      `-------15.端末モジュールバージョン更新-------\n${Name}\nリクエスト内容\n%o\nレスポンス内容\n%o`,
      Data,
      response.data
    );

    if (response.data.result != 0) throw new Error(`異常終了`);

    return response.data;
  } catch (error) {
    console.error(`${error.message} : ${Name}`);
    window.alert(`${error.message} : ${Name}`);
    throw new Error(`${error.message} : ${Name}`);
  }
}

//
//16.ファイル所有端末取得
//
export async function GET_MODULE_INSTALLED_TERMINAL(INSTALL_PATH) {
  const Name = GET_MODULE_INSTALLED_TERMINAL.name;
  console.log(`16.${Name}()`);

  const Data = { INSTALL_PATH: INSTALL_PATH };

  // デバッグモードの場合
  if (DEBUG_MODE) return GET_MODULE_INSTALLED_TERMINAL_DATA;

  try {
    const response = await axios.get(`/${Name}`, {
      params: Data,
    });
    console.log(
      `-------16.ファイル所有端末取得-------\n${Name}\nリクエスト内容\n%o\nレスポンス内容\n%o`,
      Data,
      response.data
    );
    return response.data;
  } catch (error) {
    console.error(`${error.message} : ${Name}`);
    window.alert(`${error.message} : ${Name}`);
    throw new Error(`${error.message} : ${Name}`);
  }
}

//
//17.収集パスの取得
//
export async function GET_COLLECT_PATH() {
  const Name = GET_COLLECT_PATH.name;
  console.log(`17.${Name}()`);

  const Data = {};
  // デバッグモードの場合
  if (DEBUG_MODE) return GET_COLLECT_PATH_DATA;

  try {
    const response = await axios.get(`/${Name}`, {
      params: Data,
    });
    console.log(
      `-------17.収集パスの取得-------\n${Name}\nリクエスト内容\n%o\nレスポンス内容\n%o`,
      Data,
      response.data
    );
    return response.data;
  } catch (error) {
    console.error(`${error.message} : ${Name}`);
    window.alert(`${error.message} : ${Name}`);
    throw new Error(`${error.message} : ${Name}`);
  }
}

//
//18.収集パスの設定
//
export async function SET_COLLECT_PATH(COLLECT_PATHS) {
  const Name = SET_COLLECT_PATH.name;
  console.log(`18.${Name}()`);

  const Data = {
    COLLECT_PATH_COUNT: COLLECT_PATHS.length,
    COLLECT_PATH: COLLECT_PATHS,
  };

  // デバッグモードの場合
  if (DEBUG_MODE) return { API_NAME: SET_COLLECT_PATH.name, result: 0 };

  try {
    const response = await axios.post(`/${Name}`, Data);
    console.log(
      `-------18.収集パスの設定-------\n${Name}\nリクエスト内容\n%o\nレスポンス内容\n%o`,
      Data,
      response.data
    );

    if (response.data.result != 0) throw new Error(`異常終了`);

    return response.data;
  } catch (error) {
    console.error(`${error.message} : ${Name}`);
    window.alert(`${error.message} : ${Name}`);
    throw new Error(`${error.message} : ${Name}`);
  }
}
