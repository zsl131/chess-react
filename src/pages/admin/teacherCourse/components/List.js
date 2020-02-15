import React from 'react';
import {Menu, Pagination, Table, Icon} from 'antd';
import ListOperator from '../../../../components/ListOperator/ListOperator';
// import { ListOperator } from 'components';

const List = ({
  onDelConfirm,
  onUpdate,
  onMatchUser,
  onPageChange,
  location,
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
    title: 'ID',
    dataIndex: 'id'
  }, {
    title: '名称',
    dataIndex: 'name'
  }, {
    title: '操作',
    render: (text, record) => {
      return (
        <ListOperator id={record.id} delName={record.name} {...delOpts}>
          <Menu.Item>
            <span onClick={()=>handleMatchUser(record)}><Icon type="user"/> 配置管理用户</span>
          </Menu.Item>
        </ListOperator>
      );
    }
  }];

  const handleMatchUser = (record) => {
    onMatchUser(record);
  }

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
