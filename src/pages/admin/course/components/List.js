import React from 'react';
import {Table,Pagination} from 'antd';
import ListOperator from "../../../../components/ListOperator";


const List = ({
  totalElements,
  onUpdate,
  onDelConfirm,
  onPageChange,
  ...listOpts
}) => {
  const delOpts = {
    onText:"确定删除",
    onDelConfirm:onDelConfirm,
    onUpdate:onUpdate,
  }
  const columns = [{
    title: '课程类型',
    dataIndex: 'category'
  }, {
    title: '选项A',
    dataIndex: 'a'
  }, {
    title: '选项B',
    dataIndex: 'b'
  }, {
    title: '选项C',
    dataIndex: 'c'
  },{
    title:'选项D',
    dataIndex:'d'
  },{
    title:'选项',
    render:(record) => {
      return(
        <ListOperator id={record.id} delName={record.options} {...delOpts}>
        </ListOperator>
      );
    }
  }];
  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  }
  const page = () => {
    return(
      <Pagination showQuickJumper defaultPageSize={15} total={totalElements} onChange={handlePageChange}/>
    );
  }
  return(
    <Table {...listOpts} columns={columns} rowKey="id" pagination={false} footer={page}/>
  );
}
export default List;
