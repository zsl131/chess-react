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
    title: '所在学校',
    dataIndex: 'schoolName'
  }, {
    title: '姓名',
    render:(record) => {
      return (
        <p>{record.name}[{record.sex === '1'?'男':'女'}]</p>
      )
    }
  }, {
    title: '联系方式',
    render:(record) => {
      return (
        <div>
          <p>{record.phone}[{record.hasBind === '0'?<span className="red">未绑定</span>:<span className="blue">已绑定</span>}]</p>
          <p>{record.identity}</p>
        </div>
      )
    }
  }, {
    title: "备注",
    dataIndex: "remark",
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
