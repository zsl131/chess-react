import React from 'react';
import {Table,Button,Icon,Popconfirm,Radio,Menu,Pagination} from 'antd';
import ListOperator from '../../../../components/ListOperator';

const ListQuestion = ({
  totalElements,
  onDelConfirm,
  onButto,
  onButt,
  onBut,
  onBu,
  onUpdate,
  onAdd,
  onPageChange,
  ...listOpts,
}) => {
  const RadioGroup = Radio.Group;
  const delOpts = {
    okText: '确定删除',
    onDelConfirm: onDelConfirm,
    onUpdate: onUpdate,
  }
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
        <ListOperator id={record.id} delName={record.reply} {...delOpts}>
          <Menu.Item>
            <span onClick={() => handler(record)}><Icon type="rocket" />答案</span>
          </Menu.Item>
        </ListOperator>
      );
    }
  }];
  const handler = (record) => {
    onAdd(record);
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
  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  }

  const pager = () => {
    return (
      <Pagination showQuickJumper defaultPageSize={15} total={totalElements} onChange={handlePageChange}/>
    );
  }
  return (
    <Table {...listOpts} columns={columns} rowKey="id" pagination={false} footer={pager}/>
  );
}

export default ListQuestion;
