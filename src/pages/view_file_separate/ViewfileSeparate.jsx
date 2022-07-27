import React from 'react'
import FileSeparateTable from '../../components/tables/file_separate_table/FileSeparateTable.jsx';
import Topbar from '../../components/topbar/Topbar.jsx'
import "./ViewfileSeparate.css";
import { Folder, File } from "../../myclass.js";
import TreeView from '../../components/treeview/TreeView.jsx';
import { installModulesInfo , TreeData2} from '../../dummyData.js';
import { DebugModeContext } from '../../components/providers/DebugModeProvider.jsx';

export default function ViewfileSeparate({ titletext }) {

  const { isDebugMode } = React.useContext(DebugModeContext);

  const [folders, setFolders] = React.useState([]);

  const [str, setstr] = React.useState("moduletest.dll");

  function ToggleFolder(){
    setFolders((prevState) =>
      prevState.map((value) => (new Folder(null,null,null,null,null,null,value)))
    );
  }

  function SelectFile(name){
    setstr(name);
  }

  async function createtreedata(){
    var folderlist = [];
    if(isDebugMode){
        ///
        ///フォルダを全て生成
        ///
        for(var i = 0; i < TreeData2.data.length; i++){
          const str = TreeData2.data[i].path;
          const regex = /([^\\]*)\\/g;
          const foldersInPath = str.match(regex);
          for(var j = 0; j < foldersInPath.length; j++){
            //パス
            var count = 0;
            var Path = "";
            var ParentFolderPath = "";
            for(var k = 0; k < str.length; k++){

              if(count == j + 1){
                  break;
              }

              Path += str[k]
              if(str[k] == '\\'){
                count = count + 1;
                if(count == j){
                  ParentFolderPath = Path;
                }
              }
            }
            //重複チェック
            var isok = true;
            for(var k = 0; k < folderlist.length; k++){
              if(folderlist[k].Path == Path && folderlist[k].name == foldersInPath[j].replace('\\', '')){
                isok = false;
                break;
              }
            }
            //新規フォルダの場合
            if(isok){
              if(j == 0){
                folderlist.push(new Folder(folderlist.length + 1, foldersInPath[j].replace('\\', ''), true, 0, Path, ToggleFolder))
              }else{
                //親フォルダIDを見つけ出す
                var parentfolderid = 0;
                for(var k = 0; k < folderlist.length; k++){
                  //もしパスから自分を抜いたパスとパスが一致するフォルダの場合
                  if(folderlist[k].Path == ParentFolderPath){
                    parentfolderid = folderlist[k].id;
                    break;
                  }
                }
                folderlist.push(new Folder(folderlist.length + 1, foldersInPath[j].replace('\\', ''), true, parentfolderid, Path, ToggleFolder))
              } 
              //console.log(`${folderlist[folderlist.length - 1].Path}`)
            }
          }        
        }
        var files = [];
        for(var i = 0; i < TreeData2.data.length; i++){
          const str = TreeData2.data[i].path;

          var datas = str.match(/\\[^\\]*/g);
          const filename = datas[datas.length-1].replace('\\', '');

          datas = str.match(/([^\\]*)\\/g);
          var parentfolderid;
          for(var j = 0; j < folderlist.length; j++){
            if(folderlist[j].Path == str.replace(filename, "")){
              parentfolderid = folderlist[j].id
            }
          }

          const Path = TreeData2.data[i].path;

          files.push(new File(filename, parentfolderid, Path, SelectFile))

        }        
        //フォルダにファイルを入れる
        for(var i = 0; i < folderlist.length; i++){
          for(var j = 0; j < files.length; j++){
            if(folderlist[i].id == files[j].parentfolderid){
              folderlist[i].addchild(files[j])
            }
          }
        }    
        
        //フォルダにフォルダを入れる
        for(var i = 0; i < folderlist.length; i++){
          for(var j = 0; j < folderlist.length; j++){
            if(folderlist[i].id == folderlist[j].parentfolderid){
              folderlist[i].addchild(folderlist[j])
            }
          }
        }               
        //並べ替え
        for(var i = 0; i < folderlist.length; i++){
          folderlist[i].narabekae();
        }       
    }else{

    }

    //Dのラムダ以下をセット
    for(var i = 0; i < folderlist.length; i++){
      console.log()
      if(folderlist[i].Path == "D:\\lambda\\"){
        setFolders(folderlist[i].childs);
        break;
      }
    }
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
          <TreeView folders={folders}/>
        </div>
        <div className='viewfileseparatetableviewwrapper'>
          <div className='fileseparatetablewrap'>
            {str}
            <FileSeparateTable selectmodulename={str} />
          </div>
        </div>
      </div>
    </>
  )
}
