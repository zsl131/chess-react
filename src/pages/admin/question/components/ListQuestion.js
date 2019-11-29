import React from 'react';
import {Table,Button,Icon,Popconfirm,Radio,Menu,Pagination} from 'antd';
import ListOperator from '../../../../components/ListOperator';

const ListQuestion = ({
  totalElements,
  onDelConfirm,
  onUpdate,
  onPageChange,
  question,
  ...listOpts
}) => {
  const delOpts = {
    okText: '确定删除',
    onDelConfirm: onDelConfirm,
    onUpdate: onUpdate,
  }
  const columns = [{
    title: '题目内容',
    dataIndex: 'content'
  } , {
    title: '题目类型',
    dataIndex: 'type'
  },{
    title: '选项A',
    render:(record) => {
      return (
        <div>
          <span>A.{record.a}</span>
        </div>
      );
    }
  }, {
    title: '选项B',
    render:(record) => {
      return (
        <div>
          <span>B.{record.b}</span>
        </div>
      );
    }
  }, {
    title: '选项C',
    render: (record) => {
      return (
        <div>
          {record.c && <span>C.{record.c}</span>}
        </div>
      );
    }
  }, {
    title: '选项D',
    render: (record) => {
      return(
        <div>
        {record.d && <span>D.{record.d}</span>}
        </div>
      );
    }
  },{
    title:'正确答案',
    dataIndex:'reply'
  },{
    title:'选项',
    render:(record) => {
      return (
        <ListOperator id={record.id} delName={record.reply} {...delOpts}>
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

export default ListQuestion;
