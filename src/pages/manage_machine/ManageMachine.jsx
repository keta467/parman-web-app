import React from "react";
import Manage_Machine_Table from "../../components/tables/manage_machine_table/Manage_Machine_Table.jsx";
import ModalAddMachine from "../../components/modals/ModalAddMachine.jsx";
import ModalEditMachine from "../../components/modals/ModalEditMachine.jsx";
import Topbar from "../../components/topbar/Topbar.jsx";
import "./ManageMachine.css";

export default function ManageMachine({ titletext }) {
  const [isShowModal, setIsShowModal] = React.useState(false);

  const [isShowModalEditMachine, setIsShowModalEditMachine] = React.useState({
    isShowModal: false,
    machineInfo: { text: "aaa" },
  });

  const ClickAddButton = () => {
    setIsShowModal(true);
  };

  function createTableData() {
    return [
      { pcname: "inp0", nickname: "1サブT1T0", ip: "192.168.2.0" },
      { pcname: "inp1", nickname: "1サブT1T1", ip: "192.168.2.1" },
      { pcname: "inp2", nickname: "1サブT1T2", ip: "192.168.2.2" },
      { pcname: "inp3", nickname: "1サブT1T3", ip: "192.168.2.3" },
      { pcname: "inp4", nickname: "1サブT1T4", ip: "192.168.2.4" },
      { pcname: "inp5", nickname: "1サブT1T5", ip: "192.168.2.5" },
      { pcname: "inp6", nickname: "1サブT1T6", ip: "192.168.2.6" },
      { pcname: "inp7", nickname: "1サブT1T7", ip: "192.168.2.7" },
      { pcname: "inp8", nickname: "1サブT1T8", ip: "192.168.2.8" },
      { pcname: "inp9", nickname: "1サブT1T9", ip: "192.168.2.9" },
      { pcname: "inp10", nickname: "1サブT1T10", ip: "192.168.2.10" },
      { pcname: "inp11", nickname: "1サブT1T11", ip: "192.168.2.11" },
    ];
  }

  return (
    <>
      <Topbar titletext={titletext} />
      {/* <Tab /> */}
      <ModalAddMachine
        isShowModal={isShowModal}
        setIsShowModal={setIsShowModal}
      />
      <ModalEditMachine
        isShowModal={isShowModalEditMachine}
        setIsShowModal={setIsShowModalEditMachine}
      />
      <div className="managemachinebuttonwrapper">
        <button onClick={ClickAddButton}>追加</button>
      </div>
      <div className="managemachinetablewrapper">
        <Manage_Machine_Table
          tableData={createTableData()}
          isShowModal={isShowModalEditMachine}
          setIsShowModal={setIsShowModalEditMachine}
        />
      </div>
    </>
  );
}
