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
    title: '学校名称',
    dataIndex: 'name'
  }, {
    title: '联系人',
    dataIndex: 'contacts'
  }, {
    title: '联系电话',
    dataIndex: 'phone'
  }, {
    title: '学校地址',
    dataIndex: 'address'
  }, {
    title: "状态",
    render:(record)=> {
      return (
        <div>{record.status === '1' ? "在合作":"未使用"}</div>
      )
    }
  }, {
    title: "备注",
    dataIndex: "remark",
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
