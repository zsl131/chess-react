import React from 'react';
import {Button, Pagination, Table} from 'antd';

const List = ({
  onInvalid,
  onPageChange,
  totalElement,
  ...listOpts
}) => {

  const onClick = (record) => {
    onInvalid(record);
  }

  const columns = [{
    title: '日期',
    // dataIndex:'orderNo'
    render:(record)=>{
      return (
        <div>
          <p>报账：{record.recordDate}</p>
          <p>录入：{record.createDate}</p>
        </div>
      )
    }
  }, {
    title: '摘要',
    // dataIndex: 'title'
    render:(record)=>{
      return (
        <div>
          <p>[{record.cateName}]{record.title}</p>
          <p>{record.remark}</p>
        </div>
      )
    }
  }, {
    title: "金额",
    render:(record)=> {
      return (
        <div>
          <p>{record.flag=='1'?<b className="blue">+{record.amount}</b>:<b className="red">-{record.amount}</b>}</p>
          <p>据号：{record.ticketNo}</p>
        </div>
      )
    }
  }, {
    title: "人员",
    render:(record)=> {
      return (
        <div>
          <p>经办人：{record.operator}</p>
          <p>记账人：{record.recordName}</p>
        </div>
      )
    }
  }, {
    title: "状态",
    render:(record)=> {
      return(
        record.status=='1' ? <div><p className="blue">有效</p><Button type="danger" size="small" onClick={()=>onClick(record)}>作废</Button></div>:<span className="red">{record.invalidName}:{record.invalidReason}</span>
      )
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
