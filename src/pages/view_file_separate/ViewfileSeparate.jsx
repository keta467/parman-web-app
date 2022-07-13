import React from 'react'
import FileSeparateList from '../../components/file_separate_list/FileSeparateList';
import FileSeparateTable from '../../components/file_separate_table/FileSeparateTable';
import { SelectModuleNameProvider } from '../../components/providers/SelectModuleNameProvider';
import Topbar from '../../components/topbar/Topbar'
import "./ViewfileSeparate.css";

export default function ViewfileSeparate({ titletext }) {

  return (
    <>
      <Topbar titletext={titletext} />
      <SelectModuleNameProvider>
        <div className='viewfileseparatewrapper'>
          <FileSeparateList />
          <FileSeparateTable />
        </div>
      </SelectModuleNameProvider>
    </>
  )
}
