import React from 'react';
import { Table, Pagination } from 'antd';
import ListOperator from '../../../../components/ListOperator/ListOperator';
// import { ListOperator } from 'components';
import styles from './list.css';
import queryString from 'query-string'

const List = ({
  onDelConfirm,
  onUpdate,
  onPageChange,
  location,
  totalElement,
  ...listOpts
}) => {

  location.query = queryString.parse(location.search)
  // console.log("List", location.query);

  // console.log("user->list", listOpts);

  const delOpts = {
    okText: '确定删除',
    cancelText: '取消',
    onDelConfirm: onDelConfirm,
    onUpdate: onUpdate,
  }

  const columns = [{
    title: '名称',
    dataIndex: 'name'
  }, {
    title: 'SN',
    dataIndex: 'sn'
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
