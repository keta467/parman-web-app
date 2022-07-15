import axios from 'axios';
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

  const clickbutton = async () => {
    try{
      //API
      const response = await axios.get("http://3.137.85.73:1234/manage/api/version");
      console.log(response.data);
    }catch(err){
      console.log(err)
    }
  };


  return (
    <>
      <Topbar titletext={titletext} />
      <div className='viewfileallbuttonwrapper'>
        <button onClick={clickbutton}>更新</button>
      </div>
      <div className="viewfilealltablewrapper">
        <FileAllTable modulelist={modulelist} pclist={pclist} />
      </div>
    </>
  )
}
