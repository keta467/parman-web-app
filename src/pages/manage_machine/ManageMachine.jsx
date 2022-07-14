import React from 'react'
import Manage_Machine_Table from '../../components/manage_machine_table/Manage_Machine_Table';
import Topbar from '../../components/topbar/Topbar'
import "./ManageMachine.css";

export default function ManageMachine({ titletext }) {
  return (
    <>
      <Topbar titletext={titletext} />
      <div className='managemachinebuttonwrapper'>
        <button>追加</button>
      </div>
      <div className='managemachinetablewrapper'>
        <Manage_Machine_Table />
      </div>
    </>
  )
}
