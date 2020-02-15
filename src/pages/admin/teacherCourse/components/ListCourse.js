import React from 'react';
import {Menu, Pagination, Table, Icon, Button, Tooltip} from 'antd';
import ListOperator from '../../../../components/ListOperator/ListOperator';
import styles from "./list.css";
// import { ListOperator } from 'components';

const ListCourse = ({
  onDelConfirm,
  onUpdate,
  onMatchUser,
  onPageChange,
  location,
  showCourse,
  totalElement,
  ...listOpts
}) => {

  console.log(listOpts);

  const delOpts = {
    okText: '确定删除',
    cancelText: '取消',
    onDelConfirm: onDelConfirm,
    onUpdate: onUpdate,
  };

  const columns = [{
    title: '封面',
    render: (text, record) => {
      return (
        <a key={record.id} href={record.imgUrl} target="_blank" rel="noopener noreferrer"><img src={record.imgUrl} alt={record.title} className={styles.avatarImg}/></a>
      )
    }
  }, {
    title: '标题',
    // dataIndex: 'id'
    render:(record)=> {
      return (
        <div>
          <p>{record.grade}{record.term}</p>
          <p>{record.title}</p>
        </div>
      )
    }
  }, {
    title: '操作',
    dataIndex: 'id',
    render: (text, record) => {
      return (
        <Tooltip title="点击查阅"><Button type="primary" shape="circle" icon="eye" onClick={()=>showCourse(record.id)}/></Tooltip>
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

export default ListCourse;
