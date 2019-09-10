import React from 'react';
import {Pagination, Table} from 'antd';
import QRCode from 'qrcode.react';
import ListOperator from '../../../../components/ListOperator/ListOperator';
import configApi from "../../../../utils/configApi";

const ListRecord = ({
  onDelConfirm,
  onUpdate,
  onPageChange,
  totalElement,
  ...listOpts
}) => {

  const delOpts = {
    okText: '确定删除',
    onDelConfirm: onDelConfirm,
    onUpdate: onUpdate,
  }

  const columns = [{
    title: '二维码',
    render: (record) => {
      return (
        <div><QRCode value={`${configApi.baseUrl}/wx/activityRecord/signUp?recordId=${record.id}`} />
          <p>ID: {record.id}</p>
        </div>
      );
    }
  }, {
    title: '活动时间',
    dataIndex: 'holdTime'
  }, {
    title: '活动地址',
    dataIndex: 'address'
  }, {
    title: '联系电话',
    dataIndex: 'phone'
  }, {
    title: '家庭数',
    render:(record) => {
      return (<div><span title="申请参与家庭数">{record.applyCount}</span>/<span title="最多可参与家庭数">{record.maxCount}</span></div>);
    }
  }, {
    title: '报名时间',
    render: (record) => {
      return (<span>{record.startTime} ~ {record.deadline}</span>)
    }
  }, {
    title: '状态',
    render: (record)=> {
      return (<div>{(record.status === '0' || record.status === '1')?<span className="blue">报名中</span>:<span className="red">停止报名</span>}</div>);
    }
  }, {
    title: '操作',
    render: (text, record) => {
      return (
        <ListOperator key={record.id} id={record.id} delName={record.holdTime} {...delOpts}/>
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

export default ListRecord;
