import React from 'react';//dev
import Topbar from '../../components/topbar/Topbar';
import TreeView from '../../components/treeview/TreeView';
import "./ManagePackage.css";
import { Folder, File } from "../../myclass.js";
import ManagePackageTable from '../../components/tables/manage_package_table/ManagePackageTable';
import { packageList, TreeData1 , ReleasedList, TreeData2 } from '../../dummyData.js';
import { DebugModeContext } from '../../components/providers/DebugModeProvider';

export default function ManagePackage({ titletext }) {

  const { isDebugMode } = React.useContext(DebugModeContext);
  
  function ToggleFolder(id){
    setFolders((prevState) =>
      prevState.map((value) => (value.id === id ? new Folder(value.id, value.name, value.childs, !value.isOpen, ToggleFolder) : value))
    );
  }


  const [packages, setPackages] = React.useState([]);
  const [folders, setFolders] = React.useState([]);
  const [isPCList, setIsPCList] = React.useState([]);

  async function createlistdata(){
    var packagelist = [];
    if(isDebugMode){
      for(var i = 0; i < packageList.data.length; i++){
        packagelist.push(packageList.data[i]);
      }
    }else{
    }
    setPackages(packagelist);
  }

  async function createtreedata(){
    var folderlist = [];
    if(isDebugMode){
      var nowfolder = new Folder(null, "", [], true, null);
      for(var i = 0; i < TreeData1.data.length; i++){
        if(TreeData1.data[i].folderid != nowfolder.id){
          folderlist.push(nowfolder);
          nowfolder = new Folder(TreeData1.data[i].folderid, TreeData1.data[i].foldername, [], true, ToggleFolder);
        }
        nowfolder.childs.push(new File(TreeData1.data[i].module, TreeData1.data[i].foldername, null))
      }
      nowfolder.childs.push(new Folder(100, "testfolder", [
        new File("file1", "testfolder", null),
        new File("file2", "testfolder", null)
      ], true, ToggleFolder));
      folderlist.push(nowfolder);
      folderlist.shift();  
    }else{

    }
    setFolders(folderlist);
  }

  async function createtabledata(){
    var pclist = await gettabledata();
    setIsPCList(pclist);
  }

  async function gettabledata(){
    var pclist = [];
    if(isDebugMode){
      for(var i = 0; i < ReleasedList.data.length; i++){
        pclist.push(ReleasedList.data[i]);
      }
    }else{

    }
    return pclist;
  }

  async function buttonclick(){
    var element = document.getElementById("serchtext");
    search(element.value)
  }

  async function search(keyword){
    var pclist = [];
    var data = await gettabledata();
    for(var i = 0; i < data.length; i++){
      if(data[i].name.includes(keyword)){
        pclist.push(data[i]);
      }
    }
    setIsPCList(pclist);
  }  

  React.useEffect(() => {
    createlistdata();
    createtreedata();
    createtabledata();
  }, []);

  return (
    <>
      <Topbar titletext={titletext} />
      <div className='managepackagewrapper'>
        <div className='managepackagelist'>
          <ul>
            {packages.map((data) => (<li>{data.name}</li>))}
          </ul>
        </div>
        <div className='managepackagetreeview'>
          <TreeView folders={folders}/>
        </div>
        <div className='managepackagesearchview'>
          <div className='searcharea'>
            <input type="text" name="" id="serchtext" />
            <button onClick={buttonclick} style={{"margin-left":"10px"}}>検索</button>
          </div>

          <div className='managepackagesearchviewtablewrapper'>
           <ManagePackageTable pclist={isPCList}/>
          </div>
        </div>
      </div>
    </>
  )
}
