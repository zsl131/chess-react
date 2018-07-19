import React from 'react';
import {Menu, Pagination, Table, Icon} from 'antd';
import ListOperator from '../../../../components/ListOperator/ListOperator';
// import { ListOperator } from 'components';
import queryString from 'query-string'
import styles from './list.css';

const List = ({
  onDelConfirm,
  onUpdate,
  onPageChange,
  location,
  onShow,
  totalElement,
  ...listOpts
}) => {

  location.query = queryString.parse(location.search)

  const delOpts = {
    okText: '确定删除',
    cancelText: '取消',
    onDelConfirm: onDelConfirm,
    onUpdate: onUpdate,
  }

  const columns = [{
    title: '标题',
    // dataIndex: 'title'
    render: (text, record) => {
      return (<a href="javascript:;" onClick={()=>{onShow(record.id)}}>{record.title}</a>);
    }
  }, {
    title: '所属部门',
    dataIndex: 'depName',
  }, {
    title: '状态',
    render: (text, record) => {
      return (record.status === '1'?<span className={styles.show}>显示</span>:<span className={styles.hidden}>隐藏</span>)
    }
  }, {
    title: '创建时间',
    dataIndex: 'createTime'
  }, {
    title: '操作',
    render: (text, record) => {
      return (
        <ListOperator id={record.id} delName={record.title} {...delOpts}/>
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
