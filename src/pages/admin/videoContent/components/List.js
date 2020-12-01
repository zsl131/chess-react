import React from 'react';
import {Button, Pagination, Popconfirm, Table, Tooltip} from 'antd';
import ListOperator from "../../../../components/ListOperator";

const List = ({
  onDelConfirm,
  onUpdate,
  onPageChange,
  totalElement,updateField,
  ...listOpts
}) => {

  const delOpts = {
    okText: '确定删除',
    cancelText: '取消',
    onDelConfirm: onDelConfirm,
    onUpdate: onUpdate,
  };

  const columns = [{
    title: '标题',
    // dataIndex: 'title'
    render:(record)=> {
      return (
        <div>【{record.cateName}】{record.title}</div>
      )
    }
  }, {
    title: "序号",
    dataIndex: "orderNo"
  }, {
    title: "日期",
    dataIndex: "showDate"
  }, {
    title: "状态",
    render: (record) => {
      return (
        <div>
          {record.status==="1" && <Popconfirm title="是否把状态设置为【不显示】？" onConfirm={()=>updateField({field:"status", value:"0", id:record.id})}><Tooltip title="当前状态为【显示】"><Button type="primary" shape="circle" icon="eye"/></Tooltip></Popconfirm>}
          {record.status==="0" && <Popconfirm title="是否把状态设置为【显示】？" onConfirm={()=>updateField({field:"status", value:"1", id:record.id})}><Tooltip title="当前状态为【不显示】"><Button type="danger" shape="circle" icon="eye"/></Tooltip></Popconfirm>}
        </div>
      )
    }
  }, {
    title: "操作",
    render: (text, record) => {
      return (
        <ListOperator id={record.id} delName={record.name} {...delOpts}/>
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
