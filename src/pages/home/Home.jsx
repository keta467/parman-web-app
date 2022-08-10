import React from "react";
import Topbar from "../../components/topbar/Topbar.jsx";
// import Topbar from '../../components/topbar/Topbar'

export default function Home({ titletext }) {
  return (
    <>
      <Topbar titletext={titletext} />
    </>
  );
}
