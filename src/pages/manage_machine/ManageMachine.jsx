import React from 'react'
import Topbar from '../../components/topbar/Topbar'
import "./ManageMachine.css";

export default function ManageMachine({ titletext }) {
  return (
    <>
      <Topbar titletext={titletext} />
      <div className='managemachinebuttonwrapper'>
        <button>追加</button>
      </div>
      <div className='managemachinetablewrapper'>
        <table>
          <thead>
            <tr>
              <th>端末名称</th>
              <th>端末名</th>
              <th>IPアドレス</th>
            </tr>
          </thead>
          <tbody>
            <tr draggable="true">
              <td>1サブT1T2</td>
              <td>inp1</td>
              <td>192.168.2.2</td>
            </tr>
            <tr draggable="true">
              <td>1サブT1T2</td>
              <td>inp1</td>
              <td>192.168.2.2</td>
            </tr>
            <tr draggable="true">
              <td>1サブT1T2</td>
              <td>inp1</td>
              <td>192.168.2.2</td>
            </tr>
            <tr draggable="true">
              <td>1サブT1T2</td>
              <td>inp1</td>
              <td>192.168.2.2</td>
            </tr>
            <tr draggable="true">
              <td>1サブT1T2</td>
              <td>inp1</td>
              <td>192.168.2.2</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
