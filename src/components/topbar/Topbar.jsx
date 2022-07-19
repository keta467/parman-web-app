import React from 'react'
import "./Topbar.css";
import { Link } from "react-router-dom";
import { DebugModeContext } from '../providers/DebugModeProvider';

export default function Topbar({ titletext }) {

  const { isDebugMode, setIsDebugMode } = React.useContext(DebugModeContext);

  function click(){
    setIsDebugMode(!isDebugMode)
  }

  return (
    <div className='topbarContainer'>
      <div className='topbarLeft'>
        <span className='titletext'>{titletext}</span>
      </div>
      {isDebugMode
          ? <span className="redtext bold" onClick={click}> デバッグモードで稼働中</span>
          : <span className="whitetext bold" onClick={click}> リリースモードで稼働中</span>
      }
      <div className='topbarRight'>
        <Link to="/manage_package">
          <button className='topbarbutton'>パッケージ情報</button>
        </Link>
        <Link to="/manage_machine">
          <button className='topbarbutton'>端末管理</button>
        </Link>
        <Link to="/view_file_all">
          <button className='topbarbutton'>ファイル全体管理</button>
        </Link>
        <Link to="/view_file_separate">
          <button className='topbarbutton'>ファイル別管理</button>
        </Link>
      </div>
    </div>
  )
}
