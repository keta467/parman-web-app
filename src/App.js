import Home from './pages/home/Home';
import ViewFileAll from './pages/view_file_all/ViewFileAll';
import ManageReleagePackage from './pages/manage_releasepackage/ManageReleagePackage';
import ManageMachine from './pages/manage_machine/ManageMachine';
import ViewfileSeparate from './pages/view_file_separate/ViewfileSeparate';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home titletext={"管理画面"}/>} />
      </Routes>
      <Routes>
        <Route path="/manage_releasepackage" element={<ManageReleagePackage titletext={"パッケージ情報"} />} />
      </Routes>
      <Routes>
        <Route path="/manage_machine" element={<ManageMachine titletext={"端末管理"} />} />
      </Routes>
      <Routes>
        <Route path="/view_file_all" element={<ViewFileAll titletext={"ファイル全体管理"} />} />
      </Routes>
      <Routes>
        <Route path="/view_file_separate" element={<ViewfileSeparate titletext={"ファイル別管理"} />} />
      </Routes>
    </Router>
  )
}

export default App;
