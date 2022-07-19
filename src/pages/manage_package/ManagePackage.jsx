import React from 'react';
import Topbar from '../../components/topbar/Topbar';
import TreeView from '../../components/treeview/TreeView';
import "./ManagePackage.css";
import { Folder, File } from "../../myclass.js";
import "../../components/colortable.css";
import ManagePackageTable from '../../components/manage_package_table/ManagePackageTable';
import { packageList } from '../../dummyData.js';
import { DebugModeContext } from '../../components/providers/DebugModeProvider';

export default function ManagePackage({ titletext }) {

  const { isDebugMode } = React.useContext(DebugModeContext);
  
  function ToggleFolder(id){
    setFolders((prevState) =>
      prevState.map((value) => (value.id === id ? new Folder(value.id, value.name, value.childs, !value.isOpen, ToggleFolder) : value))
    );
  }

  const [folders, setFolders] = React.useState([
    new Folder(1, "AAAAAAAAA", [new File("aaa", "A", null)], true, ToggleFolder),
    new Folder(2, "BBBBBBB", [new File("222", "B", null),new File("333", "B", null)], true, ToggleFolder)]);

  const [packages, setPackages] = React.useState([]);


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

  React.useEffect(() => {
    createlistdata();
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
            <input type="text" name="" id="" />
            <button style={{"margin-left":"5px"}}>検索</button>
          </div>

          <div className='managepackagesearchviewtablewrapper'>
           <ManagePackageTable />
          </div>
        </div>
      </div>
    </>
  )
}
