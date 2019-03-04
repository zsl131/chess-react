import React from 'react';
import {Pagination, Table} from 'antd';
import ListOperator from '../../../../components/ListOperator/ListOperator';
import QRCode from 'qrcode.react';

const List = ({
  onDelConfirm,
  onUpdate,
  onPageChange,
  totalElement,
  config,
  ...listOpts
}) => {

  const delOpts = {
    okText: '确定删除',
    cancelText: '取消',
    onDelConfirm: onDelConfirm,
    onUpdate: onUpdate,
  }

  const columns = [{
    title: '二维码',
    render: (record) => {
      return (
        <QRCode value={`${config.baseUrl}/api/qr?id=${record.id}`} />
      );
    }
  }, {
    title: '名称',
    dataIndex: 'name'
  }, {
    title: "跳转地址",
    dataIndex: 'url'
  }, {
    title: '状态',
    render:(record) => {
      return (
        record.status==='1'?<span className='blue'>启用</span>:<span className='red'>停用</span>
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
