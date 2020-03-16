import React from 'react';
import {Pagination, Table} from 'antd';
import ListOperator from '../../../../components/ListOperator/ListOperator';
import styles from './list.css';
import {Player} from "video-react";

const List = ({
  onDelConfirm,
  onUpdate,
  onPageChange,
  totalElement,
  dataSource,
  ...listOpts
}) => {
 // console.log(dataSource)

  const delOpts = {
    okText: '确定删除',
    cancelText: '取消',
    onDelConfirm: onDelConfirm,
    onUpdate: onUpdate,
  };

  const columns = [{
    title: '影像',
    dataIndex:'id',
    render: (text, record)=> {
      const type = record.fileType;
      return (
        type==='1'?<div className={styles.singleDiv}><img className={styles.image} src={record.url}/></div>:
          <div className={styles.singleDiv}>
            <Player autoPlay={false} ref="player" videoId="myVideo">
              <source src={record.url}/>
            </Player>
          </div>
      )
    }
  }, {
    title: '归属',
    render: (text, record) => {
      return (
        <div>
          <p>{record.courseTitle}</p>
          <p>{record.schName}-{record.teaName}[{record.teaPhone}]</p>
          <p>{record.createTime}</p>
        </div>
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

  const tableData = {
    dataSource: dataSource,
    ...listOpts
  };

  return (
    <div>
    <Table {...tableData} columns={columns} rowKey="id" pagination={false} footer={pager}/>
    </div>
  );
};

export default List;
