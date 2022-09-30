import React from "react";
import Topbar from "../../components/topbar/Topbar.jsx";

//ホーム画面　最初のページ
export default function Home({ TitleText }) {
  return (
    <>
      <Topbar TitleText={TitleText} />
    </>
  );
}
