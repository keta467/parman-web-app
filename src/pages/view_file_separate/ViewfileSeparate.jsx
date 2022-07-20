import React from 'react'
import FileSeparateTable from '../../components/tables/file_separate_table/FileSeparateTable';
import Topbar from '../../components/topbar/Topbar'
import "./ViewfileSeparate.css";
import { Folder, File } from "../../myclass.js";
import TreeView from '../../components/treeview/TreeView';
import { installModulesInfo } from '../../dummyData';
import { DebugModeContext } from '../../components/providers/DebugModeProvider';

export default function ViewfileSeparate({ titletext }) {

  const { isDebugMode } = React.useContext(DebugModeContext);

  const [foldersstate, setFolders] = React.useState([]);

  const [str, setstr] = React.useState("moduletest.dll");

  function ToggleFolder(id){
    setFolders((prevState) =>
      prevState.map((value) => (value.id === id ? new Folder(value.id, value.name, value.childs, !value.isOpen, ToggleFolder) : value))
    );
  }

  function SelectFile(name){
    setstr(name);
  }

  async function createtreedata(){
    var folderlist = [];
    if(isDebugMode){
      //フォルダ構成を再現
      var nowfolder = new Folder(null, "", [], true, null);
      for(var i = 0; i < installModulesInfo.data.length; i++){
        if(installModulesInfo.data[i].folder != nowfolder.name){
          folderlist.push(nowfolder);
          nowfolder = new Folder(i, installModulesInfo.data[i].folder, [], true, ToggleFolder);
        }
        nowfolder.childs.push(new File(installModulesInfo.data[i].module, installModulesInfo.data[i].folder, SelectFile))
      }
      folderlist.push(nowfolder);
      folderlist.shift();  
    }else{

    }
    setFolders(folderlist);
  }

  //初回レンダリング時に実行
  React.useEffect(() => {
    createtreedata();
  }, []);

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
