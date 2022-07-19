import React from 'react'
import "./FileSeparateTable.css"

export default function FileSeparateTable({selectmodulename}) {
  
  return (
    <div className='fileseparatetablewrap'>
      {selectmodulename}
      <table className='colortable'>
        <thead>
          <tr>
            <th>端末名</th>
            <th>端末名称</th>
            <th>IPアドレス</th>
            <th>製品バージョン</th>
            <th>リリース日時</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>inp1</td>
            <td>1サブT1T2</td>
            <td>192.168.2.2</td>
            <td>Y.Y.Y.Y</td>
            <td>8月8日</td>
          </tr>
          <tr>
            <td>inp1</td>
            <td>1サブT1T2</td>
            <td>192.168.2.2</td>
            <td>Y.Y.Y.Y</td>
            <td>8月8日</td>
          </tr>
          <tr>
            <td>inp1</td>
            <td>1サブT1T2</td>
            <td>192.168.2.2</td>
            <td>Y.Y.Y.Y</td>
            <td>8月8日</td>
          </tr>
          <tr>
            <td>inp1</td>
            <td>1サブT1T2</td>
            <td>192.168.2.2</td>
            <td>Y.Y.Y.Y</td>
            <td>8月8日</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
