import React from 'react';
import {Table} from 'antd';
import {connect} from 'dva';
const List=({
  loading,
  selectLesson,
  ...listOpts
})=>{
  const columns=[{
    title:'课程名称',
    dataIndex:'lesson',
  },{
    title:'开课日期',
    dataIndex:'createDate'
  },{
    title:'开课时间',
    dataIndex:'createTime',
  },{
    title:'状态',
    dataIndex:'status'
  },{
    title:'操作'
  }];
  return(
    <Table{...listOpts} columns={columns} rowKey="id"/>
  );
}
export default connect(({loading,selectLesson})=>({loading,selectLesson}))(List);
