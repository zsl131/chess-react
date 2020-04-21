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
  };

  const columns = [{
    title: '作者',
    // dataIndex:'orderNo'
    render:(record)=> {
      return (
        <div>
          <p>{record.authorName}</p>
          <p>{record.authorUsername}</p>
        </div>
      )
    }
  }, {
    title: '标题',
    // dataIndex: 'name'
    render: (record)=> {
      return (
        <div>
          <p>{record.title}</p>
          <p>{record.guide}</p>
        </div>
      )
    }
  }, {
    title: '内容',
    // dataIndex: 'name'
    render: (record)=> {
      return (
        <div>
          <p dangerouslySetInnerHTML={{__html: record.content}}></p>
        </div>
      )
    }
  }, {
    title: '日期',
    // dataIndex: 'name'
    render: (record)=> {
      return (
        <div>
          <p>修改：{record.updateTime}</p>
          <p>添加：{record.createTime}</p>
        </div>
      )
    }
  }, {
    title: '操作',
    dataIndex: 'id',
    render: (text, record) => {
      return (
        <ListOperator id={record} delName={record.title} {...delOpts}/>
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

export default List;
