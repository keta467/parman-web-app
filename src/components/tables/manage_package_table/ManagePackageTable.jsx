import React from 'react'
import "./ManagePackageTable.css"

export default function ManagePackageTable({pclist}) {

  // const { isDebugMode } = React.useContext(DebugModeContext);

  // const [isPCList, setIsPCList] = React.useState([]);

  // async function createtabledata(){
  //   var pclist = [];
  //   if(isDebugMode){
  //     for(var i = 0; i < ReleasedList.data.length; i++){
  //       pclist.push(ReleasedList.data[i]);
  //     }
  //   }else{

  //   }
  //   setIsPCList(pclist);
  // }

  // function search(keyword){
  //   var pclist = [];

  //   for(var i = 0; i < isPCList.length; i++){
  //     if(isPCList[i].name.includes("p2")){
  //       pclist.push(isPCList[i]);
  //     }
  //   }
  //   setIsPCList(pclist);
  // }


  // React.useEffect(() => {
  //   createtabledata();
  // }, []);

  function headercheckboxtoggle(event){
    if(event.target.checked){
      var elems = document.getElementsByClassName("mycheckbox");
      for(var i = 0; i < elems.length; i++){
        elems[i].checked = true;
      }
    }else{
      var elems = document.getElementsByClassName("mycheckbox");
      for(var i = 0; i < elems.length; i++){
        elems[i].checked = false;
      }
    }
  }

  return (
    <table className='colortable'>
      <thead>
        <tr>
          <th id='checkboxth'><input type="checkbox" onChange={(event)=>(headercheckboxtoggle(event))} /></th>
          <th>端末名</th>
          <th>端末名称</th>
          <th>IPアドレス</th>
          <th>リリース日時</th>
        </tr>
      </thead>
      <tbody>
          {pclist.map((pc, index) => (
            <tr key={index}>
              {pc.check
                  ? <td className='redtext bold'>済</td>
                  : <td><input type="checkbox" className='mycheckbox' /></td>
              }
              <td>{pc.name}</td>
              <td>{pc.nickname}</td>
              <td>{pc.ip}</td>
              <td>{pc.date}</td>
            </tr>
          ))}
      </tbody>
    </table>
  )
}
