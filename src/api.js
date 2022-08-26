import { GET_PACKAGE_LIST_DATA } from "./DummyDatas/GET_PACKAGE_LIST_DATA";

const mode = true;

export function GET_PACKAGE_LIST() {
  if (mode) {
    return GET_PACKAGE_LIST_DATA.PACKAGE_LIST;
  } else {
    return [];
  }
}
