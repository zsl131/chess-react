import React from 'react';
import {Pagination, Table, Menu, Icon} from 'antd';
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
    title: '点评人',
    // dataIndex: 'contacts'
    render:(record)=> {
      return (
        <div>
        <p>{record.schName}{record.teaName}</p>
        <p>{record.score}分-{record.phone}-{record.contact}</p>
        </div>
      )
    }
  }, {
    title: "状态",
    render:(record)=> {
      return (
        <p>{record.status === '1' ? <span className="blue">显示</span>:<span className="red">隐藏</span>}</p>
      )
    }
  }, {
    title: "评论内容",
    render:(record) => {
      return (
        <div>
          <p>{record.content}</p>
          <p>{record.createTime}</p>
        </div>
      )
    }
  }, {
    title: "回复",
    render:(record)=> {
      return (
        (record.reply!=null && record.reply!='')?<div>
          <p>{record.reply}</p>
          <p>{record.replyTime}</p>
        </div>:<div className="red">未回复</div>
      )
    }
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
