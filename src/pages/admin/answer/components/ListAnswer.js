import React from 'react';
import {Table,Button,Icon,Popconfirm} from 'antd';
import {connect} from 'dva';

const ListAnswer = ({
  loading,
  answer,
  dispatch,
  location,
  onDel,
  ...listOpts,
}) => {
  const columns = [{
    title: '题目',
    dataIndex: 'questionContent'
  }, {
    title: '正确答案',
    dataIndex: 'options'
  }, {
    title: '学生答案',
    dataIndex: 'reply'
  }, {
    title:'操作',
    render:(record) => {
      return(
        <div>
          <Button type="primary" onClick={() =>handle(record)}>修改</Button>
          <Popconfirm title={'是否删除'} onConfirm={() => handleDel(record)}>
            <Button icon="close" type="danger">删除</Button>
          </Popconfirm>
        </div>
      );
  }
  }];
  const handleDel=(record) => {
    onDel(record);
  }
  const handle=(record) => {
    console.log(record);
    dispatch({type:"answer/modifyState",payload:{item:record,updateVisible:true}});
  }
  return <Table {...listOpts} columns={columns} rowKey="id"/>
}
export default connect(({ListAnswer,loading}) =>({ListAnswer,loading}))(ListAnswer);
