import React from "react";
import Manage_Machine_Table from "../../components/tables/manage_machine_table/Manage_Machine_Table.jsx";
import ModalAddMachine from "../../components/modals/ModalAddMachine.jsx";
import ModalEditMachine from "../../components/modals/ModalEditMachine.jsx";
import Topbar from "../../components/topbar/Topbar.jsx";
import "./ManageMachine.css";
import { GET_PACKAGE_TARGET_TERMINAL } from "../../DummyDatas/GET_PACKAGE_TARGET_TERMINAL.js";
import { DebugModeContext } from "../../components/providers/DebugModeProvider.jsx";
import { GET_TERMINALS } from "../../DummyDatas/GET_TERMINALS.js";

export default function ManageMachine({ titletext }) {
  const [isShowModalAddMachine, setIsShowModalAddMachine] =
    React.useState(false);

  const [isEditMachineForModal, setIsEditMachineForModal] = React.useState({
    isShowModal: false,
    machineInfo: { text: "DDD" },
  });

  const { isDebugMode } = React.useContext(DebugModeContext);

  function createTableData() {
    if (isDebugMode) {
      return GET_TERMINALS.TERMINAL_LIST;
    } else {
      return [];
    }
  }

  const ClickAddButton = () => {
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
        <button className="mybutton" onClick={ClickAddButton}>
          追加
        </button>
      </div>
      <div className="managemachinetablewrapper">
        <Manage_Machine_Table
          tableData={createTableData()}
          setIsShowModal={setIsEditMachineForModal}
        />
      </div>
    </>
  );
}
