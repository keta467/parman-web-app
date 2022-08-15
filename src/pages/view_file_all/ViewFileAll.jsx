import axios from "axios";
import React from "react";
import FileAllTable from "../../components/tables/file_all_table/FileAllTable.jsx";
import { DebugModeContext } from "../../components/providers/DebugModeProvider.jsx";
import Topbar from "../../components/topbar/Topbar.jsx";
import { installModulesInfo, installVersionInfo } from "../../dummyData.js";
import "./ViewFileAll.css";

export default function ViewFileAll({ titletext }) {
  const [isModulelist, setIsModulelist] = React.useState([]);
  const [isPCList, setIsPCList] = React.useState([]);

  const { isDebugMode } = React.useContext(DebugModeContext);

  async function createtabledata() {
    var modulelist = [];
    var pclist = [];

    if (isDebugMode) {
      //モジュールリストの作成
      for (var i = 0; i < installModulesInfo.data.length; i++) {
        modulelist.push(installModulesInfo.data[i].module);
      }
      //PCリストの作成
      for (var i = 0; i < installVersionInfo.data.length; i++) {
        var module = installVersionInfo.data[i];

        var pcname = module[1];
        var pcversions = [];
        for (var j = 2; j < module.length; j++) {
          pcversions.push(module[j]);
        }
        pclist.push({ name: pcname, versions: pcversions });
      }
    } else {
      var modulesdata = await getmodules();
      //モジュールリストの作成
      for (var i = 0; i < modulesdata.length; i++) {
        modulelist.push(modulesdata[i].module);
      }
      var versionsdata = await getversions();
      console.log(versionsdata);
      for (var i = 0; i < versionsdata.length; i++) {
        console.log(versionsdata[i].machine);
        var pcname = versionsdata[i].machine;
        console.log(versionsdata[i].version);
        var version = versionsdata[i].version;
        pclist.push({ name: pcname, versions: version });
      }
    }

    setIsModulelist(modulelist);
    setIsPCList(pclist);
  }

  async function getversions() {
    try {
      //API
      const response = await axios.get(
        "http://3.137.85.73:1234/manage/api/version"
      );
      return response.data.data;
    } catch (err) {
      console.log(err);
      window.alert("取得失敗1");
      return "取得失敗1";
    }
  }

  async function getmodules() {
    try {
      //API
      const response = await axios.get(
        "http://3.137.85.73:1234/manage/api/modules"
      );
      return response.data.data;
    } catch (err) {
      console.log(err);
      return "取得失敗1";
    }
  }

  //初回レンダリング後
  React.useEffect(() => {
    createtabledata();
  }, []);

  return (
    <>
      <Topbar titletext={titletext} />
      {/* <Tab /> */}
      <div className="viewfileallbuttonwrapper">
        <button id="redobutton" className="mybutton" onClick={createtabledata}>
          再表示
        </button>
        <button
          className="mybutton"
          onClick={() => {
            console.log("最新バージョン取得");
          }}
        >
          最新バージョン取得
        </button>
      </div>
      <div className="viewfilealltablewrapper">
        <FileAllTable modulelist={isModulelist} pclist={isPCList} />
      </div>
    </>
  );
}
