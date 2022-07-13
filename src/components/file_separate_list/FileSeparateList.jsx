import React from 'react'
import "./FileSeparateList.css"
import { installModulesInfo } from '../../dummyData';
import { SelectModuleNameContext } from '../providers/SelectModuleNameProvider';

export default function FileSeparateList() {
  class Folder {
    constructor(id, name, childs, isOpen){
      this.id = id;
      this.name = name;
      this.isOpen = isOpen;
      this.childs = childs;
    }  
    getscript(){
      if(this.isOpen){
        var chilsarr = [];
        for(var i = 0; i < this.childs.length; i++){
          chilsarr.push(this.childs[i].getscript());
        }
        return <><span class="folder" onClick={() => ToggleFolder(this.id)}>{this.name}</span><ul>{chilsarr}</ul></>
      }else{
        return <><span class="folder" onClick={() => ToggleFolder(this.id)}>{this.name}</span></>
      }
    }
  }

  class File {
    constructor(name, folder){
      this.name = name;
      this.folder = folder;
    }  
    getscript(){
      return <a href='javascript:void(0)' onClick={() => SelectFile(this.name)}><li>{this.name}</li></a>
    }
  }

  //リストで選択されているモジュール名を取得
  const { setIsSelectModuleName } = React.useContext(SelectModuleNameContext);
  

  //フォルダ構成を再現
  var folders = [];
  var nowfolder = new Folder(null, "", [], true);
  for(var i = 0; i < installModulesInfo.data.length; i++){
    if(installModulesInfo.data[i].folder != nowfolder.name){
      folders.push(nowfolder);
      
      nowfolder = new Folder(i, installModulesInfo.data[i].folder, [], true);
    }
    nowfolder.childs.push(new File(installModulesInfo.data[i].module, installModulesInfo.data[i].folder))
  }
  folders.push(nowfolder);
  folders.shift();

  //ステートに入れる
  const [foldersState, setFolders] = React.useState(folders)

  function ToggleFolder(id){
    setFolders((prevState) =>
      prevState.map((value) => (value.id === id ? new Folder(value.id, value.name, value.childs, !value.isOpen) : value))
    );
  }

  function SelectFile(name){
    setIsSelectModuleName(name);
  }

  
  return (
    <div className='fileseparatelistwrapper'>
      <ul className='filetree treeview'>
        {foldersState.map(v=>(React.createElement('li', {}, v.getscript())))}
      </ul>
   </div>

  )
}
