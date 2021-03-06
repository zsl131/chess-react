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
    title: '序号',
    dataIndex:'orderNo'
  }, {
    title: '名称',
    dataIndex: 'name'
  }, {
    title: "关联体系",
    dataIndex: "sname"
  }, {
    title: "教师标记",
    render: (record) => {
      return (
        record.teacherFlag==='1'?<span className="blue">可供教师选择</span>:<span className="red">教师不可选择</span>
      )
    }
  }, {
    title: '备注',
    dataIndex: 'remark'
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
