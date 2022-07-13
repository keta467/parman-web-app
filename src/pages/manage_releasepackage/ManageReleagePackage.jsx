import React from 'react';
import Topbar from '../../components/topbar/Topbar';
import "./ManageReleagePackage.css";

export default function ManageReleagePackage({ titletext }) {
  return (
    <>
      <Topbar titletext={titletext} />
      <div className='managereleagepackagewrapper'>
        <div className='managereleagepackagelist'>
          <ul>
            <li>クライアントリリース#1_20220101</li>
            <li>クライアントリリース#2_20220101</li>
            <li>クライアントリリース#3_20220101</li>
            <li>クライアントリリース#4_20220101</li>
            <li>クライアントリリース#5_20220101</li>
          </ul>
        </div>
        <div className='managereleagepackagetreeview'>
          treeview
        </div>
        <div className='managereleagepackagesearchview'>
          <div className='searcharea'>
            <input type="text" name="" id="" />
            <button style={{"margin-left":"5px"}}>検索</button>
          </div>

          <div className='managereleagepackagesearchviewtable'>
            <table>
              <thead>
                <tr>
                  <th><input type="checkbox" name="" id="" /></th>
                  <th>端末名称</th>
                  <th>端末名</th>
                  <th>IPアドレス</th>
                  <th>リリース日時</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>済</td>
                  <td>1サブT1T2</td>
                  <td>inp1</td>
                  <td>192.168.1.1</td>
                  <td>2022年8月9日</td>
                </tr>
                <tr>
                  <td><input type="checkbox" name="" id="" /></td>
                  <td>1サブT1T2</td>
                  <td>inp1</td>
                  <td>192.168.1.1</td>
                  <td>2022年8月9日</td>
                </tr>
                <tr>
                  <td>済</td>
                  <td>1サブT1T2</td>
                  <td>inp1</td>
                  <td>192.168.1.1</td>
                  <td>2022年8月9日</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
