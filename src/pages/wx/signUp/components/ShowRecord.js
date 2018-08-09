import React from 'react';
import {Card} from 'antd-mobile';

const ShowRecord = ({
  record
}) => {
  return (
    <Card style={{"marginTop": "10px"}}>
      <Card.Header title={`活动信息：${record.actTitle}`}/>
      <Card.Body>
        <p>地址：{record.address}</p>
        <p>电话：{record.phone}</p>
        <p>时间：{record.holdTime}</p>
        <p>报名起始：{record.startTime}</p>
        <p>报名截止：{record.deadline}</p>
        <p>状态：
          {( ()=>{
              switch(record.status){
                case "0":return <span className="green">未开始</span>; break;
                case "1":return <span className="blue">报名中</span>; break;
                case "2":return <span className="red">停止报名</span>; break;
                case "3":return <span className="yellow">已结束</span>; break;
                default:return null;
              }
            }
          )()}
        </p>
      </Card.Body>
    </Card>
  );
}

export default ShowRecord;
