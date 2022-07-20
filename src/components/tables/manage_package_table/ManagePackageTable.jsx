import React from 'react'

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

  return (
    <table className='colortable'>
    <thead>
      <tr>
        <th><input type="checkbox" name="" id=""/></th>
        <th>端末名</th>
        <th>端末名称</th>
        <th>IPアドレス</th>
        <th>リリース日時</th>
      </tr>
    </thead>
    <tbody>
        {pclist.map((pc) => (
          <tr>
            {pc.check
                ? <td>済</td>
                : <td><input type="checkbox" name="" id="" /></td>
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
