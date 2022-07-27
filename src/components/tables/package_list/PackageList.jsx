import React from 'react';
import "./PackageList.css";

export default function PackageList({packages}) {

  const [ispackages, setIsPackages] = React.useState(packages);

  var startindex = "";

  ///
  /// マウスオーバーイベントを追加する
  ///
  function addMouseOverColoringEvent() {

    var materialTd = document.getElementsByClassName("dragitem");
    console.log(materialTd.length)
    for (var materialNumber = 0; materialNumber < materialTd.length; materialNumber++) {
     
      materialTd[materialNumber].addEventListener("drag", mydrag);

      materialTd[materialNumber].addEventListener("dragover", mydragover);

      materialTd[materialNumber].addEventListener("dragleave", mydragleave);

      materialTd[materialNumber].addEventListener("drop", mudrop);
    }
  }  

  function mydrag(event) {
    console.log("drag")
    startindex = event.target.id;
  };

  function mydragover(event) {
    event.preventDefault();       

    let rect = this.getBoundingClientRect();
    if ((event.clientY - rect.top) < (this.clientHeight / 2)) {
      //マウスカーソルの位置が要素の半分より上
      for(var i = 0; i < this.children.length; i++){
        this.children[i].style.borderTop = '2px solid blue';
        this.children[i].style.borderBottom  = '1px solid #999';
      }
    } else {
      //マウスカーソルの位置が要素の半分より下
      for(var i = 0; i < this.children.length; i++){
       this.children[i].style.borderTop = '1px solid #999';
       this.children[i].style.borderBottom  = '2px solid blue';
      }
    }
  };

  function mydragleave(event) {

    for(var i = 0; i < this.children.length; i++){
      this.children[i].style.borderTop = '1px solid #999';
      this.children[i].style.borderBottom = '1px solid #999';
    }
  };

  function mudrop(event) {
    console.log("drop")
    event.preventDefault();
    let elm_drag = ispackages[startindex];

    var toindex = event.target.id;
    
    let rect = this.getBoundingClientRect();
    if ((event.clientY - rect.top) < (this.clientHeight / 2)) {
      //マウスカーソルの位置が要素の半分より上
      ispackages.splice(startindex, 1);

      if(Number(startindex) < Number(toindex)){
        ispackages.splice(Number(toindex) - 1, 0, elm_drag);
      }else{
        ispackages.splice(Number(toindex), 0, elm_drag);
      }
    } else {
      //マウスカーソルの位置が要素の半分より下
      ispackages.splice(startindex, 1);

      if(Number(startindex) < Number(toindex)){
        ispackages.splice(Number(toindex), 0, elm_drag);
      }else{
        ispackages.splice(Number(toindex) + 1, 0, elm_drag);
      }
    }

    var newarr = [];
    for(var i = 0; i < ispackages.length; i++){
      newarr.push(ispackages[i]);
    }
    setIsPackages(newarr);        

    for(var i = 0; i < this.children.length; i++){
      this.children[i].style.borderTop = '1px solid #999';
      this.children[i].style.borderBottom = '1px solid #999';
    }
  }  

  function rowckick(name){
    window.alert(name)
  }

  //初回レンダリング後
  React.useEffect(() => {
    addMouseOverColoringEvent()
  }, []);

  return (
    <table className='managepackagetable colortable'>
      <tbody className='managepackagetabletbody'>
        {ispackages.map((value, index)=>(
        <tr onClick={()=>(rowckick(value.name))}  draggable="true" className="dragitem" id={index} key={index} >
          <td id={index}>{value.name}</td>
        </tr>
        ))}
      </tbody>
    </table>
  )
}
