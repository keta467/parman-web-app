import React from 'react'
import "./Topbar.css";
import { Link } from "react-router-dom";

export default function Topbar({ titletext }) {
  return (
    <div className='topbarContainer'>
      <div className='topbarLeft'>
        <span className='titletext'>{titletext}</span>
      </div>
      <div className='topbarRight'>
        <Link to="/manage_releasepackage">
          <button className='mybutton'>パッケージ情報</button>
        </Link>
        <Link to="/manage_machine">
          <button className='mybutton'>端末管理</button>
        </Link>
        <Link to="/view_file_all">
          <button className='mybutton'>ファイル全体管理</button>
        </Link>
        <Link to="/view_file_separate">
          <button className='mybutton'>ファイル別管理</button>
        </Link>
      </div>
    </div>
  )
}
