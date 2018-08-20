import React from 'react';
import {Card, Button} from 'antd-mobile';
import SignBtn from "./SignBtn";

const SingleRecord = ({
  dataSource,
  onCheck,
  loading
}) => {
  const obj = dataSource;

  return (
    <div>
      <Card>
        <Card.Header title={obj.stuName}/>
        <Card.Body>
          <p>活动名称：{obj.actTitle}</p>
          <p>开展时间：{obj.holdTime}</p>
          <p>当前状态：{obj.status === '0'?<span className="green">未审核</span>:(obj.status==='1'?<span className="blue">申请通过</span>:<span className="red">被驳回[{obj.rejectReason}]</span>)}</p>
        </Card.Body>
        <Card.Footer extra={<SignBtn item={obj} onClick={onCheck} loading={loading}/>}/>
      </Card>
    </div>
  );
}

export default SingleRecord;
