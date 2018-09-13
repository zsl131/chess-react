import React from 'react';
import {Table,Pagination} from 'antd';
import ListOperator from '../../../../components/ListOperator';

const List = ({
  totalElements,
  onDelConfirm,
  onUpdate,
  onPageChange,
  ...listOpts,
}) => {
  const delOpts={
    onText:'确定删除',
    onDelConfirm:onDelConfirm,
    onUpdate:onUpdate,
  };
  const columns = [{
    title: '姓名',
    dataIndex: 'name',
  }, {
    title: '性别',
    dataIndex: 'sex',
  }, {
    title: '单位名称',
    dataIndex: 'depName',
  }, {
    title: '职务',
    dataIndex: 'duty',
  }, {
    title: '联系电话',
    dataIndex: 'phone',
  }, {
    title: '备注',
    dataIndex: 'remark',
  },{
    title:'操作',
    render:(record) =>{
      return (
      <ListOperator delName={record.name} {...delOpts} id={record.id}>
      </ListOperator>
      );
    }
  }];
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

export default List;
