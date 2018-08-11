import React from 'react';
import {Table,Button,Popconfirm} from 'antd';
import {connect} from 'dva';
const List = ({
  loading,
  onDel,
  scoreRule,
  dispatch,
  ...listOpts
})=> {
  const handleDel=(record)=>{
    onDel(record);
  }
  const handleUpdate = (record) => {
    dispatch({type: 'scoreRule/modifyState', payload: {item: record, updateVisible: true}});
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
    render:(record)=>{
      return(
        <div>
          <Button tppe="primary" icon="edit" onClick={()=>handleUpdate(record)}>修改积分规则</Button>
          <Popconfirm Popconfirm title={'是否删除此规则？'} onConfirm={()=>handleDel(record)}>
            <Button type="danger" icon="close">删除积分规则</Button>
          </Popconfirm>
        </div>
      );
    }

  }];
  return (
    <div>
      <Table {...listOpts} columns={columns} rowKey="id"/>
    </div>
  );
}
export default connect(({loading,scoreRule})=>({loading,scoreRule}))(List);
