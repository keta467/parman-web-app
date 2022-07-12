import {React, useEffect, useState} from 'react'
import "./FileAllTable.css"

export default function FileAllTable({ modulelist, pclist}) {

  // var modulelist = ["IniPatch.bat", "Start.bat", "TaskKill.bat"];

  // var pc1 = {name:"ANTSリモコンPC", versions: ["3.0.1.9","3.0.1.9","3.0.1.9"]}
  // var pc2 = {name:"バックアップリモコンPC", versions: ["3.0.2.0","3.0.1.9","3.0.1.9"]}
  // var pc3 = {name:"GSリモコンPC", versions: ["3.0.2.0","3.0.1.8","3.0.1.9"]}

  // const [pclist, setFruits] = useState([pc1, pc2, pc3])
  // setFruits([pc3,pc2,pc1])

  //var pclist = [pc1, pc2, pc3];

  ///
  /// マウスオーバーイベントを追加する
  ///
  function addMouseOverColoringEvent() {
    var materialTd = document.getElementsByClassName("mouseeventtarget");
    for (var materialNumber = 0; materialNumber < materialTd.length; materialNumber++) {
      materialTd[materialNumber].addEventListener("mouseout", function (event) {
        var classList = event.target.className.split(' ');

        var rowList = document.getElementsByClassName(classList[1]);
        for (var rowNumber = 0; rowNumber < rowList.length; rowNumber++) {
          rowList[rowNumber].style.backgroundColor = 'white';
        };

        var colList = document.getElementsByClassName(classList[2]);
        for (var colNumber = 0; colNumber < colList.length; colNumber++) {
          colList[colNumber].style.backgroundColor = 'white';
        };
      });

      materialTd[materialNumber].addEventListener("mouseover", function (event) {
        var classList = event.target.className.split(' ');
        var rowList = document.getElementsByClassName(classList[1]);
        for (var rowNumber = 0; rowNumber < rowList.length; rowNumber++) {
          rowList[rowNumber].style.backgroundColor = 'aqua';
        };

        var innerText = event.target.innerHTML;
        var colList = document.getElementsByClassName(classList[2]);
        for (var colNumber = 0; colNumber < colList.length; colNumber++) {
          if (innerText == colList[colNumber].innerHTML) {
            colList[colNumber].style.backgroundColor = 'aqua';
          } else {
            colList[colNumber].style.backgroundColor = 'yellow';
          }
        };
      });
    }
  }



  // 初回レンダリング後と、useした値の更新後に自動で実行
  useEffect(() => {
    addMouseOverColoringEvent()
  });

  return (
    <div className='tablewrapper'>
      <table id='module_list'>
        <thead id='module_list_header'>
          <tr>
            <th className='machinename'>マシン名</th>
            {modulelist.map((module,index)=>(<th id={"th"+index}>{module}</th>))}
          </tr>
        </thead>
        <tbody id='module_list_body'>
          {pclist.map((pc, pcindex) => (
            <tr>
              <th className='machinename'>{pc.name}</th>
              {pc.versions.map((version, index)=>(<td className={'mouseeventtarget'+' row' + pcindex + ' col' + index}>{version}</td>))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
