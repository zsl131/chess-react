import React from 'react';
import {Pagination, Table} from 'antd';
import ListOperator from '../../../../components/ListOperator/ListOperator';
import styles from "./list.css";

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
    title: '图片',
    render: (record) => {
      return (
        <a href={record.url} target="_blank" rel="noopener noreferrer"><img src={record.url} alt={record.name} className={styles.avatarImg}/></a>
      );
    }
  }, {
    title: '名称',
    dataIndex: 'name'
  }, {
    title: "序号",
    dataIndex: 'orderNo'
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
