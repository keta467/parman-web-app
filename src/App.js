
import React from "react";
import "./common.css";
import ViewFileAll from './pages/view_file_all/ViewFileAll.jsx';
import ManagePackage from './pages/manage_package/ManagePackage.jsx';
import ManageMachine from './pages/manage_machine/ManageMachine.jsx';
import ViewfileSeparate from './pages/view_file_separate/ViewfileSeparate.jsx';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './pages/home/Home.jsx';


function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Home titletext={"管理画面"}/>} />
    //   </Routes>
    //   <Routes>
    //     <Route path="/manage_package" element={<ManagePackage titletext={"パッケージ情報"} />} />
    //   </Routes>
    //   <Routes>
    //     <Route path="/manage_machine" element={<ManageMachine titletext={"端末管理"} />} />
    //   </Routes>
    //   <Routes>
    //     <Route path="/view_file_all" element={<ViewFileAll titletext={"ファイル全体管理"} />} />
    //   </Routes>
    //   <Routes>
    //     <Route path="/view_file_separate" element={<ViewfileSeparate titletext={"ファイル別管理"} />} />
    //   </Routes>
    // </Router>

    <Router>
      <Routes>
        <Route path="/" element={<Home titletext={"管理画面"}/>} />
        <Route path="/manage_package" element={<ManagePackage titletext={"パッケージ情報"} />} />
        <Route path="/manage_machine" element={<ManageMachine titletext={"端末管理"} />} />
        <Route path="/view_file_all" element={<ViewFileAll titletext={"ファイル全体管理"} />} />
        <Route path="/view_file_separate" element={<ViewfileSeparate titletext={"ファイル別管理"} />} />
      </Routes>
   </Router>
  )
}

export default App;
