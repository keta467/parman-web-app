export class Folder {
  constructor(id, name, childs, isOpen, onclickfunc){
    this.id = id;
    this.name = name;
    this.isOpen = isOpen;
    this.childs = childs;
    this.onclickfunc = onclickfunc;
  }  
  getscript(){
    if(this.isOpen){
      var chilsarr = [];
      for(var i = 0; i < this.childs.length; i++){
        chilsarr.push(this.childs[i].getscript());
      }
      return <><span className="folder" onClick={() => this.onclickfunc(this.id)}>{this.name}</span><ul>{chilsarr}</ul></>
    }else{
      return <><span className="folder" onClick={() => this.onclickfunc(this.id)}>{this.name}</span></>
    }
  }
}

export class File {
  constructor(name, folder, onclickfunc){
    this.name = name;
    this.folder = folder;
    this.onclickfunc = onclickfunc;
  }  
  getscript(){
    if(this.onclickfunc == null){
      return <li>{this.name}</li>
    }else{
      //return <a href='javascript:void(0)' onClick={() => this.onclickfunc(this.name)} ><li>{this.name}</li></a>
      return <li ><span onClick={() => this.onclickfunc(this.name)} className="filebox">{this.name}</span></li>
      return <li className="fileli" onClick={() => this.onclickfunc(this.name)}><span className="filesize"><span className="fileborder">{this.name}</span></span></li>
    }
  }
}

//フォルダ折り畳み用関数
// function ToggleFolder(id){
//   setFolders((prevState) =>
//     prevState.map((value) => (value.id === id ? new Folder(value.id, value.name, value.childs, !value.isOpen, ToggleFolder) : value))
//   );
// }