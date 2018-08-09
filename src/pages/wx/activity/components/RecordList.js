import React from 'react';
import {Card, List, Button} from 'antd-mobile';
import Link from 'umi/link';

const RecordList = ({
  dataSource
}) => {

  const singleItem = dataSource?dataSource[0]:{};

  return (
    <div>
      {
        dataSource.length===1?
          <Card>
            <Card.Header title={`开展时间：${singleItem.holdTime}`}/>
            <Card.Body>
              <p>活动状态：
                {( ()=>{
                    switch(singleItem.status){
                      case "0":return <span className="green">未开始</span>; break;
                      case "1":return <span className="blue">报名中</span>; break;
                      case "2":return <span className="red">停止报名</span>; break;
                      case "3":return <span className="yellow">已结束</span>; break;
                      default:return null;
                    }
                  }
                )()}
              </p>
              <p>活动地点：{singleItem.address}</p>
              <p>联系电话：{singleItem.phone}</p>
              <p>报名时间：{singleItem.startTime}</p>
              <p>报名截止：{singleItem.deadline}</p>
              <p>家庭数量：最多可【<b className="blue">{singleItem.maxCount}</b>】个家庭参与</p>
              <p><Link to={`/wx/signUp?recordId=${singleItem.id}`}><Button type="primary" size="small">我要报名</Button></Link></p>
            </Card.Body>
          </Card>
          :
          <List>

          </List>
      }
    </div>
  );
}

export default RecordList;
