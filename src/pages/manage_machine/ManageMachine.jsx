import React from "react";
import Manage_Machine_Table from "../../components/tables/manage_machine_table/Manage_Machine_Table.jsx";
import ModalAddMachine from "../../components/modals/ModalAddMachine.jsx";
import ModalEditMachine from "../../components/modals/ModalEditMachine.jsx";
import Topbar from "../../components/topbar/Topbar.jsx";
import "./ManageMachine.css";
import { GET_TERMINALS } from "../../api.js";

export default function ManageMachine({ titletext }) {
  const TERMINAL_LIST = GET_TERMINALS().TERMINAL_LIST;

  const [isShowModalAddMachine, setIsShowModalAddMachine] =
    React.useState(false);

  const [isEditMachineForModal, setIsEditMachineForModal] = React.useState({
    isShowModal: false,
    machineInfo: { text: "inidata" },
  });

  const ClickAdd = () => {
    setIsShowModalAddMachine(true);
  };

  return (
    <>
      <Topbar titletext={titletext} />
      <ModalAddMachine
        isShowModal={isShowModalAddMachine}
        setIsShowModal={setIsShowModalAddMachine}
      />
      <ModalEditMachine
        MachineData={isEditMachineForModal}
        setIsShowModal={setIsEditMachineForModal}
      />
      <div className="managemachinebuttonwrapper">
        <button className="mybutton" onClick={ClickAdd}>
          追加
        </button>
      </div>
      <div className="managemachinetablewrapper">
        <Manage_Machine_Table
          tableData={TERMINAL_LIST}
          setIsShowModal={setIsEditMachineForModal}
        />
      </div>
    </>
  );
}
