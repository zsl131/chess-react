import React from 'react';
import {Pagination, Table} from 'antd';
import ListOperator from '../../../../components/ListOperator/ListOperator';

const List = ({
  onDelConfirm,
  onUpdate,
  onPageChange,
  totalElement,
  ...listOpts
}) => {

  const delOpts = {
    okText: '确定删除',
    cancelText: '取消',
    onDelConfirm: onDelConfirm,
    onUpdate: onUpdate,
  }

  const columns = [{
    title: '头像',
    render: (text, record) => {
      return (
        <span>
        {
          record.avatarUrl ? <a href={record.avatarUrl} target="_blank" rel="noopener noreferrer"><img src={record.avatarUrl} alt={record.nickname} className="avatarImg"/></a>:"-"
        }
        </span>
      )
    }
  }, {
    title: '姓名',
    dataIndex: 'name'
  }, {
    title: "性别",
    render:(record)=> {
      return (
        <div>{record.sex === '1' ? "男":"女"}</div>
      )
    }
  }, {
    title: '年龄',
    dataIndex: "ageName"
  }, {
    title: "学校",
    dataIndex: "schoolName"
  }, {
    title: "联系电话",
    dataIndex: "phone",
  }, {
    title: '操作',
    render: (text, record) => {
      return (
        <ListOperator id={record.id} delName={record.name} {...delOpts}/>
      );
    }
  }];

  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  }

  const pager = () => {
    return (
      <Pagination showQuickJumper defaultPageSize={15} total={totalElement} onChange={handlePageChange}/>
    );
  }

  return (
    <Table {...listOpts} columns={columns} rowKey="id" pagination={false} footer={pager}/>
  );
}

export default List;
