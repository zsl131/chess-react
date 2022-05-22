import React from 'react';
import {Pagination, Table, Tooltip} from 'antd';
import ListOperator from '../../../../components/ListOperator/ListOperator';
import styles from "../../appVideo/components/list.css";

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
    title: '图片',
    // dataIndex:'orderNo'
    render:(record)=> {
      return (
        record.imgPath?<a key={record.id} href={record.imgPath} target="_blank" rel="noopener noreferrer"><img className={styles.avatarImg} src={record.imgPath}/></a>:"-"
      )
    }
  }, {
    title: "名称",
    dataIndex: "name"
  }, {
    title: "状态",
    render: (text, record) => {
      return (
        <span className={record.status === 1?styles.status1: styles.status0}>{record.status === '1' ? '启用':'停用'}</span>
      )
    }
  }, {
    title: '操作',
    dataIndex: 'id',
    render: (text, record) => {
      return (
        <ListOperator id={record} delName={record.name} {...delOpts}/>
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
