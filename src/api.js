import { GET_INSTALLED_MODULE_DATA } from "./DummyDatas/GET_INSTALLED_MODULE_DATA";
import { GET_MODULE_INSTALLED_TERMINAL_DATA } from "./DummyDatas/GET_MODULE_INSTALLED_TERMINAL_DATA";
import { GET_MODULE_LIST_IN_PACKAGE_DATA } from "./DummyDatas/GET_MODULE_LIST_IN_PACKAGE_DATA";
import { GET_PACKAGE_LIST_DATA } from "./DummyDatas/GET_PACKAGE_LIST_DATA";
import { GET_PACKAGE_TARGET_TERMINAL_DATA } from "./DummyDatas/GET_PACKAGE_TARGET_TERMINAL_DATA";
import { GET_TERMINALS_DATA } from "./DummyDatas/GET_TERMINALS_DATA";

const mode = true;

export function GET_PACKAGE_LIST() {
  if (mode) {
    return GET_PACKAGE_LIST_DATA;
  } else {
    return [];
  }
}

export function GET_MODULE_LIST_IN_PACKAGE() {
  if (mode) {
    return GET_MODULE_LIST_IN_PACKAGE_DATA;
  } else {
    return [];
  }
}

export function GET_TERMINALS() {
  if (mode) {
    return GET_TERMINALS_DATA;
  } else {
    return [];
  }
}

export function GET_PACKAGE_TARGET_TERMINAL() {
  if (mode) {
    return GET_PACKAGE_TARGET_TERMINAL_DATA;
  } else {
    return [];
  }
}

export function GET_INSTALLED_MODULE() {
  if (mode) {
    return GET_INSTALLED_MODULE_DATA;
  } else {
    return [];
  }
}

export function GET_MODULE_INSTALLED_TERMINAL() {
  if (mode) {
    return GET_MODULE_INSTALLED_TERMINAL_DATA;
  } else {
    return [];
  }
}
