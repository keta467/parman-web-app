import React from "react";
import Manage_Terminal_Table from "../../components/tables/manage_terminal_table/Manage_Terminal_Table.jsx";
import Modal_Add_Terminal from "../../components/modals/Modal_Add_Terminal.jsx";
import Modal_Edit_Terminal from "../../components/modals/Modal_Edit_Terminal.jsx";
import Topbar from "../../components/topbar/Topbar.jsx";
import "./Manage_Terminal.css";

export default React.memo(function Manage_Terminal({ TitleText }) {
  //追加モーダル
  const [isShowModalAddTerminal, setIsShowModalAddTerminal] =
    React.useState(false);

  //編集モーダル
  const [isShowModalEditTerminal, setIsShowModalEditTerminal] =
    React.useState(false);

  //編集端末
  const [isSelectTerminal, setIsSelectTerminal] = React.useState();

  //追加ボタン
  const ClickAdd = () => {
    setIsShowModalAddTerminal(true);
  };

  //ここにクリエイトテーブルが理想ではある

  return (
    <>
      <Topbar TitleText={TitleText} />
      <Modal_Add_Terminal
        isShowModal={isShowModalAddTerminal}
        setIsShowModal={setIsShowModalAddTerminal}
      />
      <Modal_Edit_Terminal
        isShowModal={isShowModalEditTerminal}
        setIsShowModal={setIsShowModalEditTerminal}
        SelectTerminal={isSelectTerminal}
      />
      <div className="managemachinebuttonwrapper">
        <button className="mybutton" onClick={ClickAdd}>
          追加
        </button>
      </div>
      <div className="managemachinetablewrapper">
        <Manage_Terminal_Table
          setIsShowModalEditTerminal={setIsShowModalEditTerminal}
          setIsSelectTerminal={setIsSelectTerminal}
          isShowModalAddTerminal={isShowModalAddTerminal}
        />
      </div>
    </>
  );
});
