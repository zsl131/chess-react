import React from 'react';
import {Table,Button,Icon,Popconfirm,Radio} from 'antd';
import {connect} from 'dva';

const ListQuestion = ({
  loading,
  location,
  question,
  dispatch,
  onDel,
  onButto,
  onButt,
  onBut,
  onBu,
  ...listOpts,
}) => {
  const RadioGroup = Radio.Group;
  const columns = [{
    title: '题目内容',
    dataIndex: 'content'
  }, {
    title:'',
    render:(record) => {
      return (
        <span>
          <RadioGroup name="radiogroup" onChange={() =>handl(record)} defaultValue={0}>
            <Radio value={1} onChange={() =>handl(record)}>A.{record.a}</Radio>
          </RadioGroup>
           <RadioGroup name="radiogroup" onChange={() =>hand(record)} defaultValue={0}>
            <Radio value={1} onChange={() =>handl(record)}>B.{record.b}</Radio>
          </RadioGroup>
           <RadioGroup name="radiogroup" onChange={() =>han(record)} defaultValue={0}>
            <Radio value={1} onChange={() =>handl(record)}>C.{record.c}</Radio>
          </RadioGroup>
           <RadioGroup name="radiogroup" onChange={() =>ha(record)} defaultValue={0}>
            <Radio value={1} onChange={() =>handl(record)}>D.{record.d}</Radio>
          </RadioGroup>
        </span>
      );
    }
  } , {
    title:'答案',
    dataIndex:'reply'
  },{
    title: '结果',
    dataIndex:'state'
  },{
    title:'选项',
    render:(record) => {
      return (
        <span>
         <Button icon="edit" onClick={() => handle(record)} type="primary">修改</Button>
          <Popconfirm title={'是否删除'} onConfirm={() => handleDel(record)}>
            <Button icon="close" type="danger">删除</Button>
          </Popconfirm>
           <Button icon="edit" onClick={() => handler(record)} type="primary">答案</Button>
        </span>
      );
    }
  }];
  const handleDel = (record) => {
    onDel(record);
  }
  const handle = (record) => {
    console.log(record);
    dispatch({type:'question/modifyState',payload:{item:record,updateVisible:true}});
  }
  const handler = (record) => {
    console.log(record);
    dispatch({type:'question/modifyState',payload:{it:record,update:true}});
  }
  const handl = (record) => {
    onButto(record);
  }
  const hand = (record) => {
    onButt(record);
  }
  const han = (record) => {
    onBut(record);
  }
  const ha = (record) => {
    onBu(record);
  }
  return (
    <Table {...listOpts} columns={columns} rowKey="id"/>
  );
}

export default connect(({ListQuestion,loading}) => ({ListQuestion,loading}))(ListQuestion);
