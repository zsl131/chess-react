import React from 'react';
import {Button, Pagination, Table, Tooltip} from 'antd';
import styles from './list.css';
// import "node_modules/video-react/dist/video-react.css"; // import css
import {Player} from "video-react";

const List = ({
  onDelConfirm,
  onUpdate,
  onPageChange,
  totalElement,
  dataSource,
  openReply,
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
  }, {
    title: '点评',
    render: (text, record)=> {
      return (
        record.reply?<div><p>{record.reply}</p><p>{record.replyTime}</p></div>:<p className="red">未点评</p>
      )
    }
  }, {
    title:'操作',
    render: (text, record) => {
      return (
        <Tooltip title="点击点评">
          <Button type="primary" shape="circle" icon="message" onClick={()=>openReply(record)}/>
        </Tooltip>
      )
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
