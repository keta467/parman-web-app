import React from 'react'
import Manage_Machine_Table from '../../components/manage_machine_table/Manage_Machine_Table';
import Modal_Machine from '../../components/modal_machine/Modal_Machine';
import Topbar from '../../components/topbar/Topbar'
import "./ManageMachine.css";

export default function ManageMachine({ titletext }) {

  const [isShowModal, setisShowModal] = React.useState(false);

  const ClickAddButton = () => {
    setisShowModal(true);
  };


  return (
    <>
      <Topbar titletext={titletext} />
      <Modal_Machine isShowModal={isShowModal} setisShowModal={setisShowModal}/>
      <div className='managemachinebuttonwrapper'>
        <button onClick={ClickAddButton}>追加</button>
      </div>
      <div className='managemachinetablewrapper'>
        <Manage_Machine_Table />
      </div>
    </>
  )
}
