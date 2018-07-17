import React from 'react';
import { Table } from 'antd';

const List = ({
  dataSource
}) => {

  const columns = [{
    title: '菜单名称',
    dataIndex: 'name'
  }, {
    title: 'SN',
    dataIndex: 'sn'
  }, {
    title: '连接地址',
    dataIndex: 'href'
  }, {
    title: '操作',
    render: (text, record) => {
      return (
        <div>{record.name}</div>
      );
    }
  }];

  return (
    <Table dataSource={dataSource} columns={columns} rowKey="id"></Table>
  );
}

export default List;
