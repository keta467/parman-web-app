import React from 'react'
import FileAllTable from '../../components/file_all_table/FileAllTable';
import Topbar from '../../components/topbar/Topbar'
import { installModulesInfo ,installVersionInfo} from '../../dummyData';
import "./ViewFileAll.css";

export default function ViewFileAll({ titletext }) {

  //モジュールリストの作成
  var modulelist = [];
  for(var i = 0; i < installModulesInfo.data.length; i++){
    modulelist.push(installModulesInfo.data[i].module);
  }
  
  //PCリストの作成
  var pclist = [];
  for(var i = 0; i < installVersionInfo.data.length; i++){
    var module = installVersionInfo.data[i];

    var pcname = module[1];
    var pcversions = [];
    for(var j = 2; j < module.length; j++){
      pcversions.push(module[j]);
    }
    pclist.push({name:pcname, versions:pcversions});
  }


  return (
    <>
      <Topbar titletext={titletext} />
      <div className='viewfileallbuttonwrapper'>
        <button>更新</button>
      </div>
      <div className="viewfilealltablewrapper">
        <FileAllTable modulelist={modulelist} pclist={pclist} />
      </div>
    </>
  )
}
