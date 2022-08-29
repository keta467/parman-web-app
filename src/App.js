import React from "react";
import "./common.css";
import View_File_All from "./pages/view_file_all/View_File_All.jsx";
import Manage_Package from "./pages/manage_package/Manage_Package.jsx";
import Manage_Terminal from "./pages/manage_terminal/Manage_Terminal.jsx";
import View_file_Separate from "./pages/view_file_separate/View_file_Separate.jsx";
import { HashRouter as Router, Route, Routes } from "react-router-dom"; //BrowserRouter HashRouter
import Home from "./pages/home/Home.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home TitleText={"管理画面"} />} />
        <Route
          path="/manage_package"
          element={<Manage_Package TitleText={"パッケージ管理"} />}
        />
        <Route
          path="/manage_machine"
          element={<Manage_Terminal TitleText={"端末管理"} />}
        />
        <Route
          path="/view_file_all"
          element={<View_File_All TitleText={"ファイル全体管理"} />}
        />
        <Route
          path="/view_file_separate"
          element={<View_file_Separate TitleText={"ファイル別管理"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
