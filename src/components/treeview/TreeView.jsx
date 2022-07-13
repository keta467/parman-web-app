import React from 'react';
import "./TreeView.css";

export default function TreeView({folders}) {
  return (
    <ul className='myfiletree mytreeview'>
      {folders.map(v=>(React.createElement('li', {}, v.getscript())))}
    </ul>
  )
}
