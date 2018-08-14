import React from 'react';
import {Table} from 'antd';
import ListOperator from '../components/ListOperator';
import {connect} from 'dva';
const List = ({
  loading,
  onDelConfirm,
  onDel,
  scoreRule,
  ...listOpts
})=> {
  const delOpts = {
    okText: '确定删除',
    cancelText: '取消',
    onDelConfirm: onDelConfirm,
  }
  const columns=[{
    title:'积分规则代码',
    dataIndex:'ruleCode',
  },{
    title:'积分规则',
    dataIndex:'scoreRule',
  },
    {
    title:'积分数',
    dataIndex:'addScore'
  },{
    title:'操作',
    render:(text,record)=>{
      return(
        <div>
          <ListOperator id={record.id}record={record} delName={record.scoreRule} {...delOpts}/>
        </div>
      );
    }
  }];
  return (
    <Table {...listOpts} columns={columns}rowKey="id"/>
  );
}
export default connect(({loading,scoreRule})=>({loading,scoreRule}))(List);
