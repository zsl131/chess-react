import React from 'react';
import {Pagination,Table,Button,Icon,Popconfirm,Menu} from 'antd';
import ListOperator from '../../../../components/ListOperator';

const ListAnswer = ({
  totalElement,
  onPageChange,
  onDelConfirm,
  onUpdate,
  ...listOpts,
}) => {
  const delOpts = {
    okText: '确定删除',
    onDelConfirm: onDelConfirm,
    onUpdate: onUpdate,
  }
  const columns = [{
    title: '题目',
    dataIndex: 'questionContent'
  }, {
    title: '正确答案',
    dataIndex: 'options'
  }, {
    title: '学生答案',
    dataIndex: 'reply'
  }, {
    title:'操作',
    render:(text,record) => {
      return(
        <ListOperator id={record.id} delName={record.reply} {...delOpts}/>
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
  return <Table {...listOpts} columns={columns} rowKey="id" pagination={false} footer={pager}/>
}
export default ListAnswer;
