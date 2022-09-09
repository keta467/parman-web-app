//デバッグモード true => ダミーデータ参照   false => API参照
export const DebugMode = true;

// 環境１　ip: localhost　port: 3002
// 環境２　ip: 3.137.85.73　port: 3002
const API_SERVER_IP = "3.137.85.73";
const PORT = 3002;

// axios baseURL
export const BaseURL = `http://${API_SERVER_IP}:${PORT}`;
