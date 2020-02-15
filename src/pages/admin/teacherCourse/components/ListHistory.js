import React from 'react';
import {Button, Pagination, Table, Tooltip} from 'antd';

const ListHistory = ({
  onDelConfirm,
  onUpdate,
  onMatchUser,
  onPageChange,
  location,
 showCourse,
  totalElement,
  ...listOpts
}) => {
  const columns = [{
    title: '标题',
    // dataIndex: 'id'
    render:(record)=> {
      return (
        <div>
          <p>{record.grade}{record.term}</p>
          <p>{record.title}</p>
        </div>
      )
    }
  }, {
    title: '访问时间',
    dataIndex: 'lastTime'
  }, {
    title: '操作',
    dataIndex: 'id',
    render: (text, record) => {
      return (
        <Tooltip title="点击查阅"><Button type="primary" shape="circle" icon="eye" onClick={()=>showCourse(record.courseId)}/></Tooltip>
      );
    }
  }];

  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const pager = () => {
    return (
      <Pagination showQuickJumper defaultPageSize={15} total={totalElement} onChange={handlePageChange}/>
    );
  };

  return (
    <Table {...listOpts} columns={columns} rowKey="id" pagination={false} footer={pager}/>
  );
};

export default ListHistory;
