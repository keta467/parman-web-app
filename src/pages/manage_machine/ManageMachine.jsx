import React from 'react'
import Manage_Machine_Table from '../../components/tables/manage_machine_table/Manage_Machine_Table';
import ModalAddMachine from '../../components/modals/ModalAddMachine';
import ModalEditMachine from '../../components/modals/ModalEditMachine';
import Topbar from '../../components/topbar/Topbar'
import "./ManageMachine.css";

export default function ManageMachine({ titletext }) {

  const [isShowModal, setIsShowModal] = React.useState(false);

  const [isShowModalEditMachine, setIsShowModalEditMachine] = React.useState({isShowModal:false, machineInfo:{text:"aaa"}});

  const ClickAddButton = () => {
    setIsShowModal(true);
  };


  return (
    <>
      <Topbar titletext={titletext} />
      <ModalAddMachine isShowModal={isShowModal} setIsShowModal={setIsShowModal} />
      <ModalEditMachine isShowModal={isShowModalEditMachine} setIsShowModal={setIsShowModalEditMachine}/>
      <div className='managemachinebuttonwrapper'>
        <button onClick={ClickAddButton}>追加</button>
      </div>
      <div className='managemachinetablewrapper'>
        <Manage_Machine_Table isShowModal={isShowModalEditMachine} setIsShowModal={setIsShowModalEditMachine}/>
      </div>
    </>
  )
}
