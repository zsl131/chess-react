import React from 'react';
import {Pagination, Table, Tooltip} from 'antd';
import ListOperator from '../../../../components/ListOperator/ListOperator';

const List = ({
  onDelConfirm,
  onUpdate,
  onPageChange,
  totalElement,
  showContent,
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
    title: "录制",
    render: (record)=> {
      const status = record.hasProcess;
      return (
        status==='1'?<span className="blue">已录制</span>:<span className="red">未录制</span>
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
        <Tooltip title="点击查看全部">
        <div onClick={()=>showContent(record)} style={{"maxWidth":"300px", "maxHeight":"80px", "overflow":"hidden", "text-overflow":"ellipsis", "cursor":"pointer"}}>
          <p dangerouslySetInnerHTML={{__html: record.content}}></p>
        </div>
        </Tooltip>
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
