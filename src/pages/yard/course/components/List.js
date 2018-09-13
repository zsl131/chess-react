import React from 'react';
import {Pagination, Table} from 'antd';
import ListOperator from '../../../../components/ListOperator/ListOperator';

const List = ({
                onDelConfirm,
                onUpdate,
                handleImport,
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
    title: '标题',
    dataIndex: 'title'
  }, {
    title: '适合',
    render:(record) => {
      return(
        <p>
          {record.grade?record.grade+"年级":""}
          {record.term?record.term+"学期":""}
          {record.age?record.age+"岁":''}
        </p>
      );
    }
  }, {
    title: '视频',
    render:(record)=>{return (record.videoId?<span className="blue">已上传</span>:<span className="red">未上传</span>)}
  }, {
    title: 'PPT',
    render:(record)=>{return record.pptId?<span className="blue">已上传</span>:<span className="red">未上传</span>}
  }, {
    title: '学习单',
    render:(record)=>{return record.learnId?<span className="blue">已上传</span>:<span className="red">未上传</span>}
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
