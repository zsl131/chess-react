import React from 'react';
import {Pagination, Table} from 'antd';
import ListOperator from "../../../../components/ListOperator";
import styles from "../../notice/components/list.css";

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
  };

  const columns = [{
    title: '图片',
    render: (text, record) => {
      return (
        <a key={record.id} href={record.picPath} target="_blank" rel="noopener noreferrer"><img src={record.picPath} alt={record.title} className={styles.avatarImg}/></a>
      )
    }
  }, {
    title: '名称',
    dataIndex: 'name'
  }, {
    title: "序号",
    dataIndex: "orderNo"
  }, {
    title: "备注",
    dataIndex: "remark"
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
