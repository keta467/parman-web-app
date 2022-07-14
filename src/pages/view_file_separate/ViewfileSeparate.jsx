import React from 'react'
import FileSeparateTable from '../../components/file_separate_table/FileSeparateTable';
import Topbar from '../../components/topbar/Topbar'
import "./ViewfileSeparate.css";
import { Folder, File } from "../../myclass.js";
import TreeView from '../../components/treeview/TreeView';
import { installModulesInfo } from '../../dummyData';

export default function ViewfileSeparate({ titletext }) {

  function ToggleFolder(id){
    setFolders((prevState) =>
      prevState.map((value) => (value.id === id ? new Folder(value.id, value.name, value.childs, !value.isOpen, ToggleFolder) : value))
    );
  }

  function SelectFile(name){
    setstr(name);
  }
  
  //フォルダ構成を再現
  var folders = [];
  var nowfolder = new Folder(null, "", [], true, null);
  for(var i = 0; i < installModulesInfo.data.length; i++){
    if(installModulesInfo.data[i].folder != nowfolder.name){
      folders.push(nowfolder);
      
      nowfolder = new Folder(i, installModulesInfo.data[i].folder, [], true, ToggleFolder);
    }
    nowfolder.childs.push(new File(installModulesInfo.data[i].module, installModulesInfo.data[i].folder, SelectFile))
  }
  folders.push(nowfolder);
  folders.shift();  

  const [foldersstate, setFolders] = React.useState(folders);

  const [str, setstr] = React.useState("moduletest.dll");

  return (
    <>
      <Topbar titletext={titletext} />
      <div className='viewfileseparatewrapper'>
        <div className='ViewfileSeparatetreeviewwrapper'>
          <TreeView folders={foldersstate}/>
        </div>
        <div className='viewfileseparatetableviewwrapper'>
            <FileSeparateTable selectmodulename={str} />
        </div>
      </div>
    </>
  )
}
